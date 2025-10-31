/**
 * Notification Types
 */

export type UserRole =
  | "Admin"
  | "Vendor"
  | "ShippingCompany"
  | "Customer"
  | "Super Admin";

export interface SendNotificationToRoleRequest {
  role: UserRole;
  title: string;
  titleAr: string;
  message: string;
  messageAr: string;
  icon: string;
}
