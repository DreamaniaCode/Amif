import type { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n';
import type { Locale } from '@/types';
import { ContactForms } from '@/components/contact/ContactForms';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === 'ar' ? 'اتصل بنا' : 'Contact' };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const rawDict = await getDictionary(locale);
  const dict = rawDict as { contact: Record<string, string>; nav: Record<string, string> };
  const d = dict.contact;
  const isAr = locale === 'ar';

  const infos = [
    { icon: MapPin, label: isAr ? 'العنوان' : 'Adresse', value: 'Marrakech, Maroc', color: 'text-primary bg-primary/10' },
    { icon: Mail, label: isAr ? 'البريد الإلكتروني' : 'Email', value: 'contact@amif.ma', color: 'text-secondary bg-secondary/10' },
    { icon: Phone, label: isAr ? 'الهاتف' : 'Téléphone', value: '+212 600 000 000', color: 'text-dark bg-dark/5' },
    { icon: Clock, label: isAr ? 'ساعات العمل' : 'Horaires', value: isAr ? 'الإثنين–الجمعة: 9:00–17:00' : 'Lun–Ven : 09:00–17:00', color: 'text-primary bg-primary/10' },
  ];

  return (
    <div className="min-h-screen py-16 md:py-24 relative overflow-hidden">
      
      {/* Hero Header */}
      <div className="py-12 md:py-16 bg-gradient-to-b from-light to-transparent border-b border-border-custom/50 mb-16">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-4">
          <span className="inline-block px-3 py-1 bg-secondary-50 text-secondary text-xs font-bold rounded-full uppercase tracking-wider">
            {d.tag}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-dark tracking-tight">
            {d.title}
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
          <p className="text-sm md:text-base text-medium max-w-2xl mx-auto leading-relaxed">
            {d.subtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Info Column */}
          <aside className="lg:col-span-5 space-y-8 bg-white/70 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-border-custom shadow-md">
            <h2 className="text-xl md:text-2xl font-extrabold text-dark border-b border-border-custom pb-4">
              {isAr ? 'معلومات الاتصال' : 'Informations de contact'}
            </h2>
            
            <div className="space-y-6">
              {infos.map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-medium uppercase tracking-wide">{label}</div>
                    <div className="text-sm md:text-base font-semibold text-dark-muted mt-0.5">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder Card */}
            <div className="relative rounded-2xl overflow-hidden border border-border-custom bg-light p-6 text-center space-y-4 hover:shadow-md transition-shadow">
              <div className="text-3xl animate-bounce [animation-duration:3s]">📍</div>
              <div className="space-y-1">
                <div className="text-sm font-extrabold text-dark">Marrakech, Maroc</div>
                <div className="text-xs text-medium font-semibold">31.6295° N, 7.9811° W</div>
              </div>
              <a
                href="https://www.google.com/maps/search/Marrakech,+Maroc"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-dark hover:bg-dark hover:text-white text-dark font-semibold rounded-xl text-xs transition-colors"
              >
                {isAr ? 'افتح الخريطة' : 'Ouvrir la carte'}
              </a>
            </div>
          </aside>

          {/* Forms Column */}
          <div className="lg:col-span-7 bg-white/80 backdrop-blur-md p-6 md:p-10 rounded-3xl border border-border-custom shadow-xl">
            <ContactForms dict={dict as never} locale={locale} />
          </div>

        </div>
      </div>
    </div>
  );
}
