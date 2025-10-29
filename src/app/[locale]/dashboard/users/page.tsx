"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuthGuard } from "@/features/auth/utils/authGurd";
import { useToast } from "@/components/Toast/Toast";
import { getErrorMessage } from "@/utils/api-error";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import {
  useUsers,
  useUser,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from "@/features/admin/users/usersHooks/useUsers";
import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UserStatus,
} from "@/features/admin/users/types/users.types";
import { useCities } from "@/features/locations/hooks/useCities";
import UsersTable from "@/features/admin/users/usersComponent/UsersTable";
import CreateUserModal from "@/features/admin/users/usersComponent/CreateUserModal";
import ViewUserModal from "@/features/admin/users/usersComponent/ViewUserModal";
import EditUserModal from "@/features/admin/users/usersComponent/EditUserModal";
import DeleteUserModal from "@/features/admin/users/usersComponent/DeleteUserModal";

export default function UsersPage() {
  const t = useTranslations("users");
  const tCommon = useTranslations("common");
  const toast = useToast();
  useAuthGuard(["Admin"]);

  // Filters & Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [isActiveFilter, setIsActiveFilter] = useState<boolean | undefined>(
    undefined
  );
  const [statusFilter, setStatusFilter] = useState<UserStatus | undefined>(
    undefined
  );
  const [cityIdFilter, setCityIdFilter] = useState<number | undefined>(
    undefined
  );
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  // Modals state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [viewModalUserId, setViewModalUserId] = useState<string | null>(null);
  const [editModalUserId, setEditModalUserId] = useState<string | null>(null);
  const [deleteModalUser, setDeleteModalUser] = useState<User | null>(null);

  // Queries
  const {
    data: usersData,
    isLoading,
    error,
  } = useUsers({
    searchTerm,
    role: roleFilter,
    status: statusFilter,
    cityId: cityIdFilter,
    pageNumber: page,
    pageSize,
  });

  const { data: cities } = useCities();

  // Fetch individual user details for view/edit
  const { data: viewUser } = useUser(viewModalUserId || "");
  const { data: editUser } = useUser(editModalUserId || "");

  // Mutations
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  // Handlers
  const handleCreateUser = async (data: CreateUserRequest) => {
    try {
      await createUserMutation.mutateAsync(data);
      toast.success(t("userCreatedSuccess"));
      setCreateModalOpen(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleUpdateUser = async (data: UpdateUserRequest) => {
    try {
      await updateUserMutation.mutateAsync(data);
      toast.success(t("userUpdatedSuccess"));
      setEditModalUserId(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteModalUser) return;

    try {
      await deleteUserMutation.mutateAsync(deleteModalUser.id);
      toast.success(t("userDeletedSuccess"));
      setDeleteModalUser(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value);
    setPage(1);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value === "" ? undefined : (Number(value) as UserStatus));
    setPage(1);
  };

  const handleCityFilterChange = (value: string) => {
    setCityIdFilter(value === "" ? undefined : Number(value));
    setPage(1);
  };

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

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
            {/* Search */}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold text-black placeholder:text-gray-500 focus:border-[#E6497F] outline-none"
            />

            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => handleRoleFilterChange(e.target.value)}
              className="px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
            >
              <option value="">{t("allRoles")}</option>
              <option value="Admin">{t("roles.Admin")}</option>
              <option value="Vendor">{t("roles.Vendor")}</option>
              <option value="ShippingCompany">
                {t("roles.ShippingCompany")}
              </option>
              <option value="Customer">{t("roles.Customer")}</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter === undefined ? "" : statusFilter}
              onChange={(e) => handleStatusFilterChange(e.target.value)}
              className="px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
            >
              <option value="">{t("allStatuses")}</option>
              <option value="0">{t("statuses.inactive")}</option>
              <option value="1">{t("statuses.active")}</option>
              <option value="2">{t("statuses.suspended")}</option>
              <option value="3">{t("statuses.pending")}</option>
            </select>

            {/* City Filter */}
            <select
              value={cityIdFilter === undefined ? "" : cityIdFilter}
              onChange={(e) => handleCityFilterChange(e.target.value)}
              className="px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
            >
              <option value="">{t("allCities")}</option>
              {cities?.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          {/* Create Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setCreateModalOpen(true)}
              className="px-6 py-3 bg-[#E6497F] hover:bg-[#d63d6f] text-white font-bold rounded-lg transition-colors"
            >
              {t("createNewUser")}
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <UsersTable
            users={usersData?.items || []}
            isLoading={isLoading}
            error={error}
            onView={(user) => setViewModalUserId(user.id)}
            onEdit={(user) => setEditModalUserId(user.id)}
            onDelete={setDeleteModalUser}
          />

          {/* Pagination */}
          {usersData && usersData.totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                {tCommon("page")} {usersData.pageNumber} {tCommon("of")}{" "}
                {usersData.totalPages} ({usersData.totalCount} {t("totalUsers")}
                )
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={!usersData.hasPreviousPage}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-black font-bold rounded transition-colors"
                >
                  {tCommon("previous")}
                </button>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!usersData.hasNextPage}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-black font-bold rounded transition-colors"
                >
                  {tCommon("next")}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modals */}
        {createModalOpen && (
          <CreateUserModal
            onSubmit={handleCreateUser}
            onClose={() => setCreateModalOpen(false)}
            isLoading={createUserMutation.isPending}
          />
        )}

        {viewUser && viewModalUserId && (
          <ViewUserModal
            user={viewUser}
            onClose={() => setViewModalUserId(null)}
            onEdit={(user) => {
              setViewModalUserId(null);
              setEditModalUserId(user.id);
            }}
          />
        )}

        {editUser && editModalUserId && (
          <EditUserModal
            user={editUser}
            onSubmit={handleUpdateUser}
            onClose={() => setEditModalUserId(null)}
            isLoading={updateUserMutation.isPending}
          />
        )}

        {deleteModalUser && (
          <DeleteUserModal
            user={deleteModalUser}
            onConfirm={handleDeleteUser}
            onCancel={() => setDeleteModalUser(null)}
            isLoading={deleteUserMutation.isPending}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
