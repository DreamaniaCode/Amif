'use client';

import { useRouter } from 'next/navigation';

export function BlogActions({ postId }: { postId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Supprimer cet article ?')) return;
    await fetch(`/api/blog/${postId}`, { method: 'DELETE' });
    router.refresh();
  };

  return (
    <button onClick={handleDelete} className="admin-action-btn delete">
      Supprimer
    </button>
  );
}
