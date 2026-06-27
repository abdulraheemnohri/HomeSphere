/**
 * HomeSphere Zustand Store
 * Centralized state management for the application
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  UserResponse,
  FamilyMember,
  Income,
  Expense,
  Budget,
  Bill,
  Loan,
  Property,
  Vehicle,
  Animal,
  HealthRecord,
  Document,
  EmergencyContact,
  ShoppingList,
  Task,
  FarmActivity,
  Asset,
  BankAccount,
  CalendarEvent,
  DashboardStats,
} from '../services/api';

// ==================== Type Definitions ====================

interface AuthState {
  user: UserResponse | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface LoadingState {
  isLoading: boolean;
  loadingMessage: string | null;
}

interface FamilyState {
  familyMembers: FamilyMember[];
  currentFamilyMember: FamilyMember | null;
  totalFamilyMembers: number;
}

interface FinanceState {
  incomes: Income[];
  expenses: Expense[];
  budgets: Budget[];
  bills: Bill[];
  loans: Loan[];
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
}

interface PropertiesState {
  properties: Property[];
  vehicles: Vehicle[];
  animals: Animal[];
}

interface HealthState {
  healthRecords: HealthRecord[];
}

interface DocumentsState {
  documents: Document[];
}

interface EmergencyState {
  emergencyContacts: EmergencyContact[];
}

interface ShoppingState {
  shoppingLists: ShoppingList[];
}

interface TasksState {
  tasks: Task[];
}

interface FarmState {
  farmActivities: FarmActivity[];
}

interface AssetsState {
  assets: Asset[];
}

interface BankAccountsState {
  bankAccounts: BankAccount[];
}

interface CalendarState {
  calendarEvents: CalendarEvent[];
}

interface DashboardState {
  stats: DashboardStats | null;
}

// ==================== Combined State ====================

interface AppState {
  auth: AuthState;
  loading: LoadingState;
  family: FamilyState;
  finance: FinanceState;
  properties: PropertiesState;
  health: HealthState;
  documents: DocumentsState;
  emergency: EmergencyState;
  shopping: ShoppingState;
  tasks: TasksState;
  farm: FarmState;
  assets: AssetsState;
  bankAccounts: BankAccountsState;
  calendar: CalendarState;
  dashboard: DashboardState;
}

interface AppActions {
  // Auth actions
  setUser: (user: UserResponse | null) => void;
  setToken: (token: string | null) => void;
  loginStart: () => void;
  loginSuccess: (user: UserResponse, token: string) => void;
  loginFailure: (error: string) => void;
  logout: () => void;
  
  // Loading actions
  setLoading: (isLoading: boolean, message?: string) => void;
  
  // Family actions
  setFamilyMembers: (members: FamilyMember[]) => void;
  setCurrentFamilyMember: (member: FamilyMember | null) => void;
  addFamilyMember: (member: FamilyMember) => void;
  updateFamilyMember: (member: FamilyMember) => void;
  deleteFamilyMember: (id: string) => void;
  
  // Finance actions
  setIncomes: (incomes: Income[]) => void;
  addIncome: (income: Income) => void;
  updateIncome: (income: Income) => void;
  deleteIncome: (id: string) => void;
  
  setExpenses: (expenses: Expense[]) => void;
  addExpense: (expense: Expense) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  
  setBudgets: (budgets: Budget[]) => void;
  addBudget: (budget: Budget) => void;
  updateBudget: (budget: Budget) => void;
  deleteBudget: (id: string) => void;
  
  setBills: (bills: Bill[]) => void;
  addBill: (bill: Bill) => void;
  updateBill: (bill: Bill) => void;
  deleteBill: (id: string) => void;
  
  setLoans: (loans: Loan[]) => void;
  addLoan: (loan: Loan) => void;
  updateLoan: (loan: Loan) => void;
  deleteLoan: (id: string) => void;
  
  // Properties actions
  setProperties: (properties: Property[]) => void;
  addProperty: (property: Property) => void;
  updateProperty: (property: Property) => void;
  deleteProperty: (id: string) => void;
  
  setVehicles: (vehicles: Vehicle[]) => void;
  addVehicle: (vehicle: Vehicle) => void;
  updateVehicle: (vehicle: Vehicle) => void;
  deleteVehicle: (id: string) => void;
  
  setAnimals: (animals: Animal[]) => void;
  addAnimal: (animal: Animal) => void;
  updateAnimal: (animal: Animal) => void;
  deleteAnimal: (id: string) => void;
  
  // Health actions
  setHealthRecords: (records: HealthRecord[]) => void;
  addHealthRecord: (record: HealthRecord) => void;
  updateHealthRecord: (record: HealthRecord) => void;
  deleteHealthRecord: (id: string) => void;
  
  // Documents actions
  setDocuments: (documents: Document[]) => void;
  addDocument: (document: Document) => void;
  updateDocument: (document: Document) => void;
  deleteDocument: (id: string) => void;
  
  // Emergency actions
  setEmergencyContacts: (contacts: EmergencyContact[]) => void;
  addEmergencyContact: (contact: EmergencyContact) => void;
  updateEmergencyContact: (contact: EmergencyContact) => void;
  deleteEmergencyContact: (id: string) => void;
  
  // Shopping actions
  setShoppingLists: (lists: ShoppingList[]) => void;
  addShoppingList: (list: ShoppingList) => void;
  updateShoppingList: (list: ShoppingList) => void;
  deleteShoppingList: (id: string) => void;
  
  // Tasks actions
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  
  // Farm actions
  setFarmActivities: (activities: FarmActivity[]) => void;
  addFarmActivity: (activity: FarmActivity) => void;
  updateFarmActivity: (activity: FarmActivity) => void;
  deleteFarmActivity: (id: string) => void;
  
  // Assets actions
  setAssets: (assets: Asset[]) => void;
  addAsset: (asset: Asset) => void;
  updateAsset: (asset: Asset) => void;
  deleteAsset: (id: string) => void;
  
  // Bank Accounts actions
  setBankAccounts: (accounts: BankAccount[]) => void;
  addBankAccount: (account: BankAccount) => void;
  updateBankAccount: (account: BankAccount) => void;
  deleteBankAccount: (id: string) => void;
  
  // Calendar actions
  setCalendarEvents: (events: CalendarEvent[]) => void;
  addCalendarEvent: (event: CalendarEvent) => void;
  updateCalendarEvent: (event: CalendarEvent) => void;
  deleteCalendarEvent: (id: string) => void;
  
  // Dashboard actions
  setDashboardStats: (stats: DashboardStats) => void;
  
  // Reset all state
  reset: () => void;
}

type AppStore = AppState & AppActions;

// ==================== Initial State ====================

const initialAuthState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const initialLoadingState: LoadingState = {
  isLoading: false,
  loadingMessage: null,
};

const initialFamilyState: FamilyState = {
  familyMembers: [],
  currentFamilyMember: null,
  totalFamilyMembers: 0,
};

const initialFinanceState: FinanceState = {
  incomes: [],
  expenses: [],
  budgets: [],
  bills: [],
  loans: [],
  totalIncome: 0,
  totalExpenses: 0,
  netBalance: 0,
};

const initialPropertiesState: PropertiesState = {
  properties: [],
  vehicles: [],
  animals: [],
};

const initialHealthState: HealthState = {
  healthRecords: [],
};

const initialDocumentsState: DocumentsState = {
  documents: [],
};

const initialEmergencyState: EmergencyState = {
  emergencyContacts: [],
};

const initialShoppingState: ShoppingState = {
  shoppingLists: [],
};

const initialTasksState: TasksState = {
  tasks: [],
};

const initialFarmState: FarmState = {
  farmActivities: [],
};

const initialAssetsState: AssetsState = {
  assets: [],
};

const initialBankAccountsState: BankAccountsState = {
  bankAccounts: [],
};

const initialCalendarState: CalendarState = {
  calendarEvents: [],
};

const initialDashboardState: DashboardState = {
  stats: null,
};

// ==================== Store Definition ====================

const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (set) => ({
        // Auth state
        auth: initialAuthState,
        
        // Loading state
        loading: initialLoadingState,
        
        // Family state
        family: initialFamilyState,
        
        // Finance state
        finance: initialFinanceState,
        
        // Properties state
        properties: initialPropertiesState,
        
        // Health state
        health: initialHealthState,
        
        // Documents state
        documents: initialDocumentsState,
        
        // Emergency state
        emergency: initialEmergencyState,
        
        // Shopping state
        shopping: initialShoppingState,
        
        // Tasks state
        tasks: initialTasksState,
        
        // Farm state
        farm: initialFarmState,
        
        // Assets state
        assets: initialAssetsState,
        
        // Bank Accounts state
        bankAccounts: initialBankAccountsState,
        
        // Calendar state
        calendar: initialCalendarState,
        
        // Dashboard state
        dashboard: initialDashboardState,
        
        // ==================== Actions ====================
        
        // Auth actions
        setUser: (user) => set({ auth: { ...initialAuthState, user } }),
        setToken: (token) => set({ auth: { ...initialAuthState, token } }),
        loginStart: () => set({ auth: { ...initialAuthState, isLoading: true } }),
        loginSuccess: (user, token) => set({
          auth: { user, token, isAuthenticated: true, isLoading: false, error: null }
        }),
        loginFailure: (error) => set({
          auth: { ...initialAuthState, error, isLoading: false }
        }),
        logout: () => set({
          auth: initialAuthState,
          family: initialFamilyState,
          finance: initialFinanceState,
          properties: initialPropertiesState,
          health: initialHealthState,
          documents: initialDocumentsState,
          emergency: initialEmergencyState,
          shopping: initialShoppingState,
          tasks: initialTasksState,
          farm: initialFarmState,
          assets: initialAssetsState,
          bankAccounts: initialBankAccountsState,
          calendar: initialCalendarState,
          dashboard: initialDashboardState,
        }),
        
        // Loading actions
        setLoading: (isLoading, message) => set({ loading: { isLoading, loadingMessage: message || null } }),
        
        // Family actions
        setFamilyMembers: (members) => set((state) => ({
          family: { ...state.family, familyMembers: members, totalFamilyMembers: members.length }
        })),
        setCurrentFamilyMember: (member) => set((state) => ({
          family: { ...state.family, currentFamilyMember: member }
        })),
        addFamilyMember: (member) => set((state) => ({
          family: { ...state.family, familyMembers: [...state.family.familyMembers, member] }
        })),
        updateFamilyMember: (updatedMember) => set((state) => ({
          family: {
            ...state.family,
            familyMembers: state.family.familyMembers.map(m =>
              m.id === updatedMember.id ? updatedMember : m
            )
          }
        })),
        deleteFamilyMember: (id) => set((state) => ({
          family: {
            ...state.family,
            familyMembers: state.family.familyMembers.filter(m => m.id !== id)
          }
        })),
        
        // Finance actions
        setIncomes: (incomes) => set((state) => ({
          finance: { ...state.finance, incomes }
        })),
        addIncome: (income) => set((state) => ({
          finance: { ...state.finance, incomes: [...state.finance.incomes, income] }
        })),
        updateIncome: (updatedIncome) => set((state) => ({
          finance: {
            ...state.finance,
            incomes: state.finance.incomes.map(i =>
              i.id === updatedIncome.id ? updatedIncome : i
            )
          }
        })),
        deleteIncome: (id) => set((state) => ({
          finance: {
            ...state.finance,
            incomes: state.finance.incomes.filter(i => i.id !== id)
          }
        })),
        
        setExpenses: (expenses) => set((state) => ({
          finance: { ...state.finance, expenses }
        })),
        addExpense: (expense) => set((state) => ({
          finance: { ...state.finance, expenses: [...state.finance.expenses, expense] }
        })),
        updateExpense: (updatedExpense) => set((state) => ({
          finance: {
            ...state.finance,
            expenses: state.finance.expenses.map(e =>
              e.id === updatedExpense.id ? updatedExpense : e
            )
          }
        })),
        deleteExpense: (id) => set((state) => ({
          finance: {
            ...state.finance,
            expenses: state.finance.expenses.filter(e => e.id !== id)
          }
        })),
        
        setBudgets: (budgets) => set((state) => ({
          finance: { ...state.finance, budgets }
        })),
        addBudget: (budget) => set((state) => ({
          finance: { ...state.finance, budgets: [...state.finance.budgets, budget] }
        })),
        updateBudget: (updatedBudget) => set((state) => ({
          finance: {
            ...state.finance,
            budgets: state.finance.budgets.map(b =>
              b.id === updatedBudget.id ? updatedBudget : b
            )
          }
        })),
        deleteBudget: (id) => set((state) => ({
          finance: {
            ...state.finance,
            budgets: state.finance.budgets.filter(b => b.id !== id)
          }
        })),
        
        setBills: (bills) => set((state) => ({
          finance: { ...state.finance, bills }
        })),
        addBill: (bill) => set((state) => ({
          finance: { ...state.finance, bills: [...state.finance.bills, bill] }
        })),
        updateBill: (updatedBill) => set((state) => ({
          finance: {
            ...state.finance,
            bills: state.finance.bills.map(b =>
              b.id === updatedBill.id ? updatedBill : b
            )
          }
        })),
        deleteBill: (id) => set((state) => ({
          finance: {
            ...state.finance,
            bills: state.finance.bills.filter(b => b.id !== id)
          }
        })),
        
        setLoans: (loans) => set((state) => ({
          finance: { ...state.finance, loans }
        })),
        addLoan: (loan) => set((state) => ({
          finance: { ...state.finance, loans: [...state.finance.loans, loan] }
        })),
        updateLoan: (updatedLoan) => set((state) => ({
          finance: {
            ...state.finance,
            loans: state.finance.loans.map(l =>
              l.id === updatedLoan.id ? updatedLoan : l
            )
          }
        })),
        deleteLoan: (id) => set((state) => ({
          finance: {
            ...state.finance,
            loans: state.finance.loans.filter(l => l.id !== id)
          }
        })),
        
        // Properties actions
        setProperties: (properties) => set((state) => ({
          properties: { ...state.properties, properties }
        })),
        addProperty: (property) => set((state) => ({
          properties: { ...state.properties, properties: [...state.properties.properties, property] }
        })),
        updateProperty: (updatedProperty) => set((state) => ({
          properties: {
            ...state.properties,
            properties: state.properties.properties.map(p =>
              p.id === updatedProperty.id ? updatedProperty : p
            )
          }
        })),
        deleteProperty: (id) => set((state) => ({
          properties: {
            ...state.properties,
            properties: state.properties.properties.filter(p => p.id !== id)
          }
        })),
        
        setVehicles: (vehicles) => set((state) => ({
          properties: { ...state.properties, vehicles }
        })),
        addVehicle: (vehicle) => set((state) => ({
          properties: { ...state.properties, vehicles: [...state.properties.vehicles, vehicle] }
        })),
        updateVehicle: (updatedVehicle) => set((state) => ({
          properties: {
            ...state.properties,
            vehicles: state.properties.vehicles.map(v =>
              v.id === updatedVehicle.id ? updatedVehicle : v
            )
          }
        })),
        deleteVehicle: (id) => set((state) => ({
          properties: {
            ...state.properties,
            vehicles: state.properties.vehicles.filter(v => v.id !== id)
          }
        })),
        
        setAnimals: (animals) => set((state) => ({
          properties: { ...state.properties, animals }
        })),
        addAnimal: (animal) => set((state) => ({
          properties: { ...state.properties, animals: [...state.properties.animals, animal] }
        })),
        updateAnimal: (updatedAnimal) => set((state) => ({
          properties: {
            ...state.properties,
            animals: state.properties.animals.map(a =>
              a.id === updatedAnimal.id ? updatedAnimal : a
            )
          }
        })),
        deleteAnimal: (id) => set((state) => ({
          properties: {
            ...state.properties,
            animals: state.properties.animals.filter(a => a.id !== id)
          }
        })),
        
        // Health actions
        setHealthRecords: (records) => set((state) => ({
          health: { ...state.health, healthRecords: records }
        })),
        addHealthRecord: (record) => set((state) => ({
          health: { ...state.health, healthRecords: [...state.health.healthRecords, record] }
        })),
        updateHealthRecord: (updatedRecord) => set((state) => ({
          health: {
            ...state.health,
            healthRecords: state.health.healthRecords.map(r =>
              r.id === updatedRecord.id ? updatedRecord : r
            )
          }
        })),
        deleteHealthRecord: (id) => set((state) => ({
          health: {
            ...state.health,
            healthRecords: state.health.healthRecords.filter(r => r.id !== id)
          }
        })),
        
        // Documents actions
        setDocuments: (documents) => set((state) => ({
          documents: { ...state.documents, documents }
        })),
        addDocument: (document) => set((state) => ({
          documents: { ...state.documents, documents: [...state.documents.documents, document] }
        })),
        updateDocument: (updatedDocument) => set((state) => ({
          documents: {
            ...state.documents,
            documents: state.documents.documents.map(d =>
              d.id === updatedDocument.id ? updatedDocument : d
            )
          }
        })),
        deleteDocument: (id) => set((state) => ({
          documents: {
            ...state.documents,
            documents: state.documents.documents.filter(d => d.id !== id)
          }
        })),
        
        // Emergency actions
        setEmergencyContacts: (contacts) => set((state) => ({
          emergency: { ...state.emergency, emergencyContacts: contacts }
        })),
        addEmergencyContact: (contact) => set((state) => ({
          emergency: { ...state.emergency, emergencyContacts: [...state.emergency.emergencyContacts, contact] }
        })),
        updateEmergencyContact: (updatedContact) => set((state) => ({
          emergency: {
            ...state.emergency,
            emergencyContacts: state.emergency.emergencyContacts.map(c =>
              c.id === updatedContact.id ? updatedContact : c
            )
          }
        })),
        deleteEmergencyContact: (id) => set((state) => ({
          emergency: {
            ...state.emergency,
            emergencyContacts: state.emergency.emergencyContacts.filter(c => c.id !== id)
          }
        })),
        
        // Shopping actions
        setShoppingLists: (lists) => set((state) => ({
          shopping: { ...state.shopping, shoppingLists: lists }
        })),
        addShoppingList: (list) => set((state) => ({
          shopping: { ...state.shopping, shoppingLists: [...state.shopping.shoppingLists, list] }
        })),
        updateShoppingList: (updatedList) => set((state) => ({
          shopping: {
            ...state.shopping,
            shoppingLists: state.shopping.shoppingLists.map(l =>
              l.id === updatedList.id ? updatedList : l
            )
          }
        })),
        deleteShoppingList: (id) => set((state) => ({
          shopping: {
            ...state.shopping,
            shoppingLists: state.shopping.shoppingLists.filter(l => l.id !== id)
          }
        })),
        
        // Tasks actions
        setTasks: (tasks) => set((state) => ({
          tasks: { ...state.tasks, tasks }
        })),
        addTask: (task) => set((state) => ({
          tasks: { ...state.tasks, tasks: [...state.tasks.tasks, task] }
        })),
        updateTask: (updatedTask) => set((state) => ({
          tasks: {
            ...state.tasks,
            tasks: state.tasks.tasks.map(t =>
              t.id === updatedTask.id ? updatedTask : t
            )
          }
        })),
        deleteTask: (id) => set((state) => ({
          tasks: {
            ...state.tasks,
            tasks: state.tasks.tasks.filter(t => t.id !== id)
          }
        })),
        
        // Farm actions
        setFarmActivities: (activities) => set((state) => ({
          farm: { ...state.farm, farmActivities: activities }
        })),
        addFarmActivity: (activity) => set((state) => ({
          farm: { ...state.farm, farmActivities: [...state.farm.farmActivities, activity] }
        })),
        updateFarmActivity: (updatedActivity) => set((state) => ({
          farm: {
            ...state.farm,
            farmActivities: state.farm.farmActivities.map(a =>
              a.id === updatedActivity.id ? updatedActivity : a
            )
          }
        })),
        deleteFarmActivity: (id) => set((state) => ({
          farm: {
            ...state.farm,
            farmActivities: state.farm.farmActivities.filter(a => a.id !== id)
          }
        })),
        
        // Assets actions
        setAssets: (assets) => set((state) => ({
          assets: { ...state.assets, assets }
        })),
        addAsset: (asset) => set((state) => ({
          assets: { ...state.assets, assets: [...state.assets.assets, asset] }
        })),
        updateAsset: (updatedAsset) => set((state) => ({
          assets: {
            ...state.assets,
            assets: state.assets.assets.map(a =>
              a.id === updatedAsset.id ? updatedAsset : a
            )
          }
        })),
        deleteAsset: (id) => set((state) => ({
          assets: {
            ...state.assets,
            assets: state.assets.assets.filter(a => a.id !== id)
          }
        })),
        
        // Bank Accounts actions
        setBankAccounts: (accounts) => set((state) => ({
          bankAccounts: { ...state.bankAccounts, bankAccounts: accounts }
        })),
        addBankAccount: (account) => set((state) => ({
          bankAccounts: { ...state.bankAccounts, bankAccounts: [...state.bankAccounts.bankAccounts, account] }
        })),
        updateBankAccount: (updatedAccount) => set((state) => ({
          bankAccounts: {
            ...state.bankAccounts,
            bankAccounts: state.bankAccounts.bankAccounts.map(a =>
              a.id === updatedAccount.id ? updatedAccount : a
            )
          }
        })),
        deleteBankAccount: (id) => set((state) => ({
          bankAccounts: {
            ...state.bankAccounts,
            bankAccounts: state.bankAccounts.bankAccounts.filter(a => a.id !== id)
          }
        })),
        
        // Calendar actions
        setCalendarEvents: (events) => set((state) => ({
          calendar: { ...state.calendar, calendarEvents: events }
        })),
        addCalendarEvent: (event) => set((state) => ({
          calendar: { ...state.calendar, calendarEvents: [...state.calendar.calendarEvents, event] }
        })),
        updateCalendarEvent: (updatedEvent) => set((state) => ({
          calendar: {
            ...state.calendar,
            calendarEvents: state.calendar.calendarEvents.map(e =>
              e.id === updatedEvent.id ? updatedEvent : e
            )
          }
        })),
        deleteCalendarEvent: (id) => set((state) => ({
          calendar: {
            ...state.calendar,
            calendarEvents: state.calendar.calendarEvents.filter(e => e.id !== id)
          }
        })),
        
        // Dashboard actions
        setDashboardStats: (stats) => set({ dashboard: { stats } }),
        
        // Reset all state
        reset: () => set({
          auth: initialAuthState,
          loading: initialLoadingState,
          family: initialFamilyState,
          finance: initialFinanceState,
          properties: initialPropertiesState,
          health: initialHealthState,
          documents: initialDocumentsState,
          emergency: initialEmergencyState,
          shopping: initialShoppingState,
          tasks: initialTasksState,
          farm: initialFarmState,
          assets: initialAssetsState,
          bankAccounts: initialBankAccountsState,
          calendar: initialCalendarState,
          dashboard: initialDashboardState,
        }),
      }),
      { name: 'app-store' }
    )
  )
);

// ==================== Selector Hooks ====================

// Auth selectors
export const useAuth = () => useAppStore((state) => state.auth);
export const useUser = () => useAppStore((state) => state.auth.user);
export const useIsAuthenticated = () => useAppStore((state) => state.auth.isAuthenticated);

// Loading selector
export const useLoading = () => useAppStore((state) => state.loading);

// Family selectors
export const useFamily = () => useAppStore((state) => state.family);

// Finance selectors
export const useFinance = () => useAppStore((state) => state.finance);
export const useIncomes = () => useAppStore((state) => state.finance.incomes);
export const useExpenses = () => useAppStore((state) => state.finance.expenses);
export const useBudgets = () => useAppStore((state) => state.finance.budgets);
export const useBills = () => useAppStore((state) => state.finance.bills);
export const useLoans = () => useAppStore((state) => state.finance.loans);

// Properties selectors
export const useProperties = () => useAppStore((state) => state.properties);

// Health selectors
export const useHealth = () => useAppStore((state) => state.health);

// Documents selectors
export const useDocuments = () => useAppStore((state) => state.documents);

// Emergency selectors
export const useEmergency = () => useAppStore((state) => state.emergency);

// Shopping selectors
export const useShopping = () => useAppStore((state) => state.shopping);

// Tasks selectors
export const useTasks = () => useAppStore((state) => state.tasks);

// Farm selectors
export const useFarm = () => useAppStore((state) => state.farm);

// Assets selectors
export const useAssets = () => useAppStore((state) => state.assets);

// Bank Accounts selectors
export const useBankAccounts = () => useAppStore((state) => state.bankAccounts);

// Calendar selectors
export const useCalendar = () => useAppStore((state) => state.calendar);

// Dashboard selectors
export const useDashboard = () => useAppStore((state) => state.dashboard);

// Action hooks
export const useAuthActions = () => ({
  setUser: useAppStore((state) => state.setUser),
  setToken: useAppStore((state) => state.setToken),
  loginStart: useAppStore((state) => state.loginStart),
  loginSuccess: useAppStore((state) => state.loginSuccess),
  loginFailure: useAppStore((state) => state.loginFailure),
  logout: useAppStore((state) => state.logout),
});

export const useLoadingActions = () => ({
  setLoading: useAppStore((state) => state.setLoading),
});

export const useFamilyActions = () => ({
  setFamilyMembers: useAppStore((state) => state.setFamilyMembers),
  setCurrentFamilyMember: useAppStore((state) => state.setCurrentFamilyMember),
  addFamilyMember: useAppStore((state) => state.addFamilyMember),
  updateFamilyMember: useAppStore((state) => state.updateFamilyMember),
  deleteFamilyMember: useAppStore((state) => state.deleteFamilyMember),
});

export default useAppStore;
