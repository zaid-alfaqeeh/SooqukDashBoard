import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import type {
  Size,
  CreateSizeRequest,
  UpdateSizeRequest,
} from "../types/colorsSizes.types";

interface SizeFormModalProps {
  size?: Size;
  onSubmit: (data: CreateSizeRequest | UpdateSizeRequest) => void;
  onClose: () => void;
  isLoading: boolean;
}

export default function SizeFormModal({
  size,
  onSubmit,
  onClose,
  isLoading,
}: SizeFormModalProps) {
  const t = useTranslations("colorsSizes");
  const [name, setName] = useState(size?.name || "");
  const [nameAr, setNameAr] = useState(size?.nameAr || "");

  useEffect(() => {
    if (size) {
      setName(size.name);
      setNameAr(size.nameAr);
    }
  }, [size]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (size) {
      onSubmit({
        Id: size.id,
        name,
        nameAr,
      } as UpdateSizeRequest);
    } else {
      onSubmit({
        name,
        nameAr,
      } as CreateSizeRequest);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <h3 className="text-2xl font-bold text-black mb-6">
          {size ? t("editSize") : t("createSize")}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name (English) */}
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              {t("sizeNameEn")} *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black placeholder:text-gray-500 focus:border-[#E6497F] outline-none"
              placeholder={t("sizeNameEnPlaceholder")}
            />
          </div>

          {/* Name (Arabic) */}
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              {t("sizeNameAr")} *
            </label>
            <input
              type="text"
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
              required
              dir="rtl"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black placeholder:text-gray-500 focus:border-[#E6497F] outline-none"
              placeholder={t("sizeNameArPlaceholder")}
            />
          </div>

          {/* Preview */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-bold text-black mb-2">{t("preview")}</p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-700">
                  {name || "S"}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-black">
                  {name || t("sizeName")}
                </p>
                <p className="text-sm text-gray-600" dir="rtl">
                  {nameAr || t("sizeNameAr")}
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-[#E6497F] hover:bg-[#d63d6f] text-white font-bold rounded-lg transition-colors disabled:opacity-50"
            >
              {isLoading ? t("saving") : size ? t("update") : t("create")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
