"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import type { OrderReview } from "../types/review.types";
import { useOrderReviews } from "../hooks/useReviews";
import {
  getReviewStatusLabel,
  getReviewStatusColor,
  renderStars,
  formatDate,
  truncateText,
  getReviewStatusValue,
} from "../utils/reviewUtils";

/**
 * Order Reviews Table (View Only)
 * Read-only display of order reviews for admin
 */
export default function OrderReviewsTable() {
  const t = useTranslations("reviews");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);

  // Fetch reviews
  const { data, isLoading, error } = useOrderReviews({
    pageNumber,
    pageSize,
    status: getReviewStatusValue(statusFilter),
  });

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800">Error loading reviews. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-black">
          Order Reviews (View Only)
        </h2>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-black">Filter:</label>
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
            <option value="all">All Reviews</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      {data && (
        <div className="text-sm text-black font-medium">
          Showing {data.items.length} of {data.totalCount} reviews
        </div>
      )}

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Comment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <span className="ml-3 text-black">
                        Loading reviews...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : data?.items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-black">
                    No reviews found
                  </td>
                </tr>
              ) : (
                data?.items.map((review: OrderReview) => (
                  <tr key={review.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black font-medium">
                      {review.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-black">
                      <div className="max-w-xs">
                        <div className="font-medium">
                          Order #{review.orderId}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-black">
                      <div className="font-medium">{review.customerName}</div>
                      <div className="text-xs text-gray-600">
                        {review.userId}
                      </div>
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
                        {truncateText(review.comment, 80)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${getReviewStatusColor(
                          review.status
                        )}`}
                      >
                        {getReviewStatusLabel(review.status, locale)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                      {formatDate(review.createdAt)}
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
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-black bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPageNumber((p) => p + 1)}
                disabled={!data.hasNextPage}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-black bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-black font-medium">
                  Page <span className="font-bold">{data.pageNumber}</span> of{" "}
                  <span className="font-bold">{data.totalPages}</span>
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                    disabled={!data.hasPreviousPage}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-black hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPageNumber((p) => p + 1)}
                    disabled={!data.hasNextPage}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-black hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
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
