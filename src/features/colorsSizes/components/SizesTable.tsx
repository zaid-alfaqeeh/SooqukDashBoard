import { useTranslations } from "next-intl";
import type { Size } from "../types/colorsSizes.types";

interface SizesTableProps {
  sizes: Size[];
  isLoading: boolean;
  error: Error | null;
  onEdit: (size: Size) => void;
  onDelete: (size: Size) => void;
  isAdmin: boolean;
}

export default function SizesTable({
  sizes,
  isLoading,
  error,
  onEdit,
  onDelete,
  isAdmin,
}: SizesTableProps) {
  const t = useTranslations("colorsSizes");

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
        {t("errors.loadingSizes")}
      </div>
    );
  }

  if (!sizes || sizes.length === 0) {
    return (
      <div className="text-center py-20 text-gray-600 font-semibold">
        {t("noSizes")}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("id")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("nameEn")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("nameAr")}
            </th>
            {isAdmin && (
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
                {t("actions")}
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sizes.map((size) => (
            <tr key={size.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-bold text-gray-600">
                  #{size.id}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm font-semibold text-black">
                  {size.name}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm font-semibold text-black">
                  {size.nameAr}
                </span>
              </td>
              {isAdmin && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(size)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded transition-colors"
                    >
                      {t("edit")}
                    </button>
                    <button
                      onClick={() => onDelete(size)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded transition-colors"
                    >
                      {t("delete")}
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
