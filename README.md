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

### Additional Features
- Calendar with birthdays, anniversaries, events
- Task management with reminders
- Shopping lists
- Document storage with encryption
- Health records for family and animals
- Emergency center with contacts
- AI Assistant for smart queries
- Reports and analytics
- Notifications
- Search across all modules
- Settings and preferences
- Security (PIN, Face ID, Fingerprint)
- Backup and restore
- Cloud sync (optional)

## Technology Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Chart.js
- React Router
- Framer Motion (animations)
- Lucide React (icons)
- Zustand (state management)
- Axios (HTTP client)

### Backend
- FastAPI (Python)
- SQLAlchemy (ORM)
- SQLite (offline, default)
- PostgreSQL (optional, online)

### Authentication
- JWT tokens
- Local accounts
- PIN login
- Face login (optional)
- Fingerprint (mobile)

### Storage
- Local storage
- Database
- Automatic backup
- Cloud sync (optional)

## Installation

### Prerequisites
- Node.js 18+ (for frontend)
- Python 3.9+ (for backend)
- Git

### Clone the Repository
```bash
git clone https://github.com/abdulraheemnohri/HomeSphere.git
cd HomeSphere
```

### Frontend Setup
```bash
cd frontend
npm install
```

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
```

### Environment Configuration

Create a `.env` file in the `backend` directory:
```env
# Server Configuration
HOST=0.0.0.0
PORT=8000
DEBUG=True

# Database Configuration
DATABASE_URL=sqlite:///./homesphere.db

# Security
SECRET_KEY=your-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Running the Application

#### Development Mode

**Backend:**
```bash
cd backend
uvicorn main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm run start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/api/docs

#### Production Mode

**Build Frontend:**
```bash
cd frontend
npm run build
```

**Run Backend:**
```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

## Folder Structure

```
homesphere/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── contexts/
│   │   ├── utils/
│   │   ├── types/
│   │   ├── services/
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
├── backend/
│   ├── api/
│   ├── models/
│   ├── database/
│   ├── services/
│   ├── authentication/
│   ├── reports/
│   ├── notifications/
│   ├── ai/
│   ├── main.py
│   └── requirements.txt
├── uploads/
├── backups/
├── exports/
├── docs/
└── README.md
```

## API Documentation

The API documentation is available at `/api/docs` when the backend is running.

### Main API Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/token` - Get access token
- `POST /api/auth/pin-login` - Login with PIN
- `GET /api/auth/me` - Get current user info

#### Family
- `GET /api/family/members` - Get all family members
- `POST /api/family/members` - Create a new family member
- `GET /api/family/members/{id}` - Get a specific family member

#### Income
- `GET /api/income` - Get all income records
- `POST /api/income` - Create a new income record

#### Expenses
- `GET /api/expenses` - Get all expense records
- `POST /api/expenses` - Create a new expense record

#### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Security

### Authentication
- JWT token-based authentication
- Password hashing with bcrypt
- PIN login support
- Role-based access control

### Data Protection
- Encrypted database (optional)
- Secure file storage
- Audit logs

### Roles
- Owner (full access)
- Administrator
- Family Member
- Accountant
- Farm Manager
- Guest
- Read Only

## Backup & Restore

### Manual Backup
```bash
# Backend will automatically create backups
# Backups are stored in the backups/ directory
```

### Restore from Backup
```bash
# Copy backup file to backups/ directory
# The system will detect and allow restore through settings
```

## Cloud Sync (Optional)

To enable cloud sync, configure your cloud storage provider in the settings.

## Monetization

HomeSphere is donation-based. All core features are free. You can support the project through:
- GitHub Sponsors
- Buy Me a Coffee
- Ko-fi
- Patreon
- PayPal Donations
- Cryptocurrency donations

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is open source and available under the MIT License.

## Contact

For questions or support, please contact:
- Email: abdulraheemnohri@gmail.com
- GitHub: https://github.com/abdulraheemnohari

---

Made with love for families, homeowners, farmers, and small business owners.
