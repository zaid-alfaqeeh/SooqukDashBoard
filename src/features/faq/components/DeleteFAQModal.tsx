"use client";

import { useTranslations } from "next-intl";
import type { FAQ } from "../types/faq.types";

interface DeleteFAQModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  faq: FAQ | null;
}

export default function DeleteFAQModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  faq,
}: DeleteFAQModalProps) {
  const t = useTranslations("faq");

  if (!isOpen || !faq) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-t-2xl">
          <h2 className="text-2xl font-bold">{t("deleteFAQ")}</h2>
        </div>

        <div className="p-6">
          <p className="text-gray-700 font-medium mb-4">
            {t("deleteConfirmation")}
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm font-bold text-gray-900">{faq.titleEn}</p>
            <p className="text-sm text-gray-600 mt-1" dir="rtl">
              {faq.titleAr}
            </p>
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
