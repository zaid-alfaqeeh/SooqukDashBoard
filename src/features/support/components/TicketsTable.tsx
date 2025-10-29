import { useTranslations } from "next-intl";
import type { Ticket } from "../types/support.types";
import { getTicketStatusInfo, formatDate } from "../utils/supportUtils";

interface TicketsTableProps {
  tickets: Ticket[];
  isLoading: boolean;
  error: Error | null;
  onUpdateStatus: (ticket: Ticket) => void;
  onAddNotes: (ticket: Ticket) => void;
  onRespond: (ticket: Ticket) => void;
  onDelete: (ticket: Ticket) => void;
}

export default function TicketsTable({
  tickets,
  isLoading,
  error,
  onUpdateStatus,
  onAddNotes,
  onRespond,
  onDelete,
}: TicketsTableProps) {
  const t = useTranslations("support");

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-16 h-16 border-4 border-[#E6497F] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600 font-semibold">
        {t("errors.loadingTickets")}
      </div>
    );
  }

  if (!tickets || tickets.length === 0) {
    return (
      <div className="text-center py-20 text-gray-600 font-semibold">
        {t("noTickets")}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("ticketId")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("customerName")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("email")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("messagePreview")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("status")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("createdAt")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("info")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("actions.title")}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tickets.map((ticket) => {
            const statusInfo = getTicketStatusInfo(ticket.status);
            return (
              <tr key={ticket.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-bold text-black">
                    #{ticket.id}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-black">
                    {ticket.name}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{ticket.email}</span>
                </td>
                <td className="px-6 py-4 max-w-xs">
                  <p className="text-sm text-gray-700 truncate">
                    {ticket.messagePreview}
                  </p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs font-bold rounded-full ${statusInfo.colorClass}`}
                  >
                    {statusInfo.label}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-xs text-gray-600">
                    {formatDate(ticket.createdAt)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2 items-center">
                    {ticket.imageCount > 0 && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {ticket.imageCount}
                      </span>
                    )}
                    {ticket.hasAdminNotes && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onUpdateStatus(ticket)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded transition-colors"
                      title={t("actions.updateStatus")}
                    >
                      {t("actions.status")}
                    </button>
                    <button
                      onClick={() => onRespond(ticket)}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded transition-colors"
                      title={t("actions.respond")}
                    >
                      {t("actions.respond")}
                    </button>
                    <button
                      onClick={() => onAddNotes(ticket)}
                      className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded transition-colors"
                      title={t("actions.addNotes")}
                    >
                      {t("actions.notes")}
                    </button>
                    <button
                      onClick={() => onDelete(ticket)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded transition-colors"
                      title={t("actions.delete")}
                    >
                      {t("actions.delete")}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
