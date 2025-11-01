import { useMutation, useQueryClient } from "@tanstack/react-query";
import { emailApi } from "../api/emailApi";
import type { SendEmailToSegmentRequest } from "../types/email.types";

/**
 * Query keys for emails
 */
export const emailKeys = {
  all: ["emails"] as const,
  lists: () => [...emailKeys.all, "list"] as const,
};

/**
 * Hook to send email to segment
 */
export const useSendEmailToSegment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SendEmailToSegmentRequest) =>
      emailApi.sendToSegment(data),
    onSuccess: () => {
      // Invalidate any email-related queries if needed
      queryClient.invalidateQueries({ queryKey: emailKeys.all });
    },
  });
};
