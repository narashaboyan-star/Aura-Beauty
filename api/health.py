from http.server import BaseHTTPRequestHandler

from server import db
from server.config import bot_token, site_origin, webhook_secret
from server.http import JSONHandlerMixin


class handler(JSONHandlerMixin, BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_json(200, {
            "ok": True,
            "databaseConfigured": db.is_ready(),
            "telegramConfigured": bool(bot_token()),
            "webhookSecretConfigured": bool(webhook_secret()),
            "siteOriginConfigured": bool(site_origin()),
        })
