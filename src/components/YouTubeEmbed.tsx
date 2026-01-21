// src/components/YouTubeEmbed.tsx
// Lazy-loading YouTube embed component
// Shows thumbnail first, loads iframe on click for better performance

'use client';

import { useState } from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  thumbnailQuality?: 'default' | 'mq' | 'hq' | 'sd' | 'maxres';
  className?: string;
}

export default function YouTubeEmbed({
  videoId,
  title,
  thumbnailQuality = 'hq',
  className = ''
}: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${thumbnailQuality}default.jpg`;

  if (!isLoaded) {
    return (
      <div
        className={`relative aspect-video bg-slate-800 rounded-lg overflow-hidden cursor-pointer group ${className}`}
        onClick={() => setIsLoaded(true)}
        role="button"
        aria-label={`Play video: ${title}`}
      >
        <img
          src={thumbnailUrl}
          alt={`Video thumbnail: ${title}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-500 group-hover:scale-110 transition-all shadow-2xl">
            <svg className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-white text-sm md:text-base font-medium truncate">{title}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative aspect-video rounded-lg overflow-hidden ${className}`}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
