"""
SQLAlchemy models for HomeSphere application
"""

from sqlalchemy import Column, Integer, String, Float, Boolean, Date, DateTime, Text, ForeignKey, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

Base = declarative_base()


# User and Authentication Models
class User(Base):
    __tablename__ = "users"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    full_name = Column(String(100), nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(20), default="family_member")
    avatar = Column(String(255))
    phone = Column(String(20))
    pin_code = Column(String(10))  # For PIN login
    face_encoding = Column(JSON)  # For face recognition
    is_active = Column(Boolean, default=True)
    last_login = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    family_members = relationship("FamilyMember", back_populates="user")
    incomes = relationship("Income", back_populates="user")
    expenses = relationship("Expense", back_populates="user")
    budgets = relationship("Budget", back_populates="user")
    bills = relationship("Bill", back_populates="user")
    loans = relationship("Loan", back_populates="user")
    properties = relationship("Property", back_populates="user")
    animals = relationship("Animal", back_populates="user")
    vehicles = relationship("Vehicle", back_populates="user")
    health_records = relationship("HealthRecord", back_populates="user")
    documents = relationship("Document", back_populates="user")
    emergency_contacts = relationship("EmergencyContact", back_populates="user")
    shopping_lists = relationship("ShoppingList", back_populates="user")
    tasks = relationship("Task", back_populates="user")
    farm_activities = relationship("FarmActivity", back_populates="user")
    assets = relationship("Asset", back_populates="user")
    bank_accounts = relationship("BankAccount", back_populates="user")
    calendar_events = relationship("CalendarEvent", back_populates="user")


class FamilyMember(Base):
    __tablename__ = "family_members"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    photo = Column(String(255))
    gender = Column(String(10), default="male")
    date_of_birth = Column(Date)
    age = Column(Integer)
    phone = Column(String(20))
    email = Column(String(255))
    relationship = Column(String(50), nullable=False)
    blood_group = Column(String(5))
    cnic = Column(String(50))
    occupation = Column(String(100))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="family_members")


# Finance Models
class Income(Base):
    __tablename__ = "incomes"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    amount = Column(Float, nullable=False)
    date = Column(Date, nullable=False)
    category = Column(String(50), nullable=False)
    source = Column(String(100))
    payment_method = Column(String(50), nullable=False)
    reference_number = Column(String(100))
    notes = Column(Text)
    is_recurring = Column(Boolean, default=False)
    recurring_frequency = Column(String(20))  # daily, weekly, monthly, yearly
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="incomes")


class Expense(Base):
    __tablename__ = "expenses"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    amount = Column(Float, nullable=False)
    date = Column(Date, nullable=False)
    category = Column(String(50), nullable=False)
    subcategory = Column(String(50))
    payment_method = Column(String(50), nullable=False)
    reference_number = Column(String(100))
    payee = Column(String(100))
    notes = Column(Text)
    is_recurring = Column(Boolean, default=False)
    recurring_frequency = Column(String(20))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="expenses")


class Budget(Base):
    __tablename__ = "budgets"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    name = Column(String(100), nullable=False)
    category = Column(String(50), nullable=False)
    allocated_amount = Column(Float, nullable=False)
    current_spent = Column(Float, default=0)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    is_active = Column(Boolean, default=True)
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="budgets")


class Bill(Base):
    __tablename__ = "bills"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    name = Column(String(100), nullable=False)
    category = Column(String(50), nullable=False)
    amount = Column(Float, nullable=False)
    due_date = Column(Date, nullable=False)
    issue_date = Column(Date)
    payment_date = Column(Date)
    status = Column(String(20), default="pending")  # pending, paid, overdue, cancelled
    vendor = Column(String(100))
    account_number = Column(String(100))
    payment_method = Column(String(50))
    reference_number = Column(String(100))
    notes = Column(Text)
    is_recurring = Column(Boolean, default=False)
    recurring_frequency = Column(String(20))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="bills")


class Loan(Base):
    __tablename__ = "loans"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    name = Column(String(100), nullable=False)
    loan_type = Column(String(50), nullable=False)  # Mortgage, Auto, Personal, Education, Business, etc.
    amount = Column(Float, nullable=False)
    interest_rate = Column(Float, default=0)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date)
    status = Column(String(20), default="active")  # active, paid, closed, overdue
    lender = Column(String(100), nullable=False)
    lender_contact = Column(String(50))
    next_payment_amount = Column(Float)
    next_payment_date = Column(Date)
    total_paid = Column(Float, default=0)
    collateral = Column(JSON)
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="loans")


