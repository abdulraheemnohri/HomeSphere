from fastapi import FastAPI, Request, Response
from fastapi.exceptions import RequestValidationError
import logging
from typing import Callable, Awaitable

logger = logging.getLogger(__name__)


class ErrorMiddleware:
    def __init__(self, app: FastAPI):
        self.app = app

    async def __call__(self, request: Request, call_next: Callable[[Request], Awaitable[Response]]) -> Response:
        try:
            return await call_next(request)
        except RequestValidationError as e:
            logger.error(f"Validation error: {e.errors()}")
            return Response(
                status_code=422,
                content={"error": "Validation failed", "details": e.errors()},
                media_type="application/json"
            )
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
            return Response(
                status_code=500,
                content={"error": "Internal server error", "message": str(e)},
                media_type="application/json"
            )