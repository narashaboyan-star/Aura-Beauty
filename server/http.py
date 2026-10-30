import json


class JSONHandlerMixin:
    def read_json(self):
        try:
            length = min(int(self.headers.get("Content-Length", "0")), 1_000_000)
            return json.loads(self.rfile.read(length) or b"{}")
        except (TypeError, ValueError, json.JSONDecodeError):
            raise ValueError("invalid json")

    def send_json(self, status, payload):
        body = json.dumps(payload, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def send_error_json(self, status, code, message):
        self.send_json(status, {"ok": False, "error": code, "message": message})
