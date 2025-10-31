import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { errorLogsApi } from "../api/errorLogsApi";
import type {
  GetErrorLogsParams,
  GetStatisticsParams,
} from "../types/errorLogs.types";

/**
 * Query Keys
 */
export const errorLogsKeys = {
  all: ["errorLogs"] as const,
  lists: () => [...errorLogsKeys.all, "list"] as const,
  list: (params: GetErrorLogsParams) =>
    [...errorLogsKeys.lists(), params] as const,
  details: () => [...errorLogsKeys.all, "detail"] as const,
  detail: (id: number) => [...errorLogsKeys.details(), id] as const,
  statistics: (params: GetStatisticsParams) =>
    [...errorLogsKeys.all, "statistics", params] as const,
  types: () => [...errorLogsKeys.all, "types"] as const,
  severities: () => [...errorLogsKeys.all, "severities"] as const,
};

/**
 * Hook to fetch all error logs with filters and pagination
 */
export const useErrorLogs = (params: GetErrorLogsParams = {}) => {
  return useQuery({
    queryKey: errorLogsKeys.list(params),
    queryFn: () => errorLogsApi.getAll(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 1,
  });
};

/**
 * Hook to fetch error log statistics
 */
export const useErrorStatistics = (params: GetStatisticsParams = {}) => {
  return useQuery({
    queryKey: errorLogsKeys.statistics(params),
    queryFn: () => errorLogsApi.getStatistics(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

/**
 * Hook to fetch single error log by ID
 */
export const useErrorLog = (id: number | null) => {
  return useQuery({
    queryKey: errorLogsKeys.detail(id!),
    queryFn: () => errorLogsApi.getById(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch error types
 */
export const useErrorTypes = () => {
  return useQuery({
    queryKey: errorLogsKeys.types(),
    queryFn: () => errorLogsApi.getTypes(),
    staleTime: 30 * 60 * 1000, // 30 minutes (rarely changes)
    retry: 1,
  });
};

/**
 * Hook to fetch severity levels
 */
export const useSeverities = () => {
  return useQuery({
    queryKey: errorLogsKeys.severities(),
    queryFn: () => errorLogsApi.getSeverities(),
    staleTime: 30 * 60 * 1000, // 30 minutes (rarely changes)
    retry: 1,
  });
};

/**
 * Hook to mark error as reviewed
 */
export const useMarkErrorReviewed = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => errorLogsApi.markReviewed(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: errorLogsKeys.all });
    },
  });
};

/**
 * Hook to delete error log
 */
export const useDeleteErrorLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => errorLogsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: errorLogsKeys.all });
    },
  });
};

/**
 * Hook to cleanup errors by type
 */
export const useCleanupErrors = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { errorType: number; daysOld: number }) =>
      errorLogsApi.cleanup(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: errorLogsKeys.all });
    },
  });
};

