import type { GitHubRepo, EnrichedGitHub } from './types';

/**
 * Fetches the raw README content for a specific repository.
 * Returns null if the repo has no README or the request fails.
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
 * Fetches all public repos for the given GitHub username.
 * Called at BUILD TIME via Next.js ISR — not at runtime.
 * Revalidates every hour (3600 seconds).
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
 * Enriches curated project data with live GitHub metadata.
 * Called in server components at build time.
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
