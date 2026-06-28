# Middleware module for HomeSphere backend
# Contains custom FastAPI middleware

from .error_middleware import ErrorMiddleware

__all__ = ["ErrorMiddleware"]