"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useAuthGuard, useHasRole } from "@/features/auth/utils/authGurd";
import { useToast } from "@/components/Toast/Toast";
import { getErrorMessage } from "@/utils/api-error";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "@/features/categories/categoriesHook/useCategories";
import type { Category } from "@/features/categories/types/category.types";

// Import components
import CategoryCreateForm from "@/features/categories/categoriesComponent/CategoryCreateForm";
import CategoryTable from "@/features/categories/categoriesComponent/CategoryTable";
import CategoryEditModal from "@/features/categories/categoriesComponent/CategoryEditModal";
import CategoryDeleteModal from "@/features/categories/categoriesComponent/CategoryDeleteModal";

export default function CategoriesPage() {
  const t = useTranslations();
  const toast = useToast();

  useAuthGuard(["Admin", "Vendor"]);
  const isAdmin = useHasRole("Admin");

  // Pagination and search
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 12;

  // State
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<
    | (Category & {
        Description: string;
        DescriptionAr: string;
        NewImageFiles?: File[];
        ImagesToDelete?: number[];
      })
    | null
  >(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(
    null
  );

  // Queries
  const { data, isLoading, error } = useCategories({ search, page, limit });
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  // Form data
  const [formData, setFormData] = useState({
    Name: "",
    NameAr: "",
    Description: "",
    DescriptionAr: "",
    Type: "",
    IsActive: true,
    ImageFiles: [] as File[],
  });

  // Handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMutation.mutateAsync(formData);
      setShowCreateForm(false);
      setFormData({
        Name: "",
        NameAr: "",
        Description: "",
        DescriptionAr: "",
        Type: "",
        IsActive: true,
        ImageFiles: [],
      });
      toast.success(
        t("categories.categoryCreatedSuccess") ||
          "Category created successfully"
      );
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    try {
      await updateMutation.mutateAsync({
        id: editingCategory.categoryId,
        Name: editingCategory.categoryName,
        NameAr: editingCategory.categoryNameAr,
        Description: editingCategory.Description,
        DescriptionAr: editingCategory.DescriptionAr,
        Type: editingCategory.categoryType,
        IsActive: true, // You can add this to the form if needed
        NewImageFiles: editingCategory.NewImageFiles,
        ImagesToDelete: editingCategory.ImagesToDelete,
      });
      setEditingCategory(null);
      toast.success(
        t("categories.categoryUpdatedSuccess") ||
          "Category updated successfully"
      );
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
    }
  };

  const handleDelete = async () => {
    if (!deletingCategory) return;
    try {
      await deleteMutation.mutateAsync(deletingCategory.categoryId);
      setDeletingCategory(null);
      toast.success(
        t("categories.categoryDeletedSuccess") ||
          "Category deleted successfully"
      );
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
    }
  };

  const handleFormChange = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleEditChange = (
    data: Partial<
      Category & {
        Description: string;
        DescriptionAr: string;
        NewImageFiles?: File[];
        ImagesToDelete?: number[];
      }
    >
  ) => {
    if (editingCategory) {
      setEditingCategory({ ...editingCategory, ...data });
    }
  };

  const handleEditClick = (category: Category) => {
    setEditingCategory({
      ...category,
      Description: "", // You might want to fetch this from the API
      DescriptionAr: "",
      NewImageFiles: [],
      ImagesToDelete: [],
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-extrabold text-black mb-3">
                {t("categories.title")}
              </h1>
              <p className="text-lg text-black font-medium">
                {t("categories.description")}
              </p>
            </div>
            {isAdmin && (
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="flex items-center gap-2 bg-[#E6497F] hover:bg-[#d63d6f] text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {showCreateForm ? (
                  <>
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    {t("common.cancel")}
                  </>
                ) : (
                  <>
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
                    {t("categories.createCategory")}
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Create Form */}
        {isAdmin && showCreateForm && (
          <CategoryCreateForm
            formData={formData}
            isSubmitting={createMutation.isPending}
            onSubmit={handleSubmit}
            onChange={handleFormChange}
            onCancel={() => setShowCreateForm(false)}
          />
        )}

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-200">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder={t("categories.searchPlaceholder")}
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-[#E6497F] focus:ring-2 focus:ring-[#E6497F] focus:ring-opacity-50 outline-none transition-all"
              />
            </div>
            <button
              onClick={() => {
                setSearch("");
                setPage(1);
              }}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-black font-bold rounded-lg transition-colors"
            >
              {t("common.clear")}
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
          <CategoryTable
            categories={data?.categories}
            isLoading={isLoading}
            error={error}
            isAdmin={isAdmin}
            onEdit={handleEditClick}
            onDelete={setDeletingCategory}
          />

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <div className="mt-8 flex justify-center items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold rounded-lg transition-colors"
              >
                {t("common.previous")}
              </button>

              <span className="px-4 py-2 text-black font-bold">
                {t("common.page")} {page} {t("common.of")} {data.totalPages}
              </span>

              <button
                onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                disabled={page === data.totalPages}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold rounded-lg transition-colors"
              >
                {t("common.next")}
              </button>
            </div>
          )}

          {/* Results Info */}
          {data && (
            <div className="mt-4 text-center text-sm text-gray-600 font-semibold">
              {t("common.showing")} {data.categories.length} {t("common.of")}{" "}
              {data.totalItems} {t("categories.categories")}
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {isAdmin && editingCategory && (
          <CategoryEditModal
            category={editingCategory}
            isSubmitting={updateMutation.isPending}
            onSubmit={handleUpdate}
            onChange={handleEditChange}
            onClose={() => setEditingCategory(null)}
          />
        )}

        {/* Delete Modal */}
        {isAdmin && deletingCategory && (
          <CategoryDeleteModal
            category={deletingCategory}
            isDeleting={deleteMutation.isPending}
            onConfirm={handleDelete}
            onCancel={() => setDeletingCategory(null)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
