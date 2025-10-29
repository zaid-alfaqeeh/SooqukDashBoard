import { AxiosApi } from "@/features/providers/AxiosProvider";
import { ENDPOINTS } from "@/config/api.config";
import type {
  GetSubCategoriesParams,
  GetSubCategoriesResponse,
  CreateSubCategoryRequest,
  UpdateSubCategoryRequest,
  SubCategory,
} from "../types/subCategory.types";

/**
 * SubCategories API
 */
export const subCategoriesApi = {
  /**
   * Get all subcategories by category ID with pagination and search
   */
  getAll: async (
    params: GetSubCategoriesParams
  ): Promise<GetSubCategoriesResponse> => {
    const { categoryId, search = "", page = 1, limit = 10 } = params;
    const response = await AxiosApi.get<GetSubCategoriesResponse>(
      `${ENDPOINTS.SUBCATEGORIES.GET_BY_CATEGORY}/${categoryId}`,
      {
        params: { search, page, limit },
      }
    );
    return response.data;
  },

  /**
   * Create new subcategory (Admin only)
   */
  create: async (data: CreateSubCategoryRequest): Promise<SubCategory> => {
    const response = await AxiosApi.post<SubCategory>(
      ENDPOINTS.SUBCATEGORIES.CREATE,
      data
    );
    return response.data;
  },

  /**
   * Update subcategory (Admin only)
   */
  update: async (
    id: number,
    data: UpdateSubCategoryRequest
  ): Promise<SubCategory> => {
    const response = await AxiosApi.put<SubCategory>(
      `${ENDPOINTS.SUBCATEGORIES.UPDATE}/${id}`,
      data
    );
    return response.data;
  },

  /**
   * Delete subcategory (Admin only)
   */
  delete: async (id: number): Promise<void> => {
    await AxiosApi.delete(`${ENDPOINTS.SUBCATEGORIES.DELETE}/${id}`);
  },
};
