from pydantic import BaseModel, Field
from datetime import date, datetime
from typing import Optional, List, Dict, Any
from enum import Enum

from .base import BaseSchema, TimestampSchema


class ThemeMode(str, Enum):
    LIGHT = "light"
    DARK = "dark"
    SYSTEM = "system"


class Language(str, Enum):
    ENGLISH = "en"
    URDU = "ur"
    ARABIC = "ar"
    SPANISH = "es"
    FRENCH = "fr"
    GERMAN = "de"
    CHINESE = "zh"
    HINDI = "hi"


class Currency(str, Enum):
    USD = "USD"
    EUR = "EUR"
    GBP = "GBP"
    PKR = "PKR"
    INR = "INR"
    AED = "AED"
    SAR = "SAR"
    CAD = "CAD"
    AUD = "AUD"


class DateFormat(str, Enum):
    MM_DD_YYYY = "MM/DD/YYYY"
    DD_MM_YYYY = "DD/MM/YYYY"
    YYYY_MM_DD = "YYYY-MM-DD"


class UserSettingsBase(BaseSchema):
    theme_mode: ThemeMode = ThemeMode.SYSTEM
    language: Language = Language.ENGLISH
    currency: Currency = Currency.USD
    date_format: DateFormat = DateFormat.YYYY_MM_DD
    time_format: str = "24-hour"
    timezone: str = "UTC"
    start_of_week: int = 0
    fiscal_year_start: int = 1
    default_view: str = "dashboard"
    notifications_enabled: bool = True
    email_notifications: bool = True
    sms_notifications: bool = False
    push_notifications: bool = True
    sound_enabled: bool = True
    animation_enabled: bool = True
    auto_backup: bool = True
    backup_frequency: str = "daily"
    max_backups: int = 7


class UserSettingsCreate(UserSettingsBase):
    pass


class UserSettingsUpdate(BaseSchema):
    theme_mode: Optional[ThemeMode] = None
    language: Optional[Language] = None
    currency: Optional[Currency] = None
    date_format: Optional[DateFormat] = None
    time_format: Optional[str] = Field(None, max_length=20)
    timezone: Optional[str] = Field(None, max_length=50)
    start_of_week: Optional[int] = None
    fiscal_year_start: Optional[int] = None
    default_view: Optional[str] = Field(None, max_length=50)
    notifications_enabled: Optional[bool] = None
    email_notifications: Optional[bool] = None
    sms_notifications: Optional[bool] = None
    push_notifications: Optional[bool] = None
    sound_enabled: Optional[bool] = None
    animation_enabled: Optional[bool] = None
    auto_backup: Optional[bool] = None
    backup_frequency: Optional[str] = Field(None, max_length=20)
    max_backups: Optional[int] = None


class UserSettingsResponse(TimestampSchema, UserSettingsBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True


class AppSettingsBase(BaseSchema):
    app_name: str = Field(default="HomeSphere", max_length=100)
    app_version: str = Field(default="1.0.0", max_length=20)
    maintenance_mode: bool = False
    registration_enabled: bool = True
    max_users: Optional[int] = None
    default_country: str = Field(default="US", max_length=100)
    support_email: str = Field(default="support@homesphere.com", max_length=255)
    support_phone: Optional[str] = Field(None, max_length=20)
    privacy_policy_url: Optional[str] = Field(None, max_length=500)
    terms_of_service_url: Optional[str] = Field(None, max_length=500)


class AppSettingsCreate(AppSettingsBase):
    pass


class AppSettingsUpdate(BaseSchema):
    app_name: Optional[str] = Field(None, max_length=100)
    app_version: Optional[str] = Field(None, max_length=20)
    maintenance_mode: Optional[bool] = None
    registration_enabled: Optional[bool] = None
    max_users: Optional[int] = None
    default_country: Optional[str] = Field(None, max_length=100)
    support_email: Optional[str] = Field(None, max_length=255)
    support_phone: Optional[str] = Field(None, max_length=20)
    privacy_policy_url: Optional[str] = Field(None, max_length=500)
    terms_of_service_url: Optional[str] = Field(None, max_length=500)


class AppSettingsResponse(TimestampSchema, AppSettingsBase):
    id: int

    class Config:
        from_attributes = True