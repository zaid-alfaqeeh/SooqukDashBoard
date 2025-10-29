import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Ticket } from "../types/support.types";

interface DeleteTicketModalProps {
  ticket: Ticket;
  onConfirm: (id: number, hardDelete: boolean) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export default function DeleteTicketModal({
  ticket,
  onConfirm,
  onCancel,
  isLoading,
}: DeleteTicketModalProps) {
  const t = useTranslations("support");
  const [hardDelete, setHardDelete] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-6">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h3 className="text-2xl font-bold text-black text-center mb-3">
          {t("actions.deleteTicket")}
        </h3>

        <p className="text-gray-600 text-center mb-2">
          {t("actions.confirmDelete")}
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <p className="text-center font-semibold text-black">
            {t("ticketLabel")} #{ticket.id}
          </p>
          <p className="text-center text-sm text-gray-600">
            {ticket.name} - {ticket.email}
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-red-800 text-center font-medium mb-3">
            {t("actions.deleteWarning")}
          </p>
          <div className="flex items-center justify-center gap-3">
            <input
              type="checkbox"
              id="hardDelete"
              checked={hardDelete}
              onChange={(e) => setHardDelete(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-600 focus:ring-2"
            />
            <label
              htmlFor="hardDelete"
              className="text-sm font-semibold text-red-900 cursor-pointer"
            >
              {t("actions.permanentDelete")}
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            {t("actions.cancel")}
          </button>
          <button
            onClick={() => onConfirm(ticket.id, hardDelete)}
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? t("actions.deleting") : t("actions.delete")}
          </button>
        </div>
      </div>
    </div>
  );
}
