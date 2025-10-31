import { AxiosApi } from "@/features/providers/AxiosProvider";
import { ENDPOINTS } from "@/config/api.config";
import type {
  CurrentSubscription,
  SubscriptionHistoryResponse,
  GetSubscriptionHistoryParams,
} from "../types/mySubscription.types";

/**
 * My Subscription API
 */
export const mySubscriptionApi = {
  /**
   * Get current subscription
   */
  getCurrentSubscription: async (): Promise<CurrentSubscription> => {
    const response = await AxiosApi.get<CurrentSubscription>(
      ENDPOINTS.MY_SUBSCRIPTION.CURRENT
    );
    return response.data;
  },

  /**
   * Get subscription history with pagination
   */
  getSubscriptionHistory: async (
    params: GetSubscriptionHistoryParams = {}
  ): Promise<SubscriptionHistoryResponse> => {
    const { pageNumber = 1, pageSize = 10 } = params;
    const response = await AxiosApi.get<SubscriptionHistoryResponse>(
      ENDPOINTS.MY_SUBSCRIPTION.HISTORY,
      {
        params: {
          pageNumber,
          pageSize,
        },
      }
    );
    return response.data;
  },
};
