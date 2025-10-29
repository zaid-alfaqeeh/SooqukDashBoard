import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { subCategoriesApi } from "../subCategoryApi/subCategoryApi";
import type {
  GetSubCategoriesParams,
  CreateSubCategoryRequest,
  UpdateSubCategoryRequest,
} from "../types/subCategory.types";

/**
 * Query keys for subcategories
 */
export const subCategoryKeys = {
  all: ["subCategories"] as const,
  lists: () => [...subCategoryKeys.all, "list"] as const,
  list: (params: GetSubCategoriesParams) =>
    [...subCategoryKeys.lists(), params] as const,
};

/**
 * Hook to fetch all subcategories with filters and pagination
 */
export const useSubCategories = (params: GetSubCategoriesParams) => {
  return useQuery({
    queryKey: subCategoryKeys.list(params),
    queryFn: () => subCategoriesApi.getAll(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    enabled: !!params.categoryId,
  });
};

/**
 * Hook to create a new subcategory
 */
export const useCreateSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSubCategoryRequest) =>
      subCategoriesApi.create(data),
    onSuccess: () => {
      // Invalidate all subcategory lists
      queryClient.invalidateQueries({ queryKey: subCategoryKeys.lists() });
    },
  });
};

/**
 * Hook to update a subcategory
 */
export const useUpdateSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateSubCategoryRequest;
    }) => subCategoriesApi.update(id, data),
    onSuccess: () => {
      // Invalidate all subcategory lists
      queryClient.invalidateQueries({ queryKey: subCategoryKeys.lists() });
    },
  });
};

/**
 * Hook to delete a subcategory
 */
export const useDeleteSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => subCategoriesApi.delete(id),
    onSuccess: () => {
      // Invalidate all subcategory lists
      queryClient.invalidateQueries({ queryKey: subCategoryKeys.lists() });
    },
  });
};
