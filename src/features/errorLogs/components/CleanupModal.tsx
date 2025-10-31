"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import type { ErrorType } from "../types/errorLogs.types";

interface CleanupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (errorType: number, daysOld: number) => void;
  errorTypes: ErrorType[] | undefined;
  isCleaning: boolean;
}

export default function CleanupModal({
  isOpen,
  onClose,
  onConfirm,
  errorTypes,
  isCleaning,
}: CleanupModalProps) {
  const t = useTranslations("errorLogs");
  const [selectedErrorType, setSelectedErrorType] = useState<number | "">("");
  const [daysOld, setDaysOld] = useState<number>(30);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedErrorType !== "" && daysOld > 0) {
      onConfirm(selectedErrorType as number, daysOld);
    }
  };

  const handleClose = () => {
    setSelectedErrorType("");
    setDaysOld(30);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-black mb-4">
          {t("cleanup.title")}
        </h2>
        <p className="text-gray-600 mb-6 font-medium">
          {t("cleanup.description")}
        </p>

        <div className="space-y-4 mb-6">
          {/* Error Type Selection */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t("cleanup.errorType")}
            </label>
            <select
              value={selectedErrorType}
              onChange={(e) =>
                setSelectedErrorType(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 outline-none transition-all"
            >
              <option value="">{t("cleanup.selectType")}</option>
              {errorTypes?.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.name} ({type.description})
                </option>
              ))}
            </select>
          </div>

          {/* Days Old */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t("cleanup.daysOld")}
            </label>
            <input
              type="number"
              min="1"
              max="365"
              value={daysOld}
              onChange={(e) => setDaysOld(Number(e.target.value))}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-black font-semibold focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 outline-none transition-all"
            />
            <p className="text-xs text-gray-500 mt-1 font-medium">
              {t("cleanup.daysOldHint")}
            </p>
          </div>

          {/* Warning Message */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-700 font-semibold">
              {t("cleanup.warning")}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={handleClose}
            disabled={isCleaning}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-black font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t("cleanup.cancel")}
          </button>
          <button
            onClick={handleConfirm}
            disabled={
              isCleaning ||
              selectedErrorType === "" ||
              daysOld <= 0 ||
              daysOld > 365
            }
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCleaning ? t("cleanup.cleaning") : t("cleanup.confirm")}
          </button>
        </div>
      </div>
    </div>
  );
}

