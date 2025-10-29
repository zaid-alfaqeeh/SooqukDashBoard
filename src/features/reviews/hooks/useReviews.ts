import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewsApi } from "../api/reviewsApi";
import type {
  GetReviewsParams,
  UpdateReviewStatusRequest,
} from "../types/review.types";

/**
 * Query Keys
 */
export const REVIEWS_KEYS = {
  all: ["reviews"] as const,
  products: (params?: GetReviewsParams) =>
    [...REVIEWS_KEYS.all, "products", params] as const,
  vendors: (params?: GetReviewsParams) =>
    [...REVIEWS_KEYS.all, "vendors", params] as const,
  orders: (params?: GetReviewsParams) =>
    [...REVIEWS_KEYS.all, "orders", params] as const,
};

/**
 * Get product reviews
 */
export function useProductReviews(params?: GetReviewsParams) {
  return useQuery({
    queryKey: REVIEWS_KEYS.products(params),
    queryFn: () => reviewsApi.getProductReviews(params),
  });
}

/**
 * Get vendor reviews
 */
export function useVendorReviews(params?: GetReviewsParams) {
  return useQuery({
    queryKey: REVIEWS_KEYS.vendors(params),
    queryFn: () => reviewsApi.getVendorReviews(params),
  });
}

/**
 * Get order reviews
 */
export function useOrderReviews(params?: GetReviewsParams) {
  return useQuery({
    queryKey: REVIEWS_KEYS.orders(params),
    queryFn: () => reviewsApi.getOrderReviews(params),
  });
}

/**
 * Update product review status
 */
export function useUpdateProductReviewStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateReviewStatusRequest;
    }) => reviewsApi.updateProductReviewStatus(id, data),
    onSuccess: () => {
      // Invalidate all product reviews queries to refetch
      queryClient.invalidateQueries({
        queryKey: [...REVIEWS_KEYS.all, "products"],
      });
    },
  });
}

/**
 * Update vendor review status
 */
export function useUpdateVendorReviewStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateReviewStatusRequest;
    }) => reviewsApi.updateVendorReviewStatus(id, data),
    onSuccess: () => {
      // Invalidate all vendor reviews queries to refetch
      queryClient.invalidateQueries({
        queryKey: [...REVIEWS_KEYS.all, "vendors"],
      });
    },
  });
}

/**
 * Delete product review
 */
export function useDeleteProductReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => reviewsApi.deleteProductReview(id),
    onSuccess: () => {
      // Invalidate all product reviews queries to refetch
      queryClient.invalidateQueries({
        queryKey: [...REVIEWS_KEYS.all, "products"],
      });
    },
  });
}

/**
 * Delete vendor review
 */
export function useDeleteVendorReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => reviewsApi.deleteVendorReview(id),
    onSuccess: () => {
      // Invalidate all vendor reviews queries to refetch
      queryClient.invalidateQueries({
        queryKey: [...REVIEWS_KEYS.all, "vendors"],
      });
    },
  });
}
