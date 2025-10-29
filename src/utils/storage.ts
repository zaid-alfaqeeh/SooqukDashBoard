import type { User } from "@/features/auth/types/auth.types";

/**
 * Safe storage utility with SSR support
 * Handles localStorage operations with proper window checks
 */

const isClient = typeof window !== "undefined";

export const storage = {
  /**
   * Set authentication tokens and user data
   */
  setAuth: (accessToken: string, refreshToken: string, user: User): void => {
    if (!isClient) return;

    try {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Failed to save auth data:", error);
    }
  },

  /**
   * Get authentication tokens and user data
   */
  getAuth: (): {
    accessToken: string | null;
    refreshToken: string | null;
    user: User | null;
  } => {
    if (!isClient) {
      return { accessToken: null, refreshToken: null, user: null };
    }

    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : null;

      return { accessToken, refreshToken, user };
    } catch (error) {
      console.error("Failed to load auth data:", error);
      return { accessToken: null, refreshToken: null, user: null };
    }
  },

  /**
   * Get access token only
   */
  getAccessToken: (): string | null => {
    if (!isClient) return null;
    return localStorage.getItem("accessToken");
  },

  /**
   * Get refresh token only
   */
  getRefreshToken: (): string | null => {
    if (!isClient) return null;
    return localStorage.getItem("refreshToken");
  },

  /**
   * Get user data only
   */
  getUser: (): User | null => {
    if (!isClient) return null;

    try {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error("Failed to parse user data:", error);
      return null;
    }
  },

  /**
   * Update only tokens (keep user data)
   */
  updateTokens: (accessToken: string, refreshToken: string): void => {
    if (!isClient) return;

    try {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    } catch (error) {
      console.error("Failed to update tokens:", error);
    }
  },

  /**
   * Clear all authentication data
   */
  clearAuth: (): void => {
    if (!isClient) return;

    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Failed to clear auth data:", error);
    }
  },

  /**
   * Generic storage methods for other use cases
   */
  set: (key: string, value: string): void => {
    if (!isClient) return;
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Failed to save ${key}:`, error);
    }
  },

  get: (key: string): string | null => {
    if (!isClient) return null;
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Failed to load ${key}:`, error);
      return null;
    }
  },

  remove: (key: string): void => {
    if (!isClient) return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove ${key}:`, error);
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    if (!isClient) return false;
    const token = localStorage.getItem("accessToken");
    return !!token;
  },
};
