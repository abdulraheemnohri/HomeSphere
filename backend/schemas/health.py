from pydantic import BaseModel, Field
from datetime import date, datetime
from typing import Optional, List, Dict, Any
from enum import Enum

from .base import BaseSchema, TimestampSchema


class BloodGroup(str, Enum):
    A_POS = "A+"
    A_NEG = "A-"
    B_POS = "B+"
    B_NEG = "B-"
    AB_POS = "AB+"
    AB_NEG = "AB-"
    O_POS = "O+"
    O_NEG = "O-"


class HealthRecordType(str, Enum):
    MEDICAL_HISTORY = "medical_history"
    ALLERGY = "allergy"
    SURGERY = "surgery"
    MEDICATION = "medication"
    VACCINATION = "vaccination"
    LAB_TEST = "lab_test"
    DIAGNOSIS = "diagnosis"
    PRESCRIPTION = "prescription"
    OTHER = "other"


class HealthRecordBase(BaseSchema):
    record_type: HealthRecordType = Field(..., description="Type of health record")
    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=2000)
    date: date = Field(..., description="Record date")
    doctor_name: Optional[str] = Field(None, max_length=255)
    doctor_contact: Optional[str] = Field(None, max_length=255)
    hospital_clinic: Optional[str] = Field(None, max_length=255)
    cost: Optional[float] = None
    payment_method: Optional[str] = Field(None, max_length=50)
    insurance_claimed: bool = False
    insurance_amount: Optional[float] = None
    follow_up_date: Optional[date] = None
    is_active: bool = True
    notes: Optional[str] = Field(None, max_length=1000)


class HealthRecordCreate(HealthRecordBase):
    family_member_id: Optional[int] = None


class HealthRecordResponse(TimestampSchema, HealthRecordBase):
    id: int
    user_id: int
    family_member_id: Optional[int] = None

    class Config:
        from_attributes = True


class AllergyBase(BaseSchema):
    name: str = Field(..., min_length=1, max_length=255)
    severity: Optional[str] = Field(None, max_length=50)
    reaction: Optional[str] = Field(None, max_length=500)
    treatment: Optional[str] = Field(None, max_length=500)
    discovered_date: Optional[date] = None
    is_active: bool = True


class AllergyCreate(AllergyBase):
    family_member_id: Optional[int] = None


class AllergyResponse(TimestampSchema, AllergyBase):
    id: int
    user_id: int
    family_member_id: Optional[int] = None

    class Config:
        from_attributes = True


class EmergencyContactBase(BaseSchema):
    name: str = Field(..., min_length=1, max_length=255)
    relationship: str = Field(..., max_length=100)
    phone: str = Field(..., max_length=20)
    email: Optional[str] = Field(None, max_length=255)
    address: Optional[str] = Field(None, max_length=500)
    is_primary: bool = False
    notes: Optional[str] = Field(None, max_length=1000)


class EmergencyContactCreate(EmergencyContactBase):
    family_member_id: Optional[int] = None


class EmergencyContactResponse(TimestampSchema, EmergencyContactBase):
    id: int
    user_id: int
    family_member_id: Optional[int] = None

    class Config:
        from_attributes = True