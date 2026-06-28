# Endpoints module for API v1
# Contains all endpoint routers

from .auth import router as auth_router
from .family import router as family_router
from .finance import router as finance_router
from .properties import router as properties_router
from .vehicles import router as vehicles_router
from .animals import router as animals_router
from .farm import router as farm_router
from .assets import router as assets_router
from .inventory import router as inventory_router
from .documents import router as documents_router
from .health import router as health_router
from .calendar import router as calendar_router
from .tasks import router as tasks_router
from .shopping import router as shopping_router
from .emergency import router as emergency_router
from .reports import router as reports_router
from .ai import router as ai_router
from .bills import router as bills_router
from .budget import router as budget_router
from .bank_accounts import router as bank_accounts_router
from .loans import router as loans_router
from .rooms import router as rooms_router
from .settings import router as settings_router

__all__ = [
    "auth_router",
    "family_router",
    "finance_router",
    "properties_router",
    "vehicles_router",
    "animals_router",
    "farm_router",
    "assets_router",
    "inventory_router",
    "documents_router",
    "health_router",
    "calendar_router",
    "tasks_router",
    "shopping_router",
    "emergency_router",
    "reports_router",
    "ai_router",
    "bills_router",
    "budget_router",
    "bank_accounts_router",
    "loans_router",
    "rooms_router",
    "settings_router",
]