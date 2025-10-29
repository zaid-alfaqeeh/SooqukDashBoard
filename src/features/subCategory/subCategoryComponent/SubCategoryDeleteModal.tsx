import { useTranslations } from "next-intl";
import type { SubCategory } from "../types/subCategory.types";

interface SubCategoryDeleteModalProps {
  subCategory: SubCategory;
  onConfirm: (id: number) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export default function SubCategoryDeleteModal({
  subCategory,
  onConfirm,
  onCancel,
  isLoading,
}: SubCategoryDeleteModalProps) {
  const t = useTranslations("subCategories");

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-6">
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h3 className="text-2xl font-bold text-black text-center mb-3">
          {t("deleteSubCategory")}
        </h3>

        <p className="text-gray-600 text-center mb-2">{t("confirmDelete")}</p>

        <p className="text-center font-semibold text-black mb-4">
          {subCategory.subCategoryName}
        </p>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-800 text-center font-medium">
            {t("deleteWarning")}
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            {t("cancel")}
          </button>
          <button
            onClick={() => onConfirm(subCategory.subCategoryId)}
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? t("deleting") : t("delete")}
          </button>
        </div>
      </div>
    </div>
  );
}
