'use client';

import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-lg w-full text-center">
        {/* Error indicator */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#D50032]/10 border border-[#D50032]/30 flex items-center justify-center">
          <span className="text-[#D50032] text-2xl font-bold">!</span>
        </div>

        <h1 className="text-2xl font-bold text-white mb-3">
          Something Went Wrong
        </h1>

        <p className="text-gray-400 mb-2">
          An unexpected error occurred while loading this page.
        </p>

        {process.env.NODE_ENV === 'development' && error.message && (
          <p className="text-sm text-gray-500 mb-8 font-mono bg-slate-800/50 rounded-lg px-4 py-2 inline-block">
            {error.message}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <button
            onClick={reset}
            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#FFCC00] to-[#D50032] text-slate-900 font-semibold text-sm hover:opacity-90 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="px-6 py-2.5 rounded-lg border border-slate-700 text-gray-300 text-sm font-medium hover:border-[#FFCC00]/50 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Back to Home
          </Link>

          <Link
            href="/projects"
            className="px-6 py-2.5 rounded-lg border border-slate-700 text-gray-300 text-sm font-medium hover:border-[#3B82F6]/50 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            View Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
