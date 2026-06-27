/**
 * Calendar Hook
 * Handles calendar events data fetching and state management
 */

import { useState, useCallback } from 'react';
import { calendarApi } from '@/services/api';
import { useLoadingActions } from '@/store';
import { CalendarEvent, CalendarEventCreate, CalendarEvent as CalendarEventUpdate } from '@/types';

interface CalendarHook {
  isLoading: boolean;
  error: string | null;
  fetchCalendarEvents: (params?: any) => Promise<CalendarEvent[]>;
  getCalendarEvent: (id: string) => Promise<CalendarEvent | null>;
  createCalendarEvent: (data: CalendarEventCreate) => Promise<CalendarEvent>;
  updateCalendarEvent: (id: string, data: Partial<CalendarEventUpdate>) => Promise<CalendarEvent | null>;
  deleteCalendarEvent: (id: string) => Promise<void>;
}

export const useCalendarHook = (): CalendarHook => {
  const { setLoading } = useLoadingActions();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCalendarEvents = useCallback(async (params?: any) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Loading calendar events...');
    try {
      const response = await calendarApi.list(params);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch calendar events');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const getCalendarEvent = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await calendarApi.get(id);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch calendar event');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createCalendarEvent = useCallback(async (data: CalendarEventCreate) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Creating calendar event...');
    try {
      const response = await calendarApi.create(data);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to create calendar event');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const updateCalendarEvent = useCallback(async (id: string, data: Partial<CalendarEventUpdate>) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Updating calendar event...');
    try {
      const response = await calendarApi.update(id, data);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to update calendar event');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const deleteCalendarEvent = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Deleting calendar event...');
    try {
      await calendarApi.delete(id);
    } catch (err: any) {
      setError(err.message || 'Failed to delete calendar event');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  return {
    isLoading,
    error,
    fetchCalendarEvents,
    getCalendarEvent,
    createCalendarEvent,
    updateCalendarEvent,
    deleteCalendarEvent,
  };
};

export default useCalendarHook;
