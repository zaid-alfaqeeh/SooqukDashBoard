"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuthGuard } from "@/features/auth/utils/authGurd";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import { ProductReviewsTable } from "@/features/reviews/components/ProductReviewsTable";
import { VendorReviewsTable } from "@/features/reviews/components/VendorReviewsTable";
import OrderReviewsTable from "@/features/reviews/components/OrderReviewsTable";

type TabType = "products" | "vendors" | "orders";

export default function ReviewsPage() {
  const t = useTranslations("reviews");
  useAuthGuard(["Admin"]);

  // State
  const [activeTab, setActiveTab] = useState<TabType>("products");

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-black mb-3">
            {t("title")}
          </h1>
          <p className="text-lg text-black font-medium">
            {t("manageDescription")}
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("products")}
                className={`flex items-center gap-2 px-6 py-4 font-bold border-b-2 transition-colors ${
                  activeTab === "products"
                    ? "border-[#E6497F] text-[#E6497F]"
                    : "border-transparent text-black hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <svg
                  className="w-5 h-5"
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
                {t("productReviews")}
              </button>
              <button
                onClick={() => setActiveTab("vendors")}
                className={`flex items-center gap-2 px-6 py-4 font-bold border-b-2 transition-colors ${
                  activeTab === "vendors"
                    ? "border-[#E6497F] text-[#E6497F]"
                    : "border-transparent text-black hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                {t("vendorReviews")}
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center gap-2 px-6 py-4 font-bold border-b-2 transition-colors ${
                  activeTab === "orders"
                    ? "border-[#E6497F] text-[#E6497F]"
                    : "border-transparent text-black hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <svg
                  className="w-5 h-5"
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
                {t("orderReviewsViewOnly")}
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "products" && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="p-6">
              <ProductReviewsTable />
            </div>
          </div>
        )}

        {activeTab === "vendors" && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="p-6">
              <VendorReviewsTable />
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="p-6">
              <OrderReviewsTable />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
