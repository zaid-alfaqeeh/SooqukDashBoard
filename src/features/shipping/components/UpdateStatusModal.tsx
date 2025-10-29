"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type {
  ShippingOrderListItem,
  OrderStatus,
} from "../types/shipping.types";

interface UpdateStatusModalProps {
  order: ShippingOrderListItem;
  onClose: () => void;
  onUpdate: (orderId: number, status: 4 | 5 | 6) => void;
  isLoading: boolean;
}

export default function UpdateStatusModal({
  order,
  onClose,
  onUpdate,
  isLoading,
}: UpdateStatusModalProps) {
  const t = useTranslations("shipping");
  const [selectedStatus, setSelectedStatus] = useState<4 | 5 | 6>(4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(order.id, selectedStatus);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="relative inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-2xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">
                  {t("updateOrderStatus")}
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-6">
              {/* Order Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  {t("orderNumber")}:{" "}
                  <span className="font-bold text-gray-900">
                    {order.orderNumber}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  {t("customer")}:{" "}
                  <span className="font-bold text-gray-900">
                    {order.customerName}
                  </span>
                </p>
              </div>

              {/* Status Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  {t("selectNewStatus")}
                </label>
                <div className="space-y-3">
                  {/* Shipped */}
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="status"
                      value={4}
                      checked={selectedStatus === 4}
                      onChange={(e) => setSelectedStatus(4)}
                      className="w-5 h-5 text-[#E6497F] focus:ring-[#E6497F]"
                    />
                    <div className="ml-3">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                          {t("statusShipped")}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {t("statusShippedDesc")}
                      </p>
                    </div>
                  </label>

                  {/* Delivered */}
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="status"
                      value={5}
                      checked={selectedStatus === 5}
                      onChange={(e) => setSelectedStatus(5)}
                      className="w-5 h-5 text-[#E6497F] focus:ring-[#E6497F]"
                    />
                    <div className="ml-3">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                          {t("statusDelivered")}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {t("statusDeliveredDesc")}
                      </p>
                    </div>
                  </label>

                  {/* Cancelled */}
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="status"
                      value={6}
                      checked={selectedStatus === 6}
                      onChange={(e) => setSelectedStatus(6)}
                      className="w-5 h-5 text-[#E6497F] focus:ring-[#E6497F]"
                    />
                    <div className="ml-3">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                          {t("statusCancelled")}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {t("statusCancelledDesc")}
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {t("cancel")}
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-[#E6497F] hover:bg-[#d63d6f] text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? t("updating") : t("updateStatus")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
