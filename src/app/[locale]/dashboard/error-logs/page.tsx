"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuthGuard } from "@/features/auth/utils/authGurd";
import { useToast } from "@/components/Toast/Toast";
import { getErrorMessage } from "@/utils/api-error";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import {
  useErrorLogs,
  useErrorStatistics,
  useErrorLog,
  useErrorTypes,
  useSeverities,
  useMarkErrorReviewed,
  useDeleteErrorLog,
  useCleanupErrors,
} from "@/features/errorLogs/hooks/useErrorLogs";
import ErrorStatistics from "@/features/errorLogs/components/ErrorStatistics";
import ErrorFilters from "@/features/errorLogs/components/ErrorFilters";
import ErrorLogsTable from "@/features/errorLogs/components/ErrorLogsTable";
import ErrorDetailModal from "@/features/errorLogs/components/ErrorDetailModal";
import CleanupModal from "@/features/errorLogs/components/CleanupModal";
import type { ErrorFilters as ErrorFiltersType } from "@/features/errorLogs/types/errorLogs.types";

export default function ErrorLogsPage() {
  const t = useTranslations("errorLogs");
  const toast = useToast();
  useAuthGuard(["Admin"]);

  // State
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const [dateRange, setDateRange] = useState<{
    startDate?: string;
    endDate?: string;
  }>({});
  const [filters, setFilters] = useState<ErrorFiltersType>({});
  const [selectedErrorId, setSelectedErrorId] = useState<number | null>(null);
  const [showCleanupModal, setShowCleanupModal] = useState(false);

  // Queries
  const { data: errorLogsData, isLoading: isLoadingLogs, error: logsError } =
    useErrorLogs({
      page,
      pageSize,
      ...filters,
      ...dateRange,
    });

  const { data: statisticsData, isLoading: isLoadingStats } =
    useErrorStatistics(dateRange);

  const { data: errorDetailData, isLoading: isLoadingDetail } = useErrorLog(
    selectedErrorId
  );

  const { data: errorTypesData } = useErrorTypes();
  const { data: severitiesData } = useSeverities();

  // Mutations
  const markReviewedMutation = useMarkErrorReviewed();
  const deleteMutation = useDeleteErrorLog();
  const cleanupMutation = useCleanupErrors();

  // Handlers
  const handleViewDetails = (id: number) => {
    setSelectedErrorId(id);
  };

  const handleMarkReviewed = async (id: number) => {
    try {
      await markReviewedMutation.mutateAsync(id);
      toast.success(t("actions.markedReviewed"));
      setSelectedErrorId(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm(t("actions.deleteConfirmation"))) return;

    try {
      await deleteMutation.mutateAsync(id);
      toast.success(t("actions.deleted"));
      if (selectedErrorId === id) {
        setSelectedErrorId(null);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleCleanup = async (errorType: number, daysOld: number) => {
    try {
      await cleanupMutation.mutateAsync({ errorType, daysOld });
      toast.success(t("actions.cleanupSuccess"));
      setShowCleanupModal(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDateRangeChange = (range: {
    startDate?: string;
    endDate?: string;
  }) => {
    setDateRange(range);
    setPage(1); // Reset to first page
  };

  const handleFiltersChange = (newFilters: ErrorFiltersType) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-extrabold text-black mb-3">
                {t("title")}
              </h1>
              <p className="text-lg text-black font-medium">{t("description")}</p>
            </div>
            <button
              onClick={() => setShowCleanupModal(true)}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg transition-colors"
            >
              {t("actions.cleanup")}
            </button>
          </div>
        </div>

        {/* Statistics */}
        <ErrorStatistics
          statistics={statisticsData?.data ? statisticsData : undefined}
          isLoading={isLoadingStats}
          dateRange={dateRange}
          onDateRangeChange={handleDateRangeChange}
        />

        {/* Filters */}
        <ErrorFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          errorTypes={errorTypesData?.data}
          severities={severitiesData?.data}
          isLoading={!errorTypesData || !severitiesData}
        />

        {/* Error Logs Table */}
        <ErrorLogsTable
          errors={errorLogsData?.data}
          isLoading={isLoadingLogs}
          error={logsError}
          pagination={{
            currentPage: errorLogsData?.pagination?.currentPage || page,
            totalPages: errorLogsData?.pagination?.totalPages || 1,
            totalCount: errorLogsData?.pagination?.totalCount || 0,
          }}
          onPageChange={setPage}
          onViewDetails={handleViewDetails}
          onMarkReviewed={handleMarkReviewed}
          onDelete={handleDelete}
        />

        {/* Error Detail Modal */}
        {selectedErrorId && (
          <ErrorDetailModal
            errorLog={
              selectedErrorId === errorDetailData?.data?.id
                ? errorDetailData.data
                : null
            }
            isOpen={!!selectedErrorId}
            onClose={() => setSelectedErrorId(null)}
            onMarkReviewed={handleMarkReviewed}
            onDelete={handleDelete}
            isMarkingReviewed={markReviewedMutation.isPending}
            isDeleting={deleteMutation.isPending}
          />
        )}

        {/* Cleanup Modal */}
        <CleanupModal
          isOpen={showCleanupModal}
          onClose={() => setShowCleanupModal(false)}
          onConfirm={handleCleanup}
          errorTypes={errorTypesData?.data}
          isCleaning={cleanupMutation.isPending}
        />
      </div>
    </DashboardLayout>
  );
}

