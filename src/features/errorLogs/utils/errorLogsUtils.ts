/**
 * Error Logs Utility Functions
 */

import type { ErrorLog, ErrorType } from "../types/errorLogs.types";

/**
 * Get color class for error type
 */
export const getErrorTypeColor = (
  errorTypeValue: number,
  errorTypeName: string
): string => {
  const colorMap: Record<number, string> = {
    10: "bg-red-100 text-red-700 border-red-300", // AuthenticationError
    11: "bg-red-200 text-red-800 border-red-400", // AuthorizationError
    20: "bg-orange-100 text-orange-700 border-orange-300", // ValidationError
    1: "bg-purple-100 text-purple-700 border-purple-300", // DatabaseError
    30: "bg-yellow-100 text-yellow-700 border-yellow-300", // BusinessRuleViolation
    51: "bg-gray-100 text-gray-700 border-gray-300", // ResourceNotFound
    40: "bg-blue-100 text-blue-700 border-blue-300", // EmailServiceError
    41: "bg-indigo-100 text-indigo-700 border-indigo-300", // SmsServiceError
    50: "bg-pink-100 text-pink-700 border-pink-300", // UserNotFound
  };

  return (
    colorMap[errorTypeValue] ||
    "bg-gray-100 text-gray-700 border-gray-300"
  );
};

/**
 * Get color class for severity
 */
export const getSeverityColor = (severity: number): string => {
  const severityMap: Record<number, string> = {
    0: "bg-blue-100 text-blue-700 border-blue-300", // Info
    1: "bg-yellow-100 text-yellow-700 border-yellow-300", // Warning
    2: "bg-red-100 text-red-700 border-red-300", // Error
    3: "bg-red-200 text-red-900 border-red-500 font-bold", // Critical
  };

  return severityMap[severity] || "bg-gray-100 text-gray-700 border-gray-300";
};

/**
 * Format date for display
 */
export const formatErrorDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Format stack trace for display (truncate if too long)
 */
export const formatStackTrace = (stackTrace: string, maxLength: number = 500): string => {
  if (!stackTrace) return "";
  if (stackTrace.length <= maxLength) return stackTrace;
  return stackTrace.substring(0, maxLength) + "...";
};

/**
 * Get error type name from value
 */
export const getErrorTypeName = (
  errorTypes: ErrorType[],
  value: number
): string => {
  const errorType = errorTypes.find((type) => type.value === value);
  return errorType?.name || `Unknown (${value})`;
};

/**
 * Truncate text for table display
 */
export const truncateText = (text: string, maxLength: number = 80): string => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

/**
 * Parse additional data JSON
 */
export const parseAdditionalData = (additionalData: string): any => {
  try {
    return JSON.parse(additionalData);
  } catch {
    return additionalData;
  }
};

