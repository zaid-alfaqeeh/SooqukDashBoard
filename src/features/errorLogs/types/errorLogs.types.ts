/**
 * Error Logs Types
 */

export interface ErrorLog {
  id: number;
  userId: string | null;
  userName: string;
  errorType: number;
  errorTypeName: string;
  severity: number;
  severityName: string;
  errorMessage: string;
  stackTrace: string;
  innerException: string | null;
  controllerName: string | null;
  actionName: string | null;
  requestPath: string | null;
  requestMethod: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  queryString: string | null;
  requestBody: string | null;
  additionalData: string;
  timestamp: string;
  isReviewed: boolean;
  reviewedBy: string | null;
  reviewedAt: string | null;
}

export interface ErrorType {
  value: number;
  name: string;
  description: string;
}

export interface Severity {
  value: number;
  name: string;
  description: string;
}

export interface ErrorStatistics {
  totalErrors: number;
  dateRange: {
    startDate: string;
    endDate: string;
  };
  errorsByType: Array<{
    errorType: string;
    errorTypeValue: number;
    count: number;
    percentage: number;
  }>;
}

export interface ErrorStatisticsResponse {
  success: boolean;
  message: string;
  data: ErrorStatistics;
}

export interface ErrorDetailResponse {
  success: boolean;
  message: string;
  data: ErrorLog;
}

export interface ErrorTypesResponse {
  success: boolean;
  message: string;
  data: ErrorType[];
  totalTypes: number;
}

export interface SeveritiesResponse {
  success: boolean;
  message: string;
  data: Severity[];
}

export interface GetErrorLogsParams {
  page?: number;
  pageSize?: number;
  errorType?: number;
  severity?: number;
  isReviewed?: boolean;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface GetErrorLogsResponse {
  status: string;
  data: ErrorLog[];
  pagination: Pagination;
}

export interface GetStatisticsParams {
  startDate?: string;
  endDate?: string;
}

export interface CleanupParams {
  errorType: number;
  daysOld: number;
}

export interface ErrorFilters {
  errorType?: number;
  severity?: number;
  isReviewed?: boolean;
  startDate?: string;
  endDate?: string;
  search?: string;
}

