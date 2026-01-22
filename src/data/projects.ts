// src/data/projects.ts
// Unified project data - the source of truth for all project display
// Generated from the project discovery system with manual overrides

import type { RuntimeFeasibility } from '@/lib/project-discovery/types';

export interface ProjectRuntime {
  type: RuntimeFeasibility;
  supported: boolean;
  config?: Record<string, unknown>;
  fallbackVideo?: string;
}

export interface ProjectVideo {
  platform: 'youtube' | 'vimeo';
  id: string;
  title: string;
  description?: string;
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
  demoUrl?: string;
  featured: boolean;
  theme: 'default' | 'hogwarts' | 'cyberpunk' | 'nature' | 'terminal';
  runtime: ProjectRuntime;
  videos: ProjectVideo[];
}

/**
 * All portfolio projects with full metadata
 * Order determines display priority (featured projects first)
 */
export const projects: Project[] = [
  {
    slug: 'island-escape',
    title: 'Island Escape',
    subtitle: 'Team Voxel Survival Game',
    description: 'A voxel-based survival game built in Unreal Engine 5.5, featuring procedural terrain generation, AI combat systems, and comprehensive tool programming. Developed as a team project focusing on reusable, designer-friendly gameplay systems.',
    role: 'Tool Programmer / Gameplay Engineer',
    tech: ['Unreal Engine 5.5', 'C++', 'Blueprints', 'Perforce'],
    highlights: [
      'Voxel world generation with noise algorithms',
      'Modular pickup & inventory system using inheritance',
      'Behavior tree-driven AI with multiple enemy types',
      'Channel-based teleportation with unlock mechanics',
      'Designer-controlled spawner system with delegates',
    ],
    github: 'https://github.com/GrizzwaldHouse/Island-Escape',
    itchUrl: 'https://theendisnear469.itch.io/island-escape',
    featured: true,
    theme: 'nature',
    runtime: {
      type: 'static-embed',
      supported: true,
      config: {
        embedUrl: 'https://itch.io/embed-upload/12757498?color=2d2d2d',
        aspectRatio: '16/10',
        minWidth: 800,
        minHeight: 600,
      },
      fallbackVideo: 'ZCpSUudUw_s',
    },
    videos: [
      { platform: 'youtube', id: 'ZCpSUudUw_s', title: 'Week 3 Demo', description: 'Progress demo showing gameplay and discovering bugs' },
      { platform: 'youtube', id: 'S9OA2Fw4X-8', title: 'Infinite Loop Bug Fixed', description: 'Debugging Unreal Engine teleporter crash - problem solving in action' },
      { platform: 'youtube', id: 'zor4x2sJPxk', title: 'Teleporter Setup', description: 'Setting up teleporters with collectables as unlock keys' },
      { platform: 'youtube', id: 'Rj14hSELIjg', title: 'Working Teleporter', description: 'Completed teleportation system demonstration' },
    ],
  },
  {
    slug: 'vulkan-renderer',
    title: 'Vulkan 3D Renderer',
    subtitle: 'Custom Graphics Engine with PBR',
    description: 'A custom 3D graphics rendering engine built with Vulkan API, featuring physically-based rendering with tangent-space normal mapping. Recently debugged and fixed shader math issues where normal maps were computed but not applied to lighting calculations—demonstrating deep understanding of the graphics pipeline and HLSL shader debugging.',
    role: 'Solo Developer',
    tech: ['Vulkan API', 'C++20', 'HLSL', 'CMake', 'Graphics Debugging'],
    highlights: [
      'PBR materials with Cook-Torrance BRDF and IBL',
      'Tangent-space normal mapping with TBN matrix transforms',
      'Debugged shader lighting bug: identified unused worldNormal in diffuse/specular calculations',
      'Fixed normal map Y-axis conversion for DirectX coordinate system',
      'glTF model loading with full texture pipeline',
    ],
    github: 'https://github.com/GrizzwaldHouse/Vulkan-Renderer',
    featured: true,
    theme: 'cyberpunk',
    runtime: {
      type: 'webgl-viewer',
      supported: false, // Will be enabled when 3D assets are prepared
      fallbackVideo: 'aAfCGqoneE0',
    },
    videos: [
      { platform: 'youtube', id: 'aAfCGqoneE0', title: 'Vulkan Lab 5 Complete', description: 'PBR materials and advanced lighting implementation' },
      { platform: 'youtube', id: 'JHP08Y9DUrw', title: 'Vulkan Lab 4', description: 'Advanced rendering techniques' },
      { platform: 'youtube', id: 'j_4th-yiApU', title: 'Vulkan Lab 3 Complete', description: 'Texture mapping and glTF model loading' },
      { platform: 'youtube', id: 'imP-jELYEFs', title: 'Vulkan Lab 2 Complete', description: '3D transformations and camera setup' },
      { platform: 'youtube', id: 'idzluqUuCl8', title: 'Vulkan Lab 1 Complete', description: 'Vulkan initialization and triangle rendering' },
    ],
  },
  {
    slug: 'wizardjam',
    title: 'WizardJam',
    subtitle: 'Capstone Solo Project',
    description: 'A wizard game built in Unreal Engine starting with a Quidditch-style match between player and AI agents. Solo capstone project demonstrating end-to-end game development skills.',
    role: 'Solo Developer',
    tech: ['Unreal Engine 5.5', 'C++', 'Blueprints', 'UnrealMCP'],
    highlights: [
      'AI-driven opponent behavior',
      'Physics-based gameplay mechanics',
      'Custom game modes and scoring',
      'UI/HUD implementation',
    ],
    github: 'https://github.com/GrizzwaldHouse/WizardJam',
    featured: true,
    theme: 'hogwarts',
    runtime: {
      type: 'video-only',
      supported: true,
      fallbackVideo: 'QOwWiUufmdY',
    },
    videos: [
      { platform: 'youtube', id: 'QOwWiUufmdY', title: 'SpellUI Implementation', description: 'Health, stamina, and spell unlock UI with collectable system' },
      { platform: 'youtube', id: 'XWc_CkYSqdg', title: 'Week 3 Integration Demo', description: 'Weekly progress on capstone wizard game' },
    ],
  },
  {
    slug: 'unrealmcp',
    title: 'UnrealMCP',
    subtitle: 'AI-Powered Editor Integration',
    description: 'Custom C++ subsystem enabling Claude AI assistance directly within Unreal Engine development workflows. Bridges AI capabilities with editor utilities for enhanced productivity.',
    role: 'Solo Developer',
    tech: ['Unreal Engine 5.5', 'C++', 'Python', 'FastMCP'],
    highlights: [
      'TCP/HTTP communication bridge',
      'Editor utility widget integration',
      'Real-time AI assistance in editor',
      'Command panel subsystem',
    ],
    github: 'https://github.com/GrizzwaldHouse/UnrealMCP',
    featured: true,
    theme: 'cyberpunk',
    runtime: {
      type: 'terminal-demo',
      supported: true,
      config: {
        shell: 'custom',
        welcomeMessage: 'UnrealMCP Terminal v1.0 - Type "help" for available commands',
        prompt: 'UE5> ',
        commands: ['mcp.spawn', 'mcp.modify', 'mcp.query', 'mcp.list', 'help', 'clear'],
      },
      fallbackVideo: '7-KiQXCuKj0',
    },
    videos: [
      { platform: 'youtube', id: '7-KiQXCuKj0', title: 'Day 2 Editor Tool', description: 'Integrating Claude AI to control Unreal Engine through MCP' },
      { platform: 'youtube', id: 'Z2Ueb9jB3n4', title: 'Day 5 UI Update', description: 'Adding UI and functions to UnrealMCP Editor tool' },
    ],
  },
  {
    slug: 'spaghetti-relay',
    title: 'SPAGHETTI_RELAY',
    subtitle: 'Network Chat Server',
    description: 'A communication chat server allowing users to create accounts, authenticate, and communicate with other logged-in users through public and private messages with session validation.',
    role: 'Solo Developer',
    tech: ['C++', 'Winsock', 'Networking'],
    highlights: [
      'User authentication system',
      'Public and private messaging',
      'Session management and validation',
      'Real-time communication',
    ],
    github: 'https://github.com/GrizzwaldHouse/MarcusDaley_SPAGHETTI_RELAY',
    featured: false,
    theme: 'terminal',
    runtime: {
      type: 'terminal-demo',
      supported: true,
      config: {
        shell: 'custom',
        welcomeMessage: 'SPAGHETTI_RELAY v1.0 - Multi-client chat server simulation\nType "help" to see available commands',
        prompt: '> ',
        commands: ['connect', 'login', 'register', 'send', 'whisper', 'users', 'rooms', 'help', 'quit'],
      },
      fallbackVideo: 'pvL5sJztGoI',
    },
    videos: [
      { platform: 'youtube', id: 'pvL5sJztGoI', title: 'Full Server Demo', description: 'Enterprise-level C++ networking - complete multi-client chat demonstration' },
      { platform: 'youtube', id: '68hdU1IRkPM', title: 'Client-Server Demo', description: 'Demonstrating real-time client-server communication' },
    ],
  },
  {
    slug: 'the-dynamic-design',
    title: 'TheDynamicDesign',
    subtitle: 'Custom Engine Project',
    description: 'A group project utilizing a custom game engine built the previous month, demonstrating collaborative development and engine architecture understanding.',
    role: 'Team Member',
    tech: ['Custom Engine', 'C#', 'Team Collaboration'],
    highlights: [
      'Custom engine integration',
      'Team-based development',
      'Engine architecture patterns',
    ],
    github: 'https://github.com/GrizzwaldHouse/TheDynamicDesign',
    featured: false,
    theme: 'default',
    runtime: {
      type: 'video-only',
      supported: true,
    },
    videos: [],
  },
];

