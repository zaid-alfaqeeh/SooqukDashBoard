"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuthGuard } from "@/features/auth/utils/authGurd";
import { useToast } from "@/components/Toast/Toast";
import { getErrorMessage } from "@/utils/api-error";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import { useSendNotificationToRole } from "@/features/notifications/hooks/useNotifications";
import SendNotificationModal from "@/features/notifications/components/SendNotificationModal";

export default function NotificationsPage() {
  const t = useTranslations("notifications");
  const toast = useToast();
  useAuthGuard(["Admin"]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const sendNotificationMutation = useSendNotificationToRole();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (data: any) => {
    try {
      await sendNotificationMutation.mutateAsync(data);
      toast.success(t("notificationSent"));
      setIsModalOpen(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
            <p className="text-gray-600 mt-2">{t("subtitle")}</p>
          </div>
          <button
            onClick={handleOpenModal}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold rounded-lg transition-colors shadow-lg"
          >
            {t("sendNotification")}
          </button>
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-purple-900 mb-2">
                {t("infoTitle")}
              </h3>
              <p className="text-purple-800">{t("infoDescription")}</p>
            </div>
          </div>
        </div>

        {/* Send Notification Modal */}
        <SendNotificationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          isLoading={sendNotificationMutation.isPending}
        />
      </div>
    </DashboardLayout>
  );
}

