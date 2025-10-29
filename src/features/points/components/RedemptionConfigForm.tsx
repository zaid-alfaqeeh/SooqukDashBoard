"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import type { PointsRedemptionConfig } from "../types/points.types";

interface RedemptionConfigFormProps {
  config: PointsRedemptionConfig;
  onSubmit: (
    data: Omit<PointsRedemptionConfig, "createdAt" | "updatedAt">
  ) => void;
  isLoading: boolean;
}

export default function RedemptionConfigForm({
  config,
  onSubmit,
  isLoading,
}: RedemptionConfigFormProps) {
  const t = useTranslations("points");
  const tCommon = useTranslations("common");

  const [formData, setFormData] = useState({
    id: config.id,
    // Percentage Coupon
    pointsForPercentageCoupon: config.pointsForPercentageCoupon,
    pointsForPercentageCouponTitle: config.pointsForPercentageCouponTitle,
    pointsForPercentageCouponTitleAr: config.pointsForPercentageCouponTitleAr,
    percentageDiscountAmount: config.percentageDiscountAmount,
    isPercentageEnabled: config.isPercentageEnabled,
    // Free Delivery
    pointsForFreeDelivery: config.pointsForFreeDelivery,
    pointsForFreeDeliveryTitle: config.pointsForFreeDeliveryTitle,
    pointsForFreeDeliveryTitleAr: config.pointsForFreeDeliveryTitleAr,
    isFreeDeliveryEnabled: config.isFreeDeliveryEnabled,
    // Fixed Amount
    pointsForFixedAmountCoupon: config.pointsForFixedAmountCoupon,
    pointsForFixedAmountCouponTitle: config.pointsForFixedAmountCouponTitle,
    pointsForFixedAmountCouponTitleAr: config.pointsForFixedAmountCouponTitleAr,
    fixedDiscountAmount: config.fixedDiscountAmount,
    isFixedAmountEnabled: config.isFixedAmountEnabled,
    // Global Settings
    minimumPointsToRedeem: config.minimumPointsToRedeem,
    couponValidityDays: config.couponValidityDays,
    maxCouponsPerMonth: config.maxCouponsPerMonth,
    isEnabled: config.isEnabled,
  });

  useEffect(() => {
    setFormData({
      id: config.id,
      pointsForPercentageCoupon: config.pointsForPercentageCoupon,
      pointsForPercentageCouponTitle: config.pointsForPercentageCouponTitle,
      pointsForPercentageCouponTitleAr: config.pointsForPercentageCouponTitleAr,
      percentageDiscountAmount: config.percentageDiscountAmount,
      isPercentageEnabled: config.isPercentageEnabled,
      pointsForFreeDelivery: config.pointsForFreeDelivery,
      pointsForFreeDeliveryTitle: config.pointsForFreeDeliveryTitle,
      pointsForFreeDeliveryTitleAr: config.pointsForFreeDeliveryTitleAr,
      isFreeDeliveryEnabled: config.isFreeDeliveryEnabled,
      pointsForFixedAmountCoupon: config.pointsForFixedAmountCoupon,
      pointsForFixedAmountCouponTitle: config.pointsForFixedAmountCouponTitle,
      pointsForFixedAmountCouponTitleAr:
        config.pointsForFixedAmountCouponTitleAr,
      fixedDiscountAmount: config.fixedDiscountAmount,
      isFixedAmountEnabled: config.isFixedAmountEnabled,
      minimumPointsToRedeem: config.minimumPointsToRedeem,
      couponValidityDays: config.couponValidityDays,
      maxCouponsPerMonth: config.maxCouponsPerMonth,
      isEnabled: config.isEnabled,
    });
  }, [config]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Global Enable/Disable */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {t("redemptionSystem")}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {t("redemptionSystemDesc")}
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isEnabled}
              onChange={(e) =>
                setFormData({ ...formData, isEnabled: e.target.checked })
              }
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
      </div>

      {/* Percentage Coupon Section */}
      <div className="bg-white p-6 rounded-2xl border-2 border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-xl">%</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {t("percentageCoupon")}
              </h3>
              <p className="text-sm text-gray-600">
                {t("percentageCouponDesc")}
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={formData.isPercentageEnabled}
            onChange={(e) =>
              setFormData({
                ...formData,
                isPercentageEnabled: e.target.checked,
              })
            }
            className="w-5 h-5 text-[#E6497F] focus:ring-[#E6497F] rounded"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t("pointsRequired")} *
            </label>
            <input
              type="number"
              value={formData.pointsForPercentageCoupon}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  pointsForPercentageCoupon: Number(e.target.value),
                })
              }
              required
              min="0"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t("discountPercentage")} (%) *
            </label>
            <input
              type="number"
              value={formData.percentageDiscountAmount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  percentageDiscountAmount: Number(e.target.value),
                })
              }
              required
              min="0"
              max="100"
              step="0.01"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t("couponTitle")} (EN) *
            </label>
            <input
              type="text"
              value={formData.pointsForPercentageCouponTitle}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  pointsForPercentageCouponTitle: e.target.value,
                })
              }
              required
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t("couponTitle")} (AR) *
            </label>
            <input
              type="text"
              value={formData.pointsForPercentageCouponTitleAr}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  pointsForPercentageCouponTitleAr: e.target.value,
                })
              }
              required
              dir="rtl"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
            />
          </div>
        </div>
      </div>

      {/* Free Delivery Section */}
      <div className="bg-white p-6 rounded-2xl border-2 border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-xl">🚚</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {t("freeDelivery")}
              </h3>
              <p className="text-sm text-gray-600">{t("freeDeliveryDesc")}</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={formData.isFreeDeliveryEnabled}
            onChange={(e) =>
              setFormData({
                ...formData,
                isFreeDeliveryEnabled: e.target.checked,
              })
            }
            className="w-5 h-5 text-[#E6497F] focus:ring-[#E6497F] rounded"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t("pointsRequired")} *
            </label>
            <input
              type="number"
              value={formData.pointsForFreeDelivery}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  pointsForFreeDelivery: Number(e.target.value),
                })
              }
              required
              min="0"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t("couponTitle")} (EN) *
            </label>
            <input
              type="text"
              value={formData.pointsForFreeDeliveryTitle}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  pointsForFreeDeliveryTitle: e.target.value,
                })
              }
              required
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t("couponTitle")} (AR) *
            </label>
            <input
              type="text"
              value={formData.pointsForFreeDeliveryTitleAr}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  pointsForFreeDeliveryTitleAr: e.target.value,
                })
              }
              required
              dir="rtl"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
            />
          </div>
        </div>
      </div>

      {/* Fixed Amount Coupon Section */}
      <div className="bg-white p-6 rounded-2xl border-2 border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-xl">💰</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {t("fixedAmountCoupon")}
              </h3>
              <p className="text-sm text-gray-600">
                {t("fixedAmountCouponDesc")}
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={formData.isFixedAmountEnabled}
            onChange={(e) =>
              setFormData({
                ...formData,
                isFixedAmountEnabled: e.target.checked,
              })
            }
            className="w-5 h-5 text-[#E6497F] focus:ring-[#E6497F] rounded"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t("pointsRequired")} *
            </label>
            <input
              type="number"
              value={formData.pointsForFixedAmountCoupon}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  pointsForFixedAmountCoupon: Number(e.target.value),
                })
              }
              required
              min="0"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t("discountAmount")} *
            </label>
            <input
              type="number"
              value={formData.fixedDiscountAmount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fixedDiscountAmount: Number(e.target.value),
                })
              }
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t("couponTitle")} (EN) *
            </label>
            <input
              type="text"
              value={formData.pointsForFixedAmountCouponTitle}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  pointsForFixedAmountCouponTitle: e.target.value,
                })
              }
              required
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t("couponTitle")} (AR) *
            </label>
            <input
              type="text"
              value={formData.pointsForFixedAmountCouponTitleAr}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  pointsForFixedAmountCouponTitleAr: e.target.value,
                })
              }
              required
              dir="rtl"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
            />
          </div>
        </div>
      </div>

      {/* Global Settings */}
      <div className="bg-white p-6 rounded-2xl border-2 border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          {t("globalSettings")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t("minimumPoints")} *
            </label>
            <input
              type="number"
              value={formData.minimumPointsToRedeem}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  minimumPointsToRedeem: Number(e.target.value),
                })
              }
              required
              min="0"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              {t("minimumPointsHint")}
            </p>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t("couponValidityDays")} *
            </label>
            <input
              type="number"
              value={formData.couponValidityDays}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  couponValidityDays: Number(e.target.value),
                })
              }
              required
              min="1"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              {t("validityDaysHint")}
            </p>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t("maxCouponsPerMonth")} *
            </label>
            <input
              type="number"
              value={formData.maxCouponsPerMonth}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  maxCouponsPerMonth: Number(e.target.value),
                })
              }
              required
              min="1"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">{t("maxCouponsHint")}</p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-3 bg-[#E6497F] hover:bg-[#d63d6f] text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? t("updating") : t("saveConfiguration")}
        </button>
      </div>
    </form>
  );
}
