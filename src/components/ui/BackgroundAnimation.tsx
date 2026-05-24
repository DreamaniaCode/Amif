'use client';

export function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />
      
      {/* Ambient Animated Blobs */}
      {/* Blob 1: Orange/Yellow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/10 blur-[120px] animate-blob-1" />
      
      {/* Blob 2: Red */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-secondary/10 blur-[150px] animate-blob-2" />
      
      {/* Blob 3: Logo Grey/Charcoal */}
      <div className="absolute top-[40%] left-[30%] w-[45vw] h-[45vw] rounded-full bg-logo-grey/5 blur-[100px] animate-blob-3" />
    </div>
  );
}
