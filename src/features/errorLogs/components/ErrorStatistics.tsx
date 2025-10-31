"use client";

import { useTranslations } from "next-intl";
import type { ErrorStatisticsResponse } from "../types/errorLogs.types";
import { getErrorTypeColor } from "../utils/errorLogsUtils";

interface ErrorStatisticsProps {
  statistics: ErrorStatisticsResponse | undefined;
  isLoading: boolean;
  dateRange: { startDate?: string; endDate?: string };
  onDateRangeChange: (range: { startDate?: string; endDate?: string }) => void;
}

export default function ErrorStatistics({
  statistics,
  isLoading,
  dateRange,
  onDateRangeChange,
}: ErrorStatisticsProps) {
  const t = useTranslations("errorLogs");

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 animate-pulse"
          >
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!statistics?.data) return null;

  const { totalErrors, errorsByType, dateRange: statsDateRange } = statistics.data;

  return (
    <div className="mb-8">
      {/* Date Range Filter */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t("statistics.startDate")}
            </label>
            <input
              type="datetime-local"
              value={dateRange.startDate || ""}
              onChange={(e) =>
                onDateRangeChange({ ...dateRange, startDate: e.target.value })
              }
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 outline-none transition-all"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t("statistics.endDate")}
            </label>
            <input
              type="datetime-local"
              value={dateRange.endDate || ""}
              onChange={(e) =>
                onDateRangeChange({ ...dateRange, endDate: e.target.value })
              }
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 outline-none transition-all"
            />
          </div>
          <button
            onClick={() => onDateRangeChange({})}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-black font-bold rounded-lg transition-colors"
          >
            {t("statistics.clearDates")}
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-600 font-medium">
          {t("statistics.period")}: {statsDateRange.startDate} -{" "}
          {statsDateRange.endDate}
        </p>
      </div>

      {/* Total Errors Card */}
      <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90 font-medium mb-2">
              {t("statistics.totalErrors")}
            </p>
            <p className="text-5xl font-black">{totalErrors}</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Errors by Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {errorsByType.map((errorType) => {
          const colorClass = getErrorTypeColor(
            errorType.errorTypeValue,
            errorType.errorType
          );
          return (
            <div
              key={errorType.errorTypeValue}
              className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-black">
                  {errorType.errorType}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${colorClass}`}
                >
                  {errorType.errorType}
                </span>
              </div>
              <div className="mb-4">
                <div className="flex items-baseline gap-2 mb-2">
                  <p className="text-3xl font-black text-black">
                    {errorType.count}
                  </p>
                  <p className="text-sm text-gray-600 font-semibold">
                    ({errorType.percentage.toFixed(1)}%)
                  </p>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                    style={{ width: `${errorType.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

