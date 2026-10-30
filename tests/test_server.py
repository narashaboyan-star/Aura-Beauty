import hashlib
import hmac
import json
import os
import tempfile
import time
import unittest
from urllib.parse import urlencode

from server import db
from server.auth import TelegramAuthError, validate_init_data
from server.bot import main_keyboard


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
        raw = signed_init_data(token, {"id": 42, "first_name": "Nara", "username": "nara"}, now)
        identity = validate_init_data(raw, token, now=now)
        self.assertEqual(identity["telegram_id"], 42)
        self.assertEqual(identity["username"], "nara")

    def test_rejects_tampering_and_expired_data(self):
        token = "123456:test-token"
        now = int(time.time())
        raw = signed_init_data(token, {"id": 42, "first_name": "Nara"}, now)
        with self.assertRaises(TelegramAuthError):
            validate_init_data(raw.replace("Nara", "Other"), token, now=now)
        old = signed_init_data(token, {"id": 42, "first_name": "Nara"}, now - 901)
        with self.assertRaises(TelegramAuthError):
            validate_init_data(old, token, now=now)


class DatabaseTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        os.environ.pop("DATABASE_URL", None)
        os.environ["AURA_SQLITE_PATH"] = os.path.join(self.temp.name, "aura.db")
        self.identity = {"telegram_id": 42, "username": "nara", "first_name": "Nara", "last_name": ""}

    def tearDown(self):
        os.environ.pop("AURA_SQLITE_PATH", None)
        self.temp.cleanup()

    def payload(self):
        return {
            "customer": {"name": "Nara", "phone": "+374 99 123 456", "email": "", "comment": ""},
            "delivery": {"method": "post", "address": "Yerevan, Test 1", "date": "", "time": ""},
            "paymentMethod": "on-receipt", "currency": "USD",
            "items": [{"id": "ordinary", "quantity": 2, "variant": ""}],
        }

    def test_order_is_owned_and_status_is_shared(self):
        order = db.create_order(self.identity, self.payload(), "mini_app")
        self.assertTrue(order["id"].startswith("AB-"))
        self.assertEqual(order["total_usd"], 12.0)
        self.assertEqual(len(db.list_orders(42)), 1)
        self.assertEqual(db.list_orders(999), [])
        updated = db.update_status(order["id"], "confirmed")
        self.assertEqual(updated["status"], "confirmed")
        self.assertEqual(db.list_orders(42)[0]["status"], "confirmed")

    def test_cart_and_bot_state_are_isolated(self):
        db.add_to_cart(42, "ordinary")
        db.add_to_cart(42, "ordinary")
        db.add_to_cart(99, "cosrx")
        self.assertEqual(db.cart_items(42)[0]["quantity"], 2)
        self.assertEqual(db.cart_items(99)[0]["product_id"], "cosrx")
        db.set_state(42, "checkout_name", {"x": 1})
        self.assertEqual(db.get_state(42)["flow"], "checkout_name")
        self.assertEqual(db.get_state(99)["flow"], "")

    def test_rejects_client_price_and_unknown_product(self):
        payload = self.payload()
        payload["items"][0]["price"] = 0.01
        order = db.create_order(self.identity, payload, "mini_app")
        self.assertEqual(order["total_usd"], 12.0)
        payload["items"] = [{"id": "missing", "quantity": 1}]
        with self.assertRaises(ValueError):
            db.create_order(self.identity, payload, "mini_app")


class BotPresentationTests(unittest.TestCase):
    def test_main_keyboard_uses_web_app_button(self):
        os.environ["SITE_ORIGIN"] = "https://example.com"
        button = main_keyboard()[0][0]
        self.assertEqual(button["web_app"]["url"], "https://example.com/products.html")


if __name__ == "__main__":
    unittest.main()
