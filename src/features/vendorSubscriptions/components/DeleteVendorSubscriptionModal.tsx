"use client";

import { useTranslations } from "next-intl";
import type { VendorSubscription } from "../types/vendorSubscription.types";

interface DeleteVendorSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  subscription: VendorSubscription | null;
}

export default function DeleteVendorSubscriptionModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  subscription,
}: DeleteVendorSubscriptionModalProps) {
  const t = useTranslations("vendorSubscriptions");

  if (!isOpen || !subscription) return null;

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-t-2xl">
          <h2 className="text-2xl font-bold">{t("deleteSubscription")}</h2>
        </div>

        <div className="p-6">
          <p className="text-gray-700 font-medium mb-4">
            {t("deleteConfirmation")}
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">{t("vendor")}:</span>
              <span className="text-sm font-bold text-gray-900">
                {subscription.vendorName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">{t("plan")}:</span>
              <span className="text-sm font-bold text-gray-900">
                {subscription.planName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">{t("price")}:</span>
              <span className="text-sm font-bold text-gray-900">
                JOD {subscription.price.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg font-bold hover:from-red-700 hover:to-red-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t("deleting") : t("delete")}
            </button>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
