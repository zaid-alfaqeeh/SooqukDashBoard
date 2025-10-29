"use client";

import { useRouter, useParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useAuthGuard } from "@/features/auth/utils/authGurd";
import { useToast } from "@/components/Toast/Toast";
import { getErrorMessage } from "@/utils/api-error";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import {
  useOrder,
  useCancelOrder,
  useUpdateOrderStatus,
  useUpdatePaymentStatus,
} from "@/features/orders/ordersHooks/useOrders";
import {
  OrderStatus,
  PaymentStatus,
} from "@/features/orders/types/order.types";
import {
  getOrderStatusInfo,
  getPaymentStatusInfo,
  formatCurrency,
  formatDate,
} from "@/features/orders/utils/orderUtils";
import { useState } from "react";
import OrderStatusModal from "@/features/orders/orderComponent/OrderStatusModal";
import OrderCancelModal from "@/features/orders/orderComponent/OrderCancelModal";
import PaymentStatusModal from "@/features/orders/orderComponent/PaymentStatusModal";

export default function OrderDetailPage() {
  const t = useTranslations("orders");
  const router = useRouter();
  const params = useParams();
  const toast = useToast();
  const locale = useLocale();
  const orderId = Number(params.id);

  useAuthGuard(["Admin", "vendor"]);

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const { data: orderData, isLoading, error } = useOrder(orderId);
  const updateStatusMutation = useUpdateOrderStatus();
  const updatePaymentMutation = useUpdatePaymentStatus();
  const cancelMutation = useCancelOrder();
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
      setShowStatusModal(false);
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
      setShowCancelModal(false);
      toast.success(t("actions.orderCancelled"));
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleUpdatePaymentStatus = async (
    orderId: number,
    paymentStatus: PaymentStatus,
    notes?: string
  ) => {
    try {
      await updatePaymentMutation.mutateAsync({
        id: orderId,
        data: {
          paymentStatus,
          notes,
        },
      });
      setShowPaymentModal(false);
      toast.success("Payment status updated successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-[#E6497F] border-t-transparent rounded-full animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  if (error || !orderData) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="text-center py-20">
            <p className="text-red-600 font-semibold mb-4">
              {t("errors.loadingOrderDetails")}
            </p>
            <button
              onClick={() => router.push(`/${locale}/dashboard/orders`)}
              className="px-6 py-3 bg-[#E6497F] hover:bg-[#d63d6f] text-white font-bold rounded-lg"
            >
              {t("backToOrders")}
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const order = orderData.data;
  const statusInfo = getOrderStatusInfo(order.status);
  const paymentStatusInfo = getPaymentStatusInfo(order.paymentStatus);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push(`/${locale}/dashboard/orders`)}
            className="flex items-center gap-2 text-gray-600 hover:text-black font-semibold mb-4 transition-colors"
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
            {t("backToOrders")}
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-extrabold text-black mb-3">
                {t("orderDetails")}
              </h1>
              <p className="text-lg text-gray-600 font-semibold">
                {order.orderNumber}
              </p>
            </div>
            <div className="flex gap-3">
              {order.status !== OrderStatus.Cancelled &&
                order.status !== OrderStatus.Delivered && (
                  <>
                    <button
                      onClick={() => setShowStatusModal(true)}
                      className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors"
                    >
                      {t("actions.updateStatus")}
                    </button>
                    {order.status === OrderStatus.Pending && (
                      <button
                        onClick={() => setShowCancelModal(true)}
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
                      >
                        {t("actions.cancelOrder")}
                      </button>
                    )}
                  </>
                )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-black mb-6">
                {t("details.orderItems")}
              </h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.orderItemId}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="relative">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                 
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-black mb-1">
                        {item.productName}
                      </h3>
                      {item.productNameAr && (
                        <p className="text-sm text-gray-600 mb-2">
                          {item.productNameAr}
                        </p>
                      )}

                      {/* Variant Information */}
                      <div className="flex flex-wrap gap-2 mb-2">
                        {item.colorName && (
                          <span className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-semibold text-gray-700 flex items-center gap-1">
                            {item.colorCode && (
                              <span
                                className="w-3 h-3 rounded-full border border-gray-300"
                                style={{ backgroundColor: item.colorCode }}
                              />
                            )}
                            {locale === "ar" && item.colorNameAr
                              ? item.colorNameAr
                              : item.colorName}
                          </span>
                        )}
                        {item.sizeName && (
                          <span className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-semibold text-gray-700">
                            {locale === "ar" && item.sizeNameAr
                              ? item.sizeNameAr
                              : item.sizeName}
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-600">
                        {t("details.quantity")}: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        {t("details.unitPrice")}:{" "}
                        {formatCurrency(item.unitPrice, order.currencyCode)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-black">
                        {formatCurrency(item.totalPrice, order.currencyCode)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-black mb-6">
                {t("details.customerInformation")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {t("details.fullName")}
                  </p>
                  <p className="font-semibold text-black">
                    {order.customer.fullName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {t("details.email")}
                  </p>
                  <p className="font-semibold text-black">
                    {order.customer.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {t("details.phoneNumber")}
                  </p>
                  <p className="font-semibold text-black">
                    {order.customer.phoneNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-black mb-6">
                {t("details.shippingAddress")}
              </h2>
              <div className="space-y-2">
                <p className="text-black font-semibold">
                  {order.address.shippingAddress}
                </p>
                <p className="text-gray-600">
                  {order.address.district}, {order.address.city}
                </p>
              </div>
            </div>

            {/* Vendor Information */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-black mb-6">
                {t("details.vendorInformation")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {t("details.shopName")}
                  </p>
                  <p className="font-semibold text-black">
                    {order.vendor.shopName}
                  </p>
                  {order.vendor.shopNameAr && (
                    <p className="text-sm text-gray-600">
                      {order.vendor.shopNameAr}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {t("details.email")}
                  </p>
                  <p className="font-semibold text-black">
                    {order.vendor.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {t("details.phoneNumber")}
                  </p>
                  <p className="font-semibold text-black">
                    {order.vendor.phone}
                  </p>
                </div>
                {order.vendor.vendorCity && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      {t("details.location")}
                    </p>
                    <p className="font-semibold text-black">
                      {order.vendor.vendorCity}
                    </p>
                  </div>
                )}
              </div>

              {/* Shipping Policy */}
              {(order.vendor.shippingPolicy ||
                order.vendor.shippingPolicyAr) && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2 font-bold">
                    {t("details.shippingPolicy")}
                  </p>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-700">
                      {locale === "ar" && order.vendor.shippingPolicyAr
                        ? order.vendor.shippingPolicyAr
                        : order.vendor.shippingPolicy}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-black mb-6">
                {t("details.orderSummary")}
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t("details.subtotal")}</span>
                  <span className="font-semibold text-black">
                    {formatCurrency(order.subTotal, order.currencyCode)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t("details.tax")}</span>
                  <span className="font-semibold text-black">
                    {formatCurrency(order.taxAmount, order.currencyCode)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {t("details.shippingFee")}
                  </span>
                  <span className="font-semibold text-black">
                    {formatCurrency(order.shippingFee, order.currencyCode)}
                  </span>
                </div>
                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>{t("details.discount")}</span>
                    <span className="font-semibold">
                      -
                      {formatCurrency(order.discountAmount, order.currencyCode)}
                    </span>
                  </div>
                )}
                <div className="border-t-2 border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-xl font-bold text-black">
                      {t("details.total")}
                    </span>
                    <span className="text-xl font-bold text-[#E6497F]">
                      {formatCurrency(order.totalAmount, order.currencyCode)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Status */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-black mb-6">
                {t("status")}
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">{t("status")}</p>
                  <span
                    className={`px-4 py-2 inline-flex text-sm font-bold rounded-full ${statusInfo.colorClass}`}
                  >
                    {statusInfo.label}
                  </span>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-600">
                      {t("paymentStatus")}
                    </p>
                    {order.paymentStatus !== PaymentStatus.Paid &&
                      order.paymentStatus !== PaymentStatus.Refunded && (
                        <button
                          onClick={() => setShowPaymentModal(true)}
                          className="text-xs px-3 py-1 bg-green-600 hover:bg-green-700 text-white font-bold rounded transition-colors"
                        >
                          Update
                        </button>
                      )}
                  </div>
                  <span
                    className={`px-4 py-2 inline-flex text-sm font-bold rounded-full ${paymentStatusInfo.colorClass}`}
                  >
                    {paymentStatusInfo.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Dates */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-black mb-6">
                {t("details.timeline")}
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {t("details.created")}
                  </p>
                  <p className="font-semibold text-black">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {t("details.lastUpdated")}
                  </p>
                  <p className="font-semibold text-black">
                    {formatDate(order.updatedAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Notes */}
            {order.notes && (
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-black mb-6">
                  {t("details.notes")}
                </h2>
                <p className="text-gray-700">{order.notes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Modals */}
        {showStatusModal && (
          <OrderStatusModal
            order={{
              id: order.id,
              orderNumber: order.orderNumber,
              customerName: order.customer.fullName,
              customerEmail: order.customer.email,
              vendorName: order.vendor.shopName,
              totalAmount: order.totalAmount,
              currencyCode: order.currencyCode,
              status: order.status,
              paymentStatus: order.paymentStatus,
              paymentMethod: order.paymentMethod,
              createdAt: order.createdAt,
              discountDisplay: order.discountDisplay,
              itemsCount: order.items.length,
            }}
            onClose={() => setShowStatusModal(false)}
            onUpdate={handleUpdateStatus}
            isLoading={updateStatusMutation.isPending}
          />
        )}

        {showCancelModal && (
          <OrderCancelModal
            order={{
              id: order.id,
              orderNumber: order.orderNumber,
              customerName: order.customer.fullName,
              customerEmail: order.customer.email,
              vendorName: order.vendor.shopName,
              totalAmount: order.totalAmount,
              currencyCode: order.currencyCode,
              status: order.status,
              paymentStatus: order.paymentStatus,
              paymentMethod: order.paymentMethod,
              createdAt: order.createdAt,
              discountDisplay: order.discountDisplay,
              itemsCount: order.items.length,
            }}
            onClose={() => setShowCancelModal(false)}
            onCancel={handleCancelOrder}
            isLoading={cancelMutation.isPending}
          />
        )}

        {showPaymentModal && (
          <PaymentStatusModal
            order={{
              id: order.id,
              orderNumber: order.orderNumber,
              customerName: order.customer.fullName,
              customerEmail: order.customer.email,
              vendorName: order.vendor.shopName,
              totalAmount: order.totalAmount,
              currencyCode: order.currencyCode,
              status: order.status,
              paymentStatus: order.paymentStatus,
              paymentMethod: order.paymentMethod,
              createdAt: order.createdAt,
              discountDisplay: order.discountDisplay,
              itemsCount: order.items.length,
            }}
            onClose={() => setShowPaymentModal(false)}
            onUpdate={handleUpdatePaymentStatus}
            isLoading={updatePaymentMutation.isPending}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
