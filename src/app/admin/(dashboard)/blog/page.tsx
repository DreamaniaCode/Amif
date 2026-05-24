import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Plus } from 'lucide-react';
import { BlogActions } from './BlogActions';

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { name: true } }, category: true },
  });

  return (
    <div>
      <div className="admin-topbar">
        <h1 className="admin-topbar-title">Articles de blog</h1>
        <Link href="/admin/blog/new" className="btn btn-primary btn-sm">
          <Plus size={16} /> Nouvel article
        </Link>
      </div>

      <div className="admin-content">
        <div className="admin-table-wrap">
          <div className="admin-table-header">
            <h2 className="admin-table-title">{posts.length} article{posts.length !== 1 ? 's' : ''}</h2>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Titre (FR)</th>
                <th>Titre (AR)</th>
                <th>Catégorie</th>
                <th>Auteur</th>
                <th>Statut</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <Link href={`/admin/blog/${post.id}/edit`} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                      {post.titleFr.slice(0, 35)}...
                    </Link>
                  </td>
                  <td style={{ direction: 'rtl', fontFamily: 'Noto Naskh Arabic, serif' }}>
                    {post.titleAr.slice(0, 25)}...
                  </td>
                  <td>{post.category?.nameFr || '—'}</td>
                  <td>{post.author.name}</td>
                  <td>
                    <span className={`badge badge-${post.status.toLowerCase()}`}>
                      {post.status === 'PUBLISHED' ? 'Publié' : 'Brouillon'}
                    </span>
                  </td>
                  <td>{new Date(post.createdAt).toLocaleDateString('fr-FR')}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <Link href={`/admin/blog/${post.id}/edit`} className="admin-action-btn edit">
                        Modifier
                      </Link>
                      <BlogActions postId={post.id} />
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: '#9CA3AF' }}>
                    Aucun article. <Link href="/admin/blog/new" style={{ color: 'var(--color-primary)' }}>Créer le premier</Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
