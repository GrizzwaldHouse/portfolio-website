// src/app/projects/page.tsx
'use client';

import Link from 'next/link';
import { getProjectVideos } from '@/data/projectVideos';
import ProjectVideoGallery from '@/components/ProjectVideoGallery';
import ThemedBackground from '@/components/ThemedBackground';

// Project data with video and theme support
const projects = [
  {
    slug: 'island-escape',
    title: "Island Escape",
    subtitle: "Team Voxel Survival Game",
    description: "A voxel-based survival game built in Unreal Engine 5.5, featuring procedural terrain generation, AI combat systems, and comprehensive tool programming. Developed as a team project focusing on reusable, designer-friendly gameplay systems.",
    role: "Tool Programmer / Gameplay Engineer",
    tech: ["Unreal Engine 5.5", "C++", "Blueprints", "Perforce"],
    highlights: [
      "Voxel world generation with noise algorithms",
      "Modular pickup & inventory system using inheritance",
      "Behavior tree-driven AI with multiple enemy types",
      "Channel-based teleportation with unlock mechanics",
      "Designer-controlled spawner system with delegates"
    ],
    github: "https://github.com/GrizzwaldHouse/Island-Escape",
    itchUrl: "https://theendisnear469.itch.io/island-escape",
    featured: true,
    theme: 'nature'
  },
  {
    slug: 'vulkan-renderer',
    title: "Vulkan 3D Renderer",
    subtitle: "Custom Graphics Engine",
    description: "A custom 3D graphics rendering engine built with Vulkan API, showcasing progressive development from basic 2D rendering to advanced PBR materials with dynamic lighting. Achieved 35% performance improvement through low-level graphics optimization.",
    role: "Solo Developer",
    tech: ["Vulkan API", "C++20", "GLSL", "CMake"],
    highlights: [
      "7-lab progression through modern graphics programming",
      "PBR materials with IBL environment mapping",
      "Dynamic point and directional lighting",
      "glTF model loading with texture support",
      "35% performance optimization"
    ],
    github: "https://github.com/GrizzwaldHouse/Vulkan-Renderer",
    featured: true,
    theme: 'cyberpunk'
  },
  {
    slug: 'wizardjam',
    title: "WizardJam",
    subtitle: "Capstone Solo Project",
    description: "A wizard game built in Unreal Engine starting with a Quidditch-style match between player and AI agents. Solo capstone project demonstrating end-to-end game development skills.",
    role: "Solo Developer",
    tech: ["Unreal Engine 5.5", "C++", "Blueprints", "UnrealMCP"],
    highlights: [
      "AI-driven opponent behavior",
      "Physics-based gameplay mechanics",
      "Custom game modes and scoring",
      "UI/HUD implementation"
    ],
    github: "https://github.com/GrizzwaldHouse/WizardJam",
    featured: true,
    theme: 'hogwarts'
  },
  {
    slug: 'unrealmcp',
    title: "UnrealMCP",
    subtitle: "AI-Powered Editor Integration",
    description: "Custom C++ subsystem enabling Claude AI assistance directly within Unreal Engine development workflows. Bridges AI capabilities with editor utilities for enhanced productivity.",
    role: "Solo Developer",
    tech: ["Unreal Engine 5.5", "C++", "Python", "FastMCP"],
    highlights: [
      "TCP/HTTP communication bridge",
      "Editor utility widget integration",
      "Real-time AI assistance in editor",
      "Command panel subsystem"
    ],
    github: "https://github.com/GrizzwaldHouse/UnrealMCP",
    featured: false,
    theme: 'cyberpunk'
  },
  {
    slug: 'spaghetti-relay',
    title: "SPAGHETTI_RELAY",
    subtitle: "Network Chat Server",
    description: "A communication chat server allowing users to create accounts, authenticate, and communicate with other logged-in users through public and private messages with session validation.",
    role: "Solo Developer",
    tech: ["C++", "Winsock", "Networking"],
    highlights: [
      "User authentication system",
      "Public and private messaging",
      "Session management and validation",
      "Real-time communication"
    ],
    github: "https://github.com/GrizzwaldHouse/MarcusDaley_SPAGHETTI_RELAY",
    featured: false,
    theme: 'cyberpunk'
  },
  {
    slug: 'the-dynamic-design',
    title: "TheDynamicDesign",
    subtitle: "Custom Engine Project",
    description: "A group project utilizing a custom game engine built the previous month, demonstrating collaborative development and engine architecture understanding.",
    role: "Team Member",
    tech: ["Custom Engine", "C#", "Team Collaboration"],
    highlights: [
      "Custom engine integration",
      "Team-based development",
      "Engine architecture patterns"
    ],
    github: "https://github.com/GrizzwaldHouse/TheDynamicDesign",
    featured: false,
    theme: 'default'
  }
];

