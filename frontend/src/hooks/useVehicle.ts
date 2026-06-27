/**
 * Vehicle Hook
 * Handles vehicle data fetching and state management
 */

import { useState, useCallback } from 'react';
import { vehicleApi } from '@/services/api';
import { useLoadingActions } from '@/store';
import { Vehicle, VehicleCreate, Vehicle as VehicleUpdate } from '@/types';

interface VehicleHook {
  isLoading: boolean;
  error: string | null;
  fetchVehicles: (params?: any) => Promise<Vehicle[]>;
  getVehicle: (id: string) => Promise<Vehicle | null>;
  createVehicle: (data: VehicleCreate) => Promise<Vehicle>;
  updateVehicle: (id: string, data: Partial<VehicleUpdate>) => Promise<Vehicle | null>;
  deleteVehicle: (id: string) => Promise<void>;
}

export const useVehicleHook = (): VehicleHook => {
  const { setLoading } = useLoadingActions();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVehicles = useCallback(async (params?: any) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Loading vehicles...');
    try {
      const response = await vehicleApi.list(params);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch vehicles');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const getVehicle = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await vehicleApi.get(id);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch vehicle');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createVehicle = useCallback(async (data: VehicleCreate) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Creating vehicle...');
    try {
      const response = await vehicleApi.create(data);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to create vehicle');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const updateVehicle = useCallback(async (id: string, data: Partial<VehicleUpdate>) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Updating vehicle...');
    try {
      const response = await vehicleApi.update(id, data);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to update vehicle');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const deleteVehicle = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Deleting vehicle...');
    try {
      await vehicleApi.delete(id);
    } catch (err: any) {
      setError(err.message || 'Failed to delete vehicle');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  return {
    isLoading,
    error,
    fetchVehicles,
    getVehicle,
    createVehicle,
    updateVehicle,
    deleteVehicle,
  };
};

export default useVehicleHook;
