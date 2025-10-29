"use client";

import { useTranslations, useLocale } from "next-intl";
import type { Category } from "../types/category.types";

interface CategoryDeleteModalProps {
  category: Category;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function CategoryDeleteModal({
  category,
  isDeleting,
  onConfirm,
  onCancel,
}: CategoryDeleteModalProps) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-red-600"
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

        <h3 className="text-2xl font-bold text-black text-center mb-3">
          {t("categories.deleteCategory")}
        </h3>
        <p className="text-black text-center mb-2 font-semibold">
          {t("categories.confirmDelete")}
        </p>
        <p className="text-red-600 text-center mb-6 font-bold">
          {t("categories.deleteWarning")}
        </p>

        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <p className="font-bold text-black text-lg text-center">
            {locale === "ar" ? category.categoryNameAr : category.categoryName}
          </p>
          <p className="text-gray-600 font-semibold text-center mt-1">
            {category.categoryType}
          </p>
          <p className="text-black font-semibold text-center mt-1">
            ID: #{category.categoryId}
          </p>
          {category.productCount > 0 && (
            <p className="text-red-600 font-bold text-center mt-2">
              ⚠️ {category.productCount}{" "}
              {t("categories.productsWillBeAffected")}
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            {t("common.cancel")}
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <svg
                  className="animate-spin w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {t("categories.deleting")}
              </>
            ) : (
              t("common.delete")
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
