import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { heroSlidersApi } from "../api/heroSlidersApi";
import type {
  CreateHeroSliderRequest,
  UpdateHeroSliderRequest,
} from "../types/heroSlider.types";

/**
 * Query Keys
 */
const HERO_SLIDERS_KEYS = {
  all: ["heroSliders"] as const,
  lists: () => [...HERO_SLIDERS_KEYS.all, "list"] as const,
  list: () => [...HERO_SLIDERS_KEYS.lists()] as const,
  details: () => [...HERO_SLIDERS_KEYS.all, "detail"] as const,
  detail: (id: number) => [...HERO_SLIDERS_KEYS.details(), id] as const,
};

/**
 * Get all hero sliders
 */
export function useHeroSliders() {
  return useQuery({
    queryKey: HERO_SLIDERS_KEYS.list(),
    queryFn: () => heroSlidersApi.getAll(),
  });
}

/**
 * Get single hero slider by ID
 */
export function useHeroSlider(id: number) {
  return useQuery({
    queryKey: HERO_SLIDERS_KEYS.detail(id),
    queryFn: () => heroSlidersApi.getById(id),
    enabled: !!id && id > 0,
  });
}

/**
 * Create hero slider
 */
export function useCreateHeroSlider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateHeroSliderRequest) => heroSlidersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: HERO_SLIDERS_KEYS.all });
    },
  });
}

/**
 * Update hero slider
 */
export function useUpdateHeroSlider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateHeroSliderRequest) => heroSlidersApi.update(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: HERO_SLIDERS_KEYS.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: HERO_SLIDERS_KEYS.all });
    },
  });
}

/**
 * Delete hero slider
 */
export function useDeleteHeroSlider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => heroSlidersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: HERO_SLIDERS_KEYS.all });
    },
  });
}
