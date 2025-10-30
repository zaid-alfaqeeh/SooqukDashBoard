"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import type {
  VendorOrderListItem,
  OrderStatus,
  UpdateVendorOrderStatusRequest,
} from "../types/order.types";
import {
  useVendorOrders,
  useUpdateVendorOrderStatus,
} from "../ordersHooks/useOrders";
import {
  getOrderStatusInfo,
  formatCurrency,
  formatDate,
} from "../utils/orderUtils";
import { useToast } from "@/components/Toast/Toast";
import { getErrorMessage } from "@/utils/api-error";
import VendorOrderStatusModal from "./VendorOrderStatusModal";

interface VendorOrdersTableProps {
  vendorId: number;
}

export default function VendorOrdersTable({
  vendorId,
}: VendorOrdersTableProps) {
  const t = useTranslations("vendorOrders");
  const locale = useLocale();
  const router = useRouter();
  const toast = useToast();

  const [statusFilter, setStatusFilter] = useState<OrderStatus | undefined>(
    undefined
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [selectedOrder, setSelectedOrder] =
    useState<VendorOrderListItem | null>(null);

  // Fetch vendor orders
  const { data, isLoading, error } = useVendorOrders(vendorId, {
    pageNumber,
    pageSize,
    status: statusFilter,
  });

  // Update status mutation
  const updateStatusMutation = useUpdateVendorOrderStatus();

  const handleUpdateStatus = async (
    orderId: number,
    newStatus: OrderStatus
  ) => {
    try {
      const requestData: UpdateVendorOrderStatusRequest = {
        Status: newStatus,
      };

      await updateStatusMutation.mutateAsync({
        vendorId,
        orderId,
        data: requestData,
      });

      setSelectedOrder(null);
      toast.success(t("statusUpdated"));
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleViewDetails = (orderId: number) => {
    router.push(`/${locale}/dashboard/orders/${orderId}`);
  };

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600 font-semibold">{t("error")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-black">
            {t("filterStatus")}:
          </label>
          <select
            value={statusFilter || "all"}
            onChange={(e) => {
              const value = e.target.value;
              setStatusFilter(value === "all" ? undefined : Number(value));
              setPageNumber(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-black font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all" className="text-black">
              {t("allStatuses")}
            </option>
            <option value="1" className="text-black">
              {t("statusPending")}
            </option>
            <option value="2" className="text-black">
              {t("statusConfirmed")}
            </option>
            <option value="3" className="text-black">
              {t("statusProcessing")}
            </option>
            <option value="4" className="text-black">
              {t("statusShipped")}
            </option>
            <option value="5" className="text-black">
              {t("statusDelivered")}
            </option>
            <option value="6" className="text-black">
              {t("statusCancelled")}
            </option>
          </select>
        </div>

        {data && (
          <div className="text-sm text-black font-medium">
            {t("showing")} {data.items.length} {t("of")} {data.totalCount}{" "}
            {t("orders")}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-purple-600 to-purple-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                {t("orderId")}
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                {t("customer")}
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                {t("items")}
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                {t("total")}
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                {t("status")}
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                {t("date")}
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                {t("actions")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                    <span className="ml-3 text-black">{t("loading")}</span>
                  </div>
                </td>
              </tr>
            ) : data && data.items.length > 0 ? (
              data.items.map((order) => {
                const statusInfo = getOrderStatusInfo(order.status);
                return (
                  <tr
                    key={order.orderId}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-purple-600">
                        #{order.orderId}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-semibold text-black">
                          {order.customerName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-black font-medium">
                        {order.itemsCount}{" "}
                        {order.itemsCount === 1 ? "item" : "items"}
                      </div>
                      {order.items.length > 0 && (
                        <div className="text-xs text-gray-600 mt-1">
                          {order.items[0].productName}
                          {order.items.length > 1 &&
                            ` +${order.items.length - 1} more`}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-black">
                        {formatCurrency(order.totalAmount, "JOD")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs font-bold rounded-full ${statusInfo.colorClass}`}
                      >
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black font-medium">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewDetails(order.orderId)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
                        >
                          {t("view")}
                        </button>
                        {/* Only show update status if not delivered or cancelled */}
                        {order.status !== 5 && order.status !== 6 && (
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors"
                          >
                            {t("updateStatus")}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center">
                  <p className="text-black font-semibold">{t("noOrders")}</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => setPageNumber((prev) => Math.max(1, prev - 1))}
              disabled={!data.hasPreviousPage}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-bold text-black hover:bg-gray-50 disabled:opacity-50"
            >
              {t("previous")}
            </button>
            <button
              onClick={() =>
                setPageNumber((prev) => Math.min(data.totalPages, prev + 1))
              }
              disabled={!data.hasNextPage}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-bold text-black hover:bg-gray-50 disabled:opacity-50"
            >
              {t("next")}
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-black font-medium">
                {t("page")} <span className="font-bold">{data.pageNumber}</span>{" "}
                {t("of")} <span className="font-bold">{data.totalPages}</span>
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                <button
                  onClick={() => setPageNumber((prev) => Math.max(1, prev - 1))}
                  disabled={!data.hasPreviousPage}
                  className="relative inline-flex items-center rounded-l-md px-4 py-2 text-black font-bold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 disabled:opacity-50"
                >
                  {t("previous")}
                </button>
                <button
                  onClick={() =>
                    setPageNumber((prev) => Math.min(data.totalPages, prev + 1))
                  }
                  disabled={!data.hasNextPage}
                  className="relative inline-flex items-center rounded-r-md px-4 py-2 text-black font-bold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 disabled:opacity-50"
                >
                  {t("next")}
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Status Update Modal */}
      {selectedOrder && (
        <VendorOrderStatusModal
          order={{
            orderId: selectedOrder.orderId,
            customerName: selectedOrder.customerName,
            totalAmount: selectedOrder.totalAmount,
            status: selectedOrder.status,
          }}
          onClose={() => setSelectedOrder(null)}
          onUpdate={handleUpdateStatus}
          isLoading={updateStatusMutation.isPending}
        />
      )}
    </div>
  );
}
