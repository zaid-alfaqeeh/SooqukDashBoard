import { useTranslations } from "next-intl";
import type { User } from "../types/users.types";

interface ViewUserModalProps {
  user: User;
  onClose: () => void;
  onEdit: (user: User) => void;
}

export default function ViewUserModal({
  user,
  onClose,
  onEdit,
}: ViewUserModalProps) {
  const t = useTranslations("users");

  const InfoRow = ({
    label,
    value,
  }: {
    label: string;
    value: string | number | undefined;
  }) => (
    <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-200">
      <dt className="text-sm font-bold text-gray-600">{label}:</dt>
      <dd className="col-span-2 text-sm text-black font-semibold">
        {value || "N/A"}
      </dd>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 my-4">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-bold text-black mb-2">
              {t("userDetails")}
            </h3>
            <p className="text-gray-600">{user.fullName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Basic Information */}
        <div className="mb-6">
          <h4 className="text-lg font-bold text-black mb-4 pb-2 border-b-2 border-[#E6497F]">
            {t("basicInfo")}
          </h4>
          <dl>
            <InfoRow label={t("fullName")} value={user.fullName} />
            <InfoRow label={t("email")} value={user.email} />
            <InfoRow label={t("phone")} value={user.phoneNumber} />
            <InfoRow label={t("role")} value={t(`roles.${user.role}`)} />
            <InfoRow label={t("status")} value={user.statusText} />
            <InfoRow
              label={t("isActive")}
              value={user.isActive ? t("yes") : t("no")}
            />
            <InfoRow label={t("city")} value={user.cityName} />
            <InfoRow label={t("district")} value={user.districtName} />
            <InfoRow label={t("address")} value={user.address} />
            <InfoRow
              label={t("createdAt")}
              value={new Date(user.createdAt).toLocaleString()}
            />
          </dl>
        </div>

        {/* Admin Details */}
        {user.adminDetails && (
          <div className="mb-6">
            <h4 className="text-lg font-bold text-black mb-4 pb-2 border-b-2 border-purple-500">
              {t("adminDetails")}
            </h4>
            <dl>
              <InfoRow
                label={t("department")}
                value={user.adminDetails.department}
              />
              <InfoRow
                label={t("jobTitle")}
                value={user.adminDetails.jobTitle}
              />
              <InfoRow
                label={t("permissions")}
                value={user.adminDetails.permissions.join(", ")}
              />
            </dl>
          </div>
        )}

        {/* Vendor Details */}
        {user.vendorDetails && (
          <div className="mb-6">
            <h4 className="text-lg font-bold text-black mb-4 pb-2 border-b-2 border-blue-500">
              {t("vendorDetails")}
            </h4>
            <dl>
              <InfoRow
                label={t("shopName")}
                value={user.vendorDetails.shopName}
              />
              <InfoRow
                label={t("shopNameAr")}
                value={user.vendorDetails.shopNameAr}
              />
              <InfoRow
                label={t("vendorEmail")}
                value={user.vendorDetails.contactEmail}
              />
              <InfoRow
                label={t("vendorPhone")}
                value={user.vendorDetails.contactPhone}
              />
              <InfoRow
                label={t("vendorAddress")}
                value={user.vendorDetails.address}
              />
              <InfoRow
                label={t("description")}
                value={user.vendorDetails.description}
              />
              <InfoRow
                label={t("returnPolicy")}
                value={user.vendorDetails.returnPolicy}
              />
              <InfoRow
                label={t("shippingPolicy")}
                value={user.vendorDetails.shippingPolicy}
              />
              <InfoRow
                label={t("shippingPolicyAr")}
                value={user.vendorDetails.shippingPolicyAr}
              />
              {user.vendorDetails.logo && (
                <div className="py-3 border-b border-gray-200">
                  <dt className="text-sm font-bold text-gray-600 mb-2">
                    {t("logo")}:
                  </dt>
                  <dd>
                    <img
                      src={user.vendorDetails.logo}
                      alt="Shop Logo"
                      className="w-24 h-24 object-cover rounded-lg border-2 border-gray-300"
                    />
                  </dd>
                </div>
              )}
            </dl>
          </div>
        )}

        {/* Shipping Company Details */}
        {user.shippingCompanyDetails && (
          <div className="mb-6">
            <h4 className="text-lg font-bold text-black mb-4 pb-2 border-b-2 border-orange-500">
              {t("shippingCompanyDetails")}
            </h4>
            <dl>
              <InfoRow
                label={t("companyName")}
                value={user.shippingCompanyDetails.name}
              />
              <InfoRow
                label={t("companyEmail")}
                value={user.shippingCompanyDetails.contactEmail}
              />
              <InfoRow
                label={t("companyPhone")}
                value={user.shippingCompanyDetails.phoneNumber}
              />
              <InfoRow
                label={t("companyDescription")}
                value={user.shippingCompanyDetails.description}
              />
            </dl>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4 border-t">
          <button
            onClick={() => onEdit(user)}
            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
          >
            {t("editUser")}
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors"
          >
            {t("close")}
          </button>
        </div>
      </div>
    </div>
  );
}
