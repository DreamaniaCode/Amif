import type { Metadata } from 'next';
import '@/styles/globals.css';
import '@/styles/admin.css';

export const metadata: Metadata = {
  title: {
    template: '%s | AMIF Admin',
    default: 'AMIF Admin',
  },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" dir="ltr">
      <body>{children}</body>
    </html>
  );
}
