"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { SendNotificationToRoleRequest, UserRole } from "../types/notification.types";

interface SendNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SendNotificationToRoleRequest) => void;
  isLoading: boolean;
}

const ROLES: UserRole[] = [
  "Admin",
  "Vendor",
  "ShippingCompany",
  "Customer",
  "Super Admin",
];

export default function SendNotificationModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: SendNotificationModalProps) {
  const t = useTranslations("notifications");
  const tCommon = useTranslations("common");

  const [formData, setFormData] = useState<SendNotificationToRoleRequest>({
    role: "Customer",
    title: "",
    titleAr: "",
    message: "",
    messageAr: "",
    icon: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleClose = () => {
    // Reset form on close
    setFormData({
      role: "Customer",
      title: "",
      titleAr: "",
      message: "",
      messageAr: "",
      icon: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={handleClose}
        ></div>

        {/* Modal */}
        <div className="relative inline-block w-full max-w-2xl overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-2xl sm:my-8 sm:align-middle">
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-purple-700">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">
                  {t("sendNotification")}
                </h3>
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-white hover:text-gray-200 transition-colors"
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
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t("role")} <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value as UserRole })
                  }
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black font-medium"
                >
                  {ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title (English) */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t("notificationTitle")} (English) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black font-medium"
                  placeholder={t("titlePlaceholder")}
                />
              </div>

              {/* Title (Arabic) */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t("titleAr")} (العربية) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.titleAr}
                  onChange={(e) =>
                    setFormData({ ...formData, titleAr: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black font-medium"
                  placeholder={t("titleArPlaceholder")}
                  dir="rtl"
                />
              </div>

              {/* Message (English) */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t("message")} (English) <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black font-medium resize-none"
                  placeholder={t("messagePlaceholder")}
                />
              </div>

              {/* Message (Arabic) */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t("messageAr")} (العربية) <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.messageAr}
                  onChange={(e) =>
                    setFormData({ ...formData, messageAr: e.target.value })
                  }
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black font-medium resize-none"
                  placeholder={t("messageArPlaceholder")}
                  dir="rtl"
                />
              </div>

              {/* Icon */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t("icon")}
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black font-medium"
                  placeholder={t("iconPlaceholder")}
                />
                <p className="text-xs text-gray-500 mt-1">{t("iconHint")}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {tCommon("cancel")}
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? t("sending") : t("send")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

