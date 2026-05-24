import Link from 'next/link';
import Image from 'next/image';
import { Share2, Globe, MessageCircle, Camera, PlayCircle, Mail, Phone, MapPin } from 'lucide-react';
import type { Dictionary, Locale } from '@/types';

interface FooterProps {
  dict: Dictionary;
  locale: Locale;
}

export function Footer({ dict, locale }: FooterProps) {
  const navLinks = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/missions`, label: dict.nav.missions },
    { href: `/${locale}/poles`, label: dict.nav.poles },
    { href: `/${locale}/team`, label: dict.nav.team },
    { href: `/${locale}/blog`, label: dict.nav.blog },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <footer className="bg-dark text-slate-300 border-t border-slate-800 relative z-10">
      {/* Top Footer Section */}
      <div className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-2.5 rounded-xl inline-block max-w-[200px] shadow-sm">
                <Image
                  src="/logo.png"
                  alt="AMIF Logo"
                  width={160}
                  height={55}
                  className="w-full h-auto object-contain"
                />
              </div>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-md">
                {dict.footer.desc}
              </p>
              
              {/* Social Media Links with hover animation */}
              <div className="flex items-center gap-3 pt-2">
                <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1">
                  <Share2 size={18} />
                </a>
                <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1">
                  <Globe size={18} />
                </a>
                <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1">
                  <MessageCircle size={18} />
                </a>
                <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1">
                  <Camera size={18} />
                </a>
                <a href="#" aria-label="YouTube" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1">
                  <PlayCircle size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links Section */}
            <div>
              <h3 className="text-white text-base font-semibold tracking-wider uppercase mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-primary">
                {dict.footer.quickLinks}
              </h3>
              <ul className="space-y-3.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-slate-400 hover:text-primary transition-colors duration-200 text-sm md:text-base flex items-center gap-1 hover:translate-x-1 transition-transform"
                    >
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Details Section */}
            <div>
              <h3 className="text-white text-base font-semibold tracking-wider uppercase mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-primary">
                {dict.nav.contact}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary mt-1 shrink-0" />
                  <span className="text-sm md:text-base text-slate-400">Marrakech, Maroc</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={18} className="text-primary mt-1 shrink-0" />
                  <a href="mailto:contact@amif.ma" className="text-sm md:text-base text-slate-400 hover:text-primary transition-colors duration-200">
                    contact@amif.ma
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={18} className="text-primary mt-1 shrink-0" />
                  <a href="tel:+212600000000" className="text-sm md:text-base text-slate-400 hover:text-primary transition-colors duration-200">
                    +212 600 000 000
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="border-t border-slate-800/80 py-6 bg-slate-950/40">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-xs md:text-sm text-slate-500">
            {dict.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
