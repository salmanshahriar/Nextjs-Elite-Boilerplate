'use client';

import { HeadManager } from '@/components/common/head-manager';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/features/auth/hooks/auth-context';
import { getTranslations } from '@/features/i18n/config/get-translations';
import { useLanguage } from '@/features/i18n/hooks/language-context';
import { useTranslations } from '@/features/i18n/hooks/use-translations';

const Page = () => {
  const { user } = useAuth();
  const { locale } = useLanguage();
  const messages = getTranslations(locale);
  const { t } = useTranslations(messages);

  return (
    <>
      <HeadManager
        title={`${t('dashboard.admin.title')} | ${t('common.appName')}`}
      />
      <div className="mx-auto max-w-4xl px-4 py-12 pt-20 md:pt-12">
        <h1 className="mb-8 text-3xl font-bold">
          {t('dashboard.admin.title')}
        </h1>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {t('dashboard.admin.totalUsers')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {t('dashboard.admin.activeSessions')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {t('dashboard.admin.adminUsers')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.admin.adminInfo')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              {t('dashboard.admin.loggedInAs')}: {user?.email}
            </p>
            <p className="text-sm text-muted-foreground">
              {t('dashboard.admin.adminOnly')}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Page;
