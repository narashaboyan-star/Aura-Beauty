from http.server import BaseHTTPRequestHandler

from server import db
from server.auth import TelegramAuthError, parse_authorization, validate_init_data
from server.bot import notify_admins
from server.config import bot_token
from server.http import JSONHandlerMixin


def _identity(headers):
    return validate_init_data(parse_authorization(headers.get("Authorization")), bot_token())


def _public_order(order):
    return {
        "id": order["id"], "status": order["status"], "source": order["source"],
        "totalUsd": order["total_usd"], "createdAt": order["created_at"],
        "updatedAt": order["updated_at"],
        "deliveryMethod": order["delivery_method"], "paymentMethod": order["payment_method"],
        "items": order.get("items", []),
    }


class handler(JSONHandlerMixin, BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            identity = _identity(self.headers)
        except TelegramAuthError:
            self.send_error_json(401, "telegram_auth_failed", "Telegram session could not be verified")
            return
        if not db.is_ready():
            self.send_error_json(503, "database_unavailable", "Order storage is not configured")
            return
        orders = [_public_order(order) for order in db.list_orders(identity["telegram_id"])]
        self.send_json(200, {"ok": True, "orders": orders})

    def do_POST(self):
        try:
            identity = _identity(self.headers)
            payload = self.read_json()
        except TelegramAuthError:
            self.send_error_json(401, "telegram_auth_failed", "Telegram session could not be verified")
            return
        except ValueError:
            self.send_error_json(400, "invalid_json", "Request body is invalid")
            return
        if not db.is_ready():
            self.send_error_json(503, "database_unavailable", "Order storage is not configured")
            return
        try:
            order = db.create_order(identity, payload, "mini_app")
        except ValueError as exc:
            self.send_error_json(422, "invalid_order", str(exc))
            return
        notify_admins(order)
        self.send_json(201, {"ok": True, "order": _public_order(order)})
