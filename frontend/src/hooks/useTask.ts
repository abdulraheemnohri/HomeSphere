/**
 * Task Hook
 * Handles task data fetching and state management
 */

import { useState, useCallback } from 'react';
import { taskApi } from '@/services/api';
import { useLoadingActions } from '@/store';
import { Task, TaskCreate, Task as TaskUpdate } from '@/types';

interface TaskHook {
  isLoading: boolean;
  error: string | null;
  fetchTasks: (params?: any) => Promise<Task[]>;
  getTask: (id: string) => Promise<Task | null>;
  createTask: (data: TaskCreate) => Promise<Task>;
  updateTask: (id: string, data: Partial<TaskUpdate>) => Promise<Task | null>;
  deleteTask: (id: string) => Promise<void>;
}

export const useTaskHook = (): TaskHook => {
  const { setLoading } = useLoadingActions();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async (params?: any) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Loading tasks...');
    try {
      const response = await taskApi.list(params);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tasks');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const getTask = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await taskApi.get(id);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch task');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTask = useCallback(async (data: TaskCreate) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Creating task...');
    try {
      const response = await taskApi.create(data);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to create task');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const updateTask = useCallback(async (id: string, data: Partial<TaskUpdate>) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Updating task...');
    try {
      const response = await taskApi.update(id, data);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const deleteTask = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Deleting task...');
    try {
      await taskApi.delete(id);
    } catch (err: any) {
      setError(err.message || 'Failed to delete task');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  return {
    isLoading,
    error,
    fetchTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
  };
};

export default useTaskHook;
