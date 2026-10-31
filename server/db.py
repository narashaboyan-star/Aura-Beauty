"""Persistent order storage.

Production uses DATABASE_URL (Postgres). Tests and local development may opt into
SQLite with AURA_SQLITE_PATH. No implicit ephemeral production fallback is used.
"""

import json
import os
import secrets
import sqlite3
from contextlib import contextmanager
from datetime import datetime, timezone

from .catalog import PRODUCTS as CATALOG_SEED


STATUSES = {"new", "confirmed", "preparing", "sent", "completed", "cancelled"}


def _now():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def is_ready():
    return bool(os.environ.get("DATABASE_URL") or os.environ.get("AURA_SQLITE_PATH"))


def _postgres():
    return bool(os.environ.get("DATABASE_URL"))


def _sql(statement):
    return statement.replace("?", "%s") if _postgres() else statement


@contextmanager
def connect():
    if _postgres():
        import psycopg
        from psycopg.rows import dict_row
        connection = psycopg.connect(os.environ["DATABASE_URL"], row_factory=dict_row)
    else:
        path = os.environ.get("AURA_SQLITE_PATH")
        if not path:
            raise RuntimeError("persistent database is not configured")
        connection = sqlite3.connect(path)
        connection.row_factory = sqlite3.Row
        connection.execute("PRAGMA foreign_keys = ON")
    try:
        _initialize(connection)
        yield connection
        connection.commit()
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()


def _initialize(connection):
    statements = [
        """CREATE TABLE IF NOT EXISTS products (
            id TEXT PRIMARY KEY, category TEXT NOT NULL, brand TEXT NOT NULL, name TEXT NOT NULL,
            price_usd REAL NOT NULL, available INTEGER NOT NULL DEFAULT 1,
            stock_quantity INTEGER, updated_at TEXT NOT NULL
        )""",
        """CREATE TABLE IF NOT EXISTS customers (
            telegram_id BIGINT PRIMARY KEY,
            username TEXT NOT NULL DEFAULT '', first_name TEXT NOT NULL DEFAULT '',
            last_name TEXT NOT NULL DEFAULT '', phone TEXT NOT NULL DEFAULT '',
            created_at TEXT NOT NULL, updated_at TEXT NOT NULL
        )""",
        """CREATE TABLE IF NOT EXISTS orders (
            id TEXT PRIMARY KEY, telegram_id BIGINT NOT NULL, source TEXT NOT NULL,
            status TEXT NOT NULL, customer_name TEXT NOT NULL, phone TEXT NOT NULL DEFAULT '',
            email TEXT NOT NULL DEFAULT '', address TEXT NOT NULL,
            delivery_method TEXT NOT NULL, delivery_date TEXT NOT NULL DEFAULT '',
            delivery_time TEXT NOT NULL DEFAULT '', payment_method TEXT NOT NULL,
            comment TEXT NOT NULL DEFAULT '', currency TEXT NOT NULL DEFAULT 'USD',
            total_usd REAL NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL
        )""",
        """CREATE TABLE IF NOT EXISTS order_items (
            order_id TEXT NOT NULL, product_id TEXT NOT NULL, product_name TEXT NOT NULL,
            variant TEXT NOT NULL DEFAULT '', quantity INTEGER NOT NULL, unit_price_usd REAL NOT NULL,
            FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE
        )""",
        """CREATE TABLE IF NOT EXISTS bot_cart (
            telegram_id BIGINT NOT NULL, product_id TEXT NOT NULL, variant TEXT NOT NULL DEFAULT '',
            quantity INTEGER NOT NULL, PRIMARY KEY(telegram_id, product_id, variant)
        )""",
        """CREATE TABLE IF NOT EXISTS bot_state (
            telegram_id BIGINT PRIMARY KEY, flow TEXT NOT NULL, data_json TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )""",
    ]
    cursor = connection.cursor()
    for statement in statements:
        cursor.execute(statement)
    for product_id, item in CATALOG_SEED.items():
        cursor.execute(_sql("SELECT id FROM products WHERE id=?"), (product_id,))
        if not cursor.fetchone():
            cursor.execute(_sql("""INSERT INTO products
                (id,category,brand,name,price_usd,available,stock_quantity,updated_at)
                VALUES (?,?,?,?,?,?,?,?)"""), (
                product_id, item["category"], item["brand"], item["name"], float(item["price"]),
                1 if item.get("available", True) else 0, item.get("stock_quantity"), _now()))


