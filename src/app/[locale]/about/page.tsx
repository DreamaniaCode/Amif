import type { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n';
import type { Locale } from '@/types';
import { AboutSection } from '@/components/home/AboutSection';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === 'ar' ? 'حول الجمعية' : 'À propos' };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return (
    <div style={{ paddingTop: 'var(--header-height)' }}>
      <AboutSection dict={dict as never} locale={locale} />
    </div>
  );
}
