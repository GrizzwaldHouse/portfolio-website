// src/app/projects/page.tsx
'use client';

import Link from 'next/link';
import {
  getAllProjects,
  getFeaturedProjects,
  getAdditionalProjects,
  getRuntimeLabel,
  getRuntimeIcon,
  hasRunnableDemo,
} from '@/data/projects';
import ProjectVideoGallery from '@/components/ProjectVideoGallery';
import ThemedBackground from '@/components/ThemedBackground';
import { DemoLauncher } from '@/components/demos';

// Runtime status badges
function RuntimeBadge({ project }: { project: ReturnType<typeof getAllProjects>[0] }) {
  const isRunnable = hasRunnableDemo(project);
  const label = getRuntimeLabel(project.runtime.type);
  const icon = getRuntimeIcon(project.runtime.type);

  if (isRunnable) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium border border-green-500/30">
        <span>{icon}</span>
        <span>{label}</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-700/50 text-gray-400 rounded-full text-sm">
      <span>{icon}</span>
      <span>{label}</span>
    </span>
  );
}

export default function ProjectsPage() {
  const featuredProjects = getFeaturedProjects();
  const additionalProjects = getAdditionalProjects();

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
            Interactive demos available for select projects - click to experience them directly
          </p>
        </div>
      </section>

      {/* How This Works - Recruiter-facing explainer */}
      <section className="py-8 px-4 bg-slate-800/50 border-y border-slate-700">
        <div className="max-w-6xl mx-auto">
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔧</span>
                <div>
                  <h3 className="text-white font-semibold">How This Portfolio Works</h3>
                  <p className="text-gray-400 text-sm">Technical overview for reviewers</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="mt-6 grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-400">▶️</span>
                  <h4 className="text-white font-medium">Live Demos</h4>
                </div>
                <p className="text-gray-400 text-sm">
                  Projects marked "Play Now" or "Interactive Demo" run directly in your browser using sandboxed iframes or terminal emulation. No installation required.
                </p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-400">📺</span>
                  <h4 className="text-white font-medium">Video Showcases</h4>
                </div>
                <p className="text-gray-400 text-sm">
                  Complex projects like Unreal Engine games include development videos showing real implementation work, debugging sessions, and feature walkthroughs.
                </p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-purple-400">📁</span>
                  <h4 className="text-white font-medium">Source Code</h4>
                </div>
                <p className="text-gray-400 text-sm">
                  Every project links to its GitHub repository where you can review the actual code, commit history, and technical implementation details.
                </p>
              </div>
            </div>
          </details>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="space-y-16">
            {featuredProjects.map((project) => (
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
                      <p className="text-gray-400 text-sm mb-2">{project.subtitle}</p>

                      {/* Runtime badge */}
                      <div className="mb-4">
                        <RuntimeBadge project={project} />
                      </div>

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
                        {project.itchUrl && (
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

                    {/* Demo / Video Column */}
                    <div>
                      {hasRunnableDemo(project) ? (
                        <DemoLauncher project={project} />
                      ) : project.videos.length > 0 ? (
                        <ProjectVideoGallery
                          videos={project.videos.map(v => ({
                            videoId: v.id,
                            title: v.title,
                            description: v.description || '',
                          }))}
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
            ))}
          </div>
        </div>
      </section>

      {/* Additional Projects */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Additional Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalProjects.map(project => (
              <div
                key={project.slug}
                className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all border border-slate-700 flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-blue-400 mb-1">{project.title}</h3>
                    <p className="text-gray-400 text-sm">{project.subtitle}</p>
                  </div>
                  <RuntimeBadge project={project} />
                </div>

                <p className="text-gray-300 text-sm mb-4 flex-grow">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map(t => (
                    <span key={t} className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Show video count if project has videos */}
                {project.videos.length > 0 && (
                  <p className="text-sm text-[#FFCC00] mb-3">
                    {project.videos.length} development video{project.videos.length > 1 ? 's' : ''} available
                  </p>
                )}

                <div className="flex gap-3 mt-auto">
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
                  {hasRunnableDemo(project) && (
                    <span className="text-green-400 text-sm">• Try Demo</span>
                  )}
                </div>
              </div>
            ))}
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
