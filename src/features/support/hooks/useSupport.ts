import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supportApi } from "../api/supportApi";
import type {
  GetTicketsParams,
  UpdateStatusRequest,
  UpdateNotesRequest,
  RespondToTicketRequest,
} from "../types/support.types";

/**
 * Query keys for support tickets
 */
export const supportKeys = {
  all: ["support"] as const,
  tickets: () => [...supportKeys.all, "tickets"] as const,
  ticketsList: (params: GetTicketsParams) =>
    [...supportKeys.tickets(), params] as const,
  statistics: (days: number) =>
    [...supportKeys.all, "statistics", days] as const,
};

/**
 * Hook to fetch all tickets with filters and pagination
 */
export const useTickets = (params: GetTicketsParams = {}) => {
  return useQuery({
    queryKey: supportKeys.ticketsList(params),
    queryFn: () => supportApi.getAll(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Hook to fetch ticket statistics
 */
export const useTicketStatistics = (days: number = 30) => {
  return useQuery({
    queryKey: supportKeys.statistics(days),
    queryFn: () => supportApi.getStatistics(days),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to update ticket status
 */
export const useUpdateTicketStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateStatusRequest }) =>
      supportApi.updateStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: supportKeys.tickets() });
      queryClient.invalidateQueries({ queryKey: supportKeys.all });
    },
  });
};

/**
 * Hook to update ticket notes
 */
export const useUpdateTicketNotes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateNotesRequest }) =>
      supportApi.updateNotes(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: supportKeys.tickets() });
    },
  });
};

/**
 * Hook to respond to ticket
 */
export const useRespondToTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: RespondToTicketRequest }) =>
      supportApi.respond(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: supportKeys.tickets() });
      queryClient.invalidateQueries({ queryKey: supportKeys.all });
    },
  });
};

/**
 * Hook to delete ticket
 */
export const useDeleteTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, hardDelete }: { id: number; hardDelete?: boolean }) =>
      supportApi.delete(id, hardDelete),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: supportKeys.tickets() });
      queryClient.invalidateQueries({ queryKey: supportKeys.all });
    },
  });
};
