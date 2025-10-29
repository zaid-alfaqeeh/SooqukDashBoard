"use client";

import { useTranslations } from "next-intl";
import { useCities } from "@/features/locations/hooks/useCities";
import {
  useDistricts,
  useDistrictsByCityId,
} from "@/features/locations/hooks/useDistricts";
import { OrderStatus } from "../types/shipping.types";

interface ShippingFiltersProps {
  search: string;
  cityId?: number;
  districtId?: number;
  status?: OrderStatus;
  fromDate: string;
  toDate: string;
  lateHours?: number;
  onSearchChange: (value: string) => void;
  onCityChange: (value: number | undefined) => void;
  onDistrictChange: (value: number | undefined) => void;
  onStatusChange: (value: OrderStatus | undefined) => void;
  onFromDateChange: (value: string) => void;
  onToDateChange: (value: string) => void;
  onLateHoursChange: (value: number | undefined) => void;
  onClearFilters: () => void;
}

export default function ShippingFilters({
  search,
  cityId,
  districtId,
  status,
  fromDate,
  toDate,
  lateHours,
  onSearchChange,
  onCityChange,
  onDistrictChange,
  onStatusChange,
  onFromDateChange,
  onToDateChange,
  onLateHoursChange,
  onClearFilters,
}: ShippingFiltersProps) {
  const t = useTranslations("shipping");
  const tCommon = useTranslations("common");

  const { data: cities } = useCities();
  const { data: districts } = useDistrictsByCityId(cityId || null);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{t("filters")}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t("search")}
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black placeholder:text-gray-500 focus:border-[#E6497F] outline-none"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t("city")}
          </label>
          <select
            value={cityId || ""}
            onChange={(e) =>
              onCityChange(e.target.value ? Number(e.target.value) : undefined)
            }
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
          >
            <option value="">{t("allCities")}</option>
            {cities?.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t("district")}
          </label>
          <select
            value={districtId || ""}
            onChange={(e) =>
              onDistrictChange(
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            disabled={!cityId}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none disabled:opacity-50"
          >
            <option value="">{t("allDistricts")}</option>
            {districts?.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t("status")}
          </label>
          <select
            value={status || ""}
            onChange={(e) =>
              onStatusChange(
                e.target.value
                  ? (Number(e.target.value) as OrderStatus)
                  : undefined
              )
            }
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
          >
            <option value="">{t("allStatuses")}</option>
            <option value={OrderStatus.Pending}>{t("statusPending")}</option>
            <option value={OrderStatus.Confirmed}>
              {t("statusConfirmed")}
            </option>
            <option value={OrderStatus.Processing}>
              {t("statusProcessing")}
            </option>
            <option value={OrderStatus.Shipped}>{t("statusShipped")}</option>
            <option value={OrderStatus.Delivered}>
              {t("statusDelivered")}
            </option>
            <option value={OrderStatus.Cancelled}>
              {t("statusCancelled")}
            </option>
          </select>
        </div>

        {/* From Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t("fromDate")}
          </label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => onFromDateChange(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
          />
        </div>

        {/* To Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t("toDate")}
          </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => onToDateChange(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
          />
        </div>

        {/* Late Hours */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t("lateHours")}
          </label>
          <input
            type="number"
            value={lateHours || ""}
            onChange={(e) =>
              onLateHoursChange(
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            placeholder={t("lateHoursPlaceholder")}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black placeholder:text-gray-500 focus:border-[#E6497F] outline-none"
          />
        </div>

        {/* Clear Button */}
        <div className="flex items-end">
          <button
            onClick={onClearFilters}
            className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black font-bold rounded-lg transition-colors"
          >
            {tCommon("clear")}
          </button>
        </div>
      </div>
    </div>
  );
}
