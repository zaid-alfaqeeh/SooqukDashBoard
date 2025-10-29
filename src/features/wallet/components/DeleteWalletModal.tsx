"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Wallet } from "../types/wallet.types";
import { formatCurrency } from "../utils/walletUtils";

interface DeleteWalletModalProps {
  wallet: Wallet;
  onConfirm: (hardDelete: boolean) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export default function DeleteWalletModal({
  wallet,
  onConfirm,
  onCancel,
  isLoading,
}: DeleteWalletModalProps) {
  const t = useTranslations("wallet");
  const tCommon = useTranslations("common");
  const [hardDelete, setHardDelete] = useState(false);

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
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              {t("deleteWallet")}
            </h3>
            <p className="text-sm text-gray-600 text-center">
              {t("confirmDelete")}
            </p>
          </div>

          {/* Body */}
          <div className="px-6 py-4">
            <div className="p-4 bg-gray-50 rounded-lg space-y-2 mb-4">
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
                <span className="text-sm text-gray-600">{t("email")}:</span>
                <span className="text-sm font-bold text-gray-900">
                  {wallet.email}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">{t("balance")}:</span>
                <span className="text-sm font-bold text-[#E6497F]">
                  {formatCurrency(wallet.balance, wallet.currencyCode)}
                </span>
              </div>
            </div>

            {/* Hard Delete Option */}
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  checked={hardDelete}
                  onChange={(e) => setHardDelete(e.target.checked)}
                  className="w-5 h-5 mt-0.5 mr-3 text-red-600 focus:ring-red-500 rounded"
                />
                <div className="flex-1">
                  <span className="text-sm font-bold text-gray-900 block">
                    {t("hardDelete")}
                  </span>
                  <span className="text-xs text-gray-600">
                    {t("hardDeleteHint")}
                  </span>
                </div>
              </label>
            </div>

            <p className="text-sm text-red-600 font-semibold mt-4 text-center">
              {t("deleteWarning")}
            </p>
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
              onClick={() => onConfirm(hardDelete)}
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t("deleting") : tCommon("delete")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
