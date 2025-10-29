import { AxiosApi } from "@/features/providers/AxiosProvider";
import { ENDPOINTS } from "@/config/api.config";
import type {
  Tag,
  CreateTagRequest,
  UpdateTagRequest,
} from "../types/tag.types";

/**
 * Tags API
 */
export const tagsApi = {
  /**
   * Get all tags
   */
  getAll: async (): Promise<Tag[]> => {
    const response = await AxiosApi.get<Tag[]>(ENDPOINTS.TAGS.GET_ALL);
    return response.data;
  },

  /**
   * Create new tag (Admin only)
   */
  create: async (data: CreateTagRequest): Promise<Tag> => {
    const response = await AxiosApi.post<Tag>(ENDPOINTS.TAGS.CREATE, data);
    return response.data;
  },

  /**
   * Update tag (Admin only)
   */
  update: async (data: UpdateTagRequest): Promise<Tag> => {
    const { id, ...updateData } = data;
    const response = await AxiosApi.put<Tag>(`${ENDPOINTS.TAGS.UPDATE}/${id}`, {
      id,
      ...updateData,
    });
    return response.data;
  },

  /**
   * Delete tag (Admin only)
   */
  delete: async (id: number): Promise<void> => {
    await AxiosApi.delete(`${ENDPOINTS.TAGS.DELETE}/${id}`);
  },
};
