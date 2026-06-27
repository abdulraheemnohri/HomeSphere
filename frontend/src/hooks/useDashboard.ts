/**
 * Dashboard Hook
 * Handles dashboard data fetching and state management
 */

import { useState, useCallback } from 'react';
import { dashboardApi } from '@/services/api';
import { useLoadingActions } from '@/store';
import { DashboardStats } from '@/types';

interface DashboardHook {
  isLoading: boolean;
  error: string | null;
  stats: DashboardStats | null;
  fetchDashboardStats: () => Promise<DashboardStats | null>;
}

export const useDashboardHook = (): DashboardHook => {
  const { setLoading } = useLoadingActions();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  const fetchDashboardStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setLoading(true, 'Loading dashboard...');
    try {
      const response = await dashboardApi.stats();
      setStats(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch dashboard stats');
      throw err;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  return {
    isLoading,
    error,
    stats,
    fetchDashboardStats,
  };
};

export default useDashboardHook;
