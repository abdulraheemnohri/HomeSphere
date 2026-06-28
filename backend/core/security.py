"""Security utilities for HomeSphere backend.

Includes password hashing, JWT token creation and verification.
"""

from datetime import datetime, timedelta
from typing import Optional, Tuple
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel

from .config import settings


# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# OAuth2 scheme for token authentication
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/token")


class Token(BaseModel):
    """JWT Token model."""
    access_token: str
    token_type: str
    expires_in: int


class TokenData(BaseModel):
    """Token data model."""
    email: Optional[str] = None
    user_id: Optional[int] = None
    is_pin_login: bool = False


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash.
    
    Args:
        plain_password: The plain text password to verify
        hashed_password: The hashed password to verify against
    
    Returns:
        True if the password matches, False otherwise
    """
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """Hash a password.
    
    Args:
        password: The plain text password to hash
    
    Returns:
        The hashed password
    """
    return pwd_context.hash(password)


def create_access_token(
    subject: dict,
    expires_delta: Optional[timedelta] = None
) -> str:
    """Create a JWT access token.
    
    Args:
        subject: Dictionary containing token claims (user data)
        expires_delta: Optional timedelta for token expiration
    
    Returns:
        Encoded JWT token string
    """
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    
    to_encode = {
        **subject,
        "exp": expire,
        "iat": datetime.utcnow(),
        "type": "access_token"
    }
    encoded_jwt = jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )
    return encoded_jwt


def create_refresh_token(subject: dict) -> str:
    """Create a JWT refresh token.
    
    Args:
        subject: Dictionary containing token claims (user data)
    
    Returns:
        Encoded JWT refresh token string
    """
    expire = datetime.utcnow() + timedelta(
        days=settings.REFRESH_TOKEN_EXPIRE_DAYS
    )
    
    to_encode = {
        **subject,
        "exp": expire,
        "iat": datetime.utcnow(),
        "type": "refresh_token"
    }
    encoded_jwt = jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )
    return encoded_jwt


def verify_token(token: str) -> TokenData:
    """Verify and decode a JWT token.
    
    Args:
        token: The JWT token to verify
    
    Returns:
        TokenData object with decoded claims
    
    Raises:
        HTTPException: If token is invalid or expired
    """
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )
        token_data = TokenData(**payload)
        return token_data
    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid token: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )


def get_current_user_from_token(
    token: str = Depends(oauth2_scheme)
) -> TokenData:
    """Dependency to get current user from JWT token.
    
    Args:
        token: JWT token from Authorization header
    
    Returns:
        TokenData with user information
    
    Raises:
        HTTPException: If token is invalid
    """
    return verify_token(token)


def create_pin_hash(pin: str) -> str:
    """Hash a PIN code.
    
    Args:
        pin: The 4-digit PIN to hash
    
    Returns:
        The hashed PIN
    """
    return pwd_context.hash(pin)


def verify_pin(plain_pin: str, hashed_pin: str) -> bool:
    """Verify a PIN against its hash.
    
    Args:
        plain_pin: The plain text PIN to verify
        hashed_pin: The hashed PIN to verify against
    
    Returns:
        True if the PIN matches, False otherwise
    """
    return pwd_context.verify(plain_pin, hashed_pin)