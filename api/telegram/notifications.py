from http.server import BaseHTTPRequestHandler

from server import db
from server.auth import TelegramAuthError, parse_authorization, validate_init_data
from server.config import bot_token
from server.http import JSONHandlerMixin


def _identity(headers):
    return validate_init_data(parse_authorization(headers.get("Authorization")), bot_token())


def _public(settings):
    return {
        "enabled": settings["enabled"],
        "writeAccess": settings["write_access"],
        "canRequestWriteAccess": settings["write_access"] not in {"chat_started", "granted_signed", "granted_client"},
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
        db.record_customer(identity)
        if identity.get("allows_write_to_pm"):
            db.set_write_access(identity["telegram_id"], "granted_signed", "mini_app_init_data")
        self.send_json(200, {"ok": True, "notifications": _public(db.get_notification_settings(identity["telegram_id"]))})

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
        db.record_customer(identity)
        enabled = payload.get("enabled") is True
        if not enabled:
            access = "denied" if payload.get("writeAccessDenied") is True else None
            settings = db.set_notification_preference(identity["telegram_id"], False, access, "mini_app")
        else:
            signed = identity.get("allows_write_to_pm") is True
            client_granted = payload.get("writeAccessGranted") is True
            if not signed and not client_granted:
                self.send_error_json(409, "write_access_required", "Telegram write permission is required")
                return
            access = "granted_signed" if signed else "granted_client"
            settings = db.set_notification_preference(identity["telegram_id"], True, access, "mini_app")
        self.send_json(200, {"ok": True, "notifications": _public(settings)})
