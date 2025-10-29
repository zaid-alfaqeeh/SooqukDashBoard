import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { pointTermsApi, redemptionConfigApi } from "../api/pointsApi";
import type {
  CreatePointTermRequest,
  UpdatePointTermRequest,
  UpdateRedemptionConfigRequest,
} from "../types/points.types";

/**
 * Query Keys
 */
const POINTS_KEYS = {
  all: ["points"] as const,
  terms: () => [...POINTS_KEYS.all, "terms"] as const,
  config: () => [...POINTS_KEYS.all, "config"] as const,
};

/**
 * Get all point terms
 */
export function usePointTerms() {
  return useQuery({
    queryKey: POINTS_KEYS.terms(),
    queryFn: () => pointTermsApi.getAll(),
  });
}

/**
 * Create point term
 */
export function useCreatePointTerm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePointTermRequest) => pointTermsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POINTS_KEYS.terms() });
    },
  });
}

/**
 * Update point term
 */
export function useUpdatePointTerm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePointTermRequest) => pointTermsApi.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POINTS_KEYS.terms() });
    },
  });
}

/**
 * Delete point term
 */
export function useDeletePointTerm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => pointTermsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POINTS_KEYS.terms() });
    },
  });
}

/**
 * Get redemption configuration
 */
export function useRedemptionConfig() {
  return useQuery({
    queryKey: POINTS_KEYS.config(),
    queryFn: () => redemptionConfigApi.get(),
  });
}

/**
 * Update redemption configuration
 */
export function useUpdateRedemptionConfig() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateRedemptionConfigRequest) =>
      redemptionConfigApi.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POINTS_KEYS.config() });
    },
  });
}
