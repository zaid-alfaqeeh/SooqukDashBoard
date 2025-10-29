import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import type {
  Color,
  CreateColorRequest,
  UpdateColorRequest,
} from "../types/colorsSizes.types";

interface ColorFormModalProps {
  color?: Color;
  onSubmit: (data: CreateColorRequest | UpdateColorRequest) => void;
  onClose: () => void;
  isLoading: boolean;
}

export default function ColorFormModal({
  color,
  onSubmit,
  onClose,
  isLoading,
}: ColorFormModalProps) {
  const t = useTranslations("colorsSizes");
  const [hexCode, setHexCode] = useState(color?.hex || "#000000");
  const [name, setName] = useState(color?.name || "");
  const [nameAr, setNameAr] = useState(color?.nameAr || "");

  useEffect(() => {
    if (color) {
      setHexCode(color.hex);
      setName(color.name);
      setNameAr(color.nameAr);
    }
  }, [color]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (color) {
      onSubmit({
        id: color.id,
        HexCode: hexCode,
        name,
        nameAr,
      } as UpdateColorRequest);
    } else {
      onSubmit({
        HexCode: hexCode,
        name,
        nameAr,
      } as CreateColorRequest);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <h3 className="text-2xl font-bold text-black mb-6">
          {color ? t("editColor") : t("createColor")}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hex Code */}
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              {t("hexCode")} *
            </label>
            <div className="flex gap-3">
              <input
                type="color"
                value={hexCode}
                onChange={(e) => setHexCode(e.target.value)}
                className="w-16 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={hexCode}
                onChange={(e) => setHexCode(e.target.value)}
                required
                pattern="^#[0-9A-Fa-f]{6}$"
                placeholder="#000000"
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg font-mono text-black placeholder:text-gray-500 focus:border-[#E6497F] outline-none"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{t("hexCodeHint")}</p>
          </div>

          {/* Name (English) */}
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              {t("nameEn")} *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black placeholder:text-gray-500 focus:border-[#E6497F] outline-none"
              placeholder={t("nameEnPlaceholder")}
            />
          </div>

          {/* Name (Arabic) */}
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              {t("nameAr")} *
            </label>
            <input
              type="text"
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
              required
              dir="rtl"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black placeholder:text-gray-500 focus:border-[#E6497F] outline-none"
              placeholder={t("nameArPlaceholder")}
            />
          </div>

          {/* Preview */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-bold text-black mb-2">{t("preview")}</p>
            <div className="flex items-center gap-3">
              <div
                className="w-16 h-16 rounded-lg border-2 border-gray-300 shadow-sm"
                style={{ backgroundColor: hexCode }}
              />
              <div>
                <p className="text-sm font-semibold text-black">
                  {name || t("colorName")}
                </p>
                <p className="text-sm text-gray-600" dir="rtl">
                  {nameAr || t("colorNameAr")}
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
              {isLoading ? t("saving") : color ? t("update") : t("create")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
