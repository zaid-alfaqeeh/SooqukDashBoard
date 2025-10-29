"use client";

import { use } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useAuthGuard } from "@/features/auth/utils/authGurd";
import { useToast } from "@/components/Toast/Toast";
import { getErrorMessage } from "@/utils/api-error";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import {
  useShippingOrder,
  useUpdateShippingOrderStatus,
} from "@/features/shipping/hooks/useShipping";
import { useState } from "react";
import {
  getStatusColor,
  getStatusLabel,
  getPaymentMethodLabel,
  getPaymentStatusLabel,
} from "@/features/shipping/utils/shippingUtils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ShippingOrderDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const orderId = parseInt(resolvedParams.id);
  const t = useTranslations("shipping");
  const tCommon = useTranslations("common");
  const toast = useToast();
  const router = useRouter();
  useAuthGuard(["Admin", "ShippingCompany"]);

  const [selectedStatus, setSelectedStatus] = useState<4 | 5 | 6>(4);
  const [showStatusUpdate, setShowStatusUpdate] = useState(false);

  const { data: order, isLoading, error } = useShippingOrder(orderId);
  const updateStatusMutation = useUpdateShippingOrderStatus();

  const handleUpdateStatus = async () => {
    try {
      await updateStatusMutation.mutateAsync({
        id: orderId,
        data: { status: selectedStatus },
      });
      setShowStatusUpdate(false);
      toast.success(t("statusUpdatedSuccess"));
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E6497F]"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !order) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="text-center py-12">
            <p className="text-red-600 text-lg font-semibold">
              {t("orderNotFound")}
            </p>
            <button
              onClick={() => router.back()}
              className="mt-4 px-6 py-3 bg-[#E6497F] hover:bg-[#d63d6f] text-white font-bold rounded-lg"
            >
              {tCommon("goBack")}
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button
              onClick={() => router.back()}
              className="mb-4 text-[#E6497F] hover:text-[#d63d6f] font-bold flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {tCommon("back")}
            </button>
            <h1 className="text-4xl font-extrabold text-black mb-2">
              {t("orderDetails")}
            </h1>
            <p className="text-lg text-black font-medium">
              {order.orderNumber}
            </p>
          </div>
          <button
            onClick={() => setShowStatusUpdate(!showStatusUpdate)}
            className="px-6 py-3 bg-[#E6497F] hover:bg-[#d63d6f] text-white font-bold rounded-lg transition-colors"
          >
            {t("updateStatus")}
          </button>
        </div>

        {/* Status Update Section */}
        {showStatusUpdate && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {t("updateOrderStatus")}
            </h3>
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t("selectNewStatus")}
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) =>
                    setSelectedStatus(Number(e.target.value) as 4 | 5 | 6)
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
                >
                  <option value={4}>{t("statusShipped")}</option>
                  <option value={5}>{t("statusDelivered")}</option>
                  <option value={6}>{t("statusCancelled")}</option>
                </select>
              </div>
              <button
                onClick={handleUpdateStatus}
                disabled={updateStatusMutation.isPending}
                className="px-6 py-3 bg-[#E6497F] hover:bg-[#d63d6f] text-white font-bold rounded-lg transition-colors disabled:opacity-50"
              >
                {updateStatusMutation.isPending
                  ? t("updating")
                  : tCommon("save")}
              </button>
              <button
                onClick={() => setShowStatusUpdate(false)}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-black font-bold rounded-lg transition-colors"
              >
                {tCommon("cancel")}
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t("orderInformation")}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{t("status")}</p>
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {t(getStatusLabel(order.status))}
                  </span>
                  {order.isLate && (
                    <span className="ml-2 px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                      {t("late")}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {t("hoursElapsed")}
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {order.hoursElapsed.toFixed(1)} {t("hours")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{t("createdAt")}</p>
                  <p className="text-lg font-bold text-gray-900">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{t("updatedAt")}</p>
                  <p className="text-lg font-bold text-gray-900">
                    {new Date(order.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t("orderItems")}
              </h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.orderItemId}
                    className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                      {item.productImage ? (
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <svg
                          className="w-10 h-10 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">
                        {item.productName}
                      </h3>
                      {item.colorName && (
                        <p className="text-sm text-gray-600">
                          {t("color")}: {item.colorName}
                        </p>
                      )}
                      {item.sizeName && (
                        <p className="text-sm text-gray-600">
                          {t("size")}: {item.sizeName}
                        </p>
                      )}
                      <p className="text-sm text-gray-600 mt-1">
                        {t("quantity")}: {item.quantity} ×{" "}
                        {item.unitPrice.toFixed(2)}{" "}
                        {order.orderDetails.currencyCode}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        {item.totalPrice.toFixed(2)}{" "}
                        {order.orderDetails.currencyCode}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">
                    {t("total")}
                  </span>
                  <span className="text-2xl font-extrabold text-[#E6497F]">
                    {order.orderDetails.totalAmount.toFixed(2)}{" "}
                    {order.orderDetails.currencyCode}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Info */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {t("customerInfo")}
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{t("name")}</p>
                  <p className="font-bold text-gray-900">
                    {order.customer.fullName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{t("email")}</p>
                  <p className="font-bold text-gray-900">
                    {order.customer.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{t("phone")}</p>
                  <p className="font-bold text-gray-900">
                    {order.customer.phoneNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* Location Info */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {t("locationInfo")}
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{t("city")}</p>
                  <p className="font-bold text-gray-900">
                    {order.location.city}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{t("district")}</p>
                  <p className="font-bold text-gray-900">
                    {order.location.district}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{t("address")}</p>
                  <p className="font-bold text-gray-900">
                    {order.location.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {t("paymentInfo")}
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {t("paymentMethod")}
                  </p>
                  <p className="font-bold text-gray-900">
                    {t(getPaymentMethodLabel(order.paymentMethod))}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {t("paymentStatus")}
                  </p>
                  <p className="font-bold text-gray-900">
                    {t(getPaymentStatusLabel(order.paymentStatus))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
