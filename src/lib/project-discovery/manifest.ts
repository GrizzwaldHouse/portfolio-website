// src/lib/project-discovery/manifest.ts
// Generates and manages the portfolio manifest - the source of truth

import {
  GitHubRepoMeta,
  PortfolioProject,
  PortfolioManifest,
  PortfolioRepoConfig,
  VisibilityRule,
  TOPIC_CLASSIFICATIONS,
} from './types';
import { analyzeRepository, generateTheme } from './analyzer';

const MANIFEST_VERSION = '1.0.0';
const GITHUB_USERNAME = 'GrizzwaldHouse';

/**
 * Known project overrides - manual configuration for existing projects
 * These take precedence over auto-detection
 */
const PROJECT_OVERRIDES: Record<string, Partial<PortfolioRepoConfig>> = {
  'Island-Escape': {
    title: 'Island Escape',
    subtitle: 'Team Voxel Survival Game',
    featured: true,
    role: 'Tool Programmer / Gameplay Engineer',
    itchUrl: 'https://theendisnear469.itch.io/island-escape',
    techStack: ['Unreal Engine 5.5', 'C++', 'Blueprints', 'Perforce'],
    highlights: [
      'Voxel world generation with noise algorithms',
      'Modular pickup & inventory system using inheritance',
      'Behavior tree-driven AI with multiple enemy types',
      'Channel-based teleportation with unlock mechanics',
      'Designer-controlled spawner system with delegates',
    ],
    videos: [
      { platform: 'youtube', id: 'ZCpSUudUw_s', title: 'Week 3 Demo', description: 'Progress demo showing gameplay and discovering bugs' },
      { platform: 'youtube', id: 'S9OA2Fw4X-8', title: 'Infinite Loop Bug Fixed', description: 'Debugging Unreal Engine teleporter crash - problem solving in action' },
      { platform: 'youtube', id: 'zor4x2sJPxk', title: 'Teleporter Setup', description: 'Setting up teleporters with collectables as unlock keys' },
      { platform: 'youtube', id: 'Rj14hSELIjg', title: 'Working Teleporter', description: 'Completed teleportation system demonstration' },
    ],
    runtime: {
      type: 'static-embed',
      config: { embedUrl: 'https://theendisnear469.itch.io/island-escape' },
    },
  },
  'Vulkan-Renderer': {
    title: 'Vulkan 3D Renderer',
    subtitle: 'Custom Graphics Engine',
    featured: true,
    role: 'Solo Developer',
    techStack: ['Vulkan API', 'C++20', 'GLSL', 'CMake'],
    highlights: [
      '7-lab progression through modern graphics programming',
      'PBR materials with IBL environment mapping',
      'Dynamic point and directional lighting',
      'glTF model loading with texture support',
      '35% performance optimization',
    ],
    videos: [
      { platform: 'youtube', id: 'aAfCGqoneE0', title: 'Vulkan Lab 5 Complete', description: 'PBR materials and advanced lighting implementation' },
      { platform: 'youtube', id: 'JHP08Y9DUrw', title: 'Vulkan Lab 4', description: 'Advanced rendering techniques' },
      { platform: 'youtube', id: 'j_4th-yiApU', title: 'Vulkan Lab 3 Complete', description: 'Texture mapping and glTF model loading' },
      { platform: 'youtube', id: 'imP-jELYEFs', title: 'Vulkan Lab 2 Complete', description: '3D transformations and camera setup' },
      { platform: 'youtube', id: 'idzluqUuCl8', title: 'Vulkan Lab 1 Complete', description: 'Vulkan initialization and triangle rendering' },
    ],
    runtime: {
      type: 'webgl-viewer',
    },
  },
  'WizardJam': {
    title: 'WizardJam',
    subtitle: 'Capstone Solo Project',
    featured: true,
    role: 'Solo Developer',
    techStack: ['Unreal Engine 5.5', 'C++', 'Blueprints', 'UnrealMCP'],
    highlights: [
      'AI-driven opponent behavior',
      'Physics-based gameplay mechanics',
      'Custom game modes and scoring',
      'UI/HUD implementation',
    ],
    videos: [
      { platform: 'youtube', id: 'QOwWiUufmdY', title: 'SpellUI Implementation', description: 'Health, stamina, and spell unlock UI with collectable system' },
      { platform: 'youtube', id: 'XWc_CkYSqdg', title: 'Week 3 Integration Demo', description: 'Weekly progress on capstone wizard game' },
    ],
    runtime: {
      type: 'video-only',
    },
  },
  'UnrealMCP': {
    title: 'UnrealMCP',
    subtitle: 'AI-Powered Editor Integration',
    featured: false,
    role: 'Solo Developer',
    techStack: ['Unreal Engine 5.5', 'C++', 'Python', 'FastMCP'],
    highlights: [
      'TCP/HTTP communication bridge',
      'Editor utility widget integration',
      'Real-time AI assistance in editor',
      'Command panel subsystem',
    ],
    videos: [
      { platform: 'youtube', id: '7-KiQXCuKj0', title: 'Day 2 Editor Tool', description: 'Integrating Claude AI to control Unreal Engine through MCP' },
      { platform: 'youtube', id: 'Z2Ueb9jB3n4', title: 'Day 5 UI Update', description: 'Adding UI and functions to UnrealMCP Editor tool' },
    ],
    runtime: {
      type: 'terminal-demo',
      config: {
        commands: ['mcp.spawn', 'mcp.modify', 'mcp.query', 'help'],
        welcomeMessage: 'UnrealMCP Terminal v1.0 - Type "help" for commands',
      },
    },
  },
  'MarcusDaley_SPAGHETTI_RELAY': {
    title: 'SPAGHETTI_RELAY',
    subtitle: 'Network Chat Server',
    featured: false,
    role: 'Solo Developer',
    techStack: ['C++', 'Winsock', 'Networking'],
    highlights: [
      'User authentication system',
      'Public and private messaging',
      'Session management and validation',
      'Real-time communication',
    ],
    videos: [
      { platform: 'youtube', id: 'pvL5sJztGoI', title: 'Full Server Demo', description: 'Enterprise-level C++ networking - complete multi-client chat demonstration' },
      { platform: 'youtube', id: '68hdU1IRkPM', title: 'Client-Server Demo', description: 'Demonstrating real-time client-server communication' },
    ],
    runtime: {
      type: 'terminal-demo',
      config: {
        shell: 'custom',
        welcomeMessage: 'SPAGHETTI_RELAY v1.0 - Simulated multi-client chat',
        commands: ['connect', 'login', 'send', 'whisper', 'users', 'help', 'quit'],
      },
    },
  },
  'TheDynamicDesign': {
    title: 'TheDynamicDesign',
    subtitle: 'Custom Engine Project',
    featured: false,
    role: 'Team Member',
    techStack: ['Custom Engine', 'C#', 'Team Collaboration'],
    highlights: [
      'Custom engine integration',
      'Team-based development',
      'Engine architecture patterns',
    ],
    runtime: {
      type: 'video-only',
    },
  },
};

