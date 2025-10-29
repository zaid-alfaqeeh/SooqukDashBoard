import { AxiosApi } from "@/features/providers/AxiosProvider";
import { ENDPOINTS } from "@/config/api.config";
import type {
  GetOrdersParams,
  GetOrdersResponse,
  GetOrderDetailResponse,
  GetStatisticsResponse,
  CancelOrderRequest,
  UpdateOrderStatusRequest,
  UpdatePaymentStatusRequest,
} from "../types/order.types";

/**
 * Orders API
 */
export const ordersApi = {
  /**
   * Get all orders with filters and pagination
   */
  getAll: async (params: GetOrdersParams = {}): Promise<GetOrdersResponse> => {
    const response = await AxiosApi.get<GetOrdersResponse>(
      ENDPOINTS.ORDERS.BASE,
      { params }
    );
    return response.data;
  },

  /**
   * Get order statistics
   */
  getStatistics: async (params: {
    fromDate?: string;
    toDate?: string;
  }): Promise<GetStatisticsResponse> => {
    const response = await AxiosApi.get<GetStatisticsResponse>(
      ENDPOINTS.ORDERS.STATISTICS,
      { params }
    );
    return response.data;
  },

  /**
   * Get order details by ID
   */
  getById: async (id: number): Promise<GetOrderDetailResponse> => {
    const response = await AxiosApi.get<GetOrderDetailResponse>(
      `${ENDPOINTS.ORDERS.ADMIN_ORDER}/${id}`
    );
    return response.data;
  },

  /**
   * Cancel an order
   */
  cancel: async (id: number, data: CancelOrderRequest): Promise<void> => {
    await AxiosApi.post(`${ENDPOINTS.ORDERS.BASE}/${id}/cancel`, data);
  },

  /**
   * Update order status
   */
  updateStatus: async (
    id: number,
    data: UpdateOrderStatusRequest
  ): Promise<void> => {
    await AxiosApi.patch(`${ENDPOINTS.ORDERS.BASE}/${id}/status`, data);
  },

  /**
   * Update payment status
   */
  updatePaymentStatus: async (
    id: number,
    data: UpdatePaymentStatusRequest
  ): Promise<void> => {
    await AxiosApi.patch(`${ENDPOINTS.ORDERS.BASE}/${id}/payment-status`, data);
  },
};
