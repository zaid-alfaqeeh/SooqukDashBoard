import { AxiosApi } from "@/features/providers/AxiosProvider";
import { ENDPOINTS } from "@/config/api.config";
import type { SendEmailToSegmentRequest } from "../types/email.types";

/**
 * Email API
 */
export const emailApi = {
  /**
   * Send email to user segment
   * Uses multipart/form-data
   */
  sendToSegment: async (data: SendEmailToSegmentRequest): Promise<void> => {
    const formData = new FormData();

    // Required fields
    formData.append("Subject", data.Subject);
    formData.append("Body", data.Body);
    formData.append("IsHtml", String(data.IsHtml));

    // Optional user filtering
    if (data.UserIds) {
      formData.append("UserIds", data.UserIds);
    }
    if (data.Roles) {
      formData.append("Roles", data.Roles);
    }

    // Optional date filtering
    if (data.RegisteredAfter) {
      formData.append("RegisteredAfter", data.RegisteredAfter);
    }
    if (data.RegisteredBefore) {
      formData.append("RegisteredBefore", data.RegisteredBefore);
    }

    // Optional location filtering
    if (data.CityId) {
      formData.append("CityId", String(data.CityId));
    }

    // Optional attachments
    // Based on API: Attachments="string,string" - it expects comma-separated filenames
    // But since we're sending files, we append them as files
    // The API might expect filenames or actual files - trying files first
    if (data.Attachments && data.Attachments.length > 0) {
      // Append each file - API will receive them as File objects
      data.Attachments.forEach((file) => {
        formData.append("Attachments", file);
      });
    }

    // Optional batch processing
    if (data.BatchSize) {
      formData.append("BatchSize", String(data.BatchSize));
    }
    if (data.DelayBetweenBatchesMs) {
      formData.append(
        "DelayBetweenBatchesMs",
        String(data.DelayBetweenBatchesMs)
      );
    }

    await AxiosApi.post(ENDPOINTS.EMAIL.SEND_TO_SEGMENT, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
