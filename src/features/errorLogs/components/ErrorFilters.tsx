"use client";

import { useTranslations } from "next-intl";
import type { ErrorFilters, ErrorType, Severity } from "../types/errorLogs.types";

interface ErrorFiltersProps {
  filters: ErrorFilters;
  onFiltersChange: (filters: ErrorFilters) => void;
  errorTypes: ErrorType[] | undefined;
  severities: Severity[] | undefined;
  isLoading: boolean;
}

export default function ErrorFilters({
  filters,
  onFiltersChange,
  errorTypes,
  severities,
  isLoading,
}: ErrorFiltersProps) {
  const t = useTranslations("errorLogs");

  const handleFilterChange = (key: keyof ErrorFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value === "" || value === undefined ? undefined : value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 mb-8 animate-pulse">
        <div className="h-12 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-black">{t("filters.title")}</h2>
        <button
          onClick={clearFilters}
          className="px-4 py-2 text-sm font-bold text-gray-700 hover:text-black transition-colors"
        >
          {t("filters.clearAll")}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            {t("filters.search")}
          </label>
          <input
            type="text"
            value={filters.search || ""}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            placeholder={t("filters.searchPlaceholder")}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 outline-none transition-all"
          />
        </div>

        {/* Error Type */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            {t("filters.errorType")}
          </label>
          <select
            value={filters.errorType || ""}
            onChange={(e) =>
              handleFilterChange(
                "errorType",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 outline-none transition-all"
          >
            <option value="">{t("filters.allTypes")}</option>
            {errorTypes?.map((type) => (
              <option key={type.value} value={type.value}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {/* Severity */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            {t("filters.severity")}
          </label>
          <select
            value={filters.severity?.toString() || ""}
            onChange={(e) =>
              handleFilterChange(
                "severity",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 outline-none transition-all"
          >
            <option value="">{t("filters.allSeverities")}</option>
            {severities?.map((severity) => (
              <option key={severity.value} value={severity.value}>
                {severity.name}
              </option>
            ))}
          </select>
        </div>

        {/* Review Status */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            {t("filters.reviewStatus")}
          </label>
          <select
            value={
              filters.isReviewed === undefined
                ? ""
                : filters.isReviewed
                ? "true"
                : "false"
            }
            onChange={(e) =>
              handleFilterChange(
                "isReviewed",
                e.target.value === ""
                  ? undefined
                  : e.target.value === "true"
              )
            }
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 outline-none transition-all"
          >
            <option value="">{t("filters.all")}</option>
            <option value="false">{t("filters.unreviewed")}</option>
            <option value="true">{t("filters.reviewed")}</option>
          </select>
        </div>
      </div>
    </div>
  );
}