def _dict(row):
    return dict(row) if row is not None else None


def _product_from_row(row):
    item = _dict(row)
    if not item:
        return None
    return {
        "id": item["id"], "category": item["category"], "brand": item["brand"],
        "name": item["name"], "price": float(item["price_usd"]),
        "available": bool(item["available"]), "stock_quantity": item["stock_quantity"],
        "updated_at": item["updated_at"],
    }


def _get_product(connection, product_id):
    cursor = connection.cursor()
    cursor.execute(_sql("""SELECT id,category,brand,name,price_usd,available,stock_quantity,updated_at
        FROM products WHERE id=?"""), (product_id,))
    return _product_from_row(cursor.fetchone())


def get_product(product_id):
    with connect() as connection:
        return _get_product(connection, product_id)


def list_products(category=None):
    with connect() as connection:
        cursor = connection.cursor()
        fields = "id,category,brand,name,price_usd,available,stock_quantity,updated_at"
        if category is None:
            cursor.execute(f"SELECT {fields} FROM products ORDER BY category,name")
        else:
            cursor.execute(_sql(f"SELECT {fields} FROM products WHERE category=? ORDER BY name"), (category,))
        return [_product_from_row(row) for row in cursor.fetchall()]


def product_is_available(item, quantity=1):
    if not item or not item["available"]:
        return False
    stock = item.get("stock_quantity")
    return stock is None or int(stock) >= int(quantity)


def upsert_customer(connection, identity, phone=""):
    now = _now()
    cursor = connection.cursor()
    cursor.execute(_sql("SELECT telegram_id FROM customers WHERE telegram_id=?"), (identity["telegram_id"],))
    if cursor.fetchone():
        cursor.execute(_sql("""UPDATE customers SET username=?, first_name=?, last_name=?,
            phone=CASE WHEN ?='' THEN phone ELSE ? END, updated_at=? WHERE telegram_id=?"""),
            (identity.get("username", ""), identity.get("first_name", ""), identity.get("last_name", ""),
             phone, phone, now, identity["telegram_id"]))
    else:
        cursor.execute(_sql("""INSERT INTO customers
            (telegram_id,username,first_name,last_name,phone,created_at,updated_at)
            VALUES (?,?,?,?,?,?,?)"""),
            (identity["telegram_id"], identity.get("username", ""), identity.get("first_name", ""),
             identity.get("last_name", ""), phone, now, now))


def record_customer(identity):
    with connect() as connection:
        upsert_customer(connection, identity)


def _normalized_items(connection, items):
    result = []
    for raw in items or []:
        product_id = str(raw.get("id", ""))
        product = _get_product(connection, product_id)
        quantity = int(raw.get("quantity", 0))
        if not product_is_available(product, quantity) or quantity < 1 or quantity > 20:
            raise ValueError("invalid order item")
        result.append({
            "id": product_id,
            "name": product["name"],
            "variant": str(raw.get("variant") or "")[:120],
            "quantity": quantity,
            "unit_price_usd": float(product["price"]),
        })
    if not result or len(result) > 50:
        raise ValueError("order must contain items")
    return result


