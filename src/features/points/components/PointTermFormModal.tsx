"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import type { PointTerm } from "../types/points.types";

interface PointTermFormModalProps {
  term?: PointTerm;
  onSubmit: (data: {
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    isActive: boolean;
  }) => void;
  onClose: () => void;
  isLoading: boolean;
}

export default function PointTermFormModal({
  term,
  onSubmit,
  onClose,
  isLoading,
}: PointTermFormModalProps) {
  const t = useTranslations("points");
  const tCommon = useTranslations("common");
  const isEdit = !!term;

  const [formData, setFormData] = useState({
    title: term?.name || "",
    titleAr: term?.nameAr || "",
    description: term?.description || "",
    descriptionAr: term?.descriptionAr || "",
    isActive: term?.isActive ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
        <div className="relative inline-block w-full max-w-3xl overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-2xl sm:my-8 sm:align-middle">
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">
                  {isEdit ? t("editTerm") : t("createTerm")}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title (EN) */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {t("programName")} (English) *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
                    placeholder={t("programNamePlaceholder")}
                  />
                </div>

                {/* Title (AR) */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {t("programName")} (العربية) *
                  </label>
                  <input
                    type="text"
                    value={formData.titleAr}
                    onChange={(e) =>
                      setFormData({ ...formData, titleAr: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
                    placeholder={t("programNameArPlaceholder")}
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Description (EN) */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t("description")} (English) *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none resize-none"
                  placeholder={t("descriptionPlaceholder")}
                />
              </div>

              {/* Description (AR) */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t("description")} (العربية) *
                </label>
                <textarea
                  value={formData.descriptionAr}
                  onChange={(e) =>
                    setFormData({ ...formData, descriptionAr: e.target.value })
                  }
                  required
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none resize-none"
                  placeholder={t("descriptionArPlaceholder")}
                  dir="rtl"
                />
              </div>

              {/* Status */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="w-5 h-5 text-[#E6497F] focus:ring-[#E6497F] rounded"
                />
                <label
                  htmlFor="isActive"
                  className="text-sm font-bold text-gray-700 cursor-pointer"
                >
                  {t("isActive")}
                </label>
              </div>

              {isEdit && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700 font-semibold">
                    ℹ️ {t("editNote")}
                  </p>
                </div>
              )}
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
