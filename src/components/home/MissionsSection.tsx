import { 
  CheckCircle2, 
  Users2, 
  PiggyBank, 
  TrendingUp, 
  Lightbulb, 
  GraduationCap, 
  Globe, 
  Heart, 
  BookOpen, 
  Sprout 
} from 'lucide-react';
import type { Dictionary, Locale } from '@/types';

interface MissionsProps {
  dict: Dictionary;
  locale: Locale;
}

const missionIcons = [
  Users2,         // 1. Support/Inclusion
  PiggyBank,      // 2. Micro-finance / funding
  TrendingUp,     // 3. Growth / entrepreneurship
  Lightbulb,      // 4. Innovation
  GraduationCap,  // 5. Training / Research
  Globe,          // 6. Regional / African scope
  Heart,          // 7. Social support
  BookOpen,       // 8. Financial literacy
  Sprout          // 9. Sustainable development
];

export function MissionsSection({ dict, locale }: MissionsProps) {
  const isAr = locale === 'ar';

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-light" id="missions">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-3 py-1 bg-primary-50 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
            {dict.missions.tag}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-dark tracking-tight">
            {dict.missions.title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
          <p className="text-sm md:text-base text-medium leading-relaxed">
            {dict.missions.subtitle}
          </p>
        </div>

        {/* Missions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {dict.missions.items.map((item, i) => {
            const IconComponent = missionIcons[i] || CheckCircle2;
            return (
              <div 
                key={i} 
                className="bg-white hover:bg-white/90 border border-border-custom rounded-3xl p-6 md:p-8 flex flex-col justify-between gap-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Card Accent Glow */}
                <div className="absolute top-0 left-0 w-2.5 h-full bg-gradient-to-b from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-4">
                  {/* Icon & Number Row */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <IconComponent size={24} />
                    </div>
                    <span className="text-4xl font-black text-light-alt group-hover:text-primary-50 transition-colors duration-300 select-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Text Content */}
                  <p className="text-sm md:text-base text-dark-muted font-medium leading-relaxed">
                    {item}
                  </p>
                </div>

                {/* Bottom Decoration */}
                <div className="flex items-center justify-between pt-4 border-t border-border-custom/60">
                  <span className="text-xs font-bold text-medium tracking-wide uppercase group-hover:text-primary transition-colors">
                    {isAr ? 'رسالتنا' : 'Notre Mission'}
                  </span>
                  <CheckCircle2 size={18} className="text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
