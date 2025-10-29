import { AxiosApi } from "@/features/providers/AxiosProvider";
import { ENDPOINTS } from "@/config/api.config";
import type {
  Color,
  Size,
  GetColorsParams,
  GetSizesParams,
  CreateColorRequest,
  UpdateColorRequest,
  CreateSizeRequest,
  UpdateSizeRequest,
} from "../types/colorsSizes.types";

/**
 * Colors API
 */
export const colorsApi = {
  /**
   * Get all colors with optional search
   */
  getAll: async (params: GetColorsParams = {}): Promise<Color[]> => {
    const response = await AxiosApi.get<Color[]>(
      ENDPOINTS.COLORS_SIZES.GET_COLORS,
      {
        params,
      }
    );
    return response.data;
  },

  /**
   * Create new color (Admin only)
   */
  create: async (data: CreateColorRequest): Promise<Color> => {
    const response = await AxiosApi.post<Color>(
      ENDPOINTS.COLORS_SIZES.ADD_COLOR,
      data
    );
    return response.data;
  },

  /**
   * Update color (Admin only)
   */
  update: async (id: number, data: UpdateColorRequest): Promise<Color> => {
    const response = await AxiosApi.put<Color>(
      `${ENDPOINTS.COLORS_SIZES.UPDATE_COLOR}/${id}`,
      data
    );
    return response.data;
  },

  /**
   * Delete color (Admin only)
   */
  delete: async (id: number): Promise<void> => {
    await AxiosApi.delete(`${ENDPOINTS.COLORS_SIZES.DELETE_COLOR}/${id}`);
  },
};

/**
 * Sizes API
 */
export const sizesApi = {
  /**
   * Get all sizes with optional search
   */
  getAll: async (params: GetSizesParams = {}): Promise<Size[]> => {
    const response = await AxiosApi.get<Size[]>(
      ENDPOINTS.COLORS_SIZES.GET_SIZES,
      {
        params,
      }
    );
    return response.data;
  },

  /**
   * Create new size (Admin only)
   */
  create: async (data: CreateSizeRequest): Promise<Size> => {
    const response = await AxiosApi.post<Size>(
      ENDPOINTS.COLORS_SIZES.ADD_SIZE,
      data
    );
    return response.data;
  },

  /**
   * Update size (Admin only)
   */
  update: async (id: number, data: UpdateSizeRequest): Promise<Size> => {
    const response = await AxiosApi.put<Size>(
      `${ENDPOINTS.COLORS_SIZES.UPDATE_SIZE}/${id}`,
      data
    );
    return response.data;
  },

  /**
   * Delete size (Admin only)
   */
  delete: async (id: number): Promise<void> => {
    await AxiosApi.delete(`${ENDPOINTS.COLORS_SIZES.DELETE_SIZE}/${id}`);
  },
};
