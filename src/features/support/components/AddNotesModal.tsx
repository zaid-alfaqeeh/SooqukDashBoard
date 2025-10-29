import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Ticket } from "../types/support.types";

interface AddNotesModalProps {
  ticket: Ticket;
  onClose: () => void;
  onSubmit: (ticketId: number, notes: string) => void;
  isLoading: boolean;
}

export default function AddNotesModal({
  ticket,
  onClose,
  onSubmit,
  isLoading,
}: AddNotesModalProps) {
  const t = useTranslations("support");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (notes.trim()) {
      onSubmit(ticket.id, notes);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
        <h3 className="text-2xl font-bold text-black mb-4">
          {t("actions.addNotes")}
        </h3>
        <p className="text-sm text-black mb-6">
          {t("ticketLabel")} <span className="font-semibold">#{ticket.id}</span>{" "}
          - {ticket.name}
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              {t("actions.adminNotes")}
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black placeholder:text-gray-500 focus:border-[#E6497F] outline-none"
              placeholder={t("actions.notesPlaceholder")}
            />
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            {t("actions.cancel")}
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !notes.trim()}
            className="flex-1 px-6 py-3 bg-[#E6497F] hover:bg-[#d63d6f] text-white font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? t("actions.saving") : t("actions.save")}
          </button>
        </div>
      </div>
    </div>
  );
}
