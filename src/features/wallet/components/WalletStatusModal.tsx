"use client";

import { useTranslations } from "next-intl";
import type { Wallet } from "../types/wallet.types";
import { formatCurrency } from "../utils/walletUtils";

interface WalletStatusModalProps {
  wallet: Wallet;
  onConfirm: (isActive: boolean) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export default function WalletStatusModal({
  wallet,
  onConfirm,
  onCancel,
  isLoading,
}: WalletStatusModalProps) {
  const t = useTranslations("wallet");
  const tCommon = useTranslations("common");
  const newStatus = !wallet.isActive;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onCancel}
        ></div>

        {/* Modal */}
        <div className="relative inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-2xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {/* Header */}
          <div className="px-6 pt-6 pb-4">
            <div
              className={`flex items-center justify-center w-12 h-12 mx-auto rounded-full mb-4 ${
                newStatus ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {newStatus ? (
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              {newStatus ? t("activateWallet") : t("deactivateWallet")}
            </h3>
            <p className="text-sm text-gray-600 text-center">
              {newStatus ? t("confirmActivate") : t("confirmDeactivate")}
            </p>
          </div>

          {/* Body */}
          <div className="px-6 py-4">
            <div className="p-4 bg-gray-50 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">{t("walletId")}:</span>
                <span className="text-sm font-bold text-gray-900">
                  #{wallet.id}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">{t("user")}:</span>
                <span className="text-sm font-bold text-gray-900">
                  {wallet.userName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">{t("balance")}:</span>
                <span className="text-sm font-bold text-[#E6497F]">
                  {formatCurrency(wallet.balance, wallet.currencyCode)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">
                  {t("currentStatus")}:
                </span>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    wallet.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {wallet.isActive ? t("active") : t("inactive")}
                </span>
              </div>
            </div>
            {!newStatus && (
              <p className="text-sm text-red-600 font-semibold mt-4 text-center">
                {t("deactivateWarning")}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {tCommon("cancel")}
            </button>
            <button
              type="button"
              onClick={() => onConfirm(newStatus)}
              disabled={isLoading}
              className={`flex-1 px-4 py-3 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                newStatus
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {isLoading
                ? t("updating")
                : newStatus
                ? t("activate")
                : t("deactivate")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
