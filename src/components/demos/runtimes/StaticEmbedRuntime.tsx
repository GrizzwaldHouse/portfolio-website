// src/components/demos/runtimes/StaticEmbedRuntime.tsx
// Runtime for embedding external content (itch.io, CodePen, etc.)

'use client';

import { useEffect, useRef, useState } from 'react';
import type { Project } from '@/data/projects';

interface StaticEmbedRuntimeProps {
  project: Project;
  onReady: () => void;
  onError: (error: string) => void;
}

// Allowlisted domains for embedding
const ALLOWED_DOMAINS = [
  'itch.io',
  'itch.zone',
  'codepen.io',
  'codesandbox.io',
  'stackblitz.com',
  'jsfiddle.net',
  'replit.com',
];

export function StaticEmbedRuntime({ project, onReady, onError }: StaticEmbedRuntimeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const config = project.runtime.config as {
    embedUrl?: string;
    aspectRatio?: string;
    minWidth?: number;
    minHeight?: number;
  } | undefined;

  const embedUrl = config?.embedUrl || project.itchUrl;
  const aspectRatio = config?.aspectRatio || '16/9';

  useEffect(() => {
    if (!embedUrl) {
      onError('No embed URL configured for this project');
      return;
    }

    // Validate domain
    try {
      const url = new URL(embedUrl);
      const isAllowed = ALLOWED_DOMAINS.some(domain =>
        url.hostname.endsWith(domain)
      );

      if (!isAllowed) {
        onError(`Domain ${url.hostname} is not in the allowlist`);
        return;
      }
    } catch {
      onError('Invalid embed URL');
      return;
    }

    // Set timeout for load failure
    const timeout = setTimeout(() => {
      if (!isLoaded) {
        onError('Embed took too long to load');
      }
    }, 30000);

    return () => clearTimeout(timeout);
  }, [embedUrl, isLoaded, onError]);

  const handleLoad = () => {
    setIsLoaded(true);
    onReady();
  };

  const handleError = () => {
    onError('Failed to load embed');
  };

  if (!embedUrl) {
    return null;
  }

  return (
    <div className="relative w-full" style={{ aspectRatio }}>
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400 text-sm">Loading game...</p>
          </div>
        </div>
      )}

      {/* Iframe with sandbox restrictions */}
      <iframe
        ref={iframeRef}
        src={embedUrl}
        title={`${project.title} Demo`}
        className={`absolute inset-0 w-full h-full border-0 ${isLoaded ? '' : 'invisible'}`}
        sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms"
        allow="autoplay; fullscreen; gamepad"
        allowFullScreen
        onLoad={handleLoad}
        onError={handleError}
      />

      {/* Fullscreen hint */}
      {isLoaded && (
        <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 rounded-lg text-white/80 text-xs backdrop-blur-sm">
          Press F for fullscreen
        </div>
      )}
    </div>
  );
}

export default StaticEmbedRuntime;
