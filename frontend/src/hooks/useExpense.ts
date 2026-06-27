/**
 * Expense Hook
 * Handles expense data fetching and state management
 */

import { useState, useCallback } from 'react';
import { expenseApi } from '@/services/api';
import {
  useFinance,
  useFinanceActions,
  useLoadingActions
} from '@/store';
import { Expense, ExpenseCreate, Expense as ExpenseUpdate } from '@/types';

interface ExpenseHook {
  expenses: Expense[];
  totalExpenses: number;
  isLoading: boolean;
  error: string | null;
  fetchExpenses: (params?: any) => Promise<void>;
  getExpense: (id: string) => Promise<Expense | null>;
  createExpense: (data: ExpenseCreate) => Promise<Expense>;
  updateExpense: (id: string, data: Partial<ExpenseUpdate>) => Promise<Expense | null>;
  deleteExpense: (id: string) => Promise<void>;
}

export const useExpenseHook = (): ExpenseHook => {
  const { expenses, totalExpenses } = useFinance();
  const {
    setExpenses,
    addExpense,
    updateExpense: updateExpenseAction,
    deleteExpense: deleteExpenseAction
  } = useFinanceActions();
  const { setLoading } = useLoadingActions();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = useCallback(async (params?: any) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Loading expenses...');
    try {
      const response = await expenseApi.list(params);
      setExpenses(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch expenses');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setExpenses, setLoading]);

  const getExpense = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await expenseApi.get(id);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch expense');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createExpense = useCallback(async (data: ExpenseCreate) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Creating expense...');
    try {
      const response = await expenseApi.create(data);
      const newExpense = response.data;
      addExpense(newExpense);
      return newExpense;
    } catch (err: any) {
      setError(err.message || 'Failed to create expense');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [addExpense, setLoading]);

  const updateExpense = useCallback(async (id: string, data: Partial<ExpenseUpdate>) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Updating expense...');
    try {
      const response = await expenseApi.update(id, data);
      const updatedExpense = response.data;
      updateExpenseAction(updatedExpense);
      return updatedExpense;
    } catch (err: any) {
      setError(err.message || 'Failed to update expense');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [updateExpenseAction, setLoading]);

  const deleteExpense = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Deleting expense...');
    try {
      await expenseApi.delete(id);
      deleteExpenseAction(id);
    } catch (err: any) {
      setError(err.message || 'Failed to delete expense');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [deleteExpenseAction, setLoading]);

  return {
    expenses,
    totalExpenses,
    isLoading,
    error,
    fetchExpenses,
    getExpense,
    createExpense,
    updateExpense,
    deleteExpense,
  };
};

export default useExpenseHook;
