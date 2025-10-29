import { AxiosApi } from "@/features/providers/AxiosProvider";
import { ENDPOINTS } from "@/config/api.config";
import type {
  Coupon,
  CreateCouponRequest,
  UpdateCouponRequest,
} from "../types/coupon.types";

/**
 * Coupons API
 */
export const couponsApi = {
  /**
   * Get all coupons
   */
  getAll: async (): Promise<Coupon[]> => {
    const response = await AxiosApi.get<Coupon[]>(ENDPOINTS.COUPONS.GET_ALL);
    return response.data;
  },

  /**
   * Create new coupon (Admin only)
   */
  create: async (data: CreateCouponRequest): Promise<Coupon> => {
    const response = await AxiosApi.post<Coupon>(
      ENDPOINTS.COUPONS.CREATE,
      data
    );
    return response.data;
  },

  /**
   * Update coupon (Admin only)
   */
  update: async (data: UpdateCouponRequest): Promise<Coupon> => {
    const { id, ...updateData } = data;
    const response = await AxiosApi.put<Coupon>(
      `${ENDPOINTS.COUPONS.UPDATE}/${id}`,
      updateData
    );
    return response.data;
  },

  /**
   * Delete coupon (Admin only)
   */
  delete: async (id: number): Promise<void> => {
    await AxiosApi.delete(`${ENDPOINTS.COUPONS.DELETE}/${id}`);
  },
};
