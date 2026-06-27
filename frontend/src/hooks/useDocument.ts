/**
 * Document Hook
 * Handles document data fetching and state management
 */

import { useState, useCallback } from 'react';
import { documentApi } from '@/services/api';
import { useLoadingActions } from '@/store';
import { Document, DocumentCreate, Document as DocumentUpdate } from '@/types';

interface DocumentHook {
  isLoading: boolean;
  error: string | null;
  fetchDocuments: (params?: any) => Promise<Document[]>;
  getDocument: (id: string) => Promise<Document | null>;
  createDocument: (data: DocumentCreate) => Promise<Document>;
  updateDocument: (id: string, data: Partial<DocumentUpdate>) => Promise<Document | null>;
  deleteDocument: (id: string) => Promise<void>;
}

export const useDocumentHook = (): DocumentHook => {
  const { setLoading } = useLoadingActions();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = useCallback(async (params?: any) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Loading documents...');
    try {
      const response = await documentApi.list(params);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch documents');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const getDocument = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await documentApi.get(id);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch document');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createDocument = useCallback(async (data: DocumentCreate) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Creating document...');
    try {
      const response = await documentApi.create(data);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to create document');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const updateDocument = useCallback(async (id: string, data: Partial<DocumentUpdate>) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Updating document...');
    try {
      const response = await documentApi.update(id, data);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to update document');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const deleteDocument = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Deleting document...');
    try {
      await documentApi.delete(id);
    } catch (err: any) {
      setError(err.message || 'Failed to delete document');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  return {
    isLoading,
    error,
    fetchDocuments,
    getDocument,
    createDocument,
    updateDocument,
    deleteDocument,
  };
};

export default useDocumentHook;
