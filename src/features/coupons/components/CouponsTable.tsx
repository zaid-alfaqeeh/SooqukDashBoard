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

interface CouponsTableProps {
  coupons: Coupon[];
  isLoading?: boolean;
  error?: Error | null;
  onView: (coupon: Coupon) => void;
  onEdit: (coupon: Coupon) => void;
  onDelete: (coupon: Coupon) => void;
}

export default function CouponsTable({
  coupons,
  isLoading,
  error,
  onView,
  onEdit,
  onDelete,
}: CouponsTableProps) {
  const t = useTranslations("coupons");
  const tCommon = useTranslations("common");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E6497F]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg font-semibold">
          {tCommon("error")}: {error.message}
        </p>
      </div>
    );
  }

  if (!coupons || coupons.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">{t("noCoupons")}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("code")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("title")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("type")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("discount")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("usage")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("status")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("validity")}
            </th>
            <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("actions")}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {coupons.map((coupon) => (
            <tr key={coupon.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="text-sm font-bold text-gray-900 font-mono bg-gray-100 px-3 py-1 rounded">
                    {coupon.code}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm font-bold text-gray-900">
                  {coupon.title}
                </div>
                <div className="text-xs text-gray-500">{coupon.titleAr}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${getCouponTypeColor(
                    coupon.type
                  )}`}
                >
                  {t(getCouponTypeLabel(coupon.type))}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-bold text-gray-900">
                  {formatDiscountValue(coupon.discountValue, coupon.type)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  <span className="font-bold">{coupon.usedCount}</span> /{" "}
                  {coupon.maxUses}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${getCouponStatusColor(
                    coupon.status
                  )}`}
                >
                  {t(getCouponStatusLabel(coupon.status))}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-xs text-gray-600">
                  <div>{new Date(coupon.startDate).toLocaleDateString()}</div>
                  <div className="text-gray-400">to</div>
                  <div>{new Date(coupon.endDate).toLocaleDateString()}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onView(coupon)}
                    className="text-indigo-600 hover:text-indigo-900 font-bold transition-colors"
                  >
                    {tCommon("view")}
                  </button>
                  <button
                    onClick={() => onEdit(coupon)}
                    className="text-blue-600 hover:text-blue-900 font-bold transition-colors"
                  >
                    {tCommon("edit")}
                  </button>
                  <button
                    onClick={() => onDelete(coupon)}
                    className="text-red-600 hover:text-red-900 font-bold transition-colors"
                  >
                    {tCommon("delete")}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
