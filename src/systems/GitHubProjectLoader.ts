// GitHubProjectLoader.ts
// Developer: Marcus Daley
// Date: 2026-04-03
// Purpose: Fetches public repositories from the GitHub API for the dynamic project
//          system. Uses Next.js ISR (revalidate: 3600) so new repos appear within
//          an hour without code changes. Filters out forks and archived repos.

import { GitHubRepo } from '@/types/project';

const GITHUB_USERNAME = 'GrizzwaldHouse';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;
const CACHE_REVALIDATE_SECONDS = 3600;

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_URL}?per_page=100&sort=updated&direction=desc`,
      {
        next: { revalidate: CACHE_REVALIDATE_SECONDS },
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      console.error(`[GitHubProjectLoader] API returned ${response.status}`);
      return [];
    }

    const repos: GitHubRepo[] = await response.json();

    // Filter out forks and archived repos
    return repos.filter((repo) => !repo.fork && !repo.archived);
  } catch (error) {
    console.error('[GitHubProjectLoader] Failed to fetch repos:', error);
    return [];
  }
}
