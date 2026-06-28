from pydantic import BaseModel, Field
from datetime import date, datetime
from typing import Optional
from enum import Enum

from .base import BaseSchema, TimestampSchema


class AccountType(str, Enum):
    CHECKING = "checking"
    SAVINGS = "savings"
    CREDIT_CARD = "credit_card"
    LOAN = "loan"
    INVESTMENT = "investment"
    RETIREMENT = "retirement"
    OTHER = "other"


class BankAccountBase(BaseSchema):
    name: str = Field(..., min_length=1, max_length=255)
    account_type: AccountType = Field(..., description="Type of account")
    bank_name: str = Field(..., max_length=255)
    branch: Optional[str] = Field(None, max_length=255)
    account_number: str = Field(..., max_length=100)
    routing_number: Optional[str] = Field(None, max_length=100)
    iban: Optional[str] = Field(None, max_length=100)
    swift_code: Optional[str] = Field(None, max_length=50)
    current_balance: float = 0
    opening_balance: float = 0
    currency: str = "USD"
    interest_rate: Optional[float] = None
    is_active: bool = True
    is_primary: bool = False
    notes: Optional[str] = Field(None, max_length=1000)


class BankAccountCreate(BankAccountBase):
    pass


class BankAccountUpdate(BaseSchema):
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    account_type: Optional[AccountType] = None
    bank_name: Optional[str] = Field(None, max_length=255)
    branch: Optional[str] = Field(None, max_length=255)
    account_number: Optional[str] = Field(None, max_length=100)
    routing_number: Optional[str] = Field(None, max_length=100)
    iban: Optional[str] = Field(None, max_length=100)
    swift_code: Optional[str] = Field(None, max_length=50)
    current_balance: Optional[float] = None
    opening_balance: Optional[float] = None
    currency: Optional[str] = Field(None, max_length=10)
    interest_rate: Optional[float] = None
    is_active: Optional[bool] = None
    is_primary: Optional[bool] = None
    notes: Optional[str] = Field(None, max_length=1000)


class BankAccountResponse(TimestampSchema, BankAccountBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True


class TransactionBase(BaseSchema):
    account_id: int = Field(..., description="Parent account ID")
    transaction_type: str = Field(..., max_length=50)
    amount: float = Field(..., gt=0)
    date: date = Field(..., description="Transaction date")
    description: Optional[str] = Field(None, max_length=1000)
    reference: Optional[str] = Field(None, max_length=100)
    category: Optional[str] = Field(None, max_length=100)
    balance_after: Optional[float] = None
    is_reconciled: bool = False


class TransactionCreate(TransactionBase):
    pass


class TransactionResponse(TimestampSchema, TransactionBase):
    id: int

    class Config:
        from_attributes = True