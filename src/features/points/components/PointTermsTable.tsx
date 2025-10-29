"use client";

import { useTranslations } from "next-intl";
import type { PointTerm } from "../types/points.types";

interface PointTermsTableProps {
  terms: PointTerm[];
  isLoading?: boolean;
  error?: Error | null;
  onEdit: (term: PointTerm) => void;
  onDelete: (term: PointTerm) => void;
}

export default function PointTermsTable({
  terms,
  isLoading,
  error,
  onEdit,
  onDelete,
}: PointTermsTableProps) {
  const t = useTranslations("points");
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

  if (!terms || terms.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">{t("noTerms")}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("id")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("programName")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("description")}
            </th>
            <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("referrerPoints")}
            </th>
            <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("refereePoints")}
            </th>
            <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("maxUsage")}
            </th>
            <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("status")}
            </th>
            <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("actions")}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {terms.map((term) => (
            <tr key={term.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-bold rounded-full">
                  #{term.id}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-gray-900">{term.name}</span>
                  <span className="text-sm text-gray-500" dir="rtl">
                    {term.nameAr}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 max-w-xs">
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-gray-700 truncate">
                    {term.description}
                  </p>
                  <p className="text-sm text-gray-500 truncate" dir="rtl">
                    {term.descriptionAr}
                  </p>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full">
                  +{term.referrerPoints}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-bold rounded-full">
                  +{term.refereePoints}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <span className="text-sm font-bold text-gray-700">
                  {term.maxUsagePerCode}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <span
                  className={`px-3 py-1 text-xs font-bold rounded-full ${
                    term.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {term.isActive ? t("active") : t("inactive")}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(term)}
                    className="text-blue-600 hover:text-blue-900 font-bold transition-colors"
                  >
                    {tCommon("edit")}
                  </button>
                  <button
                    onClick={() => onDelete(term)}
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
