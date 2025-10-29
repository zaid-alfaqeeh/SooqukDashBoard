"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuthGuard } from "@/features/auth/utils/authGurd";
import { useToast } from "@/components/Toast/Toast";
import { getErrorMessage } from "@/utils/api-error";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import {
  useCoupons,
  useCreateCoupon,
  useUpdateCoupon,
  useDeleteCoupon,
} from "@/features/coupons/hooks/useCoupons";
import type { Coupon } from "@/features/coupons/types/coupon.types";
import CouponsTable from "@/features/coupons/components/CouponsTable";
import CouponFormModal from "@/features/coupons/components/CouponFormModal";
import ViewCouponModal from "@/features/coupons/components/ViewCouponModal";
import DeleteCouponModal from "@/features/coupons/components/DeleteCouponModal";

export default function CouponsPage() {
  const t = useTranslations("coupons");
  const toast = useToast();
  useAuthGuard(["Admin"]);

  // State
  const [showFormModal, setShowFormModal] = useState(false);
  const [viewingCoupon, setViewingCoupon] = useState<Coupon | null>(null);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [deletingCoupon, setDeletingCoupon] = useState<Coupon | null>(null);

  // Queries
  const { data: coupons, isLoading, error } = useCoupons();
  const createMutation = useCreateCoupon();
  const updateMutation = useUpdateCoupon();
  const deleteMutation = useDeleteCoupon();

  // Handlers
  const handleCreate = () => {
    setEditingCoupon(null);
    setShowFormModal(true);
  };

  const handleEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setShowFormModal(true);
  };

  const handleSubmit = async (data: {
    code: string;
    discountValue: number;
    startDate: string;
    endDate: string;
    vendorId?: number | null;
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    status: number;
    type: number;
    maxUses: number;
  }) => {
    try {
      // Convert datetime-local to ISO format
      const formattedData = {
        ...data,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
      };

      if (editingCoupon) {
        await updateMutation.mutateAsync({
          id: editingCoupon.id,
          ...formattedData,
        });
        toast.success(t("couponUpdatedSuccess"));
      } else {
        await createMutation.mutateAsync(formattedData);
        toast.success(t("couponCreatedSuccess"));
      }
      setShowFormModal(false);
      setEditingCoupon(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDelete = async () => {
    if (!deletingCoupon) return;

    try {
      await deleteMutation.mutateAsync(deletingCoupon.id);
      toast.success(t("couponDeletedSuccess"));
      setDeletingCoupon(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-black mb-3">
              {t("title")}
            </h1>
            <p className="text-lg text-black font-medium">{t("description")}</p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-6 py-3 bg-[#E6497F] hover:bg-[#d63d6f] text-white font-bold rounded-lg transition-colors"
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
            {t("createCoupon")}
          </button>
        </div>

        {/* Coupons Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <CouponsTable
            coupons={coupons || []}
            isLoading={isLoading}
            error={error}
            onView={setViewingCoupon}
            onEdit={handleEdit}
            onDelete={setDeletingCoupon}
          />
        </div>

        {/* Form Modal */}
        {showFormModal && (
          <CouponFormModal
            coupon={editingCoupon || undefined}
            onSubmit={handleSubmit}
            onClose={() => {
              setShowFormModal(false);
              setEditingCoupon(null);
            }}
            isLoading={createMutation.isPending || updateMutation.isPending}
          />
        )}

        {/* View Modal */}
        {viewingCoupon && (
          <ViewCouponModal
            coupon={viewingCoupon}
            onClose={() => setViewingCoupon(null)}
            onEdit={(coupon) => {
              setViewingCoupon(null);
              handleEdit(coupon);
            }}
          />
        )}

        {/* Delete Modal */}
        {deletingCoupon && (
          <DeleteCouponModal
            coupon={deletingCoupon}
            onConfirm={handleDelete}
            onCancel={() => setDeletingCoupon(null)}
            isLoading={deleteMutation.isPending}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
