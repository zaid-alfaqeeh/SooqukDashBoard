"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuthGuard } from "@/features/auth/utils/authGurd";
import { useToast } from "@/components/Toast/Toast";
import { getErrorMessage } from "@/utils/api-error";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import {
  usePointTerms,
  useCreatePointTerm,
  useUpdatePointTerm,
  useDeletePointTerm,
  useRedemptionConfig,
  useUpdateRedemptionConfig,
} from "@/features/points/hooks/usePoints";
import type { PointTerm } from "@/features/points/types/points.types";
import PointTermsTable from "@/features/points/components/PointTermsTable";
import PointTermFormModal from "@/features/points/components/PointTermFormModal";
import DeletePointTermModal from "@/features/points/components/DeletePointTermModal";
import RedemptionConfigForm from "@/features/points/components/RedemptionConfigForm";

type TabType = "terms" | "config";

export default function PointsPage() {
  const t = useTranslations("points");
  const toast = useToast();
  useAuthGuard(["Admin"]);

  // State
  const [activeTab, setActiveTab] = useState<TabType>("terms");
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingTerm, setEditingTerm] = useState<PointTerm | null>(null);
  const [deletingTerm, setDeletingTerm] = useState<PointTerm | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Queries - Point Terms
  const {
    data: terms,
    isLoading: termsLoading,
    error: termsError,
  } = usePointTerms();
  const createTermMutation = useCreatePointTerm();
  const updateTermMutation = useUpdatePointTerm();
  const deleteTermMutation = useDeletePointTerm();

  // Queries - Redemption Config
  const {
    data: config,
    isLoading: configLoading,
    error: configError,
  } = useRedemptionConfig();
  const updateConfigMutation = useUpdateRedemptionConfig();

  // Filter terms by search term
  const filteredTerms = terms?.filter(
    (term) =>
      term.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.nameAr.includes(searchTerm) ||
      term.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers - Point Terms
  const handleCreate = () => {
    setEditingTerm(null);
    setShowFormModal(true);
  };

  const handleEdit = (term: PointTerm) => {
    setEditingTerm(term);
    setShowFormModal(true);
  };

  const handleSubmitTerm = async (data: {
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    isActive: boolean;
  }) => {
    try {
      if (editingTerm) {
        await updateTermMutation.mutateAsync({
          id: editingTerm.id,
          ...data,
        });
        toast.success(t("termUpdatedSuccess"));
      } else {
        await createTermMutation.mutateAsync(data);
        toast.success(t("termCreatedSuccess"));
      }
      setShowFormModal(false);
      setEditingTerm(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDeleteTerm = async () => {
    if (!deletingTerm) return;

    try {
      await deleteTermMutation.mutateAsync(deletingTerm.id);
      toast.success(t("termDeletedSuccess"));
      setDeletingTerm(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  // Handlers - Redemption Config
  const handleSubmitConfig = async (data: any) => {
    try {
      await updateConfigMutation.mutateAsync(data);
      toast.success(t("configUpdatedSuccess"));
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
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

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("terms")}
                className={`flex items-center gap-2 px-6 py-4 font-bold border-b-2 transition-colors ${
                  activeTab === "terms"
                    ? "border-[#E6497F] text-[#E6497F]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                {t("referralPrograms")}
                {terms && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                    {terms.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("config")}
                className={`flex items-center gap-2 px-6 py-4 font-bold border-b-2 transition-colors ${
                  activeTab === "config"
                    ? "border-[#E6497F] text-[#E6497F]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {t("redemptionConfig")}
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "terms" && (
          <>
            {/* Filters & Actions */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-200">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="flex-1 w-full md:w-auto">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t("searchPlaceholder")}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold text-black placeholder:text-gray-500 focus:border-[#E6497F] outline-none"
                  />
                </div>

                {/* Create Button */}
                <button
                  onClick={handleCreate}
                  className="flex items-center gap-2 px-6 py-3 bg-[#E6497F] hover:bg-[#d63d6f] text-white font-bold rounded-lg transition-colors whitespace-nowrap"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  {t("createTerm")}
                </button>
              </div>

              {/* Stats */}
              {terms && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        {t("totalPrograms")}:
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-bold rounded-full">
                        {terms.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        {t("activePrograms")}:
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full">
                        {terms.filter((t) => t.isActive).length}
                      </span>
                    </div>
                    {searchTerm && filteredTerms && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          {t("showing")}:
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-bold rounded-full">
                          {filteredTerms.length}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Terms Table */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <PointTermsTable
                terms={filteredTerms || []}
                isLoading={termsLoading}
                error={termsError}
                onEdit={handleEdit}
                onDelete={setDeletingTerm}
              />
            </div>
          </>
        )}

        {activeTab === "config" && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            {configLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E6497F]"></div>
              </div>
            ) : configError ? (
              <div className="text-center py-12">
                <p className="text-red-600 text-lg font-semibold">
                  Error: {configError.message}
                </p>
              </div>
            ) : config ? (
              <RedemptionConfigForm
                config={config}
                onSubmit={handleSubmitConfig}
                isLoading={updateConfigMutation.isPending}
              />
            ) : null}
          </div>
        )}

        {/* Form Modal */}
        {showFormModal && (
          <PointTermFormModal
            term={editingTerm || undefined}
            onSubmit={handleSubmitTerm}
            onClose={() => {
              setShowFormModal(false);
              setEditingTerm(null);
            }}
            isLoading={
              createTermMutation.isPending || updateTermMutation.isPending
            }
          />
        )}

        {/* Delete Modal */}
        {deletingTerm && (
          <DeletePointTermModal
            term={deletingTerm}
            onConfirm={handleDeleteTerm}
            onCancel={() => setDeletingTerm(null)}
            isLoading={deleteTermMutation.isPending}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
