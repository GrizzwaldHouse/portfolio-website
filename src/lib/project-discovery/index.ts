// src/lib/project-discovery/index.ts
// Main entry point for the project discovery system

export * from './types';
export * from './analyzer';
export * from './manifest';

import { GitHubRepoMeta, PortfolioManifest } from './types';
import { generateManifest, manifestToStaticData } from './manifest';

/**
 * GitHub API client for fetching repository data
 * Used during build time for static generation
 */
export async function fetchGitHubRepos(
  username: string,
  token?: string
): Promise<GitHubRepoMeta[]> {
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'portfolio-discovery-system',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const repos: GitHubRepoMeta[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}&sort=updated`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.length === 0) break;

    for (const repo of data) {
      // Fetch languages for each repo
      const langResponse = await fetch(repo.languages_url, { headers });
      const languages = langResponse.ok ? await langResponse.json() : {};

      repos.push({
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        url: repo.url,
        htmlUrl: repo.html_url,
        homepage: repo.homepage,
        primaryLanguage: repo.language,
        languages,
        topics: repo.topics || [],
        isArchived: repo.archived,
        isPrivate: repo.private,
        isFork: repo.fork,
        stargazersCount: repo.stargazers_count,
        forksCount: repo.forks_count,
        pushedAt: repo.pushed_at,
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        defaultBranch: repo.default_branch,
        hasReadme: true, // Assume true, would need additional API call to verify
        license: repo.license?.spdx_id || null,
      });
    }

    if (data.length < perPage) break;
    page++;
  }

  return repos;
}

/**
 * Build the portfolio manifest from GitHub data
 * This should be run at build time or via a scheduled job
 */
export async function buildPortfolioManifest(
  username: string = 'GrizzwaldHouse',
  token?: string
): Promise<PortfolioManifest> {
  console.log(`[Portfolio Discovery] Fetching repos for ${username}...`);
  const repos = await fetchGitHubRepos(username, token);
  console.log(`[Portfolio Discovery] Found ${repos.length} repositories`);

  console.log('[Portfolio Discovery] Generating manifest...');
  const manifest = generateManifest(repos);
  console.log(`[Portfolio Discovery] Generated manifest with ${manifest.projects.length} projects`);

  return manifest;
}

/**
 * Get static project data for Next.js pages
 * Falls back to hardcoded data if manifest doesn't exist
 */
export function getStaticProjectData() {
  // For now, return the hardcoded overrides as the source of truth
  // In production, this would read from generated manifest
  return manifestToStaticData(generateManifestFromOverrides());
}

/**
 * Generate manifest from hardcoded overrides (fallback mode)
 */
function generateManifestFromOverrides(): PortfolioManifest {
  // Create mock GitHub repo data from our known projects
  const mockRepos: GitHubRepoMeta[] = [
    createMockRepo('Island-Escape', 'A voxel-based survival game built in Unreal Engine 5.5', 'C++', ['unreal-engine', 'game', 'c++']),
    createMockRepo('Vulkan-Renderer', 'Custom 3D graphics rendering engine built with Vulkan API', 'C++', ['vulkan', 'graphics', 'renderer']),
    createMockRepo('WizardJam', 'Wizard game built in Unreal Engine - Solo capstone project', 'C++', ['unreal-engine', 'game']),
    createMockRepo('UnrealMCP', 'Custom C++ subsystem enabling Claude AI assistance within Unreal Engine', 'C++', ['unreal-engine', 'tool', 'ai']),
    createMockRepo('MarcusDaley_SPAGHETTI_RELAY', 'Communication chat server with user authentication', 'C++', ['networking', 'c++', 'cli']),
    createMockRepo('TheDynamicDesign', 'Group project using a custom game engine', 'C#', ['game', 'engine']),
  ];

  return generateManifest(mockRepos);
}

function createMockRepo(
  name: string,
  description: string,
  language: string,
  topics: string[]
): GitHubRepoMeta {
  return {
    name,
    fullName: `GrizzwaldHouse/${name}`,
    description,
    url: `https://api.github.com/repos/GrizzwaldHouse/${name}`,
    htmlUrl: `https://github.com/GrizzwaldHouse/${name}`,
    homepage: null,
    primaryLanguage: language,
    languages: { [language]: 10000 },
    topics,
    isArchived: false,
    isPrivate: false,
    isFork: false,
    stargazersCount: 0,
    forksCount: 0,
    pushedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    defaultBranch: 'main',
    hasReadme: true,
    license: null,
  };
}

/**
 * Validate a .portfolio.yml or .portfolio.json config
 */
export function validatePortfolioConfig(config: unknown): config is import('./types').PortfolioRepoConfig {
  if (typeof config !== 'object' || config === null) return false;

  const c = config as Record<string, unknown>;

  // Check optional string fields
  const stringFields = ['title', 'subtitle', 'description', 'demoUrl', 'itchUrl', 'role', 'thumbnail'];
  for (const field of stringFields) {
    if (c[field] !== undefined && typeof c[field] !== 'string') return false;
  }

  // Check optional boolean fields
  if (c.featured !== undefined && typeof c.featured !== 'boolean') return false;

  // Check optional array fields
  if (c.highlights !== undefined && !Array.isArray(c.highlights)) return false;
  if (c.techStack !== undefined && !Array.isArray(c.techStack)) return false;
  if (c.videos !== undefined && !Array.isArray(c.videos)) return false;

  return true;
}
