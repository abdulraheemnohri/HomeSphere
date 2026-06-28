from pydantic import BaseModel, Field
from datetime import date, datetime
from typing import Optional, List
from enum import Enum

from .base import BaseSchema, TimestampSchema
from .finance import ExpenseCategory, RecurringFrequency


class BudgetType(str, Enum):
    MONTHLY = "monthly"
    WEEKLY = "weekly"
    YEARLY = "yearly"
    CUSTOM = "custom"


class BudgetBase(BaseSchema):
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=1000)
    budget_type: BudgetType = BudgetType.MONTHLY
    category: Optional[ExpenseCategory] = None
    allocated_amount: float = Field(..., gt=0)
    current_spent: float = 0
    start_date: date = Field(..., description="Budget start date")
    end_date: date = Field(..., description="Budget end date")
    is_active: bool = True
    is_recurring: bool = False
    recurring_frequency: Optional[RecurringFrequency] = None
    notifications_enabled: bool = True
    alert_threshold: float = 0.8
    notes: Optional[str] = Field(None, max_length=1000)


class BudgetCreate(BudgetBase):
    pass


class BudgetUpdate(BaseSchema):
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=1000)
    budget_type: Optional[BudgetType] = None
    category: Optional[ExpenseCategory] = None
    allocated_amount: Optional[float] = Field(None, gt=0)
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    is_active: Optional[bool] = None
    is_recurring: Optional[bool] = None
    recurring_frequency: Optional[RecurringFrequency] = None
    notifications_enabled: Optional[bool] = None
    alert_threshold: Optional[float] = None
    notes: Optional[str] = Field(None, max_length=1000)


class BudgetResponse(TimestampSchema, BudgetBase):
    id: int
    user_id: int
    progress_percentage: float = 0
    remaining_amount: float = 0

    class Config:
        from_attributes = True


class BudgetTransactionBase(BaseSchema):
    budget_id: int = Field(..., description="Parent budget ID")
    name: str = Field(..., min_length=1, max_length=255)
    amount: float = Field(..., gt=0)
    date: date = Field(..., description="Transaction date")
    category: ExpenseCategory = Field(..., description="Transaction category")
    notes: Optional[str] = Field(None, max_length=1000)


class BudgetTransactionCreate(BudgetTransactionBase):
    pass


class BudgetTransactionResponse(TimestampSchema, BudgetTransactionBase):
    id: int

    class Config:
        from_attributes = True