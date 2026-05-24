import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import type { Dictionary, Locale } from '@/types';

interface ContactCTAProps {
  dict: Dictionary;
  locale: Locale;
}

export function ContactCTA({ dict, locale }: ContactCTAProps) {
  const isAr = locale === 'ar';

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-dark to-slate-900 text-white rounded-[40px] mx-4 md:mx-8 mb-20 shadow-xl" id="contact-cta">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vw] rounded-full bg-primary/10 blur-[120px] animate-blob-1" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60vw] h-[60vw] rounded-full bg-secondary/10 blur-[120px] animate-blob-2" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8">
          
          {/* Animated Mail Icon */}
          <div className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-primary mx-auto animate-bounce [animation-duration:5s]">
            <Mail size={28} />
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {dict.contact.subtitle}
          </h2>

          {/* Subtext */}
          <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? 'تواصلوا معنا للانضمام إلى شبكة الجمعية أو لبناء شراكة مثمرة.'
              : 'Rejoignez notre réseau ou proposez une collaboration. Ensemble, construisons une inclusion financière durable.'}
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href={`/${locale}/contact`} 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-semibold rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>{dict.nav.join}</span>
              <ArrowRight size={18} className={`${isAr ? 'rotate-180' : ''}`} />
            </Link>
            <Link 
              href={`/${locale}/contact`} 
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-full transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>{dict.nav.contact}</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
