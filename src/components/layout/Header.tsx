'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe } from 'lucide-react';
import type { Dictionary, Locale } from '@/types';

interface HeaderProps {
  dict: Dictionary;
  locale: Locale;
}

export function Header({ dict, locale }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const isAr = locale === 'ar';
  const otherLocale = isAr ? 'fr' : 'ar';

  // Replace locale in current path for switcher
  const switchPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/missions`, label: dict.nav.missions },
    { href: `/${locale}/poles`, label: dict.nav.poles },
    { href: `/${locale}/team`, label: dict.nav.team },
    { href: `/${locale}/blog`, label: dict.nav.blog },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-header shadow-md border-b border-border-custom h-20' 
          : 'bg-white/80 backdrop-blur-md h-24'
      } flex items-center`}
    >
      <div className="container mx-auto px-4 md:px-6 w-full">
        <div className="flex items-center justify-between gap-4 w-full">
          {/* Logo with larger size & clarity */}
          <Link href={`/${locale}`} className="flex items-center shrink-0">
            <div className="relative h-14 md:h-18 w-auto flex items-center transition-all duration-300 hover:opacity-90">
              <Image
                src="/logo.png"
                alt="AMIF Logo"
                width={150}
                height={60}
                priority
                className="h-full w-auto object-contain block"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 flex-1" aria-label="Navigation principale">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group whitespace-nowrap ${
                    active 
                      ? 'text-primary' 
                      : 'text-dark-muted hover:text-primary hover:bg-light'
                  }`}
                >
                  {link.label}
                  <span 
                    className={`absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full transition-all duration-300 ${
                      active ? 'opacity-100 scale-100' : 'opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100'
                    }`} 
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            {/* Language switcher */}
            <Link 
              href={switchPath} 
              className="flex items-center gap-1.5 px-3 py-1.5 border border-border-custom rounded-full text-xs font-semibold hover:border-primary hover:text-primary hover:bg-primary-50 transition-all duration-200"
            >
              <Globe size={14} className="text-medium hover:text-primary" />
              <span>{isAr ? 'FR' : 'العربية'}</span>
            </Link>

            {/* CTA Join */}
            <Link 
              href={`/${locale}/contact`} 
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              {dict.nav.join}
            </Link>

            {/* Mobile toggle */}
            <button
              className="lg:hidden text-dark p-2 rounded-lg hover:bg-light transition-colors"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed top-20 left-0 right-0 bg-white border-b border-border-custom shadow-xl transition-all duration-300 lg:hidden overflow-hidden ${
          isMobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-4 py-6">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                    active 
                      ? 'bg-primary-50 text-primary' 
                      : 'text-dark-muted hover:bg-light hover:text-primary'
                  }`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="h-px bg-border-custom my-2" />
            <Link 
              href={switchPath} 
              className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-medium hover:text-primary transition-colors"
              onClick={() => setIsMobileOpen(false)}
            >
              🌐 {isAr ? 'Français' : 'العربية'}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="w-full mt-2 flex items-center justify-center py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold hover:opacity-95 transition-opacity"
              onClick={() => setIsMobileOpen(false)}
            >
              {dict.nav.join}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
