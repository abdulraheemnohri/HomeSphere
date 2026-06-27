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


# ==================== Property ====================

class PropertyBase(BaseModel):
    name: str
    property_type: str
    address: Dict[str, Any]
    purchase_date: Optional[date] = None
    purchase_price: Optional[float] = None
    current_value: Optional[float] = None
    area: Optional[float] = None
    area_unit: str = "sq ft"
    bedrooms: Optional[int] = None
    bathrooms: Optional[int] = None
    floors: Optional[int] = None
    has_garage: bool = False
    has_garden: bool = False
    has_swimming_pool: bool = False
    is_rented: bool = False
    monthly_rent: Optional[float] = None
    tenant_name: Optional[str] = None
    tenant_contact: Optional[str] = None
    lease_start_date: Optional[date] = None
    lease_end_date: Optional[date] = None
    is_active: bool = True
    documents: Optional[List[Dict[str, Any]]] = None
    notes: Optional[str] = None

class PropertyCreate(PropertyBase):
    pass

class PropertyResponse(PropertyBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True

@app.post("/api/properties/", response_model=PropertyResponse, tags=["Properties"])
def create_property(property: PropertyCreate, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_property = Property(**property.model_dump(), user_id=current_user.id)
    db.add(db_property)
    db.commit()
    db.refresh(db_property)
    return db_property

@app.get("/api/properties/", response_model=List[PropertyResponse], tags=["Properties"])
def read_properties(skip: int = 0, limit: int = 100, property_type: Optional[str] = None, is_active: Optional[bool] = None, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    query = db.query(Property).filter(Property.user_id == current_user.id)
    if property_type:
        query = query.filter(Property.property_type == property_type)
    if is_active is not None:
        query = query.filter(Property.is_active == is_active)
    return query.offset(skip).limit(limit).all()

@app.get("/api/properties/{property_id}", response_model=PropertyResponse, tags=["Properties"])
def read_property(property_id: str, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    property = db.query(Property).filter(Property.id == property_id, Property.user_id == current_user.id).first()
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    return property

@app.put("/api/properties/{property_id}", response_model=PropertyResponse, tags=["Properties"])
def update_property(property_id: str, property: PropertyCreate, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_property = db.query(Property).filter(Property.id == property_id, Property.user_id == current_user.id).first()
    if not db_property:
        raise HTTPException(status_code=404, detail="Property not found")
    for key, value in property.model_dump().items():
        setattr(db_property, key, value)
    db_property.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_property)
    return db_property

@app.delete("/api/properties/{property_id}", tags=["Properties"])
def delete_property(property_id: str, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_property = db.query(Property).filter(Property.id == property_id, Property.user_id == current_user.id).first()
    if not db_property:
        raise HTTPException(status_code=404, detail="Property not found")
    db.delete(db_property)
    db.commit()
    return {"message": "Property deleted successfully"}


# ==================== Vehicle ====================

class VehicleBase(BaseModel):
    name: str
    vehicle_type: str
    make: Optional[str] = None
    model: Optional[str] = None
    year: Optional[int] = None
    registration_number: Optional[str] = None
    engine_number: Optional[str] = None
    chasis_number: Optional[str] = None
    color: Optional[str] = None
    mileage: float = 0
    mileage_unit: str = "km"
    purchase_date: Optional[date] = None
    purchase_price: Optional[float] = None
    current_value: Optional[float] = None
    fuel_type: Optional[str] = None
    transmission: Optional[str] = None
    insurance_company: Optional[str] = None
    insurance_policy_number: Optional[str] = None
    insurance_expiry_date: Optional[date] = None
    last_service_date: Optional[date] = None
    next_service_date: Optional[date] = None
    service_reminder_km: int = 5000
    is_active: bool = True
    documents: Optional[List[Dict[str, Any]]] = None
    notes: Optional[str] = None

class VehicleCreate(VehicleBase):
    pass

class VehicleResponse(VehicleBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True

@app.post("/api/vehicles/", response_model=VehicleResponse, tags=["Properties"])
def create_vehicle(vehicle: VehicleCreate, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_vehicle = Vehicle(**vehicle.model_dump(), user_id=current_user.id)
    db.add(db_vehicle)
    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle

@app.get("/api/vehicles/", response_model=List[VehicleResponse], tags=["Properties"])
def read_vehicles(skip: int = 0, limit: int = 100, vehicle_type: Optional[str] = None, is_active: Optional[bool] = None, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    query = db.query(Vehicle).filter(Vehicle.user_id == current_user.id)
    if vehicle_type:
        query = query.filter(Vehicle.vehicle_type == vehicle_type)
    if is_active is not None:
        query = query.filter(Vehicle.is_active == is_active)
    return query.offset(skip).limit(limit).all()

@app.get("/api/vehicles/{vehicle_id}", response_model=VehicleResponse, tags=["Properties"])
def read_vehicle(vehicle_id: str, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id, Vehicle.user_id == current_user.id).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return vehicle

@app.put("/api/vehicles/{vehicle_id}", response_model=VehicleResponse, tags=["Properties"])
def update_vehicle(vehicle_id: str, vehicle: VehicleCreate, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id, Vehicle.user_id == current_user.id).first()
    if not db_vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    for key, value in vehicle.model_dump().items():
        setattr(db_vehicle, key, value)
    db_vehicle.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle

@app.delete("/api/vehicles/{vehicle_id}", tags=["Properties"])
def delete_vehicle(vehicle_id: str, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id, Vehicle.user_id == current_user.id).first()
    if not db_vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    db.delete(db_vehicle)
    db.commit()
    return {"message": "Vehicle deleted successfully"}


# ==================== Animal ====================

class AnimalBase(BaseModel):
    name: str
    animal_type: str
    breed: Optional[str] = None
    gender: str = "unknown"
    date_of_birth: Optional[date] = None
    age: Optional[int] = None
    age_unit: str = "years"
    color: Optional[str] = None
    weight: Optional[float] = None
    weight_unit: str = "kg"
    height: Optional[float] = None
    height_unit: str = "cm"
    health_status: str = "good"
    vaccination_records: Optional[List[Dict[str, Any]]] = None
    medical_history: Optional[List[Dict[str, Any]]] = None
    purchase_date: Optional[date] = None
    purchase_price: Optional[float] = None
    current_value: Optional[float] = None
    is_active: bool = True
    is_sterilized: bool = False
    microchip_number: Optional[str] = None
    identification_mark: Optional[str] = None
    documents: Optional[List[Dict[str, Any]]] = None
    notes: Optional[str] = None

class AnimalCreate(AnimalBase):
    pass

class AnimalResponse(AnimalBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True

@app.post("/api/animals/", response_model=AnimalResponse, tags=["Properties"])
def create_animal(animal: AnimalCreate, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_animal = Animal(**animal.model_dump(), user_id=current_user.id)
    db.add(db_animal)
    db.commit()
    db.refresh(db_animal)
    return db_animal

@app.get("/api/animals/", response_model=List[AnimalResponse], tags=["Properties"])
def read_animals(skip: int = 0, limit: int = 100, animal_type: Optional[str] = None, is_active: Optional[bool] = None, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    query = db.query(Animal).filter(Animal.user_id == current_user.id)
    if animal_type:
        query = query.filter(Animal.animal_type == animal_type)
    if is_active is not None:
        query = query.filter(Animal.is_active == is_active)
    return query.offset(skip).limit(limit).all()

@app.get("/api/animals/{animal_id}", response_model=AnimalResponse, tags=["Properties"])
def read_animal(animal_id: str, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    animal = db.query(Animal).filter(Animal.id == animal_id, Animal.user_id == current_user.id).first()
    if not animal:
        raise HTTPException(status_code=404, detail="Animal not found")
    return animal

@app.put("/api/animals/{animal_id}", response_model=AnimalResponse, tags=["Properties"])
def update_animal(animal_id: str, animal: AnimalCreate, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_animal = db.query(Animal).filter(Animal.id == animal_id, Animal.user_id == current_user.id).first()
    if not db_animal:
        raise HTTPException(status_code=404, detail="Animal not found")
    for key, value in animal.model_dump().items():
        setattr(db_animal, key, value)
    db_animal.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_animal)
    return db_animal

@app.delete("/api/animals/{animal_id}", tags=["Properties"])
def delete_animal(animal_id: str, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_animal = db.query(Animal).filter(Animal.id == animal_id, Animal.user_id == current_user.id).first()
    if not db_animal:
        raise HTTPException(status_code=404, detail="Animal not found")
    db.delete(db_animal)
    db.commit()
    return {"message": "Animal deleted successfully"}


# ==================== Health Record ====================

class HealthRecordBase(BaseModel):
    family_member_id: Optional[str] = None
    record_type: str
    title: str
    date: date
    time: Optional[str] = None
    doctor_name: Optional[str] = None
    doctor_specialization: Optional[str] = None
    hospital_clinic: Optional[str] = None
    hospital_address: Optional[Dict[str, Any]] = None
    hospital_contact: Optional[str] = None
    symptoms: Optional[str] = None
    diagnosis: Optional[str] = None
    treatment: Optional[str] = None
    medication_prescribed: Optional[List[Dict[str, Any]]] = None
    temperature: Optional[float] = None
    temperature_unit: str = "F"
    blood_pressure: Optional[str] = None
    pulse_rate: Optional[int] = None
    respiratory_rate: Optional[int] = None
    oxygen_level: Optional[float] = None
    weight: Optional[float] = None
    weight_unit: str = "kg"
    height: Optional[float] = None
    height_unit: str = "cm"
    bmi: Optional[float] = None
    status: str = "completed"
    follow_up_date: Optional[date] = None
    cost: Optional[float] = None
    payment_status: str = "unpaid"
    insurance_claim_number: Optional[str] = None
    documents: Optional[List[Dict[str, Any]]] = None
    notes: Optional[str] = None

class HealthRecordCreate(HealthRecordBase):
    pass

class HealthRecordResponse(HealthRecordBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True

@app.post("/api/health-records/", response_model=HealthRecordResponse, tags=["Health"])
def create_health_record(record: HealthRecordCreate, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_record = HealthRecord(**record.model_dump(), user_id=current_user.id)
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record

@app.get("/api/health-records/", response_model=List[HealthRecordResponse], tags=["Health"])
def read_health_records(skip: int = 0, limit: int = 100, record_type: Optional[str] = None, family_member_id: Optional[str] = None, status: Optional[str] = None, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    query = db.query(HealthRecord).filter(HealthRecord.user_id == current_user.id)
    if record_type:
        query = query.filter(HealthRecord.record_type == record_type)
    if family_member_id:
        query = query.filter(HealthRecord.family_member_id == family_member_id)
    if status:
        query = query.filter(HealthRecord.status == status)
    return query.offset(skip).limit(limit).all()

@app.get("/api/health-records/{record_id}", response_model=HealthRecordResponse, tags=["Health"])
def read_health_record(record_id: str, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    record = db.query(HealthRecord).filter(HealthRecord.id == record_id, HealthRecord.user_id == current_user.id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Health record not found")
    return record

@app.put("/api/health-records/{record_id}", response_model=HealthRecordResponse, tags=["Health"])
def update_health_record(record_id: str, record: HealthRecordCreate, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_record = db.query(HealthRecord).filter(HealthRecord.id == record_id, HealthRecord.user_id == current_user.id).first()
    if not db_record:
        raise HTTPException(status_code=404, detail="Health record not found")
    for key, value in record.model_dump().items():
        setattr(db_record, key, value)
    db_record.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_record)
    return db_record

@app.delete("/api/health-records/{record_id}", tags=["Health"])
def delete_health_record(record_id: str, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_record = db.query(HealthRecord).filter(HealthRecord.id == record_id, HealthRecord.user_id == current_user.id).first()
    if not db_record:
        raise HTTPException(status_code=404, detail="Health record not found")
    db.delete(db_record)
    db.commit()
    return {"message": "Health record deleted successfully"}


# ==================== Document ====================

class DocumentBase(BaseModel):
    name: str
    document_type: str
    category: str
    description: Optional[str] = None
    file_path: str
    file_name: str
    file_size: Optional[int] = None
    file_size_unit: str = "B"
    mime_type: Optional[str] = None
    version: str = "1.0"
    tags: Optional[List[str]] = None
    issuer: Optional[str] = None
    issue_date: Optional[date] = None
    expiry_date: Optional[date] = None
    reference_number: Optional[str] = None
    location: Optional[str] = None
    digital_location: Optional[str] = None
    is_verified: bool = False
    is_encrypted: bool = False
    access_level: str = "private"
    status: str = "active"
    notes: Optional[str] = None

class DocumentCreate(DocumentBase):
    pass

class DocumentResponse(DocumentBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True

@app.post("/api/documents/", response_model=DocumentResponse, tags=["Documents"])
def create_document(document: DocumentCreate, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_document = Document(**document.model_dump(), user_id=current_user.id)
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return db_document

@app.get("/api/documents/", response_model=List[DocumentResponse], tags=["Documents"])
def read_documents(skip: int = 0, limit: int = 100, document_type: Optional[str] = None, category: Optional[str] = None, status: Optional[str] = None, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    query = db.query(Document).filter(Document.user_id == current_user.id)
    if document_type:
        query = query.filter(Document.document_type == document_type)
    if category:
        query = query.filter(Document.category == category)
    if status:
        query = query.filter(Document.status == status)
    return query.offset(skip).limit(limit).all()

@app.get("/api/documents/{document_id}", response_model=DocumentResponse, tags=["Documents"])
def read_document(document_id: str, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    document = db.query(Document).filter(Document.id == document_id, Document.user_id == current_user.id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    return document

@app.put("/api/documents/{document_id}", response_model=DocumentResponse, tags=["Documents"])
def update_document(document_id: str, document: DocumentCreate, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_document = db.query(Document).filter(Document.id == document_id, Document.user_id == current_user.id).first()
    if not db_document:
        raise HTTPException(status_code=404, detail="Document not found")
    for key, value in document.model_dump().items():
        setattr(db_document, key, value)
    db_document.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_document)
    return db_document

@app.delete("/api/documents/{document_id}", tags=["Documents"])
def delete_document(document_id: str, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_document = db.query(Document).filter(Document.id == document_id, Document.user_id == current_user.id).first()
    if not db_document:
        raise HTTPException(status_code=404, detail="Document not found")
    db.delete(db_document)
    db.commit()
    return {"message": "Document deleted successfully"}


# ==================== Emergency Contact ====================

class EmergencyContactBase(BaseModel):
    name: str
    relationship: str
    phone: str
    email: Optional[str] = None
    address: Optional[str] = None
    notes: Optional[str] = None

class EmergencyContactCreate(EmergencyContactBase):
    pass

class EmergencyContactResponse(EmergencyContactBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True

@app.post("/api/emergency-contacts/", response_model=EmergencyContactResponse, tags=["Emergency"])
def create_emergency_contact(contact: EmergencyContactCreate, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_contact = EmergencyContact(**contact.model_dump(), user_id=current_user.id)
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact

@app.get("/api/emergency-contacts/", response_model=List[EmergencyContactResponse], tags=["Emergency"])
def read_emergency_contacts(skip: int = 0, limit: int = 100, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    return db.query(EmergencyContact).filter(EmergencyContact.user_id == current_user.id).offset(skip).limit(limit).all()

@app.get("/api/emergency-contacts/{contact_id}", response_model=EmergencyContactResponse, tags=["Emergency"])
def read_emergency_contact(contact_id: str, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    contact = db.query(EmergencyContact).filter(EmergencyContact.id == contact_id, EmergencyContact.user_id == current_user.id).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Emergency contact not found")
    return contact

@app.put("/api/emergency-contacts/{contact_id}", response_model=EmergencyContactResponse, tags=["Emergency"])
def update_emergency_contact(contact_id: str, contact: EmergencyContactCreate, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_contact = db.query(EmergencyContact).filter(EmergencyContact.id == contact_id, EmergencyContact.user_id == current_user.id).first()
    if not db_contact:
        raise HTTPException(status_code=404, detail="Emergency contact not found")
    for key, value in contact.model_dump().items():
        setattr(db_contact, key, value)
    db_contact.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_contact)
    return db_contact

@app.delete("/api/emergency-contacts/{contact_id}", tags=["Emergency"])
def delete_emergency_contact(contact_id: str, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_contact = db.query(EmergencyContact).filter(EmergencyContact.id == contact_id, EmergencyContact.user_id == current_user.id).first()
    if not db_contact:
        raise HTTPException(status_code=404, detail="Emergency contact not found")
    db.delete(db_contact)
    db.commit()
    return {"message": "Emergency contact deleted successfully"}


# ==================== Shopping List ====================

class ShoppingListBase(BaseModel):
    name: str
    description: Optional[str] = None
    items: Optional[List[Dict[str, Any]]] = None
    total_amount: Optional[float] = None
    status: str = "pending"
    priority: Optional[str] = None
    due_date: Optional[date] = None
    notes: Optional[str] = None

class ShoppingListCreate(ShoppingListBase):
    pass

class ShoppingListResponse(ShoppingListBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True

@app.post("/api/shopping-lists/", response_model=ShoppingListResponse, tags=["Shopping"])
def create_shopping_list(shopping_list: ShoppingListCreate, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_shopping_list = ShoppingList(**shopping_list.model_dump(), user_id=current_user.id)
    db.add(db_shopping_list)
    db.commit()
    db.refresh(db_shopping_list)
    return db_shopping_list

@app.get("/api/shopping-lists/", response_model=List[ShoppingListResponse], tags=["Shopping"])
def read_shopping_lists(skip: int = 0, limit: int = 100, status: Optional[str] = None, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    query = db.query(ShoppingList).filter(ShoppingList.user_id == current_user.id)
    if status:
        query = query.filter(ShoppingList.status == status)
    return query.offset(skip).limit(limit).all()

@app.get("/api/shopping-lists/{list_id}", response_model=ShoppingListResponse, tags=["Shopping"])
def read_shopping_list(list_id: str, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    shopping_list = db.query(ShoppingList).filter(ShoppingList.id == list_id, ShoppingList.user_id == current_user.id).first()
    if not shopping_list:
        raise HTTPException(status_code=404, detail="Shopping list not found")
    return shopping_list

@app.put("/api/shopping-lists/{list_id}", response_model=ShoppingListResponse, tags=["Shopping"])
def update_shopping_list(list_id: str, shopping_list: ShoppingListCreate, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_shopping_list = db.query(ShoppingList).filter(ShoppingList.id == list_id, ShoppingList.user_id == current_user.id).first()
    if not db_shopping_list:
        raise HTTPException(status_code=404, detail="Shopping list not found")
    for key, value in shopping_list.model_dump().items():
        setattr(db_shopping_list, key, value)
    db_shopping_list.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_shopping_list)
    return db_shopping_list

@app.delete("/api/shopping-lists/{list_id}", tags=["Shopping"])
def delete_shopping_list(list_id: str, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_shopping_list = db.query(ShoppingList).filter(ShoppingList.id == list_id, ShoppingList.user_id == current_user.id).first()
    if not db_shopping_list:
        raise HTTPException(status_code=404, detail="Shopping list not found")
    db.delete(db_shopping_list)
    db.commit()
    return {"message": "Shopping list deleted successfully"}


# ==================== Task ====================

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    category: Optional[str] = None
    priority: str = "medium"
    status: str = "pending"
    due_date: Optional[date] = None
    due_time: Optional[str] = None
    reminder_date: Optional[date] = None
    reminder_time: Optional[str] = None
    assigned_to: Optional[str] = None
    is_recurring: bool = False
    recurring_frequency: Optional[str] = None
    notes: Optional[str] = None

class TaskCreate(TaskBase):
    pass

class TaskResponse(TaskBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True

@app.post("/api/tasks/", response_model=TaskResponse, tags=["Tasks"])
def create_task(task: TaskCreate, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_task = Task(**task.model_dump(), user_id=current_user.id)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@app.get("/api/tasks/", response_model=List[TaskResponse], tags=["Tasks"])
def read_tasks(skip: int = 0, limit: int = 100, status: Optional[str] = None, priority: Optional[str] = None, category: Optional[str] = None, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    query = db.query(Task).filter(Task.user_id == current_user.id)
    if status:
        query = query.filter(Task.status == status)
    if priority:
        query = query.filter(Task.priority == priority)
    if category:
        query = query.filter(Task.category == category)
    return query.offset(skip).limit(limit).all()

@app.get("/api/tasks/{task_id}", response_model=TaskResponse, tags=["Tasks"])
def read_task(task_id: str, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id, Task.user_id == current_user.id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@app.put("/api/tasks/{task_id}", response_model=TaskResponse, tags=["Tasks"])
def update_task(task_id: str, task: TaskCreate, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_task = db.query(Task).filter(Task.id == task_id, Task.user_id == current_user.id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    for key, value in task.model_dump().items():
        setattr(db_task, key, value)
    db_task.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_task)
    return db_task

@app.delete("/api/tasks/{task_id}", tags=["Tasks"])
def delete_task(task_id: str, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_task = db.query(Task).filter(Task.id == task_id, Task.user_id == current_user.id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(db_task)
    db.commit()
    return {"message": "Task deleted successfully"}


# ==================== Farm Activity ====================

class FarmActivityBase(BaseModel):
    name: str
    activity_type: str
    description: Optional[str] = None
    area: Optional[float] = None
    area_unit: str = "sq ft"
    crop_type: Optional[str] = None
    quantity: Optional[float] = None
    quantity_unit: Optional[str] = None
    status: str = "planned"
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    cost: Optional[float] = None
    revenue: Optional[float] = None
    notes: Optional[str] = None

class FarmActivityCreate(FarmActivityBase):
    pass

class FarmActivityResponse(FarmActivityBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True

@app.post("/api/farm-activities/", response_model=FarmActivityResponse, tags=["Farm"])
def create_farm_activity(activity: FarmActivityCreate, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_activity = FarmActivity(**activity.model_dump(), user_id=current_user.id)
    db.add(db_activity)
    db.commit()
    db.refresh(db_activity)
    return db_activity

@app.get("/api/farm-activities/", response_model=List[FarmActivityResponse], tags=["Farm"])
def read_farm_activities(skip: int = 0, limit: int = 100, activity_type: Optional[str] = None, status: Optional[str] = None, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    query = db.query(FarmActivity).filter(FarmActivity.user_id == current_user.id)
    if activity_type:
        query = query.filter(FarmActivity.activity_type == activity_type)
    if status:
        query = query.filter(FarmActivity.status == status)
    return query.offset(skip).limit(limit).all()

@app.get("/api/farm-activities/{activity_id}", response_model=FarmActivityResponse, tags=["Farm"])
def read_farm_activity(activity_id: str, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    activity = db.query(FarmActivity).filter(FarmActivity.id == activity_id, FarmActivity.user_id == current_user.id).first()
    if not activity:
        raise HTTPException(status_code=404, detail="Farm activity not found")
    return activity

@app.put("/api/farm-activities/{activity_id}", response_model=FarmActivityResponse, tags=["Farm"])
def update_farm_activity(activity_id: str, activity: FarmActivityCreate, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_activity = db.query(FarmActivity).filter(FarmActivity.id == activity_id, FarmActivity.user_id == current_user.id).first()
    if not db_activity:
        raise HTTPException(status_code=404, detail="Farm activity not found")
    for key, value in activity.model_dump().items():
        setattr(db_activity, key, value)
    db_activity.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_activity)
    return db_activity

@app.delete("/api/farm-activities/{activity_id}", tags=["Farm"])
def delete_farm_activity(activity_id: str, current_user: User = Depends(get_current_active_user), db=Depends(get_db)):
    db_activity = db.query(FarmActivity).filter(FarmActivity.id == activity_id, FarmActivity.user_id == current_user.id).first()
    if not db_activity:
        raise HTTPException(status_code=404, detail="Farm activity not found")
    db.delete(db_activity)
    db.commit()
    return {"message": "Farm activity deleted successfully"}
