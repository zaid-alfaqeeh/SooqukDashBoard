import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { authApi } from "../authApi/authApi";
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  ApiError,
} from "../types/auth.types";

/**
 * Helper function to extract error message from axios error
 */
const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.response?.data?.errors) {
      const errors = error.response.data.errors;
      const firstError = Object.values(errors)[0] as string[];
      return firstError[0] || "An error occurred";
    }
    if (error.message) {
      return error.message;
    }
  }
  return "An unexpected error occurred";
};

/**
 * Login thunk
 */
export const loginThunk = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await authApi.login(credentials);

    // Check if user status is 0 (inactive)
    if (response.user.status === 0) {
      return rejectWithValue(
        "Your account is inactive. Please contact support."
      );
    }

    return response;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

/**
 * Logout thunk
 */
export const logoutThunk = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await authApi.logout();
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

/**
 * Refresh token thunk
 */
export const refreshTokenThunk = createAsyncThunk<
  RefreshTokenResponse,
  RefreshTokenRequest,
  { rejectValue: string }
>("auth/refreshToken", async (request, { rejectWithValue }) => {
  try {
    const response = await authApi.refreshToken(request);
    return response;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

/**
 * Forgot password thunk
 */
export const forgotPasswordThunk = createAsyncThunk<
  ForgotPasswordResponse,
  ForgotPasswordRequest,
  { rejectValue: string }
>("auth/forgotPassword", async (request, { rejectWithValue }) => {
  try {
    const response = await authApi.forgotPassword(request);
    return response;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

/**
 * Reset password thunk
 */
export const resetPasswordThunk = createAsyncThunk<
  ResetPasswordResponse,
  ResetPasswordRequest,
  { rejectValue: string }
>("auth/resetPassword", async (request, { rejectWithValue }) => {
  try {
    const response = await authApi.resetPassword(request);
    return response;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});