/**
 * Get all projects
 */
export function getAllProjects(): Project[] {
  return projects;
}

/**
 * Get featured projects only
 */
export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.featured);
}

/**
 * Get non-featured projects
 */
export function getAdditionalProjects(): Project[] {
  return projects.filter(p => !p.featured);
}

/**
 * Get a single project by slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

/**
 * Get projects with runnable demos
 */
export function getRunnableProjects(): Project[] {
  return projects.filter(p => p.runtime.supported && p.runtime.type !== 'video-only');
}

/**
 * Get videos for a project
 */
export function getProjectVideos(slug: string): ProjectVideo[] {
  const project = getProjectBySlug(slug);
  return project?.videos ?? [];
}

/**
 * Check if a project has a runnable demo
 */
export function hasRunnableDemo(project: Project): boolean {
  return project.runtime.supported && project.runtime.type !== 'video-only';
}

/**
 * Get runtime label for display
 */
export function getRuntimeLabel(type: RuntimeFeasibility): string {
  const labels: Record<RuntimeFeasibility, string> = {
    'wasm-game': 'Play in Browser',
    'webgl-viewer': 'Interactive 3D Viewer',
    'code-playground': 'Try the Code',
    'terminal-demo': 'Interactive Demo',
    'static-embed': 'Play Now',
    'video-only': 'Watch Demo',
    'non-runnable': 'View Code',
  };
  return labels[type];
}

/**
 * Get runtime icon for display
 */
export function getRuntimeIcon(type: RuntimeFeasibility): string {
  const icons: Record<RuntimeFeasibility, string> = {
    'wasm-game': '🎮',
    'webgl-viewer': '🔮',
    'code-playground': '💻',
    'terminal-demo': '⌨️',
    'static-embed': '▶️',
    'video-only': '📺',
    'non-runnable': '📁',
  };
  return icons[type];
}
