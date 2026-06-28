from pydantic import BaseModel, Field
from datetime import date, datetime
from typing import Optional, Dict, Any
from enum import Enum

from .base import BaseSchema, TimestampSchema


class AIModel(str, Enum):
    TEXT_GENERATION = "text_generation"
    CHAT = "chat"
    SUMMARIZATION = "summarization"
    TRANSLATION = "translation"
    ANALYSIS = "analysis"


class AIRequestBase(BaseSchema):
    model: AIModel
    prompt: str = Field(..., min_length=1, max_length=10000)
    temperature: float = 0.7
    max_tokens: int = 1000


class AIRequestCreate(AIRequestBase):
    pass


class AIRequestResponse(TimestampSchema, AIRequestBase):
    id: int
    user_id: int
    status: str = "pending"
    result: Optional[str] = None
    error: Optional[str] = None

    class Config:
        from_attributes = True


class AIChatSessionBase(BaseSchema):
    name: str = Field(..., min_length=1, max_length=255)
    model: AIModel
    temperature: float = 0.7
    max_tokens: int = 1000


class AIChatSessionCreate(AIChatSessionBase):
    pass


class AIChatSessionResponse(TimestampSchema, AIChatSessionBase):
    id: int
    user_id: int
    message_count: int = 0

    class Config:
        from_attributes = True


class AIAnalysisRequestBase(BaseSchema):
    analysis_type: str = Field(..., max_length=100)
    data: Dict[str, Any] = Field(..., description="Data to analyze")


class AIAnalysisRequestCreate(AIAnalysisRequestBase):
    pass


class AIAnalysisRequestResponse(TimestampSchema, AIAnalysisRequestBase):
    id: int
    user_id: int
    status: str = "pending"
    result: Optional[Dict[str, Any]] = None

    class Config:
        from_attributes = True