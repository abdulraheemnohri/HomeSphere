from pydantic import BaseModel, Field
from datetime import date, datetime
from typing import Optional, List
from enum import Enum

from .base import BaseSchema, TimestampSchema


class EmergencyContactBase(BaseSchema):
    name: str = Field(..., min_length=1, max_length=255)
    relationship: str = Field(..., max_length=100)
    phone: str = Field(..., max_length=20)
    email: Optional[str] = Field(None, max_length=255)
    address: Optional[str] = Field(None, max_length=500)
    city: Optional[str] = Field(None, max_length=100)
    country: Optional[str] = Field(None, max_length=100)
    is_primary: bool = False
    is_doctor: bool = False
    is_police: bool = False
    is_fire: bool = False
    is_ambulance: bool = False
    notes: Optional[str] = Field(None, max_length=1000)


class EmergencyContactCreate(EmergencyContactBase):
    family_member_id: Optional[int] = None


class EmergencyContactResponse(TimestampSchema, EmergencyContactBase):
    id: int
    user_id: int
    family_member_id: Optional[int] = None

    class Config:
        from_attributes = True


class EmergencyInfoBase(BaseSchema):
    emergency_type: str = Field(..., max_length=100)
    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=2000)
    instructions: Optional[str] = Field(None, max_length=2000)
    contact_numbers: Optional[List[str]] = []
    documents: Optional[List[str]] = []
    location: Optional[str] = Field(None, max_length=500)
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    is_active: bool = True
    notes: Optional[str] = Field(None, max_length=1000)


class EmergencyInfoCreate(EmergencyInfoBase):
    pass


class EmergencyInfoResponse(TimestampSchema, EmergencyInfoBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True