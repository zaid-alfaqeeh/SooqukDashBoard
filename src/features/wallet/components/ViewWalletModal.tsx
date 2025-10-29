"use client";

import { useTranslations, useLocale } from "next-intl";
import { useWallet } from "../hooks/useWallet";
import {
  formatCurrency,
  formatDate,
  getTransactionTypeLabel,
  getTransactionTypeColor,
  isCredit,
} from "../utils/walletUtils";

interface ViewWalletModalProps {
  walletId: number;
  onClose: () => void;
}

export default function ViewWalletModal({
  walletId,
  onClose,
}: ViewWalletModalProps) {
  const t = useTranslations("wallet");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  const {
    data: wallet,
    isLoading,
    error,
  } = useWallet(walletId, {
    includeTransactions: true,
    transactionLimit: 10,
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="relative inline-block w-full max-w-4xl overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-2xl sm:my-8 sm:align-middle">
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">
                {t("walletDetails")}
              </h3>
              <button
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
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E6497F]"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 text-lg font-semibold">
                  {tCommon("error")}: {error.message}
                </p>
              </div>
            ) : wallet ? (
              <div className="space-y-6">
                {/* Wallet Info */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        {t("walletId")}
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        #{wallet.id}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        {t("balance")}
                      </p>
                      <p className="text-2xl font-bold text-[#E6497F]">
                        {formatCurrency(wallet.balance, wallet.currencyCode)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{t("user")}</p>
                      <p className="text-lg font-bold text-gray-900">
                        {wallet.userName}
                      </p>
                      <p className="text-sm text-gray-500">{wallet.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        {t("status")}
                      </p>
                      <span
                        className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                          wallet.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {wallet.isActive ? t("active") : t("inactive")}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-purple-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        {t("createdAt")}
                      </p>
                      <p className="text-sm font-semibold text-gray-700">
                        {formatDate(wallet.createdAt)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        {t("lastUpdated")}
                      </p>
                      <p className="text-sm font-semibold text-gray-700">
                        {formatDate(wallet.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recent Transactions */}
                {wallet.recentTransactions &&
                  wallet.recentTransactions.length > 0 && (
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4">
                        {t("recentTransactions")}
                      </h4>
                      <div className="space-y-3">
                        {wallet.recentTransactions.map((transaction) => {
                          const isCreditTransaction = isCredit(
                            transaction.transactionType
                          );
                          return (
                            <div
                              key={transaction.id}
                              className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span
                                      className={`px-2 py-1 text-xs font-bold rounded-full ${getTransactionTypeColor(
                                        transaction.transactionType
                                      )}`}
                                    >
                                      {getTransactionTypeLabel(
                                        transaction.transactionType,
                                        locale
                                      )}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {formatDate(transaction.createdAt)}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-700">
                                    {locale === "ar"
                                      ? transaction.descriptionAr
                                      : transaction.description}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p
                                    className={`text-lg font-bold ${
                                      isCreditTransaction
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                                  >
                                    {isCreditTransaction ? "+" : "-"}
                                    {transaction.amount}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {t("balanceAfter")}:{" "}
                                    {transaction.balanceAfter}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                {wallet.recentTransactions &&
                  wallet.recentTransactions.length === 0 && (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">
                        {t("noRecentTransactions")}
                      </p>
                    </div>
                  )}
              </div>
            ) : null}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 rounded-b-2xl">
            <button
              onClick={onClose}
              className="w-full px-4 py-3 bg-[#E6497F] hover:bg-[#d63d6f] text-white font-bold rounded-lg transition-colors"
            >
              {tCommon("close")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
