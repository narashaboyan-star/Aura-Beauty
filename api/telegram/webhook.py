import hmac
from http.server import BaseHTTPRequestHandler

from server.bot import process_update
from server.config import webhook_secret
from server.http import JSONHandlerMixin


class handler(JSONHandlerMixin, BaseHTTPRequestHandler):
    def do_POST(self):
        expected = webhook_secret()
        received = self.headers.get("X-Telegram-Bot-Api-Secret-Token", "")
        if not expected:
            self.send_error_json(503, "webhook_not_configured", "Webhook secret is not configured")
            return
        if not hmac.compare_digest(received, expected):
            self.send_error_json(403, "invalid_webhook_secret", "Webhook secret is invalid")
            return
        try:
            update = self.read_json()
            process_update(update)
        except ValueError:
            self.send_error_json(400, "invalid_update", "Telegram update is invalid")
            return
        except RuntimeError:
            self.send_error_json(502, "telegram_api_error", "Telegram API request failed")
            return
        self.send_json(200, {"ok": True})
