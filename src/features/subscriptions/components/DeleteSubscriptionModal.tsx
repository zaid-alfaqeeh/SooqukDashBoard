import { useTranslations } from "next-intl";
import type { SubscriptionPlan } from "../types/subscription.types";

interface DeleteSubscriptionModalProps {
  plan: SubscriptionPlan;
  onConfirm: () => void;
  onClose: () => void;
  isLoading: boolean;
}

export default function DeleteSubscriptionModal({
  plan,
  onConfirm,
  onClose,
  isLoading,
}: DeleteSubscriptionModalProps) {
  const t = useTranslations("subscriptions");
  const tCommon = useTranslations("common");

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-subscription-title"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <h3
            id="delete-subscription-title"
            className="text-xl font-bold text-gray-900 mb-2"
          >
            {t("deletePlan")}
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            {t("deleteConfirmation", { name: plan.name })}
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">
                  {t("name")}:
                </span>
                <span className="text-gray-900">{plan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">
                  {t("price")}:
                </span>
                <span className="text-gray-900">${plan.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">
                  {t("duration")}:
                </span>
                <span className="text-gray-900">
                  {plan.durationInMonths} {t("months")}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {tCommon("cancel")}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t("deleting") : t("delete")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
