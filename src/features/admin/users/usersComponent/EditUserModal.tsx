import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useCities } from "@/features/locations/hooks/useCities";
import { useDistrictsByCityId } from "@/features/locations/hooks/useDistricts";
import {
  FormInput,
  FormSelect,
  FormTextarea,
  FormCheckbox,
} from "@/components/FormFields";
import type { User, UpdateUserRequest } from "../types/users.types";
import {
  getValidationSchema,
  type EditUserFormData,
} from "../validation/editUserValidation";

interface EditUserModalProps {
  user: User;
  onSubmit: (data: UpdateUserRequest) => void;
  onClose: () => void;
  isLoading: boolean;
}

export default function EditUserModal({
  user,
  onSubmit,
  onClose,
  isLoading,
}: EditUserModalProps) {
  const t = useTranslations("users");
  const tCommon = useTranslations("common");
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Get validation schema based on user role
  const validationSchema = getValidationSchema(user.role);

  // Initialize form with React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm<EditUserFormData>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      isActive: user.isActive,
      status: user.status,
      cityId: user.cityId || 0,
      districtId: user.districtId || undefined,
      address: user.address || undefined,
      // Admin fields
      department: user.adminDetails?.department || undefined,
      jobTitle: user.adminDetails?.jobTitle || undefined,
      // Vendor fields
      shopName: user.vendorDetails?.shopName || undefined,
      shopNameAr: user.vendorDetails?.shopNameAr || undefined,
      logo: user.vendorDetails?.logo || undefined,
      description: user.vendorDetails?.description || undefined,
      returnPolicy: user.vendorDetails?.returnPolicy || undefined,
      vendorShippingPolicy: user.vendorDetails?.shippingPolicy || undefined,
      vendorShippingPolicyAr: user.vendorDetails?.shippingPolicyAr || undefined,
      vendorDistrictId: user.vendorDetails?.districtId || 0,
      vendorContactEmail: user.vendorDetails?.contactEmail || undefined,
      vendorContactPhone: user.vendorDetails?.contactPhone || undefined,
      vendorAddress: user.vendorDetails?.address || undefined,
      vendorStatus: user.vendorDetails?.status || 0,
      // Shipping Company fields
      companyName: user.shippingCompanyDetails?.name || undefined,
      companyDescription: user.shippingCompanyDetails?.description || undefined,
      companyContactEmail:
        user.shippingCompanyDetails?.contactEmail || undefined,
      companyPhoneNumber: user.shippingCompanyDetails?.phoneNumber || undefined,
    },
  });

  // Watch cityId to reset districtId when city changes
  const cityId = watch("cityId");

  // Fetch data
  const { data: cities, isLoading: citiesLoading } = useCities();
  const { data: districts, isLoading: districtsLoading } = useDistrictsByCityId(
    cityId || null
  );

  // Reset form when user prop changes
  useEffect(() => {
    reset({
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      isActive: user.isActive,
      status: user.status,
      cityId: user.cityId || 0,
      districtId: user.districtId || undefined,
      address: user.address || undefined,
      department: user.adminDetails?.department || undefined,
      jobTitle: user.adminDetails?.jobTitle || undefined,
      shopName: user.vendorDetails?.shopName || undefined,
      shopNameAr: user.vendorDetails?.shopNameAr || undefined,
      logo: user.vendorDetails?.logo || undefined,
      description: user.vendorDetails?.description || undefined,
      returnPolicy: user.vendorDetails?.returnPolicy || undefined,
      vendorShippingPolicy: user.vendorDetails?.shippingPolicy || undefined,
      vendorShippingPolicyAr: user.vendorDetails?.shippingPolicyAr || undefined,
      vendorDistrictId: user.vendorDetails?.districtId || 0,
      vendorContactEmail: user.vendorDetails?.contactEmail || undefined,
      vendorContactPhone: user.vendorDetails?.contactPhone || undefined,
      vendorAddress: user.vendorDetails?.address || undefined,
      vendorStatus: user.vendorDetails?.status || 0,
      companyName: user.shippingCompanyDetails?.name || undefined,
      companyDescription: user.shippingCompanyDetails?.description || undefined,
      companyContactEmail:
        user.shippingCompanyDetails?.contactEmail || undefined,
      companyPhoneNumber: user.shippingCompanyDetails?.phoneNumber || undefined,
    });
  }, [user.id, reset, user]);

  // Reset districtId when cityId changes
  useEffect(() => {
    setValue("districtId", undefined);
    if (user.role === "Vendor") {
      setValue("vendorDistrictId", 0);
    }
  }, [cityId, setValue, user.role]);

  // Focus management
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

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Handle close with dirty check
  const handleClose = () => {
    if (isDirty) {
      const confirmed = window.confirm(
        "You have unsaved changes. Are you sure you want to close?"
      );
      if (!confirmed) return;
    }
    onClose();
  };

  // Form submit handler
  const onFormSubmit = (data: EditUserFormData) => {
    const baseData: UpdateUserRequest = {
      id: user.id,
      currentRole: user.role,
      email: data.email,
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      isActive: data.isActive,
      status: data.status,
      address: data.address || null,
      cityId: data.cityId,
      districtId: data.districtId || null,
    };

    // Add role-specific fields
    if (user.role === "Admin" || user.role === "Super Admin") {
      onSubmit({
        ...baseData,
        department: data.department || "",
        jobTitle: data.jobTitle || "",
      });
    } else if (user.role === "Vendor") {
      onSubmit({
        ...baseData,
        vendorId: user.vendorDetails?.id,
        shopName: data.shopName || "",
        shopNameAr: data.shopNameAr || "",
        logo: data.logo || "",
        description: data.description || "",
        returnPolicy: data.returnPolicy || "",
        shippingPolicy: data.vendorShippingPolicy || "",
        shippingPolicyAr: data.vendorShippingPolicyAr || "",
        vendorCityId: data.cityId,
        vendorDistrictId: data.vendorDistrictId || 0,
        vendorContactEmail: data.vendorContactEmail || "",
        vendorContactPhone: data.vendorContactPhone || "",
        vendorAddress: data.vendorAddress || "",
        vendorStatus: data.vendorStatus || 0,
      });
    } else if (user.role === "ShippingCompany") {
      onSubmit({
        ...baseData,
        shippingCompanyId: user.shippingCompanyDetails?.id,
        companyName: data.companyName || "",
        companyDescription: data.companyDescription || "",
        companyContactEmail: data.companyContactEmail || "",
        companyPhoneNumber: data.companyPhoneNumber || "",
      });
    } else {
      onSubmit(baseData);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-user-title"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 my-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="edit-user-title" className="text-2xl font-bold text-black mb-6">
          {t("editUser")} - {user.fullName}
        </h3>

        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="space-y-6"
          noValidate
        >
          {/* Role Display (Not Editable) */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              {t("role")}:{" "}
              <span className="font-bold text-black">
                {t(`roles.${user.role}`)}
              </span>
            </p>
          </div>

          {/* Common Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              {...register("fullName")}
              ref={firstInputRef}
              id="fullName"
              label={t("fullName")}
              error={errors.fullName?.message}
              isRequired
              disabled={isLoading}
            />

            <FormInput
              {...register("email")}
              id="email"
              type="email"
              label={t("email")}
              error={errors.email?.message}
              isRequired
              disabled={isLoading}
            />

            <FormInput
              {...register("phoneNumber")}
              id="phoneNumber"
              type="tel"
              label={t("phone")}
              error={errors.phoneNumber?.message}
              isRequired
              disabled={isLoading}
            />

            <FormSelect
              {...register("cityId", { valueAsNumber: true })}
              id="cityId"
              label={t("city")}
              error={errors.cityId?.message}
              isRequired
              isLoading={citiesLoading}
              placeholder={`--${t("selectCity")}--`}
              options={
                cities?.map((city) => ({
                  value: city.id,
                  label: city.name,
                })) || []
              }
              disabled={isLoading}
            />

            {user.role !== "ShippingCompany" && (
              <FormSelect
                {...register("districtId", { valueAsNumber: true })}
                id="districtId"
                label={t("district")}
                error={errors.districtId?.message}
                isRequired={user.role !== "Customer"}
                isLoading={districtsLoading}
                placeholder={`--${t("selectDistrict")}--`}
                options={
                  districts?.map((district) => ({
                    value: district.id,
                    label: district.name,
                  })) || []
                }
                disabled={!cityId || isLoading}
              />
            )}
          </div>

          {user.role !== "ShippingCompany" && (
            <FormInput
              {...register("address")}
              id="address"
              label={t("address")}
              error={errors.address?.message}
              isRequired={user.role !== "Customer"}
              disabled={isLoading}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormCheckbox
              {...register("isActive")}
              id="isActive"
              label={t("isActive")}
              error={errors.isActive?.message}
              disabled={isLoading}
            />

            <FormSelect
              {...register("status", { valueAsNumber: true })}
              id="status"
              label={t("status")}
              error={errors.status?.message}
              options={[
                { value: 0, label: t("statuses.inactive") },
                { value: 1, label: t("statuses.active") },
                { value: 2, label: t("statuses.suspended") },
                { value: 3, label: t("statuses.pending") },
              ]}
              disabled={isLoading}
            />
          </div>

          {/* Admin-specific fields */}
          {(user.role === "Admin" || user.role === "Super Admin") && (
            <div className="border-t pt-6">
              <h4 className="text-lg font-bold text-black mb-4">
                {t("adminDetails")}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  {...register("department")}
                  id="department"
                  label={t("department")}
                  error={errors.department?.message}
                  isRequired
                  disabled={isLoading}
                />

                <FormInput
                  {...register("jobTitle")}
                  id="jobTitle"
                  label={t("jobTitle")}
                  error={errors.jobTitle?.message}
                  isRequired
                  disabled={isLoading}
                />
              </div>
            </div>
          )}

          {/* Vendor-specific fields */}
          {user.role === "Vendor" && (
            <div className="border-t pt-6 space-y-4">
              <h4 className="text-lg font-bold text-black mb-4">
                {t("vendorDetails")}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  {...register("shopName")}
                  id="shopName"
                  label={t("shopName")}
                  error={errors.shopName?.message}
                  isRequired
                  disabled={isLoading}
                />

                <FormInput
                  {...register("shopNameAr")}
                  id="shopNameAr"
                  label={t("shopNameAr")}
                  error={errors.shopNameAr?.message}
                  isRequired
                  dir="rtl"
                  disabled={isLoading}
                />

                <FormInput
                  {...register("vendorContactEmail")}
                  id="vendorContactEmail"
                  type="email"
                  label={t("vendorEmail")}
                  error={errors.vendorContactEmail?.message}
                  isRequired
                  disabled={isLoading}
                />

                <FormInput
                  {...register("vendorContactPhone")}
                  id="vendorContactPhone"
                  type="tel"
                  label={t("vendorPhone")}
                  error={errors.vendorContactPhone?.message}
                  isRequired
                  disabled={isLoading}
                />

                <FormSelect
                  {...register("vendorDistrictId", { valueAsNumber: true })}
                  id="vendorDistrictId"
                  label={t("vendorDistrict")}
                  error={errors.vendorDistrictId?.message}
                  isRequired
                  isLoading={districtsLoading}
                  placeholder={`--${t("selectDistrict")}--`}
                  options={
                    districts?.map((district) => ({
                      value: district.id,
                      label: district.name,
                    })) || []
                  }
                  disabled={!cityId || isLoading}
                />

                <FormSelect
                  {...register("vendorStatus", { valueAsNumber: true })}
                  id="vendorStatus"
                  label={t("vendorStatus")}
                  error={errors.vendorStatus?.message}
                  options={[
                    { value: 0, label: t("statuses.inactive") },
                    { value: 1, label: t("statuses.active") },
                    { value: 2, label: t("statuses.suspended") },
                    { value: 3, label: t("statuses.pending") },
                  ]}
                  disabled={isLoading}
                />

                <FormInput
                  {...register("logo")}
                  id="logo"
                  type="url"
                  label={t("logo")}
                  error={errors.logo?.message}
                  disabled={isLoading}
                  placeholder="https://example.com/logo.png"
                />
              </div>

              <FormInput
                {...register("vendorAddress")}
                id="vendorAddress"
                label={t("vendorAddress")}
                error={errors.vendorAddress?.message}
                isRequired
                disabled={isLoading}
              />

              <FormTextarea
                {...register("description")}
                id="description"
                label={t("description")}
                error={errors.description?.message}
                rows={3}
                disabled={isLoading}
              />

              <FormTextarea
                {...register("returnPolicy")}
                id="returnPolicy"
                label={t("returnPolicy")}
                error={errors.returnPolicy?.message}
                rows={3}
                disabled={isLoading}
              />

              <FormTextarea
                {...register("vendorShippingPolicy")}
                id="vendorShippingPolicy"
                label={t("shippingPolicy")}
                error={errors.vendorShippingPolicy?.message}
                rows={3}
                disabled={isLoading}
              />

              <FormTextarea
                {...register("vendorShippingPolicyAr")}
                id="vendorShippingPolicyAr"
                label={t("shippingPolicyAr")}
                error={errors.vendorShippingPolicyAr?.message}
                rows={3}
                dir="rtl"
                disabled={isLoading}
              />
            </div>
          )}

          {/* Shipping Company-specific fields */}
          {user.role === "ShippingCompany" && (
            <div className="border-t pt-6">
              <h4 className="text-lg font-bold text-black mb-4">
                {t("shippingCompanyDetails")}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  {...register("companyName")}
                  id="companyName"
                  label={t("companyName")}
                  error={errors.companyName?.message}
                  isRequired
                  disabled={isLoading}
                />

                <FormInput
                  {...register("companyPhoneNumber")}
                  id="companyPhoneNumber"
                  type="tel"
                  label={t("companyPhone")}
                  error={errors.companyPhoneNumber?.message}
                  isRequired
                  disabled={isLoading}
                />

                <FormInput
                  {...register("companyContactEmail")}
                  id="companyContactEmail"
                  type="email"
                  label={t("companyEmail")}
                  error={errors.companyContactEmail?.message}
                  isRequired
                  disabled={isLoading}
                />
              </div>

              <div className="mt-4">
                <FormTextarea
                  {...register("companyDescription")}
                  id="companyDescription"
                  label={t("companyDescription")}
                  error={errors.companyDescription?.message}
                  rows={3}
                  disabled={isLoading}
                />
              </div>
            </div>
          )}

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
              {isLoading ? t("updating") : t("updateUser")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
