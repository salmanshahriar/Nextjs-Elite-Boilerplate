export type { Locale } from "@/shared/lib/config/site";
export {
  supportedLocales as LOCALES,
  defaultLocale as DEFAULT_LOCALE,
} from "@/shared/lib/config/site";

export interface Translations {
  [key: string]: string | Translations;
}

export interface I18nConfig {
  locales: readonly string[];
  defaultLocale: string;
  localeDetection: boolean;
}

import { supportedLocales, defaultLocale } from "@/shared/lib/config/site";

export const i18nConfig: I18nConfig = {
  locales: supportedLocales,
  defaultLocale,
  localeDetection: true,
};

export type TranslationKeys =
  | "common.appName"
  | "common.description"
  | "common.selectLanguage"
  | "common.loading"
  | "common.error"
  | "common.success"
  | "common.cancel"
  | "common.confirm"
  | "common.save"
  | "common.delete"
  | "common.edit"
  | "common.close"
  | "common.back"
  | "common.next"
  | "common.previous"
  | "common.submit"
  | "common.search"
  | "common.filter"
  | "common.reset"
  | "common.noData"
  | "navigation.home"
  | "navigation.about"
  | "navigation.services"
  | "navigation.contact"
  | "navigation.language"
  | "navigation.dashboard"
  | "navigation.profile"
  | "navigation.settings"
  | "navigation.logout"
  | "navigation.login"
  | "auth.login.title"
  | "auth.login.email"
  | "auth.login.password"
  | "auth.login.emailPlaceholder"
  | "auth.login.passwordPlaceholder"
  | "auth.login.submit"
  | "auth.login.forgotPassword"
  | "auth.login.noAccount"
  | "auth.login.signUp"
  | "auth.login.invalidCredentials"
  | "auth.login.fillAllFields"
  | "auth.login.testCredentials"
  | "auth.login.signInWithGoogle"
  | "auth.login.orContinueWith"
  | "auth.login.admin"
  | "auth.login.user"
  | "auth.logout.title"
  | "auth.logout.confirm"
  | "auth.logout.success"
  | "dashboard.admin.title"
  | "dashboard.admin.totalUsers"
  | "dashboard.admin.activeSessions"
  | "dashboard.admin.adminUsers"
  | "dashboard.admin.adminInfo"
  | "dashboard.admin.loggedInAs"
  | "dashboard.admin.adminOnly"
  | "dashboard.user.title"
  | "dashboard.user.profile"
  | "dashboard.user.email"
  | "dashboard.user.role"
  | "dashboard.user.userId"
  | "hero.title"
  | "hero.subtitle"
  | "hero.cta"
  | "about.title"
  | "about.description"
  | "home.supportedLanguages"
  | "home.technicalFeatures"
  | "home.features.typeSafe"
  | "home.features.localStorage"
  | "home.features.rtl"
  | "home.features.rbac"
  | "home.features.seo"
  | "home.features.production"
  | "home.features.stack"
  | "home.features.ui-experience"
  | "errors.404"
  | "errors.401"
  | "errors.403"
  | "errors.500"
  | "errors.generic"
  | "common.toggleTheme"
  | "theme.light"
  | "theme.dark"
  | "theme.system"
  | "sidebar.adminPanel"
  | "sidebar.userPanel"
  | "sidebar.menu"
  | "sidebar.theme"
  | "sidebar.language";
