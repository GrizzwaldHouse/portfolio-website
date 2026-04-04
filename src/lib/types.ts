export interface GitHubRepo {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  updated_at: string;
  pushed_at: string;
  stargazers_count: number;
  topics: string[];
  default_branch: string;
}

export interface EnrichedGitHub {
  lastPushed: string | null;
  stars: number;
  liveLanguage: string | null;
  topics?: string[];
  readme?: string;
}
