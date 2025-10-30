import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersApi, vendorOrdersApi } from "../ordersApi/ordersApi";
import type {
  GetOrdersParams,
  CancelOrderRequest,
  UpdateOrderStatusRequest,
  UpdatePaymentStatusRequest,
  GetVendorOrdersParams,
  UpdateVendorOrderStatusRequest,
} from "../types/order.types";

/**
 * Query keys for orders
 */
export const orderKeys = {
  all: ["orders"] as const,
  lists: () => [...orderKeys.all, "list"] as const,
  list: (params: GetOrdersParams) => [...orderKeys.lists(), params] as const,
  statistics: (params: { fromDate?: string; toDate?: string }) =>
    [...orderKeys.all, "statistics", params] as const,
  details: () => [...orderKeys.all, "detail"] as const,
  detail: (id: number) => [...orderKeys.details(), id] as const,
};

/**
 * Hook to fetch all orders with filters and pagination
 */
export const useOrders = (params: GetOrdersParams = {}) => {
  return useQuery({
    queryKey: orderKeys.list(params),
    queryFn: () => ordersApi.getAll(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Hook to fetch order statistics
 */
export const useOrderStatistics = (
  params: {
    fromDate?: string;
    toDate?: string;
  } = {}
) => {
  return useQuery({
    queryKey: orderKeys.statistics(params),
    queryFn: () => ordersApi.getStatistics(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch a single order by ID
 */
export const useOrder = (id: number) => {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => ordersApi.getById(id),
    enabled: !!id,
  });
};

/**
 * Hook to cancel an order
 */
export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CancelOrderRequest }) =>
      ordersApi.cancel(id, data),
    onSuccess: (_, variables) => {
      // Invalidate orders list and specific order detail
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: orderKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: orderKeys.statistics({}) });
    },
  });
};

/**
 * Hook to update order status
 */
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateOrderStatusRequest;
    }) => ordersApi.updateStatus(id, data),
    onSuccess: (_, variables) => {
      // Invalidate orders list and specific order detail
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: orderKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: orderKeys.statistics({}) });
    },
  });
};

/**
 * Hook to update payment status
 */
export const useUpdatePaymentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdatePaymentStatusRequest;
    }) => ordersApi.updatePaymentStatus(id, data),
    onSuccess: (_, variables) => {
      // Invalidate orders list and specific order detail
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: orderKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: orderKeys.statistics({}) });
    },
  });
};

/**
 * Vendor Orders Query Keys
 */
export const vendorOrderKeys = {
  all: ["vendorOrders"] as const,
  lists: () => [...vendorOrderKeys.all, "list"] as const,
  list: (vendorId: number, params: GetVendorOrdersParams) =>
    [...vendorOrderKeys.lists(), vendorId, params] as const,
};

/**
 * Hook to fetch vendor orders
 */
export const useVendorOrders = (
  vendorId: number,
  params: GetVendorOrdersParams = {}
  
) => {
  return useQuery({
    queryKey: vendorOrderKeys.list(vendorId, params),
    queryFn: () => vendorOrdersApi.getVendorOrders(vendorId, params),
    enabled: !!vendorId && vendorId > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Hook to update vendor order status
 * Only allows: Confirmed (2), Processing (3), Cancelled (6)
 */
export const useUpdateVendorOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      vendorId,
      orderId,
      data,
    }: {
      vendorId: number;
      orderId: number;
      data: UpdateVendorOrderStatusRequest;
    }) => vendorOrdersApi.updateVendorOrderStatus(vendorId, orderId, data),
    onSuccess: () => {
      // Invalidate vendor orders list and order detail
      queryClient.invalidateQueries({ queryKey: vendorOrderKeys.lists() });
      queryClient.invalidateQueries({ queryKey: orderKeys.details() });
    },
  });
};
