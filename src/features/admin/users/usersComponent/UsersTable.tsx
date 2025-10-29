import { useTranslations } from "next-intl";
import type { User } from "../types/users.types";

interface UsersTableProps {
  users: User[];
  isLoading: boolean;
  error: Error | null;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export default function UsersTable({
  users,
  isLoading,
  error,
  onView,
  onEdit,
  onDelete,
}: UsersTableProps) {
  const t = useTranslations("users");

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-16 h-16 border-4 border-[#E6497F] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600 font-semibold">
        {t("errors.loadingUsers")}
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="text-center py-20 text-gray-600 font-semibold">
        {t("noUsers")}
      </div>
    );
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Admin":
      case "Super Admin":
        return "bg-purple-100 text-purple-800";
      case "Vendor":
        return "bg-blue-100 text-blue-800";
      case "ShippingCompany":
        return "bg-orange-100 text-orange-800";
      case "Customer":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadgeColor = (status: number) => {
    switch (status) {
      case 0: // Inactive
        return "bg-gray-100 text-gray-800";
      case 1: // Active
        return "bg-green-100 text-green-800";
      case 2: // Suspended
        return "bg-red-100 text-red-800";
      case 3: // Pending
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("fullName")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("email")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("phone")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("role")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("status")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("city")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("createdAt")}
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">
              {t("actions")}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-black">
                    {user.fullName}
                  </span>
                
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-gray-600">{user.email}</span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-gray-600">
                  {user.phoneNumber}
                </span>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 inline-flex text-xs font-bold rounded-full ${getRoleBadgeColor(
                    user.role
                  )}`}
                >
                  {t(`roles.${user.role}`)}
                </span>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 inline-flex text-xs font-bold rounded-full ${getStatusBadgeColor(
                    user.status
                  )}`}
                >
                  {user.statusText}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-gray-600">{user.cityName}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-600">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex gap-2">
                  <button
                    onClick={() => onView(user)}
                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded transition-colors"
                  >
                    {t("view")}
                  </button>
                  <button
                    onClick={() => onEdit(user)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded transition-colors"
                  >
                    {t("edit")}
                  </button>
                  <button
                    onClick={() => onDelete(user)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded transition-colors"
                  >
                    {t("delete")}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
