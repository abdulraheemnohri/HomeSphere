# HomeSphere Installation Guide

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/abdulraheemnohri/HomeSphere.git
cd HomeSphere
```

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/api/docs

## Features Implemented

### Frontend (React + TypeScript + Tailwind CSS)
- Modern, responsive UI with dark mode support
- Dashboard with stats and charts
- Login page with email/password authentication
- PIN login page with 4-digit PIN input
- Quick actions for common tasks
- Weather widget
- Family overview
- Recent transactions
- Upcoming events

### Backend (FastAPI + SQLAlchemy)
- RESTful API endpoints
- JWT token authentication
- Database models for:
  - Users
  - Family Members
  - Income & Expenses
  - Properties
  - Vehicles
  - Animals
  - And more...
- SQLite database (offline-first)

## Project Structure

```
HomeSphere/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   ├── index.css
│   │   ├── pages/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.tsx
│   │   │   │   └── PINLogin.tsx
│   │   │   └── Dashboard/
│   │   │       └── Dashboard.tsx
│   │   └── ...
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── database/
│   │   ├── __init__.py
│   │   ├── database.py
│   │   └── models.py
│   └── authentication/
│       ├── __init__.py
│       └── auth.py
├── .gitignore
└── README.md
```

## Modern UI/UX Features

1. **Responsive Design**: Works on mobile, tablet, and desktop
2. **Dark Mode**: Automatic theme switching based on system preferences
3. **Animations**: Smooth transitions and animations using Framer Motion
4. **Clean Layout**: Modern card-based design with proper spacing
5. **Accessibility**: Proper contrast and keyboard navigation
6. **Mobile-Friendly**: Bottom navigation for mobile devices
7. **Quick Actions**: One-tap access to common tasks

## Authentication Options

1. **Email/Password**: Traditional login
2. **PIN Login**: Quick 4-digit PIN access
3. **Face ID**: (Planned for future mobile app)
4. **Fingerprint**: (Planned for future mobile app)

## Next Steps

1. Run both frontend and backend servers
2. Access the application at http://localhost:3000
3. Use the default PIN: 1234 for testing
4. Explore the dashboard and features

## Troubleshooting

### Backend not starting?
- Make sure Python 3.9+ is installed
- Check that all dependencies are installed: `pip install -r requirements.txt`
- Ensure port 8000 is available

### Frontend not starting?
- Make sure Node.js 18+ is installed
- Run `npm install` to install dependencies
- Ensure port 3000 is available

### Database issues?
- SQLite database is created automatically
- Check the `homesphere.db` file in the backend directory