# Property and Assets Models
class Property(Base):
    __tablename__ = "properties"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    name = Column(String(100), nullable=False)
    property_type = Column(String(50), nullable=False)  # House, Apartment, Land, Commercial, etc.
    address = Column(JSON, nullable=False)
    purchase_date = Column(Date)
    purchase_price = Column(Float)
    current_value = Column(Float)
    area = Column(Float)  # in square feet/meters
    area_unit = Column(String(10), default="sq ft")
    bedrooms = Column(Integer)
    bathrooms = Column(Integer)
    floors = Column(Integer)
    has_garage = Column(Boolean, default=False)
    has_garden = Column(Boolean, default=False)
    has_swimming_pool = Column(Boolean, default=False)
    is_rented = Column(Boolean, default=False)
    monthly_rent = Column(Float)
    tenant_name = Column(String(100))
    tenant_contact = Column(String(50))
    lease_start_date = Column(Date)
    lease_end_date = Column(Date)
    is_active = Column(Boolean, default=True)
    documents = Column(JSON)  # List of document references
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="properties")


class Vehicle(Base):
    __tablename__ = "vehicles"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    name = Column(String(100), nullable=False)
    vehicle_type = Column(String(50), nullable=False)  # Car, Bike, Truck, etc.
    make = Column(String(50))
    model = Column(String(50))
    year = Column(Integer)
    registration_number = Column(String(50), unique=True)
    engine_number = Column(String(50))
    chasis_number = Column(String(50))
    color = Column(String(30))
    mileage = Column(Float, default=0)
    mileage_unit = Column(String(10), default="km")
    purchase_date = Column(Date)
    purchase_price = Column(Float)
    current_value = Column(Float)
    fuel_type = Column(String(20))  # Petrol, Diesel, Electric, Hybrid, CNG
    transmission = Column(String(20))  # Manual, Automatic
    insurance_company = Column(String(100))
    insurance_policy_number = Column(String(100))
    insurance_expiry_date = Column(Date)
    last_service_date = Column(Date)
    next_service_date = Column(Date)
    service_reminder_km = Column(Integer, default=5000)
    is_active = Column(Boolean, default=True)
    documents = Column(JSON)
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="vehicles")


class Animal(Base):
    __tablename__ = "animals"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    name = Column(String(100), nullable=False)
    animal_type = Column(String(50), nullable=False)  # Pet, Livestock, Poultry, etc.
    breed = Column(String(50))
    gender = Column(String(10), default="unknown")
    date_of_birth = Column(Date)
    age = Column(Integer)
    age_unit = Column(String(10), default="years")
    color = Column(String(30))
    weight = Column(Float)
    weight_unit = Column(String(10), default="kg")
    height = Column(Float)
    height_unit = Column(String(10), default="cm")
    health_status = Column(String(20), default="good")
    vaccination_records = Column(JSON)
    medical_history = Column(JSON)
    purchase_date = Column(Date)
    purchase_price = Column(Float)
    current_value = Column(Float)
    is_active = Column(Boolean, default=True)
    is_sterilized = Column(Boolean, default=False)
    microchip_number = Column(String(50))
    identification_mark = Column(String(100))
    documents = Column(JSON)
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="animals")


# Health Models
class HealthRecord(Base):
    __tablename__ = "health_records"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    family_member_id = Column(String(36), ForeignKey("family_members.id"))
    record_type = Column(String(50), nullable=False)  # Checkup, Vaccination, Surgery, Test, etc.
    title = Column(String(100), nullable=False)
    date = Column(Date, nullable=False)
    time = Column(String(10))
    doctor_name = Column(String(100))
    doctor_specialization = Column(String(100))
    hospital_clinic = Column(String(100))
    hospital_address = Column(JSON)
    hospital_contact = Column(String(50))
    symptoms = Column(Text)
    diagnosis = Column(Text)
    treatment = Column(Text)
    medication_prescribed = Column(JSON)
    temperature = Column(Float)
    temperature_unit = Column(String(5), default="°F")
    blood_pressure = Column(String(20))
    pulse_rate = Column(Integer)
    respiratory_rate = Column(Integer)
    oxygen_level = Column(Float)
    weight = Column(Float)
    weight_unit = Column(String(10), default="kg")
    height = Column(Float)
    height_unit = Column(String(10), default="cm")
    bmi = Column(Float)
    status = Column(String(20), default="completed")  # completed, scheduled, urgent, follow-up
    follow_up_date = Column(Date)
    cost = Column(Float)
    payment_status = Column(String(20), default="unpaid")  # unpaid, paid, insurance
    insurance_claim_number = Column(String(100))
    documents = Column(JSON)
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="health_records")


