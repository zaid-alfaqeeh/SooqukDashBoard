import { CouponType, CouponStatus } from "../types/coupon.types";

/**
 * Get coupon type label key for translation
 */
export function getCouponTypeLabel(type: CouponType): string {
  const labels: Record<CouponType, string> = {
    [CouponType.Percentage]: "typePercentage",
    [CouponType.FixedAmount]: "typeFixedAmount",
    [CouponType.FreeShipping]: "typeFreeShipping",
    [CouponType.BuyOneGetOne]: "typeBuyOneGetOne",
  };
  return labels[type];
}

/**
 * Get coupon status label key for translation
 */
export function getCouponStatusLabel(status: CouponStatus): string {
  const labels: Record<CouponStatus, string> = {
    [CouponStatus.Used]: "statusUsed",
    [CouponStatus.Active]: "statusActive",
    [CouponStatus.Expired]: "statusExpired",
  };
  return labels[status];
}

/**
 * Get coupon status color classes
 */
export function getCouponStatusColor(status: CouponStatus): string {
  const colors: Record<CouponStatus, string> = {
    [CouponStatus.Used]: "bg-gray-100 text-gray-700",
    [CouponStatus.Active]: "bg-green-100 text-green-700",
    [CouponStatus.Expired]: "bg-red-100 text-red-700",
  };
  return colors[status];
}

/**
 * Get coupon type color classes
 */
export function getCouponTypeColor(type: CouponType): string {
  const colors: Record<CouponType, string> = {
    [CouponType.Percentage]: "bg-blue-100 text-blue-700",
    [CouponType.FixedAmount]: "bg-purple-100 text-purple-700",
    [CouponType.FreeShipping]: "bg-green-100 text-green-700",
    [CouponType.BuyOneGetOne]: "bg-pink-100 text-pink-700",
  };
  return colors[type];
}

/**
 * Format discount value based on type
 */
export function formatDiscountValue(value: number, type: CouponType): string {
  if (type === CouponType.Percentage) {
    return `${value}%`;
  } else if (type === CouponType.FixedAmount) {
    return `${value.toFixed(2)} JOD`;
  }
  return "-";
}

/**
 * Check if coupon is expired
 */
export function isCouponExpired(endDate: string): boolean {
  return new Date(endDate) < new Date();
}

/**
 * Check if coupon is active
 */
export function isCouponActive(startDate: string, endDate: string): boolean {
  const now = new Date();
  return new Date(startDate) <= now && new Date(endDate) >= now;
}
