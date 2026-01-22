// src/lib/project-discovery/types.ts
// Core type definitions for the project discovery and runtime system

/**
 * Runtime feasibility classification
 * Determines what kind of demo can be provided for each project
 */
export type RuntimeFeasibility =
  | 'wasm-game'        // Full WASM game (Unreal/Unity WebGL export)
  | 'webgl-viewer'     // 3D model viewer (Three.js based)
  | 'code-playground'  // Interactive code demo
  | 'terminal-demo'    // CLI/terminal emulator
  | 'static-embed'     // External embed (itch.io, CodePen)
  | 'video-only'       // YouTube/video demo only
  | 'non-runnable';    // Read-only showcase

/**
 * Project type classification based on repository analysis
 */
export type ProjectType =
  | 'game'
  | 'graphics-engine'
  | 'renderer'
  | 'tool'
  | 'cli'
  | 'library'
  | 'simulation'
  | 'web-app'
  | 'other';

/**
 * Visibility rules for portfolio inclusion
 */
export type VisibilityRule =
  | 'featured'      // Prominent display with full demo support
  | 'listed'        // Standard listing
  | 'hidden'        // Excluded from portfolio
  | 'archived';     // Shown in archive section

/**
 * GitHub repository metadata from API
 */
export interface GitHubRepoMeta {
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  htmlUrl: string;
  homepage: string | null;
  primaryLanguage: string | null;
  languages: Record<string, number>;
  topics: string[];
  isArchived: boolean;
  isPrivate: boolean;
  isFork: boolean;
  stargazersCount: number;
  forksCount: number;
  pushedAt: string;
  createdAt: string;
  updatedAt: string;
  defaultBranch: string;
  hasReadme: boolean;
  license: string | null;
}

/**
 * Portfolio-specific configuration that can be placed in repo
 * File: .portfolio.yml or .portfolio.json
 */
export interface PortfolioRepoConfig {
  // Display settings
  title?: string;              // Override repo name
  subtitle?: string;           // Short tagline
  description?: string;        // Override repo description

  // Classification
  featured?: boolean;          // Force featured status
  visibility?: VisibilityRule; // Override visibility
  projectType?: ProjectType;   // Manual classification

  // Runtime configuration
  runtime?: {
    type: RuntimeFeasibility;
    config?: Record<string, unknown>;
  };

  // Media assets
  thumbnail?: string;          // Path to thumbnail in repo
  videos?: Array<{
    platform: 'youtube' | 'vimeo';
    id: string;
    title: string;
    description?: string;
  }>;

  // Links
  demoUrl?: string;            // Live demo URL
  itchUrl?: string;            // itch.io page

  // Metadata
  role?: string;               // Developer's role
  highlights?: string[];       // Key features
  techStack?: string[];        // Override detected technologies

  // Sorting
  sortOrder?: number;          // Manual sort priority
}

/**
 * Detected project characteristics from repo analysis
 */
export interface ProjectAnalysis {
  // Language breakdown
  primaryLanguage: string | null;
  languageBreakdown: Array<{
    language: string;
    percentage: number;
    bytes: number;
  }>;

  // Project type detection
  detectedType: ProjectType;
  typeConfidence: number;      // 0-1 confidence score
  typeSignals: string[];       // What signals led to classification

  // Runtime feasibility
  runtimeFeasibility: RuntimeFeasibility;
  runtimeSignals: string[];    // Why this runtime was chosen

  // Tech stack detection
  detectedTech: string[];
  frameworks: string[];
  buildSystems: string[];

  // Quality signals
  hasTests: boolean;
  hasCICD: boolean;
  hasDocumentation: boolean;
  lastActivity: string;
  activityScore: number;       // 0-100 based on recency
}

/**
 * Fully resolved project for portfolio display
 */
export interface PortfolioProject {
  // Identity
  id: string;                  // Unique identifier (repo name)
  slug: string;                // URL-safe slug

  // Display info
  title: string;
  subtitle: string;
  description: string;

  // Classification
  projectType: ProjectType;
  visibility: VisibilityRule;
  featured: boolean;

  // Links
  githubUrl: string;
  demoUrl?: string;
  itchUrl?: string;

  // Media
  thumbnail?: string;
  videos: Array<{
    platform: 'youtube' | 'vimeo';
    id: string;
    title: string;
    description?: string;
  }>;

  // Technical details
  role: string;
  techStack: string[];
  highlights: string[];

  // Runtime
  runtime: {
    type: RuntimeFeasibility;
    supported: boolean;
    config?: Record<string, unknown>;
    fallbackVideo?: string;
  };

  // Theming
  theme: 'default' | 'hogwarts' | 'cyberpunk' | 'nature' | 'terminal';

  // Metadata
  source: {
    github: GitHubRepoMeta;
    config?: PortfolioRepoConfig;
    analysis: ProjectAnalysis;
  };

  // Sorting
  sortOrder: number;
  lastUpdated: string;
}

/**
 * The master manifest - source of truth for the portfolio
 */
export interface PortfolioManifest {
  // Metadata
  version: string;
  generatedAt: string;
  generator: string;

  // Configuration
  config: {
    githubUsername: string;
    autoSyncEnabled: boolean;
    lastSyncAt: string | null;
    syncIntervalHours: number;
  };

  // Projects
  projects: PortfolioProject[];

  // Statistics
  stats: {
    totalProjects: number;
    featuredProjects: number;
    runnableProjects: number;
    lastUpdated: string;
  };
}

/**
 * Topic-based classification rules
 */
export const TOPIC_CLASSIFICATIONS: Record<string, Partial<PortfolioRepoConfig>> = {
  // Visibility
  'portfolio-featured': { featured: true, visibility: 'featured' },
  'portfolio-hidden': { visibility: 'hidden' },
  'portfolio-archived': { visibility: 'archived' },

  // Project types
  'game': { projectType: 'game' },
  'game-engine': { projectType: 'graphics-engine' },
  'renderer': { projectType: 'renderer' },
  'tool': { projectType: 'tool' },
  'cli': { projectType: 'cli' },

  // Themes
  'unreal-engine': { techStack: ['Unreal Engine'] },
  'unity': { techStack: ['Unity'] },
  'vulkan': { techStack: ['Vulkan API'] },
  'opengl': { techStack: ['OpenGL'] },
};

/**
 * Language to project type heuristics
 */
export const LANGUAGE_HEURISTICS: Record<string, ProjectType[]> = {
  'C++': ['game', 'graphics-engine', 'renderer', 'tool'],
  'C#': ['game', 'tool', 'web-app'],
  'GLSL': ['renderer', 'graphics-engine'],
  'HLSL': ['renderer', 'graphics-engine'],
  'Python': ['tool', 'cli', 'simulation'],
  'JavaScript': ['web-app', 'tool'],
  'TypeScript': ['web-app', 'tool'],
  'Rust': ['game', 'tool', 'cli'],
};

/**
 * File patterns that indicate project characteristics
 */
export const FILE_INDICATORS = {
  unrealEngine: ['.uproject', 'Source/', 'Content/', 'Config/DefaultEngine.ini'],
  unity: ['.unity', 'Assets/', 'ProjectSettings/'],
  vulkan: ['vulkan', 'VkInstance', 'vkCreateDevice'],
  cmake: ['CMakeLists.txt', '.cmake'],
  tests: ['test/', 'tests/', '__tests__/', 'spec/', '.test.', '.spec.'],
  cicd: ['.github/workflows/', '.gitlab-ci.yml', 'Jenkinsfile', '.circleci/'],
  docs: ['README.md', 'docs/', 'DOCUMENTATION.md'],
};
