"use client";

import { useTranslations, useLocale } from "next-intl";
import type { CurrentSubscription } from "../types/mySubscription.types";

interface CurrentSubscriptionCardProps {
  subscription: CurrentSubscription;
  isLoading: boolean;
}

export default function CurrentSubscriptionCard({
  subscription,
  isLoading,
}: CurrentSubscriptionCardProps) {
  const t = useTranslations();
  const locale = useLocale();

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  const planName =
    locale === "ar" ? subscription.planNameAr : subscription.planName;
  const shopName =
    locale === "ar" ? subscription.shopNameAr : subscription.shopName;
  const planDescription =
    locale === "ar"
      ? subscription.planDescriptionAr
      : subscription.planDescription;

  const isExpired = subscription.daysRemaining <= 0 && !subscription.isActive;
  const isExpiringSoon = subscription.isExpiringSoon;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-black mb-2">
            {t("mySubscription.currentSubscription")}
          </h2>
          <p className="text-black font-medium">{shopName}</p>
        </div>
        {subscription.logo && (
          <img
            src={subscription.logo}
            alt={shopName}
            className="w-16 h-16 rounded-full object-cover border-2 border-purple-200"
          />
        )}
      </div>

      <div className="space-y-6">
        {/* Plan Info */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-purple-600 mb-4">{planName}</h3>
          <p className="text-black font-medium mb-4">{planDescription}</p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-bold text-gray-600 mb-1">
                {t("mySubscription.price")}
              </p>
              <p className="text-lg font-bold text-black">
                {subscription.price.toFixed(2)} JOD
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-600 mb-1">
                {t("mySubscription.duration")}
              </p>
              <p className="text-lg font-bold text-black">
                {subscription.durationInMonths}{" "}
                {subscription.durationInMonths === 1
                  ? t("mySubscription.month")
                  : t("mySubscription.months")}
              </p>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="text-sm font-bold text-gray-600 mb-1">
              {t("mySubscription.startDate")}
            </p>
            <p className="font-semibold text-black">
              {new Date(subscription.startDate).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="text-sm font-bold text-gray-600 mb-1">
              {t("mySubscription.endDate")}
            </p>
            <p className="font-semibold text-black">
              {new Date(subscription.endDate).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <span
              className={`px-4 py-2 rounded-full text-sm font-bold ${
                subscription.isActive && !isExpired
                  ? "bg-green-100 text-green-700"
                  : isExpired
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {subscription.isActive && !isExpired
                ? t("mySubscription.active")
                : isExpired
                ? t("mySubscription.expired")
                : t("mySubscription.inactive")}
            </span>
            {isExpiringSoon && !isExpired && (
              <span className="px-4 py-2 rounded-full text-sm font-bold bg-orange-100 text-orange-700">
                {t("mySubscription.expiringSoon")}
              </span>
            )}
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-gray-600 mb-1">
              {t("mySubscription.daysRemaining")}
            </p>
            <p
              className={`text-2xl font-extrabold ${
                subscription.daysRemaining <= 7
                  ? "text-red-600"
                  : subscription.daysRemaining <= 30
                  ? "text-orange-600"
                  : "text-green-600"
              }`}
            >
              {subscription.daysRemaining}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
