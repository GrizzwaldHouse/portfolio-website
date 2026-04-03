// page.tsx (projects)
// Developer: Marcus Daley
// Date: 2026-04-03
// Purpose: Mission Control dashboard — dynamically loads projects from GitHub API,
//          enriches with local overrides, provides recruiter display controls.

'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchGitHubRepos } from '@/systems/GitHubProjectLoader';
import { mergeProjectData } from '@/repositories/ProjectRepository';
import ProjectDisplayControl from '@/components/ProjectDisplayControl';
import { getProjectVideos } from '@/data/projectVideos';
import ProjectVideoGallery from '@/components/ProjectVideoGallery';
import ThemedBackground from '@/components/ThemedBackground';
import { Project, DISPLAY_CONFIG } from '@/types/project';
import { PROJECT_OVERRIDES } from '@/data/projectOverrides';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(DISPLAY_CONFIG.defaultCount);
  const [expandedHighlights, setExpandedHighlights] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function loadProjects() {
      try {
        const repos = await fetchGitHubRepos();
        if (repos.length > 0) {
          const merged = mergeProjectData(repos);
          setProjects(merged);
        } else {
          // Fallback: build projects from overrides alone
          const fallback: Project[] = PROJECT_OVERRIDES.map((o) => ({
            slug: o.slug,
            title: o.title ?? o.slug,
            subtitle: o.subtitle ?? '',
            description: o.description ?? '',
            role: o.role ?? 'Developer',
            tech: o.tech ?? [],
            highlights: o.highlights ?? [],
            github: `https://github.com/GrizzwaldHouse/${o.slug}`,
            itchUrl: o.itchUrl,
            featured: o.featured ?? false,
            theme: o.theme ?? 'default',
            language: null,
            stars: 0,
            lastUpdated: new Date().toISOString(),
          }));
          setProjects(fallback);
        }
      } catch {
        // Fallback on error
        const fallback: Project[] = PROJECT_OVERRIDES.map((o) => ({
          slug: o.slug,
          title: o.title ?? o.slug,
          subtitle: o.subtitle ?? '',
          description: o.description ?? '',
          role: o.role ?? 'Developer',
          tech: o.tech ?? [],
          highlights: o.highlights ?? [],
          github: `https://github.com/GrizzwaldHouse/${o.slug}`,
          itchUrl: o.itchUrl,
          featured: o.featured ?? false,
          theme: o.theme ?? 'default',
          language: null,
          stars: 0,
          lastUpdated: new Date().toISOString(),
        }));
        setProjects(fallback);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const handleDisplayCountChange = useCallback((count: number) => {
    setDisplayCount(count);
  }, []);

  const toggleHighlights = (slug: string) => {
    setExpandedHighlights((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const visibleProjects = projects.slice(0, displayCount);
  const featuredProjects = visibleProjects.filter((p) => p.featured);
  const additionalProjects = visibleProjects.filter((p) => !p.featured);

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              MISSION CONTROL
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-mono">
            Project deployments and technical operations
            <span className="animate-blink">|</span>
          </p>
          <div className="mt-6 flex justify-center">
            {!loading && (
              <ProjectDisplayControl
                totalCount={projects.length}
                onCountChange={handleDisplayCountChange}
              />
            )}
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 space-y-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl bg-slate-800/60 h-80"
              />
            ))}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={`sm-${i}`}
                  className="animate-pulse rounded-xl bg-slate-800/60 h-48"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects — Mission Briefings */}
      {!loading && featuredProjects.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-10 text-center font-mono tracking-wider text-gray-400">
              // FEATURED DEPLOYMENTS
            </h2>
            <div className="space-y-16">
              {featuredProjects.map((project) => {
                const videos = getProjectVideos(project.slug.toLowerCase().replace(/_/g, '-'));
                const isExpanded = expandedHighlights[project.slug] ?? false;

                return (
                  <ThemedBackground
                    key={project.slug}
                    theme={project.theme}
                    className="rounded-2xl border border-transparent hover:border-cyan-500/20 transition-all duration-300"
                  >
                    <div className="p-8 md:p-12">
                      <div className="grid lg:grid-cols-2 gap-8">
                        {/* Project Info Column */}
                        <div>
                          {/* Status Badge */}
                          <div className="flex items-center gap-2 mb-4">
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                            </span>
                            <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">
                              Deployed
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wider mb-1">
                            {project.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-4 font-mono">{project.subtitle}</p>

                          {/* Role Badge */}
                          <span className="inline-block px-3 py-1 bg-slate-700/70 border border-slate-600 rounded-full text-xs font-mono text-cyan-300 mb-4">
                            {project.role}
                          </span>

                          {/* Description */}
                          <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>

                          {/* Collapsible Highlights */}
                          {project.highlights.length > 0 && (
                            <div className="mb-6">
                              <button
                                onClick={() => toggleHighlights(project.slug)}
                                className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-cyan-400 transition-colors mb-3"
                              >
                                <svg
                                  className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                                MISSION HIGHLIGHTS ({project.highlights.length})
                              </button>
                              {isExpanded && (
                                <ul className="space-y-2 pl-6">
                                  {project.highlights.map((h) => (
                                    <li
                                      key={h}
                                      className="text-sm text-gray-300 flex items-start gap-2"
                                    >
                                      <span className="text-emerald-400 mt-0.5 font-mono">&gt;</span>
                                      <span>{h}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          )}

                          {/* Tech Stack — Terminal Tags */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.tech.map((t) => (
                              <span
                                key={t}
                                className="px-2 py-1 bg-slate-800/80 border border-slate-700 rounded text-xs font-mono text-cyan-300"
                              >
                                &gt; {t}
                              </span>
                            ))}
                          </div>

                          {/* Links */}
                          <div className="flex flex-wrap gap-3">
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-600/20 border border-cyan-500/40 hover:bg-cyan-600/30 hover:border-cyan-500/60 rounded-lg transition-all font-mono text-sm text-cyan-300"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                              [EXEC] View Source
                            </a>
                            {project.itchUrl && (
                              <a
                                href={project.itchUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#fa5c5c]/20 border border-[#fa5c5c]/40 hover:bg-[#fa5c5c]/30 hover:border-[#fa5c5c]/60 rounded-lg transition-all font-mono text-sm text-[#fa7070]"
                              >
                                [EXEC] Play on itch.io
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
                              <div className="text-center">
                                <div className="text-4xl mb-3 opacity-30">&#9655;</div>
                                <p className="text-gray-500 font-mono text-sm">
                                  // video feed pending
                                </p>
                              </div>
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
      )}

      {/* Additional Projects — Grid */}
      {!loading && additionalProjects.length > 0 && (
        <section className="py-16 px-4 bg-slate-900/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-10 text-center font-mono tracking-wider text-gray-400">
              // ADDITIONAL OPERATIONS
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalProjects.map((project) => (
                <div
                  key={project.slug}
                  className="group relative bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300"
                >
                  {/* Header Row */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-500 text-xs font-mono">{project.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <span className="relative flex h-2 w-2">
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                    </div>
                  </div>

                  {/* Language & Stars */}
                  <div className="flex items-center gap-3 mb-3">
                    {project.language && (
                      <span className="text-xs font-mono px-2 py-0.5 bg-slate-700/60 border border-slate-600/50 rounded text-gray-300">
                        {project.language}
                      </span>
                    )}
                    {project.stars > 0 && (
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                        </svg>
                        {project.stars}
                      </span>
                    )}
                  </div>

                  {/* Description — revealed on hover */}
                  <div className="overflow-hidden">
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2 group-hover:line-clamp-none transition-all">
                      {project.description}
                    </p>
                  </div>

                  {/* GitHub Link */}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-xs font-mono transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    [VIEW] Repository
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {!loading && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-2 font-mono">
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Request Mission Briefing
              </span>
            </h2>
            <p className="text-gray-400 mb-8 font-mono text-sm">
              // currently seeking remote opportunities in tool programming and technical QA
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a
                href="https://www.linkedin.com/in/marcusdaley-gamedev"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors font-mono text-sm"
              >
                Request Mission Briefing
              </a>
              <a
                href="https://github.com/GrizzwaldHouse"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-transparent border border-cyan-500/40 hover:border-cyan-500/80 text-cyan-400 rounded-lg transition-colors font-mono text-sm"
              >
                Access All Repositories
              </a>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
