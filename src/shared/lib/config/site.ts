import seoData from "./app-main-meta-data.json";

export interface SiteConfig {
  appName: string;
  appType: string;
  tagline: string;
  title: string;
  description: string;
  locale: string;
  language: string;
  domain: string;
  canonicalPath: string;
  applicationCategory: string;
  audience: string;
  keywords: string[];
  features: string[];
  languages: {
    supported: string[];
    default: string;
    locales: Record<
      string,
      {
        code: string;
        name: string;
        nativeName: string;
        locale: string;
        direction: string;
      }
    >;
  };
  organization: {
    name: string;
    legalName: string;
    url: string;
    logo: string;
    description: string;
    foundingDate: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      region: string;
      postalCode: string;
      country: string;
      countryCode: string;
    };
  };
  contact: {
    supportEmail: string;
    salesEmail: string;
    phoneNumber: string;
  };
  social: Record<string, string>;
  images: {
    og: string;
    logo: string;
    ogWidth: number;
    ogHeight: number;
  };
  icons: {
    favicon: string;
    svg: string;
    appleTouchIcon: string;
  };
  theme: { dark: string; light: string };
  pricing: {
    model: string;
    currency: string;
    minPrice: string;
    maxPrice: string;
  };
  manifest: string;
}

export const siteConfig = seoData as SiteConfig;

const envUrl = typeof process !== "undefined" && process.env.NEXT_PUBLIC_APP_URL?.trim();

export const baseUrl = envUrl || siteConfig.domain || "https://yourdomain.com";

export type Locale = keyof SiteConfig["languages"]["locales"];

export const supportedLocales = siteConfig.languages.supported as readonly Locale[];
export const defaultLocale = siteConfig.languages.default as Locale;