def create_order(identity, payload, source):
    customer = payload.get("customer") or {}
    delivery = payload.get("delivery") or {}
    name = str(customer.get("name") or identity.get("first_name") or "").strip()[:120]
    address = str(delivery.get("address") or "").strip()[:500]
    phone = str(customer.get("phone") or "").strip()[:40]
    email = str(customer.get("email") or "").strip()[:254]
    if not name or not address or (not phone and not email):
        raise ValueError("name, address and contact are required")
    order_id = f"AB-{datetime.now(timezone.utc):%y%m%d}-{secrets.token_hex(2).upper()}"
    now = _now()
    with connect() as connection:
        items = _normalized_items(connection, payload.get("items"))
        total = sum(item["unit_price_usd"] * item["quantity"] for item in items)
        upsert_customer(connection, identity, phone)
        connection.cursor().execute(_sql("""INSERT INTO orders
            (id,telegram_id,source,status,customer_name,phone,email,address,delivery_method,
             delivery_date,delivery_time,payment_method,comment,currency,total_usd,created_at,updated_at)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"""), (
                order_id, identity["telegram_id"], source, "new", name, phone, email, address,
                str(delivery.get("method") or "post")[:30], str(delivery.get("date") or "")[:20],
                str(delivery.get("time") or "")[:20], str(payload.get("paymentMethod") or "on-receipt")[:40],
                str(customer.get("comment") or "")[:1000], str(payload.get("currency") or "USD")[:8],
                total, now, now))
        for item in items:
            connection.cursor().execute(_sql("""INSERT INTO order_items
                (order_id,product_id,product_name,variant,quantity,unit_price_usd)
                VALUES (?,?,?,?,?,?)"""), (order_id, item["id"], item["name"], item["variant"],
                                            item["quantity"], item["unit_price_usd"]))
            product = _get_product(connection, item["id"])
            if product["stock_quantity"] is not None:
                stock_cursor = connection.cursor()
                stock_cursor.execute(_sql("""UPDATE products SET stock_quantity=stock_quantity-?,
                    available=CASE WHEN stock_quantity-? > 0 THEN 1 ELSE 0 END, updated_at=?
                    WHERE id=? AND stock_quantity>=?"""), (
                    item["quantity"], item["quantity"], now, item["id"], item["quantity"]))
                if stock_cursor.rowcount != 1:
                    raise ValueError("product is out of stock")
    return get_customer_order(order_id, identity["telegram_id"])


def _get_order(order_id, telegram_id=None):
    with connect() as connection:
        cursor = connection.cursor()
        if telegram_id is None:
            cursor.execute(_sql("SELECT * FROM orders WHERE id=?"), (order_id,))
        else:
            cursor.execute(_sql("SELECT * FROM orders WHERE id=? AND telegram_id=?"), (order_id, telegram_id))
        order = _dict(cursor.fetchone())
        if not order:
            return None
        cursor.execute(_sql("SELECT product_id,product_name,variant,quantity,unit_price_usd FROM order_items WHERE order_id=?"), (order_id,))
        order["items"] = [_dict(row) for row in cursor.fetchall()]
        return order


def get_customer_order(order_id, telegram_id):
    if telegram_id is None:
        return None
    return _get_order(order_id, int(telegram_id))


def list_orders(telegram_id, limit=20):
    with connect() as connection:
        cursor = connection.cursor()
        cursor.execute(_sql("SELECT * FROM orders WHERE telegram_id=? ORDER BY created_at DESC LIMIT ?"),
                       (telegram_id, limit))
        return [_dict(row) for row in cursor.fetchall()]


def list_recent_orders(limit=20):
    with connect() as connection:
        cursor = connection.cursor()
        cursor.execute(_sql("SELECT * FROM orders ORDER BY created_at DESC LIMIT ?"), (limit,))
        return [_dict(row) for row in cursor.fetchall()]


def update_status(order_id, status):
    if status not in STATUSES:
        raise ValueError("invalid status")
    with connect() as connection:
        cursor = connection.cursor()
        cursor.execute(_sql("UPDATE orders SET status=?, updated_at=? WHERE id=?"), (status, _now(), order_id))
        if cursor.rowcount != 1:
            return None
    return _get_order(order_id)


