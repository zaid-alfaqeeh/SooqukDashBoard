/**
 * Users Management Types
 */

export enum UserStatus {
  Inactive = 0,
  Active = 1,
  Suspended = 2,
  Pending = 3,
}

export type UserRole =
  | "Admin"
  | "Vendor"
  | "ShippingCompany"
  | "Customer"
  | "Super Admin";

export interface AdminDetails {
  department: string;
  jobTitle: string;
  permissions: string[];
}

export interface VendorDetails {
  id: number;
  shopName: string;
  shopNameAr: string;
  logo: string;
  description: string;
  returnPolicy: string;
  shippingPolicy: string;
  shippingPolicyAr: string;
  cityId: number;
  cityName: string;
  districtId: number;
  districtName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  status: number;
  statusText: string;
  rating: number;
}

export interface ShippingCompanyDetails {
  id: number;
  name: string;
  description: string;
  contactEmail: string;
  phoneNumber: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  isActive: boolean;
  status: UserStatus;
  statusText: string;
  role: UserRole;
  createdAt: string;
  cityName: string;
  address?: string;
  cityId?: number;
  districtId?: number;
  districtName?: string;
  adminDetails?: AdminDetails | null;
  vendorDetails?: VendorDetails | null;
  shippingCompanyDetails?: ShippingCompanyDetails | null;
}

export interface GetUsersParams {
  searchTerm?: string;
  role?: string;
  isActive?: boolean;
  status?: UserStatus;
  cityId?: number;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortDescending?: boolean;
}

export interface GetUsersResponse {
  items: User[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface CreateAdminRequest {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  selectedRole: "Admin";
  isActive: boolean;
  status: UserStatus;
  cityId: number;
  districtId: number;
  address: string;
  department: string;
  jobTitle: string;
}

export interface CreateVendorRequest {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  selectedRole: "Vendor";
  status: UserStatus;
  cityId: number;
  districtId: number;
  address: string;
  shopName: string;
  shopNameAr: string;
  logo?: string;
  description?: string;
  returnPolicy?: string;
  returnPolicyAr?: string;
  shippingPolicy?: string;
  shippingPolicyAr?: string;
  vendorDistrictId: number;
  vendorContactEmail: string;
  vendorContactPhone: string;
  vendorAddress: string;
  logoFile?: File;
}

export interface CreateShippingCompanyRequest {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  selectedRole: "ShippingCompany";
  status: UserStatus;
  cityId: number;
  shippingPolicy: string;
  shippingPolicyAr: string;
  companyName: string;
  companyDescription: string;
  companyContactEmail: string;
  companyPhoneNumber: string;
}

export type CreateUserRequest =
  | CreateAdminRequest
  | CreateVendorRequest
  | CreateShippingCompanyRequest;

export interface UpdateUserRequest {
  id: string;
  currentRole: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  isActive: boolean;
  status: UserStatus;
  address?: string | null;
  cityId: number;
  districtId?: number | null;
  // Admin fields
  department?: string;
  jobTitle?: string;
  // Vendor fields
  vendorId?: number;
  shopName?: string;
  shopNameAr?: string;
  logo?: string;
  description?: string;
  returnPolicy?: string;
  returnPolicyAr?: string;
  shippingPolicy?: string;
  shippingPolicyAr?: string;
  vendorCityId?: number;
  vendorDistrictId?: number;
  vendorContactEmail?: string;
  vendorContactPhone?: string;
  vendorAddress?: string;
  vendorStatus?: number;
  // Shipping Company fields
  shippingCompanyId?: number;
  companyName?: string;
  companyDescription?: string;
  companyContactEmail?: string;
  companyPhoneNumber?: string;
}
