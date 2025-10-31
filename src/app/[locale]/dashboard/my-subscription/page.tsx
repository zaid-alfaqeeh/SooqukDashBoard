"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useAuthGuard } from "@/features/auth/utils/authGurd";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import {
  useCurrentSubscription,
  useSubscriptionHistory,
} from "@/features/mySubscription/hooks/useMySubscription";
import CurrentSubscriptionCard from "@/features/mySubscription/components/CurrentSubscriptionCard";
import SubscriptionHistoryTable from "@/features/mySubscription/components/SubscriptionHistoryTable";

export default function MySubscriptionPage() {
  const t = useTranslations("mySubscription");
  useAuthGuard(["Vendor", "Admin"]);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const {
    data: currentSubscription,
    isLoading: isLoadingCurrent,
    error: currentError,
  } = useCurrentSubscription();

  const {
    data: historyData,
    isLoading: isLoadingHistory,
    error: historyError,
  } = useSubscriptionHistory({
    pageNumber: page,
    pageSize,
  });

  if (isLoadingCurrent || isLoadingHistory) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-black font-semibold">{t("loading")}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-black mb-3">
            {t("title")}
          </h1>
          <p className="text-lg text-black font-medium">{t("description")}</p>
        </div>

        {/* Current Subscription */}
        {currentError ? (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-2xl p-6">
            <p className="text-red-700 font-semibold">
              {t("error")}: {currentError.message}
            </p>
          </div>
        ) : currentSubscription ? (
          <div className="mb-8">
            <CurrentSubscriptionCard
              subscription={currentSubscription}
              isLoading={isLoadingCurrent}
            />
          </div>
        ) : null}

        {/* Subscription History */}
        {historyError ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <p className="text-red-700 font-semibold">
              {t("error")}: {historyError.message}
            </p>
          </div>
        ) : (
          <SubscriptionHistoryTable
            subscriptions={historyData?.subscriptions}
            totalPages={historyData?.totalPages || 1}
            currentPage={historyData?.currentPage || 1}
            totalSubscriptions={historyData?.totalSubscriptions || 0}
            isLoading={isLoadingHistory}
            onPageChange={setPage}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
