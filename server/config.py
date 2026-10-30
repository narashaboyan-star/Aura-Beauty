import os


def bot_token():
    return os.environ.get("TELEGRAM_BOT_TOKEN", "").strip()


def site_origin():
    return os.environ.get("SITE_ORIGIN", "").strip().rstrip("/")


def webhook_secret():
    return os.environ.get("TELEGRAM_WEBHOOK_SECRET", "").strip()


def admin_ids():
    values = os.environ.get("TELEGRAM_ADMIN_USER_IDS", "")
    result = set()
    for value in values.split(","):
        try:
            result.add(int(value.strip()))
        except ValueError:
            continue
    return result


def payment_details():
    return os.environ.get("TELEGRAM_PAYMENT_DETAILS", "").strip()
