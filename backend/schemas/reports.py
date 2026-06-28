from pydantic import BaseModel, Field
from datetime import date, datetime
from typing import Optional, List, Dict, Any
from enum import Enum

from .base import BaseSchema, TimestampSchema


class ReportType(str, Enum):
    FINANCIAL_SUMMARY = "financial_summary"
    INCOME_STATEMENT = "income_statement"
    EXPENSE_ANALYSIS = "expense_analysis"
    BUDGET_REPORT = "budget_report"
    ASSET_REPORT = "asset_report"
    NET_WORTH = "net_worth"
    CASH_FLOW = "cash_flow"
    TAX_REPORT = "tax_report"
    FAMILY_REPORT = "family_report"
    PROPERTY_REPORT = "property_report"
    VEHICLE_REPORT = "vehicle_report"
    ANIMAL_REPORT = "animal_report"
    FARM_REPORT = "farm_report"
    CUSTOM = "custom"


class ReportFrequency(str, Enum):
    DAILY = "daily"
    WEEKLY = "weekly"
    MONTHLY = "monthly"
    QUARTERLY = "quarterly"
    YEARLY = "yearly"
    CUSTOM = "custom"


class ReportBase(BaseSchema):
    name: str = Field(..., min_length=1, max_length=255)
    report_type: ReportType = Field(..., description="Type of report")
    description: Optional[str] = Field(None, max_length=1000)
    start_date: date = Field(..., description="Report start date")
    end_date: date = Field(..., description="Report end date")
    frequency: ReportFrequency = ReportFrequency.CUSTOM
    filters: Optional[Dict[str, Any]] = None
    group_by: Optional[List[str]] = []
    sort_by: Optional[List[str]] = []
    include_charts: bool = True
    chart_types: Optional[List[str]] = []
    is_scheduled: bool = False
    schedule_frequency: Optional[ReportFrequency] = None
    next_run_date: Optional[date] = None
    is_active: bool = True
    notes: Optional[str] = Field(None, max_length=1000)


class ReportCreate(ReportBase):
    pass


class ReportUpdate(BaseSchema):
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=1000)
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    frequency: Optional[ReportFrequency] = None
    filters: Optional[Dict[str, Any]] = None
    group_by: Optional[List[str]] = []
    sort_by: Optional[List[str]] = []
    include_charts: Optional[bool] = None
    chart_types: Optional[List[str]] = []
    is_scheduled: Optional[bool] = None
    schedule_frequency: Optional[ReportFrequency] = None
    next_run_date: Optional[date] = None
    is_active: Optional[bool] = None
    notes: Optional[str] = Field(None, max_length=1000)


class ReportResponse(TimestampSchema, ReportBase):
    id: int
    user_id: int
    generated_at: Optional[datetime] = None
    data: Optional[Dict[str, Any]] = None

    class Config:
        from_attributes = True


class ReportTemplateBase(BaseSchema):
    name: str = Field(..., min_length=1, max_length=255)
    report_type: ReportType = Field(..., description="Type of report")
    template: str = Field(..., min_length=1, description="Report template")
    variables: Optional[List[str]] = []
    is_default: bool = False
    is_active: bool = True


class ReportTemplateCreate(ReportTemplateBase):
    pass


class ReportTemplateResponse(TimestampSchema, ReportTemplateBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True