def cart_items(telegram_id):
    with connect() as connection:
        cursor = connection.cursor()
        cursor.execute(_sql("SELECT product_id,variant,quantity FROM bot_cart WHERE telegram_id=? ORDER BY product_id"),
                       (telegram_id,))
        return [_dict(row) for row in cursor.fetchall()]


def add_to_cart(telegram_id, product_id, quantity=1, variant=""):
    quantity = int(quantity)
    if quantity < 1 or quantity > 20:
        raise ValueError("invalid quantity")
    with connect() as connection:
        product = _get_product(connection, product_id)
        if not product:
            raise ValueError("unknown product")
        cursor = connection.cursor()
        cursor.execute(_sql("SELECT quantity FROM bot_cart WHERE telegram_id=? AND product_id=? AND variant=?"),
                       (telegram_id, product_id, variant))
        row = cursor.fetchone()
        if row:
            next_quantity = min(int(dict(row)["quantity"]) + quantity, 20)
            if not product_is_available(product, next_quantity):
                raise ValueError("product unavailable")
            cursor.execute(_sql("UPDATE bot_cart SET quantity=? WHERE telegram_id=? AND product_id=? AND variant=?"),
                           (next_quantity, telegram_id, product_id, variant))
        else:
            if not product_is_available(product, quantity):
                raise ValueError("product unavailable")
            cursor.execute(_sql("INSERT INTO bot_cart (telegram_id,product_id,variant,quantity) VALUES (?,?,?,?)"),
                           (telegram_id, product_id, variant, quantity))


def set_cart_quantity(telegram_id, product_id, quantity, variant=""):
    quantity = max(0, min(int(quantity), 20))
    with connect() as connection:
        cursor = connection.cursor()
        if quantity == 0:
            cursor.execute(_sql("DELETE FROM bot_cart WHERE telegram_id=? AND product_id=? AND variant=?"),
                           (telegram_id, product_id, variant))
        else:
            product = _get_product(connection, product_id)
            if not product_is_available(product, quantity):
                raise ValueError("product unavailable")
            cursor.execute(_sql("UPDATE bot_cart SET quantity=? WHERE telegram_id=? AND product_id=? AND variant=?"),
                           (quantity, telegram_id, product_id, variant))


def clear_cart(telegram_id):
    with connect() as connection:
        connection.cursor().execute(_sql("DELETE FROM bot_cart WHERE telegram_id=?"), (telegram_id,))


def set_state(telegram_id, flow, data=None):
    now = _now()
    payload = json.dumps(data or {}, ensure_ascii=False)
    with connect() as connection:
        cursor = connection.cursor()
        cursor.execute(_sql("SELECT telegram_id FROM bot_state WHERE telegram_id=?"), (telegram_id,))
        if cursor.fetchone():
            cursor.execute(_sql("UPDATE bot_state SET flow=?,data_json=?,updated_at=? WHERE telegram_id=?"),
                           (flow, payload, now, telegram_id))
        else:
            cursor.execute(_sql("INSERT INTO bot_state (telegram_id,flow,data_json,updated_at) VALUES (?,?,?,?)"),
                           (telegram_id, flow, payload, now))


def get_state(telegram_id):
    with connect() as connection:
        cursor = connection.cursor()
        cursor.execute(_sql("SELECT flow,data_json FROM bot_state WHERE telegram_id=?"), (telegram_id,))
        row = _dict(cursor.fetchone())
        if not row:
            return {"flow": "", "data": {}}
        return {"flow": row["flow"], "data": json.loads(row["data_json"] or "{}")}


def clear_state(telegram_id):
    with connect() as connection:
        connection.cursor().execute(_sql("DELETE FROM bot_state WHERE telegram_id=?"), (telegram_id,))
