/**
 * Coupon Types
 */

/**
 * Coupon Type Enum
 */
export enum CouponType {
  Percentage = 0,
  FixedAmount = 1,
  FreeShipping = 2,
  BuyOneGetOne = 3,
}

/**
 * Coupon Status Enum
 */
export enum CouponStatus {
  Used = 0,
  Active = 1,
  Expired = 2,
}

/**
 * Coupon Interface
 */
export interface Coupon {
  id: number;
  code: string;
  discountValue: number;
  startDate: string;
  endDate: string;
  vendorId: number | null;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  status: CouponStatus;
  type: CouponType;
  usedAt: string | null;
  usedBy: string | null;
  userId: string;
  user: any | null;
  maxUses: number;
  usedCount: number;
  createdAt: string;
}

/**
 * Create Coupon Request
 */
export interface CreateCouponRequest {
  code: string;
  discountValue: number;
  startDate: string;
  endDate: string;
  vendorId?: number | null;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  status: CouponStatus;
  type: CouponType;
  maxUses: number;
}

/**
 * Update Coupon Request
 */
export interface UpdateCouponRequest {
  id: number;
  code: string;
  discountValue: number;
  startDate: string;
  endDate: string;
  vendorId?: number | null;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  status: CouponStatus;
  type: CouponType;
  maxUses: number;
}
