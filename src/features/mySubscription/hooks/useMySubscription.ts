import { useQuery } from "@tanstack/react-query";
import { mySubscriptionApi } from "../api/mySubscriptionApi";
import type { GetSubscriptionHistoryParams } from "../types/mySubscription.types";

/**
 * Query Keys
 */
export const MY_SUBSCRIPTION_KEYS = {
  all: ["my-subscription"] as const,
  current: () => [...MY_SUBSCRIPTION_KEYS.all, "current"] as const,
  history: (params?: GetSubscriptionHistoryParams) =>
    [...MY_SUBSCRIPTION_KEYS.all, "history", params] as const,
};

/**
 * Hook to get current subscription
 */
export const useCurrentSubscription = () => {
  return useQuery({
    queryKey: MY_SUBSCRIPTION_KEYS.current(),
    queryFn: () => mySubscriptionApi.getCurrentSubscription(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

/**
 * Hook to get subscription history
 */
export const useSubscriptionHistory = (
  params: GetSubscriptionHistoryParams = {}
) => {
  return useQuery({
    queryKey: MY_SUBSCRIPTION_KEYS.history(params),
    queryFn: () => mySubscriptionApi.getSubscriptionHistory(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};
