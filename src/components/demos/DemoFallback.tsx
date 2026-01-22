// src/components/demos/DemoFallback.tsx
// Graceful fallback when demo fails or is not available

'use client';

import type { Project } from '@/data/projects';
import YouTubeEmbed from '@/components/YouTubeEmbed';

interface DemoFallbackProps {
  project: Project;
  error?: string | null;
  onRetry?: () => void;
  onClose: () => void;
  className?: string;
}

export function DemoFallback({
  project,
  error,
  onRetry,
  onClose,
  className = '',
}: DemoFallbackProps) {
  const hasFallbackVideo = project.runtime.fallbackVideo || project.videos.length > 0;
  const fallbackVideoId = project.runtime.fallbackVideo || project.videos[0]?.id;

  return (
    <div className={`relative bg-slate-900 rounded-lg overflow-hidden ${className}`}>
      {/* Error message section */}
      {error && (
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-medium mb-1">Demo Unavailable</h3>
              <p className="text-gray-400 text-sm">{error}</p>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            {onRetry && (
              <button
                onClick={onRetry}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Try Again
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Fallback video */}
      {hasFallbackVideo && fallbackVideoId && (
        <div className="p-4">
          <p className="text-gray-400 text-sm mb-3">
            {error ? 'Watch the demo video instead:' : 'Demo video:'}
          </p>
          <div className="aspect-video">
            <YouTubeEmbed
              videoId={fallbackVideoId}
              title={`${project.title} Demo`}
            />
          </div>
        </div>
      )}

      {/* No fallback available */}
      {!hasFallbackVideo && (
        <div className="p-8 text-center">
          <div className="text-4xl mb-4">📁</div>
          <h3 className="text-white font-medium mb-2">No Demo Available</h3>
          <p className="text-gray-400 text-sm mb-4">
            This project doesn't have an interactive demo yet.
          </p>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View Source Code
          </a>
        </div>
      )}

      {/* Close button for non-error state */}
      {!error && (
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            className="p-2 bg-black/40 hover:bg-black/60 rounded-lg transition-colors"
            title="Close"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default DemoFallback;
