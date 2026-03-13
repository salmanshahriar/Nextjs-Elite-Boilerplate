import type { Locale } from "./types";
import type { TranslationKeys } from "./types";
import enTranslations from "@/locales/en.json";
import bnTranslations from "@/locales/bn.json";
import arTranslations from "@/locales/ar.json";

const translations = {
  en: enTranslations,
  bn: bnTranslations as typeof enTranslations,
  ar: arTranslations as typeof enTranslations,
} as const;

export type Messages = typeof enTranslations;

/**
 * Get translations for a specific locale
 * @param locale - The locale to get translations for
 * @returns Translation messages for the locale
 */
export function getTranslations(locale: Locale): Messages {
  return translations[locale] || translations.en;
}

/**
 * Get nested value from an object using dot notation path
 * @param obj - The object to search in
 * @param path - Dot notation path (e.g., "common.welcome")
 * @returns The value at the path if it's a string, otherwise undefined
 */
export function getNestedValue(obj: Record<string, unknown>, path: string): string | undefined {
  const result = path
    .split(".")
    .reduce<unknown>((current, prop) => (current as Record<string, unknown>)?.[prop], obj);
  return typeof result === "string" ? result : undefined;
}

/**
 * Type-safe translation getter
 * @param messages - Translation messages object
 * @param key - Translation key in dot notation
 * @param defaultValue - Optional default value if key not found
 * @returns Translated string
 */
export function t(messages: Messages, key: TranslationKeys, defaultValue?: string): string {
  const value = getNestedValue(messages, key);
  return value ?? defaultValue ?? key;
}
