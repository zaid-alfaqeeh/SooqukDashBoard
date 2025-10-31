import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCities } from "@/features/locations/hooks/useCities";
import { useDistrictsByCityId } from "@/features/locations/hooks/useDistricts";
import type {
  CreateUserRequest,
  UserStatus,
  UserRole,
} from "../types/users.types";

interface CreateUserModalProps {
  onSubmit: (data: CreateUserRequest) => void;
  onClose: () => void;
  isLoading: boolean;
}

export default function CreateUserModal({
  onSubmit,
  onClose,
  isLoading,
}: CreateUserModalProps) {
  const t = useTranslations("users");
  const tCommon = useTranslations("common");

  // Common fields
  const [selectedRole, setSelectedRole] = useState<UserRole>("Admin");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [status, setStatus] = useState<UserStatus>(0);
  const [cityId, setCityId] = useState<number>(0);
  const [districtId, setDistrictId] = useState<number>(0);
  const [address, setAddress] = useState("");

  // Admin fields
  const [department, setDepartment] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  // Vendor fields
  const [shopName, setShopName] = useState("");
  const [shopNameAr, setShopNameAr] = useState("");
  const [logo, setLogo] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");
  const [returnPolicyAr, setReturnPolicyAr] = useState("");
  const [shippingPolicy, setShippingPolicy] = useState("");
  const [shippingPolicyAr, setShippingPolicyAr] = useState("");
  const [vendorDistrictId, setVendorDistrictId] = useState<number>(0);
  const [vendorContactEmail, setVendorContactEmail] = useState("");
  const [vendorContactPhone, setVendorContactPhone] = useState("");
  const [vendorAddress, setVendorAddress] = useState("");

  // Shipping Company fields
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [companyContactEmail, setCompanyContactEmail] = useState("");
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState("");

  const { data: cities } = useCities();
  const { data: districts } = useDistrictsByCityId(cityId || null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedRole === "Admin") {
      onSubmit({
        fullName,
        email,
        phoneNumber,
        password,
        isActive,
        status,
        cityId,
        districtId,
        address,
        selectedRole: "Admin",
        department,
        jobTitle,
        logoFile: undefined,
      } as any);
    } else if (selectedRole === "Vendor") {
      onSubmit({
        fullName,
        email,
        phoneNumber,
        password,
        status,
        cityId,
        districtId,
        address,
        selectedRole: "Vendor",
        shopName,
        shopNameAr,
        logo,
        description,
        returnPolicy,
        returnPolicyAr,
        shippingPolicy,
        shippingPolicyAr,
        vendorDistrictId,
        vendorContactEmail,
        vendorContactPhone,
        vendorAddress,
        logoFile: logoFile || undefined,
      } as any);
    } else if (selectedRole === "ShippingCompany") {
      onSubmit({
        fullName,
        email,
        phoneNumber,
        password,
        status,
        cityId,
        selectedRole: "ShippingCompany",
        shippingPolicy,
        shippingPolicyAr,
        companyName,
        companyDescription,
        companyContactEmail,
        companyPhoneNumber,
        logoFile: undefined,
      } as any);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 my-4">
        <h3 className="text-2xl font-bold text-black mb-6">
          {t("createUser")}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              {t("role")} *
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
            >
              <option value="Admin">{t("roles.Admin")}</option>
              <option value="Vendor">{t("roles.Vendor")}</option>
              <option value="ShippingCompany">
                {t("roles.ShippingCompany")}
              </option>
            </select>
          </div>

          {/* Common Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                {t("fullName")} *
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black focus:border-[#E6497F] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-2">
                {t("email")} *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black focus:border-[#E6497F] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-2">
                {t("phone")} *
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black focus:border-[#E6497F] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-2">
                {t("password")} *
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black focus:border-[#E6497F] outline-none"
              />
            </div>

            {/* City - All roles */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                {t("city")} *
              </label>
              <select
                value={cityId}
                onChange={(e) => {
                  setCityId(Number(e.target.value));
                  setDistrictId(0);
                }}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
              >
                <option value="">--{t("selectCity")}--</option>
                {cities?.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            {/* District - Only for Admin and Vendor */}
            {selectedRole !== "ShippingCompany" && (
              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  {t("district")} *
                </label>
                <select
                  value={districtId}
                  onChange={(e) => setDistrictId(Number(e.target.value))}
                  required
                  disabled={!cityId}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none disabled:opacity-50"
                >
                  <option value="">--{t("selectDistrict")}--</option>
                  {districts?.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Address - Only for Admin and Vendor */}
          {selectedRole !== "ShippingCompany" && (
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                {t("address")} *
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black focus:border-[#E6497F] outline-none"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* isActive - Only for Admin */}
            {selectedRole === "Admin" && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-5 h-5 text-[#E6497F] rounded focus:ring-[#E6497F]"
                />
                <label
                  htmlFor="isActive"
                  className="text-sm font-bold text-black"
                >
                  {t("isActive")}
                </label>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-black mb-2">
                {t("status")}
              </label>
              <select
                value={status}
                onChange={(e) =>
                  setStatus(Number(e.target.value) as UserStatus)
                }
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
              >
                <option value={0}>{t("statuses.inactive")}</option>
                <option value={1}>{t("statuses.active")}</option>
                <option value={2}>{t("statuses.suspended")}</option>
                <option value={3}>{t("statuses.pending")}</option>
              </select>
            </div>
          </div>

          {/* Admin-specific fields */}
          {selectedRole === "Admin" && (
            <div className="border-t pt-6">
              <h4 className="text-lg font-bold text-black mb-4">
                {t("adminDetails")}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    {t("department")} *
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black focus:border-[#E6497F] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    {t("jobTitle")} *
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black focus:border-[#E6497F] outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Vendor-specific fields */}
          {selectedRole === "Vendor" && (
            <div className="border-t pt-6 space-y-4">
              <h4 className="text-lg font-bold text-black mb-4">
                {t("vendorDetails")}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    {t("shopName")} *
                  </label>
                  <input
                    type="text"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black focus:border-[#E6497F] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    {t("shopNameAr")} *
                  </label>
                  <input
                    type="text"
                    value={shopNameAr}
                    onChange={(e) => setShopNameAr(e.target.value)}
                    required
                    dir="rtl"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black focus:border-[#E6497F] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    {t("vendorEmail")} *
                  </label>
                  <input
                    type="email"
                    value={vendorContactEmail}
                    onChange={(e) => setVendorContactEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black focus:border-[#E6497F] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    {t("vendorPhone")} *
                  </label>
                  <input
                    type="tel"
                    value={vendorContactPhone}
                    onChange={(e) => setVendorContactPhone(e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black focus:border-[#E6497F] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    {t("vendorDistrict")} *
                  </label>
                  <select
                    value={vendorDistrictId}
                    onChange={(e) =>
                      setVendorDistrictId(Number(e.target.value))
                    }
                    required
                    disabled={!cityId}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none disabled:opacity-50"
                  >
                    <option value="">--{t("selectDistrict")}--</option>
                    {districts?.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    {t("logo")}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setLogoFile(file);
                        setLogo(""); // Clear URL if file is selected
                      }
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black focus:border-[#E6497F] outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#E6497F] file:text-white hover:file:bg-[#d63d6f]"
                  />
                  {logoFile && (
                    <p className="mt-2 text-sm text-gray-600">
                      {t("selectedFile")}: {logoFile.name}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  {t("vendorAddress")} *
                </label>
                <input
                  type="text"
                  value={vendorAddress}
                  onChange={(e) => setVendorAddress(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black focus:border-[#E6497F] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  {t("description")}
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black focus:border-[#E6497F] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  {t("returnPolicy")}
                </label>
                <textarea
                  value={returnPolicy}
                  onChange={(e) => setReturnPolicy(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black focus:border-[#E6497F] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  {t("returnPolicyAr")}
                </label>
                <textarea
                  value={returnPolicyAr}
                  onChange={(e) => setReturnPolicyAr(e.target.value)}
                  rows={3}
                  dir="rtl"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black focus:border-[#E6497F] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  {t("shippingPolicy")} *
                </label>
                <textarea
                  value={shippingPolicy}
                  onChange={(e) => setShippingPolicy(e.target.value)}
                  rows={3}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black focus:border-[#E6497F] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  {t("shippingPolicyAr")} *
                </label>
                <textarea
                  value={shippingPolicyAr}
                  onChange={(e) => setShippingPolicyAr(e.target.value)}
                  rows={3}
                  dir="rtl"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black focus:border-[#E6497F] outline-none"
                />
              </div>
            </div>
          )}

          {/* Shipping Company-specific fields */}
          {selectedRole === "ShippingCompany" && (
            <div className="border-t pt-6">
              <h4 className="text-lg font-bold text-black mb-4">
                {t("shippingCompanyDetails")}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    {t("companyName")} *
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black focus:border-[#E6497F] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    {t("companyPhone")} *
                  </label>
                  <input
                    type="tel"
                    value={companyPhoneNumber}
                    onChange={(e) => setCompanyPhoneNumber(e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black focus:border-[#E6497F] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    {t("companyEmail")} *
                  </label>
                  <input
                    type="email"
                    value={companyContactEmail}
                    onChange={(e) => setCompanyContactEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black focus:border-[#E6497F] outline-none"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-bold text-black mb-2">
                  {t("companyDescription")}
                </label>
                <textarea
                  value={companyDescription}
                  onChange={(e) => setCompanyDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black focus:border-[#E6497F] outline-none"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-bold text-black mb-2">
                  {t("shippingPolicy")} *
                </label>
                <textarea
                  value={shippingPolicy}
                  onChange={(e) => setShippingPolicy(e.target.value)}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black focus:border-[#E6497F] outline-none"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-bold text-black mb-2">
                  {t("shippingPolicyAr")} *
                </label>
                <textarea
                  value={shippingPolicyAr}
                  onChange={(e) => setShippingPolicyAr(e.target.value)}
                  required
                  rows={3}
                  dir="rtl"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black focus:border-[#E6497F] outline-none"
                />
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
            >
              {tCommon("cancel")}
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-[#E6497F] hover:bg-[#d63d6f] text-white font-bold rounded-lg transition-colors disabled:opacity-50"
            >
              {isLoading ? t("creating") : t("createUser")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
