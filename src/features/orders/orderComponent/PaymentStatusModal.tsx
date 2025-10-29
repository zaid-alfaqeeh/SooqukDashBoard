import { useState } from "react";
import { useTranslations } from "next-intl";
import { PaymentStatus, type OrderListItem } from "../types/order.types";

interface PaymentStatusModalProps {
  order: OrderListItem;
  onClose: () => void;
  onUpdate: (
    orderId: number,
    paymentStatus: PaymentStatus,
    notes?: string
  ) => void;
  isLoading: boolean;
}

export default function PaymentStatusModal({
  order,
  onClose,
  onUpdate,
  isLoading,
}: PaymentStatusModalProps) {
  const t = useTranslations("orders");
  const [newPaymentStatus, setNewPaymentStatus] = useState<PaymentStatus>(
    order.paymentStatus
  );
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    onUpdate(order.id, newPaymentStatus, notes || undefined);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <h3 className="text-2xl font-bold text-black mb-4">
          {t("actions.updatePaymentStatus")}
        </h3>
        <p className="text-sm text-black mb-6">
          {t("actions.orderLabel")}{" "}
          <span className="font-semibold">{order.orderNumber}</span>
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              {t("actions.newPaymentStatus")}
            </label>
            <select
              value={newPaymentStatus}
              onChange={(e) =>
                setNewPaymentStatus(Number(e.target.value) as PaymentStatus)
              }
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
            >
              <option value={PaymentStatus.Pending}>
                {t("paymentStatuses.pending")}
              </option>
              <option value={PaymentStatus.Paid}>
                {t("paymentStatuses.paid")}
              </option>
              <option value={PaymentStatus.Failed}>
                {t("paymentStatuses.failed")}
              </option>
              <option value={PaymentStatus.Refunded}>
                {t("paymentStatuses.refunded")}
              </option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              {t("actions.notes")}
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black placeholder:text-gray-500 focus:border-[#E6497F] outline-none"
              placeholder={t("actions.notesPlaceholder")}
            />
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            {t("actions.cancel")}
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-[#E6497F] hover:bg-[#d63d6f] text-white font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? t("actions.updating") : t("actions.update")}
          </button>
        </div>
      </div>
    </div>
  );
}
