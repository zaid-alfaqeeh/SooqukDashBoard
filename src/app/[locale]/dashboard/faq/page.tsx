"use client";

import { useAuthGuard } from "@/features/auth/utils/authGurd";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import FAQTable from "@/features/faq/components/FAQTable";

export default function FAQPage() {
  useAuthGuard(["Admin"]);

  return (
    <DashboardLayout>
      <FAQTable />
    </DashboardLayout>
  );
}
