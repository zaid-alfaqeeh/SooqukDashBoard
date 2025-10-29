import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { subscriptionsApi } from "../api/subscriptionsApi";
import type {
  CreateSubscriptionPlanRequest,
  UpdateSubscriptionPlanRequest,
} from "../types/subscription.types";

/**
 * Query keys for subscription plans
 */
export const subscriptionKeys = {
  all: ["subscriptionPlans"] as const,
  lists: () => [...subscriptionKeys.all, "list"] as const,
  list: (filters: string) =>
    [...subscriptionKeys.lists(), { filters }] as const,
  details: () => [...subscriptionKeys.all, "detail"] as const,
  detail: (id: number) => [...subscriptionKeys.details(), id] as const,
};

/**
 * Hook to fetch all subscription plans
 * Uses global staleTime from ReactQueryProvider (5 minutes)
 */
export const useSubscriptionPlans = () => {
  return useQuery({
    queryKey: subscriptionKeys.lists(),
    queryFn: subscriptionsApi.getAll,
  });
};

/**
 * Hook to fetch a single subscription plan by ID
 * Uses global staleTime from ReactQueryProvider (5 minutes)
 */
export const useSubscriptionPlan = (id: number) => {
  return useQuery({
    queryKey: subscriptionKeys.detail(id),
    queryFn: () => subscriptionsApi.getById(id),
    enabled: !!id,
  });
};

/**
 * Hook to create a subscription plan
 */
export const useCreateSubscriptionPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSubscriptionPlanRequest) =>
      subscriptionsApi.create(data),
    onSuccess: () => {
      // Invalidate and refetch subscription plans queries
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.all });
    },
  });
};

/**
 * Hook to update a subscription plan
 */
export const useUpdateSubscriptionPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateSubscriptionPlanRequest) =>
      subscriptionsApi.update(data),
    onSuccess: (_, variables) => {
      // Invalidate specific plan and lists
      queryClient.invalidateQueries({
        queryKey: subscriptionKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.all });
    },
  });
};

/**
 * Hook to delete a subscription plan
 */
export const useDeleteSubscriptionPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => subscriptionsApi.delete(id),
    onSuccess: () => {
      // Invalidate all subscription plans queries
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.all });
    },
  });
};
