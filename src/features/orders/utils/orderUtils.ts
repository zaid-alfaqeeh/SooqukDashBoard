import { OrderStatus, PaymentStatus } from "../types/order.types";

/**
 * Get order status label and color
 */
export function getOrderStatusInfo(status: OrderStatus): {
  label: string;
  colorClass: string;
} {
  const statusMap = {
    [OrderStatus.Pending]: {
      label: "Pending",
      colorClass: "bg-yellow-500 text-white",
    },
    [OrderStatus.Confirmed]: {
      label: "Confirmed",
      colorClass: "bg-blue-500 text-white",
    },
    [OrderStatus.Processing]: {
      label: "Processing",
      colorClass: "bg-purple-500 text-white",
    },
    [OrderStatus.Shipped]: {
      label: "Shipped",
      colorClass: "bg-indigo-500 text-white",
    },
    [OrderStatus.Delivered]: {
      label: "Delivered",
      colorClass: "bg-green-500 text-white",
    },
    [OrderStatus.Cancelled]: {
      label: "Cancelled",
      colorClass: "bg-red-500 text-white",
    },
    [OrderStatus.Refunded]: {
      label: "Refunded",
      colorClass: "bg-gray-500 text-white",
    },
  };

  return statusMap[status] || { label: "Unknown", colorClass: "bg-gray-300" };
}

/**
 * Get payment status label and color
 */
export function getPaymentStatusInfo(status: PaymentStatus): {
  label: string;
  colorClass: string;
} {
  const statusMap = {
    [PaymentStatus.Pending]: {
      label: "Pending",
      colorClass: "bg-yellow-100 text-yellow-800",
    },
    [PaymentStatus.Paid]: {
      label: "Paid",
      colorClass: "bg-green-100 text-green-800",
    },
    [PaymentStatus.Failed]: {
      label: "Failed",
      colorClass: "bg-red-100 text-red-800",
    },
    [PaymentStatus.Refunded]: {
      label: "Refunded",
      colorClass: "bg-gray-100 text-gray-800",
    },
  };

  return statusMap[status] || { label: "Unknown", colorClass: "bg-gray-100" };
}

/**
 * Format currency
 */
export function formatCurrency(
  amount: number,
  currencyCode: string = "JOD"
): string {
  return `${amount.toFixed(2)} ${currencyCode}`;
}

/**
 * Format date
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
