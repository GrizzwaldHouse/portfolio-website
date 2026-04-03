// error.tsx
// Developer: Marcus Daley
// Date: 2026-04-03
// Purpose: Error boundary for route segments. Catches render errors and displays
//          a recovery UI instead of a blank white screen.

'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-sm rounded-xl border border-red-500/30 p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
          <span className="text-red-400 text-xl font-mono">!</span>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">System Error</h2>
        <p className="text-gray-400 text-sm mb-6">
          {error.message || 'An unexpected error occurred.'}
        </p>
        <button
          onClick={reset}
          className="px-6 py-2 bg-cyan-600/20 text-cyan-400 text-sm font-mono rounded-lg border border-cyan-600/30 hover:bg-cyan-600/30 transition-colors"
        >
          RETRY
        </button>
      </div>
    </div>
  );
}
