// src/components/demos/DemoLauncher.tsx
// Main entry point for launching interactive project demos

'use client';

import { useState, useCallback } from 'react';
import type { Project } from '@/data/projects';
import { getRuntimeLabel, getRuntimeIcon, hasRunnableDemo } from '@/data/projects';
import { DemoContainer } from './DemoContainer';
import { DemoFallback } from './DemoFallback';

export type DemoState = 'idle' | 'loading' | 'running' | 'paused' | 'error';

interface DemoLauncherProps {
  project: Project;
  className?: string;
  compact?: boolean;
}

export function DemoLauncher({ project, className = '', compact = false }: DemoLauncherProps) {
  const [state, setState] = useState<DemoState>('idle');
  const [error, setError] = useState<string | null>(null);

  const canRun = hasRunnableDemo(project);
  const runtimeType = project.runtime.type;
  const label = getRuntimeLabel(runtimeType);
  const icon = getRuntimeIcon(runtimeType);

  const handleLaunch = useCallback(() => {
    if (!canRun) return;
    setError(null);
    setState('loading');
  }, [canRun]);

  const handleReady = useCallback(() => {
    setState('running');
  }, []);

  const handleError = useCallback((err: string) => {
    setError(err);
    setState('error');
  }, []);

  const handleClose = useCallback(() => {
    setState('idle');
    setError(null);
  }, []);

  const handleRetry = useCallback(() => {
    setError(null);
    setState('loading');
  }, []);

  // Idle state - show launch button
  if (state === 'idle') {
    return (
      <div className={`relative ${className}`}>
        {/* Thumbnail with play overlay */}
        <div className="relative aspect-video bg-slate-800 rounded-lg overflow-hidden group cursor-pointer"
             onClick={canRun ? handleLaunch : undefined}>
          {/* Thumbnail image or gradient placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4 opacity-50">{icon}</div>
              <p className="text-gray-400 text-sm">{project.title}</p>
            </div>
          </div>

          {/* Play button overlay */}
          {canRun && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={handleLaunch}
                className="flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-semibold transition-all transform hover:scale-105"
              >
                <span className="text-xl">{icon}</span>
                <span>{label}</span>
              </button>
            </div>
          )}

          {/* Non-runnable badge */}
          {!canRun && (
            <div className="absolute bottom-4 left-4 px-3 py-1 bg-slate-700/80 rounded-full text-sm text-gray-300">
              {label}
            </div>
          )}
        </div>

        {/* Runtime info badge */}
        {!compact && (
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-gray-400">
              {canRun ? 'Click to launch interactive demo' : 'Demo videos available'}
            </span>
            {canRun && (
              <span className="px-2 py-1 bg-green-600/20 text-green-400 rounded text-xs font-medium">
                INTERACTIVE
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  // Error state
  if (state === 'error') {
    return (
      <DemoFallback
        project={project}
        error={error}
        onRetry={handleRetry}
        onClose={handleClose}
        className={className}
      />
    );
  }

  // Loading or running state - show demo container
  return (
    <DemoContainer
      project={project}
      state={state}
      onReady={handleReady}
      onError={handleError}
      onClose={handleClose}
      className={className}
    />
  );
}

export default DemoLauncher;
