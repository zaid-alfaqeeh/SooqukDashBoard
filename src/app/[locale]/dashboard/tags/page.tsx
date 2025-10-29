"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuthGuard } from "@/features/auth/utils/authGurd";
import { useToast } from "@/components/Toast/Toast";
import { getErrorMessage } from "@/utils/api-error";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import {
  useTags,
  useCreateTag,
  useUpdateTag,
  useDeleteTag,
} from "@/features/tags/hooks/useTags";
import type { Tag } from "@/features/tags/types/tag.types";
import TagsTable from "@/features/tags/components/TagsTable";
import TagFormModal from "@/features/tags/components/TagFormModal";
import DeleteTagModal from "@/features/tags/components/DeleteTagModal";

export default function TagsPage() {
  const t = useTranslations("tags");
  const toast = useToast();
  useAuthGuard(["Admin"]);

  // State
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [deletingTag, setDeletingTag] = useState<Tag | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Queries
  const { data: tags, isLoading, error } = useTags();
  const createMutation = useCreateTag();
  const updateMutation = useUpdateTag();
  const deleteMutation = useDeleteTag();

  // Filter tags by search term
  const filteredTags = tags?.filter(
    (tag) =>
      tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tag.nameAr.includes(searchTerm) ||
      tag.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers
  const handleCreate = () => {
    setEditingTag(null);
    setShowFormModal(true);
  };

  const handleEdit = (tag: Tag) => {
    setEditingTag(tag);
    setShowFormModal(true);
  };

  const handleSubmit = async (data: {
    name: string;
    nameAr: string;
    slug: string;
  }) => {
    try {
      if (editingTag) {
        await updateMutation.mutateAsync({
          id: editingTag.id,
          ...data,
        });
        toast.success(t("tagUpdatedSuccess"));
      } else {
        await createMutation.mutateAsync(data);
        toast.success(t("tagCreatedSuccess"));
      }
      setShowFormModal(false);
      setEditingTag(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDelete = async () => {
    if (!deletingTag) return;

    try {
      await deleteMutation.mutateAsync(deletingTag.id);
      toast.success(t("tagDeletedSuccess"));
      setDeletingTag(null);
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
              {t("createTag")}
            </button>
          </div>

          {/* Stats */}
          {tags && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                {t("totalTags")}:{" "}
                <span className="font-bold">{tags.length}</span>
                {searchTerm && filteredTags && (
                  <>
                    {" "}
                    | {t("showing")}:{" "}
                    <span className="font-bold">{filteredTags.length}</span>
                  </>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Tags Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <TagsTable
            tags={filteredTags || []}
            isLoading={isLoading}
            error={error}
            onEdit={handleEdit}
            onDelete={setDeletingTag}
          />
        </div>

        {/* Form Modal */}
        {showFormModal && (
          <TagFormModal
            tag={editingTag || undefined}
            onSubmit={handleSubmit}
            onClose={() => {
              setShowFormModal(false);
              setEditingTag(null);
            }}
            isLoading={createMutation.isPending || updateMutation.isPending}
          />
        )}

        {/* Delete Modal */}
        {deletingTag && (
          <DeleteTagModal
            tag={deletingTag}
            onConfirm={handleDelete}
            onCancel={() => setDeletingTag(null)}
            isLoading={deleteMutation.isPending}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
