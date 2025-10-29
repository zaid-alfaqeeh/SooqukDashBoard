import { useTranslations } from "next-intl";
import { OrderStatus, type OrderListItem } from "../types/order.types";
import {
  getOrderStatusInfo,
  formatCurrency,
  formatDate,
} from "../utils/orderUtils";

interface OrdersTableProps {
  orders: OrderListItem[];
  isLoading: boolean;
  error: Error | null;
  onViewDetails: (id: number) => void;
  onUpdateStatus: (order: OrderListItem) => void;
  onCancelOrder: (order: OrderListItem) => void;
}

export default function OrdersTable({
  orders,
  isLoading,
  error,
  onViewDetails,
  onUpdateStatus,
  onCancelOrder,
}: OrdersTableProps) {
  const t = useTranslations("orders");

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-16 h-16 border-4 border-[#E6497F] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600 font-semibold">
        {t("errors.loadingOrders")}
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-20 text-gray-600 font-semibold">
        {t("noOrders")}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("orderNumber")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("customer")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("vendor")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("items")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("total")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("status")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("createdAt")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("actions.viewDetails")}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.map((order) => {
            const statusInfo = getOrderStatusInfo(order.status);
            return (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-bold text-black">
                    {order.orderNumber}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-semibold text-black">
                      {order.customerName}
                    </p>
                    <p className="text-xs text-gray-600">
                      {order.customerEmail}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-black">
                    {order.vendorName}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-semibold text-black">
                    {order.itemsCount} {t("itemsCount")}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-bold text-black">
                    {formatCurrency(order.totalAmount, order.currencyCode)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs font-bold rounded-full ${statusInfo.colorClass}`}
                  >
                    {statusInfo.label}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-xs text-gray-600">
                    {formatDate(order.createdAt)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onViewDetails(order.id)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded transition-colors"
                    >
                      {t("actions.view")}
                    </button>
                    {order.status !== OrderStatus.Cancelled &&
                      order.status !== OrderStatus.Delivered && (
                        <>
                          <button
                            onClick={() => onUpdateStatus(order)}
                            className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded transition-colors"
                          >
                            {t("actions.status")}
                          </button>
                          {order.status === OrderStatus.Pending && (
                            <button
                              onClick={() => onCancelOrder(order)}
                              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded transition-colors"
                            >
                              {t("actions.cancel")}
                            </button>
                          )}
                        </>
                      )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
