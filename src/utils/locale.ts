import { locales, type Locale } from "@/i18n/config";

/**
 * Utility functions for working with locales
 */

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getLocaleDisplayName(locale: Locale): string {
  const displayNames: Record<Locale, string> = {
    en: "English",
    ar: "العربية",
  };
  return displayNames[locale];
}

export function getLocaleFlag(locale: Locale): string {
  const flags: Record<Locale, string> = {
    en: "🇬🇧",
    ar: "🇸🇦",
  };
  return flags[locale];
}

export function getTextDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}
