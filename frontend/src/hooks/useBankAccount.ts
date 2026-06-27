/**
 * Bank Account Hook
 * Handles bank account data fetching and state management
 */

import { useState, useCallback } from 'react';
import { bankApi } from '@/services/api';
import { useLoadingActions } from '@/store';
import { BankAccount, BankAccountCreate, BankAccount as BankAccountUpdate } from '@/types';

interface BankAccountHook {
  isLoading: boolean;
  error: string | null;
  fetchBankAccounts: (params?: any) => Promise<BankAccount[]>;
  getBankAccount: (id: string) => Promise<BankAccount | null>;
  createBankAccount: (data: BankAccountCreate) => Promise<BankAccount>;
  updateBankAccount: (id: string, data: Partial<BankAccountUpdate>) => Promise<BankAccount | null>;
  deleteBankAccount: (id: string) => Promise<void>;
}

export const useBankAccountHook = (): BankAccountHook => {
  const { setLoading } = useLoadingActions();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBankAccounts = useCallback(async (params?: any) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Loading bank accounts...');
    try {
      const response = await bankApi.list(params);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch bank accounts');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const getBankAccount = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await bankApi.get(id);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch bank account');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createBankAccount = useCallback(async (data: BankAccountCreate) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Creating bank account...');
    try {
      const response = await bankApi.create(data);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to create bank account');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const updateBankAccount = useCallback(async (id: string, data: Partial<BankAccountUpdate>) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Updating bank account...');
    try {
      const response = await bankApi.update(id, data);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to update bank account');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const deleteBankAccount = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Deleting bank account...');
    try {
      await bankApi.delete(id);
    } catch (err: any) {
      setError(err.message || 'Failed to delete bank account');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  return {
    isLoading,
    error,
    fetchBankAccounts,
    getBankAccount,
    createBankAccount,
    updateBankAccount,
    deleteBankAccount,
  };
};

export default useBankAccountHook;
