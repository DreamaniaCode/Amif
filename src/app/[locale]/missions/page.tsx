import type { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n';
import type { Locale } from '@/types';
import { MissionsSection } from '@/components/home/MissionsSection';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === 'ar' ? 'المهام' : 'Missions' };
}

export default async function MissionsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return (
    <div style={{ paddingTop: 'var(--header-height)' }}>
      <MissionsSection dict={dict as never} locale={locale} />
    </div>
  );
}
