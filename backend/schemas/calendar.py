from pydantic import BaseModel, Field
from datetime import date, datetime, time
from typing import Optional, List
from enum import Enum

from .base import BaseSchema, TimestampSchema


class EventType(str, Enum):
    PERSONAL = "personal"
    FAMILY = "family"
    WORK = "work"
    BIRTHDAY = "birthday"
    ANNIVERSARY = "anniversary"
    MEETING = "meeting"
    APPOINTMENT = "appointment"
    HOLIDAY = "holiday"
    REMINDER = "reminder"
    BILL_DUE = "bill_due"
    OTHER = "other"


class EventPriority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class EventBase(BaseSchema):
    title: str = Field(..., min_length=1, max_length=255)
    event_type: EventType = Field(..., description="Type of event")
    description: Optional[str] = Field(None, max_length=2000)
    start_date: date = Field(..., description="Event start date")
    end_date: Optional[date] = None
    start_time: Optional[time] = None
    end_time: Optional[time] = None
    is_all_day: bool = False
    location: Optional[str] = Field(None, max_length=500)
    priority: EventPriority = EventPriority.MEDIUM
    is_recurring: bool = False
    recurring_frequency: Optional[str] = Field(None, max_length=50)
    recurring_end_date: Optional[date] = None
    reminders: Optional[List[int]] = []
    attendees: Optional[List[str]] = []
    color: Optional[str] = Field(None, max_length=20)
    is_active: bool = True
    notes: Optional[str] = Field(None, max_length=1000)


class EventCreate(EventBase):
    pass


class EventResponse(TimestampSchema, EventBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True


class CalendarBase(BaseSchema):
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=1000)
    color: Optional[str] = Field(None, max_length=20)
    is_primary: bool = False
    is_active: bool = True


class CalendarCreate(CalendarBase):
    pass


class CalendarResponse(TimestampSchema, CalendarBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True