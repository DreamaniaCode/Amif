'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { UploadCloud, Copy, CheckCircle2, File as FileIcon } from 'lucide-react';

interface MediaFile {
  id: string;
  filename: string;
  url: string;
  mimetype: string;
  size: number;
  createdAt: string;
}

export default function MediaLibraryPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = async () => {
    try {
      const res = await fetch('/api/media');
      const data = await res.json();
      setFiles(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        await fetchFiles();
      } else {
        alert('Erreur lors du téléchargement');
      }
    } catch {
      alert('Erreur réseau');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div>
      <div className="admin-topbar">
        <h1 className="admin-topbar-title">Médiathèque</h1>
        <button 
          className="btn btn-primary btn-sm" 
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          <UploadCloud size={16} /> 
          {uploading ? 'Téléchargement...' : 'Ajouter un fichier'}
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleUpload}
          accept="image/*,application/pdf"
        />
      </div>

      <div className="admin-content">
        {loading ? (
          <div>Chargement des médias...</div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1.5rem'
          }}>
            {files.map(file => (
              <div key={file.id} className="admin-form-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '160px', background: '#f4f4f4', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  {file.mimetype.startsWith('image/') ? (
                    <Image src={file.url} alt={file.filename} fill style={{ objectFit: 'contain' }} sizes="220px" />
                  ) : (
                    <FileIcon size={48} color="var(--carbon-gray-40)" />
                  )}
                </div>
                <div style={{ padding: '1rem', flex: 1, borderTop: '1px solid var(--admin-border)' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--carbon-gray-100)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={file.filename}>
                    {file.filename}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--carbon-gray-60)', marginTop: '0.25rem' }}>
                    {formatSize(file.size)}
                  </div>
                  <button 
                    onClick={() => copyUrl(file.id, file.url)}
                    className="btn btn-outline-dark btn-sm" 
                    style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}
                  >
                    {copiedId === file.id ? (
                      <><CheckCircle2 size={14} color="var(--carbon-green-40)" /> Copié !</>
                    ) : (
                      <><Copy size={14} /> Copier l'URL</>
                    )}
                  </button>
                </div>
              </div>
            ))}
            
            {files.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--carbon-gray-60)', background: 'white', border: '1px solid var(--admin-border)' }}>
                Aucun fichier dans la médiathèque.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
