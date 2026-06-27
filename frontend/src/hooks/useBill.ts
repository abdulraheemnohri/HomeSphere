/**
 * Bill Hook
 * Handles bill data fetching and state management
 */

import { useState, useCallback } from 'react';
import { billApi } from '@/services/api';
import {
  useFinance,
  useFinanceActions,
  useLoadingActions
} from '@/store';
import { Bill, BillCreate, Bill as BillUpdate } from '@/types';

interface BillHook {
  bills: Bill[];
  isLoading: boolean;
  error: string | null;
  fetchBills: (params?: any) => Promise<void>;
  getBill: (id: string) => Promise<Bill | null>;
  createBill: (data: BillCreate) => Promise<Bill>;
  updateBill: (id: string, data: Partial<BillUpdate>) => Promise<Bill | null>;
  deleteBill: (id: string) => Promise<void>;
}

export const useBillHook = (): BillHook => {
  const { bills } = useFinance();
  const {
    setBills,
    addBill,
    updateBill: updateBillAction,
    deleteBill: deleteBillAction
  } = useFinanceActions();
  const { setLoading } = useLoadingActions();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBills = useCallback(async (params?: any) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Loading bills...');
    try {
      const response = await billApi.list(params);
      setBills(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch bills');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setBills, setLoading]);

  const getBill = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await billApi.get(id);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch bill');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createBill = useCallback(async (data: BillCreate) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Creating bill...');
    try {
      const response = await billApi.create(data);
      const newBill = response.data;
      addBill(newBill);
      return newBill;
    } catch (err: any) {
      setError(err.message || 'Failed to create bill');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [addBill, setLoading]);

  const updateBill = useCallback(async (id: string, data: Partial<BillUpdate>) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Updating bill...');
    try {
      const response = await billApi.update(id, data);
      const updatedBill = response.data;
      updateBillAction(updatedBill);
      return updatedBill;
    } catch (err: any) {
      setError(err.message || 'Failed to update bill');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [updateBillAction, setLoading]);

  const deleteBill = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Deleting bill...');
    try {
      await billApi.delete(id);
      deleteBillAction(id);
    } catch (err: any) {
      setError(err.message || 'Failed to delete bill');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [deleteBillAction, setLoading]);

  return {
    bills,
    isLoading,
    error,
    fetchBills,
    getBill,
    createBill,
    updateBill,
    deleteBill,
  };
};

export default useBillHook;
