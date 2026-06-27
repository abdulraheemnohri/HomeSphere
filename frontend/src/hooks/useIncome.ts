/**
 * Income Hook
 * Handles income data fetching and state management
 */

import { useState, useCallback } from 'react';
import { incomeApi } from '@/services/api';
import {
  useFinance,
  useFinanceActions,
  useLoadingActions
} from '@/store';
import { Income, IncomeCreate, Income as IncomeUpdate } from '@/types';

interface IncomeHook {
  incomes: Income[];
  totalIncome: number;
  isLoading: boolean;
  error: string | null;
  fetchIncomes: (params?: any) => Promise<void>;
  getIncome: (id: string) => Promise<Income | null>;
  createIncome: (data: IncomeCreate) => Promise<Income>;
  updateIncome: (id: string, data: Partial<IncomeUpdate>) => Promise<Income | null>;
  deleteIncome: (id: string) => Promise<void>;
}

export const useIncomeHook = (): IncomeHook => {
  const { incomes, totalIncome } = useFinance();
  const {
    setIncomes,
    addIncome,
    updateIncome: updateIncomeAction,
    deleteIncome: deleteIncomeAction
  } = useFinanceActions();
  const { setLoading } = useLoadingActions();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchIncomes = useCallback(async (params?: any) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Loading incomes...');
    try {
      const response = await incomeApi.list(params);
      setIncomes(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch incomes');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setIncomes, setLoading]);

  const getIncome = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await incomeApi.get(id);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch income');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createIncome = useCallback(async (data: IncomeCreate) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Creating income...');
    try {
      const response = await incomeApi.create(data);
      const newIncome = response.data;
      addIncome(newIncome);
      return newIncome;
    } catch (err: any) {
      setError(err.message || 'Failed to create income');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [addIncome, setLoading]);

  const updateIncome = useCallback(async (id: string, data: Partial<IncomeUpdate>) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Updating income...');
    try {
      const response = await incomeApi.update(id, data);
      const updatedIncome = response.data;
      updateIncomeAction(updatedIncome);
      return updatedIncome;
    } catch (err: any) {
      setError(err.message || 'Failed to update income');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [updateIncomeAction, setLoading]);

  const deleteIncome = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Deleting income...');
    try {
      await incomeApi.delete(id);
      deleteIncomeAction(id);
    } catch (err: any) {
      setError(err.message || 'Failed to delete income');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [deleteIncomeAction, setLoading]);

  return {
    incomes,
    totalIncome,
    isLoading,
    error,
    fetchIncomes,
    getIncome,
    createIncome,
    updateIncome,
    deleteIncome,
  };
};

export default useIncomeHook;
