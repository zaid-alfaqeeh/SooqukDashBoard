import { AxiosApi } from "@/features/providers/AxiosProvider";
import { ENDPOINTS } from "@/config/api.config";
import type {
  GetErrorLogsParams,
  GetErrorLogsResponse,
  ErrorStatisticsResponse,
  GetStatisticsParams,
  ErrorDetailResponse,
  ErrorTypesResponse,
  SeveritiesResponse,
  CleanupParams,
} from "../types/errorLogs.types";

/**
 * Error Logs API
 */
export const errorLogsApi = {
  /**
   * Get all error logs with filters and pagination
   * Note: This endpoint may not exist yet, inferring from API pattern
   */
  getAll: async (
    params: GetErrorLogsParams = {}
  ): Promise<GetErrorLogsResponse> => {
    const {
      page = 1,
      pageSize = 20,
      errorType,
      severity,
      isReviewed,
      startDate,
      endDate,
      search,
    } = params;

    const queryParams: Record<string, string | number | boolean> = {
      pageNumber: page,
      pageSize,
    };

    if (errorType !== undefined) queryParams.errorType = errorType;
    if (severity !== undefined) queryParams.severity = severity;
    if (isReviewed !== undefined) queryParams.isReviewed = isReviewed;
    if (startDate) queryParams.startDate = startDate;
    if (endDate) queryParams.endDate = endDate;
    if (search) queryParams.search = search;

    const response = await AxiosApi.get<GetErrorLogsResponse>(
      ENDPOINTS.ERROR_LOGS.BASE,
      { params: queryParams }
    );
    return response.data;
  },

  /**
   * Get error log statistics
   */
  getStatistics: async (
    params: GetStatisticsParams = {}
  ): Promise<ErrorStatisticsResponse> => {
    const { startDate, endDate } = params;
    const queryParams: Record<string, string> = {};

    if (startDate) queryParams.startDate = startDate;
    if (endDate) queryParams.endDate = endDate;

    const response = await AxiosApi.get<ErrorStatisticsResponse>(
      ENDPOINTS.ERROR_LOGS.STATISTICS,
      { params: queryParams }
    );
    return response.data;
  },

  /**
   * Get error log by ID
   */
  getById: async (id: number): Promise<ErrorDetailResponse> => {
    const response = await AxiosApi.get<ErrorDetailResponse>(
      `${ENDPOINTS.ERROR_LOGS.BASE}/${id}`
    );
    return response.data;
  },

  /**
   * Get all error types
   */
  getTypes: async (): Promise<ErrorTypesResponse> => {
    const response = await AxiosApi.get<ErrorTypesResponse>(
      ENDPOINTS.ERROR_LOGS.TYPES
    );
    return response.data;
  },

  /**
   * Get all severity levels
   */
  getSeverities: async (): Promise<SeveritiesResponse> => {
    const response = await AxiosApi.get<SeveritiesResponse>(
      ENDPOINTS.ERROR_LOGS.SEVERITIES
    );
    return response.data;
  },

  /**
   * Mark error(s) as reviewed
   * Accepts single ID or array of IDs for bulk operations
   */
  markReviewed: async (ids: number | number[]): Promise<void> => {
    const errorLogIds = Array.isArray(ids) ? ids : [ids];
    await AxiosApi.post(ENDPOINTS.ERROR_LOGS.MARK_REVIEWED, {
      errorLogIds,
    });
  },

  /**
   * Delete error log(s)
   * Accepts single ID or array of IDs for bulk operations
   */
  delete: async (ids: number | number[]): Promise<void> => {
    const errorLogIds = Array.isArray(ids) ? ids : [ids];
    await AxiosApi.delete(ENDPOINTS.ERROR_LOGS.BASE, {
      data: errorLogIds,
    });
  },

  /**
   * Cleanup errors by type and age
   */
  cleanup: async (params: CleanupParams): Promise<void> => {
    const { errorType, daysOld } = params;
    await AxiosApi.delete(ENDPOINTS.ERROR_LOGS.CLEANUP, {
      params: {
        errorType,
        daysOld,
      },
    });
  },
};
