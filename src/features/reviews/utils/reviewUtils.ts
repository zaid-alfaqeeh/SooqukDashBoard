import { ReviewStatus } from "../types/review.types";

/**
 * Get review status label
 */
export function getReviewStatusLabel(
  status: ReviewStatus | string,
  locale: string = "en"
): string {
  const labels: Record<string, { en: string; ar: string }> = {
    Pending: { en: "Pending", ar: "قيد الانتظار" },
    Approved: { en: "Approved", ar: "موافق عليه" },
    Rejected: { en: "Rejected", ar: "مرفوض" },
  };

  const statusKey = typeof status === "string" ? status : String(status);
  return (
    labels[statusKey]?.[locale as "en" | "ar"] ||
    labels[statusKey]?.en ||
    statusKey
  );
}

/**
 * Get review status color
 */
export function getReviewStatusColor(status: ReviewStatus | string): string {
  const colors: Record<string, string> = {
    Pending: "bg-yellow-100 text-yellow-700",
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  const statusKey = typeof status === "string" ? status : String(status);
  return colors[statusKey] || "bg-gray-100 text-gray-700";
}

/**
 * Render star rating
 */
export function renderStars(rating: number): string {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

/**
 * Format date
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Get review status value for API queries
 */
export function getReviewStatusValue(
  status: "all" | "pending" | "approved" | "rejected"
): ReviewStatus | undefined {
  switch (status) {
    case "pending":
      return ReviewStatus.Pending;
    case "approved":
      return ReviewStatus.Approved;
    case "rejected":
      return ReviewStatus.Rejected;
    default:
      return undefined;
  }
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (!text || text.length <= maxLength) return text || "";
  return text.slice(0, maxLength) + "...";
}
