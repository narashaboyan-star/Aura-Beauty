from http.server import BaseHTTPRequestHandler

from server import db
from server.auth import TelegramAuthError, parse_authorization, validate_init_data
from server.config import bot_token
from server.http import JSONHandlerMixin


class handler(JSONHandlerMixin, BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            raw = parse_authorization(self.headers.get("Authorization"))
            identity = validate_init_data(raw, bot_token())
        except TelegramAuthError:
            self.send_error_json(401, "telegram_auth_failed", "Telegram session could not be verified")
            return
        ready = db.is_ready()
        if ready:
            db.record_customer(identity)
        self.send_json(200, {
            "verified": True,
            "user": {"id": identity["telegram_id"], "firstName": identity["first_name"]},
            "capabilities": {"createOrders": ready, "viewOrders": ready},
        })
