// src/components/demos/runtimes/VideoRuntime.tsx
// Video playback runtime for projects with video-only demos

'use client';

import { useEffect, useState } from 'react';
import type { Project } from '@/data/projects';

interface VideoRuntimeProps {
  project: Project;
  onReady: () => void;
}

export function VideoRuntime({ project, onReady }: VideoRuntimeProps) {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const videos = project.videos;
  const currentVideo = videos[selectedVideoIndex];

  useEffect(() => {
    // Signal ready immediately
    onReady();
  }, [onReady]);

  if (videos.length === 0) {
    return (
      <div className="aspect-video bg-slate-800 flex items-center justify-center">
        <p className="text-gray-400">No videos available for this project</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900">
      {/* Main video player */}
      <div className="relative aspect-video bg-black">
        {!isPlaying ? (
          // Thumbnail with play button
          <div
            className="absolute inset-0 cursor-pointer group"
            onClick={() => setIsPlaying(true)}
          >
            {/* YouTube thumbnail */}
            <img
              src={`https://img.youtube.com/vi/${currentVideo.id}/maxresdefault.jpg`}
              alt={currentVideo.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to lower quality thumbnail
                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${currentVideo.id}/hqdefault.jpg`;
              }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Video title */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h4 className="text-white font-medium">{currentVideo.title}</h4>
              {currentVideo.description && (
                <p className="text-gray-300 text-sm mt-1 line-clamp-2">{currentVideo.description}</p>
              )}
            </div>
          </div>
        ) : (
          // YouTube iframe
          <iframe
            src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1&rel=0`}
            title={currentVideo.title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      {/* Video selector (if multiple videos) */}
      {videos.length > 1 && (
        <div className="p-4 border-t border-slate-700">
          <h4 className="text-white text-sm font-medium mb-3">More Videos ({videos.length})</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {videos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => {
                  setSelectedVideoIndex(index);
                  setIsPlaying(false);
                }}
                className={`relative aspect-video rounded-lg overflow-hidden group ${
                  index === selectedVideoIndex
                    ? 'ring-2 ring-blue-500'
                    : 'hover:ring-2 hover:ring-white/30'
                }`}
              >
                <img
                  src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

                {/* Current indicator */}
                {index === selectedVideoIndex && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-blue-500 rounded text-xs text-white font-medium">
                    Playing
                  </div>
                )}

                {/* Play icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-slate-900 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Title tooltip */}
                <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-xs truncate">{video.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoRuntime;
