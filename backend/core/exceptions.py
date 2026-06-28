"""Custom exceptions and exception handlers for HomeSphere backend.

Provides consistent error handling across the application.
"""

from fastapi import HTTPException, status, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from typing import Union, Dict, Any
import logging

logger = logging.getLogger(__name__)


class HomeSphereException(HTTPException):
    """Base exception for HomeSphere application.
    
    All custom exceptions should inherit from this class.
    """
    def __init__(
        self,
        status_code: int = status.HTTP_400_BAD_REQUEST,
        detail: str = "An error occurred",
        headers: Dict[str, str] = None
    ):
        super().__init__(status_code=status_code, detail=detail, headers=headers)
        self.status_code = status_code
        self.detail = detail
        self.headers = headers or {}


class NotFoundException(HomeSphereException):
    """Resource not found exception."""
    def __init__(self, resource: str, identifier: Any):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"{resource} with identifier {identifier} not found"
        )
        self.resource = resource
        self.identifier = identifier


class AlreadyExistsException(HomeSphereException):
    """Resource already exists exception."""
    def __init__(self, resource: str, identifier: Any):
        super().__init__(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"{resource} with identifier {identifier} already exists"
        )
        self.resource = resource
        self.identifier = identifier


class UnauthorizedException(HomeSphereException):
    """Unauthorized access exception."""
    def __init__(self, detail: str = "Unauthorized access"):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=detail,
            headers={"WWW-Authenticate": "Bearer"}
        )


class ForbiddenException(HomeSphereException):
    """Forbidden access exception."""
    def __init__(self, detail: str = "Forbidden access"):
        super().__init__(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=detail
        )


class ValidationException(HomeSphereException):
    """Data validation exception."""
    def __init__(self, errors: Dict[str, Any]):
        super().__init__(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail={"errors": errors}
        )
        self.errors = errors


class DatabaseException(HomeSphereException):
    """Database operation exception."""
    def __init__(self, detail: str = "Database operation failed"):
        super().__init__(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=detail
        )


class FileUploadException(HomeSphereException):
    """File upload exception."""
    def __init__(self, detail: str = "File upload failed"):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=detail
        )


class RateLimitException(HomeSphereException):
    """Rate limit exceeded exception."""
    def __init__(self, detail: str = "Rate limit exceeded"):
        super().__init__(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=detail
        )


# Exception handlers
async def homesphere_exception_handler(
    request: Request,
    exc: HomeSphereException
) -> JSONResponse:
    """Handle HomeSphere custom exceptions.
    
    Args:
        request: FastAPI request object
        exc: The exception to handle
    
    Returns:
        JSONResponse with error details
    """
    logger.error(f"HomeSphereException: {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": {
                "code": exc.status_code,
                "message": exc.detail,
                "type": exc.__class__.__name__
            }
        },
        headers=exc.headers
    )


async def validation_exception_handler(
    request: Request,
    exc: RequestValidationError
) -> JSONResponse:
    """Handle validation exceptions.
    
    Args:
        request: FastAPI request object
        exc: The validation exception
    
    Returns:
        JSONResponse with validation errors
    """
    logger.error(f"ValidationException: {exc.errors()}")
    errors = []
    for error in exc.errors():
        errors.append({
            "loc": error["loc"],
            "msg": error["msg"],
            "type": error["type"]
        })
    
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "success": False,
            "error": {
                "code": status.HTTP_422_UNPROCESSABLE_ENTITY,
                "message": "Validation failed",
                "errors": errors
            }
        }
    )


async def generic_exception_handler(
    request: Request,
    exc: Exception
) -> JSONResponse:
    """Handle generic exceptions.
    
    Args:
        request: FastAPI request object
        exc: The exception to handle
    
    Returns:
        JSONResponse with error details
    """
    logger.error(f"Unexpected error: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "success": False,
            "error": {
                "code": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Internal server error",
                "type": "InternalServerError"
            }
        }
    )


def register_exception_handlers(app):
    """Register all custom exception handlers with FastAPI app.
    
    Args:
        app: FastAPI application instance
    """
    app.add_exception_handler(HomeSphereException, homesphere_exception_handler)
    app.add_exception_handler(RequestValidationError, validation_exception_handler)
    app.add_exception_handler(Exception, generic_exception_handler)