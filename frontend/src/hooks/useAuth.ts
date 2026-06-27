/**
 * Authentication Hook
 * Handles user authentication state and actions
 */

import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@/services/api';
import {
  useAuth,
  useAuthActions,
  useLoadingActions
} from '@/store';
import {
  UserResponse,
  UserCreate,
  TokenResponse
} from '@/types';

interface AuthHook {
  user: UserResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  loginWithPin: (username: string, pin: string) => Promise<void>;
  register: (userData: UserCreate) => Promise<UserResponse>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthHook = (): AuthHook => {
  const { user, isAuthenticated, isLoading: authLoading, error } = useAuth();
  const { loginSuccess, loginFailure, logout: storeLogout, setUser } = useAuthActions();
  const { setLoading } = useLoadingActions();
  const navigate = useNavigate();
  const [loading, setLocalLoading] = useState(false);

  const login = useCallback(async (username: string, password: string) => {
    setLocalLoading(true);
    setLoading(true, 'Logging in...');
    try {
      const response: TokenResponse = await authApi.login({ username, password });
      const userResponse: UserResponse = await authApi.me();
      loginSuccess(userResponse, response.access_token);
      localStorage.setItem('access_token', response.access_token);
      navigate('/dashboard');
    } catch (err: any) {
      loginFailure(err.message || 'Login failed');
      throw err;
    } finally {
      setLocalLoading(false);
      setLoading(false);
    }
  }, [loginSuccess, loginFailure, setLoading, navigate]);

  const loginWithPin = useCallback(async (username: string, pin: string) => {
    setLocalLoading(true);
    setLoading(true, 'Logging in with PIN...');
    try {
      const response: TokenResponse = await authApi.loginPin({ username, pin });
      const userResponse: UserResponse = await authApi.me();
      loginSuccess(userResponse, response.access_token);
      localStorage.setItem('access_token', response.access_token);
      navigate('/dashboard');
    } catch (err: any) {
      loginFailure(err.message || 'PIN login failed');
      throw err;
    } finally {
      setLocalLoading(false);
      setLoading(false);
    }
  }, [loginSuccess, loginFailure, setLoading, navigate]);

  const register = useCallback(async (userData: UserCreate) => {
    setLocalLoading(true);
    setLoading(true, 'Registering...');
    try {
      const userResponse: UserResponse = await authApi.register(userData);
      setUser(userResponse);
      navigate('/login');
      return userResponse;
    } catch (err: any) {
      throw err;
    } finally {
      setLocalLoading(false);
      setLoading(false);
    }
  }, [setUser, setLoading, navigate]);

  const logout = useCallback(() => {
    storeLogout();
    localStorage.removeItem('access_token');
    navigate('/login');
  }, [storeLogout, navigate]);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('access_token');
    if (token && !user) {
      try {
        const userResponse: UserResponse = await authApi.me();
        loginSuccess(userResponse, token);
      } catch (err) {
        logout();
      }
    }
  }, [user, loginSuccess, logout]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    user,
    isAuthenticated,
    isLoading: authLoading || loading,
    error,
    login,
    loginWithPin,
    register,
    logout,
    checkAuth,
  };
};

export default useAuthHook;
