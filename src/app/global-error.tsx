// global-error.tsx
// Developer: Marcus Daley
// Date: 2026-04-03
// Purpose: Global error boundary that catches errors in the root layout itself.

'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#0f172a', color: '#e2e8f0', fontFamily: 'monospace' }}>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ maxWidth: '400px', textAlign: 'center' }}>
            <p style={{ fontSize: '48px', color: '#f87171', marginBottom: '16px' }}>SYSTEM FAILURE</p>
            <p style={{ color: '#94a3b8', marginBottom: '24px' }}>
              {error.message || 'A critical error occurred.'}
            </p>
            <button
              onClick={reset}
              style={{
                padding: '8px 24px',
                backgroundColor: 'rgba(6, 182, 212, 0.2)',
                color: '#22d3ee',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'monospace',
              }}
            >
              REBOOT
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
