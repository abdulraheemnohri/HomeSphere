from pydantic import BaseModel, Field
from datetime import date, datetime
from typing import Optional, List, Dict, Any
from enum import Enum

from .base import BaseSchema, TimestampSchema


class AnimalType(str, Enum):
    DOG = "dog"
    CAT = "cat"
    COW = "cow"
    BUFFALO = "buffalo"
    GOAT = "goat"
    SHEEP = "sheep"
    CHICKEN = "chicken"
    DUCK = "duck"
    TURKEY = "turkey"
    HORSE = "horse"
    DONKEY = "donkey"
    FISH = "fish"
    BIRD = "bird"
    OTHER = "other"


class AnimalGender(str, Enum):
    MALE = "male"
    FEMALE = "female"


class AnimalBase(BaseSchema):
    name: str = Field(..., min_length=1, max_length=255)
    animal_type: AnimalType = Field(..., description="Type of animal")
    breed: Optional[str] = Field(None, max_length=100)
    gender: AnimalGender = AnimalGender.MALE
    date_of_birth: Optional[date] = None
    age: Optional[int] = None
    color: Optional[str] = Field(None, max_length=50)
    weight: Optional[float] = None
    weight_unit: str = "kg"
    microchip_number: Optional[str] = Field(None, max_length=100)
    is_sterilized: bool = False
    health_status: Optional[str] = Field(None, max_length=255)
    vaccination_records: Optional[List[Dict[str, Any]]] = []
    medical_history: Optional[str] = Field(None, max_length=2000)
    diet: Optional[str] = Field(None, max_length=500)
    production_tracking: Optional[Dict[str, Any]] = None
    breeding_status: Optional[str] = Field(None, max_length=255)
    pregnancy_due_date: Optional[date] = None
    purchase_date: Optional[date] = None
    purchase_price: Optional[float] = None
    current_value: Optional[float] = None
    is_active: bool = True
    photos: Optional[List[str]] = []
    notes: Optional[str] = Field(None, max_length=1000)


class AnimalCreate(AnimalBase):
    pass


class AnimalResponse(TimestampSchema, AnimalBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True


class VaccinationRecordBase(BaseSchema):
    vaccine_name: str = Field(..., max_length=255)
    vaccination_date: date = Field(..., description="Vaccination date")
    next_due_date: Optional[date] = None
    notes: Optional[str] = Field(None, max_length=1000)


class VaccinationRecordCreate(VaccinationRecordBase):
    animal_id: int = Field(..., description="Parent animal ID")


class VaccinationRecordResponse(TimestampSchema, VaccinationRecordBase):
    id: int
    animal_id: int

    class Config:
        from_attributes = True