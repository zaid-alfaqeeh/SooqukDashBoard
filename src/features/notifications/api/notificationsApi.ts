import { AxiosApi } from "@/features/providers/AxiosProvider";
import { ENDPOINTS } from "@/config/api.config";
import type { SendNotificationToRoleRequest } from "../types/notification.types";

/**
 * Notifications API
 */
export const notificationsApi = {
  /**
   * Send notification to all users with a specific role
   */
  sendToRole: async (data: SendNotificationToRoleRequest): Promise<void> => {
    await AxiosApi.post(ENDPOINTS.NOTIFICATIONS.SEND_TO_ROLE, data);
  },
};
