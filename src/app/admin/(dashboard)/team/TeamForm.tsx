'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { RichEditor } from '@/components/admin/RichEditor';

interface TeamFormProps {
  initialData?: {
    id?: string;
    name?: string;
    roleFr?: string;
    roleAr?: string;
    bioFr?: string;
    bioAr?: string;
    photo?: string;
    order?: number;
    visible?: boolean;
  };
  mode: 'create' | 'edit';
}

export function TeamForm({ initialData = {}, mode }: TeamFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [data, setData] = useState({
    name: initialData.name || '',
    roleFr: initialData.roleFr || '',
    roleAr: initialData.roleAr || '',
    bioFr: initialData.bioFr || '',
    bioAr: initialData.bioAr || '',
    photo: initialData.photo || '',
    order: initialData.order || 0,
    visible: initialData.visible ?? true,
  });

  const update = (key: string, value: any) => setData(prev => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setLoading(true);
    setError('');

    if (!data.name || !data.roleFr || !data.roleAr) {
      setError('Veuillez remplir les champs obligatoires (Nom, Rôle FR/AR).');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        mode === 'create' ? '/api/team' : `/api/team/${initialData.id}`,
        {
          method: mode === 'create' ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );

      if (res.ok) {
        router.push('/admin/team');
        router.refresh();
      } else {
        setError('Erreur lors de la sauvegarde');
      }
    } catch {
      setError('Erreur réseau');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) return;
    setLoading(true);
    try {
      await fetch(`/api/team/${initialData.id}`, { method: 'DELETE' });
      router.push('/admin/team');
      router.refresh();
    } catch {
      setError('Erreur lors de la suppression');
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="admin-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/admin/team" className="btn btn-outline-dark btn-sm">
            <ArrowLeft size={16} />
          </Link>
          <h1 className="admin-topbar-title">
            {mode === 'create' ? 'Nouveau membre' : 'Modifier le membre'}
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {mode === 'edit' && (
            <button onClick={handleDelete} className="btn btn-danger btn-sm" disabled={loading}>
              Supprimer
            </button>
          )}
          <button onClick={handleSave} className="btn btn-primary btn-sm" disabled={loading}>
            <Save size={16} /> Enregistrer
          </button>
        </div>
      </div>

      <div className="admin-content" style={{ maxWidth: '800px' }}>
        {error && <div style={{ background: '#ffe6eb', border: '1px solid #da1e28', color: '#da1e28', padding: '1rem', marginBottom: '1.5rem' }}>{error}</div>}

        <div className="admin-form-card">
          <div className="form-group">
            <label className="form-label">Nom complet *</label>
            <input value={data.name} onChange={e => update('name', e.target.value)} className="form-input" placeholder="Ex: Hicham MARZOUK" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Rôle (FR) *</label>
              <input value={data.roleFr} onChange={e => update('roleFr', e.target.value)} className="form-input" />
            </div>
            <div className="form-group" dir="rtl">
              <label className="form-label">Rôle (AR) *</label>
              <input value={data.roleAr} onChange={e => update('roleAr', e.target.value)} className="form-input" style={{ fontFamily: "'Cairo', sans-serif" }} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Photo (URL)</label>
            <input value={data.photo} onChange={e => update('photo', e.target.value)} className="form-input" placeholder="/uploads/photo.jpg" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Ordre d'affichage</label>
              <input type="number" value={data.order} onChange={e => update('order', parseInt(e.target.value) || 0)} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Visibilité</label>
              <select value={data.visible ? 'true' : 'false'} onChange={e => update('visible', e.target.value === 'true')} className="form-select">
                <option value="true">Visible</option>
                <option value="false">Masqué</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Biographie (FR)</label>
            <RichEditor value={data.bioFr} onChange={val => update('bioFr', val)} height={200} />
          </div>
          <div className="form-group" dir="rtl">
            <label className="form-label">Biographie (AR)</label>
            <RichEditor value={data.bioAr} onChange={val => update('bioAr', val)} height={200} />
          </div>
        </div>
      </div>
    </div>
  );
}
