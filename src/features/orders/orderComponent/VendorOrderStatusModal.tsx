"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { OrderStatus } from "../types/order.types";
import { getOrderStatusInfo } from "../utils/orderUtils";

interface VendorOrderStatusModalProps {
  order: {
    orderId: number;
    customerName: string;
    totalAmount: number;
    status: OrderStatus;
  };
  onClose: () => void;
  onUpdate: (orderId: number, newStatus: OrderStatus) => void;
  isLoading: boolean;
}

export default function VendorOrderStatusModal({
  order,
  onClose,
  onUpdate,
  isLoading,
}: VendorOrderStatusModalProps) {
  const t = useTranslations("vendorOrders");
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(
    order.status
  );

  // Vendors can only update to: Confirmed (2), Processing (3), Cancelled (6)
  const allowedStatuses = [
    { value: OrderStatus.Confirmed, label: "Confirmed" },
    { value: OrderStatus.Processing, label: "Processing" },
    { value: OrderStatus.Cancelled, label: "Cancelled" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(order.orderId, selectedStatus);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6">
          <h2 className="text-2xl font-bold text-white">
            {t("updateOrderStatus")}
          </h2>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Order Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-600">{t("orderId")}:</span>
                <span className="font-bold text-black ml-2">
                  #{order.orderId}
                </span>
              </div>
              <div>
                <span className="text-gray-600">{t("customer")}:</span>
                <span className="font-semibold text-black ml-2">
                  {order.customerName}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-600">{t("currentStatus")}:</span>
                <span
                  className={`ml-2 px-3 py-1 inline-flex text-xs font-bold rounded-full ${
                    getOrderStatusInfo(order.status).colorClass
                  }`}
                >
                  {getOrderStatusInfo(order.status).label}
                </span>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            {t("updateStatusDescription")}
          </p>

          {/* Status Selection */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-black mb-3">
              {t("newStatus")}
            </label>
            <div className="space-y-2">
              {allowedStatuses.map((status) => (
                <label
                  key={status.value}
                  className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  style={{
                    borderColor:
                      selectedStatus === status.value ? "#9333ea" : "#e5e7eb",
                  }}
                >
                  <input
                    type="radio"
                    name="status"
                    value={status.value}
                    checked={selectedStatus === status.value}
                    onChange={(e) =>
                      setSelectedStatus(Number(e.target.value) as OrderStatus)
                    }
                    className="mr-3 text-purple-600 focus:ring-purple-500"
                  />
                  <span
                    className={`px-3 py-1 text-sm font-bold rounded-full ${
                      getOrderStatusInfo(status.value).colorClass
                    }`}
                  >
                    {status.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-bold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              disabled={isLoading || selectedStatus === order.status}
              className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t("updating") : t("update")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
