import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { colorsApi, sizesApi } from "../api/colorsSizesApi";
import type {
  GetColorsParams,
  GetSizesParams,
  CreateColorRequest,
  UpdateColorRequest,
  CreateSizeRequest,
  UpdateSizeRequest,
} from "../types/colorsSizes.types";

/**
 * Query keys for colors and sizes
 */
export const colorsSizesKeys = {
  colors: ["colors"] as const,
  colorsList: (params: GetColorsParams) =>
    [...colorsSizesKeys.colors, params] as const,
  sizes: ["sizes"] as const,
  sizesList: (params: GetSizesParams) =>
    [...colorsSizesKeys.sizes, params] as const,
};

/**
 * Hook to fetch all colors
 */
export const useColors = (params: GetColorsParams = {}) => {
  return useQuery({
    queryKey: colorsSizesKeys.colorsList(params),
    queryFn: () => colorsApi.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to create a new color
 */
export const useCreateColor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateColorRequest) => colorsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: colorsSizesKeys.colors });
    },
  });
};

/**
 * Hook to update a color
 */
export const useUpdateColor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateColorRequest }) =>
      colorsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: colorsSizesKeys.colors });
    },
  });
};

/**
 * Hook to delete a color
 */
export const useDeleteColor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => colorsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: colorsSizesKeys.colors });
    },
  });
};

/**
 * Hook to fetch all sizes
 */
export const useSizes = (params: GetSizesParams = {}) => {
  return useQuery({
    queryKey: colorsSizesKeys.sizesList(params),
    queryFn: () => sizesApi.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to create a new size
 */
export const useCreateSize = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSizeRequest) => sizesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: colorsSizesKeys.sizes });
    },
  });
};

/**
 * Hook to update a size
 */
export const useUpdateSize = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateSizeRequest }) =>
      sizesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: colorsSizesKeys.sizes });
    },
  });
};

/**
 * Hook to delete a size
 */
export const useDeleteSize = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => sizesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: colorsSizesKeys.sizes });
    },
  });
};
