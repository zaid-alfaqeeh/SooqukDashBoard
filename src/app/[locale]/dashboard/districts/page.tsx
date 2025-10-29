"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { useAuthGuard, useHasRole } from "@/features/auth/utils/authGurd";
import { useToast } from "@/components/Toast/Toast";
import { getErrorMessage } from "@/utils/api-error";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import { useCities } from "@/features/locations/hooks/useCities";
import {
  useDistrictsByCityId,
  useCreateDistrict,
  useUpdateDistrict,
  useDeleteDistrict,
} from "@/features/locations/hooks/useDistricts";
import type {
  CreateDistrictRequest,
  District,
} from "@/features/locations/types/location.types";

// Import sub-components
import DistrictCreateForm from "./components/DistrictCreateForm";
import DistrictTable from "./components/DistrictTable";
import DistrictEditModal from "./components/DistrictEditModal";
import DistrictDeleteModal from "./components/DistrictDeleteModal";

export default function DistrictsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const toast = useToast();

  useAuthGuard(["Admin", "vendor", "ShippingCompany"]);
  const isAdmin = useHasRole("Admin");

  // State
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingDistrict, setEditingDistrict] = useState<District | null>(null);
  const [deletingDistrict, setDeletingDistrict] = useState<District | null>(
    null
  );

  // Queries
  const { data: cities } = useCities();
  const {
    data: districts,
    isLoading,
    error,
  } = useDistrictsByCityId(selectedCityId);
  const createMutation = useCreateDistrict();
  const updateMutation = useUpdateDistrict();
  const deleteMutation = useDeleteDistrict();

  // Form data
  const [formData, setFormData] = useState<CreateDistrictRequest>({
    cityId: 0,
    name: "",
    nameAr: "",
    postalCode: "",
    deliveryFee: 0,
    isActive: true,
    sortOrder: 0,
  });

  // Handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMutation.mutateAsync(formData);
      setShowCreateForm(false);
      setFormData({
        cityId: 0,
        name: "",
        nameAr: "",
        postalCode: "",
        deliveryFee: 0,
        isActive: true,
        sortOrder: 0,
      });
      toast.success(
        t("locations.districtCreatedSuccess") || "District created successfully"
      );
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDistrict) return;

    try {
      await updateMutation.mutateAsync({
        id: editingDistrict.id,
        cityId: editingDistrict.cityId,
        name: editingDistrict.name,
        nameAr: editingDistrict.nameAr,
        postalCode: editingDistrict.postalCode || "",
        deliveryFee: editingDistrict.deliveryFee || 0,
        isActive: editingDistrict.isActive,
        sortOrder: editingDistrict.sortOrder || 0,
      });
      setEditingDistrict(null);
      toast.success(
        t("locations.districtUpdatedSuccess") || "District updated successfully"
      );
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
    }
  };

  const handleDelete = async () => {
    if (!deletingDistrict) return;
    try {
      await deleteMutation.mutateAsync(deletingDistrict.id);
      setDeletingDistrict(null);
      toast.success(
        t("locations.districtDeletedSuccess") || "District deleted successfully"
      );
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
    }
  };

  const handleFormChange = (data: Partial<CreateDistrictRequest>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleEditChange = (data: Partial<District>) => {
    if (editingDistrict) {
      setEditingDistrict({ ...editingDistrict, ...data });
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-extrabold text-black mb-3">
                {t("locations.districts")}
              </h1>
              <p className="text-lg text-black font-medium">
                {t("locations.districtsDescription")}
              </p>
            </div>
            {isAdmin && (
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="flex items-center gap-2 bg-[#E6497F] hover:bg-[#d63d6f] text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {showCreateForm ? (
                  <>
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    {t("common.cancel")}
                  </>
                ) : (
                  <>
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    {t("locations.createDistrict")}
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Create Form */}
        {isAdmin && showCreateForm && (
          <DistrictCreateForm
            formData={formData}
            cities={cities}
            isSubmitting={createMutation.isPending}
            onSubmit={handleSubmit}
            onChange={handleFormChange}
            onCancel={() => setShowCreateForm(false)}
          />
        )}

        {/* City Filter */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-200">
          <label className="block text-sm font-bold text-black mb-3">
            {t("locations.filterByCity")}
          </label>
          <select
            value={selectedCityId || ""}
            onChange={(e) =>
              setSelectedCityId(e.target.value ? Number(e.target.value) : null)
            }
            className="w-full md:w-96 px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-[#E6497F] focus:ring-2 focus:ring-[#E6497F] focus:ring-opacity-50 outline-none transition-all"
          >
            <option value="">{t("locations.allCities")}</option>
            {cities?.map((city) => (
              <option key={city.id} value={city.id}>
                {locale === "ar" ? city.nameAr : city.name}
              </option>
            ))}
          </select>
        </div>

        {/* Districts Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <DistrictTable
            districts={districts}
            isLoading={isLoading}
            error={error}
            isAdmin={isAdmin}
            selectedCityId={selectedCityId}
            onEdit={setEditingDistrict}
            onDelete={setDeletingDistrict}
          />
        </div>

        {/* Edit Modal */}
        {isAdmin && editingDistrict && (
          <DistrictEditModal
            district={editingDistrict}
            cities={cities}
            isSubmitting={updateMutation.isPending}
            onSubmit={handleUpdate}
            onChange={handleEditChange}
            onClose={() => setEditingDistrict(null)}
          />
        )}

        {/* Delete Modal */}
        {isAdmin && deletingDistrict && (
          <DistrictDeleteModal
            district={deletingDistrict}
            isDeleting={deleteMutation.isPending}
            onConfirm={handleDelete}
            onCancel={() => setDeletingDistrict(null)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
