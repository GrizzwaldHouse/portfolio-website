import { featuredProjects } from '@/data/projects';
import { fetchGitHubRepos, enrichProjectWithGitHub } from '@/lib/github';
import ProjectGrid from '@/components/projects/ProjectGrid';

// Server component that fetches GitHub data and renders the featured projects grid on the home page.
export default async function FeaturedProjects() {
  const repos = await fetchGitHubRepos('GrizzwaldHouse');

  const enriched = featuredProjects.map((project) => ({
    ...project,
    github: enrichProjectWithGitHub(project, repos),
  }));

  return (
    <section className="py-20 px-6 bg-slate-800/50" aria-label="Featured Projects">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#FFCC00] to-[#D50032] bg-clip-text text-transparent mb-8">
          Featured Projects
        </h2>
        <ProjectGrid projects={enriched} />
      </div>
    </section>
  );
}
