"use client";

import { useAuthGuard } from "@/features/auth/utils/authGurd";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import VendorSubscriptionsTable from "@/features/vendorSubscriptions/components/VendorSubscriptionsTable";

export default function VendorSubscriptionsPage() {
  useAuthGuard(["Admin"]);

  return (
    <DashboardLayout>
      <VendorSubscriptionsTable />
    </DashboardLayout>
  );
}
