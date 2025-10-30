"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuthGuard } from "@/features/auth/utils/authGurd";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import {
  useVendorProductReviews,
  useVendorProductReviewStatistics,
} from "@/features/vendors/hooks/useVendorStatistics";
import { formatDate } from "@/features/orders/utils/orderUtils";

export default function ProductReviewsPage() {
  const t = useTranslations("productReviews");
  useAuthGuard(["Admin", "Vendor"]);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);

  const { data: reviewsData, isLoading: reviewsLoading } =
    useVendorProductReviews({ pageNumber, pageSize });

  const { data: statsData, isLoading: statsLoading } =
    useVendorProductReviewStatistics();

  const isLoading = reviewsLoading || statsLoading;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-black font-semibold">{t("loading")}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const statistics = statsData?.data;
  const reviews = reviewsData?.data;

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        ))}
      </div>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
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

        {/* Statistics Cards */}
        {statistics && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {/* Average Rating */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-gray-600">
                    {t("averageRating")}
                  </h3>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-yellow-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-4xl font-extrabold text-yellow-600">
                    {statistics.averageRating.toFixed(1)}
                  </p>
                  {renderStars(Math.round(statistics.averageRating))}
                </div>
              </div>

              {/* Total Reviews */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-gray-600">
                    {t("totalReviews")}
                  </h3>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-4xl font-extrabold text-black">
                  {statistics.totalReviews}
                </p>
              </div>

              {/* Total Products */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-gray-600">
                    {t("totalProducts")}
                  </h3>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-4xl font-extrabold text-black">
                  {statistics.totalProducts}
                </p>
              </div>

              {/* Rating Distribution */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <h3 className="text-sm font-bold text-gray-600 mb-4">
                  {t("ratingDistribution")}
                </h3>
                <div className="space-y-2">
                  {[
                    { stars: 5, count: statistics.ratingDistribution.fiveStar },
                    { stars: 4, count: statistics.ratingDistribution.fourStar },
                    {
                      stars: 3,
                      count: statistics.ratingDistribution.threeStar,
                    },
                    { stars: 2, count: statistics.ratingDistribution.twoStar },
                    { stars: 1, count: statistics.ratingDistribution.oneStar },
                  ].map(({ stars, count }) => (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-black w-6">
                        {stars}★
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full transition-all"
                          style={{
                            width: `${
                              statistics.totalReviews > 0
                                ? (count / statistics.totalReviews) * 100
                                : 0
                            }%`,
                          }}
                        />
                      </div>
                      <span className="text-xs font-bold text-black w-8 text-right">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Reviews */}
            {statistics.recentReviews &&
              statistics.recentReviews.length > 0 && (
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 mb-8">
                  <h2 className="text-2xl font-bold text-black mb-6">
                    {t("recentReviews")}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {statistics.recentReviews.map((review, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-2">
                          {renderStars(review.rating)}
                          <span className="text-xs text-gray-500">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-black mb-1">
                          {review.productName}
                        </p>
                        <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                          {review.comment}
                        </p>
                        <p className="text-xs text-gray-500">
                          {review.userName}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </>
        )}

        {/* All Reviews Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-black mb-6">
              {t("allReviews")}
            </h2>

            {reviews && reviews.items.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-purple-600 to-purple-700">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                          {t("product")}
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                          {t("customer")}
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                          {t("rating")}
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                          {t("comment")}
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                          {t("status")}
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                          {t("date")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reviews.items.map((review) => (
                        <tr key={review.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="text-sm font-bold text-black">
                              {review.productName}
                            </div>
                            <div className="text-xs text-gray-500">
                              ID: {review.productId}
                            </div>
                            {review.title && (
                              <div className="text-xs text-purple-600 mt-1">
                                {review.title}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-semibold text-black">
                              {review.userName}
                            </div>
                            <div className="text-xs text-gray-500">
                              {review.userId.substring(0, 8)}...
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {renderStars(review.rating)}
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-black max-w-md">
                              {review.comment}
                            </p>
                            {review.imageUrl && (
                              <img
                                src={review.imageUrl}
                                alt="Review"
                                className="mt-2 w-20 h-20 object-cover rounded-lg border border-gray-200"
                              />
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 inline-flex text-xs font-bold rounded-full ${getStatusColor(
                                review.status
                              )}`}
                            >
                              {review.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-black font-medium">
                            {formatDate(review.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {reviews.totalPages > 1 && (
                  <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg mt-6">
                    <div className="flex flex-1 justify-between sm:hidden">
                      <button
                        onClick={() =>
                          setPageNumber((prev) => Math.max(1, prev - 1))
                        }
                        disabled={!reviews.hasPreviousPage}
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-bold text-black hover:bg-gray-50 disabled:opacity-50"
                      >
                        {t("previous")}
                      </button>
                      <button
                        onClick={() =>
                          setPageNumber((prev) =>
                            Math.min(reviews.totalPages, prev + 1)
                          )
                        }
                        disabled={!reviews.hasNextPage}
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-bold text-black hover:bg-gray-50 disabled:opacity-50"
                      >
                        {t("next")}
                      </button>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-black font-medium">
                          {t("page")}{" "}
                          <span className="font-bold">
                            {reviews.pageNumber}
                          </span>{" "}
                          {t("of")}{" "}
                          <span className="font-bold">
                            {reviews.totalPages}
                          </span>
                        </p>
                      </div>
                      <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                          <button
                            onClick={() =>
                              setPageNumber((prev) => Math.max(1, prev - 1))
                            }
                            disabled={!reviews.hasPreviousPage}
                            className="relative inline-flex items-center rounded-l-md px-4 py-2 text-black font-bold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 disabled:opacity-50"
                          >
                            {t("previous")}
                          </button>
                          <button
                            onClick={() =>
                              setPageNumber((prev) =>
                                Math.min(reviews.totalPages, prev + 1)
                              )
                            }
                            disabled={!reviews.hasNextPage}
                            className="relative inline-flex items-center rounded-r-md px-4 py-2 text-black font-bold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 disabled:opacity-50"
                          >
                            {t("next")}
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-10">
                <p className="text-black font-semibold">{t("noReviews")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
