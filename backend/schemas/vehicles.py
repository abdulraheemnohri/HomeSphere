from pydantic import BaseModel, Field
from datetime import date, datetime
from typing import Optional, List, Dict, Any
from enum import Enum

from .base import BaseSchema, TimestampSchema


class VehicleType(str, Enum):
    CAR = "car"
    BIKE = "bike"
    TRUCK = "truck"
    TRACTOR = "tractor"
    BUS = "bus"
    VAN = "van"
    BOAT = "boat"
    OTHER = "other"


class FuelType(str, Enum):
    PETROL = "petrol"
    DIESEL = "diesel"
    ELECTRIC = "electric"
    HYBRID = "hybrid"
    CNG = "cng"
    LPG = "lpg"
    OTHER = "other"


class TransmissionType(str, Enum):
    MANUAL = "manual"
    AUTOMATIC = "automatic"


class VehicleBase(BaseSchema):
    name: str = Field(..., min_length=1, max_length=255)
    vehicle_type: VehicleType
    make: Optional[str] = Field(None, max_length=100)
    model: Optional[str] = Field(None, max_length=100)
    year: Optional[int] = None
    registration_number: Optional[str] = Field(None, max_length=50)
    mileage: float = 0
    mileage_unit: str = "km"
    purchase_date: Optional[date] = None
    purchase_price: Optional[float] = None
    current_value: Optional[float] = None
    fuel_type: Optional[FuelType] = None
    transmission: Optional[TransmissionType] = None
    insurance_expiry_date: Optional[date] = None
    is_active: bool = True
    notes: Optional[str] = Field(None, max_length=1000)


class VehicleCreate(VehicleBase):
    pass


class VehicleResponse(TimestampSchema, VehicleBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True