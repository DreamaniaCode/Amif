import { prisma } from '@/lib/prisma';
import { MessageActions } from './MessageActions';

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab = 'contact' } = await searchParams;

  const [contacts, memberships, partnerships] = await Promise.all([
    prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.membershipRequest.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.partnershipRequest.findMany({ orderBy: { createdAt: 'desc' } }),
  ]);

  const tabs = [
    { key: 'contact', label: `Contact (${contacts.length})` },
    { key: 'membership', label: `Adhésions (${memberships.length})` },
    { key: 'partnership', label: `Partenariats (${partnerships.length})` },
  ];

  return (
    <div>
      <div className="admin-topbar">
        <h1 className="admin-topbar-title">Messages</h1>
      </div>

      <div className="admin-content">
        <div className="admin-table-wrap">
          <div className="admin-table-header">
            <div className="admin-tabs" style={{ borderBottom: 'none', marginBottom: 0 }}>
              {tabs.map(t => (
                <a
                  key={t.key}
                  href={`?tab=${t.key}`}
                  className={`admin-tab ${tab === t.key ? 'active' : ''}`}
                >
                  {t.label}
                </a>
              ))}
            </div>
          </div>

          {tab === 'contact' && (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nom</th><th>Email</th><th>Téléphone</th><th>Sujet</th><th>Message</th><th>Statut</th><th>Date</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map(msg => (
                  <tr key={msg.id}>
                    <td><strong>{msg.name}</strong></td>
                    <td><a href={`mailto:${msg.email}`}>{msg.email}</a></td>
                    <td>{msg.phone || '—'}</td>
                    <td>{msg.subject}</td>
                    <td style={{ maxWidth: 200 }}>{msg.message.slice(0, 60)}...</td>
                    <td><span className={`badge badge-${msg.status.toLowerCase()}`}>{msg.status === 'NEW' ? 'Nouveau' : msg.status === 'READ' ? 'Lu' : 'Archivé'}</span></td>
                    <td>{new Date(msg.createdAt).toLocaleDateString('fr-FR')}</td>
                    <td><MessageActions id={msg.id} type="contact" status={msg.status} /></td>
                  </tr>
                ))}
                {contacts.length === 0 && <tr><td colSpan={8} style={{ textAlign: 'center', padding: '2rem', color: '#9CA3AF' }}>Aucun message</td></tr>}
              </tbody>
            </table>
          )}

          {tab === 'membership' && (
            <table className="admin-table">
              <thead>
                <tr><th>Nom</th><th>Email</th><th>Téléphone</th><th>Profession</th><th>Ville</th><th>Motivation</th><th>Statut</th><th>Date</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {memberships.map(m => (
                  <tr key={m.id}>
                    <td><strong>{m.name}</strong></td>
                    <td>{m.email}</td>
                    <td>{m.phone || '—'}</td>
                    <td>{m.profession || '—'}</td>
                    <td>{m.city || '—'}</td>
                    <td>{m.motivation?.slice(0, 50) || '—'}...</td>
                    <td><span className={`badge badge-${m.status.toLowerCase()}`}>{m.status === 'NEW' ? 'Nouveau' : m.status === 'READ' ? 'Lu' : 'Archivé'}</span></td>
                    <td>{new Date(m.createdAt).toLocaleDateString('fr-FR')}</td>
                    <td><MessageActions id={m.id} type="membership" status={m.status} /></td>
                  </tr>
                ))}
                {memberships.length === 0 && <tr><td colSpan={9} style={{ textAlign: 'center', padding: '2rem', color: '#9CA3AF' }}>Aucune demande</td></tr>}
              </tbody>
            </table>
          )}

          {tab === 'partnership' && (
            <table className="admin-table">
              <thead>
                <tr><th>Organisation</th><th>Contact</th><th>Email</th><th>Téléphone</th><th>Type</th><th>Message</th><th>Statut</th><th>Date</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {partnerships.map(p => (
                  <tr key={p.id}>
                    <td><strong>{p.orgName}</strong></td>
                    <td>{p.contactPerson}</td>
                    <td>{p.email}</td>
                    <td>{p.phone || '—'}</td>
                    <td>{p.partnershipType || '—'}</td>
                    <td>{p.message?.slice(0, 50) || '—'}...</td>
                    <td><span className={`badge badge-${p.status.toLowerCase()}`}>{p.status === 'NEW' ? 'Nouveau' : p.status === 'READ' ? 'Lu' : 'Archivé'}</span></td>
                    <td>{new Date(p.createdAt).toLocaleDateString('fr-FR')}</td>
                    <td><MessageActions id={p.id} type="partnership" status={p.status} /></td>
                  </tr>
                ))}
                {partnerships.length === 0 && <tr><td colSpan={9} style={{ textAlign: 'center', padding: '2rem', color: '#9CA3AF' }}>Aucune demande</td></tr>}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
