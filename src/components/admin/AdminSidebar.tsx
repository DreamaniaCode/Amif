'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard, FileText, Users, MessageSquare,
  Image as ImageIcon, Settings, LogOut, ChevronRight, ExternalLink,
  BookOpen
} from 'lucide-react';
import styles from './AdminSidebar.module.css';

const navItems = [
  { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard, exact: true },
  { href: '/admin/pages', label: 'Pages (CMS)', icon: BookOpen },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/team', label: 'Équipe', icon: Users },
  { href: '/admin/media', label: 'Médiathèque', icon: ImageIcon },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { href: '/admin/settings', label: 'Paramètres', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.brand}>
        <Image src="/logo.png" alt="AMIF" width={140} height={48} className={styles.logo} />
        <span className={styles.adminLabel}>Admin</span>
      </div>

      {/* Nav */}
      <nav className={styles.nav}>
        {navItems.map(({ href, label, icon: Icon, exact }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.navItem} ${isActive(href, exact) ? styles.active : ''}`}
          >
            <Icon size={18} className={styles.navIcon} />
            <span>{label}</span>
            {isActive(href, exact) && <ChevronRight size={14} className={styles.chevron} />}
          </Link>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className={styles.bottom}>
        <Link href="/fr" target="_blank" className={styles.siteLink}>
          <ExternalLink size={16} />
          <span>Voir le site</span>
        </Link>
        <button
          className={styles.logoutBtn}
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
        >
          <LogOut size={16} />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
