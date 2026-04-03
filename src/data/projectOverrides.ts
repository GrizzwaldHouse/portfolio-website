// projectOverrides.ts
// Developer: Marcus Daley
// Date: 2026-04-03
// Purpose: Local overrides for featured projects that enrich GitHub API data with
//          custom descriptions, highlights, tech tags, video mappings, and themes.
//          Only projects listed here appear as "featured" — all others auto-populate
//          from GitHub as additional projects.

import { ProjectOverride } from '@/types/project';

export const PROJECT_OVERRIDES: ProjectOverride[] = [
  {
    slug: 'Island-Escape',
    title: 'Island Escape',
    subtitle: 'Team Voxel Survival Game',
    description:
      'A voxel-based survival game built in Unreal Engine 5.5, featuring procedural terrain generation, AI combat systems, and comprehensive tool programming. Developed as a team project focusing on reusable, designer-friendly gameplay systems.',
    role: 'Tool Programmer / Gameplay Engineer',
    tech: ['Unreal Engine 5.5', 'C++', 'Blueprints', 'Perforce'],
    highlights: [
      'Voxel world generation with noise algorithms',
      'Modular pickup & inventory system using inheritance',
      'Behavior tree-driven AI with multiple enemy types',
      'Channel-based teleportation with unlock mechanics',
      'Designer-controlled spawner system with delegates',
    ],
    itchUrl: 'https://theendisnear469.itch.io/island-escape',
    featured: true,
    theme: 'nature',
  },
  {
    slug: 'Vulkan-Renderer',
    title: 'Vulkan 3D Renderer',
    subtitle: 'Custom Graphics Engine',
    description:
      'A custom 3D graphics rendering engine built with Vulkan API, showcasing progressive development from basic 2D rendering to advanced PBR materials with dynamic lighting. Achieved 35% performance improvement through low-level graphics optimization.',
    role: 'Solo Developer',
    tech: ['Vulkan API', 'C++20', 'GLSL', 'CMake'],
    highlights: [
      '7-lab progression through modern graphics programming',
      'PBR materials with IBL environment mapping',
      'Dynamic point and directional lighting',
      'glTF model loading with texture support',
      '35% performance optimization',
    ],
    featured: true,
    theme: 'cyberpunk',
  },
  {
    slug: 'WizardJam',
    title: 'WizardJam',
    subtitle: 'Capstone Solo Project',
    description:
      'A wizard game built in Unreal Engine starting with a Quidditch-style match between player and AI agents. Solo capstone project demonstrating end-to-end game development skills.',
    role: 'Solo Developer',
    tech: ['Unreal Engine 5.5', 'C++', 'Blueprints', 'UnrealMCP'],
    highlights: [
      'AI-driven opponent behavior',
      'Physics-based gameplay mechanics',
      'Custom game modes and scoring',
      'UI/HUD implementation',
    ],
    featured: true,
    theme: 'hogwarts',
  },
  {
    slug: 'UnrealMCP',
    title: 'UnrealMCP',
    subtitle: 'AI-Powered Editor Integration',
    description:
      'Custom C++ subsystem enabling Claude AI assistance directly within Unreal Engine development workflows. Bridges AI capabilities with editor utilities for enhanced productivity.',
    role: 'Solo Developer',
    tech: ['Unreal Engine 5.5', 'C++', 'Python', 'FastMCP'],
    highlights: [
      'TCP/HTTP communication bridge',
      'Editor utility widget integration',
      'Real-time AI assistance in editor',
      'Command panel subsystem',
    ],
    featured: false,
    theme: 'cyberpunk',
  },
  {
    slug: 'MarcusDaley_SPAGHETTI_RELAY',
    title: 'SPAGHETTI_RELAY',
    subtitle: 'Network Chat Server',
    description:
      'A communication chat server allowing users to create accounts, authenticate, and communicate with other logged-in users through public and private messages with session validation.',
    role: 'Solo Developer',
    tech: ['C++', 'Winsock', 'Networking'],
    highlights: [
      'User authentication system',
      'Public and private messaging',
      'Session management and validation',
      'Real-time communication',
    ],
    featured: false,
    theme: 'cyberpunk',
  },
  {
    slug: 'TheDynamicDesign',
    title: 'TheDynamicDesign',
    subtitle: 'Custom Engine Project',
    description:
      'A group project utilizing a custom game engine built the previous month, demonstrating collaborative development and engine architecture understanding.',
    role: 'Team Member',
    tech: ['Custom Engine', 'C#', 'Team Collaboration'],
    highlights: [
      'Custom engine integration',
      'Team-based development',
      'Engine architecture patterns',
    ],
    featured: false,
    theme: 'default',
  },
];
