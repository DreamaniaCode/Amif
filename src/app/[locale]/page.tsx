import type { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n';
import type { Locale } from '@/types';
import { HeroSection } from '@/components/home/HeroSection';
import { AboutSection } from '@/components/home/AboutSection';
import { MissionsSection } from '@/components/home/MissionsSection';
import { PolesSection } from '@/components/home/PolesSection';
import { TeamSection } from '@/components/home/TeamSection';
import { BlogPreview } from '@/components/home/BlogPreview';
import { ContactCTA } from '@/components/home/ContactCTA';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'ar'
      ? 'الجمعية المغربية للإدماج المالي'
      : 'AMIF — Association Marocaine pour l\'Inclusion Financière',
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <>
      <HeroSection dict={dict as never} locale={locale} />
      <AboutSection dict={dict as never} locale={locale} />
      <MissionsSection dict={dict as never} locale={locale} />
      <PolesSection dict={dict as never} locale={locale} />
      <TeamSection dict={dict as never} locale={locale} preview />
      <BlogPreview dict={dict as never} locale={locale} />
      <ContactCTA dict={dict as never} locale={locale} />
    </>
  );
}
