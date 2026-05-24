import type { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n';
import type { Locale } from '@/types';
import '@/styles/globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackgroundAnimation } from '@/components/ui/BackgroundAnimation';
import { Cairo } from 'next/font/google';

const cairo = Cairo({ subsets: ['arabic'], weight: ['300', '400', '500', '600', '700'], variable: '--font-cairo' });

export async function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'ar' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const isAr = locale === 'ar';
  return {
    metadataBase: new URL('https://amif.ma'),
    title: {
      template: isAr
        ? '%s | الجمعية المغربية للإدماج المالي'
        : '%s | AMIF — Association Marocaine pour l\'Inclusion Financière',
      default: isAr
        ? 'الجمعية المغربية للإدماج المالي'
        : 'AMIF — Association Marocaine pour l\'Inclusion Financière',
    },
    description: isAr
      ? 'نواكب ونكوّن ونربط حاملي المشاريع والمقاولين الشباب والتعاونيات والفاعلين الاقتصاديين من أجل إدماج مالي مستدام.'
      : 'Accompagner, former et connecter les porteurs de projets, entrepreneurs et coopératives pour une inclusion financière durable au Maroc et en Afrique.',
    keywords: isAr
      ? 'إدماج مالي، مقاولة، المغرب، إفريقيا، تمويل، تعاونيات، جمعية، مراكش'
      : 'inclusion financière, entrepreneuriat, Maroc, Afrique, financement, coopératives, association, Marrakech',
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'fr': '/fr',
        'ar': '/ar',
        'x-default': '/fr',
      },
    },
    openGraph: {
      title: isAr ? 'الجمعية المغربية للإدماج المالي' : 'AMIF — Association Marocaine pour l\'Inclusion Financière',
      description: isAr
        ? 'نواكب ونكوّن ونربط حاملي المشاريع والمقاولين الشباب والتعاونيات والفاعلين الاقتصاديين من أجل إدماج مالي مستدام.'
        : 'Accompagner, former et connecter les porteurs de projets, entrepreneurs et coopératives pour une inclusion financière durable au Maroc et en Afrique.',
      url: `https://amif.ma/${locale}`,
      siteName: 'AMIF',
      locale: isAr ? 'ar_MA' : 'fr_MA',
      type: 'website',
      images: [
        {
          url: '/logo.png',
          width: 756,
          height: 436,
          alt: 'AMIF Logo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isAr ? 'الجمعية المغربية للإدماج المالي' : 'AMIF — Association Marocaine pour l\'Inclusion Financière',
      description: isAr
        ? 'نواكب ونكوّن ونربط حاملي المشاريع والمقاولين الشباب والتعاونيات والفاعلين الاقتصاديين من أجل إدماج مالي مستدام.'
        : 'Accompagner, former et connecter les porteurs de projets, entrepreneurs et coopératives pour une inclusion financière durable au Maroc et en Afrique.',
      images: ['/logo.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  const dict = await getDictionary(locale);


  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`antialiased min-h-screen relative bg-white ${locale === 'ar' ? cairo.className : ''}`}>
        <BackgroundAnimation />
        <Header dict={dict as never} locale={locale} />
        <main className="relative z-10">{children}</main>
        <Footer dict={dict as never} locale={locale} />
      </body>
    </html>
  );
}
