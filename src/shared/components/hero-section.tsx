"use client";

import { useLanguage } from "@/shared/lib/i18n/language-context";
import { getTranslations } from "@/shared/lib/i18n/get-translations";
import { useTranslations } from "@/shared/lib/i18n/use-translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { siteConfig } from "@/shared/lib/config/site";

const HeroSection = () => {
  const { locale } = useLanguage();
  const messages = getTranslations(locale);
  const { t } = useTranslations(messages);
  const isRtl = locale === "ar";

  const features = [
    {
      icon: "🌐",
      title: "i18n Multi-Language",
      description: t("home.features.typeSafe"),
      details: ["Type-safe translations", "3 languages: English, বাংলা, العربية", "RTL support"],
    },
    {
      icon: "🔐",
      title: "Auth & RBAC",
      description: t("home.features.rbac"),
      details: [
        "NextAuth.js + Google OAuth",
        "User & Admin roles",
        "Protected routes, parallel routes",
      ],
    },
    {
      icon: "📄",
      title: "Central Config",
      description: t("home.features.production"),
      details: [
        "Single JSON: lib/config/app-main-meta-data.json",
        "Drives SEO, i18n locales, baseUrl",
        "Env override (NEXT_PUBLIC_APP_URL)",
      ],
    },
    {
      icon: "🚀",
      title: "Next.js + TypeScript + Tailwind",
      description: t("home.features.stack"),
      details: ["Next.js 15 + ESLint flat config", "TypeScript", "Tailwind CSS + shadcn/ui"],
    },
    {
      icon: "🎨",
      title: "Theme & Design",
      description: t("home.features.ui-experience"),
      details: ["Light/Dark/System modes", "Responsive design", "Tailwind CSS"],
    },
    {
      icon: "🔍",
      title: "SEO & Discovery",
      description: t("home.features.seo"),
      details: [
        "Dynamic metadata, JSON-LD",
        "robots.txt & sitemap.xml from config",
        "Dynamic PWA manifest",
      ],
    },
  ];

  return (
    <div className={`mx-auto max-w-7xl px-4 py-12 ${isRtl ? "text-right" : "text-left"}`}>
      <Card className="mb-6 transition-shadow hover:shadow-lg">
        <CardContent className="py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="from-primary to-primary/60 bg-linear-to-r bg-clip-text text-5xl font-bold text-transparent">
                {siteConfig.appName || siteConfig.title}
              </h1>
              {siteConfig.tagline && (
                <p className="text-muted-foreground mt-2 text-lg">{siteConfig.tagline}</p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="https://github.com/salmanshahriar/nextjs-boilerplate-production-ready"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
              >
                💻 Source code (GitHub)
              </a>
              <a
                href="https://salmanshahriar.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
              >
                🌐 Built by Salman Shahriar
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index} className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{feature.icon}</span>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {feature.description && (
                <p className="text-muted-foreground mb-3 text-sm">{feature.description}</p>
              )}
              <ul className="space-y-1">
                {feature.details.map((detail, i) => (
                  <li key={i} className="text-muted-foreground flex items-center gap-2 text-xs">
                    <span className="text-primary">✓</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
