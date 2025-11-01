/**
 * Email Types
 */

export type UserRole =
  | "Admin"
  | "Vendor"
  | "ShippingCompany"
  | "Customer"
  | "Super Admin";

export interface SendEmailToSegmentRequest {
  // Required fields
  Subject: string;
  Body: string;
  IsHtml: boolean;

  // Optional user filtering
  UserIds?: string; // Comma-separated string
  Roles?: string; // Comma-separated string

  // Optional date filtering
  RegisteredAfter?: string; // ISO date string
  RegisteredBefore?: string; // ISO date string

  // Optional location filtering
  CityId?: number;

  // Optional attachments (files)
  Attachments?: File[];

  // Optional batch processing
  BatchSize?: number;
  DelayBetweenBatchesMs?: number;
}
