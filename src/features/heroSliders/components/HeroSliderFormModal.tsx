"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import type { HeroSlider } from "../types/heroSlider.types";

interface HeroSliderFormModalProps {
  slider?: HeroSlider;
  onSubmit: (data: {
    Title: string;
    ImageFile?: File;
    IsActive: boolean;
    SortOrder: number;
  }) => void;
  onClose: () => void;
  isLoading: boolean;
}

export default function HeroSliderFormModal({
  slider,
  onSubmit,
  onClose,
  isLoading,
}: HeroSliderFormModalProps) {
  const t = useTranslations("heroSliders");
  const tCommon = useTranslations("common");
  const isEdit = !!slider;

  const [formData, setFormData] = useState({
    Title: slider?.title || "",
    IsActive: slider?.isActive ?? true,
    SortOrder: slider?.sortOrder || 1,
  });
  const [imageFile, setImageFile] = useState<File | undefined>();
  const [imagePreview, setImagePreview] = useState<string>(slider?.image || "");
  const [validationError, setValidationError] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: Image is required for creation
    if (!isEdit && !imageFile) {
      setValidationError(t("imageRequired"));
      return;
    }

    setValidationError("");
    onSubmit({
      ...formData,
      ImageFile: imageFile,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="relative inline-block w-full max-w-2xl overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-2xl sm:my-8 sm:align-middle">
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">
                  {isEdit ? t("editSlider") : t("createSlider")}
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
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
            </div>

            {/* Body */}
            <div className="px-6 py-6 space-y-4">
              {/* Validation Error */}
              {validationError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm font-semibold">
                    {validationError}
                  </p>
                </div>
              )}

              {/* Image Preview */}
              {imagePreview && (
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {t("preview")}
                  </label>
                  <div className="w-full h-32 rounded-lg overflow-hidden bg-gray-200">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t("title")} *
                </label>
                <input
                  type="text"
                  value={formData.Title}
                  onChange={(e) =>
                    setFormData({ ...formData, Title: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
                  placeholder={t("titlePlaceholder")}
                />
              </div>

              {/* Image File Upload */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t("imageFile")} {!isEdit && "*"}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required={!isEdit}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {isEdit ? t("imageFileHintEdit") : t("imageFileHintCreate")}
                </p>
              </div>

              {/* Sort Order */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t("sortOrder")} *
                </label>
                <input
                  type="number"
                  value={formData.SortOrder}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      SortOrder: Number(e.target.value),
                    })
                  }
                  required
                  min={1}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
                />
              </div>

              {/* Is Active */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.IsActive}
                  onChange={(e) =>
                    setFormData({ ...formData, IsActive: e.target.checked })
                  }
                  className="w-5 h-5 text-[#E6497F] focus:ring-[#E6497F] rounded"
                />
                <label className="ml-3 text-sm font-bold text-gray-700">
                  {t("isActive")}
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {tCommon("cancel")}
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-[#E6497F] hover:bg-[#d63d6f] text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading
                  ? isEdit
                    ? t("updating")
                    : t("creating")
                  : tCommon("save")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
