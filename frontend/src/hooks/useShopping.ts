/**
 * Shopping Hook
 * Handles shopping lists data fetching and state management
 */

import { useState, useCallback } from 'react';
import { shoppingApi } from '@/services/api';
import { useLoadingActions } from '@/store';
import { ShoppingList, ShoppingListCreate, ShoppingList as ShoppingListUpdate } from '@/types';

interface ShoppingHook {
  isLoading: boolean;
  error: string | null;
  fetchShoppingLists: (params?: any) => Promise<ShoppingList[]>;
  getShoppingList: (id: string) => Promise<ShoppingList | null>;
  createShoppingList: (data: ShoppingListCreate) => Promise<ShoppingList>;
  updateShoppingList: (id: string, data: Partial<ShoppingListUpdate>) => Promise<ShoppingList | null>;
  deleteShoppingList: (id: string) => Promise<void>;
}

export const useShoppingHook = (): ShoppingHook => {
  const { setLoading } = useLoadingActions();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchShoppingLists = useCallback(async (params?: any) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Loading shopping lists...');
    try {
      const response = await shoppingApi.list(params);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch shopping lists');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const getShoppingList = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await shoppingApi.get(id);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch shopping list');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createShoppingList = useCallback(async (data: ShoppingListCreate) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Creating shopping list...');
    try {
      const response = await shoppingApi.create(data);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to create shopping list');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const updateShoppingList = useCallback(async (id: string, data: Partial<ShoppingListUpdate>) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Updating shopping list...');
    try {
      const response = await shoppingApi.update(id, data);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to update shopping list');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const deleteShoppingList = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Deleting shopping list...');
    try {
      await shoppingApi.delete(id);
    } catch (err: any) {
      setError(err.message || 'Failed to delete shopping list');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  return {
    isLoading,
    error,
    fetchShoppingLists,
    getShoppingList,
    createShoppingList,
    updateShoppingList,
    deleteShoppingList,
  };
};

export default useShoppingHook;
