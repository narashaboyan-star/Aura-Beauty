"""Telegram Bot API workflow for the ordinary chat experience."""

import json
import urllib.error
import urllib.request

from . import db
from .catalog import CATEGORIES, PRODUCTS, is_available, products_in_category
from .config import admin_ids, bot_token, payment_details, site_origin


STATUS_LABELS = {
    "new": "Новый", "confirmed": "Подтверждён", "preparing": "Собирается",
    "sent": "Передан в доставку", "completed": "Выполнен", "cancelled": "Отменён",
}
MAX_QUANTITY = 20


def telegram_call(method, payload):
    token = bot_token()
    if not token:
        raise RuntimeError("Telegram bot token is not configured")
    request = urllib.request.Request(
        f"https://api.telegram.org/bot{token}/{method}",
        data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=8) as response:
            result = json.load(response)
    except (urllib.error.URLError, TimeoutError) as exc:
        raise RuntimeError("Telegram API request failed") from exc
    if not result.get("ok"):
        raise RuntimeError("Telegram API rejected request")
    return result.get("result")


def send_message(chat_id, text, keyboard=None):
    payload = {"chat_id": chat_id, "text": text, "disable_web_page_preview": True}
    if keyboard:
        payload["reply_markup"] = {"inline_keyboard": keyboard}
    return telegram_call("sendMessage", payload)


def answer_callback(callback_id, text=""):
    payload = {"callback_query_id": callback_id}
    if text:
        payload["text"] = text
    return telegram_call("answerCallbackQuery", payload)


def _identity(user):
    return {
        "telegram_id": int(user["id"]), "username": user.get("username", ""),
        "first_name": user.get("first_name", ""), "last_name": user.get("last_name", ""),
    }


def main_keyboard():
    origin = site_origin()
    rows = []
    if origin:
        rows.append([{"text": "Mini App", "web_app": {"url": f"{origin}/products.html"}}])
    rows.extend([
        [{"text": "Категории", "callback_data": "categories"}, {"text": "Корзина", "callback_data": "cart"}],
        [{"text": "Мои заказы", "callback_data": "orders"}],
    ])
    return rows


def navigation_keyboard(back_data="home", include_orders=True):
    rows = [[
        {"text": "Назад", "callback_data": back_data},
        {"text": "Меню", "callback_data": "home"},
    ]]
    if include_orders:
        rows.append([{"text": "Мои заказы", "callback_data": "orders"}])
    origin = site_origin()
    if origin:
        rows.append([{"text": "Mini App", "web_app": {"url": f"{origin}/products.html"}}])
    return rows


def category_keyboard():
    return [[{"text": label, "callback_data": f"cat:{key}"}] for key, label in CATEGORIES.items()] + navigation_keyboard()


def _product_text(product_id, quantity=1):
    item = PRODUCTS[product_id]
    availability = "В наличии" if is_available(product_id) else "Временно недоступен"
    return (f"{item['brand']}\n{item['name']}\nЦена: ${item['price']:.2f}\n"
            f"Статус: {availability}\nКоличество: {quantity}")


def show_home(chat_id, first_name=""):
    greeting = f", {first_name}" if first_name else ""
    ready_note = "" if db.is_ready() else "\n\nКаталог доступен, но сервер заказов ещё настраивается."
    send_message(chat_id, f"Добро пожаловать в Aura Beauty{greeting}!\nВыберите действие.{ready_note}", main_keyboard())


def show_category(chat_id, category):
    if category not in CATEGORIES:
        send_message(chat_id, "Такой категории нет. Выберите раздел из меню.", category_keyboard())
        return
    items = products_in_category(category)
    if not items:
        send_message(chat_id, "В этой категории пока нет товаров. Выберите другой раздел.", category_keyboard())
        return
    keyboard = []
    for key, item in items:
        suffix = f"${item['price']:.2f}" if is_available(key) else "нет в наличии"
        keyboard.append([{"text": f"{item['name']} — {suffix}", "callback_data": f"product:{key}"}])
    keyboard.extend(navigation_keyboard("categories"))
    send_message(chat_id, CATEGORIES[category], keyboard)


def show_product(chat_id, product_id, quantity=1):
    if product_id not in PRODUCTS:
        send_message(chat_id, "Товар больше не найден в каталоге. Вернитесь к категориям.", category_keyboard())
        return
    item = PRODUCTS[product_id]
    back_data = f"cat:{item['category']}"
    if not is_available(product_id):
        send_message(chat_id, _product_text(product_id),
                     navigation_keyboard(back_data))
        return
    quantity = max(1, min(int(quantity), MAX_QUANTITY))
    keyboard = [
        [
            {"text": "−", "callback_data": f"qty:{product_id}:{max(1, quantity - 1)}"},
            {"text": str(quantity), "callback_data": "noop"},
            {"text": "+", "callback_data": f"qty:{product_id}:{min(MAX_QUANTITY, quantity + 1)}"},
        ],
        [{"text": f"Добавить {quantity} в корзину", "callback_data": f"add:{product_id}:{quantity}"}],
        [{"text": "Корзина", "callback_data": "cart"}],
    ]
    keyboard.extend(navigation_keyboard(back_data))
    send_message(chat_id, _product_text(product_id, quantity), keyboard)


