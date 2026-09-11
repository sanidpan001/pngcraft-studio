'use client';

export function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 dotted-grid-bg" />
      <div
        className="orb animate-float"
        style={{
          width: '500px',
          height: '500px',
          top: '-100px',
          left: '-100px',
          background: 'radial-gradient(circle, hsl(var(--primary)), transparent 70%)',
        }}
      />
      <div
        className="orb animate-float"
        style={{
          width: '400px',
          height: '400px',
          top: '30%',
          right: '-100px',
          background: 'radial-gradient(circle, hsl(var(--accent)), transparent 70%)',
          animationDelay: '2s',
        }}
      />
      <div
        className="orb animate-float"
        style={{
          width: '600px',
          height: '600px',
          bottom: '-200px',
          left: '30%',
          background: 'radial-gradient(circle, hsl(var(--success) / 0.5), transparent 70%)',
          animationDelay: '4s',
        }}
      />
    </div>
  );
}
