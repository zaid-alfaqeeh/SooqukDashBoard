"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Coupon, CouponType, CouponStatus } from "../types/coupon.types";

interface CouponFormModalProps {
  coupon?: Coupon;
  onSubmit: (data: {
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
  }) => void;
  onClose: () => void;
  isLoading: boolean;
}

export default function CouponFormModal({
  coupon,
  onSubmit,
  onClose,
  isLoading,
}: CouponFormModalProps) {
  const t = useTranslations("coupons");
  const tCommon = useTranslations("common");
  const isEdit = !!coupon;

  const [formData, setFormData] = useState({
    code: coupon?.code || "",
    discountValue: coupon?.discountValue || 0,
    startDate: coupon?.startDate
      ? new Date(coupon.startDate).toISOString().slice(0, 16)
      : "",
    endDate: coupon?.endDate
      ? new Date(coupon.endDate).toISOString().slice(0, 16)
      : "",
    vendorId: coupon?.vendorId || null,
    title: coupon?.title || "",
    titleAr: coupon?.titleAr || "",
    description: coupon?.description || "",
    descriptionAr: coupon?.descriptionAr || "",
    status: coupon?.status ?? 1,
    type: coupon?.type ?? 0,
    maxUses: coupon?.maxUses || 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      vendorId: formData.vendorId || null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="relative inline-block w-full max-w-4xl overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-2xl sm:my-8 sm:align-middle">
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">
                  {isEdit ? t("editCoupon") : t("createCoupon")}
                </h3>
                <button
                  type="button"
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
            <div className="px-6 py-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Code */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {t("code")} *
                  </label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none uppercase"
                    placeholder={t("codePlaceholder")}
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {t("type")} *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: Number(e.target.value) })
                    }
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
                  >
                    <option value={0}>{t("typePercentage")}</option>
                    <option value={1}>{t("typeFixedAmount")}</option>
                    <option value={2}>{t("typeFreeShipping")}</option>
                    <option value={3}>{t("typeBuyOneGetOne")}</option>
                  </select>
                </div>

                {/* Discount Value */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {t("discountValue")} *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.discountValue}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        discountValue: Number(e.target.value),
                      })
                    }
                    required
                    min="0"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
                    placeholder="0.00"
                  />
                </div>

                {/* Max Uses */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {t("maxUses")} *
                  </label>
                  <input
                    type="number"
                    value={formData.maxUses}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maxUses: Number(e.target.value),
                      })
                    }
                    required
                    min="1"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {t("startDate")} *
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {t("endDate")} *
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {t("status")} *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: Number(e.target.value),
                      })
                    }
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
                  >
                    <option value={0}>{t("statusUsed")}</option>
                    <option value={1}>{t("statusActive")}</option>
                    <option value={2}>{t("statusExpired")}</option>
                  </select>
                </div>

                {/* Vendor ID */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {t("vendorId")} ({t("optional")})
                  </label>
                  <input
                    type="number"
                    value={formData.vendorId || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        vendorId: e.target.value
                          ? Number(e.target.value)
                          : null,
                      })
                    }
                    min="1"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
                    placeholder={t("vendorIdPlaceholder")}
                  />
                </div>

                {/* Title (EN) */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {t("title")} (English) *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
                    placeholder={t("titlePlaceholder")}
                  />
                </div>

                {/* Title (AR) */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {t("title")} (العربية) *
                  </label>
                  <input
                    type="text"
                    value={formData.titleAr}
                    onChange={(e) =>
                      setFormData({ ...formData, titleAr: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
                    placeholder={t("titleArPlaceholder")}
                  />
                </div>

                {/* Description (EN) */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {t("description")} (English) *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                    rows={3}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none resize-none"
                    placeholder={t("descriptionPlaceholder")}
                  />
                </div>

                {/* Description (AR) */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {t("description")} (العربية) *
                  </label>
                  <textarea
                    value={formData.descriptionAr}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        descriptionAr: e.target.value,
                      })
                    }
                    required
                    rows={3}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none resize-none"
                    placeholder={t("descriptionArPlaceholder")}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {tCommon("cancel")}
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-[#E6497F] hover:bg-[#d63d6f] text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading
                  ? isEdit
                    ? t("updating")
                    : t("creating")
                  : tCommon("save")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
