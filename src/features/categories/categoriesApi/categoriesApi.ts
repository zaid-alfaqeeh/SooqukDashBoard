import { AxiosApi } from "@/features/providers/AxiosProvider";
import { ENDPOINTS } from "@/config/api.config";
import type {
  GetCategoriesParams,
  GetCategoriesResponse,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  Category,
} from "../types/category.types";

/**
 * Categories API
 */
export const categoriesApi = {
  /**
   * Get all categories with pagination and search
   */
  getAll: async (
    params: GetCategoriesParams = {}
  ): Promise<GetCategoriesResponse> => {
    const { search = "", page = 1, limit = 10 } = params;
    const response = await AxiosApi.get<GetCategoriesResponse>(
      ENDPOINTS.CATEGORIES.GET_ALL,
      {
        params: { search, page, limit },
      }
    );
    return response.data;
  },

  /**
   * Get category by ID
   */
  getById: async (id: number): Promise<Category> => {
    const response = await AxiosApi.get<Category>(
      `${ENDPOINTS.CATEGORIES.BASE}/${id}`
    );
    return response.data;
  },

  /**
   * Create new category (Admin only) - Multipart form data
   */
  create: async (data: CreateCategoryRequest): Promise<Category> => {
    const formData = new FormData();

    formData.append("Name", data.Name);
    formData.append("NameAr", data.NameAr);
    formData.append("Description", data.Description);
    formData.append("DescriptionAr", data.DescriptionAr);
    formData.append("Type", data.Type);
    formData.append("IsActive", String(data.IsActive));

    // Append image files
    if (data.ImageFiles && data.ImageFiles.length > 0) {
      data.ImageFiles.forEach((file) => {
        formData.append("ImageFiles", file);
      });
    }

    const response = await AxiosApi.post<Category>(
      ENDPOINTS.CATEGORIES.BASE,
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
   * Update category (Admin only) - Multipart form data
   */
  update: async (data: UpdateCategoryRequest): Promise<Category> => {
    const formData = new FormData();

    formData.append("Name", data.Name);
    formData.append("NameAr", data.NameAr);
    formData.append("Description", data.Description);
    formData.append("DescriptionAr", data.DescriptionAr);
    formData.append("Type", data.Type);
    formData.append("IsActive", String(data.IsActive));

    // Append new image files
    if (data.NewImageFiles && data.NewImageFiles.length > 0) {
      data.NewImageFiles.forEach((file) => {
        formData.append("NewImageFiles", file);
      });
    }

    // Append images to delete
    if (data.ImagesToDelete && data.ImagesToDelete.length > 0) {
      data.ImagesToDelete.forEach((imageId) => {
        formData.append("ImagesToDelete", String(imageId));
      });
    }

    const response = await AxiosApi.patch<Category>(
      `${ENDPOINTS.CATEGORIES.BASE}/${data.id}`,
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
   * Delete category (Admin only)
   */
  delete: async (id: number): Promise<void> => {
    await AxiosApi.delete(`${ENDPOINTS.CATEGORIES.BASE}/${id}`);
  },
};
