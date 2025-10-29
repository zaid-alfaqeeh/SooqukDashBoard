import { useTranslations } from "next-intl";
import type { User } from "../types/users.types";

interface DeleteUserModalProps {
  user: User;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

export default function DeleteUserModal({
  user,
  onConfirm,
  onCancel,
  isLoading,
}: DeleteUserModalProps) {
  const t = useTranslations("users");

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h3 className="text-2xl font-bold text-black text-center mb-4">
          {t("deleteUser")}
        </h3>

        <p className="text-center text-gray-700 mb-2">{t("confirmDelete")}</p>
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-bold">{t("fullName")}:</span> {user.fullName}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-bold">{t("email")}:</span> {user.email}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-bold">{t("role")}:</span>{" "}
            {t(`roles.${user.role}`)}
          </p>
        </div>
        <p className="text-center text-sm text-red-600 mb-6">
          {t("deleteWarning")}
        </p>

        <div className="flex gap-4">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            {t("cancel")}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? t("deleting") : t("delete")}
          </button>
        </div>
      </div>
    </div>
  );
}
