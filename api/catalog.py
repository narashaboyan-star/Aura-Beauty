from http.server import BaseHTTPRequestHandler

from server import db
from server.catalog import CATEGORIES
from server.http import JSONHandlerMixin


def _public_product(item):
    return {
        "id": item["id"], "category": item["category"], "brand": item["brand"],
        "name": item["name"], "priceUsd": item["price"],
        "available": db.product_is_available(item),
        "stockQuantity": item["stock_quantity"], "updatedAt": item["updated_at"],
    }


class handler(JSONHandlerMixin, BaseHTTPRequestHandler):
    def do_GET(self):
        if not db.is_ready():
            self.send_error_json(503, "catalog_unavailable", "Catalog storage is not configured")
            return
        self.send_json(200, {
            "ok": True,
            "categories": CATEGORIES,
            "products": [_public_product(item) for item in db.list_products()],
        })
