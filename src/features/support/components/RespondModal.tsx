import { useState } from "react";
import { useTranslations } from "next-intl";
import { TicketStatus, type Ticket } from "../types/support.types";

interface RespondModalProps {
  ticket: Ticket;
  onClose: () => void;
  onSubmit: (
    ticketId: number,
    response: string,
    updateStatus: TicketStatus
  ) => void;
  isLoading: boolean;
}

export default function RespondModal({
  ticket,
  onClose,
  onSubmit,
  isLoading,
}: RespondModalProps) {
  const t = useTranslations("support");
  const [response, setResponse] = useState("");
  const [updateStatus, setUpdateStatus] = useState<TicketStatus>(ticket.status);

  const handleSubmit = () => {
    if (response.trim()) {
      onSubmit(ticket.id, response, updateStatus);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold text-black mb-4">
          {t("actions.respond")}
        </h3>
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-2">
            {t("ticketLabel")}{" "}
            <span className="font-semibold">#{ticket.id}</span>
          </p>
          <p className="text-sm font-semibold text-black mb-1">
            {ticket.name} ({ticket.email})
          </p>
          <p className="text-sm text-gray-700">{ticket.messagePreview}</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              {t("actions.yourResponse")} *
            </label>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black placeholder:text-gray-500 focus:border-[#E6497F] outline-none"
              placeholder={t("actions.responsePlaceholder")}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              {t("actions.updateStatusAfterResponse")}
            </label>
            <select
              value={updateStatus}
              onChange={(e) =>
                setUpdateStatus(Number(e.target.value) as TicketStatus)
              }
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
            >
              <option value={TicketStatus.New}>{t("statuses.new")}</option>
              <option value={TicketStatus.InProgress}>
                {t("statuses.inProgress")}
              </option>
              <option value={TicketStatus.AwaitingCustomer}>
                {t("statuses.awaitingCustomer")}
              </option>
              <option value={TicketStatus.Resolved}>
                {t("statuses.resolved")}
              </option>
              <option value={TicketStatus.Closed}>
                {t("statuses.closed")}
              </option>
              <option value={TicketStatus.Reopened}>
                {t("statuses.reopened")}
              </option>
            </select>
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
            disabled={isLoading || !response.trim()}
            className="flex-1 px-6 py-3 bg-[#E6497F] hover:bg-[#d63d6f] text-white font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? t("actions.sending") : t("actions.sendResponse")}
          </button>
        </div>
      </div>
    </div>
  );
}
