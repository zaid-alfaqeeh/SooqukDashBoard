"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import type { SubscriptionHistoryItem } from "../types/mySubscription.types";

interface SubscriptionHistoryTableProps {
  subscriptions: SubscriptionHistoryItem[] | undefined;
  totalPages: number;
  currentPage: number;
  totalSubscriptions: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

export default function SubscriptionHistoryTable({
  subscriptions,
  totalPages,
  currentPage,
  totalSubscriptions,
  isLoading,
  onPageChange,
}: SubscriptionHistoryTableProps) {
  const t = useTranslations();
  const locale = useLocale();

  const getStatusColor = (status: string, isActive: boolean) => {
    if (status === "Active" && isActive) {
      return "bg-green-100 text-green-700";
    }
    if (status === "Expired" || !isActive) {
      return "bg-red-100 text-red-700";
    }
    return "bg-gray-100 text-gray-700";
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!subscriptions || subscriptions.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 text-center">
        <p className="text-black font-semibold">{t("mySubscription.noHistory")}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-black">
          {t("mySubscription.history")}
        </h2>
        <p className="text-black font-medium mt-1">
          {t("mySubscription.totalSubscriptions")}: {totalSubscriptions}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                {t("mySubscription.planName")}
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                {t("mySubscription.price")}
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                {t("mySubscription.duration")}
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                {t("mySubscription.startDate")}
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                {t("mySubscription.endDate")}
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                {t("mySubscription.status")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subscriptions.map((subscription) => {
              const planName =
                locale === "ar"
                  ? subscription.planNameAr
                  : subscription.planName;
              return (
                <tr
                  key={subscription.subscriptionId}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-bold text-black">
                        {planName}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {locale === "ar"
                          ? subscription.planDescriptionAr
                          : subscription.planDescription}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-black font-bold">
                      {subscription.price.toFixed(2)} JOD
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-black font-semibold">
                      {subscription.durationInMonths}{" "}
                      {subscription.durationInMonths === 1
                        ? t("mySubscription.month")
                        : t("mySubscription.months")}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-black font-semibold">
                      {new Date(subscription.startDate).toLocaleDateString(
                        locale,
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-black font-semibold">
                      {new Date(subscription.endDate).toLocaleDateString(
                        locale,
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        subscription.status,
                        subscription.isActive
                      )}`}
                    >
                      {subscription.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm font-semibold text-black">
            {t("common.page")} {currentPage} {t("common.of")} {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-bold text-black hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {t("common.previous")}
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-bold text-black hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {t("common.next")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