/**
 * Resolve a GitHub repo to a full PortfolioProject
 */
export function resolveProject(
  repo: GitHubRepoMeta,
  config?: PortfolioRepoConfig
): PortfolioProject {
  // Get override config if exists
  const override = PROJECT_OVERRIDES[repo.name];
  const mergedConfig = { ...config, ...override };

  // Analyze the repository
  const analysis = analyzeRepository(repo);

  // Determine visibility
  let visibility: VisibilityRule = 'listed';
  if (mergedConfig.visibility) {
    visibility = mergedConfig.visibility;
  } else if (repo.isArchived) {
    visibility = 'archived';
  } else if (repo.isPrivate) {
    visibility = 'hidden';
  } else if (mergedConfig.featured) {
    visibility = 'featured';
  }

  // Check topic-based visibility
  for (const topic of repo.topics) {
    const classification = TOPIC_CLASSIFICATIONS[topic];
    if (classification?.visibility) {
      visibility = classification.visibility;
      break;
    }
  }

  // Determine featured status
  const featured = mergedConfig.featured ??
                   visibility === 'featured' ??
                   repo.topics.includes('portfolio-featured');

  // Build the project
  const project: PortfolioProject = {
    id: repo.name,
    slug: repo.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: mergedConfig.title ?? formatTitle(repo.name),
    subtitle: mergedConfig.subtitle ?? analysis.detectedType,
    description: mergedConfig.description ?? repo.description ?? 'No description available',
    projectType: mergedConfig.projectType ?? analysis.detectedType,
    visibility,
    featured,
    githubUrl: repo.htmlUrl,
    demoUrl: mergedConfig.demoUrl ?? repo.homepage ?? undefined,
    itchUrl: mergedConfig.itchUrl,
    thumbnail: mergedConfig.thumbnail,
    videos: mergedConfig.videos ?? [],
    role: mergedConfig.role ?? 'Developer',
    techStack: mergedConfig.techStack ?? [
      ...analysis.detectedTech,
      ...analysis.frameworks,
    ],
    highlights: mergedConfig.highlights ?? generateDefaultHighlights(analysis),
    runtime: {
      type: mergedConfig.runtime?.type ?? analysis.runtimeFeasibility,
      supported: isRuntimeSupported(mergedConfig.runtime?.type ?? analysis.runtimeFeasibility),
      config: mergedConfig.runtime?.config,
      fallbackVideo: mergedConfig.videos?.[0]?.id,
    },
    theme: generateTheme(repo, mergedConfig.projectType ?? analysis.detectedType),
    source: {
      github: repo,
      config: mergedConfig,
      analysis,
    },
    sortOrder: mergedConfig.sortOrder ?? (featured ? 0 : 100),
    lastUpdated: repo.pushedAt,
  };

  return project;
}

