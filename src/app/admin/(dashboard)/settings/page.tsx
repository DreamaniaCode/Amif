'use client';

export default function SettingsPage() {
  return (
    <div>
      <div className="admin-topbar">
        <h1 className="admin-topbar-title">Paramètres</h1>
      </div>

      <div className="admin-content">
        <div className="admin-form-card" style={{ maxWidth: '600px' }}>
          <h2 className="admin-form-title">Paramètres du profil</h2>
          <p style={{ color: 'var(--carbon-gray-60)', marginBottom: '2rem', fontSize: '0.875rem' }}>
            Cette section est actuellement en construction. Pour modifier le contenu du site, veuillez vous rendre dans l'onglet <strong>Pages (CMS)</strong>.
          </p>

          <div className="form-group">
            <label className="form-label">Email de connexion</label>
            <input type="text" className="form-input" value="admin@amif.ma" disabled />
          </div>

          <div className="form-group">
            <label className="form-label">Nom d'affichage</label>
            <input type="text" className="form-input" defaultValue="Administrateur" disabled />
          </div>

          <button className="btn btn-primary" disabled>
            Mettre à jour le profil
          </button>
        </div>
      </div>
    </div>
  );
}
