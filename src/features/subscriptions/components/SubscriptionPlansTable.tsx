import { useState } from "react";
import { useTranslations } from "next-intl";
import type { SubscriptionPlan } from "../types/subscription.types";

interface SubscriptionPlansTableProps {
  plans: SubscriptionPlan[];
  onEdit: (plan: SubscriptionPlan) => void;
  onDelete: (plan: SubscriptionPlan) => void;
  isLoading?: boolean;
}

export default function SubscriptionPlansTable({
  plans,
  onEdit,
  onDelete,
  isLoading,
}: SubscriptionPlansTableProps) {
  const t = useTranslations("subscriptions");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E6497F]"></div>
      </div>
    );
  }

  if (!plans || plans.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">{t("noPlans")}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("id")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("name")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("nameAr")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("price")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("duration")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("description")}
            </th>
            <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("actions")}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {plans.map((plan) => (
            <tr key={plan.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {plan.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {plan.name}
              </td>
              <td
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                dir="rtl"
              >
                {plan.namear}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {plan.price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {plan.durationInMonths} {t("months")}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                {plan.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(plan)}
                    className="text-blue-600 hover:text-blue-900 font-bold transition-colors"
                  >
                    {t("edit")}
                  </button>
                  <button
                    onClick={() => onDelete(plan)}
                    className="text-red-600 hover:text-red-900 font-bold transition-colors"
                  >
                    {t("delete")}
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
