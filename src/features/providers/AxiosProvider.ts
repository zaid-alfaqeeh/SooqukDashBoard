import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { API_CONFIG, ENDPOINTS } from "@/config/api.config";
import { storage } from "@/utils/storage";

// Create axios instance with base configuration
export const AxiosApi = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: API_CONFIG.TIMEOUT,
});

// Request interceptor - Add auth token to requests
AxiosApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle token refresh and errors
AxiosApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 Unauthorized - Token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = storage.getRefreshToken();

        if (refreshToken) {
          // Try to refresh token
          const response = await axios.post(
            `${API_CONFIG.BASE_URL}${ENDPOINTS.AUTH.REFRESH_TOKEN}`,
            { refreshToken }
          );

          // Response format: { token, refreshToken, message }
          const { token: newAccessToken, refreshToken: newRefreshToken } =
            response.data;

          // Update tokens using storage utility
          storage.updateTokens(newAccessToken, newRefreshToken);

          // Retry original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }
          return AxiosApi(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed - logout user
        storage.clearAuth();

        // Prevent redirect loop
        if (
          typeof window !== "undefined" &&
          !window.location.pathname.includes("/login")
        ) {
          window.location.href = "/en/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
