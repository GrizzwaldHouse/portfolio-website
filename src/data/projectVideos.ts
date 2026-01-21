// src/data/projectVideos.ts
// Centralized video data for all projects
// Video IDs extracted from Marcus's YouTube channel

export interface ProjectVideo {
  videoId: string;
  title: string;
  description: string;
}

export interface ProjectVideoData {
  projectSlug: string;
  videos: ProjectVideo[];
}

// Marcus's actual YouTube videos mapped to projects
export const projectVideos: ProjectVideoData[] = [
  {
    projectSlug: 'vulkan-renderer',
    videos: [
      { videoId: 'aAfCGqoneE0', title: 'Vulkan Lab 5 Complete', description: 'PBR materials and advanced lighting implementation' },
      { videoId: 'JHP08Y9DUrw', title: 'Vulkan Lab 4', description: 'Advanced rendering techniques' },
      { videoId: 'j_4th-yiApU', title: 'Vulkan Lab 3 Complete', description: 'Texture mapping and glTF model loading' },
      { videoId: 'imP-jELYEFs', title: 'Vulkan Lab 2 Complete', description: '3D transformations and camera setup' },
      { videoId: 'idzluqUuCl8', title: 'Vulkan Lab 1 Complete', description: 'Vulkan initialization and triangle rendering' },
    ]
  },
  {
    projectSlug: 'island-escape',
    videos: [
      { videoId: 'ZCpSUudUw_s', title: 'Week 3 Demo', description: 'Progress demo showing gameplay and discovering bugs' },
      { videoId: 'S9OA2Fw4X-8', title: 'Infinite Loop Bug Fixed', description: 'Debugging Unreal Engine teleporter crash - problem solving in action' },
      { videoId: 'zor4x2sJPxk', title: 'Teleporter Setup', description: 'Setting up teleporters with collectables as unlock keys' },
      { videoId: 'Rj14hSELIjg', title: 'Working Teleporter', description: 'Completed teleportation system demonstration' },
    ]
  },
  {
    projectSlug: 'wizardjam',
    videos: [
      { videoId: 'QOwWiUufmdY', title: 'SpellUI Implementation', description: 'Health, stamina, and spell unlock UI with collectable system' },
      { videoId: 'XWc_CkYSqdg', title: 'Week 3 Integration Demo', description: 'Weekly progress on capstone wizard game' },
    ]
  },
  {
    projectSlug: 'unrealmcp',
    videos: [
      { videoId: '7-KiQXCuKj0', title: 'Day 2 Editor Tool', description: 'Integrating Claude AI to control Unreal Engine through MCP' },
      { videoId: 'Z2Ueb9jB3n4', title: 'Day 5 UI Update', description: 'Adding UI and functions to UnrealMCP Editor tool' },
    ]
  },
  {
    projectSlug: 'spaghetti-relay',
    videos: [
      { videoId: 'pvL5sJztGoI', title: 'Full Server Demo', description: 'Enterprise-level C++ networking - complete multi-client chat demonstration' },
      { videoId: '68hdU1IRkPM', title: 'Client-Server Demo', description: 'Demonstrating real-time client-server communication' },
    ]
  },
];

// Helper function to get videos for a specific project
export function getProjectVideos(projectSlug: string): ProjectVideo[] {
  const project = projectVideos.find(p => p.projectSlug === projectSlug);
  return project?.videos || [];
}
