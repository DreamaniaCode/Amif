import type { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n';
import type { Locale } from '@/types';
import { BlogPreview } from '@/components/home/BlogPreview';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === 'ar' ? 'المدونة' : 'Blog & Actualités' };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return (
    <div style={{ paddingTop: 'var(--header-height)' }}>
      <BlogPreview dict={dict as never} locale={locale} />
    </div>
  );
}
