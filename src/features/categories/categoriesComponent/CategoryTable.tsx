"use client";

import { useTranslations, useLocale } from "next-intl";
import type { Category } from "../types/category.types";

interface CategoryTableProps {
  categories: Category[] | undefined;
  isLoading: boolean;
  error: Error | null;
  isAdmin: boolean;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export default function CategoryTable({
  categories,
  isLoading,
  error,
  isAdmin,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  const t = useTranslations();
  const locale = useLocale();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-[#E6497F] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-black font-bold text-lg">{t("common.loading")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-red-600"
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
        </div>
        <p className="text-black font-bold text-lg">{t("common.error")}</p>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <p className="text-black font-bold text-lg">
          {t("categories.noCategories")}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <div
          key={category.categoryId}
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow"
        >
          {/* Category Image */}
          <div className="relative h-48 bg-gray-200">
            {category.categoryImages && category.categoryImages.length > 0 ? (
              <img
                src={category.categoryImages[0].imageUrl}
                alt={
                  category.categoryImages[0].altText || category.categoryName
                }
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}

            {/* Image Count Badge */}
            {category.categoryImages && category.categoryImages.length > 1 && (
              <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs font-bold">
                {category.categoryImages.length} {t("categories.images")}
              </div>
            )}
          </div>

          {/* Category Info */}
          <div className="p-6">
            <div className="mb-3">
              <h3 className="text-xl font-bold text-black mb-1">
                {locale === "ar"
                  ? category.categoryNameAr
                  : category.categoryName}
              </h3>
              <p className="text-sm text-gray-600 font-semibold">
                {category.categoryType}
              </p>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#E6497F]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                <span className="text-sm font-bold text-black">
                  {category.productCount} {t("categories.products")}
                </span>
              </div>
            </div>

            {/* Actions */}
            {isAdmin && (
              <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => onEdit(category)}
                  className="flex-1 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold text-sm"
                  aria-label={t("common.edit")}
                >
                  {t("common.edit")}
                </button>
                <button
                  onClick={() => onDelete(category)}
                  className="flex-1 p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-semibold text-sm"
                  aria-label={t("common.delete")}
                >
                  {t("common.delete")}
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
