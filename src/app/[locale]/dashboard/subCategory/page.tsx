"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuthGuard } from "@/features/auth/utils/authGurd";
import { useToast } from "@/components/Toast/Toast";
import { getErrorMessage } from "@/utils/api-error";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import {
  useSubCategories,
  useCreateSubCategory,
  useUpdateSubCategory,
  useDeleteSubCategory,
} from "@/features/subCategory/subCategoryHook/useSubCategories";
import { useCategories } from "@/features/categories/categoriesHook/useCategories";
import type {
  SubCategory,
  CreateSubCategoryRequest,
  UpdateSubCategoryRequest,
} from "@/features/subCategory/types/subCategory.types";
import SubCategoryTable from "@/features/subCategory/subCategoryComponent/SubCategoryTable";
import SubCategoryCreateForm from "@/features/subCategory/subCategoryComponent/SubCategoryCreateForm";
import SubCategoryEditModal from "@/features/subCategory/subCategoryComponent/SubCategoryEditModal";
import SubCategoryDeleteModal from "@/features/subCategory/subCategoryComponent/SubCategoryDeleteModal";

export default function SubCategoriesPage() {
  const t = useTranslations("subCategories");
  const tCommon = useTranslations("common");
  const toast = useToast();
  useAuthGuard(["Admin"]);

  // State
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingSubCategory, setEditingSubCategory] =
    useState<SubCategory | null>(null);
  const [deletingSubCategory, setDeletingSubCategory] =
    useState<SubCategory | null>(null);

  // Fetch categories for dropdown
  const { data: categoriesData } = useCategories({
    page: 1,
    limit: 100,
  });

  // Fetch subcategories
  const { data, isLoading, error } = useSubCategories({
    categoryId: selectedCategoryId,
    search: searchQuery,
    page,
    limit: pageSize,
  });

  // Mutations
  const createMutation = useCreateSubCategory();
  const updateMutation = useUpdateSubCategory();
  const deleteMutation = useDeleteSubCategory();

  // Handlers
  const handleCreate = async (formData: CreateSubCategoryRequest) => {
    try {
      await createMutation.mutateAsync(formData);
      toast.success(t("subCategoryCreatedSuccess"));
      setShowCreateForm(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleUpdate = async (
    id: number,
    formData: UpdateSubCategoryRequest
  ) => {
    try {
      await updateMutation.mutateAsync({ id, data: formData });
      toast.success(t("subCategoryUpdatedSuccess"));
      setEditingSubCategory(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success(t("subCategoryDeletedSuccess"));
      setDeletingSubCategory(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
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

        {/* Filters and Actions */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Selector */}
            <select
              value={selectedCategoryId}
              onChange={(e) => handleCategoryChange(Number(e.target.value))}
              className="px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
            >
              <option value={0}>{t("selectCategory")}</option>
              {categoriesData?.categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </select>

            {/* Search Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold text-black placeholder:text-gray-500 focus:border-[#E6497F] outline-none"
            />

            {/* Create Button */}
            <button
              onClick={() => setShowCreateForm(true)}
              disabled={!selectedCategoryId}
              className="px-6 py-3 bg-[#E6497F] hover:bg-[#d63d6f] disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              {t("createSubCategory")}
            </button>
          </div>
        </div>

        {/* Category Selection Message */}
        {!selectedCategoryId ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-200">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            <p className="text-gray-600 font-semibold text-lg">
              {t("selectCategoryMessage")}
            </p>
          </div>
        ) : (
          <>
            {/* SubCategories Table */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <SubCategoryTable
                subCategories={data?.subCategories || []}
                isLoading={isLoading}
                error={error}
                onEdit={setEditingSubCategory}
                onDelete={setDeletingSubCategory}
              />

              {/* Pagination */}
              {data && data.totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    {tCommon("page")} {data.currentPage} {tCommon("of")}{" "}
                    {data.totalPages} ({data.totalItems} total)
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={data.currentPage === 1}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-black font-bold rounded transition-colors"
                    >
                      {tCommon("previous")}
                    </button>
                    <button
                      onClick={() => setPage((p) => p + 1)}
                      disabled={data.currentPage >= data.totalPages}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-black font-bold rounded transition-colors"
                    >
                      {tCommon("next")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Create Form Modal */}
        {showCreateForm && selectedCategoryId > 0 && (
          <SubCategoryCreateForm
            categoryId={selectedCategoryId}
            onSubmit={handleCreate}
            onCancel={() => setShowCreateForm(false)}
            isLoading={createMutation.isPending}
          />
        )}

        {/* Edit Modal */}
        {editingSubCategory && (
          <SubCategoryEditModal
            subCategory={editingSubCategory}
            onSubmit={handleUpdate}
            onCancel={() => setEditingSubCategory(null)}
            isLoading={updateMutation.isPending}
          />
        )}

        {/* Delete Modal */}
        {deletingSubCategory && (
          <SubCategoryDeleteModal
            subCategory={deletingSubCategory}
            onConfirm={handleDelete}
            onCancel={() => setDeletingSubCategory(null)}
            isLoading={deleteMutation.isPending}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
