from pydantic import BaseModel, Field
from datetime import date, datetime
from typing import Optional, List, Dict, Any
from enum import Enum

from .base import BaseSchema, TimestampSchema


class CropType(str, Enum):
    WHEAT = "wheat"
    RICE = "rice"
    CORN = "corn"
    SUGARCANE = "sugarcane"
    COTTON = "cotton"
    VEGETABLES = "vegetables"
    FRUITS = "fruits"
    OTHER = "other"


class FieldStatus(str, Enum):
    PLANTED = "planted"
    GROWING = "growing"
    READY_FOR_HARVEST = "ready_for_harvest"
    HARVESTED = "harvested"
    FALLOW = "fallow"


class FieldBase(BaseSchema):
    name: str = Field(..., min_length=1, max_length=255)
    location: Optional[str] = Field(None, max_length=500)
    area: float = Field(..., gt=0)
    area_unit: str = "acres"
    soil_type: Optional[str] = Field(None, max_length=100)
    crop_type: Optional[CropType] = None
    planting_date: Optional[date] = None
    expected_harvest_date: Optional[date] = None
    status: FieldStatus = FieldStatus.FALLOW
    irrigation_method: Optional[str] = Field(None, max_length=100)
    is_active: bool = True
    notes: Optional[str] = Field(None, max_length=1000)


class FieldCreate(FieldBase):
    pass


class FieldResponse(TimestampSchema, FieldBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True


class EquipmentType(str, Enum):
    TRACTOR = "tractor"
    PLOW = "plow"
    HARVESTER = "harvester"
    IRRIGATION = "irrigation"
    SPRAYER = "sprayer"
    OTHER = "other"


class FarmEquipmentBase(BaseSchema):
    name: str = Field(..., min_length=1, max_length=255)
    equipment_type: EquipmentType
    brand: Optional[str] = Field(None, max_length=100)
    model: Optional[str] = Field(None, max_length=100)
    purchase_date: Optional[date] = None
    purchase_price: Optional[float] = None
    current_value: Optional[float] = None
    last_maintenance_date: Optional[date] = None
    next_maintenance_date: Optional[date] = None
    is_active: bool = True
    notes: Optional[str] = Field(None, max_length=1000)


class FarmEquipmentCreate(FarmEquipmentBase):
    pass


class FarmEquipmentResponse(TimestampSchema, FarmEquipmentBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True


class HarvestRecordBase(BaseSchema):
    field_id: int = Field(..., description="Parent field ID")
    harvest_date: date = Field(..., description="Harvest date")
    crop_type: CropType = Field(..., description="Crop type")
    yield_amount: float = Field(..., gt=0)
    yield_unit: str = Field(..., max_length=50)
    total_value: Optional[float] = None
    notes: Optional[str] = Field(None, max_length=1000)


class HarvestRecordCreate(HarvestRecordBase):
    pass


class HarvestRecordResponse(TimestampSchema, HarvestRecordBase):
    id: int

    class Config:
        from_attributes = True