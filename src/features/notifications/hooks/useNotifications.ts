import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationsApi } from "../api/notificationsApi";
import type { SendNotificationToRoleRequest } from "../types/notification.types";

/**
 * Query keys for notifications
 */
export const notificationKeys = {
  all: ["notifications"] as const,
  lists: () => [...notificationKeys.all, "list"] as const,
};

/**
 * Hook to send notification to a role
 */
export const useSendNotificationToRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SendNotificationToRoleRequest) =>
      notificationsApi.sendToRole(data),
    onSuccess: () => {
      // Invalidate any notification-related queries if needed
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
};
