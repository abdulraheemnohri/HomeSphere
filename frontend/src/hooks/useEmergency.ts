/**
 * Emergency Hook
 * Handles emergency contacts data fetching and state management
 */

import { useState, useCallback } from 'react';
import { emergencyApi } from '@/services/api';
import { useLoadingActions } from '@/store';
import { EmergencyContact, EmergencyContactCreate, EmergencyContact as EmergencyContactUpdate } from '@/types';

interface EmergencyHook {
  isLoading: boolean;
  error: string | null;
  fetchEmergencyContacts: (params?: any) => Promise<EmergencyContact[]>;
  getEmergencyContact: (id: string) => Promise<EmergencyContact | null>;
  createEmergencyContact: (data: EmergencyContactCreate) => Promise<EmergencyContact>;
  updateEmergencyContact: (id: string, data: Partial<EmergencyContactUpdate>) => Promise<EmergencyContact | null>;
  deleteEmergencyContact: (id: string) => Promise<void>;
}

export const useEmergencyHook = (): EmergencyHook => {
  const { setLoading } = useLoadingActions();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmergencyContacts = useCallback(async (params?: any) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Loading emergency contacts...');
    try {
      const response = await emergencyApi.list(params);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch emergency contacts');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const getEmergencyContact = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await emergencyApi.get(id);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch emergency contact');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createEmergencyContact = useCallback(async (data: EmergencyContactCreate) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Creating emergency contact...');
    try {
      const response = await emergencyApi.create(data);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to create emergency contact');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const updateEmergencyContact = useCallback(async (id: string, data: Partial<EmergencyContactUpdate>) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Updating emergency contact...');
    try {
      const response = await emergencyApi.update(id, data);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to update emergency contact');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const deleteEmergencyContact = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Deleting emergency contact...');
    try {
      await emergencyApi.delete(id);
    } catch (err: any) {
      setError(err.message || 'Failed to delete emergency contact');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  return {
    isLoading,
    error,
    fetchEmergencyContacts,
    getEmergencyContact,
    createEmergencyContact,
    updateEmergencyContact,
    deleteEmergencyContact,
  };
};

export default useEmergencyHook;
