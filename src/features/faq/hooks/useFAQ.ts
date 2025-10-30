import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { faqApi } from "../api/faqApi";
import type { CreateFAQRequest, UpdateFAQRequest } from "../types/faq.types";

export const FAQ_KEYS = {
  all: ["faqs"] as const,
  list: () => [...FAQ_KEYS.all, "list"] as const,
};

/**
 * Hook to get all FAQs
 */
export const useFAQs = () => {
  return useQuery({
    queryKey: FAQ_KEYS.list(),
    queryFn: faqApi.getAllFAQs,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to create a new FAQ
 */
export const useCreateFAQ = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFAQRequest) => faqApi.createFAQ(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FAQ_KEYS.all });
    },
  });
};

/**
 * Hook to update an FAQ
 */
export const useUpdateFAQ = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateFAQRequest }) =>
      faqApi.updateFAQ(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FAQ_KEYS.all });
    },
  });
};

/**
 * Hook to delete an FAQ
 */
export const useDeleteFAQ = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => faqApi.deleteFAQ(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FAQ_KEYS.all });
    },
  });
};
