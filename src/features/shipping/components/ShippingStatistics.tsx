"use client";

import { useTranslations } from "next-intl";
import type { ShippingStatistics as ShippingStatsType } from "../types/shipping.types";

interface ShippingStatisticsProps {
  statistics: ShippingStatsType;
}

export default function ShippingStatistics({
  statistics,
}: ShippingStatisticsProps) {
  const t = useTranslations("shipping");

  const stats = [
    {
      title: t("totalOrders"),
      value: statistics.totalOrders,
      icon: "package",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: t("pendingOrders"),
      value: statistics.pendingOrders,
      icon: "clock",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      title: t("shippedOrders"),
      value: statistics.shippedOrders,
      icon: "truck",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: t("deliveredOrders"),
      value: statistics.deliveredOrders,
      icon: "check",
      color: "from-green-500 to-green-600",
    },
    {
      title: t("cancelledOrders"),
      value: statistics.cancelledOrders,
      icon: "x",
      color: "from-red-500 to-red-600",
    },
    {
      title: t("lateOrders"),
      value: statistics.lateOrders,
      icon: "alert",
      color: "from-orange-500 to-orange-600",
    },
    {
      title: t("totalRevenue"),
      value: `${statistics.totalRevenue.toFixed(2)} JOD`,
      icon: "money",
      color: "from-pink-500 to-[#E6497F]",
    },
  ];

  const getIconPath = (iconName: string): string => {
    const icons: Record<string, string> = {
      package:
        "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
      clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      truck:
        "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0",
      check: "M5 13l4 4L19 7",
      x: "M6 18L18 6M6 6l12 12",
      alert:
        "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
      money:
        "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    };
    return icons[iconName] || icons.package;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-200"
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
                  d={getIconPath(stat.icon)}
                />
              </svg>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">
            {stat.title}
          </h3>
          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
