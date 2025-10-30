"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useAuthGuard } from "@/features/auth/utils/authGurd";
import { useToast } from "@/components/Toast/Toast";
import { getErrorMessage } from "@/utils/api-error";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import {
  useOrders,
  useOrderStatistics,
  useCancelOrder,
  useUpdateOrderStatus,
} from "@/features/orders/ordersHooks/useOrders";
import {
  OrderStatus,
  type OrderListItem,
} from "@/features/orders/types/order.types";
import OrderStatistics from "@/features/orders/orderComponent/OrderStatistics";
import OrderFilters from "@/features/orders/orderComponent/OrderFilters";
import OrdersTable from "@/features/orders/orderComponent/OrdersTable";
import OrderStatusModal from "@/features/orders/orderComponent/OrderStatusModal";
import OrderCancelModal from "@/features/orders/orderComponent/OrderCancelModal";

export default function OrdersPage() {
  const t = useTranslations("orders");
  const tCommon = useTranslations("common");
  const toast = useToast();
  const router = useRouter();
  const locale = useLocale();
  useAuthGuard(["Admin"]);

  // Filters and pagination
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [status, setStatus] = useState<OrderStatus | undefined>();
  const [customerName, setCustomerName] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [statusModalOrder, setStatusModalOrder] =
    useState<OrderListItem | null>(null);
  const [cancelModalOrder, setCancelModalOrder] =
    useState<OrderListItem | null>(null);

  // Queries
  const { data, isLoading, error } = useOrders({
    Status: status,
    CustomerName: customerName || undefined,
    OrderNumber: orderNumber || undefined,
    PageNumber: page,
    PageSize: pageSize,
    SortDescending: true,
  });

  const { data: statistics } = useOrderStatistics();
  const updateStatusMutation = useUpdateOrderStatus();
  const cancelMutation = useCancelOrder();

  const handleViewDetails = (id: number) => {
    router.push(`/${locale}/dashboard/orders/${id}`);
  };

  const handleUpdateStatus = async (
    orderId: number,
    newStatus: OrderStatus,
    notes?: string
  ) => {
    try {
      await updateStatusMutation.mutateAsync({
        id: orderId,
        data: {
          status: newStatus,
          notes,
        },
      });
      setStatusModalOrder(null);
      toast.success(t("actions.statusUpdated"));
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleCancelOrder = async (orderId: number, reason: string) => {
    try {
      await cancelMutation.mutateAsync({
        id: orderId,
        data: { reason },
      });
      setCancelModalOrder(null);
      toast.success(t("actions.orderCancelled"));
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleStatusChange = (newStatus: OrderStatus | undefined) => {
    setStatus(newStatus);
    setPage(1);
  };

  const handleCustomerNameChange = (name: string) => {
    setCustomerName(name);
    setPage(1);
  };

  const handleOrderNumberChange = (number: string) => {
    setOrderNumber(number);
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
        {statistics && <OrderStatistics statistics={statistics} />}

        {/* Filters */}
        <OrderFilters
          status={status}
          customerName={customerName}
          orderNumber={orderNumber}
          onStatusChange={handleStatusChange}
          onCustomerNameChange={handleCustomerNameChange}
          onOrderNumberChange={handleOrderNumberChange}
        />

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <OrdersTable
            orders={data?.data || []}
            isLoading={isLoading}
            error={error}
            onViewDetails={handleViewDetails}
            onUpdateStatus={setStatusModalOrder}
            onCancelOrder={setCancelModalOrder}
          />

          {/* Pagination */}
          {data?.pagination && data.pagination.totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                {tCommon("page")} {data.pagination.pageNumber} {tCommon("of")}{" "}
                {data.pagination.totalPages} ({data.pagination.totalCount}{" "}
                total)
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={!data.pagination.hasPreviousPage}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-black font-bold rounded transition-colors"
                >
                  {tCommon("previous")}
                </button>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!data.pagination.hasNextPage}
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
          <OrderStatusModal
            order={statusModalOrder}
            onClose={() => setStatusModalOrder(null)}
            onUpdate={handleUpdateStatus}
            isLoading={updateStatusMutation.isPending}
          />
        )}

        {/* Cancel Order Modal */}
        {cancelModalOrder && (
          <OrderCancelModal
            order={cancelModalOrder}
            onClose={() => setCancelModalOrder(null)}
            onCancel={handleCancelOrder}
            isLoading={cancelMutation.isPending}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
