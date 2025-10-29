import { AxiosError } from "axios";

/**
 * Custom API Error class
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Extract error message from various error types
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof AxiosError) {
    // Check for response error message
    if (error.response?.data?.message) {
      return error.response.data.message;
    }

    // Check for validation errors
    if (error.response?.data?.errors) {
      const errors = error.response.data.errors;
      const firstError = Object.values(errors)[0] as string[];
      return firstError[0] || "Validation error occurred";
    }

    // Check for error message in response
    if (error.response?.data?.error) {
      return error.response.data.error;
    }

    // Network errors
    if (error.code === "ECONNABORTED") {
      return "Request timeout. Please try again.";
    }

    if (error.code === "ERR_NETWORK") {
      return "Network error. Please check your connection.";
    }

    // Axios error message
    if (error.message) {
      return error.message;
    }

    // Generic HTTP error
    const status = error.response?.status;
    if (status) {
      return getHttpErrorMessage(status);
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
}

/**
 * Get user-friendly message for HTTP status codes
 */
export function getHttpErrorMessage(status: number): string {
  const messages: Record<number, string> = {
    400: "Bad request. Please check your input.",
    401: "Unauthorized. Please login again.",
    403: "Access denied. You don't have permission.",
    404: "Resource not found.",
    409: "Conflict. The resource already exists.",
    422: "Invalid data provided.",
    429: "Too many requests. Please try again later.",
    500: "Server error. Please try again later.",
    502: "Bad gateway. Server is temporarily unavailable.",
    503: "Service unavailable. Please try again later.",
  };

  return messages[status] || `Request failed with status ${status}`;
}

/**
 * Check if error is an authentication error
 */
export function isAuthError(error: unknown): boolean {
  if (error instanceof AxiosError) {
    return error.response?.status === 401;
  }
  return false;
}

/**
 * Check if error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof AxiosError) {
    return (
      error.code === "ERR_NETWORK" ||
      error.code === "ECONNABORTED" ||
      !error.response
    );
  }
  return false;
}

/**
 * Format validation errors for display
 */
export function formatValidationErrors(
  errors: Record<string, string[]>
): string[] {
  const formatted: string[] = [];

  for (const [field, messages] of Object.entries(errors)) {
    messages.forEach((message) => {
      formatted.push(`${field}: ${message}`);
    });
  }

  return formatted;
}

/**
 * Handle API error with optional callback
 */
export function handleApiError(
  error: unknown,
  options?: {
    onAuthError?: () => void;
    onNetworkError?: () => void;
    defaultMessage?: string;
  }
): string {
  const message = getErrorMessage(error);

  if (isAuthError(error) && options?.onAuthError) {
    options.onAuthError();
  }

  if (isNetworkError(error) && options?.onNetworkError) {
    options.onNetworkError();
  }

  return options?.defaultMessage || message;
}
