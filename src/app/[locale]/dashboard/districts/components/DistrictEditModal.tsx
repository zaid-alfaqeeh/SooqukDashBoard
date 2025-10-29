"use client";

import { useTranslations, useLocale } from "next-intl";
import type { City, District } from "@/features/locations/types/location.types";

interface DistrictEditModalProps {
  district: District;
  cities: City[] | undefined;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (data: Partial<District>) => void;
  onClose: () => void;
}

export default function DistrictEditModal({
  district,
  cities,
  isSubmitting,
  onSubmit,
  onChange,
  onClose,
}: DistrictEditModalProps) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-[#E6497F] px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {t("locations.editDistrict")}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6 text-white"
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

        <form
          onSubmit={onSubmit}
          className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                {t("locations.city")} <span className="text-[#E6497F]">*</span>
              </label>
              <select
                value={district.cityId}
                onChange={(e) => onChange({ cityId: Number(e.target.value) })}
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-[#E6497F] focus:ring-2 focus:ring-[#E6497F] focus:ring-opacity-50 outline-none transition-all"
                required
              >
                {cities?.map((city) => (
                  <option key={city.id} value={city.id}>
                    {locale === "ar" ? city.nameAr : city.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-2">
                {t("locations.nameEn")}{" "}
                <span className="text-[#E6497F]">*</span>
              </label>
              <input
                type="text"
                value={district.name}
                onChange={(e) => onChange({ name: e.target.value })}
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-[#E6497F] focus:ring-2 focus:ring-[#E6497F] focus:ring-opacity-50 outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-2">
                {t("locations.nameAr")}{" "}
                <span className="text-[#E6497F]">*</span>
              </label>
              <input
                type="text"
                value={district.nameAr}
                onChange={(e) => onChange({ nameAr: e.target.value })}
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-[#E6497F] focus:ring-2 focus:ring-[#E6497F] focus:ring-opacity-50 outline-none transition-all"
                dir="rtl"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-2">
                {t("locations.postalCode")}
              </label>
              <input
                type="text"
                value={district.postalCode || ""}
                onChange={(e) => onChange({ postalCode: e.target.value })}
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-[#E6497F] focus:ring-2 focus:ring-[#E6497F] focus:ring-opacity-50 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-2">
                {t("locations.deliveryFee")}
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={district.deliveryFee || 0}
                onChange={(e) =>
                  onChange({ deliveryFee: parseFloat(e.target.value) || 0 })
                }
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-[#E6497F] focus:ring-2 focus:ring-[#E6497F] focus:ring-opacity-50 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-2">
                {t("locations.sortOrder")}
              </label>
              <input
                type="number"
                min="0"
                value={district.sortOrder || 0}
                onChange={(e) =>
                  onChange({ sortOrder: parseInt(e.target.value) || 0 })
                }
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-[#E6497F] focus:ring-2 focus:ring-[#E6497F] focus:ring-opacity-50 outline-none transition-all"
              />
            </div>

            <div className="flex items-center pt-6">
              <label className="flex items-center cursor-pointer gap-4">
                <input
                  type="checkbox"
                  checked={district.isActive}
                  onChange={(e) => onChange({ isActive: e.target.checked })}
                  className="w-5 h-5 text-[#E6497F] border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#E6497F]"
                />
                <span className="text-sm font-bold text-black">
                  {t("locations.active")}
                </span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t-2 border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors"
            >
              {t("common.cancel")}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-[#E6497F] hover:bg-[#d63d6f] text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  {t("locations.updating")}
                </>
              ) : (
                t("common.save")
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
