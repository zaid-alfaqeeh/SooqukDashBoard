"use client";

import { useTranslations, useLocale } from "next-intl";
import type { Transaction } from "../types/wallet.types";
import {
  getTransactionTypeLabel,
  getTransactionTypeColor,
  isCredit,
  formatDate,
} from "../utils/walletUtils";

interface TransactionsTableProps {
  transactions: Transaction[];
  isLoading?: boolean;
  error?: Error | null;
}

export default function TransactionsTable({
  transactions,
  isLoading,
  error,
}: TransactionsTableProps) {
  const t = useTranslations("wallet");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E6497F]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg font-semibold">
          {tCommon("error")}: {error.message}
        </p>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">{t("noTransactions")}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("transactionId")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("user")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("type")}
            </th>
            <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("amount")}
            </th>
            <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("balanceAfter")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("description")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("date")}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => {
            const isCreditTransaction = isCredit(transaction.transactionType);
            return (
              <tr
                key={transaction.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-bold rounded-full">
                    #{transaction.id}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900">
                      {transaction.userName}
                    </span>
                    <span className="text-xs text-gray-400">
                      Wallet #{transaction.walletId}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full ${getTransactionTypeColor(
                      transaction.transactionType
                    )}`}
                  >
                    {getTransactionTypeLabel(
                      transaction.transactionType,
                      locale
                    )}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span
                    className={`text-lg font-bold ${
                      isCreditTransaction ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isCreditTransaction ? "+" : "-"}
                    {transaction.amount}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className="text-sm font-semibold text-gray-700">
                    {transaction.balanceAfter}
                  </span>
                </td>
                <td className="px-6 py-4 max-w-xs">
                  <p className="text-sm text-gray-700 truncate">
                    {locale === "ar"
                      ? transaction.descriptionAr
                      : transaction.description}
                  </p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {formatDate(transaction.createdAt)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
