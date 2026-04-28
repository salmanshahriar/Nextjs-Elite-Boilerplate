import { getTranslations, t } from '@/features/i18n/config/get-translations';
import {
  getLocaleDirection,
  getRequestLocale,
} from '@/features/i18n/server/get-request-locale';

export async function getI18n() {
  const locale = await getRequestLocale();
  const dir = getLocaleDirection(locale);
  const messages = getTranslations(locale);

  return {
    locale,
    dir,
    messages,
    t: (key: Parameters<typeof t>[1], defaultValue?: Parameters<typeof t>[2]) =>
      t(messages, key, defaultValue),
  };
}
