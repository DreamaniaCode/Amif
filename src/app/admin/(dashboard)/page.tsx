import { prisma } from '@/lib/prisma';
import { FileText, MessageSquare, Users, Handshake } from 'lucide-react';
import Link from 'next/link';
import styles from './page.module.css';

export default async function AdminDashboardPage() {
  const [postCount, contactCount, membershipCount, partnershipCount, latestMessages, latestPosts] =
    await Promise.all([
      prisma.blogPost.count(),
      prisma.contactMessage.count(),
      prisma.membershipRequest.count(),
      prisma.partnershipRequest.count(),
      prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
      prisma.blogPost.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { author: { select: { name: true } } }
      }),
    ]);

  const stats = [
    { label: 'Articles de blog', value: postCount, icon: FileText, color: 'green', href: '/admin/blog' },
    { label: 'Messages', value: contactCount, icon: MessageSquare, color: 'orange', href: '/admin/messages' },
    { label: 'Adhésions', value: membershipCount, icon: Users, color: 'blue', href: '/admin/messages?tab=membership' },
    { label: 'Partenariats', value: partnershipCount, icon: Handshake, color: 'red', href: '/admin/messages?tab=partnership' },
  ];

  return (
    <div>
      <div className="admin-topbar">
        <h1 className="admin-topbar-title">Tableau de bord</h1>
        <Link href="/admin/blog/new" className="btn btn-primary btn-sm">
          + Nouvel article
        </Link>
      </div>

      <div className="admin-content">
        {/* Stats */}
        <div className="admin-stats">
          {stats.map(({ label, value, icon: Icon, color, href }) => (
            <Link key={label} href={href} className="admin-stat-card" style={{ textDecoration: 'none' }}>
              <div className={`admin-stat-icon ${color}`}>
                <Icon size={22} />
              </div>
              <div>
                <div className="admin-stat-num">{value}</div>
                <div className="admin-stat-label">{label}</div>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.grid}>
          {/* Latest Messages */}
          <div className="admin-table-wrap">
            <div className="admin-table-header">
              <h2 className="admin-table-title">Derniers messages</h2>
              <Link href="/admin/messages" className="btn btn-outline-dark btn-sm">Voir tous</Link>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Sujet</th>
                  <th>Statut</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {latestMessages.map((msg) => (
                  <tr key={msg.id}>
                    <td>{msg.name}</td>
                    <td>{msg.email}</td>
                    <td>{msg.subject}</td>
                    <td>
                      <span className={`badge badge-${msg.status.toLowerCase()}`}>
                        {msg.status === 'NEW' ? 'Nouveau' : msg.status === 'READ' ? 'Lu' : 'Archivé'}
                      </span>
                    </td>
                    <td>{new Date(msg.createdAt).toLocaleDateString('fr-FR')}</td>
                  </tr>
                ))}
                {latestMessages.length === 0 && (
                  <tr><td colSpan={5} style={{ textAlign: 'center', color: '#9CA3AF', padding: '2rem' }}>Aucun message</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Latest Posts */}
          <div className="admin-table-wrap">
            <div className="admin-table-header">
              <h2 className="admin-table-title">Derniers articles</h2>
              <Link href="/admin/blog" className="btn btn-outline-dark btn-sm">Voir tous</Link>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Titre (FR)</th>
                  <th>Auteur</th>
                  <th>Statut</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {latestPosts.map((post) => (
                  <tr key={post.id}>
                    <td>
                      <Link href={`/admin/blog/${post.id}/edit`} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                        {post.titleFr.slice(0, 40)}...
                      </Link>
                    </td>
                    <td>{post.author.name}</td>
                    <td>
                      <span className={`badge badge-${post.status.toLowerCase()}`}>
                        {post.status === 'PUBLISHED' ? 'Publié' : 'Brouillon'}
                      </span>
                    </td>
                    <td>{new Date(post.createdAt).toLocaleDateString('fr-FR')}</td>
                  </tr>
                ))}
                {latestPosts.length === 0 && (
                  <tr><td colSpan={4} style={{ textAlign: 'center', color: '#9CA3AF', padding: '2rem' }}>Aucun article</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
