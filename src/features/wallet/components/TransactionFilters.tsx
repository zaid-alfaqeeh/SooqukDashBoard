"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { TransactionType } from "../types/wallet.types";
import type { GetTransactionsParams } from "../types/wallet.types";

interface TransactionFiltersProps {
  onApplyFilters: (filters: GetTransactionsParams) => void;
  onReset: () => void;
}

export default function TransactionFilters({
  onApplyFilters,
  onReset,
}: TransactionFiltersProps) {
  const t = useTranslations("wallet");
  const [filters, setFilters] = useState<GetTransactionsParams>({});
  const [isExpanded, setIsExpanded] = useState(false);

  const handleApply = () => {
    onApplyFilters(filters);
  };

  const handleReset = () => {
    setFilters({});
    onReset();
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">{t("filters")}</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-[#E6497F] font-bold hover:text-[#d63d6f] transition-colors"
        >
          {isExpanded ? t("hideFilters") : t("showFilters")}
        </button>
      </div>

      {isExpanded && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Wallet ID */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {t("walletId")}
              </label>
              <input
                type="number"
                value={filters.walletId || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    walletId: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
                placeholder={t("walletIdPlaceholder")}
              />
            </div>

            {/* User ID */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {t("userId")}
              </label>
              <input
                type="text"
                value={filters.userId || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    userId: e.target.value || undefined,
                  })
                }
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
                placeholder={t("userIdPlaceholder")}
              />
            </div>

            {/* Transaction Type */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {t("transactionType")}
              </label>
              <select
                value={filters.transactionType || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    transactionType: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
              >
                <option value="">{t("allTypes")}</option>
                <option value={TransactionType.Earned}>
                  {t("typeEarned")}
                </option>
                <option value={TransactionType.Redeemed}>
                  {t("typeRedeemed")}
                </option>
                <option value={TransactionType.AdminCredit}>
                  {t("typeAdminCredit")}
                </option>
                <option value={TransactionType.AdminDebit}>
                  {t("typeAdminDebit")}
                </option>
                <option value={TransactionType.ReferralEarned}>
                  {t("typeReferralEarned")}
                </option>
                <option value={TransactionType.OrderEarned}>
                  {t("typeOrderEarned")}
                </option>
                <option value={TransactionType.CouponRedemption}>
                  {t("typeCouponRedemption")}
                </option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* From Date */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {t("fromDate")}
              </label>
              <input
                type="datetime-local"
                value={filters.fromDate || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    fromDate: e.target.value || undefined,
                  })
                }
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
              />
            </div>

            {/* To Date */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {t("toDate")}
              </label>
              <input
                type="datetime-local"
                value={filters.toDate || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    toDate: e.target.value || undefined,
                  })
                }
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Min Amount */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {t("minAmount")}
              </label>
              <input
                type="number"
                value={filters.minAmount || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    minAmount: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
                placeholder="0"
                step="0.01"
              />
            </div>

            {/* Max Amount */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {t("maxAmount")}
              </label>
              <input
                type="number"
                value={filters.maxAmount || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    maxAmount: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
                placeholder="1000"
                step="0.01"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
            >
              {t("resetFilters")}
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-4 py-3 bg-[#E6497F] hover:bg-[#d63d6f] text-white font-bold rounded-lg transition-colors"
            >
              {t("applyFilters")}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
