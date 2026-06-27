# HomeSphere - Family, Home, Finance & Asset Management System

A complete offline-first web application for managing a household, family members, income, expenses, properties, pets, livestock, assets, and daily life from one dashboard.

## Features

### Dashboard
- Family Overview
- Monthly Income & Expenses
- Savings Tracking
- Budget Progress
- Properties & Assets Summary
- Upcoming Events & Bills
- Weather Widget
- Quick Actions

### Family Management
- Complete family records with photos
- Family tree and relationships
- Medical records and allergies
- Emergency contacts
- Document storage

### Finance Management
- Income tracking (multiple sources)
- Expense management with categories
- Bank account management
- Budget planning (monthly, weekly, yearly)
- Bills management with reminders
- Loan tracking
- Savings goals

### Property Management
- Manage houses, apartments, land, commercial buildings
- Room management with furniture and electronics
- Maintenance tracking
- Tenant management
- Property taxes and utilities

### Vehicle Management
- Cars, bikes, tractors, trucks, boats
- Insurance and registration tracking
- Fuel and maintenance records
- Service history

### Animal Management
- Pets and livestock tracking
- Health records and vaccinations
- Diet and production tracking (milk, eggs)
- Breeding and pregnancy records
- GPS and microchip tracking

### Farm Management
- Fields and crops management
- Fertilizer and seed tracking
- Equipment management
- Worker management
- Harvest records
- Irrigation tracking

### Asset Management
- Gold, silver, jewelry, cash
- Electronics, furniture, machinery
- Artwork and collectibles
- Depreciation tracking

### Inventory Management
- Home items tracking
- Barcode/QR code support
- Warranty tracking
- Location management

## Technology Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Chart.js
- React Router
- Framer Motion (animations)
- Lucide React (icons)

### Backend
- FastAPI (Python)
- SQLAlchemy (ORM)
- SQLite (offline, default)
- PostgreSQL (optional, online)

## Installation

### Clone the Repository
```bash
git clone https://github.com/abdulraheemnohri/HomeSphere.git
cd HomeSphere
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/api/docs

## License

MIT License
