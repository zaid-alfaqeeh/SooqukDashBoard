import { OrderStatus } from "../types/shipping.types";

/**
 * Get status color classes
 */
export function getStatusColor(status: OrderStatus): string {
  const colors: Record<OrderStatus, string> = {
    [OrderStatus.Pending]: "bg-yellow-100 text-yellow-700",
    [OrderStatus.Confirmed]: "bg-blue-100 text-blue-700",
    [OrderStatus.Processing]: "bg-indigo-100 text-indigo-700",
    [OrderStatus.Shipped]: "bg-purple-100 text-purple-700",
    [OrderStatus.Delivered]: "bg-green-100 text-green-700",
    [OrderStatus.Cancelled]: "bg-red-100 text-red-700",
    [OrderStatus.Refunded]: "bg-gray-100 text-gray-700",
  };
  return colors[status] || "bg-gray-100 text-gray-700";
}

/**
 * Get status label translation key
 */
export function getStatusLabel(status: OrderStatus): string {
  const labels: Record<OrderStatus, string> = {
    [OrderStatus.Pending]: "statusPending",
    [OrderStatus.Confirmed]: "statusConfirmed",
    [OrderStatus.Processing]: "statusProcessing",
    [OrderStatus.Shipped]: "statusShipped",
    [OrderStatus.Delivered]: "statusDelivered",
    [OrderStatus.Cancelled]: "statusCancelled",
    [OrderStatus.Refunded]: "statusRefunded",
  };
  return labels[status] || "statusPending";
}

/**
 * Format date to ISO string for API
 */
export function formatDateForApi(date: string): string {
  if (!date) return "";
  return new Date(date).toISOString();
}

/**
 * Get payment method label
 */
export function getPaymentMethodLabel(method: number): string {
  const methods: Record<number, string> = {
    1: "cashOnDelivery",
    2: "creditCard",
    3: "payPal",
  };
  return methods[method] || "unknown";
}

/**
 * Get payment status label
 */
export function getPaymentStatusLabel(status: number): string {
  const statuses: Record<number, string> = {
    1: "pending",
    2: "paid",
    3: "failed",
    4: "refunded",
  };
  return statuses[status] || "unknown";
}
