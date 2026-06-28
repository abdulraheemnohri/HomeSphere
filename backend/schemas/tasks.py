from pydantic import BaseModel, Field
from datetime import date, datetime, time
from typing import Optional, List
from enum import Enum

from .base import BaseSchema, TimestampSchema


class TaskPriority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"


class TaskStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    DEFERRED = "deferred"


class TaskBase(BaseSchema):
    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=2000)
    due_date: Optional[date] = None
    due_time: Optional[time] = None
    priority: TaskPriority = TaskPriority.MEDIUM
    status: TaskStatus = TaskStatus.PENDING
    category: Optional[str] = Field(None, max_length=100)
    tags: Optional[List[str]] = []
    assigned_to: Optional[int] = None
    is_recurring: bool = False
    recurring_frequency: Optional[str] = Field(None, max_length=50)
    recurring_end_date: Optional[date] = None
    reminders: Optional[List[int]] = []
    estimated_hours: Optional[float] = None
    actual_hours: Optional[float] = None
    color: Optional[str] = Field(None, max_length=20)
    is_active: bool = True
    notes: Optional[str] = Field(None, max_length=1000)


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseSchema):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=2000)
    due_date: Optional[date] = None
    due_time: Optional[time] = None
    priority: Optional[TaskPriority] = None
    status: Optional[TaskStatus] = None
    category: Optional[str] = Field(None, max_length=100)
    tags: Optional[List[str]] = []
    assigned_to: Optional[int] = None
    is_recurring: Optional[bool] = None
    recurring_frequency: Optional[str] = Field(None, max_length=50)
    recurring_end_date: Optional[date] = None
    reminders: Optional[List[int]] = []
    estimated_hours: Optional[float] = None
    actual_hours: Optional[float] = None
    color: Optional[str] = Field(None, max_length=20)
    is_active: Optional[bool] = None
    notes: Optional[str] = Field(None, max_length=1000)


class TaskResponse(TimestampSchema, TaskBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True


class TaskCategoryBase(BaseSchema):
    name: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=1000)
    color: Optional[str] = Field(None, max_length=20)
    icon: Optional[str] = Field(None, max_length=50)


class TaskCategoryCreate(TaskCategoryBase):
    pass


class TaskCategoryResponse(TimestampSchema, TaskCategoryBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True