from pydantic import BaseModel, Field
from datetime import date, datetime
from typing import Optional, List, Dict, Any
from enum import Enum

from .base import BaseSchema, TimestampSchema


class InventoryCategory(str, Enum):
    ELECTRONICS = "electronics"
    FURNITURE = "furniture"
    KITCHEN = "kitchen"
    BEDROOM = "bedroom"
    BATHROOM = "bathroom"
    LIVING_ROOM = "living_room"
    OFFICE = "office"
    TOOLS = "tools"
    CLOTHING = "clothing"
    BOOKS = "books"
    SPORTS = "sports"
    TOYS = "toys"
    DECORATION = "decoration"
    OTHER = "other"


class InventoryBase(BaseSchema):
    name: str = Field(..., min_length=1, max_length=255)
    category: InventoryCategory = Field(..., description="Item category")
    description: Optional[str] = Field(None, max_length=1000)
    quantity: int = 1
    unit: Optional[str] = Field(None, max_length=50)
    purchase_date: Optional[date] = None
    purchase_price: Optional[float] = None
    current_value: Optional[float] = None
    brand: Optional[str] = Field(None, max_length=100)
    model: Optional[str] = Field(None, max_length=100)
    serial_number: Optional[str] = Field(None, max_length=100)
    barcode: Optional[str] = Field(None, max_length=100)
    qr_code: Optional[str] = Field(None, max_length=100)
    location: Optional[str] = Field(None, max_length=255)
    room_id: Optional[int] = None
    condition: Optional[str] = Field(None, max_length=100)
    warranty_expiry: Optional[date] = None
    warranty_details: Optional[str] = Field(None, max_length=500)
    is_insured: bool = False
    insurance_details: Optional[Dict[str, Any]] = None
    maintenance_schedule: Optional[str] = Field(None, max_length=255)
    last_maintenance: Optional[date] = None
    next_maintenance: Optional[date] = None
    photos: Optional[List[str]] = []
    documents: Optional[List[str]] = []
    is_active: bool = True
    notes: Optional[str] = Field(None, max_length=1000)


class InventoryCreate(InventoryBase):
    pass


class InventoryResponse(TimestampSchema, InventoryBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True


class StockAlertBase(BaseSchema):
    item_id: int = Field(..., description="Parent inventory item ID")
    threshold_quantity: int = Field(..., gt=0)
    alert_message: Optional[str] = Field(None, max_length=500)
    is_active: bool = True


class StockAlertCreate(StockAlertBase):
    pass


class StockAlertResponse(TimestampSchema, StockAlertBase):
    id: int

    class Config:
        from_attributes = True