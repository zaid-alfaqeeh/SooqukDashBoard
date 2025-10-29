"use client";

import { useTranslations } from "next-intl";
import type { HeroSlider } from "../types/heroSlider.types";

interface HeroSlidersTableProps {
  sliders: HeroSlider[];
  isLoading?: boolean;
  error?: Error | null;
  onEdit: (slider: HeroSlider) => void;
  onDelete: (slider: HeroSlider) => void;
}

export default function HeroSlidersTable({
  sliders,
  isLoading,
  error,
  onEdit,
  onDelete,
}: HeroSlidersTableProps) {
  const t = useTranslations("heroSliders");
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

  if (!sliders || sliders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">{t("noSliders")}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("preview")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("title")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("sortOrder")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("status")}
            </th>
            <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("actions")}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sliders.map((slider) => (
            <tr key={slider.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-24 h-16 rounded-lg overflow-hidden bg-gray-200">
                  <img
                    src={slider.image}
                    alt={slider.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm font-bold text-gray-900">
                  {slider.title}
                </div>
                {slider.link && (
                  <div className="text-xs text-gray-500 mt-1 truncate max-w-xs">
                    {slider.link}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-bold rounded-full">
                  {slider.sortOrder}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${
                    slider.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {slider.isActive ? t("active") : t("inactive")}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(slider)}
                    className="text-blue-600 hover:text-blue-900 font-bold transition-colors"
                  >
                    {tCommon("edit")}
                  </button>
                  <button
                    onClick={() => onDelete(slider)}
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
