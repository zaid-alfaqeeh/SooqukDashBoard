"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import type { Category, CategoryImage } from "../types/category.types";

interface CategoryEditModalProps {
  category: Category & {
    Description: string;
    DescriptionAr: string;
    NewImageFiles?: File[];
    ImagesToDelete?: number[];
  };
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (
    data: Partial<
      Category & {
        Description: string;
        DescriptionAr: string;
        NewImageFiles?: File[];
        ImagesToDelete?: number[];
      }
    >
  ) => void;
  onClose: () => void;
}

export default function CategoryEditModal({
  category,
  isSubmitting,
  onSubmit,
  onChange,
  onClose,
}: CategoryEditModalProps) {
  const t = useTranslations();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const currentFiles = category.NewImageFiles || [];
      onChange({ NewImageFiles: [...currentFiles, ...files] });

      // Generate previews
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeNewImage = (index: number) => {
    const newImages = (category.NewImageFiles || []).filter(
      (_, i) => i !== index
    );
    onChange({ NewImageFiles: newImages });

    // Clean up preview URL
    URL.revokeObjectURL(imagePreviews[index]);
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const markImageForDeletion = (imageId: number) => {
    const currentToDelete = category.ImagesToDelete || [];
    if (currentToDelete.includes(imageId)) {
      onChange({
        ImagesToDelete: currentToDelete.filter((id) => id !== imageId),
      });
    } else {
      onChange({ ImagesToDelete: [...currentToDelete, imageId] });
    }
  };

  const isMarkedForDeletion = (imageId: number) => {
    return (category.ImagesToDelete || []).includes(imageId);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-[#E6497F] px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {t("categories.editCategory")}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6 text-white"
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

        <form
          onSubmit={onSubmit}
          className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Name English */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                {t("categories.nameEn")}{" "}
                <span className="text-[#E6497F]">*</span>
              </label>
              <input
                type="text"
                value={category.categoryName}
                onChange={(e) => onChange({ categoryName: e.target.value })}
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-[#E6497F] focus:ring-2 focus:ring-[#E6497F] focus:ring-opacity-50 outline-none transition-all"
                required
              />
            </div>

            {/* Name Arabic */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                {t("categories.nameAr")}{" "}
                <span className="text-[#E6497F]">*</span>
              </label>
              <input
                type="text"
                value={category.categoryNameAr}
                onChange={(e) => onChange({ categoryNameAr: e.target.value })}
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-[#E6497F] focus:ring-2 focus:ring-[#E6497F] focus:ring-opacity-50 outline-none transition-all"
                dir="rtl"
                required
              />
            </div>

            {/* Type */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-black mb-2">
                {t("categories.type")} <span className="text-[#E6497F]">*</span>
              </label>
              <input
                type="text"
                value={category.categoryType}
                onChange={(e) => onChange({ categoryType: e.target.value })}
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-[#E6497F] focus:ring-2 focus:ring-[#E6497F] focus:ring-opacity-50 outline-none transition-all"
                required
              />
            </div>

            {/* Description English */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-black mb-2">
                {t("categories.descriptionEn")}{" "}
                <span className="text-[#E6497F]">*</span>
              </label>
              <textarea
                value={category.Description}
                onChange={(e) => onChange({ Description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-[#E6497F] focus:ring-2 focus:ring-[#E6497F] focus:ring-opacity-50 outline-none transition-all resize-none"
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
                value={category.DescriptionAr}
                onChange={(e) => onChange({ DescriptionAr: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-[#E6497F] focus:ring-2 focus:ring-[#E6497F] focus:ring-opacity-50 outline-none transition-all resize-none"
                dir="rtl"
                required
              />
            </div>

            {/* Existing Images */}
            {category.categoryImages && category.categoryImages.length > 0 && (
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-black mb-2">
                  {t("categories.existingImages")}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {category.categoryImages.map((image) => (
                    <div
                      key={image.id}
                      className={`relative group ${
                        isMarkedForDeletion(image.id) ? "opacity-50" : ""
                      }`}
                    >
                      <img
                        src={image.imageUrl}
                        alt={image.altText || "Category image"}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => markImageForDeletion(image.id)}
                        className={`absolute top-2 right-2 p-1 rounded-full transition-opacity ${
                          isMarkedForDeletion(image.id)
                            ? "bg-green-600"
                            : "bg-red-600 opacity-0 group-hover:opacity-100"
                        } text-white`}
                        aria-label={
                          isMarkedForDeletion(image.id)
                            ? "Undo delete"
                            : "Delete image"
                        }
                      >
                        {isMarkedForDeletion(image.id) ? (
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
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        ) : (
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
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add New Images */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-black mb-2">
                {t("categories.addNewImages")}
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-[#E6497F] focus:ring-2 focus:ring-[#E6497F] focus:ring-opacity-50 outline-none transition-all"
              />

              {/* New Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`New image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove new image"
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
              onClick={onClose}
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
                  {t("categories.updating")}
                </>
              ) : (
                t("common.save")
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
