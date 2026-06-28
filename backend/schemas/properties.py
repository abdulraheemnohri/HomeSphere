from pydantic import BaseModel, Field
from datetime import date, datetime
from typing import Optional, List, Dict, Any
from enum import Enum

from .base import BaseSchema, TimestampSchema


class PropertyType(str, Enum):
    HOUSE = "house"
    APARTMENT = "apartment"
    LAND = "land"
    COMMERCIAL = "commercial"
    VILLA = "villa"
    FARM = "farm"
    OTHER = "other"


class PropertyBase(BaseSchema):
    name: str = Field(..., min_length=1, max_length=255)
    property_type: PropertyType = Field(..., description="Type of property")
    address: Dict[str, Any] = Field(..., description="Property address")
    purchase_date: Optional[date] = None
    purchase_price: Optional[float] = None
    current_value: Optional[float] = None
    area: Optional[float] = None
    area_unit: str = "sq ft"
    bedrooms: Optional[int] = None
    bathrooms: Optional[int] = None
    floors: Optional[int] = None
    has_garage: bool = False
    has_garden: bool = False
    has_swimming_pool: bool = False
    is_rented: bool = False
    monthly_rent: Optional[float] = None
    tenant_name: Optional[str] = Field(None, max_length=255)
    tenant_contact: Optional[str] = Field(None, max_length=255)
    lease_start_date: Optional[date] = None
    lease_end_date: Optional[date] = None
    is_active: bool = True
    notes: Optional[str] = Field(None, max_length=1000)


class PropertyCreate(PropertyBase):
    pass


class PropertyResponse(TimestampSchema, PropertyBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True


class RoomBase(BaseSchema):
    name: str = Field(..., min_length=1, max_length=255)
    room_type: str = Field(..., max_length=100)
    area: Optional[float] = None
    area_unit: str = "sq ft"
    floor_number: Optional[int] = None
    has_window: bool = False
    has_bathroom: bool = False
    has_ac: bool = False
    has_heater: bool = False
    furniture: Optional[List[Dict[str, Any]]] = []
    electronics: Optional[List[Dict[str, Any]]] = []
    cleaning_schedule: Optional[str] = Field(None, max_length=100)
    last_cleaned: Optional[date] = None
    next_cleaning: Optional[date] = None
    maintenance_notes: Optional[str] = Field(None, max_length=1000)
    photos: Optional[List[str]] = []
    is_active: bool = True


class RoomCreate(RoomBase):
    property_id: int = Field(..., description="Parent property ID")


class RoomResponse(TimestampSchema, RoomBase):
    id: int
    property_id: int
    user_id: int

    class Config:
        from_attributes = True