def _cart_payload(telegram_id):
    items = db.cart_items(telegram_id)
    total = 0.0
    lines = []
    unavailable = []
    for item in items:
        product = PRODUCTS.get(item["product_id"])
        if not product or not is_available(item["product_id"]):
            unavailable.append(item["product_id"])
            lines.append(f"• Товар {item['product_id']} временно недоступен")
            continue
        subtotal = product["price"] * item["quantity"]
        total += subtotal
        variant = f" ({item['variant']})" if item.get("variant") else ""
        lines.append(f"• {product['name']}{variant} × {item['quantity']} — ${subtotal:.2f}")
    return items, total, lines, unavailable


def show_cart(chat_id, telegram_id):
    items, total, lines, unavailable = _cart_payload(telegram_id)
    if not items:
        send_message(chat_id, "Корзина пуста.", main_keyboard())
        return
    text = "Корзина:\n" + "\n".join(lines) + f"\n\nИтого: ${total:.2f}"
    keyboard = []
    for item in items:
        product = PRODUCTS.get(item["product_id"])
        if not product or not is_available(item["product_id"]):
            continue
        quantity = int(item["quantity"])
        keyboard.append([{"text": product["name"], "callback_data": f"product:{item['product_id']}"}])
        keyboard.append([
            {"text": "−", "callback_data": f"cartq:{item['product_id']}:{max(0, quantity - 1)}"},
            {"text": str(quantity), "callback_data": "noop"},
            {"text": "+", "callback_data": f"cartq:{item['product_id']}:{min(MAX_QUANTITY, quantity + 1)}"},
        ])
    if unavailable:
        text += "\n\nОформление недоступно: уберите недоступный товар или очистите корзину."
    else:
        keyboard.append([{"text": "Оформить", "callback_data": "checkout"}])
    keyboard.append([
        {"text": "Очистить", "callback_data": "cart:clear"},
        {"text": "Продолжить выбор", "callback_data": "categories"},
    ])
    keyboard.extend(navigation_keyboard("categories"))
    send_message(chat_id, text, keyboard)


def show_orders(chat_id, telegram_id):
    orders = db.list_orders(telegram_id)
    if not orders:
        send_message(chat_id, "У вас пока нет заказов. Выберите товары в категориях или откройте Mini App.",
                     navigation_keyboard("home", include_orders=False))
        return
    lines = [f"{order['id']} — {STATUS_LABELS.get(order['status'], order['status'])} — ${order['total_usd']:.2f}"
             for order in orders]
    send_message(chat_id, "Ваши заказы:\n\n" + "\n".join(lines),
                 navigation_keyboard("home", include_orders=False))


def _admin_order_keyboard(order_id):
    return [
        [{"text": "Подтвердить", "callback_data": f"adm:{order_id}:confirmed"},
         {"text": "Собирается", "callback_data": f"adm:{order_id}:preparing"}],
        [{"text": "В доставке", "callback_data": f"adm:{order_id}:sent"},
         {"text": "Выполнен", "callback_data": f"adm:{order_id}:completed"}],
        [{"text": "Отменить", "callback_data": f"adm:{order_id}:cancelled"}],
    ]


def notify_admins(order):
    if not order:
        return
    text = (f"Новый заказ {order['id']}\nИсточник: {order['source']}\n"
            f"Покупатель: {order['customer_name']}\nКонтакт: {order['phone'] or order['email']}\n"
            f"Адрес: {order['address']}\nСумма: ${order['total_usd']:.2f}")
    for admin_id in admin_ids():
        try:
            send_message(admin_id, text, _admin_order_keyboard(order["id"]))
        except RuntimeError:
            continue


def _create_bot_order(identity, state):
    items = db.cart_items(identity["telegram_id"])
    payload = {
        "customer": {"name": state["name"], "phone": state["phone"], "email": "", "comment": ""},
        "delivery": {"method": "post", "address": state["address"], "date": "", "time": ""},
        "paymentMethod": "on-receipt", "currency": "USD",
        "items": [{"id": item["product_id"], "variant": item.get("variant", ""), "quantity": item["quantity"]}
                  for item in items],
    }
    order = db.create_order(identity, payload, "bot")
    db.clear_cart(identity["telegram_id"])
    db.clear_state(identity["telegram_id"])
    notify_admins(order)
    return order


