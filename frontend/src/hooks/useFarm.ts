/**
 * Farm Hook
 * Handles farm activities data fetching and state management
 */

import { useState, useCallback } from 'react';
import { farmApi } from '@/services/api';
import { useLoadingActions } from '@/store';
import { FarmActivity, FarmActivityCreate, FarmActivity as FarmActivityUpdate } from '@/types';

interface FarmHook {
  isLoading: boolean;
  error: string | null;
  fetchFarmActivities: (params?: any) => Promise<FarmActivity[]>;
  getFarmActivity: (id: string) => Promise<FarmActivity | null>;
  createFarmActivity: (data: FarmActivityCreate) => Promise<FarmActivity>;
  updateFarmActivity: (id: string, data: Partial<FarmActivityUpdate>) => Promise<FarmActivity | null>;
  deleteFarmActivity: (id: string) => Promise<void>;
}

export const useFarmHook = (): FarmHook => {
  const { setLoading } = useLoadingActions();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFarmActivities = useCallback(async (params?: any) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Loading farm activities...');
    try {
      const response = await farmApi.list(params);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch farm activities');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const getFarmActivity = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await farmApi.get(id);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch farm activity');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createFarmActivity = useCallback(async (data: FarmActivityCreate) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Creating farm activity...');
    try {
      const response = await farmApi.create(data);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to create farm activity');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const updateFarmActivity = useCallback(async (id: string, data: Partial<FarmActivityUpdate>) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Updating farm activity...');
    try {
      const response = await farmApi.update(id, data);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to update farm activity');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const deleteFarmActivity = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Deleting farm activity...');
    try {
      await farmApi.delete(id);
    } catch (err: any) {
      setError(err.message || 'Failed to delete farm activity');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  return {
    isLoading,
    error,
    fetchFarmActivities,
    getFarmActivity,
    createFarmActivity,
    updateFarmActivity,
    deleteFarmActivity,
  };
};

export default useFarmHook;
