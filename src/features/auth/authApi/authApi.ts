import { AxiosApi } from "@/features/providers/AxiosProvider";
import { ENDPOINTS } from "@/config/api.config";
import { storage } from "@/utils/storage";
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "../types/auth.types";

/**
 * Authentication API endpoints
 */
export const authApi = {
  /**
   * Login user with phone number and password
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await AxiosApi.post<LoginResponse>(
      ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return response.data;
  },

  /**
   * Refresh access token using refresh token
   */
  refreshToken: async (
    request: RefreshTokenRequest
  ): Promise<RefreshTokenResponse> => {
    const response = await AxiosApi.post<RefreshTokenResponse>(
      ENDPOINTS.AUTH.REFRESH_TOKEN,
      request
    );
    return response.data;
  },

  /**
   * Request OTP for password reset
   */
  forgotPassword: async (
    request: ForgotPasswordRequest
  ): Promise<ForgotPasswordResponse> => {
    const response = await AxiosApi.post<ForgotPasswordResponse>(
      ENDPOINTS.AUTH.FORGOT_PASSWORD,
      request
    );
    return response.data;
  },

  /**
   * Reset password with OTP
   */
  resetPassword: async (
    request: ResetPasswordRequest
  ): Promise<ResetPasswordResponse> => {
    const response = await AxiosApi.post<ResetPasswordResponse>(
      ENDPOINTS.AUTH.RESET_PASSWORD,
      request
    );
    return response.data;
  },

  /**
   * Logout - Call backend and clear tokens
   */
  logout: async (): Promise<void> => {
    try {
      // Call backend logout endpoint
      await AxiosApi.post(ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      // Even if backend logout fails, clear storage
      console.error("Logout API call failed:", error);
    } finally {
      // Always clear storage
      storage.clearAuth();
    }
  },
};