/**
 * Check if a runtime type is currently supported
 */
function isRuntimeSupported(type: string): boolean {
  const supportedRuntimes = ['static-embed', 'terminal-demo', 'video-only'];
  return supportedRuntimes.includes(type);
}

/**
 * Format repo name into display title
 */
function formatTitle(name: string): string {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Generate default highlights from analysis
 */
function generateDefaultHighlights(analysis: ReturnType<typeof analyzeRepository>): string[] {
  const highlights: string[] = [];

  if (analysis.frameworks.length > 0) {
    highlights.push(`Built with ${analysis.frameworks.join(', ')}`);
  }
  if (analysis.detectedTech.length > 0) {
    highlights.push(`Technologies: ${analysis.detectedTech.slice(0, 3).join(', ')}`);
  }
  if (analysis.hasTests) {
    highlights.push('Includes test suite');
  }
  if (analysis.hasCICD) {
    highlights.push('CI/CD pipeline configured');
  }

  return highlights;
}

/**
 * Generate the complete portfolio manifest
 */
export function generateManifest(
  repos: GitHubRepoMeta[],
  configs: Map<string, PortfolioRepoConfig> = new Map()
): PortfolioManifest {
  const projects = repos
    .filter(repo => !repo.isPrivate && !repo.isFork)
    .map(repo => resolveProject(repo, configs.get(repo.name)))
    .filter(project => project.visibility !== 'hidden')
    .sort((a, b) => {
      // Sort by: featured first, then by sort order, then by last updated
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
      return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    });

  const featuredProjects = projects.filter(p => p.featured);
  const runnableProjects = projects.filter(p => p.runtime.supported);

  return {
    version: MANIFEST_VERSION,
    generatedAt: new Date().toISOString(),
    generator: 'portfolio-discovery-system',
    config: {
      githubUsername: GITHUB_USERNAME,
      autoSyncEnabled: true,
      lastSyncAt: new Date().toISOString(),
      syncIntervalHours: 24,
    },
    projects,
    stats: {
      totalProjects: projects.length,
      featuredProjects: featuredProjects.length,
      runnableProjects: runnableProjects.length,
      lastUpdated: new Date().toISOString(),
    },
  };
}

/**
 * Convert manifest to static data format for Next.js
 */
export function manifestToStaticData(manifest: PortfolioManifest) {
  return {
    projects: manifest.projects.map(p => ({
      slug: p.slug,
      title: p.title,
      subtitle: p.subtitle,
      description: p.description,
      role: p.role,
      tech: p.techStack,
      highlights: p.highlights,
      github: p.githubUrl,
      itchUrl: p.itchUrl,
      featured: p.featured,
      theme: p.theme,
      runtime: p.runtime,
      videos: p.videos,
    })),
    stats: manifest.stats,
    lastUpdated: manifest.generatedAt,
  };
}
