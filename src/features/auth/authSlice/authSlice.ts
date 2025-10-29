import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User, LoginResponse } from "../types/auth.types";
import {
  loginThunk,
  logoutThunk,
  refreshTokenThunk,
} from "../authThunkApi/authThunkApi";
import { storage } from "@/utils/storage";

// Initial state
const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Load persisted auth state from storage
const loadPersistedState = (): Partial<AuthState> => {
  const { accessToken, refreshToken, user } = storage.getAuth();

  if (accessToken && user) {
    return {
      user,
      accessToken,
      refreshToken,
      isAuthenticated: true,
    };
  }

  return {};
};

// Create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    ...initialState,
    ...loadPersistedState(),
  },
  reducers: {
    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Update user info
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user && state.accessToken && state.refreshToken) {
        state.user = { ...state.user, ...action.payload };
        storage.setAuth(state.accessToken, state.refreshToken, state.user);
      }
    },

    // Set tokens
    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      storage.updateTokens(
        action.payload.accessToken,
        action.payload.refreshToken
      );
    },
  },
  extraReducers: (builder) => {
    // Login thunk
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        loginThunk.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
          state.error = null;

          // Persist to storage
          storage.setAuth(
            action.payload.accessToken,
            action.payload.refreshToken,
            action.payload.user
          );
        }
      )
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      });

    // Logout thunk
    builder
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.error = null;

        // Clear storage
        storage.clearAuth();
      })
      .addCase(logoutThunk.rejected, (state) => {
        state.isLoading = false;
      });

    // Refresh token thunk
    builder
      .addCase(refreshTokenThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshTokenThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.token;
        state.refreshToken = action.payload.refreshToken;

        // Update storage
        storage.updateTokens(action.payload.token, action.payload.refreshToken);
      })
      .addCase(refreshTokenThunk.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;

        // Clear storage
        storage.clearAuth();
      });
  },
});

// Export actions
export const { clearError, updateUser, setTokens } = authSlice.actions;

// Export reducer
export default authSlice.reducer;

// Selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectAuthLoading = (state: { auth: AuthState }) =>
  state.auth.isLoading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
export const selectUserRole = (state: { auth: AuthState }) =>
  state.auth.user?.roles[0] || null;
