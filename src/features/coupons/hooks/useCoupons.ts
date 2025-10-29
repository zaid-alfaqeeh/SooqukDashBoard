import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { couponsApi } from "../api/couponsApi";
import type {
  CreateCouponRequest,
  UpdateCouponRequest,
} from "../types/coupon.types";

/**
 * Query Keys
 */
const COUPONS_KEYS = {
  all: ["coupons"] as const,
  lists: () => [...COUPONS_KEYS.all, "list"] as const,
  list: () => [...COUPONS_KEYS.lists()] as const,
};

/**
 * Get all coupons
 */
export function useCoupons() {
  return useQuery({
    queryKey: COUPONS_KEYS.list(),
    queryFn: () => couponsApi.getAll(),
  });
}

/**
 * Create coupon
 */
export function useCreateCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCouponRequest) => couponsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COUPONS_KEYS.all });
    },
  });
}

/**
 * Update coupon
 */
export function useUpdateCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateCouponRequest) => couponsApi.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COUPONS_KEYS.all });
    },
  });
}

/**
 * Delete coupon
 */
export function useDeleteCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => couponsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COUPONS_KEYS.all });
    },
  });
}
