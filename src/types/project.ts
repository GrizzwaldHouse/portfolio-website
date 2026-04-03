// project.ts
// Developer: Marcus Daley
// Date: 2026-04-03
// Purpose: Type definitions for the dynamic project loading system. Defines the GitHub
//          repo shape, enriched project interface, display configuration, and override
//          structure for featured projects.

export interface GitHubRepo {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  updated_at: string;
  created_at: string;
  fork: boolean;
  archived: boolean;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  role: string;
  tech: string[];
  highlights: string[];
  github: string;
  itchUrl?: string;
  featured: boolean;
  theme: 'nature' | 'cyberpunk' | 'hogwarts' | 'default';
  // Fields from GitHub API
  language: string | null;
  stars: number;
  lastUpdated: string;
}

export interface ProjectOverride {
  slug: string;
  title?: string;
  subtitle?: string;
  description?: string;
  role?: string;
  tech?: string[];
  highlights?: string[];
  itchUrl?: string;
  featured?: boolean;
  theme?: Project['theme'];
}

export interface DisplayConfig {
  defaultCount: number;
  options: number[];
}

export const DISPLAY_CONFIG: DisplayConfig = {
  defaultCount: 6,
  options: [3, 6, 9],
};
