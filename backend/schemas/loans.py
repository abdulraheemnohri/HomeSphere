from pydantic import BaseModel, Field
from datetime import date, datetime
from typing import Optional, Dict, Any
from enum import Enum

from .base import BaseSchema, TimestampSchema


class LoanStatus(str, Enum):
    ACTIVE = "active"
    PAID = "paid"
    CLOSED = "closed"


class LoanType(str, Enum):
    PERSONAL = "personal"
    HOME = "home"
    CAR = "car"
    STUDENT = "student"
    BUSINESS = "business"
    OTHER = "other"


class RepaymentFrequency(str, Enum):
    MONTHLY = "monthly"
    QUARTERLY = "quarterly"
    YEARLY = "yearly"
    ONE_TIME = "one_time"


class LoanBase(BaseSchema):
    name: str = Field(..., min_length=1, max_length=255)
    loan_type: LoanType
    lender: str = Field(..., max_length=255)
    amount: float = Field(..., gt=0)
    interest_rate: float = 0
    start_date: date
    end_date: Optional[date] = None
    status: LoanStatus = LoanStatus.ACTIVE
    monthly_payment: Optional[float] = None
    repayment_frequency: RepaymentFrequency = RepaymentFrequency.MONTHLY
    total_paid: float = 0
    next_payment_date: Optional[date] = None
    next_payment_amount: Optional[float] = None
    is_insured: bool = False
    notes: Optional[str] = Field(None, max_length=1000)


class LoanCreate(LoanBase):
    pass


class LoanResponse(TimestampSchema, LoanBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True


class LoanPaymentBase(BaseSchema):
    loan_id: int = Field(..., description="Parent loan ID")
    amount: float = Field(..., gt=0)
    payment_date: date = Field(..., description="Payment date")
    payment_method: str = Field(..., max_length=50)
    notes: Optional[str] = Field(None, max_length=1000)


class LoanPaymentCreate(LoanPaymentBase):
    pass


class LoanPaymentResponse(TimestampSchema, LoanPaymentBase):
    id: int

    class Config:
        from_attributes = True