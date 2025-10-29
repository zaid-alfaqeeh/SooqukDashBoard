import { useTranslations } from "next-intl";
import type { Color } from "../types/colorsSizes.types";

interface ColorsTableProps {
  colors: Color[];
  isLoading: boolean;
  error: Error | null;
  onEdit: (color: Color) => void;
  onDelete: (color: Color) => void;
  isAdmin: boolean;
}

export default function ColorsTable({
  colors,
  isLoading,
  error,
  onEdit,
  onDelete,
  isAdmin,
}: ColorsTableProps) {
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
        {t("errors.loadingColors")}
      </div>
    );
  }

  if (!colors || colors.length === 0) {
    return (
      <div className="text-center py-20 text-gray-600 font-semibold">
        {t("noColors")}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("colorPreview")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("hexCode")}
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
          {colors.map((color) => (
            <tr key={color.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-lg border-2 border-gray-300 shadow-sm"
                    style={{ backgroundColor: color.hex }}
                    title={color.hex}
                  />
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-mono font-bold text-black">
                  {color.hex}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm font-semibold text-black">
                  {color.name}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm font-semibold text-black">
                  {color.nameAr}
                </span>
              </td>
              {isAdmin && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(color)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded transition-colors"
                    >
                      {t("edit")}
                    </button>
                    <button
                      onClick={() => onDelete(color)}
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
