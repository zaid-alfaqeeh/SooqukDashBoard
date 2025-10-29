import { TransactionType } from "../types/wallet.types";

/**
 * Get transaction type label
 */
export function getTransactionTypeLabel(
  type: TransactionType,
  locale: string = "en"
): string {
  const labels: Record<TransactionType, { en: string; ar: string }> = {
    [TransactionType.Earned]: { en: "Earned", ar: "مكتسب" },
    [TransactionType.Redeemed]: { en: "Redeemed", ar: "مستبدل" },
    [TransactionType.AdminCredit]: { en: "Admin Credit", ar: "رصيد إداري" },
    [TransactionType.AdminDebit]: { en: "Admin Debit", ar: "خصم إداري" },
    [TransactionType.ReferralEarned]: {
      en: "Referral Earned",
      ar: "ربح إحالة",
    },
    [TransactionType.OrderEarned]: { en: "Order Earned", ar: "ربح طلب" },
    [TransactionType.CouponRedemption]: {
      en: "Coupon Redemption",
      ar: "استبدال كوبون",
    },
  };

  return labels[type][locale as "en" | "ar"] || labels[type].en;
}

/**
 * Get transaction type color class
 */
export function getTransactionTypeColor(type: TransactionType): string {
  const colors: Record<TransactionType, string> = {
    [TransactionType.Earned]: "bg-blue-100 text-blue-700",
    [TransactionType.Redeemed]: "bg-orange-100 text-orange-700",
    [TransactionType.AdminCredit]: "bg-green-100 text-green-700",
    [TransactionType.AdminDebit]: "bg-red-100 text-red-700",
    [TransactionType.ReferralEarned]: "bg-purple-100 text-purple-700",
    [TransactionType.OrderEarned]: "bg-indigo-100 text-indigo-700",
    [TransactionType.CouponRedemption]: "bg-yellow-100 text-yellow-700",
  };

  return colors[type] || "bg-gray-100 text-gray-700";
}

/**
 * Check if transaction is credit (adds points)
 */
export function isCredit(type: TransactionType): boolean {
  return [
    TransactionType.Earned,
    TransactionType.AdminCredit,
    TransactionType.ReferralEarned,
    TransactionType.OrderEarned,
  ].includes(type);
}

/**
 * Check if transaction is debit (removes points)
 */
export function isDebit(type: TransactionType): boolean {
  return [
    TransactionType.Redeemed,
    TransactionType.AdminDebit,
    TransactionType.CouponRedemption,
  ].includes(type);
}

/**
 * Format currency
 */
export function formatCurrency(amount: number, currencyCode: string): string {
  return `${amount.toFixed(2)} ${currencyCode}`;
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
