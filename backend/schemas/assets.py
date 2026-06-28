from pydantic import BaseModel, Field
from datetime import date, datetime
from typing import Optional, List, Dict, Any
from enum import Enum

from .base import BaseSchema, TimestampSchema


class AssetType(str, Enum):
    GOLD = "gold"
    SILVER = "silver"
    JEWELRY = "jewelry"
    CASH = "cash"
    ELECTRONICS = "electronics"
    FURNITURE = "furniture"
    MACHINERY = "machinery"
    ARTWORK = "artwork"
    COLLECTIBLE = "collectible"
    OTHER = "other"


class AssetCondition(str, Enum):
    NEW = "new"
    GOOD = "good"
    FAIR = "fair"
    POOR = "poor"


class AssetBase(BaseSchema):
    name: str = Field(..., min_length=1, max_length=255)
    asset_type: AssetType
    description: Optional[str] = Field(None, max_length=1000)
    purchase_date: Optional[date] = None
    purchase_price: Optional[float] = None
    current_value: Optional[float] = None
    quantity: float = 1
    unit: Optional[str] = Field(None, max_length=50)
    condition: AssetCondition = AssetCondition.GOOD
    location: Optional[str] = Field(None, max_length=255)
    brand: Optional[str] = Field(None, max_length=100)
    model: Optional[str] = Field(None, max_length=100)
    serial_number: Optional[str] = Field(None, max_length=100)
    warranty_expiry: Optional[date] = None
    is_insured: bool = False
    is_active: bool = True
    notes: Optional[str] = Field(None, max_length=1000)


class AssetCreate(AssetBase):
    pass


class AssetResponse(TimestampSchema, AssetBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True