# Document Models
class Document(Base):
    __tablename__ = "documents"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    name = Column(String(100), nullable=False)
    document_type = Column(String(50), nullable=False)  # Legal, ID, Insurance, Financial, Health, Education, etc.
    category = Column(String(50), nullable=False)  # Property, Personal, Vehicles, Finance, Health, Education, etc.
    description = Column(Text)
    file_path = Column(String(255), nullable=False)
    file_name = Column(String(255), nullable=False)
    file_size = Column(Integer)  # in bytes
    file_size_unit = Column(String(10), default="B")
    mime_type = Column(String(50))
    version = Column(String(20), default="1.0")
    tags = Column(JSON)  # List of tags
    issuer = Column(String(100))
    issue_date = Column(Date)
    expiry_date = Column(Date)
    reference_number = Column(String(100))
    location = Column(String(100))  # Physical location of the document
    digital_location = Column(String(255))  # Cloud storage path
    is_verified = Column(Boolean, default=False)
    is_encrypted = Column(Boolean, default=False)
    access_level = Column(String(20), default="private")  # private, family, public
    status = Column(String(20), default="active")  # active, expired, archived
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="documents")


# Emergency Models
class EmergencyContact(Base):
    __tablename__ = "emergency_contacts"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    name = Column(String(100), nullable=False)
    contact_type = Column(String(50), nullable=False)  # Police, Fire, Medical, Doctor, Neighbor, Family, Service, etc.
    phone_primary = Column(String(20), nullable=False)
    phone_secondary = Column(String(20))
    email = Column(String(255))
    address = Column(JSON)
    city = Column(String(50))
    state = Column(String(50))
    country = Column(String(50), default="Pakistan")
    postal_code = Column(String(20))
    latitude = Column(Float)
    longitude = Column(Float)
    relationship = Column(String(50))
    specialization = Column(String(100))  # For doctors
    working_hours = Column(JSON)
    is_verified = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    priority = Column(Integer, default=0)  # Higher number = higher priority
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="emergency_contacts")


# Shopping Models
class ShoppingList(Base):
    __tablename__ = "shopping_lists"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    name = Column(String(100), nullable=False)
    category = Column(String(50), nullable=False)  # Groceries, Clothing, Household, Electronics, Education, Gifts, etc.
    description = Column(Text)
    target_date = Column(Date)
    budget = Column(Float)
    priority = Column(String(20), default="medium")  # high, medium, low
    status = Column(String(20), default="pending")  # pending, in-progress, completed, cancelled
    is_recurring = Column(Boolean, default=False)
    recurring_frequency = Column(String(20))
    total_items = Column(Integer, default=0)
    completed_items = Column(Integer, default=0)
    total_spent = Column(Float, default=0)
    store_preference = Column(String(100))
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="shopping_lists")


class ShoppingItem(Base):
    __tablename__ = "shopping_items"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    list_id = Column(String(36), ForeignKey("shopping_lists.id"), nullable=False)
    name = Column(String(100), nullable=False)
    description = Column(Text)
    category = Column(String(50))
    quantity = Column(Float, default=1)
    unit = Column(String(20), default="unit")
    estimated_price = Column(Float)
    actual_price = Column(Float)
    brand = Column(String(50))
    size = Column(String(20))
    color = Column(String(20))
    priority = Column(String(20), default="medium")
    status = Column(String(20), default="pending")  # pending, purchased, cancelled
    purchased_date = Column(DateTime)
    purchased_from = Column(String(100))
    payment_method = Column(String(50))
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