export default function ProjectsPage() {
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Projects</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A collection of game development, graphics programming, and tool development projects
            showcasing expertise in Unreal Engine, C++, and systems architecture.
          </p>
          <p className="text-sm text-gray-400 mt-4">
            Watch my development videos to see how I approach technical challenges
          </p>
        </div>
      </section>

      {/* Featured Projects with Videos */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="space-y-16">
            {featuredProjects.map((project) => {
              const videos = getProjectVideos(project.slug);

              return (
                <ThemedBackground
                  key={project.slug}
                  theme={project.theme}
                  className="rounded-2xl"
                >
                  <div className="p-8 md:p-12">
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Project Info Column */}
                      <div>
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-2xl md:text-3xl font-bold text-white">
                            {project.title}
                          </h3>
                          <span className="px-3 py-1 bg-[#FFCC00] text-slate-900 rounded-full text-sm font-semibold">
                            Featured
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">{project.subtitle}</p>
                        <p className="text-gray-300 mb-6">{project.description}</p>

                        <div className="mb-4">
                          <span className="text-sm text-gray-400">Role: </span>
                          <span className="text-sm text-white font-medium">{project.role}</span>
                        </div>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.map(t => (
                            <span
                              key={t}
                              className="px-3 py-1 bg-slate-700/70 rounded-full text-sm text-gray-300 backdrop-blur-sm"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Highlights */}
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-gray-400 mb-3">Key Features:</h4>
                          <ul className="space-y-2">
                            {project.highlights.map(h => (
                              <li key={h} className="text-sm text-gray-300 flex items-start gap-2">
                                <span className="text-[#FFCC00] mt-0.5">✓</span>
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Links */}
                        <div className="flex flex-wrap gap-3">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            GitHub
                          </a>
                          {'itchUrl' in project && project.itchUrl && (
                            <a
                              href={project.itchUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#fa5c5c] hover:bg-[#fa7070] rounded-lg transition-colors font-medium"
                            >
                              Play on itch.io
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Video Gallery Column */}
                      <div>
                        {videos.length > 0 ? (
                          <ProjectVideoGallery
                            videos={videos}
                            projectTitle={project.title}
                          />
                        ) : (
                          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 h-full flex items-center justify-center min-h-[300px]">
                            <p className="text-gray-400 text-center">
                              Video walkthrough coming soon
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </ThemedBackground>
              );
            })}
          </div>
        </div>
      </section>

      {/* Other Projects with Videos */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Additional Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map(project => {
              const videos = getProjectVideos(project.slug);

              return (
                <div
                  key={project.slug}
                  className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all border border-slate-700"
                >
                  <h3 className="text-xl font-bold text-blue-400 mb-1">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{project.subtitle}</p>
                  <p className="text-gray-300 text-sm mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map(t => (
                      <span key={t} className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Show video count if project has videos */}
                  {videos.length > 0 && (
                    <p className="text-sm text-[#FFCC00] mb-3">
                      {videos.length} development video{videos.length > 1 ? 's' : ''} available
                    </p>
                  )}

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View Repository
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Interested in Working Together?</h2>
          <p className="text-gray-400 mb-6">
            I'm currently seeking remote opportunities in tool programming and technical QA.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="https://www.linkedin.com/in/marcusdaley-gamedev"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Connect on LinkedIn
            </a>
            <a
              href="https://github.com/GrizzwaldHouse"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              View All Repos
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
