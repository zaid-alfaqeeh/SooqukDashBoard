// User role types
export type UserRole = "Admin" | "vendor" | "ShippingCompany";

export type UserStatus = 0 | 1; // 0 = inactive, 1 = active

// User interface
export interface User {
  firstName: string;
  lastName: string;
  phone: string;
  city: number;
  cityEn: string;
  cityAr: string;
  address: string;
  district: string | null;
  districtEn: string;
  districtAr: string;
  status: UserStatus;
  userId: string;
  code: string | null;
  skipped: boolean;
  roles: UserRole[];
}

// Auth state interface
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// API Request types
export interface LoginRequest {
  phoneNumber: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  phoneNumber: string;
}

export interface ResetPasswordRequest {
  newPassword: string;
  otp: string;
  phoneNumber: string;
}

// API Response types
export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
  message?: string;
}

export interface ForgotPasswordResponse {
  message?: string;
  success?: boolean;
}

export interface ResetPasswordResponse {
  message?: string;
  success?: boolean;
}

// Error response type
export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}
