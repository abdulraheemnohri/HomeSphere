/**
 * HomeSphere TypeScript Type Definitions
 * Complete type definitions for all data models
 */

// ==================== Base Types ====================

export type ISODateString = string;
export type Timestamp = string;

// ==================== User & Authentication ====================

export interface User {
  id: string;
  username: string;
  email: string;
  full_name: string;
  role: string;
  avatar?: string | null;
  phone?: string | null;
  pin_code?: string | null;
  face_encoding?: any | null;
  is_active: boolean;
  last_login?: Timestamp | null;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface UserResponse {
  id: string;
  username: string;
  email: string;
  full_name: string;
  role: string;
  avatar?: string | null;
  phone?: string | null;
  is_active: boolean;
  created_at: Timestamp;
}

export interface UserCreate {
  username: string;
  email: string;
  full_name: string;
  password: string;
  role?: string;
  phone?: string;
  pin_code?: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

// ==================== Family ====================

export interface FamilyMember {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  photo?: string | null;
  gender?: string;
  date_of_birth?: ISODateString | null;
  age?: number | null;
  phone?: string | null;
  email?: string | null;
  relationship: string;
  blood_group?: string | null;
  cnic?: string | null;
  occupation?: string | null;
  is_active: boolean;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface FamilyMemberCreate {
  first_name: string;
  last_name: string;
  relationship: string;
  gender?: string;
  date_of_birth?: ISODateString;
  age?: number;
  phone?: string;
  email?: string;
  blood_group?: string;
  cnic?: string;
  occupation?: string;
  photo?: string;
  is_active?: boolean;
}

// ==================== Finance ====================

export interface Income {
  id: string;
  user_id: string;
  amount: number;
  date: ISODateString;
  category: string;
  source?: string | null;
  payment_method: string;
  reference_number?: string | null;
  notes?: string | null;
  is_recurring: boolean;
  recurring_frequency?: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface IncomeCreate {
  amount: number;
  date: ISODateString;
  category: string;
  source?: string;
  payment_method: string;
  reference_number?: string;
  notes?: string;
  is_recurring?: boolean;
  recurring_frequency?: string;
}

export interface Expense {
  id: string;
  user_id: string;
  amount: number;
  date: ISODateString;
  category: string;
  subcategory?: string | null;
  payment_method: string;
  reference_number?: string | null;
  payee?: string | null;
  notes?: string | null;
  is_recurring: boolean;
  recurring_frequency?: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface ExpenseCreate {
  amount: number;
  date: ISODateString;
  category: string;
  subcategory?: string;
  payment_method: string;
  reference_number?: string;
  payee?: string;
  notes?: string;
  is_recurring?: boolean;
  recurring_frequency?: string;
}

export interface Budget {
  id: string;
  user_id: string;
  name: string;
  category: string;
  allocated_amount: number;
  current_spent: number;
  start_date: ISODateString;
  end_date: ISODateString;
  is_active: boolean;
  notes?: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface BudgetCreate {
  name: string;
  category: string;
  allocated_amount: number;
  current_spent?: number;
  start_date: ISODateString;
  end_date: ISODateString;
  is_active?: boolean;
  notes?: string;
}

export interface Bill {
  id: string;
  user_id: string;
  name: string;
  category: string;
  amount: number;
  due_date: ISODateString;
  issue_date?: ISODateString | null;
  payment_date?: ISODateString | null;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  vendor?: string | null;
  account_number?: string | null;
  payment_method?: string | null;
  reference_number?: string | null;
  notes?: string | null;
  is_recurring: boolean;
  recurring_frequency?: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface BillCreate {
  name: string;
  category: string;
  amount: number;
  due_date: ISODateString;
  issue_date?: ISODateString;
  payment_date?: ISODateString;
  status?: 'pending' | 'paid' | 'overdue' | 'cancelled';
  vendor?: string;
  account_number?: string;
  payment_method?: string;
  reference_number?: string;
  notes?: string;
  is_recurring?: boolean;
  recurring_frequency?: string;
}

export interface Loan {
  id: string;
  user_id: string;
  name: string;
  loan_type: string;
  amount: number;
  interest_rate: number;
  start_date: ISODateString;
  end_date?: ISODateString | null;
  status: 'active' | 'paid' | 'closed' | 'overdue';
  lender: string;
  lender_contact?: string | null;
  next_payment_amount?: number | null;
  next_payment_date?: ISODateString | null;
  total_paid: number;
  collateral?: any | null;
  notes?: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface LoanCreate {
  name: string;
  loan_type: string;
  amount: number;
  interest_rate?: number;
  start_date: ISODateString;
  end_date?: ISODateString;
  status?: 'active' | 'paid' | 'closed' | 'overdue';
  lender: string;
  lender_contact?: string;
  next_payment_amount?: number;
  next_payment_date?: ISODateString;
  total_paid?: number;
  collateral?: any;
  notes?: string;
}

// ==================== Properties ====================

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  [key: string]: any;
}

export interface Property {
  id: string;
  user_id: string;
  name: string;
  property_type: string;
  address: Address;
  purchase_date?: ISODateString | null;
  purchase_price?: number | null;
  current_value?: number | null;
  area?: number | null;
  area_unit: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  floors?: number | null;
  has_garage: boolean;
  has_garden: boolean;
  has_swimming_pool: boolean;
  is_rented: boolean;
  monthly_rent?: number | null;
  tenant_name?: string | null;
  tenant_contact?: string | null;
  lease_start_date?: ISODateString | null;
  lease_end_date?: ISODateString | null;
  is_active: boolean;
  documents?: any[] | null;
  notes?: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface PropertyCreate {
  name: string;
  property_type: string;
  address: Address;
  purchase_date?: ISODateString;
  purchase_price?: number;
  current_value?: number;
  area?: number;
  area_unit?: string;
  bedrooms?: number;
  bathrooms?: number;
  floors?: number;
  has_garage?: boolean;
  has_garden?: boolean;
  has_swimming_pool?: boolean;
  is_rented?: boolean;
  monthly_rent?: number;
  tenant_name?: string;
  tenant_contact?: string;
  lease_start_date?: ISODateString;
  lease_end_date?: ISODateString;
  is_active?: boolean;
  documents?: any[];
  notes?: string;
}

export interface Vehicle {
  id: string;
  user_id: string;
  name: string;
  vehicle_type: string;
  make?: string | null;
  model?: string | null;
  year?: number | null;
  registration_number?: string | null;
  engine_number?: string | null;
  chasis_number?: string | null;
  color?: string | null;
  mileage: number;
  mileage_unit: string;
  purchase_date?: ISODateString | null;
  purchase_price?: number | null;
  current_value?: number | null;
  fuel_type?: string | null;
  transmission?: string | null;
  insurance_company?: string | null;
  insurance_policy_number?: string | null;
  insurance_expiry_date?: ISODateString | null;
  last_service_date?: ISODateString | null;
  next_service_date?: ISODateString | null;
  service_reminder_km: number;
  is_active: boolean;
  documents?: any[] | null;
  notes?: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface VehicleCreate {
  name: string;
  vehicle_type: string;
  make?: string;
  model?: string;
  year?: number;
  registration_number?: string;
  engine_number?: string;
  chasis_number?: string;
  color?: string;
  mileage?: number;
  mileage_unit?: string;
  purchase_date?: ISODateString;
  purchase_price?: number;
  current_value?: number;
  fuel_type?: string;
  transmission?: string;
  insurance_company?: string;
  insurance_policy_number?: string;
  insurance_expiry_date?: ISODateString;
  last_service_date?: ISODateString;
  next_service_date?: ISODateString;
  service_reminder_km?: number;
  is_active?: boolean;
  documents?: any[];
  notes?: string;
}

export interface Animal {
  id: string;
  user_id: string;
  name: string;
  animal_type: string;
  breed?: string | null;
  gender: string;
  date_of_birth?: ISODateString | null;
  age?: number | null;
  age_unit: string;
  color?: string | null;
  weight?: number | null;
  weight_unit: string;
  height?: number | null;
  height_unit: string;
  health_status: string;
  vaccination_records?: any[] | null;
  medical_history?: any[] | null;
  purchase_date?: ISODateString | null;
  purchase_price?: number | null;
  current_value?: number | null;
  is_active: boolean;
  is_sterilized: boolean;
  microchip_number?: string | null;
  identification_mark?: string | null;
  documents?: any[] | null;
  notes?: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface AnimalCreate {
  name: string;
  animal_type: string;
  breed?: string;
  gender?: string;
  date_of_birth?: ISODateString;
  age?: number;
  age_unit?: string;
  color?: string;
  weight?: number;
  weight_unit?: string;
  height?: number;
  height_unit?: string;
  health_status?: string;
  vaccination_records?: any[];
  medical_history?: any[];
  purchase_date?: ISODateString;
  purchase_price?: number;
  current_value?: number;
  is_active?: boolean;
  is_sterilized?: boolean;
  microchip_number?: string;
  identification_mark?: string;
  documents?: any[];
  notes?: string;
}

// ==================== Health ====================

export interface HealthRecord {
  id: string;
  user_id: string;
  family_member_id?: string | null;
  record_type: string;
  title: string;
  date: ISODateString;
  time?: string | null;
  doctor_name?: string | null;
  doctor_specialization?: string | null;
  hospital_clinic?: string | null;
  hospital_address?: Address | null;
  hospital_contact?: string | null;
  symptoms?: string | null;
  diagnosis?: string | null;
  treatment?: string | null;
  medication_prescribed?: any[] | null;
  temperature?: number | null;
  temperature_unit: string;
  blood_pressure?: string | null;
  pulse_rate?: number | null;
  respiratory_rate?: number | null;
  oxygen_level?: number | null;
  weight?: number | null;
  weight_unit: string;
  height?: number | null;
  height_unit: string;
  bmi?: number | null;
  status: 'completed' | 'scheduled' | 'urgent' | 'follow-up';
  follow_up_date?: ISODateString | null;
  cost?: number | null;
  payment_status: 'unpaid' | 'paid' | 'insurance';
  insurance_claim_number?: string | null;
  documents?: any[] | null;
  notes?: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface HealthRecordCreate {
  family_member_id?: string;
  record_type: string;
  title: string;
  date: ISODateString;
  time?: string;
  doctor_name?: string;
  doctor_specialization?: string;
  hospital_clinic?: string;
  hospital_address?: Address;
  hospital_contact?: string;
  symptoms?: string;
  diagnosis?: string;
  treatment?: string;
  medication_prescribed?: any[];
  temperature?: number;
  temperature_unit?: string;
  blood_pressure?: string;
  pulse_rate?: number;
  respiratory_rate?: number;
  oxygen_level?: number;
  weight?: number;
  weight_unit?: string;
  height?: number;
  height_unit?: string;
  bmi?: number;
  status?: 'completed' | 'scheduled' | 'urgent' | 'follow-up';
  follow_up_date?: ISODateString;
  cost?: number;
  payment_status?: 'unpaid' | 'paid' | 'insurance';
  insurance_claim_number?: string;
  documents?: any[];
  notes?: string;
}

// ==================== Documents ====================

export interface Document {
  id: string;
  user_id: string;
  name: string;
  document_type: string;
  category: string;
  description?: string | null;
  file_path: string;
  file_name: string;
  file_size?: number | null;
  file_size_unit: string;
  mime_type?: string | null;
  version: string;
  tags?: string[] | null;
  issuer?: string | null;
  issue_date?: ISODateString | null;
  expiry_date?: ISODateString | null;
  reference_number?: string | null;
  location?: string | null;
  digital_location?: string | null;
  is_verified: boolean;
  is_encrypted: boolean;
  access_level: string;
  status: 'active' | 'expired' | 'archived';
  notes?: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface DocumentCreate {
  name: string;
  document_type: string;
  category: string;
  description?: string;
  file_path: string;
  file_name: string;
  file_size?: number;
  file_size_unit?: string;
  mime_type?: string;
  version?: string;
  tags?: string[];
  issuer?: string;
  issue_date?: ISODateString;
  expiry_date?: ISODateString;
  reference_number?: string;
  location?: string;
  digital_location?: string;
  is_verified?: boolean;
  is_encrypted?: boolean;
  access_level?: string;
  status?: 'active' | 'expired' | 'archived';
  notes?: string;
}

// ==================== Emergency Contacts ====================

export interface EmergencyContact {
  id: string;
  user_id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string | null;
  address?: string | null;
  notes?: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface EmergencyContactCreate {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  address?: string;
  notes?: string;
}

// ==================== Shopping ====================

export interface ShoppingList {
  id: string;
  user_id: string;
  name: string;
  description?: string | null;
  items?: any[] | null;
  total_amount?: number | null;
  status: string;
  priority?: string | null;
  due_date?: ISODateString | null;
  notes?: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface ShoppingListCreate {
  name: string;
  description?: string;
  items?: any[];
  total_amount?: number;
  status?: string;
  priority?: string;
  due_date?: ISODateString;
  notes?: string;
}

export interface ShoppingItem {
  id?: string;
  name: string;
  quantity: number;
  unit?: string;
  price?: number;
  purchased: boolean;
  category?: string;
}

// ==================== Tasks ====================

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description?: string | null;
  category?: string | null;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  due_date?: ISODateString | null;
  due_time?: string | null;
  reminder_date?: ISODateString | null;
  reminder_time?: string | null;
  assigned_to?: string | null;
  is_recurring: boolean;
  recurring_frequency?: string | null;
  notes?: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface TaskCreate {
  title: string;
  description?: string;
  category?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  status?: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  due_date?: ISODateString;
  due_time?: string;
  reminder_date?: ISODateString;
  reminder_time?: string;
  assigned_to?: string;
  is_recurring?: boolean;
  recurring_frequency?: string;
  notes?: string;
}

// ==================== Farm Activities ====================

export interface FarmActivity {
  id: string;
  user_id: string;
  name: string;
  activity_type: string;
  description?: string | null;
  area?: number | null;
  area_unit: string;
  crop_type?: string | null;
  quantity?: number | null;
  quantity_unit?: string | null;
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled';
  start_date?: ISODateString | null;
  end_date?: ISODateString | null;
  cost?: number | null;
  revenue?: number | null;
  notes?: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface FarmActivityCreate {
  name: string;
  activity_type: string;
  description?: string;
  area?: number;
  area_unit?: string;
  crop_type?: string;
  quantity?: number;
  quantity_unit?: string;
  status?: 'planned' | 'in_progress' | 'completed' | 'cancelled';
  start_date?: ISODateString;
  end_date?: ISODateString;
  cost?: number;
  revenue?: number;
  notes?: string;
}

// ==================== Assets ====================

export interface Asset {
  id: string;
  user_id: string;
  name: string;
  asset_type: string;
  description?: string | null;
  category?: string | null;
  purchase_date?: ISODateString | null;
  purchase_price?: number | null;
  current_value?: number | null;
  quantity: number;
  location?: string | null;
  condition: 'new' | 'good' | 'fair' | 'poor';
  brand?: string | null;
  model?: string | null;
  serial_number?: string | null;
  warranty_expiry_date?: ISODateString | null;
  is_insured: boolean;
  insurance_details?: any | null;
  documents?: any[] | null;
  notes?: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface AssetCreate {
  name: string;
  asset_type: string;
  description?: string;
  category?: string;
  purchase_date?: ISODateString;
  purchase_price?: number;
  current_value?: number;
  quantity?: number;
  location?: string;
  condition?: 'new' | 'good' | 'fair' | 'poor';
  brand?: string;
  model?: string;
  serial_number?: string;
  warranty_expiry_date?: ISODateString;
  is_insured?: boolean;
  insurance_details?: any;
  documents?: any[];
  notes?: string;
}

// ==================== Bank Accounts ====================

export interface BankAccount {
  id: string;
  user_id: string;
  name: string;
  account_type: string;
  bank_name: string;
  branch?: string | null;
  account_number: string;
  routing_number?: string | null;
  iban?: string | null;
  swift_code?: string | null;
  currency: string;
  current_balance: number;
  opening_balance?: number | null;
  is_active: boolean;
  is_primary: boolean;
  notes?: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface BankAccountCreate {
  name: string;
  account_type: string;
  bank_name: string;
  branch?: string;
  account_number: string;
  routing_number?: string;
  iban?: string;
  swift_code?: string;
  currency?: string;
  current_balance?: number;
  opening_balance?: number;
  is_active?: boolean;
  is_primary?: boolean;
  notes?: string;
}

// ==================== Calendar Events ====================

export interface CalendarEvent {
  id: string;
  user_id: string;
  title: string;
  description?: string | null;
  event_type: string;
  start_date: ISODateString;
  end_date?: ISODateString | null;
  start_time?: string | null;
  end_time?: string | null;
  location?: string | null;
  attendees?: string[] | null;
  reminder_date?: ISODateString | null;
  reminder_time?: string | null;
  is_recurring: boolean;
  recurring_frequency?: string | null;
  color?: string | null;
  notes?: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface CalendarEventCreate {
  title: string;
  description?: string;
  event_type: string;
  start_date: ISODateString;
  end_date?: ISODateString;
  start_time?: string;
  end_time?: string;
  location?: string;
  attendees?: string[];
  reminder_date?: ISODateString;
  reminder_time?: string;
  is_recurring?: boolean;
  recurring_frequency?: string;
  color?: string;
  notes?: string;
}

// ==================== Dashboard ====================

export interface DashboardStats {
  finance: {
    total_income: number;
    total_expenses: number;
    net_balance: number;
    total_bank_balance: number;
  };
  assets: {
    total_assets_value: number;
    total_properties: number;
    total_vehicles: number;
  };
  family: {
    total_family_members: number;
  };
  recent_transactions: {
    incomes: Array<{
      id: string;
      amount: number;
      date: ISODateString;
      category: string;
    }>;
    expenses: Array<{
      id: string;
      amount: number;
      date: ISODateString;
      category: string;
    }>;
  };
  budgets: Array<{
    name: string;
    allocated: number;
    spent: number;
    percentage: number;
  }>;
  upcoming_bills: Array<{
    id: string;
    name: string;
    amount: number;
    due_date: ISODateString;
  }>;
  upcoming_events: Array<{
    id: string;
    title: string;
    start_date: ISODateString;
  }>;
}

// ==================== API Response Types ====================

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number | null;
  data: any | null;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

// ==================== Form Types ====================

export interface SelectOption {
  value: string;
  label: string;
}

export interface FilterParams {
  skip?: number;
  limit?: number;
  [key: string]: any;
}

// ==================== Utility Types ====================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];
