/**
 * Hooks Index
 * Exports all custom hooks for the HomeSphere application
 */

// Authentication
export { default as useAuth, useAuthHook } from './useAuth';

// Theme
export { default as useTheme, useTheme as useThemeHook, toggleTheme, getCurrentTheme } from './useTheme';

// Family
export { default as useFamily, useFamilyHook } from './useFamily';

// Finance
export { default as useIncome, useIncomeHook } from './useIncome';
export { default as useExpense, useExpenseHook } from './useExpense';
export { default as useBudget, useBudgetHook } from './useBudget';
export { default as useBill, useBillHook } from './useBill';
export { default as useLoan, useLoanHook } from './useLoan';

// Properties
export { default as useProperty, usePropertyHook } from './useProperty';
export { default as useVehicle, useVehicleHook } from './useVehicle';
export { default as useAnimal, useAnimalHook } from './useAnimal';

// Health
export { default as useHealth, useHealthHook } from './useHealth';

// Documents
export { default as useDocument, useDocumentHook } from './useDocument';

// Emergency
export { default as useEmergency, useEmergencyHook } from './useEmergency';

// Shopping
export { default as useShopping, useShoppingHook } from './useShopping';

// Tasks
export { default as useTask, useTaskHook } from './useTask';

// Farm
export { default as useFarm, useFarmHook } from './useFarm';

// Assets
export { default as useAsset, useAssetHook } from './useAsset';

// Bank Accounts
export { default as useBankAccount, useBankAccountHook } from './useBankAccount';

// Calendar
export { default as useCalendar, useCalendarHook } from './useCalendar';