# Task Models
class Task(Base):
    __tablename__ = "tasks"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    assigned_to_id = Column(String(36), ForeignKey("family_members.id"))
    title = Column(String(100), nullable=False)
    description = Column(Text)
    category = Column(String(50), nullable=False)  # Bills, Shopping, Vehicles, Health, Education, Home, Finance, etc.
    priority = Column(String(20), default="medium")  # high, medium, low
    status = Column(String(20), default="pending")  # pending, in-progress, completed, cancelled, overdue
    due_date = Column(Date)
    due_time = Column(String(10))
    start_date = Column(DateTime)
    completed_date = Column(DateTime)
    estimated_duration = Column(Integer)  # in minutes
    actual_duration = Column(Integer)  # in minutes
    cost = Column(Float)
    payment_status = Column(String(20), default="unpaid")
    location = Column(JSON)
    reminders = Column(JSON)  # List of reminder dates/times
    is_recurring = Column(Boolean, default=False)
    recurring_frequency = Column(String(20))
    recurring_end_date = Column(Date)
    dependencies = Column(JSON)  # List of dependent task IDs
    tags = Column(JSON)
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="tasks")


# Farm Models
class FarmActivity(Base):
    __tablename__ = "farm_activities"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    name = Column(String(100), nullable=False)
    activity_type = Column(String(50), nullable=False)  # Harvest, Planting, Irrigation, Spraying, Fertilizing, Testing, Livestock, Maintenance, etc.
    crop_type = Column(String(50))
    crop_variety = Column(String(50))
    area = Column(Float)  # in acres or square meters
    area_unit = Column(String(10), default="acres")
    quantity = Column(Float)  # for harvest yield, seeds used, etc.
    quantity_unit = Column(String(10))
    start_date = Column(Date, nullable=False)
    end_date = Column(Date)
    actual_completion_date = Column(Date)
    status = Column(String(20), default="pending")  # pending, in-progress, completed, cancelled, daily
    priority = Column(String(20), default="medium")
    weather_conditions = Column(JSON)
    soil_conditions = Column(JSON)
    equipment_used = Column(JSON)
    labor_used = Column(Integer)  # number of workers
    cost = Column(Float)
    revenue = Column(Float)
    profit = Column(Float)
    notes = Column(Text)
    documents = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="farm_activities")


class Livestock(Base):
    __tablename__ = "livestock"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    animal_type = Column(String(50), nullable=False)  # Cow, Buffalo, Goat, Sheep, Chicken, etc.
    breed = Column(String(50))
    tag_number = Column(String(20), unique=True)
    name = Column(String(50))
    gender = Column(String(10), default="unknown")
    date_of_birth = Column(Date)
    age = Column(Integer)
    age_unit = Column(String(10), default="years")
    purchase_date = Column(Date)
    purchase_price = Column(Float)
    current_value = Column(Float)
    weight = Column(Float)
    weight_unit = Column(String(10), default="kg")
    health_status = Column(String(20), default="good")
    vaccination_records = Column(JSON)
    medical_history = Column(JSON)
    feeding_schedule = Column(JSON)
    milk_production = Column(Float)  # liters per day
    milk_production_unit = Column(String(10), default="liters")
    egg_production = Column(Integer)  # eggs per day
    is_pregnant = Column(Boolean, default=False)
    expected_delivery_date = Column(Date)
    offspring_count = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    location = Column(String(50))
    notes = Column(Text)
    documents = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User")


class FarmEquipment(Base):
    __tablename__ = "farm_equipment"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    name = Column(String(100), nullable=False)
    equipment_type = Column(String(50), nullable=False)  # Tractor, Plow, Harvester, Irrigation System, etc.
    make = Column(String(50))
    model = Column(String(50))
    year = Column(Integer)
    serial_number = Column(String(50))
    purchase_date = Column(Date)
    purchase_price = Column(Float)
    current_value = Column(Float)
    last_maintenance_date = Column(Date)
    next_maintenance_date = Column(Date)
    maintenance_interval = Column(Integer)  # in hours or days
    maintenance_interval_unit = Column(String(10), default="hours")
    status = Column(String(20), default="active")  # active, under_maintenance, broken
    location = Column(String(50))
    fuel_type = Column(String(20))
    fuel_capacity = Column(Float)
    fuel_capacity_unit = Column(String(10), default="liters")
    current_fuel_level = Column(Float)
    is_operational = Column(Boolean, default=True)
    operator_required = Column(Boolean, default=False)
    notes = Column(Text)
    documents = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User")


