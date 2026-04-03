// not-found.tsx
// Developer: Marcus Daley
// Date: 2026-04-03
// Purpose: Custom 404 page matching the Command Center theme.

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <p className="text-6xl font-mono font-bold text-cyan-400 mb-4">404</p>
        <h2 className="text-xl font-bold text-white mb-2">Route Not Found</h2>
        <p className="text-gray-400 text-sm mb-8">
          The requested page does not exist in this system.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2 bg-cyan-600/20 text-cyan-400 text-sm font-mono rounded-lg border border-cyan-600/30 hover:bg-cyan-600/30 transition-colors"
        >
          RETURN TO BASE
        </Link>
      </div>
    </div>
  );
}
