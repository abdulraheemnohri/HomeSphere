/**
 * Animal Hook
 * Handles animal data fetching and state management
 */

import { useState, useCallback } from 'react';
import { animalApi } from '@/services/api';
import { useLoadingActions } from '@/store';
import { Animal, AnimalCreate, Animal as AnimalUpdate } from '@/types';

interface AnimalHook {
  isLoading: boolean;
  error: string | null;
  fetchAnimals: (params?: any) => Promise<Animal[]>;
  getAnimal: (id: string) => Promise<Animal | null>;
  createAnimal: (data: AnimalCreate) => Promise<Animal>;
  updateAnimal: (id: string, data: Partial<AnimalUpdate>) => Promise<Animal | null>;
  deleteAnimal: (id: string) => Promise<void>;
}

export const useAnimalHook = (): AnimalHook => {
  const { setLoading } = useLoadingActions();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnimals = useCallback(async (params?: any) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Loading animals...');
    try {
      const response = await animalApi.list(params);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch animals');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const getAnimal = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await animalApi.get(id);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch animal');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createAnimal = useCallback(async (data: AnimalCreate) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Creating animal...');
    try {
      const response = await animalApi.create(data);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to create animal');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const updateAnimal = useCallback(async (id: string, data: Partial<AnimalUpdate>) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Updating animal...');
    try {
      const response = await animalApi.update(id, data);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to update animal');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const deleteAnimal = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Deleting animal...');
    try {
      await animalApi.delete(id);
    } catch (err: any) {
      setError(err.message || 'Failed to delete animal');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  return {
    isLoading,
    error,
    fetchAnimals,
    getAnimal,
    createAnimal,
    updateAnimal,
    deleteAnimal,
  };
};

export default useAnimalHook;
