"use client";

import { useCallback, useMemo } from "react";
import type { TranslationKeys } from "./types";
import type { Messages } from "./get-translations";
import { getNestedValue } from "./get-translations";

/**
 * Custom hook for type-safe translations
 * @param messages - Translation messages object
 * @returns Translation function `t` that accepts type-safe keys
 */
export function useTranslations(messages: Messages) {
  const t = useCallback(
    (key: TranslationKeys, defaultValue?: string): string => {
      const value = getNestedValue(messages, key);
      return typeof value === "string" ? value : defaultValue || key;
    },
    [messages]
  );

  return useMemo(() => ({ t }), [t]);
}
