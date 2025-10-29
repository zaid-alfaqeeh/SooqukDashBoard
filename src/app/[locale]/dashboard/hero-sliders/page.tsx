"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuthGuard } from "@/features/auth/utils/authGurd";
import { useToast } from "@/components/Toast/Toast";
import { getErrorMessage } from "@/utils/api-error";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import {
  useHeroSliders,
  useCreateHeroSlider,
  useUpdateHeroSlider,
  useDeleteHeroSlider,
} from "@/features/heroSliders/hooks/useHeroSliders";
import type { HeroSlider } from "@/features/heroSliders/types/heroSlider.types";
import HeroSlidersTable from "@/features/heroSliders/components/HeroSlidersTable";
import HeroSliderFormModal from "@/features/heroSliders/components/HeroSliderFormModal";
import DeleteSliderModal from "@/features/heroSliders/components/DeleteSliderModal";

export default function HeroSlidersPage() {
  const t = useTranslations("heroSliders");
  const toast = useToast();
  useAuthGuard(["Admin"]);

  // State
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingSlider, setEditingSlider] = useState<HeroSlider | null>(null);
  const [deletingSlider, setDeletingSlider] = useState<HeroSlider | null>(null);

  // Queries
  const { data: sliders, isLoading, error } = useHeroSliders();
  const createMutation = useCreateHeroSlider();
  const updateMutation = useUpdateHeroSlider();
  const deleteMutation = useDeleteHeroSlider();

  // Handlers
  const handleCreate = () => {
    setEditingSlider(null);
    setShowFormModal(true);
  };

  const handleEdit = (slider: HeroSlider) => {
    setEditingSlider(slider);
    setShowFormModal(true);
  };

  const handleSubmit = async (data: {
    Title: string;
    ImageFile?: File;
    IsActive: boolean;
    SortOrder: number;
  }) => {
    try {
      if (editingSlider) {
        await updateMutation.mutateAsync({
          id: editingSlider.id,
          ...data,
        });
        toast.success(t("sliderUpdatedSuccess"));
      } else {
        await createMutation.mutateAsync(data);
        toast.success(t("sliderCreatedSuccess"));
      }
      setShowFormModal(false);
      setEditingSlider(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDelete = async () => {
    if (!deletingSlider) return;

    try {
      await deleteMutation.mutateAsync(deletingSlider.id);
      toast.success(t("sliderDeletedSuccess"));
      setDeletingSlider(null);
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
            {t("createSlider")}
          </button>
        </div>

        {/* Sliders Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <HeroSlidersTable
            sliders={sliders || []}
            isLoading={isLoading}
            error={error}
            onEdit={handleEdit}
            onDelete={setDeletingSlider}
          />
        </div>

        {/* Form Modal */}
        {showFormModal && (
          <HeroSliderFormModal
            slider={editingSlider || undefined}
            onSubmit={handleSubmit}
            onClose={() => {
              setShowFormModal(false);
              setEditingSlider(null);
            }}
            isLoading={createMutation.isPending || updateMutation.isPending}
          />
        )}

        {/* Delete Modal */}
        {deletingSlider && (
          <DeleteSliderModal
            slider={deletingSlider}
            onConfirm={handleDelete}
            onCancel={() => setDeletingSlider(null)}
            isLoading={deleteMutation.isPending}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
