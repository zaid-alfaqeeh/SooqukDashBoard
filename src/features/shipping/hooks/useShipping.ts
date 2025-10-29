import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { shippingApi } from "../api/shippingApi";
import type {
  GetShippingOrdersParams,
  UpdateShippingOrderStatusRequest,
} from "../types/shipping.types";

/**
 * Query Keys
 */
const SHIPPING_KEYS = {
  all: ["shipping"] as const,
  orders: () => [...SHIPPING_KEYS.all, "orders"] as const,
  ordersList: (params: GetShippingOrdersParams) =>
    [...SHIPPING_KEYS.orders(), params] as const,
  order: (id: number) => [...SHIPPING_KEYS.orders(), id] as const,
  statistics: () => [...SHIPPING_KEYS.all, "statistics"] as const,
};

/**
 * Get all shipping orders with filters
 */
export function useShippingOrders(params: GetShippingOrdersParams = {}) {
  return useQuery({
    queryKey: SHIPPING_KEYS.ordersList(params),
    queryFn: () => shippingApi.getAll(params),
  });
}

/**
 * Get single shipping order by ID
 */
export function useShippingOrder(id: number) {
  return useQuery({
    queryKey: SHIPPING_KEYS.order(id),
    queryFn: () => shippingApi.getById(id),
    enabled: !!id && id > 0,
  });
}

/**
 * Get shipping statistics
 */
export function useShippingStatistics() {
  return useQuery({
    queryKey: SHIPPING_KEYS.statistics(),
    queryFn: () => shippingApi.getStatistics(),
  });
}

/**
 * Update shipping order status
 */
export function useUpdateShippingOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateShippingOrderStatusRequest;
    }) => shippingApi.updateStatus(id, data),
    onSuccess: (_, variables) => {
      // Invalidate orders list
      queryClient.invalidateQueries({ queryKey: SHIPPING_KEYS.orders() });
      // Invalidate specific order
      queryClient.invalidateQueries({
        queryKey: SHIPPING_KEYS.order(variables.id),
      });
      // Invalidate statistics
      queryClient.invalidateQueries({ queryKey: SHIPPING_KEYS.statistics() });
    },
  });
}
