from sqlalchemy.orm import Session
from typing import Optional, List, Tuple, Dict
from datetime import date, datetime
from enum import Enum

from ..database.models import Income, Expense, Budget, Bill, Loan, BankAccount
from ..schemas.finance import (
    IncomeCreate, IncomeUpdate,
    ExpenseCreate, ExpenseUpdate,
    BudgetCreate, BudgetUpdate,
    BillCreate, BillUpdate,
    LoanCreate, LoanUpdate
)
from ..core.exceptions import NotFoundException


class FinanceService:
    def __init__(self, db: Session):
        self.db = db

    # Income methods
    def create_income(self, income_data: IncomeCreate, user_id: int) -> Income:
        income = Income(**income_data.dict(), user_id=user_id)
        self.db.add(income)
        self.db.commit()
        self.db.refresh(income)
        return income

    def get_income_by_id(self, income_id: int, user_id: int) -> Optional[Income]:
        return self.db.query(Income).filter(
            Income.id == income_id,
            Income.user_id == user_id
        ).first()

    def get_all_incomes(
        self, user_id: int, skip: int = 0, limit: int = 100,
        category: Optional[str] = None, start_date: Optional[date] = None,
        end_date: Optional[date] = None
    ) -> List[Income]:
        query = self.db.query(Income).filter(Income.user_id == user_id)
        if category:
            query = query.filter(Income.category == category)
        if start_date:
            query = query.filter(Income.date >= start_date)
        if end_date:
            query = query.filter(Income.date <= end_date)
        return query.offset(skip).limit(limit).all()

    def update_income(self, income_id: int, income_data: IncomeUpdate, user_id: int) -> Income:
        income = self.get_income_by_id(income_id, user_id)
        if not income:
            raise NotFoundException("Income", income_id)
        for key, value in income_data.dict(exclude_unset=True).items():
            setattr(income, key, value)
        self.db.commit()
        self.db.refresh(income)
        return income

    def delete_income(self, income_id: int, user_id: int) -> None:
        income = self.get_income_by_id(income_id, user_id)
        if not income:
            raise NotFoundException("Income", income_id)
        self.db.delete(income)
        self.db.commit()

    # Expense methods
    def create_expense(self, expense_data: ExpenseCreate, user_id: int) -> Expense:
        expense = Expense(**expense_data.dict(), user_id=user_id)
        self.db.add(expense)
        self.db.commit()
        self.db.refresh(expense)
        return expense

    def get_expense_by_id(self, expense_id: int, user_id: int) -> Optional[Expense]:
        return self.db.query(Expense).filter(
            Expense.id == expense_id,
            Expense.user_id == user_id
        ).first()

    def get_all_expenses(
        self, user_id: int, skip: int = 0, limit: int = 100,
        category: Optional[str] = None, start_date: Optional[date] = None,
        end_date: Optional[date] = None
    ) -> List[Expense]:
        query = self.db.query(Expense).filter(Expense.user_id == user_id)
        if category:
            query = query.filter(Expense.category == category)
        if start_date:
            query = query.filter(Expense.date >= start_date)
        if end_date:
            query = query.filter(Expense.date <= end_date)
        return query.offset(skip).limit(limit).all()

    def update_expense(self, expense_id: int, expense_data: ExpenseUpdate, user_id: int) -> Expense:
        expense = self.get_expense_by_id(expense_id, user_id)
        if not expense:
            raise NotFoundException("Expense", expense_id)
        for key, value in expense_data.dict(exclude_unset=True).items():
            setattr(expense, key, value)
        self.db.commit()
        self.db.refresh(expense)
        return expense

    def delete_expense(self, expense_id: int, user_id: int) -> None:
        expense = self.get_expense_by_id(expense_id, user_id)
        if not expense:
            raise NotFoundException("Expense", expense_id)
        self.db.delete(expense)
        self.db.commit()

    # Budget methods
    def create_budget(self, budget_data: BudgetCreate, user_id: int) -> Budget:
        budget = Budget(**budget_data.dict(), user_id=user_id)
        self.db.add(budget)
        self.db.commit()
        self.db.refresh(budget)
        return budget

    def get_budget_by_id(self, budget_id: int, user_id: int) -> Optional[Budget]:
        return self.db.query(Budget).filter(
            Budget.id == budget_id,
            Budget.user_id == user_id
        ).first()

    def get_all_budgets(self, user_id: int, skip: int = 0, limit: int = 100) -> List[Budget]:
        return self.db.query(Budget).filter(
            Budget.user_id == user_id
        ).offset(skip).limit(limit).all()

    def update_budget(self, budget_id: int, budget_data: BudgetUpdate, user_id: int) -> Budget:
        budget = self.get_budget_by_id(budget_id, user_id)
        if not budget:
            raise NotFoundException("Budget", budget_id)
        for key, value in budget_data.dict(exclude_unset=True).items():
            setattr(budget, key, value)
        self.db.commit()
        self.db.refresh(budget)
        return budget

    def delete_budget(self, budget_id: int, user_id: int) -> None:
        budget = self.get_budget_by_id(budget_id, user_id)
        if not budget:
            raise NotFoundException("Budget", budget_id)
        self.db.delete(budget)
        self.db.commit()

    # Financial summary methods
    def get_financial_summary(self, user_id: int, month: int, year: int) -> Dict:
        from sqlalchemy import func, extract
        
        # Get income for month
        income_query = self.db.query(func.sum(Income.amount)).filter(
            Income.user_id == user_id,
            extract("year", Income.date) == year,
            extract("month", Income.date) == month
        )
        total_income = income_query.scalar() or 0
        
        # Get expense for month
        expense_query = self.db.query(func.sum(Expense.amount)).filter(
            Expense.user_id == user_id,
            extract("year", Expense.date) == year,
            extract("month", Expense.date) == month
        )
        total_expense = expense_query.scalar() or 0
        
        # Get savings (income - expense)
        savings = total_income - total_expense
        
        return {
            "total_income": float(total_income),
            "total_expense": float(total_expense),
            "savings": float(savings),
            "month": month,
            "year": year
        }

    def get_category_breakdown(self, user_id: int, month: int, year: int, is_income: bool = True) -> Dict:
        from sqlalchemy import func, extract
        
        if is_income:
            query = self.db.query(
                Income.category,
                func.sum(Income.amount).label("total")
            ).filter(
                Income.user_id == user_id,
                extract("year", Income.date) == year,
                extract("month", Income.date) == month
            ).group_by(Income.category)
        else:
            query = self.db.query(
                Expense.category,
                func.sum(Expense.amount).label("total")
            ).filter(
                Expense.user_id == user_id,
                extract("year", Expense.date) == year,
                extract("month", Expense.date) == month
            ).group_by(Expense.category)
        
        results = query.all()
        return {row.category: float(row.total) for row in results}

    def get_balance_trend(self, user_id: int, months: int = 6) -> List[Dict]:
        from datetime import datetime, timedelta
        from sqlalchemy import func, extract, or_
        
        trend = []
        today = datetime.now().date()
        
        for i in range(months):
            month_date = today - timedelta(days=30 * i)
            month = month_date.month
            year = month_date.year
            
            income = self.db.query(func.sum(Income.amount)).filter(
                Income.user_id == user_id,
                extract("year", Income.date) == year,
                extract("month", Income.date) == month
            ).scalar() or 0
            
            expense = self.db.query(func.sum(Expense.amount)).filter(
                Expense.user_id == user_id,
                extract("year", Expense.date) == year,
                extract("month", Expense.date) == month
            ).scalar() or 0
            
            trend.append({
                "month": month,
                "year": year,
                "income": float(income),
                "expense": float(expense),
                "savings": float(income - expense)
            })
        
        return list(reversed(trend))