"use client";

import { useTranslations } from "next-intl";
import type { Wallet } from "../types/wallet.types";
import { formatCurrency, formatDate } from "../utils/walletUtils";

interface WalletsTableProps {
  wallets: Wallet[];
  isLoading?: boolean;
  error?: Error | null;
  onView: (wallet: Wallet) => void;
  onToggleStatus: (wallet: Wallet) => void;
  onDelete: (wallet: Wallet) => void;
}

export default function WalletsTable({
  wallets,
  isLoading,
  error,
  onView,
  onToggleStatus,
  onDelete,
}: WalletsTableProps) {
  const t = useTranslations("wallet");
  const tCommon = useTranslations("common");

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

  if (!wallets || wallets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">{t("noWallets")}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("walletId")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("user")}
            </th>
            <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("balance")}
            </th>
            <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("status")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("lastUpdated")}
            </th>
            <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("actions")}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {wallets.map((wallet) => (
            <tr key={wallet.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-bold rounded-full">
                  #{wallet.id}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900">
                    {wallet.userName}
                  </span>
                  <span className="text-sm text-gray-500">{wallet.email}</span>
                  <span className="text-xs text-gray-400">{wallet.userId}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <span className="text-lg font-bold text-[#E6497F]">
                  {formatCurrency(wallet.balance, wallet.currencyCode)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <button
                  onClick={() => onToggleStatus(wallet)}
                  className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${
                    wallet.isActive
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-red-100 text-red-700 hover:bg-red-200"
                  }`}
                >
                  {wallet.isActive ? t("active") : t("inactive")}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {formatDate(wallet.updatedAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onView(wallet)}
                    className="text-purple-600 hover:text-purple-900 font-bold transition-colors"
                  >
                    {tCommon("view")}
                  </button>
                  <button
                    onClick={() => onDelete(wallet)}
                    className="text-red-600 hover:text-red-900 font-bold transition-colors"
                  >
                    {tCommon("delete")}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
