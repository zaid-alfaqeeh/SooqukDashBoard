import { AxiosApi } from "@/features/providers/AxiosProvider";
import { ENDPOINTS } from "@/config/api.config";
import type {
  HeroSlider,
  CreateHeroSliderRequest,
  UpdateHeroSliderRequest,
} from "../types/heroSlider.types";

/**
 * Hero Sliders API
 */
export const heroSlidersApi = {
  /**
   * Get all hero sliders
   */
  getAll: async (): Promise<HeroSlider[]> => {
    const response = await AxiosApi.get<HeroSlider[]>(
      ENDPOINTS.HERO_SLIDERS.BASE
    );
    return response.data;
  },

  /**
   * Get hero slider by ID
   */
  getById: async (id: number): Promise<HeroSlider> => {
    const response = await AxiosApi.get<HeroSlider>(
      `${ENDPOINTS.HERO_SLIDERS.BASE}/${id}`
    );
    return response.data;
  },

  /**
   * Create new hero slider (Admin only)
   */
  create: async (data: CreateHeroSliderRequest): Promise<HeroSlider> => {
    const formData = new FormData();

    formData.append("Title", data.Title);
    if (data.ImageFile) {
      formData.append("ImageFile", data.ImageFile);
    }
    formData.append("IsActive", String(data.IsActive));
    formData.append("SortOrder", String(data.SortOrder));

    const response = await AxiosApi.post<HeroSlider>(
      ENDPOINTS.HERO_SLIDERS.BASE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  /**
   * Update hero slider (Admin only)
   */
  update: async (data: UpdateHeroSliderRequest): Promise<HeroSlider> => {
    const formData = new FormData();

    formData.append("Title", data.Title);
    if (data.ImageFile) {
      formData.append("ImageFile", data.ImageFile);
    }
    formData.append("IsActive", String(data.IsActive));
    formData.append("SortOrder", String(data.SortOrder));

    const response = await AxiosApi.put<HeroSlider>(
      `${ENDPOINTS.HERO_SLIDERS.BASE}/${data.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  /**
   * Delete hero slider (Admin only)
   */
  delete: async (id: number): Promise<void> => {
    await AxiosApi.delete(`${ENDPOINTS.HERO_SLIDERS.BASE}/${id}`);
  },
};
