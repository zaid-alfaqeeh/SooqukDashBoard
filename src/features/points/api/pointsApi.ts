import { AxiosApi } from "@/features/providers/AxiosProvider";
import { ENDPOINTS } from "@/config/api.config";
import type {
  PointTerm,
  CreatePointTermRequest,
  UpdatePointTermRequest,
  PointsRedemptionConfig,
  UpdateRedemptionConfigRequest,
} from "../types/points.types";

/**
 * Points API - Point Terms (Referral Programs)
 */
export const pointTermsApi = {
  /**
   * Get all point terms
   */
  getAll: async (): Promise<PointTerm[]> => {
    const response = await AxiosApi.get<PointTerm[]>(
      ENDPOINTS.POINTS.GET_ALL_TERMS
    );
    return response.data;
  },

  /**
   * Create new point term (Admin only)
   */
  create: async (data: CreatePointTermRequest): Promise<PointTerm> => {
    const response = await AxiosApi.post<PointTerm>(
      ENDPOINTS.POINTS.CREATE_TERM,
      data
    );
    return response.data;
  },

  /**
   * Update point term (Admin only)
   */
  update: async (data: UpdatePointTermRequest): Promise<PointTerm> => {
    const { id, ...updateData } = data;
    const response = await AxiosApi.put<PointTerm>(
      `${ENDPOINTS.POINTS.UPDATE_TERM}/${id}`,
      { id, ...updateData }
    );
    return response.data;
  },

  /**
   * Delete point term (Admin only)
   */
  delete: async (id: number): Promise<void> => {
    await AxiosApi.delete(`${ENDPOINTS.POINTS.DELETE_TERM}/${id}`);
  },
};

/**
 * Points API - Redemption Configuration
 */
export const redemptionConfigApi = {
  /**
   * Get redemption configuration
   */
  get: async (): Promise<PointsRedemptionConfig> => {
    const response = await AxiosApi.get<PointsRedemptionConfig>(
      ENDPOINTS.POINTS.GET_REDEMPTION_CONFIG
    );
    return response.data;
  },

  /**
   * Update redemption configuration (Admin only)
   */
  update: async (
    data: UpdateRedemptionConfigRequest
  ): Promise<PointsRedemptionConfig> => {
    const response = await AxiosApi.put<PointsRedemptionConfig>(
      ENDPOINTS.POINTS.UPDATE_REDEMPTION_CONFIG,
      data
    );
    return response.data;
  },
};
