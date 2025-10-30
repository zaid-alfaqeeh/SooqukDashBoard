"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import type { FAQ, CreateFAQRequest } from "../types/faq.types";

interface FAQFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateFAQRequest) => void;
  isLoading: boolean;
  faq?: FAQ | null;
}

export default function FAQFormModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  faq,
}: FAQFormModalProps) {
  const t = useTranslations("faq");
  const [formData, setFormData] = useState<CreateFAQRequest>({
    titleEn: "",
    titleAr: "",
    contentEn: "",
    contentAr: "",
  });

  useEffect(() => {
    if (faq) {
      setFormData({
        titleEn: faq.titleEn,
        titleAr: faq.titleAr,
        contentEn: faq.contentEn,
        contentAr: faq.contentAr,
      });
    } else {
      setFormData({
        titleEn: "",
        titleAr: "",
        contentEn: "",
        contentAr: "",
      });
    }
  }, [faq]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-4 rounded-t-2xl">
          <h2 className="text-2xl font-bold">
            {faq ? t("editFAQ") : t("addFAQ")}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* English Title */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t("titleEn")}
            </label>
            <input
              type="text"
              value={formData.titleEn}
              onChange={(e) =>
                setFormData({ ...formData, titleEn: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black font-medium"
              required
            />
          </div>

          {/* Arabic Title */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t("titleAr")}
            </label>
            <input
              type="text"
              value={formData.titleAr}
              onChange={(e) =>
                setFormData({ ...formData, titleAr: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black font-medium"
              dir="rtl"
              required
            />
          </div>

          {/* English Content */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t("contentEn")}
            </label>
            <textarea
              value={formData.contentEn}
              onChange={(e) =>
                setFormData({ ...formData, contentEn: e.target.value })
              }
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black font-medium resize-none"
              required
            />
          </div>

          {/* Arabic Content */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t("contentAr")}
            </label>
            <textarea
              value={formData.contentAr}
              onChange={(e) =>
                setFormData({ ...formData, contentAr: e.target.value })
              }
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black font-medium resize-none"
              dir="rtl"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg font-bold hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t("saving") : faq ? t("update") : t("add")}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t("cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
