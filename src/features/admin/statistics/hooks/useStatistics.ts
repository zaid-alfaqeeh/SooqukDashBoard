import { useQuery } from "@tanstack/react-query";
import { statisticsApi } from "../api/statisticsApi";

export const STATISTICS_KEYS = {
  all: ["statistics"] as const,
  comprehensive: () => [...STATISTICS_KEYS.all, "comprehensive"] as const,
  users: () => [...STATISTICS_KEYS.all, "users"] as const,
  overview: () => [...STATISTICS_KEYS.all, "overview"] as const,
};

export const useComprehensiveStatistics = () => {
  return useQuery({
    queryKey: STATISTICS_KEYS.comprehensive(),
    queryFn: statisticsApi.getComprehensiveStatistics,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

export const useUserStatistics = () => {
  return useQuery({
    queryKey: STATISTICS_KEYS.users(),
    queryFn: statisticsApi.getUserStatistics,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

export const useDashboardOverview = () => {
  return useQuery({
    queryKey: STATISTICS_KEYS.overview(),
    queryFn: statisticsApi.getDashboardOverview,
    staleTime: 2 * 60 * 1000, // 2 minutes (more frequent updates for urgent items)
    refetchOnWindowFocus: true,
  });
};
