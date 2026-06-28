from pydantic import BaseModel, Field
from datetime import date, datetime
from typing import Optional, List
from enum import Enum

from .base import BaseSchema, TimestampSchema


class Gender(str, Enum):
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"


class Relationship(str, Enum):
    SPOUSE = "spouse"
    CHILD = "child"
    PARENT = "parent"
    SIBLING = "sibling"
    GRANDPARENT = "grandparent"
    GRANDCHILD = "grandchild"
    UNCLE = "uncle"
    AUNT = "aunt"
    COUSIN = "cousin"
    NEPHEW = "nephew"
    NIECe = "niece"
    FRIEND = "friend"
    OTHER = "other"


class BloodGroup(str, Enum):
    A_POS = "A+"
    A_NEG = "A-"
    B_POS = "B+"
    B_NEG = "B-"
    AB_POS = "AB+"
    AB_NEG = "AB-"
    O_POS = "O+"
    O_NEG = "O-"


class FamilyMemberBase(BaseSchema):
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: Optional[str] = Field(None, max_length=100)
    full_name: Optional[str] = None
    relationship: Relationship
    gender: Gender
    date_of_birth: Optional[date] = None
    age: Optional[int] = None
    phone: Optional[str] = Field(None, max_length=20)
    email: Optional[str] = Field(None, max_length=255)
    blood_group: Optional[BloodGroup] = None
    cnic: Optional[str] = Field(None, max_length=50)
    occupation: Optional[str] = Field(None, max_length=100)
    photo: Optional[str] = Field(None, max_length=500)
    is_active: bool = True
    notes: Optional[str] = Field(None, max_length=1000)


class FamilyMemberCreate(FamilyMemberBase):
    pass


class FamilyMemberUpdate(BaseSchema):
    first_name: Optional[str] = Field(None, min_length=1, max_length=100)
    last_name: Optional[str] = Field(None, max_length=100)
    relationship: Optional[Relationship] = None
    gender: Optional[Gender] = None
    date_of_birth: Optional[date] = None
    age: Optional[int] = None
    phone: Optional[str] = Field(None, max_length=20)
    email: Optional[str] = Field(None, max_length=255)
    blood_group: Optional[BloodGroup] = None
    cnic: Optional[str] = Field(None, max_length=50)
    occupation: Optional[str] = Field(None, max_length=100)
    photo: Optional[str] = Field(None, max_length=500)
    is_active: Optional[bool] = None
    notes: Optional[str] = Field(None, max_length=1000)


class FamilyMemberResponse(TimestampSchema, FamilyMemberBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True


class FamilyTreeNode(BaseSchema):
    id: int
    name: str
    relationship: str
    gender: str
    children: List['FamilyTreeNode'] = []

    class Config:
        from_attributes = True