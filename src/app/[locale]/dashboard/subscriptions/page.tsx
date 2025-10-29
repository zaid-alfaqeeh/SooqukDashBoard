"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuthGuard } from "@/features/auth/utils/authGurd";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import {
  useSubscriptionPlans,
  useCreateSubscriptionPlan,
  useUpdateSubscriptionPlan,
  useDeleteSubscriptionPlan,
} from "@/features/subscriptions/hooks/useSubscriptions";
import SubscriptionPlansTable from "@/features/subscriptions/components/SubscriptionPlansTable";
import CreateSubscriptionModal from "@/features/subscriptions/components/CreateSubscriptionModal";
import EditSubscriptionModal from "@/features/subscriptions/components/EditSubscriptionModal";
import DeleteSubscriptionModal from "@/features/subscriptions/components/DeleteSubscriptionModal";
import type {
  SubscriptionPlan,
  CreateSubscriptionPlanRequest,
  UpdateSubscriptionPlanRequest,
} from "@/features/subscriptions/types/subscription.types";

export default function SubscriptionsPage() {
  const t = useTranslations("subscriptions");
  useAuthGuard(["Admin"]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
  const [deletingPlan, setDeletingPlan] = useState<SubscriptionPlan | null>(
    null
  );

  // Fetch subscription plans
  const { data: plans, isLoading } = useSubscriptionPlans();

  // Mutations
  const createMutation = useCreateSubscriptionPlan();
  const updateMutation = useUpdateSubscriptionPlan();
  const deleteMutation = useDeleteSubscriptionPlan();

  // Handlers
  const handleCreate = async (data: CreateSubscriptionPlanRequest) => {
    try {
      await createMutation.mutateAsync(data);
      setShowCreateModal(false);
    } catch (error) {
      console.error("Failed to create subscription plan:", error);
    }
  };

  const handleEdit = async (data: UpdateSubscriptionPlanRequest) => {
    try {
      await updateMutation.mutateAsync(data);
      setEditingPlan(null);
    } catch (error) {
      console.error("Failed to update subscription plan:", error);
    }
  };

  const handleDelete = async () => {
    if (!deletingPlan) return;

    try {
      await deleteMutation.mutateAsync(deletingPlan.id);
      setDeletingPlan(null);
    } catch (error) {
      console.error("Failed to delete subscription plan:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-black">{t("title")}</h1>
            <p className="text-gray-600 mt-1">{t("subtitle")}</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-[#E6497F] hover:bg-[#d63d6f] text-white font-bold rounded-lg transition-colors shadow-lg"
          >
            {t("createPlan")}
          </button>
        </div>

        {/* Statistics Cards */}
        {plans && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">
                    {t("totalPlans")}
                  </p>
                  <p className="text-3xl font-bold mt-1">{plans.length}</p>
                </div>
                <div className="bg-blue-400/30 rounded-full p-3">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">
                    {t("freePlans")}
                  </p>
                  <p className="text-3xl font-bold mt-1">
                    {plans.filter((p) => p.price === 0).length}
                  </p>
                </div>
                <div className="bg-green-400/30 rounded-full p-3">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">
                    {t("paidPlans")}
                  </p>
                  <p className="text-3xl font-bold mt-1">
                    {plans.filter((p) => p.price > 0).length}
                  </p>
                </div>
                <div className="bg-purple-400/30 rounded-full p-3">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Plans Table */}
        <SubscriptionPlansTable
          plans={plans || []}
          onEdit={setEditingPlan}
          onDelete={setDeletingPlan}
          isLoading={isLoading}
        />

        {/* Modals */}
        {showCreateModal && (
          <CreateSubscriptionModal
            onSubmit={handleCreate}
            onClose={() => setShowCreateModal(false)}
            isLoading={createMutation.isPending}
          />
        )}

        {editingPlan && (
          <EditSubscriptionModal
            plan={editingPlan}
            onSubmit={handleEdit}
            onClose={() => setEditingPlan(null)}
            isLoading={updateMutation.isPending}
          />
        )}

        {deletingPlan && (
          <DeleteSubscriptionModal
            plan={deletingPlan}
            onConfirm={handleDelete}
            onClose={() => setDeletingPlan(null)}
            isLoading={deleteMutation.isPending}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
