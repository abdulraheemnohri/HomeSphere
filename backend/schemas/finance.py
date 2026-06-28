from pydantic import BaseModel, Field
from datetime import date, datetime
from typing import Optional, List
from enum import Enum

from .base import BaseSchema, TimestampSchema


class TransactionType(str, Enum):
    INCOME = "income"
    EXPENSE = "expense"


class IncomeCategory(str, Enum):
    SALARY = "salary"
    BUSINESS = "business"
    RENTAL = "rental"
    INVESTMENT = "investment"
    GIFT = "gift"
    INTEREST = "interest"
    OTHER = "other"


class ExpenseCategory(str, Enum):
    FOOD = "food"
    TRANSPORTATION = "transportation"
    HOUSING = "housing"
    UTILITIES = "utilities"
    HEALTH = "health"
    EDUCATION = "education"
    ENTERTAINMENT = "entertainment"
    SHOPPING = "shopping"
    TRAVEL = "travel"
    SAVINGS = "savings"
    INVESTMENT = "investment"
    DONATION = "donation"
    OTHER = "other"


class PaymentMethod(str, Enum):
    CASH = "cash"
    BANK_TRANSFER = "bank_transfer"
    CREDIT_CARD = "credit_card"
    DEBIT_CARD = "debit_card"
    MOBILE_WALLET = "mobile_wallet"
    CHEQUE = "cheque"
    ONLINE = "online"
    OTHER = "other"


class RecurringFrequency(str, Enum):
    DAILY = "daily"
    WEEKLY = "weekly"
    MONTHLY = "monthly"
    QUARTERLY = "quarterly"
    YEARLY = "yearly"
    ONE_TIME = "one_time"


class IncomeBase(BaseSchema):
    amount: float = Field(..., gt=0)
    date: date
    category: IncomeCategory
    source: Optional[str] = Field(None, max_length=255)
    payment_method: PaymentMethod = PaymentMethod.CASH
    reference_number: Optional[str] = Field(None, max_length=100)
    notes: Optional[str] = Field(None, max_length=1000)
    is_recurring: bool = False
    recurring_frequency: Optional[RecurringFrequency] = None
    recurring_end_date: Optional[date] = None


class IncomeCreate(IncomeBase):
    pass


class IncomeResponse(TimestampSchema, IncomeBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True


class ExpenseBase(BaseSchema):
    amount: float = Field(..., gt=0)
    date: date
    category: ExpenseCategory
    subcategory: Optional[str] = Field(None, max_length=100)
    payment_method: PaymentMethod = PaymentMethod.CASH
    reference_number: Optional[str] = Field(None, max_length=100)
    payee: Optional[str] = Field(None, max_length=255)
    notes: Optional[str] = Field(None, max_length=1000)
    is_recurring: bool = False
    recurring_frequency: Optional[RecurringFrequency] = None


class ExpenseCreate(ExpenseBase):
    pass


class ExpenseResponse(TimestampSchema, ExpenseBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True


class BudgetBase(BaseSchema):
    name: str = Field(..., min_length=1, max_length=255)
    allocated_amount: float = Field(..., gt=0)
    current_spent: float = 0
    start_date: date
    end_date: date
    is_active: bool = True
    notes: Optional[str] = Field(None, max_length=1000)


class BudgetCreate(BudgetBase):
    pass


class BudgetResponse(TimestampSchema, BudgetBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True


class BillStatus(str, Enum):
    PENDING = "pending"
    PAID = "paid"
    OVERDUE = "overdue"
    CANCELLED = "cancelled"


class BillBase(BaseSchema):
    name: str = Field(..., min_length=1, max_length=255)
    amount: float = Field(..., gt=0)
    due_date: date
    status: BillStatus = BillStatus.PENDING
    vendor: Optional[str] = Field(None, max_length=255)
    payment_method: Optional[PaymentMethod] = None
    reference_number: Optional[str] = Field(None, max_length=100)
    notes: Optional[str] = Field(None, max_length=1000)
    is_recurring: bool = False
    recurring_frequency: Optional[RecurringFrequency] = None


class BillCreate(BillBase):
    pass


class BillResponse(TimestampSchema, BillBase):
    id: int
    user_id: int
    payment_date: Optional[date] = None

    class Config:
        from_attributes = True


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


class LoanBase(BaseSchema):
    name: str = Field(..., min_length=1, max_length=255)
    loan_type: LoanType
    amount: float = Field(..., gt=0)
    interest_rate: float = 0
    start_date: date
    end_date: Optional[date] = None
    status: LoanStatus = LoanStatus.ACTIVE
    lender: str = Field(..., max_length=255)
    lender_contact: Optional[str] = Field(None, max_length=255)
    total_paid: float = 0
    notes: Optional[str] = Field(None, max_length=1000)


class LoanCreate(LoanBase):
    pass


class LoanResponse(TimestampSchema, LoanBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True