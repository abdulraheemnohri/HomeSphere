from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class BaseSchema(BaseModel):
    """Base schema with common fields."""
    class Config:
        from_attributes = True
        json_schema_extra = {"example": {"id": 1, "created_at": "2024-01-01T00:00:00", "updated_at": "2024-01-01T00:00:00"}}

class TimestampSchema(BaseSchema):
    """Schema with timestamp fields."""
    created_at: Optional[datetime] = Field(default=None, description="Creation timestamp")
    updated_at: Optional[datetime] = Field(default=None, description="Last update timestamp")