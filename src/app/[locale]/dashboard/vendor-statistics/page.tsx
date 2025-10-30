"use client";

import { useTranslations } from "next-intl";
import { useAuthGuard } from "@/features/auth/utils/authGurd";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import { useVendorStatistics } from "@/features/vendors/hooks/useVendorStatistics";
import { formatCurrency, formatDate } from "@/features/orders/utils/orderUtils";

export default function VendorStatisticsPage() {
  const t = useTranslations("vendorStatistics");
  useAuthGuard(["Admin", "Vendor"]);

  // TODO: Get vendorId from user object or API
  const vendorId = 1;

  const { data: statistics, isLoading, error } = useVendorStatistics(vendorId);

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

  if (error || !statistics) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="text-center py-20">
            <p className="text-red-600 font-semibold mb-4">{t("error")}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const {
    ordersOverview,
    revenueOverview,
    productsOverview,
    reviewsOverview,
    customerInsights,
  } = statistics;

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-black mb-3">
            {t("title")}
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-lg text-black font-medium">{t("description")}</p>
            <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-bold">
              {statistics.period}
            </span>
          </div>
        </div>

        {/* Orders Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-4">
            {t("ordersOverview")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-600">
                  {t("totalOrders")}
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
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-extrabold text-black">
                {ordersOverview.totalOrders}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-600">
                  {t("deliveredOrders")}
                </h3>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-extrabold text-black">
                {ordersOverview.deliveredOrders}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-600">
                  {t("cancelledOrders")}
                </h3>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-extrabold text-black">
                {ordersOverview.cancelledOrders}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-600">
                  {t("completionRate")}
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-extrabold text-black">
                {ordersOverview.completionRate}%
              </p>
            </div>
          </div>
        </div>

        {/* Revenue & Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Overview */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-black mb-6">
              {t("revenueOverview")}
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                <span className="text-sm font-bold text-gray-700">
                  {t("totalRevenue")}
                </span>
                <span className="text-2xl font-extrabold text-purple-600">
                  {formatCurrency(revenueOverview.totalRevenue, "JOD")}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-sm font-semibold text-gray-600">
                  {t("currentMonth")}
                </span>
                <span className="text-xl font-bold text-black">
                  {formatCurrency(revenueOverview.currentMonthRevenue, "JOD")}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-sm font-semibold text-gray-600">
                  {t("previousMonth")}
                </span>
                <span className="text-xl font-bold text-black">
                  {formatCurrency(revenueOverview.previousMonthRevenue, "JOD")}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <span className="text-sm font-bold text-gray-700">
                  {t("growthRate")}
                </span>
                <span
                  className={`text-xl font-extrabold ${
                    revenueOverview.revenueGrowthRate >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {revenueOverview.revenueGrowthRate > 0 && "+"}
                  {revenueOverview.revenueGrowthRate}%
                </span>
              </div>
            </div>
          </div>

          {/* Products Overview */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-black mb-6">
              {t("productsOverview")}
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <span className="text-sm font-bold text-gray-700">
                  {t("totalProducts")}
                </span>
                <span className="text-2xl font-extrabold text-blue-600">
                  {productsOverview.totalProducts}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <span className="text-sm font-bold text-gray-700">
                  {t("activeProducts")}
                </span>
                <span className="text-2xl font-extrabold text-green-600">
                  {productsOverview.activeProducts}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                <span className="text-sm font-bold text-gray-700">
                  {t("outOfStock")}
                </span>
                <span className="text-2xl font-extrabold text-red-600">
                  {productsOverview.outOfStockProducts}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-sm font-semibold text-gray-600">
                  {t("outOfStockRate")}
                </span>
                <span className="text-xl font-bold text-black">
                  {productsOverview.outOfStockRate.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews & Customers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Reviews Overview */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-black mb-6">
              {t("reviewsOverview")}
            </h2>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-gray-700">
                  {t("totalReviews")}
                </span>
                <span className="text-3xl font-extrabold text-purple-600">
                  {reviewsOverview.totalReviews}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <span className="text-lg font-bold text-gray-700">
                  {t("averageRating")}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-extrabold text-yellow-600">
                    {reviewsOverview.averageRating.toFixed(1)}
                  </span>
                  <svg
                    className="w-8 h-8 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-600 mb-3">
                {t("ratingDistribution")}
              </h3>
              <div className="space-y-2">
                {reviewsOverview.ratingDistribution.map((item) => (
                  <div key={item.rating} className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-black w-8">
                      {item.rating}★
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-yellow-500 h-3 rounded-full"
                        style={{
                          width: `${
                            (item.count / reviewsOverview.totalReviews) * 100
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-bold text-black w-12 text-right">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Customer Insights */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-black mb-6">
              {t("customerInsights")}
            </h2>
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg">
                <span className="text-sm font-bold text-gray-700 block mb-2">
                  {t("totalCustomers")}
                </span>
                <span className="text-5xl font-extrabold text-indigo-600">
                  {customerInsights.totalCustomers}
                </span>
              </div>
              <div className="p-6 bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg">
                <span className="text-sm font-bold text-gray-700 block mb-2">
                  {t("repeatCustomers")}
                </span>
                <span className="text-5xl font-extrabold text-teal-600">
                  {customerInsights.repeatCustomers}
                </span>
              </div>
              <div className="p-6 bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg">
                <span className="text-sm font-bold text-gray-700 block mb-2">
                  {t("repeatCustomerRate")}
                </span>
                <span className="text-5xl font-extrabold text-pink-600">
                  {customerInsights.repeatCustomerRate}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Order Trends */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-black mb-6">
            {t("dailyOrderTrends")}
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                    {t("date")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                    {t("orders")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                    {t("revenue")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {statistics.dailyOrderTrends.map((trend, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-black">
                      {new Date(trend.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-sm font-bold rounded-full bg-purple-100 text-purple-700">
                        {trend.orderCount}{" "}
                        {trend.orderCount === 1 ? "order" : "orders"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                      {formatCurrency(trend.revenue, "JOD")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-black mb-6">
            {t("topSellingProducts")}
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-purple-600 to-purple-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    {t("rank")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    {t("productName")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    {t("unitsSold")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    {t("revenue")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {statistics.topSellingProducts.map((product, index) => (
                  <tr key={product.productId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-lg font-extrabold text-purple-600">
                          #{index + 1}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-black">
                        {product.productName}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: {product.productId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-4 py-2 inline-flex text-sm font-bold rounded-lg bg-blue-100 text-blue-700">
                        {product.totalSold} units
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                      {formatCurrency(product.totalRevenue, "JOD")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
