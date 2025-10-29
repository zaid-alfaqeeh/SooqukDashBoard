import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { FormInput, FormTextarea } from "@/components/FormFields";
import type {
  SubscriptionPlan,
  UpdateSubscriptionPlanRequest,
} from "../types/subscription.types";

type SubscriptionPlanFormData = Omit<
  UpdateSubscriptionPlanRequest,
  "id" | "nameAr" | "descriptionAr"
> & {
  nameAr: string;
  descriptionAr: string;
};

interface EditSubscriptionModalProps {
  plan: SubscriptionPlan;
  onSubmit: (data: UpdateSubscriptionPlanRequest) => void;
  onClose: () => void;
  isLoading: boolean;
}

export default function EditSubscriptionModal({
  plan,
  onSubmit,
  onClose,
  isLoading,
}: EditSubscriptionModalProps) {
  const t = useTranslations("subscriptions");
  const tCommon = useTranslations("common");
  const firstInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<SubscriptionPlanFormData>({
    defaultValues: {
      name: plan.name,
      nameAr: plan.namear,
      price: plan.price,
      durationInMonths: plan.durationInMonths,
      description: plan.description,
      descriptionAr: plan.descriptionAr,
    },
  });

  // Reset form when plan changes
  useEffect(() => {
    reset({
      name: plan.name,
      nameAr: plan.namear,
      price: plan.price,
      durationInMonths: plan.durationInMonths,
      description: plan.description,
      descriptionAr: plan.descriptionAr,
    });
  }, [plan, reset]);

  // Focus first input on mount
  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleClose = () => {
    if (isDirty) {
      const confirmed = window.confirm(
        "You have unsaved changes. Are you sure you want to close?"
      );
      if (!confirmed) return;
    }
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const onFormSubmit = (data: SubscriptionPlanFormData) => {
    onSubmit({
      id: plan.id,
      ...data,
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-subscription-title"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h3
          id="edit-subscription-title"
          className="text-2xl font-bold text-black mb-6"
        >
          {t("editPlan")} - {plan.name}
        </h3>

        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="space-y-6"
          noValidate
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              registration={register("name")}
              ref={firstInputRef}
              id="name"
              type="text"
              label={t("name")}
              isRequired
              disabled={isLoading}
            />

            <FormInput
              registration={register("nameAr")}
              id="nameAr"
              type="text"
              label={t("nameAr")}
              isRequired
              dir="rtl"
              disabled={isLoading}
            />

            <FormInput
              registration={register("price", { valueAsNumber: true })}
              id="price"
              type="number"
              step="0.01"
              min="0"
              label={t("price")}
              isRequired
              disabled={isLoading}
              placeholder="0.00"
            />

            <FormInput
              registration={register("durationInMonths", {
                valueAsNumber: true,
              })}
              id="durationInMonths"
              type="number"
              min="1"
              max="120"
              label={t("duration")}
              isRequired
              disabled={isLoading}
              placeholder="1"
            />
          </div>

          <FormTextarea
            registration={register("description")}
            id="description"
            label={t("description")}
            rows={4}
            isRequired
            disabled={isLoading}
          />

          <FormTextarea
            registration={register("descriptionAr")}
            id="descriptionAr"
            label={t("descriptionAr")}
            rows={4}
            isRequired
            dir="rtl"
            disabled={isLoading}
          />

          {/* Buttons */}
          <div className="flex gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {tCommon("cancel")}
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-[#E6497F] hover:bg-[#d63d6f] text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t("updating") : t("update")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
