"use client";

import { useTranslations } from "next-intl";
import type { ShippingOrderListItem } from "../types/shipping.types";
import { getStatusColor, getStatusLabel } from "../utils/shippingUtils";

interface ShippingOrdersTableProps {
  orders: ShippingOrderListItem[];
  isLoading?: boolean;
  error?: Error | null;
  onViewDetails: (id: number) => void;
  onUpdateStatus: (order: ShippingOrderListItem) => void;
}

export default function ShippingOrdersTable({
  orders,
  isLoading,
  error,
  onViewDetails,
  onUpdateStatus,
}: ShippingOrdersTableProps) {
  const t = useTranslations("shipping");
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

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">{t("noOrders")}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("orderNumber")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("customer")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("location")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("items")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("amount")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("status")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("createdAt")}
            </th>
            <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("actions")}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="text-sm font-bold text-gray-900">
                    {order.orderNumber}
                  </div>
                  {order.isLate && (
                    <span className="ml-2 px-2 py-1 text-xs font-bold bg-red-100 text-red-700 rounded-full">
                      {t("late")}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-semibold text-gray-900">
                  {order.customerName}
                </div>
                <div className="text-sm text-gray-500">
                  {order.customerEmail}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-semibold text-gray-900">
                  {order.city}
                </div>
                <div className="text-sm text-gray-500">{order.district}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                {order.itemsCount} {t("items")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                {order.totalAmount.toFixed(2)} JOD
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${getStatusColor(
                    order.status
                  )}`}
                >
                  {t(getStatusLabel(order.status))}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onViewDetails(order.id)}
                    className="text-blue-600 hover:text-blue-900 font-bold transition-colors"
                  >
                    {t("view")}
                  </button>
                  <button
                    onClick={() => onUpdateStatus(order)}
                    className="text-[#E6497F] hover:text-[#d63d6f] font-bold transition-colors"
                  >
                    {t("updateStatus")}
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
