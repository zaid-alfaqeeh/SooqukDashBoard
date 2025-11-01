"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useCities } from "@/features/locations/hooks/useCities";
import { useUsers } from "@/features/admin/users/usersHooks/useUsers";
import type { SendEmailToSegmentRequest } from "../types/email.types";
import type { UserRole } from "../types/email.types";

interface SendEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SendEmailToSegmentRequest) => void;
  isLoading: boolean;
}

const AVAILABLE_ROLES: UserRole[] = [
  "Admin",
  "Vendor",
  "ShippingCompany",
  "Customer",
  "Super Admin",
];

export default function SendEmailModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: SendEmailModalProps) {
  const t = useTranslations("email");
  const tCommon = useTranslations("common");

  // Form state
  const [formData, setFormData] = useState<SendEmailToSegmentRequest>({
    Subject: "",
    Body: "",
    IsHtml: false,
  });

  // Multi-select states
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>([]);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [userSearchTerm, setUserSearchTerm] = useState<string>("");

  // Fetch cities and users for dropdowns
  const { data: cities, isLoading: isLoadingCities } = useCities();
  const { data: usersResponse, isLoading: isLoadingUsers } = useUsers({
    pageNumber: 1,
    pageSize: 100, // Fetch all users
    searchTerm: userSearchTerm,
  });
  const users = usersResponse?.items || [];

  // Active sections
  const [activeSections, setActiveSections] = useState({
    basic: true,
    filtering: false,
    advanced: false,
  });

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setFormData({
        Subject: "",
        Body: "",
        IsHtml: false,
      });
      setSelectedUserIds([]);
      setSelectedRoles([]);
      setAttachments([]);
      setUserSearchTerm("");
      setActiveSections({
        basic: true,
        filtering: false,
        advanced: false,
      });
    }
  }, [isOpen]);

  const toggleSection = (section: keyof typeof activeSections) => {
    setActiveSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleUserSelect = (userId: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setAttachments((prev) => [...prev, ...files]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submitData: SendEmailToSegmentRequest = {
      ...formData,
      // Convert arrays to comma-separated strings
      UserIds:
        selectedUserIds.length > 0 ? selectedUserIds.join(",") : undefined,
      Roles: selectedRoles.length > 0 ? selectedRoles.join(",") : undefined,
      // Convert dates to ISO strings if provided
      RegisteredAfter: formData.RegisteredAfter
        ? new Date(formData.RegisteredAfter).toISOString()
        : undefined,
      RegisteredBefore: formData.RegisteredBefore
        ? new Date(formData.RegisteredBefore).toISOString()
        : undefined,
      // Attachments as File array
      Attachments: attachments.length > 0 ? attachments : undefined,
    };

    onSubmit(submitData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="relative inline-block w-full max-w-4xl overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-2xl sm:my-8 sm:align-middle">
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {t("sendEmail")}
                  </h3>
                  <p className="text-sm text-blue-100 mt-1">
                    {t("sendEmailDescription")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
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
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-6 max-h-[70vh] overflow-y-auto space-y-4">
              {/* Basic Information Section */}
              <div className="border border-gray-200 rounded-lg">
                <button
                  type="button"
                  onClick={() => toggleSection("basic")}
                  className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg"
                >
                  <h4 className="text-lg font-bold text-gray-900">
                    {t("basicInformation")}
                  </h4>
                  <svg
                    className={`w-5 h-5 text-gray-600 transition-transform ${
                      activeSections.basic ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {activeSections.basic && (
                  <div className="p-4 space-y-4">
                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        {t("subject")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.Subject}
                        onChange={(e) =>
                          setFormData({ ...formData, Subject: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black font-medium"
                        placeholder={t("subjectPlaceholder")}
                      />
                    </div>

                    {/* Is HTML */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.IsHtml}
                        onChange={(e) =>
                          setFormData({ ...formData, IsHtml: e.target.checked })
                        }
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded"
                        id="isHtml"
                      />
                      <label
                        htmlFor="isHtml"
                        className="ml-2 text-sm font-medium text-gray-700"
                      >
                        {t("isHtml")}
                      </label>
                      <span className="ml-2 text-xs text-gray-500">
                        {t("isHtmlHint")}
                      </span>
                    </div>

                    {/* Body */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        {t("body")} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={formData.Body}
                        onChange={(e) =>
                          setFormData({ ...formData, Body: e.target.value })
                        }
                        required
                        rows={8}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black font-medium resize-none font-mono"
                        placeholder={
                          formData.IsHtml
                            ? t("htmlBodyPlaceholder")
                            : t("bodyPlaceholder")
                        }
                      />
                      {formData.IsHtml && (
                        <p className="mt-2 text-xs text-gray-500">
                          {t("htmlBodyHint")}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Filtering Section */}
              <div className="border border-gray-200 rounded-lg">
                <button
                  type="button"
                  onClick={() => toggleSection("filtering")}
                  className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg"
                >
                  <h4 className="text-lg font-bold text-gray-900">
                    {t("userFiltering")}
                  </h4>
                  <svg
                    className={`w-5 h-5 text-gray-600 transition-transform ${
                      activeSections.filtering ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {activeSections.filtering && (
                  <div className="p-4 space-y-4">
                    {/* Users Selection */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        {t("selectUsers")} ({t("optional")})
                      </label>
                      {/* Search Input */}
                      <div className="mb-3">
                        <input
                          type="text"
                          value={userSearchTerm}
                          onChange={(e) => setUserSearchTerm(e.target.value)}
                          placeholder={t("searchUsersPlaceholder")}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black font-medium text-sm"
                        />
                      </div>
                      <div className="border border-gray-300 rounded-lg max-h-48 overflow-y-auto p-2">
                        {isLoadingUsers ? (
                          <p className="text-sm text-gray-500 py-2">
                            {t("loadingUsers")}
                          </p>
                        ) : users.length === 0 ? (
                          <p className="text-sm text-gray-500 py-2">
                            {t("noUsers")}
                          </p>
                        ) : (
                          <div className="space-y-2">
                            {users.map((user) => (
                              <label
                                key={user.id}
                                className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedUserIds.includes(user.id)}
                                  onChange={() => handleUserSelect(user.id)}
                                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-700">
                                  {user.fullName} ({user.email})
                                </span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                      {selectedUserIds.length > 0 && (
                        <p className="mt-2 text-xs text-blue-600">
                          {t("selectedUsersCount", {
                            count: selectedUserIds.length,
                          })}
                        </p>
                      )}
                    </div>

                    {/* Roles Selection */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        {t("selectRoles")} ({t("optional")})
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {AVAILABLE_ROLES.map((role) => (
                          <label
                            key={role}
                            className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={selectedRoles.includes(role)}
                              onChange={() => handleRoleSelect(role)}
                              className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded"
                            />
                            <span className="ml-2 text-sm font-medium text-gray-700">
                              {role}
                            </span>
                          </label>
                        ))}
                      </div>
                      {selectedRoles.length > 0 && (
                        <p className="mt-2 text-xs text-blue-600">
                          {t("selectedRolesCount", {
                            count: selectedRoles.length,
                          })}
                        </p>
                      )}
                    </div>

                    {/* Date Range */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          {t("registeredAfter")} ({t("optional")})
                        </label>
                        <input
                          type="datetime-local"
                          value={formData.RegisteredAfter || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              RegisteredAfter: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          {t("registeredBefore")} ({t("optional")})
                        </label>
                        <input
                          type="datetime-local"
                          value={formData.RegisteredBefore || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              RegisteredBefore: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black font-medium"
                        />
                      </div>
                    </div>

                    {/* City Selection */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        {t("selectCity")} ({t("optional")})
                      </label>
                      <select
                        value={formData.CityId || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            CityId: e.target.value
                              ? Number(e.target.value)
                              : undefined,
                          })
                        }
                        disabled={isLoadingCities}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black font-medium disabled:opacity-50"
                      >
                        <option value="">{t("allCities")}</option>
                        {cities?.map((city) => (
                          <option key={city.id} value={city.id}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Advanced Options Section */}
              <div className="border border-gray-200 rounded-lg">
                <button
                  type="button"
                  onClick={() => toggleSection("advanced")}
                  className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg"
                >
                  <h4 className="text-lg font-bold text-gray-900">
                    {t("advancedOptions")}
                  </h4>
                  <svg
                    className={`w-5 h-5 text-gray-600 transition-transform ${
                      activeSections.advanced ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {activeSections.advanced && (
                  <div className="p-4 space-y-4">
                    {/* Attachments */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        {t("attachments")} ({t("optional")})
                      </label>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black font-medium"
                      />
                      {attachments.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {attachments.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 bg-gray-50 rounded"
                            >
                              <span className="text-sm text-gray-700">
                                {file.name} ({(file.size / 1024).toFixed(2)} KB)
                              </span>
                              <button
                                type="button"
                                onClick={() => removeAttachment(index)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <svg
                                  className="w-4 h-4"
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
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Batch Size */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        {t("batchSize")} ({t("optional")})
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.BatchSize || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            BatchSize: e.target.value
                              ? Number(e.target.value)
                              : undefined,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black font-medium"
                        placeholder={t("batchSizePlaceholder")}
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        {t("batchSizeHint")}
                      </p>
                    </div>

                    {/* Delay Between Batches */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        {t("delayBetweenBatches")} ({t("optional")})
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.DelayBetweenBatchesMs || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            DelayBetweenBatchesMs: e.target.value
                              ? Number(e.target.value)
                              : undefined,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black font-medium"
                        placeholder={t("delayPlaceholder")}
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        {t("delayHint")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex gap-3 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {tCommon("cancel")}
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? t("sending") : t("send")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
