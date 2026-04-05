import { Suspense } from 'react';
import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import { fetchGitHubRepos, enrichProjectWithGitHub } from '@/lib/github';
import CategoryFilter from '@/components/projects/CategoryFilter';
import ProjectGrid from '@/components/projects/ProjectGrid';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore game development projects including Unreal Engine, Unity, custom C++ engines, and AI automation tools.',
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const repos = await fetchGitHubRepos('GrizzwaldHouse');

  const enriched = projects.map((project) => ({
    ...project,
    github: enrichProjectWithGitHub(project, repos),
  }));

  const filtered =
    category && category !== 'all'
      ? enriched.filter((p) => p.category === category)
      : enriched;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FFCC00] to-[#D50032] bg-clip-text text-transparent mb-2">
        Projects
      </h1>
      <p className="text-gray-400 mb-8">
        Game systems, custom engines, developer tools, and AI automation &mdash;
        all built with a QA-first mindset.
      </p>

      <Suspense fallback={null}>
        <CategoryFilter />
      </Suspense>
      <ProjectGrid projects={filtered} />
    </div>
  );
}
