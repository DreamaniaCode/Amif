import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Pencil, Trash2, Plus } from 'lucide-react';

export default async function TeamPage() {
  const members = await prisma.teamMember.findMany({
    orderBy: { order: 'asc' }
  });

  return (
    <div>
      <div className="admin-topbar">
        <h1 className="admin-topbar-title">Gestion de l'équipe</h1>
        <Link href="/admin/team/new" className="btn btn-primary btn-sm">
          <Plus size={16} /> Ajouter un membre
        </Link>
      </div>

      <div className="admin-content">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>Ordre</th>
                <th>Nom</th>
                <th>Rôle (FR)</th>
                <th>Statut</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id}>
                  <td style={{ fontWeight: 600, color: 'var(--carbon-gray-60)' }}>{m.order}</td>
                  <td style={{ fontWeight: 600 }}>{m.name}</td>
                  <td>{m.roleFr}</td>
                  <td>
                    <span className={`badge ${m.visible ? 'badge-published' : 'badge-draft'}`}>
                      {m.visible ? 'Visible' : 'Masqué'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <Link href={`/admin/team/${m.id}/edit`} className="btn btn-ghost btn-sm">
                        <Pencil size={16} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {members.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: 'var(--carbon-gray-60)' }}>
                    Aucun membre trouvé dans l'équipe.
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
