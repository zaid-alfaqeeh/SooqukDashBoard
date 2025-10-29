import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import type {
  SubCategory,
  UpdateSubCategoryRequest,
} from "../types/subCategory.types";

interface SubCategoryEditModalProps {
  subCategory: SubCategory;
  onSubmit: (id: number, data: UpdateSubCategoryRequest) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export default function SubCategoryEditModal({
  subCategory,
  onSubmit,
  onCancel,
  isLoading,
}: SubCategoryEditModalProps) {
  const t = useTranslations("subCategories");
  const [formData, setFormData] = useState<UpdateSubCategoryRequest>({
    name: subCategory.subCategoryName,
    nameAr: subCategory.nameAr,
    categoryId: subCategory.categoryId || 0,
    imageUrl: subCategory.subCategoryImage,
    isActive: subCategory.isActive ?? true,
  });

  useEffect(() => {
    setFormData({
      name: subCategory.subCategoryName,
      nameAr: subCategory.nameAr,
      categoryId: subCategory.categoryId || 0,
      imageUrl: subCategory.subCategoryImage,
      isActive: subCategory.isActive ?? true,
    });
  }, [subCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(subCategory.subCategoryId, formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold text-black mb-6">
          {t("editSubCategory")}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name (English) */}
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              {t("nameEn")} *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black placeholder:text-gray-500 focus:border-[#E6497F] outline-none"
              placeholder={t("nameEnPlaceholder")}
            />
          </div>

          {/* Name (Arabic) */}
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              {t("nameAr")} *
            </label>
            <input
              type="text"
              value={formData.nameAr}
              onChange={(e) =>
                setFormData({ ...formData, nameAr: e.target.value })
              }
              required
              dir="rtl"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black placeholder:text-gray-500 focus:border-[#E6497F] outline-none"
              placeholder={t("nameArPlaceholder")}
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              {t("imageUrl")} *
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black placeholder:text-gray-500 focus:border-[#E6497F] outline-none"
              placeholder={t("imageUrlPlaceholder")}
            />
            {formData.imageUrl && (
              <div className="mt-3">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Active Status */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
              className="w-5 h-5 rounded border-gray-300 text-[#E6497F] focus:ring-[#E6497F] focus:ring-2"
            />
            <label
              htmlFor="isActive"
              className="text-sm font-semibold text-black cursor-pointer"
            >
              {t("active")}
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-[#E6497F] hover:bg-[#d63d6f] text-white font-bold rounded-lg transition-colors disabled:opacity-50"
            >
              {isLoading ? t("updating") : t("update")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
