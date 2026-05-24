'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { RichEditor } from '@/components/admin/RichEditor';
import styles from './BlogForm.module.css';

interface BlogFormProps {
  initialData?: {
    id?: string;
    slug?: string;
    titleFr?: string;
    titleAr?: string;
    contentFr?: string;
    contentAr?: string;
    excerptFr?: string;
    excerptAr?: string;
    featuredImage?: string;
    status?: string;
    seoTitleFr?: string;
    seoTitleAr?: string;
    metaDescFr?: string;
    metaDescAr?: string;
    categoryId?: string;
    authorId?: string;
  };
  mode: 'create' | 'edit';
}

export function BlogForm({ initialData = {}, mode }: BlogFormProps) {
  const router = useRouter();
  const [tab, setTab] = useState<'fr' | 'ar' | 'seo'>('fr');
  const [status, setStatus] = useState(initialData.status || 'DRAFT');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [data, setData] = useState({
    slug: initialData.slug || '',
    titleFr: initialData.titleFr || '',
    titleAr: initialData.titleAr || '',
    contentFr: initialData.contentFr || '',
    contentAr: initialData.contentAr || '',
    excerptFr: initialData.excerptFr || '',
    excerptAr: initialData.excerptAr || '',
    featuredImage: initialData.featuredImage || '',
    seoTitleFr: initialData.seoTitleFr || '',
    seoTitleAr: initialData.seoTitleAr || '',
    metaDescFr: initialData.metaDescFr || '',
    metaDescAr: initialData.metaDescAr || '',
  });

  const update = (key: string, value: string) => setData(prev => ({ ...prev, [key]: value }));

  const handleSave = async (publishStatus: string) => {
    setLoading(true);
    setError('');

    if (!data.titleFr || !data.titleAr || !data.contentFr || !data.contentAr || !data.slug) {
      setError('Veuillez remplir tous les champs obligatoires (titre FR, titre AR, contenu FR, contenu AR, slug).');
      setLoading(false);
      return;
    }

    const payload = { ...data, status: publishStatus, authorId: 'seed-admin-id' };

    try {
      const res = await fetch(
        mode === 'create' ? '/api/blog' : `/api/blog/${initialData.id}`,
        {
          method: mode === 'create' ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        router.push('/admin/blog');
        router.refresh();
      } else {
        const json = await res.json();
        setError(json.error || 'Erreur lors de la sauvegarde');
      }
    } catch {
      setError('Erreur réseau');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrap}>
      {/* Topbar */}
      <div className="admin-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/admin/blog" className="btn btn-outline-dark btn-sm">
            <ArrowLeft size={16} />
          </Link>
          <h1 className="admin-topbar-title">
            {mode === 'create' ? 'Nouvel article' : 'Modifier l\'article'}
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={() => handleSave('DRAFT')} className="btn btn-outline-dark btn-sm" disabled={loading}>
            <Save size={16} /> Brouillon
          </button>
          <button onClick={() => handleSave('PUBLISHED')} className="btn btn-primary btn-sm" disabled={loading}>
            <Eye size={16} /> Publier
          </button>
        </div>
      </div>

      <div className="admin-content">
        {error && <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#B91C1C', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem' }}>{error}</div>}

        <div className={styles.layout}>
          {/* Main form */}
          <div className={styles.main}>
            <div className="admin-form-card">
              {/* Slug */}
              <div className="form-group">
                <label className="form-label">Slug (URL) *</label>
                <input
                  value={data.slug}
                  onChange={e => update('slug', e.target.value)}
                  className="form-input"
                  placeholder="mon-article-slug"
                />
              </div>

              {/* Language tabs */}
              <div className="admin-tabs">
                {(['fr', 'ar', 'seo'] as const).map(t => (
                  <button
                    key={t}
                    className={`admin-tab ${tab === t ? 'active' : ''}`}
                    onClick={() => setTab(t)}
                  >
                    {t === 'fr' ? '🇫🇷 Français' : t === 'ar' ? '🇲🇦 عربي' : '🔍 SEO'}
                  </button>
                ))}
              </div>

              {tab === 'fr' && (
                <div dir="ltr">
                  <div className="form-group">
                    <label className="form-label">Titre (FR) *</label>
                    <input value={data.titleFr} onChange={e => update('titleFr', e.target.value)} className="form-input" placeholder="Titre en français..." />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Extrait (FR)</label>
                    <textarea value={data.excerptFr} onChange={e => update('excerptFr', e.target.value)} className="form-textarea" rows={3} placeholder="Résumé court..." />
                  </div>
                  <div className="form-group" style={{ maxWidth: '100%' }}>
                    <label className="form-label">Contenu (FR) *</label>
                    <RichEditor value={data.contentFr} onChange={val => update('contentFr', val)} placeholder="Contenu de l'article en français..." />
                  </div>
                </div>
              )}

              {tab === 'ar' && (
                <div dir="rtl">
                  <div className="form-group">
                    <label className="form-label">العنوان (بالعربية) *</label>
                    <input value={data.titleAr} onChange={e => update('titleAr', e.target.value)} className="form-input" placeholder="عنوان المقال..." style={{ fontFamily: "'Cairo', sans-serif" }} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">مقتطف</label>
                    <textarea value={data.excerptAr} onChange={e => update('excerptAr', e.target.value)} className="form-textarea" rows={3} placeholder="ملخص قصير..." style={{ fontFamily: "'Cairo', sans-serif" }} />
                  </div>
                  <div className="form-group" style={{ maxWidth: '100%' }}>
                    <label className="form-label">المحتوى (بالعربية) *</label>
                    <RichEditor value={data.contentAr} onChange={val => update('contentAr', val)} placeholder="محتوى المقال بالعربية..." />
                  </div>
                </div>
              )}

              {tab === 'seo' && (
                <div>
                  <div className="form-group">
                    <label className="form-label">Titre SEO (FR)</label>
                    <input value={data.seoTitleFr} onChange={e => update('seoTitleFr', e.target.value)} className="form-input" placeholder="Titre pour les moteurs de recherche..." />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Titre SEO (AR)</label>
                    <input value={data.seoTitleAr} onChange={e => update('seoTitleAr', e.target.value)} className="form-input" placeholder="عنوان لمحركات البحث..." dir="rtl" style={{ fontFamily: 'Noto Naskh Arabic, serif' }} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Méta description (FR)</label>
                    <textarea value={data.metaDescFr} onChange={e => update('metaDescFr', e.target.value)} className="form-textarea" rows={3} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Méta description (AR)</label>
                    <textarea value={data.metaDescAr} onChange={e => update('metaDescAr', e.target.value)} className="form-textarea" rows={3} dir="rtl" style={{ fontFamily: 'Noto Naskh Arabic, serif' }} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar settings */}
          <div className={styles.sidebar}>
            <div className="admin-form-card">
              <h3 className="admin-form-title">Paramètres</h3>
              <div className="form-group">
                <label className="form-label">Statut</label>
                <select value={status} onChange={e => setStatus(e.target.value)} className="form-select">
                  <option value="DRAFT">Brouillon</option>
                  <option value="PUBLISHED">Publié</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Image principale (URL)</label>
                <input
                  value={data.featuredImage}
                  onChange={e => update('featuredImage', e.target.value)}
                  className="form-input"
                  placeholder="/uploads/image.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
