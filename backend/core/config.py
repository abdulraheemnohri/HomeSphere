"""Application configuration and settings for HomeSphere backend."""

from pydantic import BaseSettings, Field, HttpUrl
from typing import List, Optional
import os


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # Application
    APP_NAME: str = "HomeSphere"
    APP_VERSION: str = "1.0.0"
    APP_DESCRIPTION: str = "Complete Family, Home, Finance & Asset Management System"
    DEBUG: bool = Field(default=False, env="DEBUG")
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # Database
    DATABASE_URL: str = Field(
        default="sqlite:///./homesphere.db",
        env="DATABASE_URL"
    )
    
    # Authentication
    SECRET_KEY: str = Field(
        default="your-secret-key-change-in-production",
        env="SECRET_KEY"
    )
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # CORS
    CORS_ORIGINS: List[str] = Field(
        default=["http://localhost:3000", "http://127.0.0.1:3000"],
        env="CORS_ORIGINS"
    )
    CORS_ALLOW_CREDENTIALS: bool = True
    CORS_ALLOW_METHODS: List[str] = ["*"]
    CORS_ALLOW_HEADERS: List[str] = ["*"]
    
    # Rate Limiting
    RATE_LIMIT: int = 100
    RATE_LIMIT_PER_MINUTE: int = 60
    
    # File Upload
    UPLOAD_DIR: str = "./backend/static/uploads"
    MAX_FILE_SIZE_MB: int = 10
    ALLOWED_FILE_TYPES: List[str] = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ]
    
    # Email
    SMTP_HOST: Optional[str] = None
    SMTP_PORT: Optional[int] = None
    SMTP_USERNAME: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    SMTP_FROM_EMAIL: Optional[str] = None
    EMAIL_USE_TLS: bool = True
    
    # Logging
    LOG_LEVEL: str = "INFO"
    LOG_FILE: str = "homesphere.log"
    
    # Weather API
    WEATHER_API_KEY: Optional[str] = None
    WEATHER_API_URL: HttpUrl = "https://api.openweathermap.org/data/2.5/weather"
    
    # AI API
    AI_API_KEY: Optional[str] = None
    AI_API_URL: HttpUrl = "https://api.openai.com/v1"
    
    # Pagination
    DEFAULT_PAGE_SIZE: int = 20
    MAX_PAGE_SIZE: int = 100
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()