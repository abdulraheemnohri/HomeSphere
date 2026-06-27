/**
 * Budget Hook
 * Handles budget data fetching and state management
 */

import { useState, useCallback } from 'react';
import { budgetApi } from '@/services/api';
import {
  useFinance,
  useFinanceActions,
  useLoadingActions
} from '@/store';
import { Budget, BudgetCreate, Budget as BudgetUpdate } from '@/types';

interface BudgetHook {
  budgets: Budget[];
  isLoading: boolean;
  error: string | null;
  fetchBudgets: (params?: any) => Promise<void>;
  getBudget: (id: string) => Promise<Budget | null>;
  createBudget: (data: BudgetCreate) => Promise<Budget>;
  updateBudget: (id: string, data: Partial<BudgetUpdate>) => Promise<Budget | null>;
  deleteBudget: (id: string) => Promise<void>;
}

export const useBudgetHook = (): BudgetHook => {
  const { budgets } = useFinance();
  const {
    setBudgets,
    addBudget,
    updateBudget: updateBudgetAction,
    deleteBudget: deleteBudgetAction
  } = useFinanceActions();
  const { setLoading } = useLoadingActions();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBudgets = useCallback(async (params?: any) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Loading budgets...');
    try {
      const response = await budgetApi.list(params);
      setBudgets(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch budgets');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setBudgets, setLoading]);

  const getBudget = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await budgetApi.get(id);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch budget');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createBudget = useCallback(async (data: BudgetCreate) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Creating budget...');
    try {
      const response = await budgetApi.create(data);
      const newBudget = response.data;
      addBudget(newBudget);
      return newBudget;
    } catch (err: any) {
      setError(err.message || 'Failed to create budget');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [addBudget, setLoading]);

  const updateBudget = useCallback(async (id: string, data: Partial<BudgetUpdate>) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Updating budget...');
    try {
      const response = await budgetApi.update(id, data);
      const updatedBudget = response.data;
      updateBudgetAction(updatedBudget);
      return updatedBudget;
    } catch (err: any) {
      setError(err.message || 'Failed to update budget');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [updateBudgetAction, setLoading]);

  const deleteBudget = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Deleting budget...');
    try {
      await budgetApi.delete(id);
      deleteBudgetAction(id);
    } catch (err: any) {
      setError(err.message || 'Failed to delete budget');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [deleteBudgetAction, setLoading]);

  return {
    budgets,
    isLoading,
    error,
    fetchBudgets,
    getBudget,
    createBudget,
    updateBudget,
    deleteBudget,
  };
};

export default useBudgetHook;
