/**
 * Property Hook
 * Handles property data fetching and state management
 */

import { useState, useCallback } from 'react';
import { propertyApi } from '@/services/api';
import {
  useProperties,
  usePropertiesActions,
  useLoadingActions
} from '@/store';
import { Property, PropertyCreate, Property as PropertyUpdate } from '@/types';

interface PropertyHook {
  properties: Property[];
  isLoading: boolean;
  error: string | null;
  fetchProperties: (params?: any) => Promise<void>;
  getProperty: (id: string) => Promise<Property | null>;
  createProperty: (data: PropertyCreate) => Promise<Property>;
  updateProperty: (id: string, data: Partial<PropertyUpdate>) => Promise<Property | null>;
  deleteProperty: (id: string) => Promise<void>;
}

export const usePropertyHook = (): PropertyHook => {
  const { properties } = useProperties();
  const {
    setProperties,
    addProperty,
    updateProperty: updatePropertyAction,
    deleteProperty: deletePropertyAction
  } = usePropertiesActions();
  const { setLoading } = useLoadingActions();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = useCallback(async (params?: any) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Loading properties...');
    try {
      const response = await propertyApi.list(params);
      setProperties(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch properties');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setProperties, setLoading]);

  const getProperty = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await propertyApi.get(id);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch property');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createProperty = useCallback(async (data: PropertyCreate) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Creating property...');
    try {
      const response = await propertyApi.create(data);
      const newProperty = response.data;
      addProperty(newProperty);
      return newProperty;
    } catch (err: any) {
      setError(err.message || 'Failed to create property');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [addProperty, setLoading]);

  const updateProperty = useCallback(async (id: string, data: Partial<PropertyUpdate>) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Updating property...');
    try {
      const response = await propertyApi.update(id, data);
      const updatedProperty = response.data;
      updatePropertyAction(updatedProperty);
      return updatedProperty;
    } catch (err: any) {
      setError(err.message || 'Failed to update property');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [updatePropertyAction, setLoading]);

  const deleteProperty = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Deleting property...');
    try {
      await propertyApi.delete(id);
      deletePropertyAction(id);
    } catch (err: any) {
      setError(err.message || 'Failed to delete property');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [deletePropertyAction, setLoading]);

  return {
    properties,
    isLoading,
    error,
    fetchProperties,
    getProperty,
    createProperty,
    updateProperty,
    deleteProperty,
  };
};

// Action hooks for properties
export const usePropertiesActions = () => useAppStore((state) => ({
  setProperties: state.setProperties,
  addProperty: state.addProperty,
  updateProperty: state.updateProperty,
  deleteProperty: state.deleteProperty,
}));

export default usePropertyHook;
