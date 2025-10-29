import { TicketStatus } from "../types/support.types";

/**
 * Get ticket status label and color
 */
export function getTicketStatusInfo(status: TicketStatus): {
  label: string;
  colorClass: string;
} {
  const statusMap = {
    [TicketStatus.New]: {
      label: "New",
      colorClass: "bg-blue-500 text-white",
    },
    [TicketStatus.InProgress]: {
      label: "In Progress",
      colorClass: "bg-yellow-500 text-white",
    },
    [TicketStatus.AwaitingCustomer]: {
      label: "Awaiting Customer",
      colorClass: "bg-orange-500 text-white",
    },
    [TicketStatus.Resolved]: {
      label: "Resolved",
      colorClass: "bg-green-500 text-white",
    },
    [TicketStatus.Closed]: {
      label: "Closed",
      colorClass: "bg-gray-500 text-white",
    },
    [TicketStatus.Reopened]: {
      label: "Reopened",
      colorClass: "bg-purple-500 text-white",
    },
  };

  return statusMap[status] || { label: "Unknown", colorClass: "bg-gray-300" };
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
