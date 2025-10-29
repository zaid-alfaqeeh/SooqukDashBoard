"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import type { CreateCategoryRequest } from "../types/category.types";

interface CategoryCreateFormProps {
  formData: Omit<CreateCategoryRequest, "ImageFiles"> & { ImageFiles: File[] };
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (
    data: Partial<
      Omit<CreateCategoryRequest, "ImageFiles"> & { ImageFiles: File[] }
    >
  ) => void;
  onCancel: () => void;
}

export default function CategoryCreateForm({
  formData,
  isSubmitting,
  onSubmit,
  onChange,
  onCancel,
}: CategoryCreateFormProps) {
  const t = useTranslations();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onChange({ ImageFiles: [...formData.ImageFiles, ...files] });

      // Generate previews
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = formData.ImageFiles.filter((_, i) => i !== index);
    onChange({ ImageFiles: newImages });

    // Clean up preview URL
    URL.revokeObjectURL(imagePreviews[index]);
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-200">
      <h2 className="text-2xl font-bold text-black mb-6 pb-4 border-b-2 border-[#E6497F]">
        {t("categories.createNewCategory")}
      </h2>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name English */}
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              {t("categories.nameEn")} <span className="text-[#E6497F]">*</span>
            </label>
            <input
              type="text"
              value={formData.Name}
              onChange={(e) => onChange({ Name: e.target.value })}
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-[#E6497F] focus:ring-2 focus:ring-[#E6497F] focus:ring-opacity-50 outline-none transition-all"
              placeholder="Enter category name in English"
              required
            />
          </div>

          {/* Name Arabic */}
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              {t("categories.nameAr")} <span className="text-[#E6497F]">*</span>
            </label>
            <input
              type="text"
              value={formData.NameAr}
              onChange={(e) => onChange({ NameAr: e.target.value })}
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-[#E6497F] focus:ring-2 focus:ring-[#E6497F] focus:ring-opacity-50 outline-none transition-all"
              dir="rtl"
              placeholder="أدخل اسم الفئة بالعربية"
              required
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              {t("categories.type")} <span className="text-[#E6497F]">*</span>
            </label>
            <input
              type="text"
              value={formData.Type}
              onChange={(e) => onChange({ Type: e.target.value })}
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-[#E6497F] focus:ring-2 focus:ring-[#E6497F] focus:ring-opacity-50 outline-none transition-all"
              placeholder="e.g., Clothing, Electronics"
              required
            />
          </div>

          {/* Active Status */}
          <div className="flex items-center pt-6">
            <label className="flex items-center cursor-pointer gap-4">
              <input
                type="checkbox"
                checked={formData.IsActive}
                onChange={(e) => onChange({ IsActive: e.target.checked })}
                className="w-5 h-5 text-[#E6497F] border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#E6497F]"
              />
              <span className="text-sm font-bold text-black">
                {t("categories.active")}
              </span>
            </label>
          </div>

          {/* Description English */}
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-black mb-2">
              {t("categories.descriptionEn")}{" "}
              <span className="text-[#E6497F]">*</span>
            </label>
            <textarea
              value={formData.Description}
              onChange={(e) => onChange({ Description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-[#E6497F] focus:ring-2 focus:ring-[#E6497F] focus:ring-opacity-50 outline-none transition-all resize-none"
              placeholder="Enter category description in English"
              required
            />
          </div>

          {/* Description Arabic */}
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-black mb-2">
              {t("categories.descriptionAr")}{" "}
              <span className="text-[#E6497F]">*</span>
            </label>
            <textarea
              value={formData.DescriptionAr}
              onChange={(e) => onChange({ DescriptionAr: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-[#E6497F] focus:ring-2 focus:ring-[#E6497F] focus:ring-opacity-50 outline-none transition-all resize-none"
              dir="rtl"
              placeholder="أدخل وصف الفئة بالعربية"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-black mb-2">
              {t("categories.images")}
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-[#E6497F] focus:ring-2 focus:ring-[#E6497F] focus:ring-opacity-50 outline-none transition-all"
            />

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove image"
                    >
                      <svg
                        className="w-4 h-4"
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
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t-2 border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors"
          >
            {t("common.cancel")}
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-[#E6497F] hover:bg-[#d63d6f] text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
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
                {t("common.loading")}
              </>
            ) : (
              t("common.submit")
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
