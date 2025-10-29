"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import type { Tag } from "../types/tag.types";
import { generateSlug, isValidSlug } from "../utils/tagUtils";

interface TagFormModalProps {
  tag?: Tag;
  onSubmit: (data: { name: string; nameAr: string; slug: string }) => void;
  onClose: () => void;
  isLoading: boolean;
}

export default function TagFormModal({
  tag,
  onSubmit,
  onClose,
  isLoading,
}: TagFormModalProps) {
  const t = useTranslations("tags");
  const tCommon = useTranslations("common");
  const isEdit = !!tag;

  const [formData, setFormData] = useState({
    name: tag?.name || "",
    nameAr: tag?.nameAr || "",
    slug: tag?.slug || "",
  });
  const [autoGenerateSlug, setAutoGenerateSlug] = useState(!isEdit);
  const [slugError, setSlugError] = useState("");

  // Auto-generate slug from name
  useEffect(() => {
    if (autoGenerateSlug && formData.name) {
      const generatedSlug = generateSlug(formData.name);
      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.name, autoGenerateSlug]);

  const handleSlugChange = (value: string) => {
    setAutoGenerateSlug(false);
    setFormData({ ...formData, slug: value });

    if (value && !isValidSlug(value)) {
      setSlugError(t("slugError"));
    } else {
      setSlugError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidSlug(formData.slug)) {
      setSlugError(t("slugError"));
      return;
    }

    onSubmit(formData);
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
                  {isEdit ? t("editTag") : t("createTag")}
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
              {/* Name (EN) */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t("name")} (English) *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
                  placeholder={t("namePlaceholder")}
                />
              </div>

              {/* Name (AR) */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t("nameAr")} (العربية) *
                </label>
                <input
                  type="text"
                  value={formData.nameAr}
                  onChange={(e) =>
                    setFormData({ ...formData, nameAr: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
                  placeholder={t("nameArPlaceholder")}
                  dir="rtl"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t("slug")} *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  required
                  className={`w-full px-4 py-2 border-2 rounded-lg font-mono text-black focus:border-[#E6497F] outline-none ${
                    slugError ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder={t("slugPlaceholder")}
                />
                <div className="flex items-center justify-between mt-2">
                  <label className="flex items-center cursor-pointer text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={autoGenerateSlug}
                      onChange={(e) => setAutoGenerateSlug(e.target.checked)}
                      className="w-4 h-4 mr-2 text-[#E6497F] focus:ring-[#E6497F] rounded"
                    />
                    {t("autoGenerateSlug")}
                  </label>
                  {slugError && (
                    <p className="text-xs text-red-600">{slugError}</p>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">{t("slugHint")}</p>
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
                disabled={isLoading || !!slugError}
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
