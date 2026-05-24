import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect('/admin/login');

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        {children}
      </div>
    </div>
  );
}
