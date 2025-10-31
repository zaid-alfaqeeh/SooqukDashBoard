import { AxiosApi } from "@/features/providers/AxiosProvider";
import { ENDPOINTS } from "@/config/api.config";
import type {
  SubscriptionPlan,
  CreateSubscriptionPlanRequest,
  UpdateSubscriptionPlanRequest,
} from "../types/subscription.types";

/**
 * Subscription Plans API Service
 */
export const subscriptionsApi = {
  /**
   * Get all subscription plans
   */
  getAll: async (): Promise<SubscriptionPlan[]> => {
    const response = await AxiosApi.get<SubscriptionPlan[]>(
      ENDPOINTS.SUBSCRIPTIONS.PLANS
    );
    return response.data;
  },

  /**
   * Create a new subscription plan (Admin only)
   */
  create: async (
    data: CreateSubscriptionPlanRequest
  ): Promise<SubscriptionPlan> => {
    const response = await AxiosApi.post<SubscriptionPlan>(
      ENDPOINTS.SUBSCRIPTIONS.PLANS,
      data
    );
    return response.data;
  },

  /**
   * Update a subscription plan (Admin only)
   */
  update: async (
    data: UpdateSubscriptionPlanRequest
  ): Promise<SubscriptionPlan> => {
    const response = await AxiosApi.put<SubscriptionPlan>(
      `${ENDPOINTS.SUBSCRIPTIONS.PLANS}/${data.id}`,
      data
    );
    return response.data;
  },

  /**
   * Delete a subscription plan (Admin only)
   */
  delete: async (id: number): Promise<void> => {
    await AxiosApi.delete(`${ENDPOINTS.SUBSCRIPTIONS.PLANS}/${id}`);
  },
};
