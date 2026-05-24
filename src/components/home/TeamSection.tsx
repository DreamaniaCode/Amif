import type { Dictionary, Locale } from '@/types';

interface TeamProps {
  dict: Dictionary;
  locale: Locale;
  preview?: boolean;
}

const teamMembers = [
  { name: 'Hicham MARZOUK', roleFr: 'Président & Fondateur — Directeur d\'agence bancaire, formateur OFPPT', roleAr: 'رئيس مؤسس — مدير وكالة بنكية، مكون في OFPPT', initials: 'HM', color: '#EEA03E' },
  { name: 'Pr. Abdelaziz ELABJANI', roleFr: 'Vice Doyen, Faculté Économie Cadi Ayyad', roleAr: 'نائب العميد، كلية الاقتصاد القاضي عياض', initials: 'AE', color: '#FA554F' },
  { name: 'Mohamed LHAROUAL', roleFr: 'Professeur de Droit, Université Cadi Ayyad', roleAr: 'أستاذ القانون، جامعة القاضي عياض', initials: 'ML', color: '#646464' },
  { name: 'Mohamed ECCHEBANY', roleFr: 'Enseignant chercheur, Université Privée de Marrakech', roleAr: 'أستاذ باحث، الجامعة الخاصة بمراكش', initials: 'ME', color: '#1E293B' },
  { name: 'Maître Mohamed ANOUARANI', roleFr: 'Cadre, Direction Régionale des Impôts', roleAr: 'إطار، المديرية الجهوية للضرائب', initials: 'MA', color: '#EEA03E' },
  { name: 'Amal SAMIR', roleFr: 'Agent Général, AXA Assurances', roleAr: 'وكيل عام، AXA للتأمين', initials: 'AS', color: '#FA554F' },
  { name: 'Amal OULKADI', roleFr: 'Cadre, Al Amana Microfinance', roleAr: 'إطار، الأمانة للتمويل الصغير', initials: 'AO', color: '#646464' },
  { name: 'Aminata ABDOUL BOSSO', roleFr: 'Guest Experience, Riad Les Yeux Bleus', roleAr: 'استقبال ضيوف، رياض لي يو بلو', initials: 'AB', color: '#1E293B' },
  { name: 'Ahmed AAOUINATY', roleFr: 'Ex Directeur OFPPT, formateur ISTA, doctorant en économie', roleAr: 'مدير سابق OFPPT، مكون بالمعهد، دكتوراه في الاقتصاد', initials: 'AA', color: '#EEA03E' },
  { name: 'Mohamed EL HYANI', roleFr: 'Ex Directeur d\'Agence Bancaire, Professeur en Économie', roleAr: 'مدير وكالة بنكية سابق، أستاذ الاقتصاد', initials: 'MH', color: '#FA554F' },
  { name: 'Jassim EL BELKANI', roleFr: 'Architecte d\'Intérieur, Professeur à l\'UPM', roleAr: 'مهندس ديكور، أستاذ بالجامعة الخاصة بمراكش', initials: 'JB', color: '#646464' },
  { name: 'Hicham KHALIS', roleFr: 'Directeur AB Serve Maroc & Free Zone, ex DRH GTech', roleAr: 'مدير AB Serve المغرب والمنطقة الحرة، مدير موارد بشرية سابق', initials: 'HK', color: '#1E293B' },
  { name: 'Abdelaali JALAL MANSOUR', roleFr: 'Ex Directeur Groupe BMCE Bank, Directeur Bank Alyousr', roleAr: 'مدير سابق في مجموعة BMCE، مدير بنك اليسر', initials: 'AJ', color: '#EEA03E' },
  { name: 'Ali MAACHOUK', roleFr: 'Directeur de Groupe Al Barid Bank', roleAr: 'مدير مجموعة البريد بنك', initials: 'AM', color: '#FA554F' },
  { name: 'Tarik BELHAJ', roleFr: 'Consultant en Ressources Humaines', roleAr: 'مستشار في الموارد البشرية', initials: 'TB', color: '#646464' },
  { name: 'Mohamed AHADDAR', roleFr: 'Formateur Permanent à l\'ISTA', roleAr: 'مكون دائم بالمعهد التخصصي', initials: 'MH', color: '#1E293B' },
  { name: 'Taoufik LAGHDAF', roleFr: 'Directeur Régional, Filiale OCP', roleAr: 'مدير جهوي، فرع المكتب الشريف للفوسفات', initials: 'TL', color: '#EEA03E' },
];

export function TeamSection({ dict, locale, preview }: TeamProps) {
  const isAr = locale === 'ar';
  const members = preview ? teamMembers.slice(0, 8) : teamMembers;

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" id="team">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-3 py-1 bg-primary-50 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
            {dict.team.tag}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-dark tracking-tight">
            {dict.team.title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
          <p className="text-sm md:text-base text-medium leading-relaxed">
            {dict.team.subtitle}
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {members.map((member, i) => (
            <div 
              key={i} 
              className="bg-white hover:bg-white/95 border border-border-custom rounded-3xl p-6 flex flex-col items-center text-center gap-4 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group hover:-translate-y-1 relative"
            >
              {/* Avatar Circle with Logo Color theme */}
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center border-2 relative transition-all duration-300 group-hover:scale-105"
                style={{ 
                  backgroundColor: `${member.color}12`, 
                  borderColor: `${member.color}30` 
                }}
              >
                <span 
                  className="text-xl font-extrabold"
                  style={{ color: member.color }}
                >
                  {member.initials}
                </span>
                
                {/* Rotating Border effect */}
                <div 
                  className="absolute inset-[-4px] rounded-full border-2 border-dashed opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-[spin_8s_linear_infinite]"
                  style={{ borderColor: member.color }}
                />
              </div>

              {/* Information */}
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-dark group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs text-medium font-semibold leading-relaxed line-clamp-2 px-2">
                  {isAr ? member.roleAr : member.roleFr}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
