"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  useFAQs,
  useCreateFAQ,
  useUpdateFAQ,
  useDeleteFAQ,
} from "../hooks/useFAQ";
import type { FAQ, CreateFAQRequest } from "../types/faq.types";
import { useToast } from "@/components/Toast/Toast";
import { getErrorMessage } from "@/utils/api-error";
import FAQFormModal from "./FAQFormModal";
import DeleteFAQModal from "./DeleteFAQModal";

export default function FAQTable() {
  const t = useTranslations("faq");
  const locale = useLocale();
  const toast = useToast();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState<FAQ | null>(null);
  const [expandedFAQs, setExpandedFAQs] = useState<Set<number>>(new Set());

  // Fetch FAQs
  const { data, isLoading, error } = useFAQs();

  // Mutations
  const createMutation = useCreateFAQ();
  const updateMutation = useUpdateFAQ();
  const deleteMutation = useDeleteFAQ();

  const handleAdd = () => {
    setSelectedFAQ(null);
    setIsFormModalOpen(true);
  };

  const handleEdit = (faq: FAQ) => {
    setSelectedFAQ(faq);
    setIsFormModalOpen(true);
  };

  const handleDelete = (faq: FAQ) => {
    setSelectedFAQ(faq);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = async (formData: CreateFAQRequest) => {
    try {
      if (selectedFAQ) {
        await updateMutation.mutateAsync({
          id: selectedFAQ.id,
          data: formData,
        });
        toast.success(t("updateSuccess"));
      } else {
        await createMutation.mutateAsync(formData);
        toast.success(t("createSuccess"));
      }
      setIsFormModalOpen(false);
      setSelectedFAQ(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedFAQ) return;

    try {
      await deleteMutation.mutateAsync(selectedFAQ.id);
      toast.success(t("deleteSuccess"));
      setIsDeleteModalOpen(false);
      setSelectedFAQ(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const toggleExpand = (id: number) => {
    const newExpanded = new Set(expandedFAQs);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedFAQs(newExpanded);
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600 font-semibold">{t("error")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
          <p className="text-gray-600 mt-1">{t("subtitle")}</p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg font-bold hover:from-purple-700 hover:to-purple-800 transition-all shadow-md flex items-center gap-2"
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
          {t("addFAQ")}
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-purple-600 to-purple-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                  {t("id")}
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                  {t("title")}
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                  {t("content")}
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                  {t("createdAt")}
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                  {t("actions")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                      <span className="ml-3 text-black font-medium">
                        {t("loading")}
                      </span>
                    </div>
                  </td>
                </tr>
              ) : data && data.data.length > 0 ? (
                data.data.map((faq) => (
                  <tr
                    key={faq.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-purple-600">
                        #{faq.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900">
                        {locale === "en" ? faq.titleEn : faq.titleAr}
                      </div>
                      <div
                        className="text-xs text-gray-500 mt-1"
                        dir={locale === "en" ? "ltr" : "rtl"}
                      >
                        {locale === "en" ? faq.titleAr : faq.titleEn}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700">
                        {expandedFAQs.has(faq.id)
                          ? locale === "en"
                            ? faq.contentEn
                            : faq.contentAr
                          : truncateText(
                              locale === "en" ? faq.contentEn : faq.contentAr,
                              100
                            )}
                      </div>
                      {(locale === "en" ? faq.contentEn : faq.contentAr)
                        .length > 100 && (
                        <button
                          onClick={() => toggleExpand(faq.id)}
                          className="text-purple-600 text-xs font-semibold mt-1 hover:text-purple-700"
                        >
                          {expandedFAQs.has(faq.id)
                            ? t("showLess")
                            : t("showMore")}
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                      {new Date(faq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(faq)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                        >
                          {t("edit")}
                        </button>
                        <button
                          onClick={() => handleDelete(faq)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition-colors"
                        >
                          {t("delete")}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center">
                    <p className="text-gray-600 font-semibold">{t("noFAQs")}</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <FAQFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setSelectedFAQ(null);
        }}
        onSubmit={handleFormSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
        faq={selectedFAQ}
      />

      <DeleteFAQModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedFAQ(null);
        }}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteMutation.isPending}
        faq={selectedFAQ}
      />
    </div>
  );
}
