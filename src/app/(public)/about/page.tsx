import { getI18n } from '@/features/i18n/server/get-i18n';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();

  return {
    title: `${t('about.title')} | ${t('common.appName')}`,
    description: t('about.description'),
  };
}

const Page = async () => {
  const { locale, t } = await getI18n();
  const isRtl = locale === 'ar';

  return (
    <>
      <div
        className={`mx-auto max-w-7xl px-4 py-12 ${isRtl ? 'text-right' : 'text-left'}`}
      >
        <div className="mb-12 text-center">
          <h1 className="mb-4 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-5xl font-bold text-transparent">
            {t('about.title')}
          </h1>
        </div>
      </div>
    </>
  );
};

export default Page;
