/**
 * HomeSphere API Service Layer
 * Centralized API service for all backend communication
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      return Promise.reject({ message: data?.detail || 'Error', status, data });
    }
    return Promise.reject({ message: 'Network error', status: null, data: null });
  }
);

// ============ AUTH ============
export const authApi = {
  register: (data: any) => api.post('/api/auth/register', data),
  login: (data: any) => api.post('/api/auth/token', data),
  loginPin: (data: any) => api.post('/api/auth/pin-login', data),
  me: () => api.get('/api/auth/me'),
};

// ============ FAMILY ============
export const familyApi = {
  list: (params?: any) => api.get('/api/family-members/', { params }),
  get: (id: string) => api.get(`/api/family-members/${id}`),
  create: (data: any) => api.post('/api/family-members/', data),
  update: (id: string, data: any) => api.put(`/api/family-members/${id}`, data),
  delete: (id: string) => api.delete(`/api/family-members/${id}`),
};

// ============ FINANCE ============
export const incomeApi = {
  list: (params?: any) => api.get('/api/incomes/', { params }),
  get: (id: string) => api.get(`/api/incomes/${id}`),
  create: (data: any) => api.post('/api/incomes/', data),
  update: (id: string, data: any) => api.put(`/api/incomes/${id}`, data),
  delete: (id: string) => api.delete(`/api/incomes/${id}`),
};

export const expenseApi = {
  list: (params?: any) => api.get('/api/expenses/', { params }),
  get: (id: string) => api.get(`/api/expenses/${id}`),
  create: (data: any) => api.post('/api/expenses/', data),
  update: (id: string, data: any) => api.put(`/api/expenses/${id}`, data),
  delete: (id: string) => api.delete(`/api/expenses/${id}`),
};

export const budgetApi = {
  list: (params?: any) => api.get('/api/budgets/', { params }),
  get: (id: string) => api.get(`/api/budgets/${id}`),
  create: (data: any) => api.post('/api/budgets/', data),
  update: (id: string, data: any) => api.put(`/api/budgets/${id}`, data),
  delete: (id: string) => api.delete(`/api/budgets/${id}`),
};

export const billApi = {
  list: (params?: any) => api.get('/api/bills/', { params }),
  get: (id: string) => api.get(`/api/bills/${id}`),
  create: (data: any) => api.post('/api/bills/', data),
  update: (id: string, data: any) => api.put(`/api/bills/${id}`, data),
  delete: (id: string) => api.delete(`/api/bills/${id}`),
};

export const loanApi = {
  list: (params?: any) => api.get('/api/loans/', { params }),
  get: (id: string) => api.get(`/api/loans/${id}`),
  create: (data: any) => api.post('/api/loans/', data),
  update: (id: string, data: any) => api.put(`/api/loans/${id}`, data),
  delete: (id: string) => api.delete(`/api/loans/${id}`),
};

// ============ PROPERTIES ============
export const propertyApi = {
  list: (params?: any) => api.get('/api/properties/', { params }),
  get: (id: string) => api.get(`/api/properties/${id}`),
  create: (data: any) => api.post('/api/properties/', data),
  update: (id: string, data: any) => api.put(`/api/properties/${id}`, data),
  delete: (id: string) => api.delete(`/api/properties/${id}`),
};

export const vehicleApi = {
  list: (params?: any) => api.get('/api/vehicles/', { params }),
  get: (id: string) => api.get(`/api/vehicles/${id}`),
  create: (data: any) => api.post('/api/vehicles/', data),
  update: (id: string, data: any) => api.put(`/api/vehicles/${id}`, data),
  delete: (id: string) => api.delete(`/api/vehicles/${id}`),
};

export const animalApi = {
  list: (params?: any) => api.get('/api/animals/', { params }),
  get: (id: string) => api.get(`/api/animals/${id}`),
  create: (data: any) => api.post('/api/animals/', data),
  update: (id: string, data: any) => api.put(`/api/animals/${id}`, data),
  delete: (id: string) => api.delete(`/api/animals/${id}`),
};

// ============ HEALTH ============
export const healthApi = {
  list: (params?: any) => api.get('/api/health-records/', { params }),
  get: (id: string) => api.get(`/api/health-records/${id}`),
  create: (data: any) => api.post('/api/health-records/', data),
  update: (id: string, data: any) => api.put(`/api/health-records/${id}`, data),
  delete: (id: string) => api.delete(`/api/health-records/${id}`),
};

// ============ DOCUMENTS ============
export const documentApi = {
  list: (params?: any) => api.get('/api/documents/', { params }),
  get: (id: string) => api.get(`/api/documents/${id}`),
  create: (data: any) => api.post('/api/documents/', data),
  update: (id: string, data: any) => api.put(`/api/documents/${id}`, data),
  delete: (id: string) => api.delete(`/api/documents/${id}`),
};

// ============ EMERGENCY ============
export const emergencyApi = {
  list: (params?: any) => api.get('/api/emergency-contacts/', { params }),
  get: (id: string) => api.get(`/api/emergency-contacts/${id}`),
  create: (data: any) => api.post('/api/emergency-contacts/', data),
  update: (id: string, data: any) => api.put(`/api/emergency-contacts/${id}`, data),
  delete: (id: string) => api.delete(`/api/emergency-contacts/${id}`),
};

// ============ SHOPPING ============
export const shoppingApi = {
  list: (params?: any) => api.get('/api/shopping-lists/', { params }),
  get: (id: string) => api.get(`/api/shopping-lists/${id}`),
  create: (data: any) => api.post('/api/shopping-lists/', data),
  update: (id: string, data: any) => api.put(`/api/shopping-lists/${id}`, data),
  delete: (id: string) => api.delete(`/api/shopping-lists/${id}`),
};

// ============ TASKS ============
export const taskApi = {
  list: (params?: any) => api.get('/api/tasks/', { params }),
  get: (id: string) => api.get(`/api/tasks/${id}`),
  create: (data: any) => api.post('/api/tasks/', data),
  update: (id: string, data: any) => api.put(`/api/tasks/${id}`, data),
  delete: (id: string) => api.delete(`/api/tasks/${id}`),
};

// ============ FARM ============
export const farmApi = {
  list: (params?: any) => api.get('/api/farm-activities/', { params }),
  get: (id: string) => api.get(`/api/farm-activities/${id}`),
  create: (data: any) => api.post('/api/farm-activities/', data),
  update: (id: string, data: any) => api.put(`/api/farm-activities/${id}`, data),
  delete: (id: string) => api.delete(`/api/farm-activities/${id}`),
};

// ============ ASSETS ============
export const assetApi = {
  list: (params?: any) => api.get('/api/assets/', { params }),
  get: (id: string) => api.get(`/api/assets/${id}`),
  create: (data: any) => api.post('/api/assets/', data),
  update: (id: string, data: any) => api.put(`/api/assets/${id}`, data),
  delete: (id: string) => api.delete(`/api/assets/${id}`),
};

// ============ BANK ACCOUNTS ============
export const bankApi = {
  list: (params?: any) => api.get('/api/bank-accounts/', { params }),
  get: (id: string) => api.get(`/api/bank-accounts/${id}`),
  create: (data: any) => api.post('/api/bank-accounts/', data),
  update: (id: string, data: any) => api.put(`/api/bank-accounts/${id}`, data),
  delete: (id: string) => api.delete(`/api/bank-accounts/${id}`),
};

// ============ CALENDAR ============
export const calendarApi = {
  list: (params?: any) => api.get('/api/calendar-events/', { params }),
  get: (id: string) => api.get(`/api/calendar-events/${id}`),
  create: (data: any) => api.post('/api/calendar-events/', data),
  update: (id: string, data: any) => api.put(`/api/calendar-events/${id}`, data),
  delete: (id: string) => api.delete(`/api/calendar-events/${id}`),
};

// ============ DASHBOARD ============
export const dashboardApi = {
  stats: () => api.get('/api/dashboard/stats'),
};

// ============ HEALTH CHECK ============
export const healthApi = {
  check: () => api.get('/api/health'),
};

// ============ EXPORTS ============
export {
  api,
  authApi,
  familyApi,
  incomeApi,
  expenseApi,
  budgetApi,
  billApi,
  loanApi,
  propertyApi,
  vehicleApi,
  animalApi,
  healthApi,
  documentApi,
  emergencyApi,
  shoppingApi,
  taskApi,
  farmApi,
  assetApi,
  bankApi,
  calendarApi,
  dashboardApi,
};

export default {
  api,
  authApi,
  familyApi,
  incomeApi,
  expenseApi,
  budgetApi,
  billApi,
  loanApi,
  propertyApi,
  vehicleApi,
  animalApi,
  healthApi,
  documentApi,
  emergencyApi,
  shoppingApi,
  taskApi,
  farmApi,
  assetApi,
  bankApi,
  calendarApi,
  dashboardApi,
};