# Asset Models
class Asset(Base):
    __tablename__ = "assets"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    name = Column(String(100), nullable=False)
    asset_type = Column(String(50), nullable=False)  # Property, Vehicle, Electronics, Jewelry, Furniture, Art, etc.
    category = Column(String(50), nullable=False)  # Real Estate, Cars, Mobile, Laptop, Precious, Wearable, Land, Bike, etc.
    description = Column(Text)
    purchase_date = Column(Date)
    purchase_price = Column(Float, nullable=False)
    purchase_currency = Column(String(5), default="PKR")
    current_value = Column(Float)
    current_currency = Column(String(5), default="PKR")
    appreciation_rate = Column(Float, default=0)
    condition = Column(String(20), default="Excellent")  # Excellent, Good, Fair, Poor
    location = Column(String(100))
    brand = Column(String(50))
    model = Column(String(50))
    serial_number = Column(String(50))
    color = Column(String(30))
    dimensions = Column(JSON)  # {length, width, height, unit}
    weight = Column(Float)
    weight_unit = Column(String(10), default="kg")
    warranty_period = Column(Integer)  # in months
    warranty_expiry_date = Column(Date)
    insurance_company = Column(String(100))
    insurance_policy_number = Column(String(100))
    insurance_expiry_date = Column(Date)
    insurance_amount = Column(Float)
    is_insured = Column(Boolean, default=False)
    is_financed = Column(Boolean, default=False)
    financing_bank = Column(String(100))
    financing_account_number = Column(String(100))
    financing_monthly_payment = Column(Float)
    financing_start_date = Column(Date)
    financing_end_date = Column(Date)
    is_active = Column(Boolean, default=True)
    is_sold = Column(Boolean, default=False)
    sale_date = Column(Date)
    sale_price = Column(Float)
    tags = Column(JSON)
    documents = Column(JSON)
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="assets")


# Bank Account Models
class BankAccount(Base):
    __tablename__ = "bank_accounts"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    name = Column(String(100), nullable=False)
    bank_name = Column(String(100), nullable=False)
    account_number = Column(String(100), nullable=False)
    account_type = Column(String(50), nullable=False)  # Savings, Current, Fixed Deposit, Mobile, Foreign, etc.
    branch = Column(String(100))
    branch_code = Column(String(50))
    currency = Column(String(5), default="PKR")
    current_balance = Column(Float, default=0)
    available_balance = Column(Float, default=0)
    minimum_balance = Column(Float, default=0)
    interest_rate = Column(Float, default=0)
    interest_calculation_frequency = Column(String(20))  # daily, monthly, quarterly, yearly
    last_interest_date = Column(Date)
    next_interest_date = Column(Date)
    opening_date = Column(Date)
    status = Column(String(20), default="active")  # active, inactive, frozen, closed
    account_holder_name = Column(String(100))
    account_holder_cnic = Column(String(50))
    account_holder_phone = Column(String(20))
    account_holder_email = Column(String(255))
    is_joint_account = Column(Boolean, default=False)
    joint_account_holders = Column(JSON)
    is_default = Column(Boolean, default=False)
    is_salary_account = Column(Boolean, default=False)
    salary_credit_date = Column(Integer)  # Day of month
    last_transaction_date = Column(DateTime)
    last_transaction_amount = Column(Float)
    last_transaction_type = Column(String(20))  # deposit, withdrawal, transfer
    monthly_deposits = Column(Float, default=0)
    monthly_withdrawals = Column(Float, default=0)
    monthly_transfers = Column(Float, default=0)
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="bank_accounts")


class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    account_id = Column(String(36), ForeignKey("bank_accounts.id"), nullable=False)
    transaction_type = Column(String(20), nullable=False)  # deposit, withdrawal, transfer, payment, receipt, etc.
    amount = Column(Float, nullable=False)
    currency = Column(String(5), default="PKR")
    date = Column(DateTime, nullable=False)
    description = Column(Text)
    reference_number = Column(String(100))
    payee_payer_name = Column(String(100))
    payee_payer_account = Column(String(100))
    payee_payer_bank = Column(String(100))
    category = Column(String(50))
    subcategory = Column(String(50))
    payment_method = Column(String(50))
    cheque_number = Column(String(50))
    cheque_date = Column(Date)
    status = Column(String(20), default="completed")  # pending, completed, failed, reversed
    related_income_id = Column(String(36), ForeignKey("incomes.id"))
    related_expense_id = Column(String(36), ForeignKey("expenses.id"))
    related_bill_id = Column(String(36), ForeignKey("bills.id"))
    related_loan_id = Column(String(36), ForeignKey("loans.id"))
    tags = Column(JSON)
    documents = Column(JSON)
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


