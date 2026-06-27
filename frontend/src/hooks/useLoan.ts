/**
 * Loan Hook
 * Handles loan data fetching and state management
 */

import { useState, useCallback } from 'react';
import { loanApi } from '@/services/api';
import {
  useFinance,
  useFinanceActions,
  useLoadingActions
} from '@/store';
import { Loan, LoanCreate, Loan as LoanUpdate } from '@/types';

interface LoanHook {
  loans: Loan[];
  isLoading: boolean;
  error: string | null;
  fetchLoans: (params?: any) => Promise<void>;
  getLoan: (id: string) => Promise<Loan | null>;
  createLoan: (data: LoanCreate) => Promise<Loan>;
  updateLoan: (id: string, data: Partial<LoanUpdate>) => Promise<Loan | null>;
  deleteLoan: (id: string) => Promise<void>;
}

export const useLoanHook = (): LoanHook => {
  const { loans } = useFinance();
  const {
    setLoans,
    addLoan,
    updateLoan: updateLoanAction,
    deleteLoan: deleteLoanAction
  } = useFinanceActions();
  const { setLoading } = useLoadingActions();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLoans = useCallback(async (params?: any) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Loading loans...');
    try {
      const response = await loanApi.list(params);
      setLoans(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch loans');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoans, setLoading]);

  const getLoan = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await loanApi.get(id);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch loan');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createLoan = useCallback(async (data: LoanCreate) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Creating loan...');
    try {
      const response = await loanApi.create(data);
      const newLoan = response.data;
      addLoan(newLoan);
      return newLoan;
    } catch (err: any) {
      setError(err.message || 'Failed to create loan');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [addLoan, setLoading]);

  const updateLoan = useCallback(async (id: string, data: Partial<LoanUpdate>) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Updating loan...');
    try {
      const response = await loanApi.update(id, data);
      const updatedLoan = response.data;
      updateLoanAction(updatedLoan);
      return updatedLoan;
    } catch (err: any) {
      setError(err.message || 'Failed to update loan');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [updateLoanAction, setLoading]);

  const deleteLoan = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Deleting loan...');
    try {
      await loanApi.delete(id);
      deleteLoanAction(id);
    } catch (err: any) {
      setError(err.message || 'Failed to delete loan');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [deleteLoanAction, setLoading]);

  return {
    loans,
    isLoading,
    error,
    fetchLoans,
    getLoan,
    createLoan,
    updateLoan,
    deleteLoan,
  };
};

export default useLoanHook;
