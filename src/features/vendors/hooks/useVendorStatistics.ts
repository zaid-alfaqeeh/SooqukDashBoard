import { useQuery } from "@tanstack/react-query";
import { vendorApi } from "../api/vendorApi";
import type {
  GetVendorReviewsParams,
  GetVendorProductReviewsParams,
} from "../types/vendor.types";

/**
 * Query keys for vendor statistics
 */
export const vendorStatisticsKeys = {
  all: ["vendorStatistics"] as const,
  statistics: (vendorId: number) =>
    [...vendorStatisticsKeys.all, vendorId] as const,
};

/**
 * Hook to fetch vendor statistics
 */
export const useVendorStatistics = (vendorId: number) => {
  return useQuery({
    queryKey: vendorStatisticsKeys.statistics(vendorId),
    queryFn: () => vendorApi.getStatistics(vendorId),
    enabled: !!vendorId && vendorId > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Query keys for vendor reviews
 */
export const vendorReviewsKeys = {
  all: ["vendorReviews"] as const,
  lists: () => [...vendorReviewsKeys.all, "list"] as const,
  list: (vendorId: number, params: GetVendorReviewsParams) =>
    [...vendorReviewsKeys.lists(), vendorId, params] as const,
  statistics: (vendorId: number) =>
    [...vendorReviewsKeys.all, "statistics", vendorId] as const,
};

/**
 * Hook to fetch vendor reviews
 */
export const useVendorReviews = (
  vendorId: number,
  params: GetVendorReviewsParams = {}
) => {
  return useQuery({
    queryKey: vendorReviewsKeys.list(vendorId, params),
    queryFn: () => vendorApi.getReviews(vendorId, params),
    enabled: !!vendorId && vendorId > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Hook to fetch vendor review statistics
 */
export const useVendorReviewStatistics = (vendorId: number) => {
  return useQuery({
    queryKey: vendorReviewsKeys.statistics(vendorId),
    queryFn: () => vendorApi.getReviewStatistics(vendorId),
    enabled: !!vendorId && vendorId > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Query keys for vendor product reviews
 */
export const vendorProductReviewsKeys = {
  all: ["vendorProductReviews"] as const,
  lists: () => [...vendorProductReviewsKeys.all, "list"] as const,
  list: (params: GetVendorProductReviewsParams) =>
    [...vendorProductReviewsKeys.lists(), params] as const,
  statistics: () => [...vendorProductReviewsKeys.all, "statistics"] as const,
};

/**
 * Hook to fetch vendor product reviews
 */
export const useVendorProductReviews = (
  params: GetVendorProductReviewsParams = {}
) => {
  return useQuery({
    queryKey: vendorProductReviewsKeys.list(params),
    queryFn: () => vendorApi.getProductReviews(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Hook to fetch vendor product review statistics
 */
export const useVendorProductReviewStatistics = () => {
  return useQuery({
    queryKey: vendorProductReviewsKeys.statistics(),
    queryFn: () => vendorApi.getProductReviewStatistics(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