# Calendar Models
class CalendarEvent(Base):
    __tablename__ = "calendar_events"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    title = Column(String(100), nullable=False)
    description = Column(Text)
    event_type = Column(String(50), nullable=False)  # Meeting, Appointment, Birthday, Anniversary, Holiday, Task, Reminder, etc.
    category = Column(String(50))
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    is_all_day = Column(Boolean, default=False)
    location = Column(JSON)
    attendees = Column(JSON)  # List of attendee emails/names
    organizer = Column(String(100))
    status = Column(String(20), default="confirmed")  # confirmed, tentative, cancelled
    priority = Column(String(20), default="medium")
    color = Column(String(20), default="#3B82F6")
    is_recurring = Column(Boolean, default=False)
    recurring_frequency = Column(String(20))  # daily, weekly, monthly, yearly
    recurring_end_date = Column(Date)
    recurring_exceptions = Column(JSON)  # List of dates to skip
    reminders = Column(JSON)  # List of reminder times
    related_module = Column(String(50))  # bills, income, expense, health, etc.
    related_module_id = Column(String(36))
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="calendar_events")


# Report Models
class Report(Base):
    __tablename__ = "reports"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    name = Column(String(100), nullable=False)
    report_type = Column(String(50), nullable=False)  # Financial, Family, Health, Assets, etc.
    sub_type = Column(String(50))  # Income, Expenses, Budget, Net Worth, etc.
    description = Column(Text)
    parameters = Column(JSON)  # Filter parameters used
    data = Column(JSON)  # Report data in JSON format
    file_path = Column(String(255))
    file_format = Column(String(10))  # pdf, csv, excel, json
    start_date = Column(Date)
    end_date = Column(Date)
    generated_at = Column(DateTime, default=datetime.utcnow)
    schedule = Column(String(20))  # one-time, daily, weekly, monthly, yearly
    next_run_date = Column(DateTime)
    is_public = Column(Boolean, default=False)
    shared_with = Column(JSON)  # List of user IDs
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User")


# Settings Models
class Setting(Base):
    __tablename__ = "settings"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    setting_key = Column(String(100), nullable=False)
    setting_value = Column(JSON, nullable=False)
    category = Column(String(50), default="general")  # general, appearance, notification, security, etc.
    description = Column(Text)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


# Notification Models
class Notification(Base):
    __tablename__ = "notifications"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    title = Column(String(100), nullable=False)
    message = Column(Text, nullable=False)
    notification_type = Column(String(50), nullable=False)  # alert, reminder, info, warning, error, success
    related_module = Column(String(50))  # bills, income, expense, health, etc.
    related_module_id = Column(String(36))
    is_read = Column(Boolean, default=False)
    is_archived = Column(Boolean, default=False)
    priority = Column(String(20), default="medium")
    action_url = Column(String(255))
    action_button_text = Column(String(50))
    scheduled_date = Column(DateTime)
    sent_date = Column(DateTime)
    read_date = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


# AI Assistant Models
class AIConversation(Base):
    __tablename__ = "ai_conversations"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    title = Column(String(100))
    context = Column(String(200))  # Short context for listing
    messages = Column(JSON, nullable=False)  # List of message objects
    model_used = Column(String(50), default="gpt-3.5-turbo")
    temperature = Column(Float, default=0.7)
    max_tokens = Column(Integer, default=150)
    total_tokens_used = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class AIPrompt(Base):
    __tablename__ = "ai_prompts"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"))
    name = Column(String(100), nullable=False)
    prompt_text = Column(Text, nullable=False)
    category = Column(String(50))  # financial, family, health, general, custom
    variables = Column(JSON)  # List of variables that can be replaced
    expected_response_format = Column(String(100))
    temperature = Column(Float, default=0.7)
    max_tokens = Column(Integer, default=150)
    is_favorite = Column(Boolean, default=False)
    usage_count = Column(Integer, default=0)
    last_used = Column(DateTime)
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)