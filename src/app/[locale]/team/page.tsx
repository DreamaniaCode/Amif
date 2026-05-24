import type { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n';
import type { Locale } from '@/types';
import { TeamSection } from '@/components/home/TeamSection';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === 'ar' ? 'الفريق' : 'Notre Équipe' };
}

export default async function TeamPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return (
    <div style={{ paddingTop: 'var(--header-height)' }}>
      <TeamSection dict={dict as never} locale={locale} />
    </div>
  );
}
