"use client";

import { useTranslations } from "next-intl";
import { useAuthGuard } from "@/features/auth/utils/authGurd";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import VendorOrdersTable from "@/features/orders/orderComponent/VendorOrdersTable";
import { useAppSelector } from "@/features/hooks/redux";
import { selectUser } from "@/features/auth/authSlice/authSlice";

export default function VendorOrdersPage() {
  const t = useTranslations("vendorOrders");
  useAuthGuard(["Admin", "Vendor"]);

  const user = useAppSelector(selectUser);

  // Extract vendorId - for vendors it's their numeric ID
  // For demo purposes, using a hardcoded value. In production, this should come from user object
  // You may need to add vendorId to the user object or fetch it from an API
  const vendorId = 1; // TODO: Get this from user object or API

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

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="p-6">
            <VendorOrdersTable vendorId={vendorId} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
