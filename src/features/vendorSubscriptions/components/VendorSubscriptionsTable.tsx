"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  useVendorSubscriptions,
  useCreateVendorSubscription,
  useUpdateVendorSubscription,
  useDeleteVendorSubscription,
} from "../hooks/useVendorSubscriptions";
import type {
  VendorSubscription,
  CreateVendorSubscriptionRequest,
} from "../types/vendorSubscription.types";
import { useToast } from "@/components/Toast/Toast";
import { getErrorMessage } from "@/utils/api-error";
import VendorSubscriptionFormModal from "./VendorSubscriptionFormModal";
import DeleteVendorSubscriptionModal from "./DeleteVendorSubscriptionModal";

export default function VendorSubscriptionsTable() {
  const t = useTranslations("vendorSubscriptions");
  const toast = useToast();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] =
    useState<VendorSubscription | null>(null);

  // Fetch vendor subscriptions
  const { data, isLoading, error } = useVendorSubscriptions();

  // Mutations
  const createMutation = useCreateVendorSubscription();
  const updateMutation = useUpdateVendorSubscription();
  const deleteMutation = useDeleteVendorSubscription();

  const handleAdd = () => {
    setSelectedSubscription(null);
    setIsFormModalOpen(true);
  };

  const handleEdit = (subscription: VendorSubscription) => {
    setSelectedSubscription(subscription);
    setIsFormModalOpen(true);
  };

  const handleDelete = (subscription: VendorSubscription) => {
    setSelectedSubscription(subscription);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = async (
    formData: CreateVendorSubscriptionRequest
  ) => {
    try {
      if (selectedSubscription) {
        await updateMutation.mutateAsync({
          id: selectedSubscription.id,
          data: formData,
        });
        toast.success(t("updateSuccess"));
      } else {
        await createMutation.mutateAsync(formData);
        toast.success(t("createSuccess"));
      }
      setIsFormModalOpen(false);
      setSelectedSubscription(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedSubscription) return;

    try {
      await deleteMutation.mutateAsync(selectedSubscription.id);
      toast.success(t("deleteSuccess"));
      setIsDeleteModalOpen(false);
      setSelectedSubscription(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
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
          {t("addSubscription")}
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
                  {t("vendor")}
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                  {t("plan")}
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                  {t("price")}
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                  {t("period")}
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                  {t("status")}
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                  {t("actions")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                      <span className="ml-3 text-black font-medium">
                        {t("loading")}
                      </span>
                    </div>
                  </td>
                </tr>
              ) : data && data.length > 0 ? (
                data.map((subscription) => (
                  <tr
                    key={subscription.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-purple-600">
                        #{subscription.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900">
                        {subscription.vendorName}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: {subscription.vendorId}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900">
                        {subscription.planName}
                      </div>
                      <div className="text-xs text-gray-500" dir="rtl">
                        {subscription.planNameAr}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-green-600">
                        JOD {subscription.price.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs text-gray-600">
                        <div className="font-semibold">
                          {t("start")}: {formatDate(subscription.startDate)}
                        </div>
                        <div className="mt-1">
                          {t("end")}: {formatDate(subscription.endDate)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs font-bold rounded-full ${
                          subscription.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {subscription.isActive ? t("active") : t("inactive")}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(subscription)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                        >
                          {t("edit")}
                        </button>
                        <button
                          onClick={() => handleDelete(subscription)}
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
                  <td colSpan={7} className="px-6 py-10 text-center">
                    <p className="text-gray-600 font-semibold">
                      {t("noSubscriptions")}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <VendorSubscriptionFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setSelectedSubscription(null);
        }}
        onSubmit={handleFormSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
        subscription={selectedSubscription}
      />

      <DeleteVendorSubscriptionModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedSubscription(null);
        }}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteMutation.isPending}
        subscription={selectedSubscription}
      />
    </div>
  );
}
