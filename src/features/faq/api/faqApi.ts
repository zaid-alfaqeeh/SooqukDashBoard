import { AxiosApi } from "@/features/providers/AxiosProvider";
import { ENDPOINTS } from "@/config/api.config";
import type {
  GetFAQsResponse,
  CreateFAQRequest,
  UpdateFAQRequest,
} from "../types/faq.types";

export const faqApi = {
  /**
   * Get all FAQs
   */
  getAllFAQs: async (): Promise<GetFAQsResponse> => {
    const response = await AxiosApi.get<GetFAQsResponse>(ENDPOINTS.FAQ.GET_ALL);
    return response.data;
  },

  /**
   * Create a new FAQ
   */
  createFAQ: async (data: CreateFAQRequest): Promise<void> => {
    await AxiosApi.post(ENDPOINTS.FAQ.ADD, data);
  },

  /**
   * Update an existing FAQ
   */
  updateFAQ: async (id: number, data: UpdateFAQRequest): Promise<void> => {
    await AxiosApi.put(`${ENDPOINTS.FAQ.UPDATE}/${id}`, data);
  },

  /**
   * Delete an FAQ
   */
  deleteFAQ: async (id: number): Promise<void> => {
    await AxiosApi.delete(`${ENDPOINTS.FAQ.DELETE}/${id}`);
  },
};
