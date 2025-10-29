import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { districtsApi } from "../api/locationApi";
import type {
  CreateDistrictRequest,
  UpdateDistrictRequest,
} from "../types/location.types";

/**
 * Query keys for districts
 */
export const districtKeys = {
  all: ["districts"] as const,
  lists: () => [...districtKeys.all, "list"] as const,
  list: (filters: string) => [...districtKeys.lists(), { filters }] as const,
  byCityId: (cityId: number) =>
    [...districtKeys.all, "byCity", cityId] as const,
  details: () => [...districtKeys.all, "detail"] as const,
  detail: (id: number) => [...districtKeys.details(), id] as const,
};

/**
 * Hook to fetch all districts
 */
export const useDistricts = () => {
  return useQuery({
    queryKey: districtKeys.lists(),
    queryFn: districtsApi.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch districts by city ID
 */
export const useDistrictsByCityId = (cityId: number | null) => {
  return useQuery({
    queryKey: cityId ? districtKeys.byCityId(cityId) : ["districts", "empty"],
    queryFn: () => districtsApi.getByCityId(cityId!),
    enabled: !!cityId,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook to fetch a single district by ID
 */
export const useDistrict = (id: number) => {
  return useQuery({
    queryKey: districtKeys.detail(id),
    queryFn: () => districtsApi.getById(id),
    enabled: !!id,
  });
};

/**
 * Hook to create a new district
 */
export const useCreateDistrict = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDistrictRequest) => districtsApi.create(data),
    onSuccess: () => {
      // Invalidate and refetch districts queries
      queryClient.invalidateQueries({ queryKey: districtKeys.all });
    },
  });
};

/**
 * Hook to update a district
 */
export const useUpdateDistrict = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateDistrictRequest) => districtsApi.update(data),
    onSuccess: (_, variables) => {
      // Invalidate specific district and lists
      queryClient.invalidateQueries({
        queryKey: districtKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: districtKeys.all });
    },
  });
};

/**
 * Hook to delete a district
 */
export const useDeleteDistrict = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => districtsApi.delete(id),
    onSuccess: () => {
      // Invalidate all districts queries
      queryClient.invalidateQueries({ queryKey: districtKeys.all });
    },
  });
};
