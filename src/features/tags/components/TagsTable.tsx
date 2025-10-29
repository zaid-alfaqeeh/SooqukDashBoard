"use client";

import { useTranslations } from "next-intl";
import type { Tag } from "../types/tag.types";

interface TagsTableProps {
  tags: Tag[];
  isLoading?: boolean;
  error?: Error | null;
  onEdit: (tag: Tag) => void;
  onDelete: (tag: Tag) => void;
}

export default function TagsTable({
  tags,
  isLoading,
  error,
  onEdit,
  onDelete,
}: TagsTableProps) {
  const t = useTranslations("tags");
  const tCommon = useTranslations("common");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E6497F]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg font-semibold">
          {tCommon("error")}: {error.message}
        </p>
      </div>
    );
  }

  if (!tags || tags.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">{t("noTags")}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
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
              {t("slug")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("createdAt")}
            </th>
            <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t("actions")}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tags.map((tag) => (
            <tr key={tag.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-bold rounded-full">
                  #{tag.id}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-bold rounded-full">
                  {tag.name}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-bold rounded-full">
                  {tag.nameAr}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <code className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded font-mono">
                  {tag.slug}
                </code>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {new Date(tag.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(tag)}
                    className="text-blue-600 hover:text-blue-900 font-bold transition-colors"
                  >
                    {tCommon("edit")}
                  </button>
                  <button
                    onClick={() => onDelete(tag)}
                    className="text-red-600 hover:text-red-900 font-bold transition-colors"
                  >
                    {tCommon("delete")}
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
