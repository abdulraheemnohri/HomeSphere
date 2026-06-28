import re
from typing import Optional


def validate_email(email: str) -> bool:
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None


def validate_phone(phone: str) -> bool:
    pattern = r'^+?[0-9s-]{10,}$'
    return re.match(pattern, phone) is not None


def validate_password(password: str, min_length: int = 8) -> bool:
    if len(password) < min_length:
        return False
    return True