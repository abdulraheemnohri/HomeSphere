from pydantic import BaseModel, Field
from datetime import date, datetime
from typing import Optional, List, Dict, Any
from enum import Enum

from .base import BaseSchema, TimestampSchema


class RoomType(str, Enum):
    BEDROOM = "bedroom"
    KITCHEN = "kitchen"
    LIVING_ROOM = "living_room"
    BATHROOM = "bathroom"
    DINING_ROOM = "dining_room"
    STUDY_ROOM = "study_room"
    STORAGE = "storage"
    GARAGE = "garage"
    OTHER = "other"


class RoomBase(BaseSchema):
    name: str = Field(..., min_length=1, max_length=255)
    room_type: RoomType
    area: Optional[float] = None
    area_unit: str = "sq ft"
    floor_number: Optional[int] = None
    has_window: bool = False
    has_bathroom: bool = False
    has_ac: bool = False
    cleaning_schedule: Optional[str] = Field(None, max_length=100)
    maintenance_notes: Optional[str] = Field(None, max_length=1000)
    is_active: bool = True
    notes: Optional[str] = Field(None, max_length=1000)


class RoomCreate(RoomBase):
    property_id: Optional[int] = None


class RoomResponse(TimestampSchema, RoomBase):
    id: int
    user_id: int
    property_id: Optional[int] = None

    class Config:
        from_attributes = True