import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tagsApi } from "../api/tagsApi";
import type { CreateTagRequest, UpdateTagRequest } from "../types/tag.types";

/**
 * Query Keys
 */
const TAGS_KEYS = {
  all: ["tags"] as const,
  lists: () => [...TAGS_KEYS.all, "list"] as const,
  list: () => [...TAGS_KEYS.lists()] as const,
};

/**
 * Get all tags
 */
export function useTags() {
  return useQuery({
    queryKey: TAGS_KEYS.list(),
    queryFn: () => tagsApi.getAll(),
  });
}

/**
 * Create tag
 */
export function useCreateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTagRequest) => tagsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TAGS_KEYS.all });
    },
  });
}

/**
 * Update tag
 */
export function useUpdateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateTagRequest) => tagsApi.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TAGS_KEYS.all });
    },
  });
}

/**
 * Delete tag
 */
export function useDeleteTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => tagsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TAGS_KEYS.all });
    },
  });
}
