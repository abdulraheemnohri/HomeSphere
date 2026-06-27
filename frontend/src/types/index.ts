/**
 * HomeSphere TypeScript Type Definitions
 * Complete type definitions matching backend models
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

// Income
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

// Expense
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

// Budget
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

// Bill
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

// Loan
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
