"use client";

import type React from "react";

import type { Locale } from "@/shared/lib/i18n/types";
import { createContext, useContext, useState } from "react";
import { DEFAULT_LOCALE } from "@/shared/lib/i18n/types";

interface LanguageContextType {
  locale: Locale;
  setLocale: (_locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const stored = localStorage.getItem("locale") as Locale | null;
    return stored || DEFAULT_LOCALE;
  });

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
