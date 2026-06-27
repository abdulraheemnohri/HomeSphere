/**
 * Asset Hook
 * Handles asset data fetching and state management
 */

import { useState, useCallback } from 'react';
import { assetApi } from '@/services/api';
import { useLoadingActions } from '@/store';
import { Asset, AssetCreate, Asset as AssetUpdate } from '@/types';

interface AssetHook {
  isLoading: boolean;
  error: string | null;
  fetchAssets: (params?: any) => Promise<Asset[]>;
  getAsset: (id: string) => Promise<Asset | null>;
  createAsset: (data: AssetCreate) => Promise<Asset>;
  updateAsset: (id: string, data: Partial<AssetUpdate>) => Promise<Asset | null>;
  deleteAsset: (id: string) => Promise<void>;
}

export const useAssetHook = (): AssetHook => {
  const { setLoading } = useLoadingActions();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAssets = useCallback(async (params?: any) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Loading assets...');
    try {
      const response = await assetApi.list(params);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch assets');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const getAsset = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await assetApi.get(id);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch asset');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createAsset = useCallback(async (data: AssetCreate) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Creating asset...');
    try {
      const response = await assetApi.create(data);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to create asset');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const updateAsset = useCallback(async (id: string, data: Partial<AssetUpdate>) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Updating asset...');
    try {
      const response = await assetApi.update(id, data);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to update asset');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const deleteAsset = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Deleting asset...');
    try {
      await assetApi.delete(id);
    } catch (err: any) {
      setError(err.message || 'Failed to delete asset');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  return {
    isLoading,
    error,
    fetchAssets,
    getAsset,
    createAsset,
    updateAsset,
    deleteAsset,
  };
};

export default useAssetHook;
