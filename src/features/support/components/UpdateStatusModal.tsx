import { useState } from "react";
import { useTranslations } from "next-intl";
import { TicketStatus, type Ticket } from "../types/support.types";

interface UpdateStatusModalProps {
  ticket: Ticket;
  onClose: () => void;
  onUpdate: (
    ticketId: number,
    status: TicketStatus,
    notifyCustomer: boolean
  ) => void;
  isLoading: boolean;
}

export default function UpdateStatusModal({
  ticket,
  onClose,
  onUpdate,
  isLoading,
}: UpdateStatusModalProps) {
  const t = useTranslations("support");
  const [newStatus, setNewStatus] = useState<TicketStatus>(ticket.status);
  const [notifyCustomer, setNotifyCustomer] = useState(false);

  const handleSubmit = () => {
    onUpdate(ticket.id, newStatus, notifyCustomer);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <h3 className="text-2xl font-bold text-black mb-4">
          {t("actions.updateStatus")}
        </h3>
        <p className="text-sm text-black mb-6">
          {t("ticketLabel")} <span className="font-semibold">#{ticket.id}</span>
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              {t("actions.newStatus")}
            </label>
            <select
              value={newStatus}
              onChange={(e) =>
                setNewStatus(Number(e.target.value) as TicketStatus)
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
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="notifyCustomer"
              checked={notifyCustomer}
              onChange={(e) => setNotifyCustomer(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-[#E6497F] focus:ring-[#E6497F] focus:ring-2"
            />
            <label
              htmlFor="notifyCustomer"
              className="text-sm font-semibold text-black cursor-pointer"
            >
              {t("actions.notifyCustomer")}
            </label>
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
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-[#E6497F] hover:bg-[#d63d6f] text-white font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? t("actions.updating") : t("actions.update")}
          </button>
        </div>
      </div>
    </div>
  );
}
