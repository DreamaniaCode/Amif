import type { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n';
import type { Locale } from '@/types';
import { PolesSection } from '@/components/home/PolesSection';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === 'ar' ? 'المحاور' : 'Pôles' };
}

export default async function PolesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return (
    <div style={{ paddingTop: 'var(--header-height)' }}>
      <PolesSection dict={dict as never} locale={locale} />
    </div>
  );
}
