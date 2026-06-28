"""FastAPI dependencies for HomeSphere backend.

Provides reusable dependencies for route handlers.
"""

from typing import Generator, Optional
from fastapi import Depends, HTTPException, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from ..database.database import SessionLocal
from .config import settings
from .security import verify_token, TokenData, oauth2_scheme
from ..database.models import User


# Database dependency
def get_db() -> Generator[Session, None, None]:
    """Get database session.
    
    Yields:
        SQLAlchemy database session
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Authentication dependencies
async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> User:
    """Get current authenticated user from JWT token.
    
    Args:
        token: JWT token from Authorization header
        db: Database session
    
    Returns:
        User object from database
    
    Raises:
        HTTPException: If user is not found or token is invalid
    """
    token_data = verify_token(token)
    
    if token_data.user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user = db.query(User).filter(User.id == token_data.user_id).first()
    
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return user


async def get_current_active_user(
    current_user: User = Depends(get_current_user)
) -> User:
    """Get current active user.
    
    Args:
        current_user: User from get_current_user dependency
    
    Returns:
        User object if active
    
    Raises:
        HTTPException: If user is inactive
    """
    if not current_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
    return current_user


async def get_current_admin_user(
    current_user: User = Depends(get_current_active_user)
) -> User:
    """Get current admin user.
    
    Args:
        current_user: Active user from get_current_active_user
    
    Returns:
        User object if admin
    
    Raises:
        HTTPException: If user is not admin
    """
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    return current_user


# Optional user dependency
async def get_optional_user(
    token: Optional[str] = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> Optional[User]:
    """Get current user if authenticated, otherwise None.
    
    Args:
        token: Optional JWT token
        db: Database session
    
    Returns:
        User object or None if not authenticated
    """
    if token is None:
        return None
    
    try:
        token_data = verify_token(token)
        if token_data.user_id is None:
            return None
        
        user = db.query(User).filter(User.id == token_data.user_id).first()
        return user
    except Exception:
        return None


# Pagination dependencies
class PaginationParams:
    """Pagination parameters."""
    def __init__(self, page: int = 1, page_size: int = 20):
        self.page = page
        self.page_size = min(page_size, settings.MAX_PAGE_SIZE)
        self.offset = (page - 1) * self.page_size


def get_pagination_params(
    page: int = 1,
    page_size: int = settings.DEFAULT_PAGE_SIZE
) -> PaginationParams:
    """Get pagination parameters.
    
    Args:
        page: Page number (1-indexed)
        page_size: Items per page
    
    Returns:
        PaginationParams object
    """
    return PaginationParams(page=page, page_size=page_size)


# Search and filter dependencies
def get_search_params(
    search: Optional[str] = None,
    request: Request = None
) -> dict:
    """Get search and filter parameters from request.
    
    Args:
        search: Optional search query
        request: FastAPI request object
    
    Returns:
        Dictionary with search and filter parameters
    """
    query_params = dict(request.query_params)
    query_params.pop("search", None)
    return {"search": search, "filters": query_params}