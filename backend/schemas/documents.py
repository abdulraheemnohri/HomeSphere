from pydantic import BaseModel, Field
from datetime import date, datetime
from typing import Optional
from enum import Enum

from .base import BaseSchema, TimestampSchema


class DocumentType(str, Enum):
    IDENTITY = "identity"
    PROPERTY = "property"
    VEHICLE = "vehicle"
    EDUCATION = "education"
    MEDICAL = "medical"
    FINANCIAL = "financial"
    LEGAL = "legal"
    INSURANCE = "insurance"
    CONTRACT = "contract"
    CERTIFICATE = "certificate"
    OTHER = "other"


class DocumentBase(BaseSchema):
    title: str = Field(..., min_length=1, max_length=255)
    document_type: DocumentType
    description: Optional[str] = Field(None, max_length=1000)
    file_path: str = Field(..., max_length=500)
    file_name: str = Field(..., max_length=255)
    file_size: int = Field(..., gt=0)
    file_type: str = Field(..., max_length=100)
    issue_date: Optional[date] = None
    expiry_date: Optional[date] = None
    issued_by: Optional[str] = Field(None, max_length=255)
    reference_number: Optional[str] = Field(None, max_length=100)
    is_verified: bool = False
    is_active: bool = True
    notes: Optional[str] = Field(None, max_length=1000)


class DocumentCreate(DocumentBase):
    pass


class DocumentResponse(TimestampSchema, DocumentBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True