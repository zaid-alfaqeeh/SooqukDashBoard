"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuthGuard } from "@/features/auth/utils/authGurd";
import { useToast } from "@/components/Toast/Toast";
import { getErrorMessage } from "@/utils/api-error";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import {
  useTickets,
  useTicketStatistics,
  useUpdateTicketStatus,
  useUpdateTicketNotes,
  useRespondToTicket,
  useDeleteTicket,
} from "@/features/support/hooks/useSupport";
import type {
  Ticket,
  TicketStatus,
} from "@/features/support/types/support.types";
import TicketStatistics from "@/features/support/components/TicketStatistics";
import TicketsTable from "@/features/support/components/TicketsTable";
import UpdateStatusModal from "@/features/support/components/UpdateStatusModal";
import AddNotesModal from "@/features/support/components/AddNotesModal";
import RespondModal from "@/features/support/components/RespondModal";
import DeleteTicketModal from "@/features/support/components/DeleteTicketModal";

export default function SupportTicketsPage() {
  const t = useTranslations("support");
  const tCommon = useTranslations("common");
  const toast = useToast();
  useAuthGuard(["Admin"]);

  // State
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusModalTicket, setStatusModalTicket] = useState<Ticket | null>(
    null
  );
  const [notesModalTicket, setNotesModalTicket] = useState<Ticket | null>(null);
  const [respondModalTicket, setRespondModalTicket] = useState<Ticket | null>(
    null
  );
  const [deleteModalTicket, setDeleteModalTicket] = useState<Ticket | null>(
    null
  );

  // Queries
  const { data, isLoading, error } = useTickets({
    page,
    pageSize,
    status: statusFilter || undefined,
    searchTerm: searchTerm || undefined,
  });

  const { data: statistics } = useTicketStatistics(30);

  // Mutations
  const updateStatusMutation = useUpdateTicketStatus();
  const updateNotesMutation = useUpdateTicketNotes();
  const respondMutation = useRespondToTicket();
  const deleteMutation = useDeleteTicket();

  // Handlers
  const handleUpdateStatus = async (
    ticketId: number,
    status: TicketStatus,
    notifyCustomer: boolean
  ) => {
    try {
      await updateStatusMutation.mutateAsync({
        id: ticketId,
        data: { status, notifyCustomer },
      });
      toast.success(t("actions.statusUpdated"));
      setStatusModalTicket(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleAddNotes = async (ticketId: number, notes: string) => {
    try {
      await updateNotesMutation.mutateAsync({
        id: ticketId,
        data: { adminNotes: notes },
      });
      toast.success(t("actions.notesAdded"));
      setNotesModalTicket(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleRespond = async (
    ticketId: number,
    response: string,
    updateStatus: TicketStatus
  ) => {
    try {
      await respondMutation.mutateAsync({
        id: ticketId,
        data: { response, updateStatus },
      });
      toast.success(t("actions.responseSent"));
      setRespondModalTicket(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDelete = async (id: number, hardDelete: boolean) => {
    try {
      await deleteMutation.mutateAsync({ id, hardDelete });
      toast.success(t("actions.ticketDeleted"));
      setDeleteModalTicket(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-black mb-3">
            {t("title")}
          </h1>
          <p className="text-lg text-black font-medium">{t("description")}</p>
        </div>

        {/* Statistics */}
        <TicketStatistics statistics={statistics} />

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilterChange(e.target.value)}
              className="px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
            >
              <option value="">{t("filters.allStatus")}</option>
              <option value="0">{t("statuses.new")}</option>
              <option value="1">{t("statuses.inProgress")}</option>
              <option value="2">{t("statuses.awaitingCustomer")}</option>
              <option value="3">{t("statuses.resolved")}</option>
              <option value="4">{t("statuses.closed")}</option>
              <option value="5">{t("statuses.reopened")}</option>
            </select>

            {/* Search */}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={t("filters.search")}
              className="px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold text-black placeholder:text-gray-500 focus:border-[#E6497F] outline-none"
            />
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <TicketsTable
            tickets={data?.data || []}
            isLoading={isLoading}
            error={error}
            onUpdateStatus={setStatusModalTicket}
            onAddNotes={setNotesModalTicket}
            onRespond={setRespondModalTicket}
            onDelete={setDeleteModalTicket}
          />

          {/* Pagination */}
          {data?.pagination && data.pagination.totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                {tCommon("page")} {data.pagination.currentPage} {tCommon("of")}{" "}
                {data.pagination.totalPages} ({data.pagination.totalCount}{" "}
                total)
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={data.pagination.currentPage === 1}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-black font-bold rounded transition-colors"
                >
                  {tCommon("previous")}
                </button>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={
                    data.pagination.currentPage >= data.pagination.totalPages
                  }
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-black font-bold rounded transition-colors"
                >
                  {tCommon("next")}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modals */}
        {statusModalTicket && (
          <UpdateStatusModal
            ticket={statusModalTicket}
            onClose={() => setStatusModalTicket(null)}
            onUpdate={handleUpdateStatus}
            isLoading={updateStatusMutation.isPending}
          />
        )}

        {notesModalTicket && (
          <AddNotesModal
            ticket={notesModalTicket}
            onClose={() => setNotesModalTicket(null)}
            onSubmit={handleAddNotes}
            isLoading={updateNotesMutation.isPending}
          />
        )}

        {respondModalTicket && (
          <RespondModal
            ticket={respondModalTicket}
            onClose={() => setRespondModalTicket(null)}
            onSubmit={handleRespond}
            isLoading={respondMutation.isPending}
          />
        )}

        {deleteModalTicket && (
          <DeleteTicketModal
            ticket={deleteModalTicket}
            onConfirm={handleDelete}
            onCancel={() => setDeleteModalTicket(null)}
            isLoading={deleteMutation.isPending}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
