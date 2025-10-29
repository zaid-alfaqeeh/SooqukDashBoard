import { useState } from "react";
import { useTranslations } from "next-intl";
import { type OrderListItem } from "../types/order.types";

interface OrderCancelModalProps {
  order: OrderListItem;
  onClose: () => void;
  onCancel: (orderId: number, reason: string) => void;
  isLoading: boolean;
}

export default function OrderCancelModal({
  order,
  onClose,
  onCancel,
  isLoading,
}: OrderCancelModalProps) {
  const t = useTranslations("orders");
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (!reason.trim()) {
      return;
    }
    onCancel(order.id, reason);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-black text-center mb-4">
          {t("actions.cancelOrder")}
        </h3>
        <p className="text-center text-black mb-6">
          {t("actions.orderLabel")}{" "}
          <span className="font-semibold">{order.orderNumber}</span>
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              {t("actions.cancelReasonRequired")}
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black placeholder:text-gray-500 focus:border-[#E6497F] outline-none"
              placeholder={t("actions.cancelReasonPlaceholder")}
              required
            />
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            {t("actions.back")}
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !reason.trim()}
            className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading
              ? t("actions.cancelling")
              : t("actions.cancelOrderButton")}
          </button>
        </div>
      </div>
    </div>
  );
}
