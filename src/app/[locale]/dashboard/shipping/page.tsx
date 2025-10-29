"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useAuthGuard } from "@/features/auth/utils/authGurd";
import { useToast } from "@/components/Toast/Toast";
import { getErrorMessage } from "@/utils/api-error";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import {
  useShippingOrders,
  useShippingStatistics,
  useUpdateShippingOrderStatus,
} from "@/features/shipping/hooks/useShipping";
import {
  OrderStatus,
  type ShippingOrderListItem,
} from "@/features/shipping/types/shipping.types";
import { formatDateForApi } from "@/features/shipping/utils/shippingUtils";
import ShippingStatistics from "@/features/shipping/components/ShippingStatistics";
import ShippingFilters from "@/features/shipping/components/ShippingFilters";
import ShippingOrdersTable from "@/features/shipping/components/ShippingOrdersTable";
import UpdateStatusModal from "@/features/shipping/components/UpdateStatusModal";

export default function ShippingPage() {
  const t = useTranslations("shipping");
  const tCommon = useTranslations("common");
  const toast = useToast();
  const router = useRouter();
  const locale = useLocale();
  useAuthGuard(["Admin", "ShippingCompany"]);

  // Filters and pagination
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [search, setSearch] = useState("");
  const [cityId, setCityId] = useState<number | undefined>();
  const [districtId, setDistrictId] = useState<number | undefined>();
  const [status, setStatus] = useState<OrderStatus | undefined>();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [lateHours, setLateHours] = useState<number | undefined>();

  // Modal state
  const [statusModalOrder, setStatusModalOrder] =
    useState<ShippingOrderListItem | null>(null);

  // Queries
  const { data, isLoading, error } = useShippingOrders({
    CityId: cityId,
    DistrictId: districtId,
    Status: status,
    Search: search || undefined,
    FromDate: fromDate ? formatDateForApi(fromDate) : undefined,
    ToDate: toDate ? formatDateForApi(toDate) : undefined,
    LateHours: lateHours,
    Page: page,
    PageSize: pageSize,
  });

  const { data: statistics } = useShippingStatistics();
  const updateStatusMutation = useUpdateShippingOrderStatus();

  // Handlers
  const handleViewDetails = (id: number) => {
    router.push(`/${locale}/dashboard/shipping/${id}`);
  };

  const handleUpdateStatus = async (orderId: number, newStatus: 4 | 5 | 6) => {
    try {
      await updateStatusMutation.mutateAsync({
        id: orderId,
        data: { status: newStatus },
      });
      setStatusModalOrder(null);
      toast.success(t("statusUpdatedSuccess"));
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleClearFilters = () => {
    setSearch("");
    setCityId(undefined);
    setDistrictId(undefined);
    setStatus(undefined);
    setFromDate("");
    setToDate("");
    setLateHours(undefined);
    setPage(1);
  };

  const handleStatusChange = (newStatus: OrderStatus | undefined) => {
    setStatus(newStatus);
    setPage(1);
  };

  const handleCityChange = (newCityId: number | undefined) => {
    setCityId(newCityId);
    setDistrictId(undefined); // Reset district when city changes
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

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

        {/* Statistics Cards */}
        {statistics && <ShippingStatistics statistics={statistics} />}

        {/* Filters */}
        <ShippingFilters
          search={search}
          cityId={cityId}
          districtId={districtId}
          status={status}
          fromDate={fromDate}
          toDate={toDate}
          lateHours={lateHours}
          onSearchChange={handleSearchChange}
          onCityChange={handleCityChange}
          onDistrictChange={(value) => {
            setDistrictId(value);
            setPage(1);
          }}
          onStatusChange={handleStatusChange}
          onFromDateChange={(value) => {
            setFromDate(value);
            setPage(1);
          }}
          onToDateChange={(value) => {
            setToDate(value);
            setPage(1);
          }}
          onLateHoursChange={(value) => {
            setLateHours(value);
            setPage(1);
          }}
          onClearFilters={handleClearFilters}
        />

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <ShippingOrdersTable
            orders={data?.data || []}
            isLoading={isLoading}
            error={error}
            onViewDetails={handleViewDetails}
            onUpdateStatus={setStatusModalOrder}
          />

          {/* Pagination */}
          {data?.pagination && data.pagination.totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                {tCommon("page")} {data.pagination.currentPage} {tCommon("of")}{" "}
                {data.pagination.totalPages} ({data.pagination.totalCount}{" "}
                {t("totalOrders")})
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={data.pagination.currentPage === 1}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-black font-bold rounded transition-colors"
                >
                  {tCommon("previous")}
                </button>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={
                    data.pagination.currentPage === data.pagination.totalPages
                  }
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-black font-bold rounded transition-colors"
                >
                  {tCommon("next")}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Update Status Modal */}
        {statusModalOrder && (
          <UpdateStatusModal
            order={statusModalOrder}
            onClose={() => setStatusModalOrder(null)}
            onUpdate={handleUpdateStatus}
            isLoading={updateStatusMutation.isPending}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
