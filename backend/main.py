"""
HomeSphere API - Complete Backend with CRUD Endpoints for All Modules
"""

from fastapi import FastAPI, HTTPException, Depends, status, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import List, Optional, Dict, Any
from datetime import datetime, date
from pydantic import BaseModel, Field
from sqlalchemy import func
import json

# Database imports
from database.database import engine, SessionLocal
from database.models import (
    Base, User, FamilyMember, Income, Expense, Budget, Bill, Loan,
    Property, Vehicle, Animal, HealthRecord, Document, EmergencyContact,
    ShoppingList, Task, FarmActivity, Asset, BankAccount, CalendarEvent
)

# Authentication imports
from authentication.auth import (
    create_access_token, verify_password, get_password_hash,
    get_current_user, get_current_active_user, SECRET_KEY, ALGORITHM
)
from jose import JWTError, jwt
from passlib.context import CryptContext

# Create all tables
Base.metadata.create_all(bind=engine)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/token")

# App setup
app = FastAPI(
    title="HomeSphere API",
    description="Complete Family, Home, Finance & Asset Management System",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==================== Pydantic Models ====================

class UserBase(BaseModel):
    username: str
    email: str
    full_name: str
    role: str = "family_member"
    phone: Optional[str] = None

class UserCreate(UserBase):
    password: str
    pin_code: Optional[str] = None

class UserResponse(BaseModel):
    id: str
    username: str
    email: str
    full_name: str
    role: str
    avatar: Optional[str] = None
    phone: Optional[str] = None
    is_active: bool
    created_at: datetime
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str


# ==================== Authentication Endpoints ====================

@app.post("/api/auth/register", response_model=UserResponse, tags=["Authentication"])
def register_user(user: UserCreate, db=Depends(get_db)):
    """Register a new user"""
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    db_email = db.query(User).filter(User.email == user.email).first()
    if db_email:
        raise HTTPException(status_code=400, detail="Email already registered")
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    hashed_password = pwd_context.hash(user.password)
    db_user = User(
        username=user.username,
        email=user.email,
        full_name=user.full_name,
        password_hash=hashed_password,
        role=user.role,
        phone=user.phone,
        pin_code=user.pin_code
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/api/auth/token", response_model=Token, tags=["Authentication"])
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db=Depends(get_db)):
    """Get access token for user"""
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password", headers={"WWW-Authenticate": "Bearer"})
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    if not pwd_context.verify(form_data.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password", headers={"WWW-Authenticate": "Bearer"})
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/api/auth/pin-login", response_model=Token, tags=["Authentication"])
def login_with_pin(pin: str, username: str, db=Depends(get_db)):
    """Login using PIN code"""
    user = db.query(User).filter(User.username == username).first()
    if not user or user.pin_code != pin:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or PIN", headers={"WWW-Authenticate": "Bearer"})
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/auth/me", response_model=UserResponse, tags=["Authentication"])
def read_users_me(current_user: User = Depends(get_current_active_user)):
    """Get current user info"""
    return current_user


# ==================== Root & Health ====================

@app.get("/", tags=["Root"])
def read_root():
    return {"message": "Welcome to HomeSphere API"}

@app.get("/api/health", tags=["Root"])
def health_check():
    return {"status": "healthy", "version": "1.0.0", "timestamp": datetime.utcnow().isoformat()}


# ==================== Family Members ====================

class FamilyMemberBase(BaseModel):
    first_name: str
    last_name: str
    relationship: str
    gender: str = "male"
    date_of_birth: Optional[date] = None
    age: Optional[int] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    blood_group: Optional[str] = None
    cnic: Optional[str] = None
    occupation: Optional[str] = None
    photo: Optional[str] = None
    is_active: bool = True

class FamilyMemberCreate(FamilyMemberBase):
    pass

class FamilyMemberResponse(FamilyMemberBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True

@app.post("/api/family-members/", response_model=FamilyMemberResponse, tags=["Family"])
def create_family_member(member: FamilyMemberCreate, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_member = FamilyMember(**member.model_dump(), user_id=current_user.id)
    db.add(db_member)
    db.commit()
    db.refresh(db_member)
    return db_member

@app.get("/api/family-members/", response_model=List[FamilyMemberResponse], tags=["Family"])
def read_family_members(skip: int = 0, limit: int = 100, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    return db.query(FamilyMember).filter(FamilyMember.user_id == current_user.id).offset(skip).limit(limit).all()

@app.get("/api/family-members/{member_id}", response_model=FamilyMemberResponse, tags=["Family"])
def read_family_member(member_id: str, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    member = db.query(FamilyMember).filter(FamilyMember.id == member_id, FamilyMember.user_id == current_user.id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Family member not found")
    return member

@app.put("/api/family-members/{member_id}", response_model=FamilyMemberResponse, tags=["Family"])
def update_family_member(member_id: str, member: FamilyMemberCreate, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_member = db.query(FamilyMember).filter(FamilyMember.id == member_id, FamilyMember.user_id == current_user.id).first()
    if not db_member:
        raise HTTPException(status_code=404, detail="Family member not found")
    for key, value in member.model_dump().items():
        setattr(db_member, key, value)
    db_member.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_member)
    return db_member

@app.delete("/api/family-members/{member_id}", tags=["Family"])
def delete_family_member(member_id: str, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_member = db.query(FamilyMember).filter(FamilyMember.id == member_id, FamilyMember.user_id == current_user.id).first()
    if not db_member:
        raise HTTPException(status_code=404, detail="Family member not found")
    db.delete(db_member)
    db.commit()
    return {"message": "Family member deleted successfully"}


# ==================== Income ====================

class IncomeBase(BaseModel):
    amount: float
    date: date
    category: str
    source: Optional[str] = None
    payment_method: str
    reference_number: Optional[str] = None
    notes: Optional[str] = None
    is_recurring: bool = False
    recurring_frequency: Optional[str] = None

class IncomeCreate(IncomeBase):
    pass

class IncomeResponse(IncomeBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True

@app.post("/api/incomes/", response_model=IncomeResponse, tags=["Finance"])
def create_income(income: IncomeCreate, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_income = Income(**income.model_dump(), user_id=current_user.id)
    db.add(db_income)
    db.commit()
    db.refresh(db_income)
    return db_income

@app.get("/api/incomes/", response_model=List[IncomeResponse], tags=["Finance"])
def read_incomes(skip: int = 0, limit: int = 100, category: Optional[str] = None, start_date: Optional[date] = None, end_date: Optional[date] = None, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    query = db.query(Income).filter(Income.user_id == current_user.id)
    if category:
        query = query.filter(Income.category == category)
    if start_date:
        query = query.filter(Income.date >= start_date)
    if end_date:
        query = query.filter(Income.date <= end_date)
    return query.offset(skip).limit(limit).all()

@app.get("/api/incomes/{income_id}", response_model=IncomeResponse, tags=["Finance"])
def read_income(income_id: str, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    income = db.query(Income).filter(Income.id == income_id, Income.user_id == current_user.id).first()
    if not income:
        raise HTTPException(status_code=404, detail="Income not found")
    return income

@app.put("/api/incomes/{income_id}", response_model=IncomeResponse, tags=["Finance"])
def update_income(income_id: str, income: IncomeCreate, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_income = db.query(Income).filter(Income.id == income_id, Income.user_id == current_user.id).first()
    if not db_income:
        raise HTTPException(status_code=404, detail="Income not found")
    for key, value in income.model_dump().items():
        setattr(db_income, key, value)
    db_income.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_income)
    return db_income

@app.delete("/api/incomes/{income_id}", tags=["Finance"])
def delete_income(income_id: str, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_income = db.query(Income).filter(Income.id == income_id, Income.user_id == current_user.id).first()
    if not db_income:
        raise HTTPException(status_code=404, detail="Income not found")
    db.delete(db_income)
    db.commit()
    return {"message": "Income deleted successfully"}


# ==================== Expense ====================

class ExpenseBase(BaseModel):
    amount: float
    date: date
    category: str
    subcategory: Optional[str] = None
    payment_method: str
    reference_number: Optional[str] = None
    payee: Optional[str] = None
    notes: Optional[str] = None
    is_recurring: bool = False
    recurring_frequency: Optional[str] = None

class ExpenseCreate(ExpenseBase):
    pass

class ExpenseResponse(ExpenseBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True

@app.post("/api/expenses/", response_model=ExpenseResponse, tags=["Finance"])
def create_expense(expense: ExpenseCreate, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_expense = Expense(**expense.model_dump(), user_id=current_user.id)
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense

@app.get("/api/expenses/", response_model=List[ExpenseResponse], tags=["Finance"])
def read_expenses(skip: int = 0, limit: int = 100, category: Optional[str] = None, start_date: Optional[date] = None, end_date: Optional[date] = None, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    query = db.query(Expense).filter(Expense.user_id == current_user.id)
    if category:
        query = query.filter(Expense.category == category)
    if start_date:
        query = query.filter(Expense.date >= start_date)
    if end_date:
        query = query.filter(Expense.date <= end_date)
    return query.offset(skip).limit(limit).all()

@app.get("/api/expenses/{expense_id}", response_model=ExpenseResponse, tags=["Finance"])
def read_expense(expense_id: str, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    expense = db.query(Expense).filter(Expense.id == expense_id, Expense.user_id == current_user.id).first()
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    return expense

@app.put("/api/expenses/{expense_id}", response_model=ExpenseResponse, tags=["Finance"])
def update_expense(expense_id: str, expense: ExpenseCreate, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_expense = db.query(Expense).filter(Expense.id == expense_id, Expense.user_id == current_user.id).first()
    if not db_expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    for key, value in expense.model_dump().items():
        setattr(db_expense, key, value)
    db_expense.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_expense)
    return db_expense

@app.delete("/api/expenses/{expense_id}", tags=["Finance"])
def delete_expense(expense_id: str, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_expense = db.query(Expense).filter(Expense.id == expense_id, Expense.user_id == current_user.id).first()
    if not db_expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    db.delete(db_expense)
    db.commit()
    return {"message": "Expense deleted successfully"}

# ==================== Budget ====================

class BudgetBase(BaseModel):
    name: str
    category: str
    allocated_amount: float
    current_spent: float = 0
    start_date: date
    end_date: date
    is_active: bool = True
    notes: Optional[str] = None

class BudgetCreate(BudgetBase):
    pass

class BudgetResponse(BudgetBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True

@app.post("/api/budgets/", response_model=BudgetResponse, tags=["Finance"])
def create_budget(budget: BudgetCreate, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_budget = Budget(**budget.model_dump(), user_id=current_user.id)
    db.add(db_budget)
    db.commit()
    db.refresh(db_budget)
    return db_budget

@app.get("/api/budgets/", response_model=List[BudgetResponse], tags=["Finance"])
def read_budgets(skip: int = 0, limit: int = 100, is_active: Optional[bool] = None, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    query = db.query(Budget).filter(Budget.user_id == current_user.id)
    if is_active is not None:
        query = query.filter(Budget.is_active == is_active)
    return query.offset(skip).limit(limit).all()

@app.get("/api/budgets/{budget_id}", response_model=BudgetResponse, tags=["Finance"])
def read_budget(budget_id: str, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    budget = db.query(Budget).filter(Budget.id == budget_id, Budget.user_id == current_user.id).first()
    if not budget:
        raise HTTPException(status_code=404, detail="Budget not found")
    return budget

@app.put("/api/budgets/{budget_id}", response_model=BudgetResponse, tags=["Finance"])
def update_budget(budget_id: str, budget: BudgetCreate, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_budget = db.query(Budget).filter(Budget.id == budget_id, Budget.user_id == current_user.id).first()
    if not db_budget:
        raise HTTPException(status_code=404, detail="Budget not found")
    for key, value in budget.model_dump().items():
        setattr(db_budget, key, value)
    db_budget.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_budget)
    return db_budget

@app.delete("/api/budgets/{budget_id}", tags=["Finance"])
def delete_budget(budget_id: str, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_budget = db.query(Budget).filter(Budget.id == budget_id, Budget.user_id == current_user.id).first()
    if not db_budget:
        raise HTTPException(status_code=404, detail="Budget not found")
    db.delete(db_budget)
    db.commit()
    return {"message": "Budget deleted successfully"}


# ==================== Bill ====================

class BillBase(BaseModel):
    name: str
    category: str
    amount: float
    due_date: date
    issue_date: Optional[date] = None
    payment_date: Optional[date] = None
    status: str = "pending"
    vendor: Optional[str] = None
    account_number: Optional[str] = None
    payment_method: Optional[str] = None
    reference_number: Optional[str] = None
    notes: Optional[str] = None
    is_recurring: bool = False
    recurring_frequency: Optional[str] = None

class BillCreate(BillBase):
    pass

class BillResponse(BillBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True

@app.post("/api/bills/", response_model=BillResponse, tags=["Finance"])
def create_bill(bill: BillCreate, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_bill = Bill(**bill.model_dump(), user_id=current_user.id)
    db.add(db_bill)
    db.commit()
    db.refresh(db_bill)
    return db_bill

@app.get("/api/bills/", response_model=List[BillResponse], tags=["Finance"])
def read_bills(skip: int = 0, limit: int = 100, status: Optional[str] = None, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    query = db.query(Bill).filter(Bill.user_id == current_user.id)
    if status:
        query = query.filter(Bill.status == status)
    return query.offset(skip).limit(limit).all()

@app.get("/api/bills/{bill_id}", response_model=BillResponse, tags=["Finance"])
def read_bill(bill_id: str, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    bill = db.query(Bill).filter(Bill.id == bill_id, Bill.user_id == current_user.id).first()
    if not bill:
        raise HTTPException(status_code=404, detail="Bill not found")
    return bill

@app.put("/api/bills/{bill_id}", response_model=BillResponse, tags=["Finance"])
def update_bill(bill_id: str, bill: BillCreate, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_bill = db.query(Bill).filter(Bill.id == bill_id, Bill.user_id == current_user.id).first()
    if not db_bill:
        raise HTTPException(status_code=404, detail="Bill not found")
    for key, value in bill.model_dump().items():
        setattr(db_bill, key, value)
    db_bill.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_bill)
    return db_bill

@app.delete("/api/bills/{bill_id}", tags=["Finance"])
def delete_bill(bill_id: str, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_bill = db.query(Bill).filter(Bill.id == bill_id, Bill.user_id == current_user.id).first()
    if not db_bill:
        raise HTTPException(status_code=404, detail="Bill not found")
    db.delete(db_bill)
    db.commit()
    return {"message": "Bill deleted successfully"}


# ==================== Loan ====================

class LoanBase(BaseModel):
    name: str
    loan_type: str
    amount: float
    interest_rate: float = 0
    start_date: date
    end_date: Optional[date] = None
    status: str = "active"
    lender: str
    lender_contact: Optional[str] = None
    next_payment_amount: Optional[float] = None
    next_payment_date: Optional[date] = None
    total_paid: float = 0
    collateral: Optional[Dict[str, Any]] = None
    notes: Optional[str] = None

class LoanCreate(LoanBase):
    pass

class LoanResponse(LoanBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True

@app.post("/api/loans/", response_model=LoanResponse, tags=["Finance"])
def create_loan(loan: LoanCreate, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_loan = Loan(**loan.model_dump(), user_id=current_user.id)
    db.add(db_loan)
    db.commit()
    db.refresh(db_loan)
    return db_loan

@app.get("/api/loans/", response_model=List[LoanResponse], tags=["Finance"])
def read_loans(skip: int = 0, limit: int = 100, status: Optional[str] = None, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    query = db.query(Loan).filter(Loan.user_id == current_user.id)
    if status:
        query = query.filter(Loan.status == status)
    return query.offset(skip).limit(limit).all()

@app.get("/api/loans/{loan_id}", response_model=LoanResponse, tags=["Finance"])
def read_loan(loan_id: str, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    loan = db.query(Loan).filter(Loan.id == loan_id, Loan.user_id == current_user.id).first()
    if not loan:
        raise HTTPException(status_code=404, detail="Loan not found")
    return loan

@app.put("/api/loans/{loan_id}", response_model=LoanResponse, tags=["Finance"])
def update_loan(loan_id: str, loan: LoanCreate, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_loan = db.query(Loan).filter(Loan.id == loan_id, Loan.user_id == current_user.id).first()
    if not db_loan:
        raise HTTPException(status_code=404, detail="Loan not found")
    for key, value in loan.model_dump().items():
        setattr(db_loan, key, value)
    db_loan.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_loan)
    return db_loan

@app.delete("/api/loans/{loan_id}", tags=["Finance"])
def delete_loan(loan_id: str, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_loan = db.query(Loan).filter(Loan.id == loan_id, Loan.user_id == current_user.id).first()
    if not db_loan:
        raise HTTPException(status_code=404, detail="Loan not found")
    db.delete(db_loan)
    db.commit()
    return {"message": "Loan deleted successfully"}
