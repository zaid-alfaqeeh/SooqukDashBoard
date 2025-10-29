import { useTranslations } from "next-intl";
import { GetStatisticsResponse } from "../types/order.types";
import { formatCurrency } from "../utils/orderUtils";

interface OrderStatisticsProps {
  statistics: GetStatisticsResponse;
}

export default function OrderStatistics({ statistics }: OrderStatisticsProps) {
  const t = useTranslations("orders");

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <p className="text-gray-600 font-semibold mb-2">
          {t("statistics.totalOrders")}
        </p>
        <p className="text-3xl font-bold text-black">
          {statistics.data.totalOrders}
        </p>
      </div>
      <div className="bg-blue-50 p-6 rounded-xl shadow-lg border border-blue-200">
        <p className="text-blue-700 font-semibold mb-2">
          {t("statistics.pendingOrders")}
        </p>
        <p className="text-3xl font-bold text-blue-900">
          {statistics.data.pendingOrders}
        </p>
      </div>
      <div className="bg-green-50 p-6 rounded-xl shadow-lg border border-green-200">
        <p className="text-green-700 font-semibold mb-2">
          {t("statistics.completedOrders")}
        </p>
        <p className="text-3xl font-bold text-green-900">
          {statistics.data.completedOrders}
        </p>
      </div>
      <div className="bg-purple-50 p-6 rounded-xl shadow-lg border border-purple-200">
        <p className="text-purple-700 font-semibold mb-2">
          {t("statistics.totalRevenue")}
        </p>
        <p className="text-2xl font-bold text-purple-900">
          {formatCurrency(statistics.data.totalRevenue)}
        </p>
      </div>
    </div>
  );
}
