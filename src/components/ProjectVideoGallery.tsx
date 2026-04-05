// src/components/ProjectVideoGallery.tsx
// Displays multiple development videos for a project
// Allows switching between videos with thumbnail selector

'use client';

import { useState } from 'react';
import Image from 'next/image';
import YouTubeEmbed from './YouTubeEmbed';

interface ProjectVideo {
  videoId: string;
  title: string;
  description?: string;
}

interface ProjectVideoGalleryProps {
  videos: ProjectVideo[];
  projectTitle: string;
}

// Multi-video gallery with thumbnail selector; wraps YouTubeEmbed for project detail pages.
export default function ProjectVideoGallery({ videos, projectTitle }: ProjectVideoGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState(0);

  // Return null if no videos - prevents rendering errors
  if (!videos || videos.length === 0) return null;

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
      <h4 className="text-lg font-bold text-[#FFCC00] mb-4 flex items-center gap-2">
        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
        </svg>
        Development Videos
      </h4>

      {/* Main video player */}
      <div className="mb-4">
        <YouTubeEmbed
          videoId={videos[selectedVideo].videoId}
          title={`${projectTitle} - ${videos[selectedVideo].title}`}
          thumbnailQuality="maxres"
        />
      </div>

      {/* Current video info */}
      <div className="mb-4">
        <h5 className="text-white font-semibold mb-1">{videos[selectedVideo].title}</h5>
        {videos[selectedVideo].description && (
          <p className="text-gray-300 text-sm">{videos[selectedVideo].description}</p>
        )}
      </div>

      {/* Video selector - only show if multiple videos */}
      {videos.length > 1 && (
        <div className="space-y-2">
          <p className="text-sm text-gray-400">More videos ({videos.length} total)</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {videos.map((video, index) => (
              <button
                key={video.videoId}
                onClick={() => setSelectedVideo(index)}
                className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                  selectedVideo === index
                    ? 'border-[#FFCC00] ring-2 ring-[#FFCC00]/50'
                    : 'border-slate-600 hover:border-slate-500'
                }`}
              >
                <Image
                  src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
