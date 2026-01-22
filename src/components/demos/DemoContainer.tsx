// src/components/demos/DemoContainer.tsx
// Container that hosts the appropriate runtime for each demo type

'use client';

import { useEffect, useState } from 'react';
import type { Project } from '@/data/projects';
import type { DemoState } from './DemoLauncher';
import { StaticEmbedRuntime } from './runtimes/StaticEmbedRuntime';
import { TerminalRuntime } from './runtimes/TerminalRuntime';
import { VideoRuntime } from './runtimes/VideoRuntime';

interface DemoContainerProps {
  project: Project;
  state: DemoState;
  onReady: () => void;
  onError: (error: string) => void;
  onClose: () => void;
  className?: string;
}

export function DemoContainer({
  project,
  state,
  onReady,
  onError,
  onClose,
  className = '',
}: DemoContainerProps) {
  const [loadProgress, setLoadProgress] = useState(0);

  // Simulate loading progress for better UX
  useEffect(() => {
    if (state !== 'loading') return;

    const interval = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [state]);

  const renderRuntime = () => {
    switch (project.runtime.type) {
      case 'static-embed':
        return (
          <StaticEmbedRuntime
            project={project}
            onReady={onReady}
            onError={onError}
          />
        );

      case 'terminal-demo':
        return (
          <TerminalRuntime
            project={project}
            onReady={onReady}
            onError={onError}
          />
        );

      case 'video-only':
        return (
          <VideoRuntime
            project={project}
            onReady={onReady}
          />
        );

      default:
        // Fallback to video if runtime not implemented
        if (project.runtime.fallbackVideo) {
          return (
            <VideoRuntime
              project={project}
              onReady={onReady}
            />
          );
        }
        onError(`Runtime type "${project.runtime.type}" is not yet implemented`);
        return null;
    }
  };

  return (
    <div className={`relative bg-slate-900 rounded-lg overflow-hidden ${className}`}>
      {/* Loading overlay */}
      {state === 'loading' && (
        <div className="absolute inset-0 z-20 bg-slate-900 flex flex-col items-center justify-center">
          <div className="w-64 space-y-4">
            {/* Loading spinner */}
            <div className="flex justify-center">
              <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
            </div>

            {/* Status text */}
            <p className="text-white text-center text-sm">
              Loading {project.title}...
            </p>

            {/* Progress bar */}
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${loadProgress}%` }}
              />
            </div>

            {/* Cancel button */}
            <button
              onClick={onClose}
              className="w-full py-2 text-white/60 hover:text-white text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Runtime content */}
      <div className={`${state === 'loading' ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
        {renderRuntime()}
      </div>

      {/* Controls bar */}
      {state === 'running' && (
        <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-black/80 to-transparent z-10 flex items-center justify-between px-4">
          <span className="text-white/80 text-sm font-medium">
            {project.title}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded hover:bg-white/10 transition-colors"
              title="Close demo"
            >
              <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DemoContainer;
