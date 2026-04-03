// ProjectRepository.ts
// Developer: Marcus Daley
// Date: 2026-04-03
// Purpose: Merges GitHub API data with local project overrides. Featured projects get
//          enriched descriptions; new repos automatically appear as additional projects.

import { GitHubRepo, Project } from '@/types/project';
import { PROJECT_OVERRIDES } from '@/data/projectOverrides';

const GITHUB_BASE_URL = 'https://github.com/GrizzwaldHouse';

export function mergeProjectData(repos: GitHubRepo[]): Project[] {
  const projects: Project[] = [];

  for (const repo of repos) {
    const override = PROJECT_OVERRIDES.find(
      (o) => o.slug.toLowerCase() === repo.name.toLowerCase()
    );

    const project: Project = {
      slug: repo.name,
      title: override?.title ?? formatRepoName(repo.name),
      subtitle: override?.subtitle ?? (repo.description ?? ''),
      description: override?.description ?? (repo.description ?? 'No description available.'),
      role: override?.role ?? 'Developer',
      tech: override?.tech ?? buildTechFromRepo(repo),
      highlights: override?.highlights ?? [],
      github: repo.html_url,
      itchUrl: override?.itchUrl,
      featured: override?.featured ?? false,
      theme: override?.theme ?? 'default',
      language: repo.language,
      stars: repo.stargazers_count,
      lastUpdated: repo.updated_at,
    };

    projects.push(project);
  }

  // Include overrides for repos that might not be returned by the API
  for (const override of PROJECT_OVERRIDES) {
    const exists = projects.some(
      (p) => p.slug.toLowerCase() === override.slug.toLowerCase()
    );
    if (!exists) {
      projects.push({
        slug: override.slug,
        title: override.title ?? override.slug,
        subtitle: override.subtitle ?? '',
        description: override.description ?? '',
        role: override.role ?? 'Developer',
        tech: override.tech ?? [],
        highlights: override.highlights ?? [],
        github: `${GITHUB_BASE_URL}/${override.slug}`,
        itchUrl: override.itchUrl,
        featured: override.featured ?? false,
        theme: override.theme ?? 'default',
        language: null,
        stars: 0,
        lastUpdated: new Date().toISOString(),
      });
    }
  }

  // Sort: featured first, then by last updated
  return projects.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
  });
}

function formatRepoName(name: string): string {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function buildTechFromRepo(repo: GitHubRepo): string[] {
  const tech: string[] = [];
  if (repo.language) tech.push(repo.language);
  if (repo.topics.length > 0) tech.push(...repo.topics.slice(0, 3));
  return tech;
}
