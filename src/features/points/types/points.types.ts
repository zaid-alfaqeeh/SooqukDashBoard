/**
 * Points System Types
 */

/**
 * Point Term (Referral Program)
 */
export interface PointTerm {
  id: number;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  referrerPoints: number;
  refereePoints: number;
  maxUsagePerCode: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  referralCodes: any | null;
}

/**
 * Create Point Term Request
 */
export interface CreatePointTermRequest {
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  isActive: boolean;
}

/**
 * Update Point Term Request
 */
export interface UpdatePointTermRequest {
  id: number;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  isActive: boolean;
}

/**
 * Points Redemption Configuration
 */
export interface PointsRedemptionConfig {
  id: number;
  // Percentage Coupon
  pointsForPercentageCoupon: number;
  pointsForPercentageCouponTitle: string;
  pointsForPercentageCouponTitleAr: string;
  percentageDiscountAmount: number;
  isPercentageEnabled: boolean;
  // Free Delivery
  pointsForFreeDelivery: number;
  pointsForFreeDeliveryTitle: string;
  pointsForFreeDeliveryTitleAr: string;
  isFreeDeliveryEnabled: boolean;
  // Fixed Amount Coupon
  pointsForFixedAmountCoupon: number;
  pointsForFixedAmountCouponTitle: string;
  pointsForFixedAmountCouponTitleAr: string;
  fixedDiscountAmount: number;
  isFixedAmountEnabled: boolean;
  // Global Settings
  minimumPointsToRedeem: number;
  couponValidityDays: number;
  maxCouponsPerMonth: number;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Update Points Redemption Config Request
 */
export interface UpdateRedemptionConfigRequest {
  id: number;
  // Percentage Coupon
  pointsForPercentageCoupon: number;
  pointsForPercentageCouponTitle: string;
  pointsForPercentageCouponTitleAr: string;
  percentageDiscountAmount: number;
  isPercentageEnabled: boolean;
  // Free Delivery
  pointsForFreeDelivery: number;
  pointsForFreeDeliveryTitle: string;
  pointsForFreeDeliveryTitleAr: string;
  isFreeDeliveryEnabled: boolean;
  // Fixed Amount Coupon
  pointsForFixedAmountCoupon: number;
  pointsForFixedAmountCouponTitle: string;
  pointsForFixedAmountCouponTitleAr: string;
  fixedDiscountAmount: number;
  isFixedAmountEnabled: boolean;
  // Global Settings
  minimumPointsToRedeem: number;
  couponValidityDays: number;
  maxCouponsPerMonth: number;
  isEnabled: boolean;
}
