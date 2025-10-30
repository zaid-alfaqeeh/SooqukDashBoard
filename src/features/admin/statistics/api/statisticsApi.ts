import { AxiosApi } from "@/features/providers/AxiosProvider";
import { ENDPOINTS } from "@/config/api.config";
import type {
  ComprehensiveStatistics,
  UserStatistics,
  DashboardOverview,
} from "../types/statistics.types";

export const statisticsApi = {
  /**
   * Get comprehensive admin statistics
   */
  getComprehensiveStatistics: async (): Promise<ComprehensiveStatistics> => {
    const response = await AxiosApi.get<ComprehensiveStatistics>(
      ENDPOINTS.ADMIN.COMPREHENSIVE_STATISTICS
    );
    return response.data;
  },

  /**
   * Get user statistics
   */
  getUserStatistics: async (): Promise<UserStatistics> => {
    const response = await AxiosApi.get<UserStatistics>(
      ENDPOINTS.ADMIN.STATISTICS
    );
    return response.data;
  },

  /**
   * Get dashboard overview with urgent items
   */
  getDashboardOverview: async (): Promise<DashboardOverview> => {
    const response = await AxiosApi.get<DashboardOverview>(
      ENDPOINTS.ADMIN.DASHBOARD_OVERVIEW
    );
    return response.data;
  },
};
