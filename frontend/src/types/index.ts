

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

// Shopping List Item
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
