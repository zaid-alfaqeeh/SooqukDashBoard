"use client";

import { useTranslations } from "next-intl";
import type { Coupon } from "../types/coupon.types";
import {
  getCouponTypeLabel,
  getCouponStatusLabel,
  getCouponStatusColor,
  getCouponTypeColor,
  formatDiscountValue,
} from "../utils/couponUtils";

interface ViewCouponModalProps {
  coupon: Coupon;
  onClose: () => void;
  onEdit: (coupon: Coupon) => void;
}

export default function ViewCouponModal({
  coupon,
  onClose,
  onEdit,
}: ViewCouponModalProps) {
  const t = useTranslations("coupons");
  const tCommon = useTranslations("common");

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="relative inline-block w-full max-w-3xl overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-2xl sm:my-8 sm:align-middle">
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">
                {t("couponDetails")}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 py-6">
            <div className="space-y-6">
              {/* Code & Status */}
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-900 font-mono bg-gray-100 px-4 py-2 rounded">
                  {coupon.code}
                </div>
                <div className="flex gap-2">
                  <span
                    className={`px-4 py-2 inline-flex text-sm leading-5 font-bold rounded-full ${getCouponStatusColor(
                      coupon.status
                    )}`}
                  >
                    {t(getCouponStatusLabel(coupon.status))}
                  </span>
                  <span
                    className={`px-4 py-2 inline-flex text-sm leading-5 font-bold rounded-full ${getCouponTypeColor(
                      coupon.type
                    )}`}
                  >
                    {t(getCouponTypeLabel(coupon.type))}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-bold text-gray-500 mb-2">
                    {t("title")} (English)
                  </h4>
                  <p className="text-lg font-semibold text-gray-900">
                    {coupon.title}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-500 mb-2">
                    {t("title")} (العربية)
                  </h4>
                  <p className="text-lg font-semibold text-gray-900">
                    {coupon.titleAr}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="text-sm font-bold text-gray-500 mb-2">
                    {t("description")} (English)
                  </h4>
                  <p className="text-gray-700">{coupon.description}</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="text-sm font-bold text-gray-500 mb-2">
                    {t("description")} (العربية)
                  </h4>
                  <p className="text-gray-700">{coupon.descriptionAr}</p>
                </div>
              </div>

              {/* Discount & Usage */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">{t("discount")}</p>
                  <p className="text-xl font-bold text-[#E6497F]">
                    {formatDiscountValue(coupon.discountValue, coupon.type)}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">{t("maxUses")}</p>
                  <p className="text-xl font-bold text-gray-900">
                    {coupon.maxUses}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">{t("usedCount")}</p>
                  <p className="text-xl font-bold text-gray-900">
                    {coupon.usedCount}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">{t("remaining")}</p>
                  <p className="text-xl font-bold text-green-600">
                    {coupon.maxUses - coupon.usedCount}
                  </p>
                </div>
              </div>

              {/* Validity Period */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-sm font-bold text-blue-900 mb-3">
                  {t("validity")}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-blue-600 mb-1">
                      {t("startDate")}
                    </p>
                    <p className="text-sm font-semibold text-blue-900">
                      {new Date(coupon.startDate).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 mb-1">{t("endDate")}</p>
                    <p className="text-sm font-semibold text-blue-900">
                      {new Date(coupon.endDate).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                {coupon.vendorId && (
                  <div>
                    <p className="text-gray-600">{t("vendorId")}:</p>
                    <p className="font-semibold text-gray-900">
                      {coupon.vendorId}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-gray-600">{t("createdAt")}:</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(coupon.createdAt).toLocaleString()}
                  </p>
                </div>
                {coupon.usedAt && (
                  <div>
                    <p className="text-gray-600">{t("usedAt")}:</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(coupon.usedAt).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
            >
              {tCommon("close")}
            </button>
            <button
              onClick={() => {
                onClose();
                onEdit(coupon);
              }}
              className="flex-1 px-4 py-3 bg-[#E6497F] hover:bg-[#d63d6f] text-white font-bold rounded-lg transition-colors"
            >
              {tCommon("edit")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
