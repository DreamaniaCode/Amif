'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight, Globe, Handshake, BarChart3 } from 'lucide-react';
import type { Dictionary, Locale } from '@/types';

interface HeroProps {
  dict: Dictionary;
  locale: Locale;
}

export function HeroSection({ dict, locale }: HeroProps) {
  const isAr = locale === 'ar';

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden bg-dot-pattern" aria-label="Hero">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6 md:space-y-8">
            
            {/* Animated Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-xs md:text-sm font-semibold text-primary transition-all duration-300 hover:scale-105 hover:bg-primary/15 ${
              isAr ? 'flex-row-reverse text-right' : ''
            }`}>
              <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
              <span>{isAr ? 'الجمعية المغربية للإدماج المالي' : 'Association Marocaine pour l\'Inclusion Financière'}</span>
            </div>

            {/* Title with gradient accents */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-dark leading-tight md:leading-none">
              {isAr ? (
                <>
                  من أجل إدماج مالي <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">مستدام وعادل</span> للجميع
                </>
              ) : (
                <>
                  Pour une inclusion financière <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">durable et équitable</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-medium max-w-2xl leading-relaxed mx-auto lg:mx-0">
              {dict.hero.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href={`/${locale}/missions`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-semibold rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>{dict.hero.cta1}</span>
                <ArrowRight size={18} className={`${isAr ? 'rotate-180' : ''}`} />
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-light text-dark-muted font-semibold rounded-full border border-border-custom shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>{dict.hero.cta2}</span>
                <ChevronRight size={18} className={`${isAr ? 'rotate-180' : ''}`} />
              </Link>
            </div>

            {/* Stats Block */}
            <div className="grid grid-cols-3 gap-4 pt-8 md:pt-12 border-t border-border-custom max-w-xl mx-auto lg:mx-0">
              <div className="text-center lg:text-left space-y-1">
                <span className="block text-2xl sm:text-3xl font-extrabold text-primary">{dict.about.stat1_val}</span>
                <span className="block text-xs sm:text-sm text-medium font-medium">{dict.about.stat1_label}</span>
              </div>
              <div className="border-r border-border-custom h-12 my-auto" />
              <div className="text-center lg:text-left space-y-1">
                <span className="block text-2xl sm:text-3xl font-extrabold text-secondary">{dict.about.stat2_val}</span>
                <span className="block text-xs sm:text-sm text-medium font-medium">{dict.about.stat2_label}</span>
              </div>
              <div className="border-r border-border-custom h-12 my-auto" />
              <div className="text-center lg:text-left space-y-1">
                <span className="block text-2xl sm:text-3xl font-extrabold text-dark">{dict.about.stat3_val}</span>
                <span className="block text-xs sm:text-sm text-medium font-medium">{dict.about.stat3_label}</span>
              </div>
            </div>

          </div>

          {/* Visual Column */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            
            {/* Background glowing rings */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-full blur-3xl -z-10" />

            {/* Premium Activity Image Visual instead of plain card */}
            <div className="relative w-full max-w-md bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-xl flex flex-col items-center justify-center space-y-5 hover:shadow-2xl transition-shadow duration-300">
              
              {/* Image banner generated for hero */}
              <div className="w-full h-56 rounded-2xl overflow-hidden relative border border-border-custom/50">
                <Image
                  src="/hero_visual.png"
                  alt="Inclusion Financière Maroc"
                  fill
                  sizes="(max-w-md) 100vw, 400px"
                  className="object-cover"
                  priority
                />
                {/* Logo overlay */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-border-custom/50 shadow-sm flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="AMIF Logo"
                    width={100}
                    height={35}
                    className="h-7 w-auto object-contain block"
                  />
                </div>
              </div>
              
              <div className="text-sm font-semibold text-medium tracking-wide border-t border-border-custom pt-3 w-full text-center">
                {isAr ? 'إدماج · تكوين · تشبيك' : 'Inclusion · Formation · Réseau'}
              </div>

              {/* Floating Info Badges with Lucide Icons */}
              {/* Float Card 1: Zone d'action */}
              <div className="absolute -top-6 -left-6 md:-left-10 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-lg border border-border-custom/60 flex items-center gap-3 animate-bounce [animation-duration:6s] hover:scale-105 transition-transform">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary">
                  <Globe size={20} />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-dark">{isAr ? 'المغرب وإفريقيا' : 'Maroc & Afrique'}</div>
                  <div className="text-[10px] font-semibold text-medium">{isAr ? 'نطاق عملنا' : 'Zone d\'action'}</div>
                </div>
              </div>

              {/* Float Card 2: 9 Pôles */}
              <div className="absolute -bottom-6 -left-6 md:-left-8 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-lg border border-border-custom/60 flex items-center gap-3 animate-bounce [animation-duration:5s] hover:scale-105 transition-transform">
                <div className="w-10 h-10 rounded-xl bg-secondary-50 flex items-center justify-center text-secondary">
                  <Handshake size={20} />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-dark">{isAr ? '9 محاور تدخل' : '9 Pôles d\'intervention'}</div>
                  <div className="text-[10px] font-semibold text-medium">{isAr ? 'تأطير ومواكبة' : 'Accompagnement'}</div>
                </div>
              </div>

              {/* Float Card 3: Impact */}
              <div className="absolute -right-6 top-1/3 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-lg border border-border-custom/60 flex items-center gap-3 animate-bounce [animation-duration:7s] hover:scale-105 transition-transform">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-dark-muted">
                  <BarChart3 size={20} />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-dark">{isAr ? 'إدماج مالي' : 'Inclusion Financière'}</div>
                  <div className="text-[10px] font-semibold text-medium">{isAr ? 'مستدام وعادل' : 'Durable & Equitable'}</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Down arrow/Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 animate-bounce pointer-events-none select-none">
        <span className="text-[10px] tracking-widest uppercase font-semibold text-medium">
          {isAr ? 'مرر للأسفل' : 'Découvrir'}
        </span>
        <div className="w-1.5 h-6 rounded-full bg-border-custom flex justify-center pt-1">
          <div className="w-1 h-2 rounded-full bg-primary animate-ping" />
        </div>
      </div>
    </section>
  );
}
