"use client";

import { useTranslations } from "next-intl";
import { useAppSelector } from "@/features/hooks/redux";
import {
  selectUser,
  selectUserRole,
} from "@/features/auth/authSlice/authSlice";
import { useAuthGuard } from "@/features/auth/utils/authGurd";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";

export default function DashboardPage() {
  const t = useTranslations();
  useAuthGuard(["Admin", "vendor", "ShippingCompany"]);

  const user = useAppSelector(selectUser);
  const userRole = useAppSelector(selectUserRole);

  // Sample stats - customize based on role
  const stats = [
    {
      title: t("dashboard.totalUsers"),
      value: userRole === "Admin" ? "1,234" : "-",
      change: "+12%",
      icon: "users",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: t("dashboard.totalOrders"),
      value: "567",
      change: "+8%",
      icon: "shopping-bag",
      color: "from-green-500 to-green-600",
    },
    {
      title: t("dashboard.revenue"),
      value: "$12,345",
      change: "+23%",
      icon: "money",
      color: "from-pink-500 to-[#E6497F]",
    },
    {
      title: t("dashboard.pending"),
      value: "34",
      change: "-5%",
      icon: "clock",
      color: "from-yellow-500 to-yellow-600",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-pink-500 to-[#E6497F] rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">
            {t("common.welcome")}, {user?.firstName}!
          </h1>
          <p className="text-pink-100">
            {t("dashboard.welcomeMessage")} - {t(`common.${userRole}`)}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    stat.change.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {t("dashboard.recentOrders")}
              </h2>
              <button className="text-[#E6497F] hover:text-pink-700 font-semibold text-sm">
                {t("dashboard.viewAll")}
              </button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-[#E6497F] rounded-lg flex items-center justify-center text-white font-bold">
                      #{item}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Order #{1000 + item}
                      </p>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    Completed
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {t("dashboard.quickActions")}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-gradient-to-br from-pink-500 to-[#E6497F] text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105">
                <svg
                  className="w-8 h-8 mx-auto mb-2"
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
                <p className="font-semibold text-sm">
                  {userRole === "vendor"
                    ? t("dashboard.addProduct")
                    : t("dashboard.addNew")}
                </p>
              </button>
              <button className="p-4 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                <svg
                  className="w-8 h-8 mx-auto mb-2 text-gray-700"
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
                <p className="font-semibold text-sm text-gray-700">
                  {t("dashboard.viewReports")}
                </p>
              </button>
              <button className="p-4 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                <svg
                  className="w-8 h-8 mx-auto mb-2 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p className="font-semibold text-sm text-gray-700">
                  {t("menu.settings")}
                </p>
              </button>
              <button className="p-4 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                <svg
                  className="w-8 h-8 mx-auto mb-2 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <p className="font-semibold text-sm text-gray-700">
                  {t("dashboard.support")}
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
