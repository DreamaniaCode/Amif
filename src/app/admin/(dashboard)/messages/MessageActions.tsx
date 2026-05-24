'use client';

import { useRouter } from 'next/navigation';

interface MessageActionsProps {
  id: string;
  type: 'contact' | 'membership' | 'partnership';
  status: string;
}

export function MessageActions({ id, type, status }: MessageActionsProps) {
  const router = useRouter();

  const updateStatus = async (newStatus: string) => {
    await fetch(`/api/messages/${type}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    router.refresh();
  };

  return (
    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
      {status !== 'READ' && (
        <button className="admin-action-btn edit" onClick={() => updateStatus('READ')}>
          Lu
        </button>
      )}
      {status !== 'ARCHIVED' && (
        <button className="admin-action-btn delete" onClick={() => updateStatus('ARCHIVED')}>
          Archiver
        </button>
      )}
    </div>
  );
}
