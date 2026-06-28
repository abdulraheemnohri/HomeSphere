from fastapi import APIRouter
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from fastapi import Depends

from ....core.security import create_access_token, get_password_hash, verify_password
from ....core.dependencies import get_db
from ....database.models import User

router = APIRouter()

@router.post("/register")
async def register_user(email: str, password: str, full_name: str, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        return {"error": "User already exists"}
    hashed_password = get_password_hash(password)
    new_user = User(email=email, hashed_password=hashed_password, full_name=full_name, is_active=True)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user