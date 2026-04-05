import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import type { Project } from '@/data/projects';
import type { EnrichedGitHub } from '@/lib/types';
import { timeAgo } from '@/lib/utils';

const isPlayable = (project: Project) =>
  project.embed?.type === 'canvas' || project.embed?.type === 'iframe';

const categoryColors: Record<string, string> = {
  games: 'bg-[#D50032]',
  engine: 'bg-slate-600',
  tools: 'bg-[#3B82F6]',
  'ai-automation': 'bg-[#FFCC00] text-slate-900',
};

const categoryLabels: Record<string, string> = {
  games: 'Games',
  engine: 'Engine',
  tools: 'Tools',
  'ai-automation': 'AI',
};

interface ProjectCardProps {
  project: Project;
  github?: EnrichedGitHub;
}

// Glassmorphism card linking to a project detail page; shows thumbnail, tags, and optional GitHub stats.
export default function ProjectCard({ project, github }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group block bg-slate-800/50 backdrop-blur-sm rounded-xl border overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:ring-offset-2 focus:ring-offset-slate-900 hover:shadow-lg hover:-translate-y-1 ${isPlayable(project)
          ? 'border-[#FFCC00]/25 hover:border-[#FFCC00]/60 hover:shadow-[#FFCC00]/15'
          : 'border-slate-700 hover:border-[#FFCC00]/40 hover:shadow-[#FFCC00]/5'
        }`}
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-slate-700">
        <Image
          src={project.thumbnail}
          alt={`${project.title} thumbnail`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-medium text-white rounded ${categoryColors[project.category] ?? 'bg-slate-600'}`}>
          {categoryLabels[project.category] ?? project.category}
        </span>
        {isPlayable(project) && (
          <span className="absolute top-3 right-3 px-2 py-1 text-xs font-bold bg-[#FFCC00] text-slate-900 rounded shadow-lg shadow-[#FFCC00]/30">
            ▶ PLAY
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white group-hover:text-[#FFCC00] transition">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-gray-400 line-clamp-2">{project.tagline}</p>

        {/* Tech tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs bg-slate-700/80 text-gray-300 rounded border border-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* GitHub info */}
        {github && (github.stars > 0 || github.lastPushed) && (
          <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
            {github.stars > 0 && (
              <span className="inline-flex items-center gap-1 text-[#FFCC00]">
                <Star className="w-3 h-3" />
                {github.stars}
              </span>
            )}
            {github.lastPushed && (
              <span>Updated {timeAgo(github.lastPushed)}</span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
