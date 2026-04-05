import type { GitHubRepo, EnrichedGitHub } from './types';

/**
 * Fetches the raw README content for a GitHub repository.
 *
 * Uses the `application/vnd.github.v3.raw` accept header to get plain markdown
 * instead of base64-encoded content. Results are ISR-cached for 1 hour (3600s).
 * Authenticates with GITHUB_TOKEN when available (raises rate limit from 60 to 5000 req/hr).
 *
 * @param owner - GitHub username or organization (e.g., "GrizzwaldHouse").
 * @param repo  - Repository name (e.g., "portfolio-website").
 * @returns Raw README markdown string, or null if not found / request fails.
 */
export async function fetchRepoReadme(
  owner: string,
  repo: string,
): Promise<string | null> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3.raw',
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      {
        headers,
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) return null;
    return res.text();
  } catch {
    return null;
  }
}

/**
 * Fetches all public repositories for a GitHub user, sorted by most recently pushed.
 *
 * Called at build time by Next.js ISR (not at runtime in the browser).
 * Revalidates every hour (3600s) so project pages stay reasonably fresh.
 * Without a GITHUB_TOKEN, the unauthenticated rate limit is 60 requests/hour;
 * with a token it rises to 5000/hour.
 *
 * @param username - GitHub username (e.g., "GrizzwaldHouse").
 * @returns Array of {@link GitHubRepo} objects, or empty array on failure.
 */
export async function fetchGitHubRepos(
  username: string,
): Promise<GitHubRepo[]> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`,
      {
        headers,
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) {
      console.error(
        `GitHub API responded with ${res.status}: ${res.statusText}`,
      );
      return [];
    }

    return res.json();
  } catch (error) {
    console.error('Failed to fetch GitHub repos:', error);
    return [];
  }
}

/**
 * Enriches a curated project entry with live GitHub metadata.
 *
 * Matches by comparing `project.repoName` (case-insensitive) against the
 * fetched repo list. Returns default empty values when no match is found,
 * so callers never need null-checking on the return shape.
 *
 * @param project - A project object with an optional `repoName` field.
 * @param repos   - The full list of repos from {@link fetchGitHubRepos}.
 * @returns An {@link EnrichedGitHub} object with stars, lastPushed, language, and topics.
 */
export function enrichProjectWithGitHub(
  project: { repoName?: string },
  repos: GitHubRepo[],
): EnrichedGitHub {
  if (!project.repoName) {
    return { lastPushed: null, stars: 0, liveLanguage: null };
  }

  const repo = repos.find(
    (r) => r.name.toLowerCase() === project.repoName!.toLowerCase(),
  );

  if (!repo) {
    return { lastPushed: null, stars: 0, liveLanguage: null };
  }

  return {
    lastPushed: repo.pushed_at,
    stars: repo.stargazers_count,
    liveLanguage: repo.language,
    topics: repo.topics,
  };
}
