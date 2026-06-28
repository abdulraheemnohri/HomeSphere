from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

from .base import BaseSchema, TimestampSchema


class UserBase(BaseSchema):
    email: EmailStr
    full_name: Optional[str] = None
    is_admin: bool = False


class UserCreate(UserBase):
    password: str = Field(..., min_length=8, description="User password")


class UserLogin(BaseSchema):
    email: EmailStr
    password: str


class PINLogin(BaseSchema):
    email: EmailStr
    pin: str = Field(..., min_length=4, max_length=4, description="4-digit PIN")


class UserUpdate(BaseSchema):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    is_admin: Optional[bool] = None


class UserResponse(TimestampSchema, UserBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True


class TokenResponse(BaseSchema):
    access_token: str
    refresh_token: Optional[str] = None
    token_type: str = "bearer"
    expires_in: int = 1800  # 30 minutes in seconds


class TokenData(BaseSchema):
    user_id: Optional[int] = None
    email: Optional[str] = None
    is_pin_login: bool = False