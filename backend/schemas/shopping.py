from pydantic import BaseModel, Field
from datetime import date, datetime
from typing import Optional, List
from enum import Enum

from .base import BaseSchema, TimestampSchema


class ShoppingCategory(str, Enum):
    GROCERIES = "groceries"
    CLOTHING = "clothing"
    ELECTRONICS = "electronics"
    HOME = "home"
    HEALTH = "health"
    GIFTS = "gifts"
    BOOKS = "books"
    SPORTS = "sports"
    OTHER = "other"


class ShoppingItemBase(BaseSchema):
    name: str = Field(..., min_length=1, max_length=255)
    category: ShoppingCategory
    quantity: int = 1
    unit: Optional[str] = Field(None, max_length=50)
    unit_price: float = Field(..., gt=0)
    brand: Optional[str] = Field(None, max_length=100)
    is_purchased: bool = False
    purchased_date: Optional[date] = None
    priority: Optional[str] = Field(None, max_length=50)
    notes: Optional[str] = Field(None, max_length=1000)


class ShoppingItemCreate(ShoppingItemBase):
    pass


class ShoppingItemResponse(TimestampSchema, ShoppingItemBase):
    id: int
    shopping_list_id: int

    class Config:
        from_attributes = True


class ShoppingListBase(BaseSchema):
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=1000)
    budget: Optional[float] = None
    current_total: Optional[float] = None
    store: Optional[str] = Field(None, max_length=255)
    due_date: Optional[date] = None
    is_active: bool = True
    notes: Optional[str] = Field(None, max_length=1000)


class ShoppingListCreate(ShoppingListBase):
    pass


class ShoppingListResponse(TimestampSchema, ShoppingListBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True