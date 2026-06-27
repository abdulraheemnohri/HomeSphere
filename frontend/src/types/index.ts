// User & Authentication Types
export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'owner' | 'admin' | 'family_member' | 'accountant' | 'farm_manager' | 'guest' | 'read_only';

// Family Types
export interface FamilyMember {
  id: string;
  userId?: string;
  firstName: string;
  lastName: string;
  photo?: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  phone?: string;
  email?: string;
  relationship: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Financial Types
export interface Income {
  id: string;
  userId: string;
  amount: number;
  date: string;
  category: string;
  paymentMethod: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Expense {
  id: string;
  userId: string;
  amount: number;
  date: string;
  category: string;
  paymentMethod: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Budget {
  id: string;
  userId: string;
  name: string;
  type: 'monthly' | 'weekly' | 'yearly';
  totalAmount: number;
  spentAmount: number;
  startDate: string;
  endDate: string;
  categories: BudgetCategory[];
  createdAt: string;
  updatedAt: string;
}

export interface BudgetCategory {
  name: string;
  allocated: number;
  spent: number;
  color: string;
}

// Property Types
export interface Property {
  id: string;
  userId: string;
  name: string;
  type: string;
  address: string;
  value: number;
  isActive: boolean;
  createdAt: string;
}

// Vehicle Types
export interface Vehicle {
  id: string;
  userId: string;
  name: string;
  type: string;
  model: string;
  registration: string;
  mileage: number;
  isActive: boolean;
  createdAt: string;
}

// Animal Types
export interface Animal {
  id: string;
  userId: string;
  name: string;
  type: string;
  breed?: string;
  gender: string;
  age: number;
  health: string;
  isActive: boolean;
  createdAt: string;
}

// Bill Types
export interface Bill {
  id: string;
  userId: string;
  name: string;
  category: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  vendor: string;
  account: string;
  createdAt: string;
}

// Calendar Types
export interface CalendarEvent {
  id: string;
  title: string;
  type: string;
  date: string;
  time?: string;
  description?: string;
}

// Report Types
export interface Report {
  id: string;
  title: string;
  description: string;
  chartType: string;
  chartData: any;
  stats: any;
}

// Settings Types
export interface Settings {
  darkMode: boolean;
  language: string;
  notifications: Record<string, boolean>;
}

// Dashboard Stats Types
export interface DashboardStats {
  familyCount: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savings: number;
  budgetProgress: number;
  propertiesCount: number;
  animalsCount: number;
  vehiclesCount: number;
  billsDue: number;
  recentTransactions: any[];
  upcomingEvents: any[];
}
