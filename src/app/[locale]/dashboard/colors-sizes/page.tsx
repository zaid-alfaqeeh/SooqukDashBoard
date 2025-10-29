"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuthGuard } from "@/features/auth/utils/authGurd";
import { useToast } from "@/components/Toast/Toast";
import { getErrorMessage } from "@/utils/api-error";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import { useSelector } from "react-redux";
import type { RootState } from "@/features/providers/store";
import {
  useColors,
  useSizes,
  useCreateColor,
  useUpdateColor,
  useDeleteColor,
  useCreateSize,
  useUpdateSize,
  useDeleteSize,
} from "@/features/colorsSizes/hooks/useColorsSizes";
import type {
  Color,
  Size,
  CreateColorRequest,
  UpdateColorRequest,
  CreateSizeRequest,
  UpdateSizeRequest,
} from "@/features/colorsSizes/types/colorsSizes.types";
import ColorsTable from "@/features/colorsSizes/components/ColorsTable";
import SizesTable from "@/features/colorsSizes/components/SizesTable";
import ColorFormModal from "@/features/colorsSizes/components/ColorFormModal";
import SizeFormModal from "@/features/colorsSizes/components/SizeFormModal";
import DeleteModal from "@/features/colorsSizes/components/DeleteModal";

type ActiveTab = "colors" | "sizes";

export default function ColorsSizesPage() {
  const t = useTranslations("colorsSizes");
  const toast = useToast();
  useAuthGuard(["Admin", "vendor"]);

  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.roles.includes("Admin");

  // State
  const [activeTab, setActiveTab] = useState<ActiveTab>("colors");
  const [searchTerm, setSearchTerm] = useState("");

  // Colors state
  const [colorFormModal, setColorFormModal] = useState<{
    isOpen: boolean;
    color?: Color;
  }>({ isOpen: false });
  const [colorToDelete, setColorToDelete] = useState<Color | null>(null);

  // Sizes state
  const [sizeFormModal, setSizeFormModal] = useState<{
    isOpen: boolean;
    size?: Size;
  }>({ isOpen: false });
  const [sizeToDelete, setSizeToDelete] = useState<Size | null>(null);

  // Queries
  const {
    data: colors,
    isLoading: colorsLoading,
    error: colorsError,
  } = useColors({ search: searchTerm });

  const {
    data: sizes,
    isLoading: sizesLoading,
    error: sizesError,
  } = useSizes({ search: searchTerm });

  // Mutations
  const createColorMutation = useCreateColor();
  const updateColorMutation = useUpdateColor();
  const deleteColorMutation = useDeleteColor();
  const createSizeMutation = useCreateSize();
  const updateSizeMutation = useUpdateSize();
  const deleteSizeMutation = useDeleteSize();

  // Handlers - Colors
  const handleColorSubmit = async (
    data: CreateColorRequest | UpdateColorRequest
  ) => {
    try {
      if ("id" in data) {
        await updateColorMutation.mutateAsync({
          id: data.id,
          data: data as UpdateColorRequest,
        });
        toast.success(t("colorUpdatedSuccess"));
      } else {
        await createColorMutation.mutateAsync(data as CreateColorRequest);
        toast.success(t("colorCreatedSuccess"));
      }
      setColorFormModal({ isOpen: false });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleColorDelete = async () => {
    if (!colorToDelete) return;

    try {
      await deleteColorMutation.mutateAsync(colorToDelete.id);
      toast.success(t("colorDeletedSuccess"));
      setColorToDelete(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  // Handlers - Sizes
  const handleSizeSubmit = async (
    data: CreateSizeRequest | UpdateSizeRequest
  ) => {
    try {
      if ("Id" in data) {
        await updateSizeMutation.mutateAsync({
          id: data.Id,
          data: data as UpdateSizeRequest,
        });
        toast.success(t("sizeUpdatedSuccess"));
      } else {
        await createSizeMutation.mutateAsync(data as CreateSizeRequest);
        toast.success(t("sizeCreatedSuccess"));
      }
      setSizeFormModal({ isOpen: false });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleSizeDelete = async () => {
    if (!sizeToDelete) return;

    try {
      await deleteSizeMutation.mutateAsync(sizeToDelete.id);
      toast.success(t("sizeDeletedSuccess"));
      setSizeToDelete(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
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
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("colors")}
            className={`px-6 py-3 font-bold rounded-lg transition-colors ${
              activeTab === "colors"
                ? "bg-[#E6497F] text-white"
                : "bg-white text-black border-2 border-gray-300 hover:border-[#E6497F]"
            }`}
          >
            {t("colorsTab")}
          </button>
          <button
            onClick={() => setActiveTab("sizes")}
            className={`px-6 py-3 font-bold rounded-lg transition-colors ${
              activeTab === "sizes"
                ? "bg-[#E6497F] text-white"
                : "bg-white text-black border-2 border-gray-300 hover:border-[#E6497F]"
            }`}
          >
            {t("sizesTab")}
          </button>
        </div>

        {/* Search & Create */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={
                activeTab === "colors"
                  ? t("searchColorsPlaceholder")
                  : t("searchSizesPlaceholder")
              }
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold text-black placeholder:text-gray-500 focus:border-[#E6497F] outline-none"
            />

            {/* Create Button (Admin Only) */}
            {isAdmin && (
              <button
                onClick={() => {
                  if (activeTab === "colors") {
                    setColorFormModal({ isOpen: true });
                  } else {
                    setSizeFormModal({ isOpen: true });
                  }
                }}
                className="px-6 py-3 bg-[#E6497F] hover:bg-[#d63d6f] text-white font-bold rounded-lg transition-colors whitespace-nowrap"
              >
                {activeTab === "colors"
                  ? t("createNewColor")
                  : t("createNewSize")}
              </button>
            )}
          </div>
        </div>

        {/* Tables */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          {activeTab === "colors" ? (
            <ColorsTable
              colors={colors || []}
              isLoading={colorsLoading}
              error={colorsError}
              onEdit={(color) => setColorFormModal({ isOpen: true, color })}
              onDelete={setColorToDelete}
              isAdmin={isAdmin || false}
            />
          ) : (
            <SizesTable
              sizes={sizes || []}
              isLoading={sizesLoading}
              error={sizesError}
              onEdit={(size) => setSizeFormModal({ isOpen: true, size })}
              onDelete={setSizeToDelete}
              isAdmin={isAdmin || false}
            />
          )}
        </div>

        {/* Modals - Colors */}
        {colorFormModal.isOpen && (
          <ColorFormModal
            color={colorFormModal.color}
            onSubmit={handleColorSubmit}
            onClose={() => setColorFormModal({ isOpen: false })}
            isLoading={
              createColorMutation.isPending || updateColorMutation.isPending
            }
          />
        )}

        {colorToDelete && (
          <DeleteModal
            type="color"
            itemName={colorToDelete.name}
            onConfirm={handleColorDelete}
            onCancel={() => setColorToDelete(null)}
            isLoading={deleteColorMutation.isPending}
          />
        )}

        {/* Modals - Sizes */}
        {sizeFormModal.isOpen && (
          <SizeFormModal
            size={sizeFormModal.size}
            onSubmit={handleSizeSubmit}
            onClose={() => setSizeFormModal({ isOpen: false })}
            isLoading={
              createSizeMutation.isPending || updateSizeMutation.isPending
            }
          />
        )}

        {sizeToDelete && (
          <DeleteModal
            type="size"
            itemName={sizeToDelete.name}
            onConfirm={handleSizeDelete}
            onCancel={() => setSizeToDelete(null)}
            isLoading={deleteSizeMutation.isPending}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
