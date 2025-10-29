"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { ReviewStatus } from "../types/review.types";

interface ReviewActionButtonsProps {
  reviewId: number;
  currentStatus: ReviewStatus | string;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

/**
 * Action buttons for managing reviews
 * Shows Approve/Reject/Delete buttons based on current status
 */
export function ReviewActionButtons({
  reviewId,
  currentStatus,
  onApprove,
  onReject,
  onDelete,
  isLoading = false,
}: ReviewActionButtonsProps) {
  const t = useTranslations("reviews");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const isPending =
    currentStatus === "Pending" || currentStatus === ReviewStatus.Pending;
  const isApproved =
    currentStatus === "Approved" || currentStatus === ReviewStatus.Approved;
  const isRejected =
    currentStatus === "Rejected" || currentStatus === ReviewStatus.Rejected;

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDelete(reviewId);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Approve Button - Show if pending or rejected */}
      {(isPending || isRejected) && (
        <button
          onClick={() => onApprove(reviewId)}
          disabled={isLoading}
          className="px-3 py-1.5 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title={t("approve")}
        >
          ✓ {t("approve")}
        </button>
      )}

      {/* Reject Button - Show if pending or approved */}
      {(isPending || isApproved) && (
        <button
          onClick={() => onReject(reviewId)}
          disabled={isLoading}
          className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title={t("reject")}
        >
          ✗ {t("reject")}
        </button>
      )}

      {/* Delete Button - Always show */}
      <button
        onClick={handleDelete}
        disabled={isLoading}
        className="px-3 py-1.5 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title={t("delete")}
      >
        🗑 {t("delete")}
      </button>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {t("confirmDelete")}
            </h3>
            <p className="text-gray-600 mb-6">{t("confirmDeleteMessage")}</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                {t("cancel")}
              </button>
              <button
                onClick={confirmDelete}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {t("delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
