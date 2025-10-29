import { useTranslations } from "next-intl";
import type { GetStatisticsResponse } from "../types/support.types";

interface TicketStatisticsProps {
  statistics: GetStatisticsResponse | undefined;
}

export default function TicketStatistics({
  statistics,
}: TicketStatisticsProps) {
  const t = useTranslations("support");

  if (!statistics) return null;

  const stats = statistics.data.periodStats;

  const cards = [
    {
      label: t("statistics.totalTickets"),
      value: stats.totalTickets,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      icon: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4",
    },
    {
      label: t("statistics.newTickets"),
      value: stats.newTickets,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      icon: "M12 6v6m0 0v6m0-6h6m-6 0H6",
    },
    {
      label: t("statistics.inProgress"),
      value: stats.inProgressTickets,
      color: "bg-gradient-to-br from-yellow-500 to-yellow-600",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
    },
    {
      label: t("statistics.awaitingCustomer"),
      value: stats.awaitingCustomer,
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      label: t("statistics.resolved"),
      value: stats.resolvedTickets,
      color: "bg-gradient-to-br from-green-500 to-green-600",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      label: t("statistics.closed"),
      value: stats.closedTickets,
      color: "bg-gradient-to-br from-gray-500 to-gray-600",
      icon: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
  ];

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${card.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow`}
          >
            <div className="flex items-center justify-between mb-2">
              <svg
                className="w-8 h-8 opacity-80"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={card.icon}
                />
              </svg>
            </div>
            <p className="text-3xl font-bold mb-1">{card.value}</p>
            <p className="text-sm opacity-90 font-medium">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
          <h3 className="text-lg font-bold text-black mb-2">
            {t("statistics.ticketsWithImages")}
          </h3>
          <p className="text-3xl font-bold text-[#E6497F]">
            {stats.ticketsWithImages}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
          <h3 className="text-lg font-bold text-black mb-2">
            {t("statistics.averageResponseTime")}
          </h3>
          <p className="text-3xl font-bold text-[#E6497F]">
            {stats.averageResponseTime}
          </p>
        </div>
      </div>
    </div>
  );
}
