import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesApi } from "../categoriesApi/categoriesApi";
import type {
  GetCategoriesParams,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "../types/category.types";

/**
 * Query keys for categories
 */
export const categoryKeys = {
  all: ["categories"] as const,
  lists: () => [...categoryKeys.all, "list"] as const,
  list: (params: GetCategoriesParams) =>
    [...categoryKeys.lists(), params] as const,
  details: () => [...categoryKeys.all, "detail"] as const,
  detail: (id: number) => [...categoryKeys.details(), id] as const,
};

/**
 * Hook to fetch all categories with pagination and search
 */
export const useCategories = (params: GetCategoriesParams = {}) => {
  return useQuery({
    queryKey: categoryKeys.list(params),
    queryFn: () => categoriesApi.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch a single category by ID
 */
export const useCategory = (id: number) => {
  return useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: () => categoriesApi.getById(id),
    enabled: !!id,
  });
};

/**
 * Hook to create a new category
 */
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryRequest) => categoriesApi.create(data),
    onSuccess: () => {
      // Invalidate and refetch categories queries
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
};

/**
 * Hook to update a category
 */
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateCategoryRequest) => categoriesApi.update(data),
    onSuccess: (_, variables) => {
      // Invalidate specific category and lists
      queryClient.invalidateQueries({
        queryKey: categoryKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
};

/**
 * Hook to delete a category
 */
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => categoriesApi.delete(id),
    onSuccess: () => {
      // Invalidate all categories queries
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
};
