"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/shared/lib/i18n/language-context";
import { type Locale, LOCALES } from "@/shared/lib/i18n/types";
import { siteConfig } from "@/shared/lib/config/site";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { useEffect } from "react";

function getLocaleLabels(): Record<Locale, string> {
  const labels = {} as Record<Locale, string>;
  for (const code of LOCALES) {
    labels[code as Locale] = siteConfig.languages.locales[code]?.nativeName ?? code;
  }
  return labels;
}

const localeLabels = getLocaleLabels();

interface LanguageSwitcherProps {
  variant?: "default" | "titled";
  title?: string;
}

const LanguageSwitcher = ({ variant = "default", title = "Language" }: LanguageSwitcherProps) => {
  const { locale, setLocale } = useLanguage();

  useEffect(() => {
    if (locale === "ar") {
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.dir = "ltr";
    }
    document.documentElement.lang = locale;
  }, [locale]);

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  const dropdownMenu = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Languages className="h-4 w-4" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LOCALES.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleLanguageChange(loc)}
            className={locale === loc ? "bg-accent" : ""}
          >
            <span>{localeLabels[loc]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  if (variant === "titled") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="group hover:bg-accent/60 flex w-full flex-1 cursor-pointer items-center justify-between rounded-md border-0 bg-transparent px-2 text-left transition-all">
            <div className="flex min-w-0 items-center gap-2">
              <span className="text-muted-foreground group-hover:text-foreground truncate text-[11px] font-medium transition-colors">
                {title}
              </span>
            </div>
            <div className="flex h-9 w-9 items-center justify-center">
              <Languages className="h-4 w-4" />
            </div>
            <span className="sr-only">Change language</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {LOCALES.map((loc) => (
            <DropdownMenuItem
              key={loc}
              onClick={() => handleLanguageChange(loc)}
              className={locale === loc ? "bg-accent" : ""}
            >
              <span>{localeLabels[loc]}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return dropdownMenu;
};

export default LanguageSwitcher;
