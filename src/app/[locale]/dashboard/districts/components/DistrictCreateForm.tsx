"use client";

import { useTranslations, useLocale } from "next-intl";
import type {
  City,
  CreateDistrictRequest,
} from "@/features/locations/types/location.types";

interface DistrictCreateFormProps {
  formData: CreateDistrictRequest;
  cities: City[] | undefined;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (data: Partial<CreateDistrictRequest>) => void;
  onCancel: () => void;
}

export default function DistrictCreateForm({
  formData,
  cities,
  isSubmitting,
  onSubmit,
  onChange,
  onCancel,
}: DistrictCreateFormProps) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-200">
      <h2 className="text-2xl font-bold text-black mb-6 pb-4 border-b-2 border-[#E6497F]">
        {t("locations.createNewDistrict")}
      </h2>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              {t("locations.city")} <span className="text-[#E6497F]">*</span>
            </label>
            <select
              value={formData.cityId}
              onChange={(e) => onChange({ cityId: Number(e.target.value) })}
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-[#E6497F] focus:ring-2 focus:ring-[#E6497F] focus:ring-opacity-50 outline-none transition-all"
              required
            >
              <option value={0}>{t("locations.selectCity")}</option>
              {cities?.map((city) => (
                <option key={city.id} value={city.id}>
                  {locale === "ar" ? city.nameAr : city.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2">
              {t("locations.nameEn")} <span className="text-[#E6497F]">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => onChange({ name: e.target.value })}
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-[#E6497F] focus:ring-2 focus:ring-[#E6497F] focus:ring-opacity-50 outline-none transition-all"
              placeholder="Enter district name in English"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2">
              {t("locations.nameAr")} <span className="text-[#E6497F]">*</span>
            </label>
            <input
              type="text"
              value={formData.nameAr}
              onChange={(e) => onChange({ nameAr: e.target.value })}
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-[#E6497F] focus:ring-2 focus:ring-[#E6497F] focus:ring-opacity-50 outline-none transition-all"
              dir="rtl"
              placeholder="أدخل اسم المنطقة بالعربية"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2">
              {t("locations.postalCode")}
            </label>
            <input
              type="text"
              value={formData.postalCode}
              onChange={(e) => onChange({ postalCode: e.target.value })}
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-[#E6497F] focus:ring-2 focus:ring-[#E6497F] focus:ring-opacity-50 outline-none transition-all"
              placeholder="Enter postal code"
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
              value={formData.deliveryFee}
              onChange={(e) =>
                onChange({ deliveryFee: parseFloat(e.target.value) || 0 })
              }
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-[#E6497F] focus:ring-2 focus:ring-[#E6497F] focus:ring-opacity-50 outline-none transition-all"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2">
              {t("locations.sortOrder")}
            </label>
            <input
              type="number"
              min="0"
              value={formData.sortOrder}
              onChange={(e) =>
                onChange({ sortOrder: parseInt(e.target.value) || 0 })
              }
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-[#E6497F] focus:ring-2 focus:ring-[#E6497F] focus:ring-opacity-50 outline-none transition-all"
              placeholder="0"
            />
          </div>

          <div className="flex items-center pt-6">
            <label className="flex items-center cursor-pointer justify-center gap-4">
              <input
                type="checkbox"
                checked={formData.isActive}
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
            onClick={onCancel}
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
                {t("common.loading")}
              </>
            ) : (
              t("common.submit")
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
