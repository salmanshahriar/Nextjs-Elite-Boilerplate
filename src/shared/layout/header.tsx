"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/shared/lib/i18n/language-context";
import { getTranslations } from "@/shared/lib/i18n/get-translations";
import { useTranslations } from "@/shared/lib/i18n/use-translations";
import { useAuth } from "@/shared/lib/auth/auth-context";
import { siteConfig } from "@/shared/lib/config/site";
import { Logo } from "@/shared/components/logo";
import LanguageSwitcher from "@/shared/components/language-switcher";
import { ThemeToggle } from "@/shared/components/theme-toggle";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

const Header = () => {
  const { locale } = useLanguage();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const messages = getTranslations(locale);
  const { t } = useTranslations(messages);
  const isRtl = locale === "ar";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-border bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="z-10 flex items-center">
            <Link
              href="/"
              className={cn(
                "text-primary flex items-center gap-2.5 font-bold",
                isRtl && "flex-row-reverse"
              )}
            >
              <Logo size={28} className="h-7 w-7" />
              <div className="flex flex-col text-lg leading-tight font-semibold whitespace-nowrap">
                {siteConfig.appName || siteConfig.title}
              </div>
            </Link>
          </div>

          <nav className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 md:flex">
            <Link
              href="/"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === "/"
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              {t("navigation.home")}
            </Link>
            <Link
              href="/about"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === "/about"
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              {t("navigation.about")}
            </Link>
            {user && (
              <Link
                href="/dashboard"
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname?.startsWith("/dashboard")
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {t("navigation.dashboard")}
              </Link>
            )}
          </nav>

          <div className="z-10 hidden items-center gap-2 md:flex">
            <div className="border-border mr-2 flex items-center gap-1 border-r pr-2">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>

            {user ? (
              <div className="flex items-center gap-2">
                <div className="bg-muted/50 flex items-center gap-2 rounded-md px-3 py-2">
                  <div className="bg-primary h-2 w-2 shrink-0 rounded-full" />
                  <span className="text-muted-foreground max-w-[120px] truncate text-xs">
                    {user.email}
                  </span>
                </div>
                <Button variant="outline" size="sm" className="h-8 text-xs" onClick={logout}>
                  {t("navigation.logout")}
                </Button>
              </div>
            ) : (
              <Link href="/auth/login">
                <Button size="sm" className="h-8 text-xs">
                  {t("navigation.login")}
                </Button>
              </Link>
            )}
          </div>

          <div className="z-10 flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-border bg-background border-t md:hidden">
          <div className="mx-auto max-w-7xl space-y-3 px-4 py-4">
            <nav className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === "/"
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {t("navigation.home")}
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === "/about"
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {t("navigation.about")}
              </Link>
              {user && (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    pathname?.startsWith("/dashboard")
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  {t("navigation.dashboard")}
                </Link>
              )}
            </nav>

            <div className="border-border border-t pt-3">
              {user ? (
                <div className="space-y-3">
                  <div className="bg-muted/50 flex items-center gap-2 rounded-md px-3 py-2">
                    <div className="bg-primary h-2 w-2 shrink-0 rounded-full" />
                    <span className="text-muted-foreground truncate text-xs">{user.email}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    {t("navigation.logout")}
                  </Button>
                </div>
              ) : (
                <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full">
                    {t("navigation.login")}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
