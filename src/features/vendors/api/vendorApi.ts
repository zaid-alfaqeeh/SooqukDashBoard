import { AxiosApi } from "@/features/providers/AxiosProvider";
import { ENDPOINTS } from "@/config/api.config";
import type {
  VendorStatistics,
  GetVendorReviewsParams,
  GetVendorReviewsResponse,
  VendorReviewStatistics,
  GetVendorProductReviewsParams,
  GetVendorProductReviewsResponse,
  VendorProductReviewStatistics,
} from "../types/vendor.types";

/**
 * Vendor API
 */
export const vendorApi = {
  /**
   * Get vendor statistics
   */
  getStatistics: async (vendorId: number): Promise<VendorStatistics> => {
    const response = await AxiosApi.get<VendorStatistics>(
      `${ENDPOINTS.VENDOR.STATISTICS}/${vendorId}/statistics`
    );
    return response.data;
  },

  /**
   * Get vendor reviews
   */
  getReviews: async (
    vendorId: number,
    params: GetVendorReviewsParams = {}
  ): Promise<GetVendorReviewsResponse> => {
    const response = await AxiosApi.get<GetVendorReviewsResponse>(
      `${ENDPOINTS.VENDOR.REVIEWS}/${vendorId}`,
      { params }
    );
    return response.data;
  },

  /**
   * Get vendor review statistics
   */
  getReviewStatistics: async (
    vendorId: number
  ): Promise<VendorReviewStatistics> => {
    const response = await AxiosApi.get<VendorReviewStatistics>(
      `${ENDPOINTS.VENDOR.REVIEWS}/${vendorId}/statistics`
    );
    return response.data;
  },

  /**
   * Get vendor product reviews
   */
  getProductReviews: async (
    params: GetVendorProductReviewsParams = {}
  ): Promise<GetVendorProductReviewsResponse> => {
    const response = await AxiosApi.get<GetVendorProductReviewsResponse>(
      `${ENDPOINTS.VENDOR.PRODUCT_REVIEWS}/reviews`,
      { params }
    );
    return response.data;
  },

  /**
   * Get vendor product review statistics
   */
  getProductReviewStatistics:
    async (): Promise<VendorProductReviewStatistics> => {
      const response = await AxiosApi.get<VendorProductReviewStatistics>(
        `${ENDPOINTS.VENDOR.PRODUCT_REVIEWS}/statistics`
      );
      return response.data;
    },
};
