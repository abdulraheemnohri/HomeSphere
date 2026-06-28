from pydantic import BaseModel, Field
from datetime import date, datetime
from typing import Optional
from enum import Enum

from .base import BaseSchema, TimestampSchema
from .finance import ExpenseCategory, PaymentMethod, RecurringFrequency


class BillStatus(str, Enum):
    PENDING = "pending"
    PAID = "paid"
    OVERDUE = "overdue"
    CANCELLED = "cancelled"


class BillBase(BaseSchema):
    name: str = Field(..., min_length=1, max_length=255)
    category: ExpenseCategory
    amount: float = Field(..., gt=0)
    due_date: date
    issue_date: Optional[date] = None
    status: BillStatus = BillStatus.PENDING
    vendor: Optional[str] = Field(None, max_length=255)
    payment_method: Optional[PaymentMethod] = None
    reference_number: Optional[str] = Field(None, max_length=100)
    is_recurring: bool = False
    recurring_frequency: Optional[RecurringFrequency] = None
    notes: Optional[str] = Field(None, max_length=1000)


class BillCreate(BillBase):
    pass


class BillResponse(TimestampSchema, BillBase):
    id: int
    user_id: int
    payment_date: Optional[date] = None
    days_overdue: Optional[int] = None

    class Config:
        from_attributes = True