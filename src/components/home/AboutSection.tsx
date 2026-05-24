import Image from 'next/image';
import { CheckCircle, TrendingUp, Users, Map, Award, BookOpen } from 'lucide-react';
import type { Dictionary, Locale } from '@/types';

interface AboutProps {
  dict: Dictionary;
  locale: Locale;
}

export function AboutSection({ dict, locale }: AboutProps) {
  const isAr = locale === 'ar';

  const pillars = [
    { icon: CheckCircle, label: isAr ? 'الشمولية المالية' : 'Inclusion Financière', color: 'text-primary bg-primary/10' },
    { icon: TrendingUp, label: isAr ? 'المقاولة' : 'Entrepreneuriat', color: 'text-secondary bg-secondary/10' },
    { icon: Users, label: isAr ? 'التضامن الاجتماعي' : 'Solidarité Sociale', color: 'text-dark bg-dark/5' },
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" id="about">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual side Column */}
          <div className="lg:col-span-5 relative space-y-6">
            
            {/* Main visual frame with professional photography asset */}
            <div className="relative h-[350px] md:h-[400px] w-full border border-border-custom rounded-3xl overflow-hidden group shadow-lg">
              
              {/* Renders generated About photograph */}
              <Image 
                src="/about_visual.png" 
                alt="AMIF Activités Maroc" 
                fill
                sizes="(max-w-md) 100vw, 450px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent" />

              {/* Bottom text overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-10 text-white space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold">
                  <Map size={12} className="text-primary-light" />
                  <span>{isAr ? 'المغرب · إفريقيا' : 'Maroc · Afrique'}</span>
                </div>
                <p className="text-sm font-semibold text-slate-200">
                  {isAr ? 'من أجل إدماج مالي مستدام وتنمية شاملة' : 'Pour une inclusion financière durable et un développement inclusif'}
                </p>
              </div>

              {/* Floating Stat Card 1 */}
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-md border border-border-custom/50 hover:scale-105 transition-transform duration-300 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-primary-50 flex items-center justify-center text-primary">
                  <Award size={16} />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-primary leading-none">17+</div>
                  <div className="text-[9px] font-bold text-medium mt-0.5">{isAr ? 'عضوًا مؤسسًا' : 'Fondateurs'}</div>
                </div>
              </div>

              {/* Floating Stat Card 2 */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-md border border-border-custom/50 hover:scale-105 transition-transform duration-300 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-secondary-50 flex items-center justify-center text-secondary">
                  <BookOpen size={16} />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-secondary leading-none">9</div>
                  <div className="text-[9px] font-bold text-medium mt-0.5">{isAr ? 'محاور عمل' : 'Pôles d\'action'}</div>
                </div>
              </div>
            </div>

            {/* Pillars bar under visual */}
            <div className="grid grid-cols-3 gap-3">
              {pillars.map(({ icon: Icon, label, color }) => (
                <div 
                  key={label} 
                  className="flex flex-col items-center justify-center p-3.5 bg-white/60 backdrop-blur-sm border border-border-custom rounded-2xl text-center gap-2 hover:border-primary hover:shadow-md transition-all duration-300 group"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={18} />
                  </div>
                  <span className="text-[11px] font-extrabold text-dark-muted leading-tight">{label}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Content side Column */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            
            {/* Header tags */}
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 bg-secondary-50 text-secondary text-xs font-bold rounded-full uppercase tracking-wider">
                {dict.about.tag}
              </span>
              <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
              <h2 className="text-3xl md:text-4xl font-extrabold text-dark leading-tight">
                {dict.about.title}
              </h2>
            </div>

            {/* Description Text */}
            <p className="text-sm md:text-base text-medium leading-relaxed">
              {dict.about.text}
            </p>

            {/* Stats row inside content */}
            <div className="grid grid-cols-3 gap-4 p-5 bg-light border border-border-custom rounded-2xl">
              <div className="text-center space-y-1">
                <span className="block text-xl md:text-2xl font-extrabold text-primary">{dict.about.stat1_val}</span>
                <span className="block text-[11px] font-bold text-medium uppercase tracking-wide leading-tight">{dict.about.stat1_label}</span>
              </div>
              <div className="border-r border-border-custom/80" />
              <div className="text-center space-y-1">
                <span className="block text-xl md:text-2xl font-extrabold text-secondary">{dict.about.stat2_val}</span>
                <span className="block text-[11px] font-bold text-medium uppercase tracking-wide leading-tight">{dict.about.stat2_label}</span>
              </div>
              <div className="border-r border-border-custom/80" />
              <div className="text-center space-y-1">
                <span className="block text-xl md:text-2xl font-extrabold text-dark">{dict.about.stat3_val}</span>
                <span className="block text-[11px] font-bold text-medium uppercase tracking-wide leading-tight">{dict.about.stat3_label}</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
