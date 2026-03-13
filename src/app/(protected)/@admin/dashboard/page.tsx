"use client";

import { useAuth } from "@/shared/lib/auth/auth-context";
import { useLanguage } from "@/shared/lib/i18n/language-context";
import { getTranslations } from "@/shared/lib/i18n/get-translations";
import { useTranslations } from "@/shared/lib/i18n/use-translations";
import { HeadManager } from "@/shared/components/common/head-manager";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

const Page = () => {
  const { user } = useAuth();
  const { locale } = useLanguage();
  const messages = getTranslations(locale);
  const { t } = useTranslations(messages);

  return (
    <>
      <HeadManager title={`${t("dashboard.admin.title")} | ${t("common.appName")}`} />
      <div className="mx-auto max-w-4xl px-4 py-12 pt-20 md:pt-12">
        <h1 className="mb-8 text-3xl font-bold">{t("dashboard.admin.title")}</h1>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t("dashboard.admin.totalUsers")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t("dashboard.admin.activeSessions")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t("dashboard.admin.adminUsers")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.admin.adminInfo")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {t("dashboard.admin.loggedInAs")}: {user?.email}
            </p>
            <p className="text-muted-foreground text-sm">{t("dashboard.admin.adminOnly")}</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Page;
