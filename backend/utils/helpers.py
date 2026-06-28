import uuid
import re
from datetime import datetime
from typing import Any, Dict, List, Optional


def generate_id() -> str:
    return str(uuid.uuid4())


def slugify(text: str, max_length: int = 100) -> str:
    text = text.lower()
    text = re.sub(r'[^ws-]', '', text)
    text = re.sub(r'[s_]+', '-', text)
    text = re.sub(r'-+', '-', text)
    return text.strip('-')[:max_length]


def get_current_timestamp() -> datetime:
    return datetime.utcnow()


def format_date(date: datetime, format: str = '%Y-%m-%d') -> str:
    return date.strftime(format)


def parse_bool(value: Any, default: bool = False) -> bool:
    if isinstance(value, bool):
        return value
    if isinstance(value, str):
        return value.lower() in ('true', '1', 'yes', 'y', 'on')
    return default


def merge_dicts(dict1: Dict, dict2: Dict) -> Dict:
    result = dict1.copy()
    for key, value in dict2.items():
        if key in result and isinstance(result[key], dict) and isinstance(value, dict):
            result[key] = merge_dicts(result[key], value)
        else:
            result[key] = value
    return result


def remove_none_values(d: Dict) -> Dict:
    return {k: v for k, v in d.items() if v is not None}