import HeroSection from '@/components/common/hero-section';
import { getI18n } from '@/features/i18n/server/get-i18n';

export const dynamic = 'force-dynamic';

const Page = async () => {
  const { locale } = await getI18n();

  return (
    <div>
      <HeroSection locale={locale} />
    </div>
  );
};

export default Page;
