import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink, Download } from 'lucide-react';
import { projects } from '@/data/projects';
import { fetchGitHubRepos, enrichProjectWithGitHub } from '@/lib/github';
import { formatDate } from '@/lib/utils';
import DemoEmbed from '@/components/demos/DemoEmbed';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: project.title,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const repos = await fetchGitHubRepos('GrizzwaldHouse');
  const github = enrichProjectWithGitHub(project, repos);

  const hasPlayableDemo =
    project.embed?.type === 'canvas' || project.embed?.type === 'iframe';

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Back link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-[#FFCC00] transition mb-8 focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Projects
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-2 py-1 text-xs font-medium bg-[#FFCC00]/20 text-[#FFCC00] rounded">
            {project.category}
          </span>
          <span className="px-2 py-1 text-xs font-medium bg-slate-700 text-gray-300 rounded">
            {project.status}
          </span>
          {hasPlayableDemo && (
            <span className="px-2 py-1 text-xs font-bold bg-[#FFCC00]/20 text-[#FFCC00] rounded border border-[#FFCC00]/30 animate-pulse">
              ▶ PLAYABLE
            </span>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          {project.title}
        </h1>
        <p className="mt-2 text-lg text-gray-400">{project.tagline}</p>
        <p className="mt-1 text-sm text-gray-500">
          {project.role} &middot; {formatDate(project.date)}
        </p>
      </div>

      {/* Interactive demo (for canvas/iframe projects) */}
      {hasPlayableDemo && (
        <div className="mb-10">
          <h2 className="text-sm font-semibold text-[#FFCC00] uppercase tracking-wide mb-3">
            🎮 Live Demo
          </h2>
          <DemoEmbed
            slug={project.slug}
            embedType={project.embed!.type}
            demoUrl={project.links.demo}
            title={project.title}
            width={project.embed?.width}
            height={project.embed?.height}
          />
        </div>
      )}

      {/* Hero media (for non-demo projects) */}
      {!hasPlayableDemo && (
        <div className="mb-10 rounded-xl overflow-hidden bg-slate-800 border border-slate-700">
          {project.links.video ? (
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={project.links.video.replace('watch?v=', 'embed/')}
                title={`${project.title} — Video Demo`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          ) : (
            <div className="relative h-64 md:h-96">
              <Image
                src={project.heroMedia}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
          )}
        </div>
      )}

      {/* Description */}
      <div className="mb-10">
        <p className="text-gray-300 leading-relaxed">{project.description}</p>
      </div>

      {/* Tech tags */}
      <div className="mb-10">
        <h2 className="text-sm font-semibold text-[#FFCC00] uppercase tracking-wide mb-3">
          Tech Stack
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm bg-slate-800 text-gray-300 rounded-lg border border-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Contributions */}
      <div className="mb-10">
        <h2 className="text-sm font-semibold text-[#FFCC00] uppercase tracking-wide mb-3">
          Contributions
        </h2>
        <ul className="space-y-2">
          {project.contributions.map((item) => (
            <li key={item} className="flex items-start gap-2 text-gray-300">
              <span className="text-[#FFCC00] mt-1 flex-shrink-0">&#8226;</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Technical highlights */}
      <div className="mb-10">
        <h2 className="text-sm font-semibold text-[#FFCC00] uppercase tracking-wide mb-3">
          Technical Highlights
        </h2>
        <ul className="space-y-2">
          {project.technicalHighlights.map((item) => (
            <li key={item} className="flex items-start gap-2 text-gray-300">
              <span className="text-emerald-400 mt-1 flex-shrink-0">&#8226;</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* GitHub info */}
      {github.stars > 0 && (
        <div className="mb-10 p-4 bg-slate-800/50 rounded-lg border border-slate-700 text-sm text-gray-400">
          <span className="text-[#FFCC00]">{github.stars} stars</span> &middot;{' '}
          {github.liveLanguage && `Primary language: ${github.liveLanguage} · `}
          {github.lastPushed && `Last updated: ${formatDate(github.lastPushed)}`}
        </div>
      )}

      {/* Links */}
      <div className="flex flex-wrap gap-3">
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <Github className="w-5 h-5" />
            View Source
          </a>
        )}
        {project.links.demo && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#FFCC00] to-[#D50032] text-slate-900 font-semibold rounded-xl hover:shadow-lg hover:shadow-[#FFCC00]/20 transition focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <ExternalLink className="w-5 h-5" />
            Live Demo
          </a>
        )}
        {project.links.download && (
          <a
            href={project.links.download}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-600 text-gray-300 rounded-xl hover:border-slate-500 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <Download className="w-5 h-5" />
            Download
          </a>
        )}
      </div>
    </div>
  );
}
