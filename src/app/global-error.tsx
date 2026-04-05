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
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Marcus Daley | Error</title>
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body
        style={{
          margin: 0,
          padding: '1.5rem',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a',
          color: '#e2e8f0',
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          lineHeight: '1.6',
        }}
      >
        <div style={{ maxWidth: '480px', width: '100%', textAlign: 'center' }}>
          {/* Error icon */}
          <div
            style={{
              width: '64px',
              height: '64px',
              margin: '0 auto 1.5rem',
              borderRadius: '50%',
              border: '2px solid rgba(213, 0, 50, 0.4)',
              backgroundColor: 'rgba(213, 0, 50, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#D50032',
            }}
          >
            !
          </div>

          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#f8fafc',
              marginBottom: '0.75rem',
            }}
          >
            Something Went Wrong
          </h1>

          <p
            style={{
              color: '#94a3b8',
              fontSize: '1rem',
              marginBottom: '0.5rem',
            }}
          >
            A critical error prevented the page from loading.
          </p>

          {process.env.NODE_ENV === 'development' && error.message && (
            <p
              style={{
                color: '#64748b',
                fontSize: '0.8125rem',
                fontFamily: 'monospace',
                backgroundColor: 'rgba(30, 41, 59, 0.5)',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                marginBottom: '2rem',
                display: 'inline-block',
              }}
            >
              {error.message}
            </p>
          )}

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              justifyContent: 'center',
              marginTop: '1.5rem',
              marginBottom: '2rem',
            }}
          >
            <button
              onClick={reset}
              style={{
                padding: '0.625rem 1.5rem',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #FFCC00, #D50032)',
                color: '#0f172a',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = '0.9';
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = '1';
              }}
            >
              Try Again
            </button>

            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- global-error cannot use next/link since the layout may be crashed */}
            <a
              href="/"
              style={{
                padding: '0.625rem 1.5rem',
                borderRadius: '8px',
                border: '1px solid #334155',
                backgroundColor: 'transparent',
                color: '#e2e8f0',
                fontSize: '0.875rem',
                fontWeight: 500,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                transition: 'border-color 0.2s',
              }}
            >
              Back to Home
            </a>
          </div>

          {/* Divider */}
          <div
            style={{
              width: '60px',
              height: '2px',
              background: 'linear-gradient(90deg, #FFCC00, #D50032)',
              margin: '0 auto 1rem',
              borderRadius: '1px',
            }}
          />

          <div
            style={{
              display: 'flex',
              gap: '1.25rem',
              justifyContent: 'center',
              fontSize: '0.8125rem',
              color: '#64748b',
            }}
          >
            <a
              href="https://github.com/GrizzwaldHouse"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#94a3b8', textDecoration: 'none' }}
            >
              GitHub
            </a>
            <a
              href="mailto:daleym12@gmail.com"
              style={{ color: '#94a3b8', textDecoration: 'none' }}
            >
              Email
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
