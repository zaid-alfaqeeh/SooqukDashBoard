import { AxiosApi } from "@/features/providers/AxiosProvider";
import { ENDPOINTS } from "@/config/api.config";
import type {
  GetTicketsParams,
  GetTicketsResponse,
  GetStatisticsResponse,
  UpdateStatusRequest,
  UpdateNotesRequest,
  RespondToTicketRequest,
} from "../types/support.types";

/**
 * Support Tickets API
 */
export const supportApi = {
  /**
   * Get all tickets with filters and pagination
   */
  getAll: async (
    params: GetTicketsParams = {}
  ): Promise<GetTicketsResponse> => {
    const response = await AxiosApi.get<GetTicketsResponse>(
      ENDPOINTS.SUPPORT.TICKETS,
      { params }
    );
    return response.data;
  },

  /**
   * Get ticket statistics
   */
  getStatistics: async (days: number = 30): Promise<GetStatisticsResponse> => {
    const response = await AxiosApi.get<GetStatisticsResponse>(
      ENDPOINTS.SUPPORT.STATISTICS,
      { params: { days } }
    );
    return response.data;
  },

  /**
   * Update ticket status
   */
  updateStatus: async (
    id: number,
    data: UpdateStatusRequest
  ): Promise<void> => {
    await AxiosApi.patch(`${ENDPOINTS.SUPPORT.TICKETS}/${id}/status`, data);
  },

  /**
   * Update ticket admin notes
   */
  updateNotes: async (id: number, data: UpdateNotesRequest): Promise<void> => {
    await AxiosApi.patch(`${ENDPOINTS.SUPPORT.TICKETS}/${id}/notes`, data);
  },

  /**
   * Respond to ticket
   */
  respond: async (id: number, data: RespondToTicketRequest): Promise<void> => {
    await AxiosApi.post(`${ENDPOINTS.SUPPORT.TICKETS}/${id}/respond`, data);
  },

  /**
   * Delete ticket
   */
  delete: async (id: number, hardDelete: boolean = false): Promise<void> => {
    await AxiosApi.delete(`${ENDPOINTS.SUPPORT.TICKETS}/${id}`, {
      params: { hardDelete },
    });
  },
};
