import { AxiosApi } from "@/features/providers/AxiosProvider";
import { ENDPOINTS } from "@/config/api.config";
import type {
  VendorSubscription,
  CreateVendorSubscriptionRequest,
  UpdateVendorSubscriptionRequest,
} from "../types/vendorSubscription.types";

export const vendorSubscriptionApi = {
  /**
   * Get all vendor subscriptions
   */
  getAll: async (): Promise<VendorSubscription[]> => {
    const response = await AxiosApi.get<VendorSubscription[]>(
      ENDPOINTS.VENDOR_SUBSCRIPTIONS.GET_ALL
    );
    return response.data;
  },

  /**
   * Create a new vendor subscription
   */
  create: async (data: CreateVendorSubscriptionRequest): Promise<void> => {
    await AxiosApi.post(ENDPOINTS.VENDOR_SUBSCRIPTIONS.CREATE, data);
  },

  /**
   * Update a vendor subscription
   */
  update: async (
    id: number,
    data: UpdateVendorSubscriptionRequest
  ): Promise<void> => {
    await AxiosApi.put(`${ENDPOINTS.VENDOR_SUBSCRIPTIONS.UPDATE}/${id}`, data);
  },

  /**
   * Delete a vendor subscription
   */
  delete: async (id: number): Promise<void> => {
    await AxiosApi.delete(`${ENDPOINTS.VENDOR_SUBSCRIPTIONS.DELETE}/${id}`);
  },
};
