export interface UserSession {
  success: boolean;
  message: string;
  data: SessionData;
}

export interface SessionData {
  token: string;
  user: UserObject;
}

export interface UserObject {
  id: number;
  name: string;
  email: null | string;
  phone: string | null;
  email_verified_at: null | string;
  phone_verified_at: null | string;
  device_name: string;
  device_id: null | string;
  photo: null | string;
  dob: null | string;
  gender: null | string;
  created_at: Date;
  updated_at: Date;
  is_customer: number;
  scope: null | string;
  scope_ids: null | string;
  employee_id: null;
  is_active: null | boolean;
  source: null | string;
  app_version: null | string;
  wallet_balance: number;
  store_codes: any[];
  membership: null;
  addresses: Address[];
  selected_address?: Address;
}

export interface Address {
  id: number;
  entity_id: number;
  name: string;
  phone: string;
  longitude: string;
  latitude: string;
  type: Type;
  country: string;
  state: string;
  city: string;
  area: null | string;
  street_address: null | string;
  building: string;
  flat_number: string;
  suitable_timing: string;
  created_at: Date;
  updated_at: Date;
  google_address: string;
  additional_info: null | string;
  belongs_to: string;
  deleted_at: null;
  is_validated: number;
  area_name: null;
}

export enum Type {
  Home = "Home",
  Other = "Other",
  Work = "Work",
}
