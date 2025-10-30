import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { vendorSubscriptionApi } from "../api/vendorSubscriptionApi";
import type {
  CreateVendorSubscriptionRequest,
  UpdateVendorSubscriptionRequest,
} from "../types/vendorSubscription.types";

export const VENDOR_SUBSCRIPTION_KEYS = {
  all: ["vendorSubscriptions"] as const,
  list: () => [...VENDOR_SUBSCRIPTION_KEYS.all, "list"] as const,
};

/**
 * Hook to get all vendor subscriptions
 */
export const useVendorSubscriptions = () => {
  return useQuery({
    queryKey: VENDOR_SUBSCRIPTION_KEYS.list(),
    queryFn: vendorSubscriptionApi.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to create a vendor subscription
 */
export const useCreateVendorSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateVendorSubscriptionRequest) =>
      vendorSubscriptionApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: VENDOR_SUBSCRIPTION_KEYS.all,
      });
    },
  });
};

/**
 * Hook to update a vendor subscription
 */
export const useUpdateVendorSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateVendorSubscriptionRequest;
    }) => vendorSubscriptionApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: VENDOR_SUBSCRIPTION_KEYS.all,
      });
    },
  });
};

/**
 * Hook to delete a vendor subscription
 */
export const useDeleteVendorSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => vendorSubscriptionApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: VENDOR_SUBSCRIPTION_KEYS.all,
      });
    },
  });
};
