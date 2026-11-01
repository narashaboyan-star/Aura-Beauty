import hashlib
import hmac
import json
import os
import tempfile
import time
import unittest
import uuid
from unittest import mock
from urllib.parse import urlencode

from server import db
from server.auth import TelegramAuthError, validate_init_data
from server.bot import (TelegramAPIError, handle_callback, main_keyboard, notify_customer_status,
                        show_category, show_product)
from api.orders import _public_order


def signed_init_data(token, user, auth_date):
    values = {"auth_date": str(auth_date), "query_id": "AAE-test", "user": json.dumps(user, separators=(",", ":"))}
    check = "\n".join(f"{key}={values[key]}" for key in sorted(values))
    secret = hmac.new(b"WebAppData", token.encode(), hashlib.sha256).digest()
    values["hash"] = hmac.new(secret, check.encode(), hashlib.sha256).hexdigest()
    return urlencode(values)


class TelegramAuthTests(unittest.TestCase):
    def test_accepts_valid_fresh_init_data(self):
        token = "123456:test-token"
        now = int(time.time())
        raw = signed_init_data(token, {"id": 42, "first_name": "Buyer", "username": "buyer_a"}, now)
        identity = validate_init_data(raw, token, now=now)
        self.assertEqual(identity["telegram_id"], 42)
        self.assertEqual(identity["username"], "buyer_a")

    def test_accepts_signed_write_permission(self):
        token = "123456:test-token"
        now = int(time.time())
        raw = signed_init_data(token, {"id": 42, "first_name": "Buyer", "allows_write_to_pm": True}, now)
        self.assertTrue(validate_init_data(raw, token, now=now)["allows_write_to_pm"])

    def test_rejects_tampering_and_expired_data(self):
        token = "123456:test-token"
        now = int(time.time())
        raw = signed_init_data(token, {"id": 42, "first_name": "Buyer"}, now)
        with self.assertRaises(TelegramAuthError):
            validate_init_data(raw.replace("Buyer", "Other"), token, now=now)
        old = signed_init_data(token, {"id": 42, "first_name": "Buyer"}, now - 901)
        with self.assertRaises(TelegramAuthError):
            validate_init_data(old, token, now=now)

    def test_rejects_substituted_telegram_identifier(self):
        token = "123456:test-token"
        now = int(time.time())
        raw = signed_init_data(token, {"id": 42, "first_name": "Buyer"}, now)
        tampered = raw.replace("%22id%22%3A42", "%22id%22%3A43")
        self.assertNotEqual(raw, tampered)
        with self.assertRaises(TelegramAuthError):
            validate_init_data(tampered, token, now=now)


class DatabaseTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        os.environ.pop("DATABASE_URL", None)
        os.environ["AURA_SQLITE_PATH"] = os.path.join(self.temp.name, "aura.db")
        self.identity = {"telegram_id": 42, "username": "buyer_a", "first_name": "Buyer A", "last_name": ""}

    def tearDown(self):
        os.environ.pop("AURA_SQLITE_PATH", None)
        os.environ.pop("TELEGRAM_ADMIN_USER_IDS", None)
        self.temp.cleanup()

    def payload(self):
        return {
            "requestKey": f"test-{uuid.uuid4()}",
            "customer": {"name": "Buyer A", "phone": "+374 00 000 000", "email": "", "comment": ""},
            "delivery": {"method": "post", "address": "Test address A", "date": "", "time": ""},
            "paymentMethod": "on-receipt", "currency": "USD",
            "items": [{"id": "ordinary", "quantity": 2, "variant": ""}],
        }

    def test_order_is_owned_and_status_is_shared(self):
        order = db.create_order(self.identity, self.payload(), "mini_app")
        bot_order = db.create_order(self.identity, self.payload(), "bot")
        self.assertTrue(order["id"].startswith("AB-"))
        self.assertEqual(order["total_usd"], 12.0)
        self.assertEqual({item["id"] for item in db.list_orders(42)}, {order["id"], bot_order["id"]})
        self.assertEqual(db.list_orders(999), [])
        updated = db.update_status(order["id"], "confirmed")
        self.assertEqual(updated["status"], "confirmed")
        self.assertEqual(db.get_customer_order(order["id"], 42)["status"], "confirmed")
        self.assertIsNone(db.get_customer_order(order["id"], 999))

    @mock.patch("server.bot.answer_callback")
    @mock.patch("server.bot.send_message")
    @mock.patch("server.bot.notify_customer_status", return_value="skipped_no_consent")
    def test_common_admin_status_is_visible_in_both_customer_paths(self, notify, send, _answer):
        os.environ["TELEGRAM_ADMIN_USER_IDS"] = "700"
        mini_order = db.create_order(self.identity, self.payload(), "mini_app")
        callback = {
            "id": "admin-status-1", "data": f"adm:{mini_order['id']}:preparing",
            "from": {"id": 700, "first_name": "Test Admin"},
            "message": {"chat": {"id": 700}},
        }
        handle_callback(callback)
        bot_view = db.get_customer_order(mini_order["id"], 42)
        mini_app_view = _public_order(db.list_orders(42)[0])
        self.assertEqual(bot_view["status"], "preparing")
        self.assertEqual(mini_app_view["status"], "preparing")
        notify.assert_called_once()
        self.assertIn(mini_order["id"], send.call_args.args[1])

    def test_buyers_are_isolated_across_bot_and_mini_app(self):
        buyer_a = {**self.identity, "telegram_id": 101, "username": "same-name"}
        buyer_b = {**self.identity, "telegram_id": 202, "username": "same-name"}
        order_a = db.create_order(buyer_a, self.payload(), "bot")
        order_b = db.create_order(buyer_b, self.payload(), "mini_app")
        self.assertEqual([item["id"] for item in db.list_orders(101)], [order_a["id"]])
        self.assertEqual([item["id"] for item in db.list_orders(202)], [order_b["id"]])
        self.assertIsNone(db.get_customer_order(order_a["id"], 202))
        self.assertIsNone(db.get_customer_order(order_b["id"], 101))
        self.assertEqual({item["id"] for item in db.list_recent_orders()}, {order_a["id"], order_b["id"]})

    def test_shared_catalog_stock_is_enforced(self):
        with db.connect() as connection:
            connection.execute("UPDATE products SET stock_quantity=2,available=1 WHERE id='ordinary'")
        self.assertEqual(db.get_product("ordinary")["stock_quantity"], 2)
        order = db.create_order(self.identity, self.payload(), "mini_app")
        self.assertTrue(order["id"].startswith("AB-"))
        product = db.get_product("ordinary")
        self.assertEqual(product["stock_quantity"], 0)
        self.assertFalse(product["available"])
        with self.assertRaises(ValueError):
            db.create_order(self.identity, self.payload(), "bot")

    def test_confirmation_uses_current_server_price_and_availability(self):
        payload = self.payload()
        payload["items"][0]["quantity"] = 1
        with db.connect() as connection:
            connection.execute("UPDATE products SET price_usd=9.5,available=1 WHERE id='ordinary'")
        order = db.create_order(self.identity, payload, "mini_app")
        self.assertEqual(order["total_usd"], 9.5)
        blocked_payload = self.payload()
        with db.connect() as connection:
            connection.execute("UPDATE products SET available=0 WHERE id='ordinary'")
        with self.assertRaises(ValueError):
            db.create_order(self.identity, blocked_payload, "mini_app")

    def test_cart_and_bot_state_are_isolated(self):
        db.add_to_cart(42, "ordinary", 2)
        db.add_to_cart(99, "cosrx")
        self.assertEqual(db.cart_items(42)[0]["quantity"], 2)
        self.assertEqual(db.cart_items(99)[0]["product_id"], "cosrx")
        db.set_cart_quantity(42, "ordinary", 5)
        self.assertEqual(db.cart_items(42)[0]["quantity"], 5)
        db.set_cart_quantity(42, "ordinary", 0)
        self.assertEqual(db.cart_items(42), [])
        db.set_state(42, "checkout_name", {"x": 1})
        self.assertEqual(db.get_state(42)["flow"], "checkout_name")
        self.assertEqual(db.get_state(99)["flow"], "")

    def test_rejects_client_price_and_unknown_product(self):
        payload = self.payload()
        payload["items"][0]["price"] = 0.01
        order = db.create_order(self.identity, payload, "mini_app")
        self.assertEqual(order["total_usd"], 12.0)
        payload["requestKey"] = f"test-{uuid.uuid4()}"
        payload["items"] = [{"id": "missing", "quantity": 1}]
        with self.assertRaises(ValueError):
            db.create_order(self.identity, payload, "mini_app")

    def test_repeated_mini_app_request_returns_same_order_and_decrements_stock_once(self):
        with db.connect() as connection:
            connection.execute("UPDATE products SET stock_quantity=5,available=1 WHERE id='ordinary'")
        payload = self.payload()
        first = db.create_order(self.identity, payload, "mini_app")
        second = db.create_order(self.identity, payload, "mini_app")
        self.assertEqual(first["id"], second["id"])
        self.assertTrue(second["idempotent_replay"])
        self.assertEqual(len(db.list_orders(42)), 1)
        self.assertEqual(db.get_product("ordinary")["stock_quantity"], 3)

    def test_request_key_cannot_be_reused_for_changed_order(self):
        payload = self.payload()
        db.create_order(self.identity, payload, "mini_app")
        payload["items"][0]["quantity"] = 1
        with self.assertRaisesRegex(ValueError, "request key"):
            db.create_order(self.identity, payload, "mini_app")

    @mock.patch("server.db._normalized_items", side_effect=RuntimeError("database write failed"))
    def test_write_failure_never_returns_false_success(self, _normalize):
        payload = self.payload()
        with self.assertRaisesRegex(RuntimeError, "database write failed"):
            db.create_order(self.identity, payload, "mini_app")
        self.assertEqual(db.list_orders(42), [])

    @mock.patch("server.bot.send_message")
    def test_status_notification_requires_consent_and_records_skip(self, send):
        order = db.create_order(self.identity, self.payload(), "mini_app")
        updated = db.update_status(order["id"], "confirmed")
        self.assertEqual(notify_customer_status(updated), "skipped_no_consent")
        send.assert_not_called()
        event = db.list_notification_events(order["id"])[0]
        self.assertEqual(event["result"], "skipped_no_consent")
        self.assertEqual(db.get_customer_order(order["id"], 42)["status"], "confirmed")

    @mock.patch("server.bot.send_message", return_value={"message_id": 77})
    def test_status_notification_is_confirmed_only_for_owner(self, send):
        order = db.create_order(self.identity, self.payload(), "bot")
        other = {**self.identity, "telegram_id": 99, "username": "other"}
        other_order = db.create_order(other, self.payload(), "mini_app")
        db.set_notification_preference(42, True, "chat_started", "bot_callback")
        db.set_notification_preference(99, True, "chat_started", "bot_callback")
        updated = db.update_status(order["id"], "sent")
        self.assertEqual(notify_customer_status(updated), "telegram_accepted")
        self.assertEqual(send.call_args.args[0], 42)
        event = db.list_notification_events(order["id"])[0]
        self.assertEqual(event["result"], "telegram_accepted")
        self.assertEqual(event["telegram_message_id"], "77")
        self.assertEqual(db.list_notification_events(other_order["id"]), [])
        repeated = db.update_status(order["id"], "sent")
        self.assertEqual(notify_customer_status(repeated), "unchanged")
        self.assertEqual(send.call_count, 1)
        self.assertEqual(len(db.list_notification_events(order["id"])), 1)

    @mock.patch("server.bot.send_message", side_effect=TelegramAPIError("blocked", 403, "Forbidden"))
    def test_block_does_not_hide_updated_status(self, _send):
        order = db.create_order(self.identity, self.payload(), "mini_app")
        db.set_notification_preference(42, True, "granted_signed", "mini_app")
        updated = db.update_status(order["id"], "cancelled")
        self.assertEqual(notify_customer_status(updated), "blocked")
        self.assertEqual(db.get_customer_order(order["id"], 42)["status"], "cancelled")
        self.assertEqual(db.get_notification_settings(42)["write_access"], "blocked")
        self.assertEqual(db.list_notification_events(order["id"])[0]["result"], "blocked")

    def test_public_order_never_exposes_customer_contacts(self):
        order = db.create_order(self.identity, self.payload(), "mini_app")
        public = _public_order(order)
        for field in ("telegram_id", "customer_name", "phone", "email", "address", "comment"):
            self.assertNotIn(field, public)


class BotPresentationTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        os.environ.pop("DATABASE_URL", None)
        os.environ["AURA_SQLITE_PATH"] = os.path.join(self.temp.name, "aura.db")

    def tearDown(self):
        os.environ.pop("AURA_SQLITE_PATH", None)
        os.environ.pop("TELEGRAM_ADMIN_USER_IDS", None)
        self.temp.cleanup()

    def test_main_keyboard_uses_web_app_button(self):
        os.environ["SITE_ORIGIN"] = "https://example.com"
        button = main_keyboard()[0][0]
        self.assertEqual(button["text"], "Mini App")
        self.assertEqual(button["web_app"]["url"], "https://example.com/products.html")
        labels = [item["text"] for row in main_keyboard() for item in row]
        self.assertIn("Уведомления о статусе", labels)

    @mock.patch("server.bot.send_message")
    def test_product_card_has_quantity_and_navigation(self, send):
        show_product(42, "ordinary", 3)
        text, keyboard = send.call_args.args[1:]
        self.assertIn("Количество: 3", text)
        labels = [button["text"] for row in keyboard for button in row]
        self.assertIn("Добавить 3 в корзину", labels)
        self.assertIn("Назад", labels)
        self.assertIn("Меню", labels)
        self.assertIn("Мои заказы", labels)

    @mock.patch("server.bot.send_message")
    @mock.patch("server.bot.db.list_products", return_value=[])
    def test_empty_category_is_explained(self, _items, send):
        show_category(42, "skincare")
        self.assertIn("пока нет товаров", send.call_args.args[1])

    @mock.patch("server.bot.answer_callback")
    @mock.patch("server.bot.show_cart")
    @mock.patch("server.bot.db.add_to_cart")
    @mock.patch("server.bot.db.is_ready", return_value=True)
    def test_selected_quantity_is_added(self, _ready, add, show_cart_mock, _answer):
        callback = {
            "id": "cb-1", "data": "add:ordinary:4",
            "from": {"id": 42, "first_name": "Buyer"},
            "message": {"chat": {"id": 42}},
        }
        handle_callback(callback)
        add.assert_called_once_with(42, "ordinary", 4)
        show_cart_mock.assert_called_once_with(42, 42)


if __name__ == "__main__":
    unittest.main()
