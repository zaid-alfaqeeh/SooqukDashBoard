import { useQuery } from "@tanstack/react-query";
import { citiesApi } from "../api/locationApi";

/**
 * Query keys for cities
 */
export const cityKeys = {
  all: ["cities"] as const,
  lists: () => [...cityKeys.all, "list"] as const,
  list: (filters: string) => [...cityKeys.lists(), { filters }] as const,
  details: () => [...cityKeys.all, "detail"] as const,
  detail: (id: number) => [...cityKeys.details(), id] as const,
};

/**
 * Hook to fetch all cities
 */
export const useCities = () => {
  return useQuery({
    queryKey: cityKeys.lists(),
    queryFn: citiesApi.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch a single city by ID
 */
export const useCity = (id: number) => {
  return useQuery({
    queryKey: cityKeys.detail(id),
    queryFn: () => citiesApi.getById(id),
    enabled: !!id,
  });
};
