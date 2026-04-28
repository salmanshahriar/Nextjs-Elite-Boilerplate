'use client';

import { useCallback, useMemo } from 'react';
import type { Messages } from '../config/get-translations';
import { getNestedValue } from '../config/get-translations';
import type { TranslationKeys } from '../types/types';

/**
 * Custom hook for type-safe translations
 * @param messages - Translation messages object
 * @returns Translation function `t` that accepts type-safe keys
 */
export function useTranslations(messages: Messages) {
  const t = useCallback(
    (key: TranslationKeys, defaultValue?: string): string => {
      const value = getNestedValue(messages, key);
      return typeof value === 'string' ? value : defaultValue || key;
    },
    [messages],
  );

  return useMemo(() => ({ t }), [t]);
}
