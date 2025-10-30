"use client";

import { useTranslations } from "next-intl";
import { useAppSelector } from "@/features/hooks/redux";
import {
  selectUser,
  selectUserRole,
} from "@/features/auth/authSlice/authSlice";
import { useAuthGuard } from "@/features/auth/utils/authGurd";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import {
  useComprehensiveStatistics,
  useUserStatistics,
  useDashboardOverview,
} from "@/features/admin/statistics/hooks/useStatistics";

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  useAuthGuard(["Admin"]);

  const user = useAppSelector(selectUser);
  const userRole = useAppSelector(selectUserRole);

  const {
    data: comprehensiveStats,
    isLoading: isLoadingComprehensive,
    error: comprehensiveError,
  } = useComprehensiveStatistics();

  const {
    data: userStats,
    isLoading: isLoadingUser,
    error: userError,
  } = useUserStatistics();

  const { data: overview } = useDashboardOverview();

  const isLoading = isLoadingComprehensive || isLoadingUser;
  const hasError = comprehensiveError || userError;

  if (hasError) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-red-600 font-semibold text-lg">{t("error")}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">{t("loading")}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Main Stats Cards Data
  const mainStats = [
    {
      title: t("totalUsers"),
      value: comprehensiveStats?.userAnalytics.totalUsers || 0,
      change: `+${comprehensiveStats?.userAnalytics.newUsersThisMonth || 0}`,
      changeLabel: "this month",
      icon: "users",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: t("totalOrders"),
      value: comprehensiveStats?.orderAnalytics.totalOrders || 0,
      change: `${
        comprehensiveStats?.orderAnalytics.orderGrowthRate?.toFixed(1) || 0
      }%`,
      changeLabel: "growth",
      icon: "shopping-bag",
      color: "from-green-500 to-green-600",
    },
    {
      title: t("revenue"),
      value: `JOD ${
        comprehensiveStats?.orderAnalytics.totalRevenue?.toFixed(2) || "0.00"
      }`,
      change: `${
        comprehensiveStats?.orderAnalytics.revenueGrowthRate?.toFixed(1) || 0
      }%`,
      changeLabel: "growth",
      icon: "money",
      color: "from-pink-500 to-[#E6497F]",
    },
    {
      title: t("pending"),
      value: comprehensiveStats?.reviewAnalytics.pendingReviews || 0,
      change: `${
        comprehensiveStats?.reviewAnalytics.approvalRate?.toFixed(1) || 0
      }%`,
      changeLabel: "approval rate",
      icon: "clock",
      color: "from-yellow-500 to-yellow-600",
    },
  ];

  // Get month name
  const getMonthName = (month: number) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[month - 1] || "";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-pink-500 to-[#E6497F] rounded-2xl p-8 text-white shadow-lg">
          <h1 className="text-3xl font-bold mb-2">
            {t("welcomeMessage")}, {user?.firstName}!
          </h1>
          <p className="text-pink-100">
            Role: {userRole} • Generated:{" "}
            {new Date(
              comprehensiveStats?.generatedAt || ""
            ).toLocaleDateString()}
          </p>
        </div>

        {/* Urgent Items Section */}
        {overview && (
          <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold flex items-center">
                <svg
                  className="w-7 h-7 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                {t("urgentItems")}
              </h2>
              <p className="text-sm text-orange-100">
                {t("lastUpdated")}:{" "}
                {new Date(overview.lastUpdated).toLocaleTimeString()}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/80">
                      {t("outOfStockProducts")}
                    </p>
                    <p className="text-3xl font-bold mt-1">
                      {overview.urgentItems.outOfStockProducts}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6"
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
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/80">
                      {t("expiredSubscriptions")}
                    </p>
                    <p className="text-3xl font-bold mt-1">
                      {overview.urgentItems.expiredSubscriptions}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6"
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
                  </div>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/80">{t("lateOrders")}</p>
                    <p className="text-3xl font-bold mt-1">
                      {overview.urgentItems.lateOrders}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/80">
                      {t("pendingApprovals")}
                    </p>
                    <p className="text-3xl font-bold mt-1">
                      {overview.urgentItems.pendingApprovals}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6"
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
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/80">
                      {t("activeSubscriptionsCount")}
                    </p>
                    <p className="text-3xl font-bold mt-1">
                      {overview.urgentItems.activeSubscriptions}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mainStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all transform hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-md`}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {stat.icon === "users" && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    )}
                    {stat.icon === "shopping-bag" && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    )}
                    {stat.icon === "money" && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    )}
                    {stat.icon === "clock" && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    )}
                  </svg>
                </div>
                <span className="text-sm font-semibold text-green-600">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">
              {t("totalProducts")}
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {comprehensiveStats?.productAnalytics.totalProducts || 0}
            </p>
            <p className="text-sm text-green-600 mt-1">
              {comprehensiveStats?.productAnalytics.activeProducts || 0} active
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">
              {t("averageRating")}
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {comprehensiveStats?.reviewAnalytics.averageRating?.toFixed(1) ||
                "0.0"}{" "}
              ⭐
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {comprehensiveStats?.reviewAnalytics.totalReviews || 0} reviews
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">
              {t("averageOrderValue")}
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              JOD{" "}
              {comprehensiveStats?.orderAnalytics.averageOrderValue?.toFixed(
                2
              ) || "0.00"}
            </p>
            <p className="text-sm text-gray-500 mt-1">per order</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">
              {t("onTimeDeliveryRate")}
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {comprehensiveStats?.businessAnalytics.onTimeDeliveryRate || 0}%
            </p>
            <p className="text-sm text-green-600 mt-1">excellent</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Users by Role */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {t("usersByRole")}
            </h2>
            <div className="space-y-4">
              {[
                {
                  label: t("customers"),
                  value: userStats?.Customer || 0,
                  color: "bg-blue-500",
                },
                {
                  label: t("vendors"),
                  value: userStats?.Vendor || 0,
                  color: "bg-purple-500",
                },
                {
                  label: t("admins"),
                  value:
                    (userStats?.Admin || 0) + (userStats?.["Super Admin"] || 0),
                  color: "bg-pink-500",
                },
                {
                  label: t("shippingCompanies"),
                  value: userStats?.ShippingCompany || 0,
                  color: "bg-green-500",
                },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {item.label}
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {item.value}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full transition-all`}
                      style={{
                        width: `${(
                          (item.value / (userStats?.Total || 1)) *
                          100
                        ).toFixed(0)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Users by Status */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {t("usersByStatus")}
            </h2>
            <div className="space-y-4">
              {[
                {
                  label: t("active"),
                  value: userStats?.Active || 0,
                  color: "bg-green-500",
                },
                {
                  label: t("inactive"),
                  value: userStats?.Inactive || 0,
                  color: "bg-gray-400",
                },
                {
                  label: t("suspended"),
                  value: userStats?.Suspended || 0,
                  color: "bg-yellow-500",
                },
                {
                  label: t("banned"),
                  value: userStats?.Banned || 0,
                  color: "bg-red-500",
                },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {item.label}
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {item.value}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full transition-all`}
                      style={{
                        width: `${(
                          (item.value / (userStats?.Total || 1)) *
                          100
                        ).toFixed(0)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Status Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {t("orderStatusDistribution")}
            </h2>
            <div className="space-y-4">
              {comprehensiveStats?.orderAnalytics.orderStatusDistribution.map(
                (item, index) => {
                  const statusLabels: { [key: number]: string } = {
                    4: t("shipped"),
                    5: t("delivered"),
                    6: t("cancelled"),
                  };
                  const statusColors: { [key: number]: string } = {
                    4: "bg-blue-500",
                    5: "bg-green-500",
                    6: "bg-red-500",
                  };
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">
                          {statusLabels[item.status] || `Status ${item.status}`}
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          {item.count} ({item.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`${
                            statusColors[item.status] || "bg-gray-500"
                          } h-2 rounded-full transition-all`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          {/* Monthly Trends Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {t("monthlyTrends")}
            </h2>
            <div className="space-y-3">
              {comprehensiveStats?.monthlyTrends
                .slice(-6)
                .map((trend, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-700">
                        {getMonthName(trend.month)} {trend.year}
                      </p>
                      <p className="text-xs text-gray-500">
                        {trend.orderCount} orders • {trend.newCustomers} new
                        customers
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-purple-600">
                        JOD {trend.revenue.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Top Vendors */}
        {comprehensiveStats?.topVendors &&
          comprehensiveStats.topVendors.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {t("topVendors")}
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        {t("vendorName")}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        {t("orderCount")}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        {t("revenue")}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        {t("rating")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {comprehensiveStats.topVendors.map((vendor, index) => (
                      <tr
                        key={vendor.vendorId}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                              {index + 1}
                            </div>
                            <span className="text-sm font-semibold text-gray-900">
                              {vendor.vendorName}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {vendor.orderCount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                          JOD {vendor.totalRevenue.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {vendor.averageRating.toFixed(1)} ⭐
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
      </div>
    </DashboardLayout>
  );
}
