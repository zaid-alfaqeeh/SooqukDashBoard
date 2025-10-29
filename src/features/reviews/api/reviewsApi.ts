import { AxiosApi } from "@/features/providers/AxiosProvider";
import { ENDPOINTS } from "@/config/api.config";
import type {
  ProductReview,
  VendorReview,
  OrderReview,
  ProductReviewsResponse,
  WrappedReviewsResponse,
  GetReviewsParams,
  PaginationInfo,
  UpdateReviewStatusRequest,
} from "../types/review.types";

/**
 * Reviews API
 */
export const reviewsApi = {
  /**
   * Get product reviews (Admin only)
   */
  getProductReviews: async (
    params?: GetReviewsParams
  ): Promise<ProductReviewsResponse> => {
    const response = await AxiosApi.get<ProductReviewsResponse>(
      ENDPOINTS.REVIEWS.PRODUCTS,
      { params }
    );
    return response.data;
  },

  /**
   * Get vendor reviews (Admin only)
   */
  getVendorReviews: async (
    params?: GetReviewsParams
  ): Promise<{ items: VendorReview[] } & PaginationInfo> => {
    const response = await AxiosApi.get<WrappedReviewsResponse<VendorReview>>(
      ENDPOINTS.REVIEWS.VENDORS,
      { params }
    );
    return response.data.data;
  },

  /**
   * Get order reviews (Admin only)
   */
  getOrderReviews: async (
    params?: GetReviewsParams
  ): Promise<{ items: OrderReview[] } & PaginationInfo> => {
    const response = await AxiosApi.get<WrappedReviewsResponse<OrderReview>>(
      ENDPOINTS.REVIEWS.ORDERS,
      { params }
    );
    return response.data.data;
  },

  /**
   * Update product review status (Admin only)
   * @param id - Review ID
   * @param status - New status (0=Pending, 1=Approved, 2=Rejected)
   */
  updateProductReviewStatus: async (
    id: number,
    data: UpdateReviewStatusRequest
  ): Promise<void> => {
    await AxiosApi.put(
      `${ENDPOINTS.REVIEWS.UPDATE_PRODUCT_STATUS}/${id}/status`,
      data
    );
  },

  /**
   * Update vendor review status (Admin only)
   * @param id - Review ID
   * @param status - New status (0=Pending, 1=Approved, 2=Rejected)
   */
  updateVendorReviewStatus: async (
    id: number,
    data: UpdateReviewStatusRequest
  ): Promise<void> => {
    await AxiosApi.put(
      `${ENDPOINTS.REVIEWS.UPDATE_VENDOR_STATUS}/${id}/status`,
      data
    );
  },

  /**
   * Delete product review (Admin only)
   * @param id - Review ID
   */
  deleteProductReview: async (id: number): Promise<void> => {
    await AxiosApi.delete(`${ENDPOINTS.REVIEWS.DELETE_PRODUCT}/${id}`);
  },

  /**
   * Delete vendor review (Admin only)
   * @param id - Review ID
   */
  deleteVendorReview: async (id: number): Promise<void> => {
    await AxiosApi.delete(`${ENDPOINTS.REVIEWS.DELETE_VENDOR}/${id}`);
  },
};
