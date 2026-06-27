/**
 * Family Hook
 * Handles family members data fetching and state management
 */

import { useState, useCallback } from 'react';
import { familyApi } from '@/services/api';
import {
  useFamily,
  useFamilyActions,
  useLoadingActions
} from '@/store';
import { FamilyMember, FamilyMemberCreate, FamilyMemberUpdate } from '@/types';

interface FamilyHook {
  familyMembers: FamilyMember[];
  currentFamilyMember: FamilyMember | null;
  totalFamilyMembers: number;
  isLoading: boolean;
  error: string | null;
  fetchFamilyMembers: (params?: any) => Promise<void>;
  getFamilyMember: (id: string) => Promise<FamilyMember | null>;
  createFamilyMember: (data: FamilyMemberCreate) => Promise<FamilyMember>;
  updateFamilyMember: (id: string, data: FamilyMemberUpdate) => Promise<FamilyMember | null>;
  deleteFamilyMember: (id: string) => Promise<void>;
  setCurrentFamilyMember: (member: FamilyMember | null) => void;
}

export const useFamilyHook = (): FamilyHook => {
  const { familyMembers, currentFamilyMember, totalFamilyMembers } = useFamily();
  const {
    setFamilyMembers,
    setCurrentFamilyMember,
    addFamilyMember,
    updateFamilyMember: updateFamilyMemberAction,
    deleteFamilyMember: deleteFamilyMemberAction
  } = useFamilyActions();
  const { setLoading } = useLoadingActions();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFamilyMembers = useCallback(async (params?: any) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Loading family members...');
    try {
      const response = await familyApi.list(params);
      setFamilyMembers(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch family members');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setFamilyMembers, setLoading]);

  const getFamilyMember = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await familyApi.get(id);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch family member');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createFamilyMember = useCallback(async (data: FamilyMemberCreate) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Creating family member...');
    try {
      const response = await familyApi.create(data);
      const newMember = response.data;
      addFamilyMember(newMember);
      return newMember;
    } catch (err: any) {
      setError(err.message || 'Failed to create family member');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [addFamilyMember, setLoading]);

  const updateFamilyMember = useCallback(async (id: string, data: FamilyMemberUpdate) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Updating family member...');
    try {
      const response = await familyApi.update(id, data);
      const updatedMember = response.data;
      updateFamilyMemberAction(updatedMember);
      return updatedMember;
    } catch (err: any) {
      setError(err.message || 'Failed to update family member');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [updateFamilyMemberAction, setLoading]);

  const deleteFamilyMember = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Deleting family member...');
    try {
      await familyApi.delete(id);
      deleteFamilyMemberAction(id);
    } catch (err: any) {
      setError(err.message || 'Failed to delete family member');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [deleteFamilyMemberAction, setLoading]);

  return {
    familyMembers,
    currentFamilyMember,
    totalFamilyMembers,
    isLoading,
    error,
    fetchFamilyMembers,
    getFamilyMember,
    createFamilyMember,
    updateFamilyMember,
    deleteFamilyMember,
    setCurrentFamilyMember,
  };
};

export default useFamilyHook;
