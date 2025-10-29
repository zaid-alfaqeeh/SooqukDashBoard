import { AxiosApi } from "@/features/providers/AxiosProvider";
import { ENDPOINTS } from "@/config/api.config";
import type {
  GetShippingOrdersParams,
  GetShippingOrdersResponse,
  ShippingOrderDetail,
  UpdateShippingOrderStatusRequest,
  ShippingStatistics,
} from "../types/shipping.types";

/**
 * Shipping API
 */
export const shippingApi = {
  /**
   * Get all shipping orders with filters and pagination
   */
  getAll: async (
    params: GetShippingOrdersParams = {}
  ): Promise<GetShippingOrdersResponse> => {
    const response = await AxiosApi.get<GetShippingOrdersResponse>(
      ENDPOINTS.SHIPPING.ORDERS,
      { params }
    );
    return response.data;
  },

  /**
   * Get shipping order details by ID
   */
  getById: async (id: number): Promise<ShippingOrderDetail> => {
    const response = await AxiosApi.get<ShippingOrderDetail>(
      `${ENDPOINTS.SHIPPING.ORDERS}/${id}`
    );
    return response.data;
  },

  /**
   * Update shipping order status (only 4=Shipped, 5=Delivered, 6=Cancelled)
   */
  updateStatus: async (
    id: number,
    data: UpdateShippingOrderStatusRequest
  ): Promise<void> => {
    await AxiosApi.put(`${ENDPOINTS.SHIPPING.ORDERS}/${id}/status`, data);
  },

  /**
   * Get shipping statistics
   */
  getStatistics: async (): Promise<ShippingStatistics> => {
    const response = await AxiosApi.get<ShippingStatistics>(
      ENDPOINTS.SHIPPING.STATISTICS
    );
    return response.data;
  },
};
