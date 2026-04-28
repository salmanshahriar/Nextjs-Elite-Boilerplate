import {
  DEFAULT_LOCALE,
  LOCALES,
  type Locale,
} from '@/features/i18n/types/types';
import { cookies } from 'next/headers';

const LOCALE_COOKIE_NAME = 'locale';

export async function getRequestLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  const isSupported = (value: unknown): value is Locale =>
    typeof value === 'string' && (LOCALES as readonly string[]).includes(value);

  return isSupported(cookieLocale) ? cookieLocale : DEFAULT_LOCALE;
}

export function getLocaleDirection(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}
