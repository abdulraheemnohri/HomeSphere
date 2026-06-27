/**
 * Health Hook
 * Handles health records data fetching and state management
 */

import { useState, useCallback } from 'react';
import { healthApi } from '@/services/api';
import { useLoadingActions } from '@/store';
import { HealthRecord, HealthRecordCreate, HealthRecord as HealthRecordUpdate } from '@/types';

interface HealthHook {
  isLoading: boolean;
  error: string | null;
  fetchHealthRecords: (params?: any) => Promise<HealthRecord[]>;
  getHealthRecord: (id: string) => Promise<HealthRecord | null>;
  createHealthRecord: (data: HealthRecordCreate) => Promise<HealthRecord>;
  updateHealthRecord: (id: string, data: Partial<HealthRecordUpdate>) => Promise<HealthRecord | null>;
  deleteHealthRecord: (id: string) => Promise<void>;
}

export const useHealthHook = (): HealthHook => {
  const { setLoading } = useLoadingActions();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHealthRecords = useCallback(async (params?: any) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Loading health records...');
    try {
      const response = await healthApi.list(params);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch health records');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const getHealthRecord = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await healthApi.get(id);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch health record');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createHealthRecord = useCallback(async (data: HealthRecordCreate) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Creating health record...');
    try {
      const response = await healthApi.create(data);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to create health record');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const updateHealthRecord = useCallback(async (id: string, data: Partial<HealthRecordUpdate>) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Updating health record...');
    try {
      const response = await healthApi.update(id, data);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to update health record');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const deleteHealthRecord = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Deleting health record...');
    try {
      await healthApi.delete(id);
    } catch (err: any) {
      setError(err.message || 'Failed to delete health record');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  return {
    isLoading,
    error,
    fetchHealthRecords,
    getHealthRecord,
    createHealthRecord,
    updateHealthRecord,
    deleteHealthRecord,
  };
};

export default useHealthHook;
