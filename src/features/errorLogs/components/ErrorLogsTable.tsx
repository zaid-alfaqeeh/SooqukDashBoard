"use client";

import { useTranslations } from "next-intl";
import type { ErrorLog } from "../types/errorLogs.types";
import { getErrorTypeColor, getSeverityColor, formatErrorDate, truncateText } from "../utils/errorLogsUtils";

interface ErrorLogsTableProps {
  errors: ErrorLog[] | undefined;
  isLoading: boolean;
  error: Error | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
  };
  onPageChange: (page: number) => void;
  onViewDetails: (id: number) => void;
  onMarkReviewed: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function ErrorLogsTable({
  errors,
  isLoading,
  error,
  pagination,
  onPageChange,
  onViewDetails,
  onMarkReviewed,
  onDelete,
}: ErrorLogsTableProps) {
  const t = useTranslations("errorLogs");

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <div className="flex justify-center py-20">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <p className="text-red-700 font-semibold">
          {t("errors.loadingFailed")}: {error.message}
        </p>
      </div>
    );
  }

  if (!errors || errors.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 text-center">
        <p className="text-black font-semibold">{t("noErrors")}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-purple-600 to-purple-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                {t("table.id")}
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                {t("table.errorType")}
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                {t("table.severity")}
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                {t("table.errorMessage")}
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                {t("table.controller")}
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                {t("table.user")}
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                {t("table.timestamp")}
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                {t("table.status")}
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                {t("table.actions")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {errors.map((errorLog) => (
              <tr
                key={errorLog.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-bold text-black">
                    #{errorLog.id}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${getErrorTypeColor(
                      errorLog.errorType,
                      errorLog.errorTypeName
                    )}`}
                  >
                    {errorLog.errorTypeName}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${getSeverityColor(
                      errorLog.severity
                    )}`}
                  >
                    {errorLog.severityName}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-black font-semibold max-w-xs">
                    {truncateText(errorLog.errorMessage, 60)}
                  </p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-gray-700 font-medium">
                    {errorLog.controllerName || "-"}
                  </p>
                  {errorLog.actionName && (
                    <p className="text-xs text-gray-500">
                      {errorLog.actionName}
                    </p>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-black font-semibold">
                    {errorLog.userName}
                  </p>
                  {errorLog.userId && (
                    <p className="text-xs text-gray-500">{errorLog.userId}</p>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-xs text-gray-600 font-medium">
                    {formatErrorDate(errorLog.timestamp)}
                  </p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {errorLog.isReviewed ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-300">
                      {t("table.reviewed")}
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700 border border-yellow-300">
                      {t("table.unreviewed")}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewDetails(errorLog.id)}
                      className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs font-bold rounded-lg transition-colors"
                      title={t("table.viewDetails")}
                    >
                      {t("table.view")}
                    </button>
                    {!errorLog.isReviewed && (
                      <button
                        onClick={() => onMarkReviewed(errorLog.id)}
                        className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 text-xs font-bold rounded-lg transition-colors"
                        title={t("table.markReviewed")}
                      >
                        ✓
                      </button>
                    )}
                    <button
                      onClick={() => onDelete(errorLog.id)}
                      className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-bold rounded-lg transition-colors"
                      title={t("table.delete")}
                    >
                      ×
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm font-semibold text-black">
            {t("table.showing")} {(pagination.currentPage - 1) * 20 + 1} -{" "}
            {Math.min(pagination.currentPage * 20, pagination.totalCount)}{" "}
            {t("table.of")} {pagination.totalCount} {t("table.errors")}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-bold text-black hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {t("table.previous")}
            </button>
            <span className="px-4 py-2 text-sm font-bold text-black">
              {t("table.page")} {pagination.currentPage} {t("table.of")}{" "}
              {pagination.totalPages}
            </span>
            <button
              onClick={() => onPageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-bold text-black hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {t("table.next")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

