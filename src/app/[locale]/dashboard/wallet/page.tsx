"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuthGuard } from "@/features/auth/utils/authGurd";
import { useToast } from "@/components/Toast/Toast";
import { getErrorMessage } from "@/utils/api-error";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import {
  useWallets,
  useUpdateWallet,
  useDeleteWallet,
  useTransactions,
} from "@/features/wallet/hooks/useWallet";
import type {
  Wallet,
  GetTransactionsParams,
} from "@/features/wallet/types/wallet.types";
import WalletsTable from "@/features/wallet/components/WalletsTable";
import TransactionsTable from "@/features/wallet/components/TransactionsTable";
import WalletStatusModal from "@/features/wallet/components/WalletStatusModal";
import DeleteWalletModal from "@/features/wallet/components/DeleteWalletModal";
import ViewWalletModal from "@/features/wallet/components/ViewWalletModal";
import TransactionFilters from "@/features/wallet/components/TransactionFilters";
import { formatCurrency } from "@/features/wallet/utils/walletUtils";

type TabType = "wallets" | "transactions";

export default function WalletPage() {
  const t = useTranslations("wallet");
  const toast = useToast();
  useAuthGuard(["Admin"]);

  // State
  const [activeTab, setActiveTab] = useState<TabType>("wallets");
  const [viewingWalletId, setViewingWalletId] = useState<number | null>(null);
  const [statusWallet, setStatusWallet] = useState<Wallet | null>(null);
  const [deletingWallet, setDeletingWallet] = useState<Wallet | null>(null);
  const [transactionFilters, setTransactionFilters] =
    useState<GetTransactionsParams>({
      page: 1,
      pageSize: 10,
    });

  // Queries - Wallets
  const {
    data: walletsData,
    isLoading: walletsLoading,
    error: walletsError,
  } = useWallets();
  const updateWalletMutation = useUpdateWallet();
  const deleteWalletMutation = useDeleteWallet();

  // Queries - Transactions
  const {
    data: transactionsData,
    isLoading: transactionsLoading,
    error: transactionsError,
  } = useTransactions(transactionFilters);

  // Handlers - Wallets
  const handleUpdateStatus = async (isActive: boolean) => {
    if (!statusWallet) return;

    try {
      await updateWalletMutation.mutateAsync({
        walletId: statusWallet.id,
        data: { isActive },
      });
      toast.success(
        isActive ? t("walletActivatedSuccess") : t("walletDeactivatedSuccess")
      );
      setStatusWallet(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDeleteWallet = async (hardDelete: boolean) => {
    if (!deletingWallet) return;

    try {
      await deleteWalletMutation.mutateAsync({
        walletId: deletingWallet.id,
        hardDelete,
      });
      toast.success(t("walletDeletedSuccess"));
      setDeletingWallet(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  // Handlers - Transactions
  const handleApplyFilters = (filters: GetTransactionsParams) => {
    setTransactionFilters({ ...filters, page: 1, pageSize: 10 });
  };

  const handleResetFilters = () => {
    setTransactionFilters({ page: 1, pageSize: 10 });
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-black mb-3">
            {t("title")}
          </h1>
          <p className="text-lg text-black font-medium">{t("description")}</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("wallets")}
                className={`flex items-center gap-2 px-6 py-4 font-bold border-b-2 transition-colors ${
                  activeTab === "wallets"
                    ? "border-[#E6497F] text-[#E6497F]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
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
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                {t("wallets")}
                {walletsData?.data && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                    {walletsData.data.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("transactions")}
                className={`flex items-center gap-2 px-6 py-4 font-bold border-b-2 transition-colors ${
                  activeTab === "transactions"
                    ? "border-[#E6497F] text-[#E6497F]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                {t("transactions")}
                {transactionsData?.summary && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                    {transactionsData.summary.totalTransactions}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "wallets" && walletsData && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">
                  {t("totalWallets")}
                </p>
                <p className="text-3xl font-bold text-[#E6497F]">
                  {walletsData.summary.totalWallets}
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">
                  {t("totalBalance")}
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {formatCurrency(walletsData.summary.totalBalance, "JOD")}
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">
                  {t("averageBalance")}
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {formatCurrency(walletsData.summary.averageBalance, "JOD")}
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">
                  {t("activeWallets")}
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {walletsData.summary.activeWallets}
                </p>
              </div>
            </div>

            {/* Wallets Table */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <WalletsTable
                wallets={walletsData.data}
                isLoading={walletsLoading}
                error={walletsError}
                onView={(wallet) => setViewingWalletId(wallet.id)}
                onToggleStatus={setStatusWallet}
                onDelete={setDeletingWallet}
              />
            </div>
          </>
        )}

        {activeTab === "transactions" && (
          <>
            {/* Transaction Filters */}
            <TransactionFilters
              onApplyFilters={handleApplyFilters}
              onReset={handleResetFilters}
            />

            {/* Summary Cards */}
            {transactionsData?.summary && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-8">
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">
                    {t("totalTransactions")}
                  </p>
                  <p className="text-3xl font-bold text-[#E6497F]">
                    {transactionsData.summary.totalTransactions}
                  </p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">
                    {t("totalPointsAdded")}
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    +{transactionsData.summary.totalPointsAdded}
                  </p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">
                    {t("totalPointsDeducted")}
                  </p>
                  <p className="text-3xl font-bold text-red-600">
                    -{transactionsData.summary.totalPointsDeducted}
                  </p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">{t("netPoints")}</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {transactionsData.summary.netPoints}
                  </p>
                </div>
              </div>
            )}

            {/* Transactions Table */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <TransactionsTable
                transactions={transactionsData?.data || []}
                isLoading={transactionsLoading}
                error={transactionsError}
              />
            </div>
          </>
        )}

        {/* Modals */}
        {viewingWalletId && (
          <ViewWalletModal
            walletId={viewingWalletId}
            onClose={() => setViewingWalletId(null)}
          />
        )}

        {statusWallet && (
          <WalletStatusModal
            wallet={statusWallet}
            onConfirm={handleUpdateStatus}
            onCancel={() => setStatusWallet(null)}
            isLoading={updateWalletMutation.isPending}
          />
        )}

        {deletingWallet && (
          <DeleteWalletModal
            wallet={deletingWallet}
            onConfirm={handleDeleteWallet}
            onCancel={() => setDeletingWallet(null)}
            isLoading={deleteWalletMutation.isPending}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
