'use client';

import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { RichEditor } from '@/components/admin/RichEditor';

interface PageContentItem {
  id: string;
  page: string;
  section: string;
  key: string;
  valueFr: string;
  valueAr: string;
}

export default function PagesCMS() {
  const [items, setItems] = useState<PageContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activePage, setActivePage] = useState<string>('');

  useEffect(() => {
    fetch('/api/page-content')
      .then(r => r.json())
      .then((data: PageContentItem[]) => {
        setItems(data);
        if (data.length > 0) {
          const pages = Array.from(new Set(data.map(i => i.page)));
          if (pages.includes('hero')) setActivePage('hero');
          else setActivePage(pages[0]);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load page contents');
        setLoading(false);
      });
  }, []);

  const pages = Array.from(new Set(items.map(i => i.page)));
  const currentItems = items.filter(i => i.page === activePage);

  const updateItem = (id: string, lang: 'Fr' | 'Ar', val: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, [`value${lang}`]: val } : item));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    
    try {
      const updates = items.map(i => ({ id: i.id, valueFr: i.valueFr, valueAr: i.valueAr }));
      const res = await fetch('/api/page-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates })
      });
      if (res.ok) {
        setSuccess('Modifications enregistrées avec succès ! Le site a été mis à jour.');
        setTimeout(() => setSuccess(''), 4000);
      } else {
        setError('Erreur lors de la sauvegarde.');
      }
    } catch {
      setError('Erreur réseau.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="admin-content">Chargement des données du site...</div>;

  return (
    <div>
      <div className="admin-topbar">
        <h1 className="admin-topbar-title">Gestion des Pages (CMS)</h1>
        <button className="btn btn-primary btn-sm" onClick={handleSave} disabled={saving}>
          <Save size={16} /> {saving ? 'Enregistrement...' : 'Enregistrer tout'}
        </button>
      </div>

      <div className="admin-content">
        {error && <div style={{ background: '#ffe6eb', border: '1px solid #da1e28', color: '#da1e28', padding: '1rem', marginBottom: '1.5rem' }}>{error}</div>}
        {success && <div style={{ background: '#defbe6', border: '1px solid #24a148', color: '#198038', padding: '1rem', marginBottom: '1.5rem' }}>{success}</div>}

        <div className="admin-tabs">
          {pages.map(p => (
            <button
              key={p}
              className={`admin-tab ${activePage === p ? 'active' : ''}`}
              onClick={() => setActivePage(p)}
              style={{ textTransform: 'capitalize' }}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="admin-form-card">
          <h2 className="admin-form-title" style={{ textTransform: 'capitalize' }}>
            Section : {activePage}
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {currentItems.map(item => {
              const isLongText = item.valueFr.length > 80 || item.key.includes('content') || item.key.includes('text') || item.key.includes('desc');
              const label = `${item.section ? item.section + '.' : ''}${item.key || 'Texte principal'}`;

              return (
                <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--admin-border)' }}>
                  
                  {/* French Field */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontWeight: 600, color: 'var(--carbon-blue-50)' }}>[FR] {label}</label>
                    {isLongText ? (
                      <RichEditor value={item.valueFr} onChange={val => updateItem(item.id, 'Fr', val)} height={250} />
                    ) : (
                      <input value={item.valueFr} onChange={e => updateItem(item.id, 'Fr', e.target.value)} className="form-input" />
                    )}
                  </div>

                  {/* Arabic Field */}
                  <div className="form-group" style={{ marginBottom: 0 }} dir="rtl">
                    <label className="form-label" style={{ fontWeight: 600, color: 'var(--carbon-green-40)' }}>[AR] {label}</label>
                    {isLongText ? (
                      <RichEditor value={item.valueAr} onChange={val => updateItem(item.id, 'Ar', val)} height={250} />
                    ) : (
                      <input value={item.valueAr} onChange={e => updateItem(item.id, 'Ar', e.target.value)} className="form-input" style={{ fontFamily: "'Cairo', sans-serif" }} />
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
