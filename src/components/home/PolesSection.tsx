import { 
  Megaphone, 
  Search, 
  Handshake, 
  BarChart3, 
  Briefcase, 
  Volume2, 
  Scale, 
  ShieldCheck, 
  Network,
  HelpCircle 
} from 'lucide-react';
import type { Dictionary, Locale } from '@/types';

interface PolesProps {
  dict: Dictionary;
  locale: Locale;
}

const poleIcons = [
  Megaphone,    // 1. Sensibilisation
  Search,       // 2. Recherche et Étude
  Handshake,    // 3. Partenariats
  BarChart3,    // 4. Observatoire et Évaluation
  Briefcase,    // 5. Appui Technique / Coop
  Volume2,      // 6. Plaidoyer
  Scale,        // 7. Législation
  ShieldCheck,  // 8. Protection du consommateur
  Network       // 9. Synergie d'action
];

const poleColors = [
  '#EEA03E', '#FA554F', '#646464', '#1E293B',
  '#EEA03E', '#FA554F', '#646464', '#1E293B', '#EEA03E'
];

export function PolesSection({ dict, locale }: PolesProps) {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden" id="poles">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-3 py-1 bg-secondary-50 text-secondary text-xs font-bold rounded-full uppercase tracking-wider">
            {dict.poles.tag}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-dark tracking-tight">
            {dict.poles.title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
          <p className="text-sm md:text-base text-medium leading-relaxed">
            {dict.poles.subtitle}
          </p>
        </div>

        {/* Poles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {dict.poles.items.map((item, i) => {
            const accentColor = poleColors[i];
            const IconComponent = poleIcons[i] || HelpCircle;
            return (
              <div 
                key={i} 
                className="bg-white hover:bg-white/95 border border-border-custom rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-md hover:shadow-xl hover:border-primary/20 transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Accent line at the bottom */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1.5 transition-all duration-300"
                  style={{ backgroundColor: accentColor }}
                />

                {/* Top Section */}
                <div className="flex items-center justify-between">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110"
                    style={{ 
                      backgroundColor: `${accentColor}15`,
                      color: accentColor
                    }}
                  >
                    <IconComponent size={22} />
                  </div>
                  <span className="text-sm font-extrabold text-medium bg-light border border-border-custom px-3 py-1 rounded-full">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2 flex-1">
                  <h3 
                    className="text-lg md:text-xl font-extrabold transition-colors duration-200"
                    style={{ color: accentColor }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-medium font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