def handle_message(message):
    chat_id = message["chat"]["id"]
    identity = _identity(message["from"])
    text = (message.get("text") or "").strip()
    if text == "/id":
        send_message(chat_id, f"Ваш Telegram ID: {identity['telegram_id']}")
        return
    if text.startswith("/start"):
        show_home(chat_id, identity["first_name"])
        return
    if not db.is_ready():
        show_home(chat_id, identity["first_name"])
        return
    if text == "/admin" and identity["telegram_id"] in admin_ids():
        orders = db.list_recent_orders()
        if not orders:
            send_message(chat_id, "Новых заказов нет.")
        for order in orders[:10]:
            send_message(chat_id, f"{order['id']} — {STATUS_LABELS.get(order['status'], order['status'])}\n"
                                  f"{order['customer_name']} — ${order['total_usd']:.2f}",
                         _admin_order_keyboard(order["id"]))
        return
    state = db.get_state(identity["telegram_id"])
    data = state["data"]
    if state["flow"] == "checkout_name":
        if len(text) < 2:
            send_message(chat_id, "Введите имя полностью.")
            return
        data["name"] = text[:120]
        db.set_state(identity["telegram_id"], "checkout_phone", data)
        send_message(chat_id, "Введите армянский номер телефона, например +374 XX XXX XXX.")
    elif state["flow"] == "checkout_phone":
        if not text.startswith("+374") or len(text) < 10:
            send_message(chat_id, "Нужен номер в формате +374 XX XXX XXX.")
            return
        data["phone"] = text[:40]
        db.set_state(identity["telegram_id"], "checkout_address", data)
        send_message(chat_id, "Введите адрес доставки: город, улица, дом и квартира.")
    elif state["flow"] == "checkout_address":
        if len(text) < 5:
            send_message(chat_id, "Укажите полный адрес доставки.")
            return
        data["address"] = text[:500]
        order = _create_bot_order(identity, data)
        send_message(chat_id, f"Заказ {order['id']} создан. Оплата — при получении.\n"
                              "Статус можно проверить через «Мои заказы».", main_keyboard())
    else:
        show_home(chat_id, identity["first_name"])


def handle_callback(callback):
    callback_id = callback["id"]
    data = callback.get("data", "")
    identity = _identity(callback["from"])
    chat_id = callback["message"]["chat"]["id"]
    try:
        if data == "home":
            show_home(chat_id, identity["first_name"])
        elif not db.is_ready():
            show_home(chat_id, identity["first_name"])
        elif data == "categories":
            send_message(chat_id, "Выберите категорию.", category_keyboard())
        elif data.startswith("cat:"):
            show_category(chat_id, data.split(":", 1)[1])
        elif data.startswith("product:"):
            show_product(chat_id, data.split(":", 1)[1])
        elif data.startswith("qty:"):
            _, product_id, quantity = data.split(":", 2)
            show_product(chat_id, product_id, int(quantity))
        elif data.startswith("add:"):
            parts = data.split(":", 2)
            product_id = parts[1]
            quantity = int(parts[2]) if len(parts) == 3 else 1
            if not is_available(product_id):
                send_message(chat_id, "Этот товар временно недоступен. Выберите другой товар.",
                             category_keyboard())
            else:
                db.add_to_cart(identity["telegram_id"], product_id, quantity)
                show_cart(chat_id, identity["telegram_id"])
        elif data.startswith("cartq:"):
            _, product_id, quantity = data.split(":", 2)
            db.set_cart_quantity(identity["telegram_id"], product_id, int(quantity))
            show_cart(chat_id, identity["telegram_id"])
        elif data == "noop":
            pass
        elif data == "cart":
            show_cart(chat_id, identity["telegram_id"])
        elif data == "cart:clear":
            db.clear_cart(identity["telegram_id"])
            send_message(chat_id, "Корзина очищена.", main_keyboard())
        elif data == "checkout":
            items, _, _, unavailable = _cart_payload(identity["telegram_id"])
            if not items:
                send_message(chat_id, "Корзина пуста.", main_keyboard())
            elif unavailable:
                send_message(chat_id, "В корзине есть недоступный товар. Уберите его перед оформлением.",
                             navigation_keyboard("cart"))
            else:
                db.set_state(identity["telegram_id"], "checkout_name", {})
                send_message(chat_id, "Как вас зовут?")
        elif data == "orders":
            show_orders(chat_id, identity["telegram_id"])
        elif data.startswith("adm:") and identity["telegram_id"] in admin_ids():
            _, order_id, status = data.split(":", 2)
            order = db.update_status(order_id, status)
            if order:
                send_message(chat_id, f"{order_id}: статус обновлён — {STATUS_LABELS.get(status, status)}.")
                customer_text = f"Статус заказа {order_id}: {STATUS_LABELS.get(status, status)}."
                if status == "confirmed" and order["payment_method"] == "bank-transfer" and payment_details():
                    customer_text += "\nРеквизиты для перевода: " + payment_details()
                send_message(order["telegram_id"], customer_text, main_keyboard())
        answer_callback(callback_id)
    except (RuntimeError, ValueError):
        try:
            answer_callback(callback_id, "Не удалось выполнить действие. Попробуйте позже.")
        except RuntimeError:
            pass


def process_update(update):
    if "callback_query" in update:
        handle_callback(update["callback_query"])
    elif "message" in update:
        handle_message(update["message"])
