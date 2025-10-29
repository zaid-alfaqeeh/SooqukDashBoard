"use client";

import { useTranslations, useLocale } from "next-intl";
import type { District } from "@/features/locations/types/location.types";

interface DistrictTableProps {
  districts: District[] | undefined;
  isLoading: boolean;
  error: Error | null;
  isAdmin: boolean;
  selectedCityId: number | null;
  onEdit: (district: District) => void;
  onDelete: (district: District) => void;
}

export default function DistrictTable({
  districts,
  isLoading,
  error,
  isAdmin,
  selectedCityId,
  onEdit,
  onDelete,
}: DistrictTableProps) {
  const t = useTranslations();
  const locale = useLocale();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-[#E6497F] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-black font-bold text-lg">{t("common.loading")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-red-600"
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
        </div>
        <p className="text-black font-bold text-lg">{t("common.error")}</p>
      </div>
    );
  }

  if (!selectedCityId) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
        </div>
        <p className="text-black font-bold text-lg">
          {t("locations.selectCityToView")}
        </p>
      </div>
    );
  }

  if (districts?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <p className="text-black font-bold text-lg">
          {t("locations.noDistricts")}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
              {t("locations.id")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
              {t("locations.nameEn")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
              {t("locations.nameAr")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
              {t("locations.postalCode")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
              {t("locations.deliveryFee")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
              {t("locations.status")}
            </th>
            {isAdmin && (
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                {t("locations.actions")}
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {districts?.map((district) => (
            <tr
              key={district.id}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-bold text-black">
                  #{district.id}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-semibold text-black">
                  {district.name}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-semibold text-black">
                  {district.nameAr}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-medium text-black">
                  {district.postalCode || "-"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-semibold text-black">
                  {district.deliveryFee
                    ? `${district.deliveryFee.toFixed(2)} JOD`
                    : "-"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${
                    district.isActive
                      ? "bg-green-600 text-white"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {district.isActive
                    ? t("locations.active")
                    : t("locations.inactive")}
                </span>
              </td>
              {isAdmin && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(district)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      aria-label={t("common.edit")}
                      title={t("common.edit")}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete(district)}
                      className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                      aria-label={t("common.delete")}
                      title={t("common.delete")}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
