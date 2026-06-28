"""Main router for API v1.

Aggregates all endpoint routers into a single router.
"""

from fastapi import APIRouter

# Import all endpoint routers
from .endpoints import (
    auth_router,
    family_router,
    finance_router,
    properties_router,
    vehicles_router,
    animals_router,
    farm_router,
    assets_router,
    inventory_router,
    documents_router,
    health_router,
    calendar_router,
    tasks_router,
    shopping_router,
    emergency_router,
    reports_router,
    ai_router,
    bills_router,
    budget_router,
    bank_accounts_router,
    loans_router,
    rooms_router,
    settings_router,
)

# Create main router
router = APIRouter(prefix="/api/v1", tags=["v1"])

# Include all endpoint routers
router.include_router(auth_router, prefix="/auth", tags=["Authentication"])
router.include_router(family_router, prefix="/family", tags=["Family"])
router.include_router(finance_router, prefix="/finance", tags=["Finance"])
router.include_router(properties_router, prefix="/properties", tags=["Properties"])
router.include_router(vehicles_router, prefix="/vehicles", tags=["Vehicles"])
router.include_router(animals_router, prefix="/animals", tags=["Animals"])
router.include_router(farm_router, prefix="/farm", tags=["Farm"])
router.include_router(assets_router, prefix="/assets", tags=["Assets"])
router.include_router(inventory_router, prefix="/inventory", tags=["Inventory"])
router.include_router(documents_router, prefix="/documents", tags=["Documents"])
router.include_router(health_router, prefix="/health", tags=["Health"])
router.include_router(calendar_router, prefix="/calendar", tags=["Calendar"])
router.include_router(tasks_router, prefix="/tasks", tags=["Tasks"])
router.include_router(shopping_router, prefix="/shopping", tags=["Shopping"])
router.include_router(emergency_router, prefix="/emergency", tags=["Emergency"])
router.include_router(reports_router, prefix="/reports", tags=["Reports"])
router.include_router(ai_router, prefix="/ai", tags=["AI"])
router.include_router(bills_router, prefix="/bills", tags=["Bills"])
router.include_router(budget_router, prefix="/budget", tags=["Budget"])
router.include_router(bank_accounts_router, prefix="/bank-accounts", tags=["Bank Accounts"])
router.include_router(loans_router, prefix="/loans", tags=["Loans"])
router.include_router(rooms_router, prefix="/rooms", tags=["Rooms"])
router.include_router(settings_router, prefix="/settings", tags=["Settings"])