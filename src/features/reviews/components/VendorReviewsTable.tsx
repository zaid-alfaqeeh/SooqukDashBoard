"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { VendorReview, ReviewStatus } from "../types/review.types";
import {
  useVendorReviews,
  useUpdateVendorReviewStatus,
  useDeleteVendorReview,
} from "../hooks/useReviews";
import {
  getReviewStatusLabel,
  getReviewStatusColor,
  renderStars,
  formatDate,
  truncateText,
  getReviewStatusValue,
} from "../utils/reviewUtils";
import { ReviewActionButtons } from "./ReviewActionButtons";

/**
 * Vendor Reviews Management Table
 * Admin-only component for managing vendor reviews
 */
export function VendorReviewsTable() {
  const t = useTranslations("reviews");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("pending");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);

  // Fetch reviews
  const { data, isLoading, error } = useVendorReviews({
    pageNumber,
    pageSize,
    status: getReviewStatusValue(statusFilter),
  });

  // Mutations
  const updateStatusMutation = useUpdateVendorReviewStatus();
  const deleteMutation = useDeleteVendorReview();

  const handleApprove = (id: number) => {
    updateStatusMutation.mutate({
      id,
      data: { status: ReviewStatus.Approved },
    });
  };

  const handleReject = (id: number) => {
    updateStatusMutation.mutate({
      id,
      data: { status: ReviewStatus.Rejected },
    });
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800">{t("error")}</p>
      </div>
    );
  }

  const isMutating = updateStatusMutation.isPending || deleteMutation.isPending;

  return (
    <div className="space-y-4">
      {/* Header and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("vendorReviews")}
        </h2>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-black">
            {t("filter")}:
          </label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(
                e.target.value as "all" | "pending" | "approved" | "rejected"
              );
              setPageNumber(1);
            }}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all" className="text-black">
              {t("allReviews")}
            </option>
            <option value="pending" className="text-black">
              {t("statusPending")}
            </option>
            <option value="approved" className="text-black">
              {t("statusApproved")}
            </option>
            <option value="rejected" className="text-black">
              {t("statusRejected")}
            </option>
          </select>
        </div>
      </div>

      {/* Stats */}
      {data && (
        <div className="text-sm text-gray-600">
          {t("showing")} {data.items.length} {t("of")} {data.totalCount}{" "}
          {t("vendorReviews")}
        </div>
      )}

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("id")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("vendor")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("user")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("rating")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("comment")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("status")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("date")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("actions")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <span className="ml-3 text-gray-600">{t("loading")}</span>
                    </div>
                  </td>
                </tr>
              ) : data?.items.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    {t("noReviews")}
                  </td>
                </tr>
              ) : (
                data?.items.map((review: VendorReview) => (
                  <tr key={review.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {review.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="max-w-xs">
                        <div className="font-medium">{review.vendorName}</div>
                        <div className="text-gray-500 text-xs">
                          ID: {review.vendorId}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {review.userName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className="text-yellow-500"
                        title={`${review.rating}/5`}
                      >
                        {renderStars(review.rating)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-black">
                      <div className="max-w-md">
                        <p>{truncateText(review.comment, 80)}</p>
                        {review.imageUrl && (
                          <img
                            src={review.imageUrl}
                            alt="Review"
                            className="mt-2 w-24 h-24 object-cover rounded-lg border border-gray-200"
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${getReviewStatusColor(
                          review.status
                        )}`}
                      >
                        {getReviewStatusLabel(review.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(review.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <ReviewActionButtons
                        reviewId={review.id}
                        currentStatus={review.status}
                        onApprove={handleApprove}
                        onReject={handleReject}
                        onDelete={handleDelete}
                        isLoading={isMutating}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                disabled={!data.hasPreviousPage}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                {t("previous")}
              </button>
              <button
                onClick={() => setPageNumber((p) => p + 1)}
                disabled={!data.hasNextPage}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                {t("next")}
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  {t("page")}{" "}
                  <span className="font-medium">{data.pageNumber}</span>{" "}
                  {t("of")}{" "}
                  <span className="font-medium">{data.totalPages}</span>
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                    disabled={!data.hasPreviousPage}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    {t("previous")}
                  </button>
                  <button
                    onClick={() => setPageNumber((p) => p + 1)}
                    disabled={!data.hasNextPage}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    {t("next")}
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
