"use client";

import { HeadManager } from "@/shared/components/common/head-manager";
import { useLanguage } from "@/shared/lib/i18n/language-context";
import { getTranslations } from "@/shared/lib/i18n/get-translations";
import { useTranslations } from "@/shared/lib/i18n/use-translations";

const Page = () => {
  const { locale } = useLanguage();
  const messages = getTranslations(locale);
  const { t } = useTranslations(messages);
  const isRtl = locale === "ar";

  return (
    <>
      <HeadManager
        title={`${t("about.title")} | ${t("common.appName")}`}
        description={t("about.description")}
      />

      <div className={`mx-auto max-w-7xl px-4 py-12 ${isRtl ? "text-right" : "text-left"}`}>
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="from-primary to-primary/60 mb-4 bg-linear-to-r bg-clip-text text-5xl font-bold text-transparent">
            About Us
          </h1>
        </div>
      </div>
    </>
  );
};

export default Page;
