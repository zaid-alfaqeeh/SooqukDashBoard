import { useTranslations } from "next-intl";
import type { SubCategory } from "../types/subCategory.types";

interface SubCategoryTableProps {
  subCategories: SubCategory[];
  isLoading: boolean;
  error: Error | null;
  onEdit: (subCategory: SubCategory) => void;
  onDelete: (subCategory: SubCategory) => void;
}

export default function SubCategoryTable({
  subCategories,
  isLoading,
  error,
  onEdit,
  onDelete,
}: SubCategoryTableProps) {
  const t = useTranslations("subCategories");

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-16 h-16 border-4 border-[#E6497F] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600 font-semibold">
        {t("errors.loadingSubCategories")}
      </div>
    );
  }

  if (!subCategories || subCategories.length === 0) {
    return (
      <div className="text-center py-20 text-gray-600 font-semibold">
        {t("noSubCategories")}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("image")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("nameEn")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("nameAr")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("type")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("actions")}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {subCategories.map((subCategory) => (
            <tr key={subCategory.subCategoryId} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-16 h-16 relative rounded-lg overflow-hidden">
                  <img
                    src={subCategory.subCategoryImage}
                    alt={subCategory.subCategoryName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm font-semibold text-black">
                  {subCategory.subCategoryName}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm font-semibold text-black">
                  {subCategory.nameAr}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-gray-600">
                  {subCategory.subCategoryType}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(subCategory)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded transition-colors"
                  >
                    {t("edit")}
                  </button>
                  <button
                    onClick={() => onDelete(subCategory)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded transition-colors"
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
