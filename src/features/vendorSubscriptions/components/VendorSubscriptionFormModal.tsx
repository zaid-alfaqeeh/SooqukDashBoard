"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import type {
  VendorSubscription,
  CreateVendorSubscriptionRequest,
} from "../types/vendorSubscription.types";
import { useSubscriptionPlans } from "@/features/subscriptions/hooks/useSubscriptions";
import { useUsers } from "@/features/admin/users/usersHooks/useUsers";

interface VendorSubscriptionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateVendorSubscriptionRequest) => void;
  isLoading: boolean;
  subscription?: VendorSubscription | null;
}

export default function VendorSubscriptionFormModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  subscription,
}: VendorSubscriptionFormModalProps) {
  const t = useTranslations("vendorSubscriptions");
  const { data: subscriptionPlans, isLoading: isLoadingPlans } =
    useSubscriptionPlans();

  // Fetch all vendors for the dropdown
  const { data: vendorsResponse, isLoading: isLoadingVendors } = useUsers({
    role: "Vendor",
    pageNumber: 1,
    pageSize: 1000, // Fetch all vendors
  });

  const vendors = vendorsResponse?.items || [];

  const [formData, setFormData] = useState<CreateVendorSubscriptionRequest>({
    vendorId: 0,
    subscriptionPlanId: 0,
    planName: "",
    planNameAr: "",
    price: 0,
    startDate: "",
    endDate: "",
  });

  // Find selected subscription plan from the list instead of making a separate API call
  const selectedPlanData = subscriptionPlans?.find(
    (plan) => plan.id === formData.subscriptionPlanId
  );

  useEffect(() => {
    if (subscription) {
      setFormData({
        vendorId: subscription.vendorId,
        subscriptionPlanId: subscription.subscriptionPlanId,
        planName: subscription.planName || "",
        planNameAr: subscription.planNameAr || "",
        price: subscription.price,
        startDate: subscription.startDate
          ? subscription.startDate.split("T")[0]
          : "",
        endDate: subscription.endDate ? subscription.endDate.split("T")[0] : "",
      });
    } else {
      const today = new Date().toISOString().split("T")[0];
      setFormData({
        vendorId: 0,
        subscriptionPlanId: 0,
        planName: "",
        planNameAr: "",
        price: 0,
        startDate: today,
        endDate: "",
      });
    }
  }, [subscription]);

  const handlePlanChange = (planId: number) => {
    setFormData({
      ...formData,
      subscriptionPlanId: planId,
    });
  };

  // Auto-fill plan details when plan data is loaded
  useEffect(() => {
    if (selectedPlanData) {
      setFormData((prev) => ({
        ...prev,
        planName: selectedPlanData.name,
        planNameAr: selectedPlanData.namear,
        price: selectedPlanData.price,
      }));
    }
  }, [selectedPlanData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert dates to ISO format
    const submitData: CreateVendorSubscriptionRequest = {
      ...formData,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
    };

    onSubmit(submitData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-4 rounded-t-2xl">
          <h2 className="text-2xl font-bold">
            {subscription ? t("editSubscription") : t("addSubscription")}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Vendor ID */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {subscription ? t("vendor") : t("vendorId")}{" "}
              <span className="text-red-500">*</span>
            </label>
            {subscription ? (
              <input
                type="text"
                value={subscription.vendorName}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-black font-medium cursor-not-allowed"
                disabled
                readOnly
              />
            ) : (
              <select
                value={formData.vendorId || ""}
                onChange={(e) => {
                  const vendorId = parseInt(e.target.value, 10);
                  if (!isNaN(vendorId)) {
                    setFormData({ ...formData, vendorId });
                  }
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black font-medium"
                required
                disabled={isLoadingVendors}
              >
                <option value="">
                  {isLoadingVendors ? t("loading") : t("selectVendor")}
                </option>
                {vendors.map((vendor) => {
                  // Use VendorDetails.id if available (number), otherwise try to parse User.id
                  const vendorId = vendor.vendorDetails?.id
                    ? vendor.vendorDetails.id
                    : parseInt(vendor.id, 10);

                  // Only include vendor if we have a valid numeric ID
                  if (isNaN(vendorId)) return null;

                  return (
                    <option key={vendor.id} value={vendorId}>
                      {vendor.fullName}{" "}
                      {vendor.email ? `(${vendor.email})` : ""}
                    </option>
                  );
                })}
              </select>
            )}
          </div>
          {/* Subscription Plan */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t("subscriptionPlan")} <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.subscriptionPlanId || ""}
              onChange={(e) => handlePlanChange(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black font-medium"
              required
              disabled={isLoadingPlans}
            >
              <option value="">{t("selectPlan")}</option>
              {subscriptionPlans?.map((plan: any) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name} - JOD {plan.price}
                </option>
              ))}
            </select>
          </div>
          {/* Selected Plan Details (auto-filled) */}
          {selectedPlanData && (
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h3 className="text-sm font-bold text-purple-900 mb-2">
                {t("selectedPlanDetails")}
              </h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t("planName")}:</span>
                  <span className="font-semibold text-gray-900">
                    {selectedPlanData.name}
                  </span>
                </div>
                <div className="flex justify-between" dir="rtl">
                  <span className="text-gray-600">
                    {selectedPlanData.namear}
                  </span>
                </div>
                <div className="flex justify-between mt-2 pt-2 border-t border-purple-200">
                  <span className="text-gray-600">{t("price")}:</span>
                  <span className="font-bold text-purple-600">
                    JOD {selectedPlanData.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
          {/* Start Date */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t("startDate")} <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black font-medium"
              required
            />
          </div>
          {/* End Date */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t("endDate")} <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black font-medium"
              required
              min={formData.startDate}
            />
          </div>
          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg font-bold hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t("saving") : subscription ? t("update") : t("add")}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t("cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
