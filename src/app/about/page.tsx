// page.tsx (about)
// Developer: Marcus Daley
// Date: 2026-04-03
// Purpose: Story-based About page with vertical timeline, glassmorphism cards,
//          credentials panel, and technical expertise grid. CSS-only animations.

import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-6 py-20">

        {/* ── Hero ── */}
        <section className="flex flex-col items-center mb-24">
          <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 blur-md opacity-60 animate-pulse-glow" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-cyan-400/60">
              <Image
                src="/images/profile.jpg"
                alt="Marcus Daley"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent animate-slide-up">
            ABOUT ME
          </h1>

          <div className="overflow-hidden whitespace-nowrap animate-typewriter border-r-2 border-cyan-400 animate-blink">
            <p className="text-lg md:text-xl text-slate-300 font-light tracking-wide">
              From Submarines to Game Development
            </p>
          </div>
        </section>

        {/* ── Journey Timeline ── */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            The Journey
          </h2>

          <div className="relative">
            {/* Center line — desktop */}
            <div className="hidden md:block absolute left-1/2 w-0.5 bg-gradient-to-b from-cyan-500 to-blue-600 h-full -translate-x-1/2" />
            {/* Left line — mobile */}
            <div className="block md:hidden absolute left-4 w-0.5 bg-gradient-to-b from-cyan-500 to-blue-600 h-full" />

            <div className="space-y-12">

              {/* Entry 1 — LEFT */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center">
                {/* Mobile dot */}
                <div className="absolute left-2.5 top-6 md:hidden w-4 h-4 rounded-full bg-cyan-500 border-2 border-slate-900 animate-pulse z-10" />
                {/* Desktop dot */}
                <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-cyan-500 border-2 border-slate-900 animate-pulse z-10" />

                <div className="w-full md:w-1/2 md:pr-12 pl-10 md:pl-0">
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                    <span className="text-xs font-mono text-cyan-400 tracking-widest">2015 — 2024</span>
                    <h3 className="text-xl font-bold text-white mt-1 mb-2 flex items-center gap-2">
                      <span>🛡️</span> US Navy Service
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      9+ years as a submarine mechanic and weapons systems specialist. Developed systematic
                      problem-solving skills and military-grade quality standards.
                    </p>
                  </div>
                </div>
                <div className="hidden md:block w-1/2" />
              </div>

              {/* Entry 2 — RIGHT */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center">
                <div className="absolute left-2.5 top-6 md:hidden w-4 h-4 rounded-full bg-cyan-500 border-2 border-slate-900 animate-pulse z-10" />
                <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-cyan-500 border-2 border-slate-900 animate-pulse z-10" />

                <div className="hidden md:block w-1/2" />
                <div className="w-full md:w-1/2 md:pl-12 pl-10 md:pr-0">
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                    <span className="text-xs font-mono text-cyan-400 tracking-widest">2024</span>
                    <h3 className="text-xl font-bold text-white mt-1 mb-2 flex items-center gap-2">
                      <span>💡</span> Transition to Tech
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Discovered passion for programming — realized I enjoyed thinking about code problems
                      as much as playing video games.
                    </p>
                  </div>
                </div>
              </div>

              {/* Entry 3 — LEFT */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center">
                <div className="absolute left-2.5 top-6 md:hidden w-4 h-4 rounded-full bg-cyan-500 border-2 border-slate-900 animate-pulse z-10" />
                <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-cyan-500 border-2 border-slate-900 animate-pulse z-10" />

                <div className="w-full md:w-1/2 md:pr-12 pl-10 md:pl-0">
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                    <span className="text-xs font-mono text-cyan-400 tracking-widest">2024 — 2026</span>
                    <h3 className="text-xl font-bold text-white mt-1 mb-2 flex items-center gap-2">
                      <span>🎓</span> Full Sail University
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Bachelor of Science in Computer Science with Game Development concentration.
                      3.8+ GPA, 120 credits earned.
                    </p>
                  </div>
                </div>
                <div className="hidden md:block w-1/2" />
              </div>

              {/* Entry 4 — RIGHT */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center">
                <div className="absolute left-2.5 top-6 md:hidden w-4 h-4 rounded-full bg-cyan-500 border-2 border-slate-900 animate-pulse z-10" />
                <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-cyan-500 border-2 border-slate-900 animate-pulse z-10" />

                <div className="hidden md:block w-1/2" />
                <div className="w-full md:w-1/2 md:pl-12 pl-10 md:pr-0">
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                    <span className="text-xs font-mono text-cyan-400 tracking-widest">2026 — PRESENT</span>
                    <h3 className="text-xl font-bold text-white mt-1 mb-2 flex items-center gap-2">
                      <span>🚀</span> Current Focus
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Tool programming, quality assurance, and graphics engineering. Building AI-powered
                      game development workflows.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Professional Focus ── */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Professional Focus
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Tool Programming */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 transition-all duration-300">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🛠️</span>
              </div>
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">Tool Programming</h3>
              <p className="text-slate-300 mb-4">
                Specializing in Unreal Engine editor tools and AI-powered workflows. Built custom C++ subsystems
                and Python integration for game development automation.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="text-cyan-400">▹</span>
                  <span>Custom editor utilities</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="text-cyan-400">▹</span>
                  <span>MCP server integration</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="text-cyan-400">▹</span>
                  <span>Python automation tools</span>
                </div>
              </div>
            </div>

            {/* Quality Assurance */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 transition-all duration-300">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-green-400 mb-4">Quality Assurance</h3>
              <p className="text-slate-300 mb-4">
                Automated testing frameworks for game engines. Expert in AI systems validation, algorithm testing,
                and performance optimization.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="text-green-400">▹</span>
                  <span>Automated test frameworks</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="text-green-400">▹</span>
                  <span>AI validation systems</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="text-green-400">▹</span>
                  <span>Performance profiling</span>
                </div>
              </div>
            </div>

            {/* Graphics Engineering */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-2xl font-bold text-purple-400 mb-4">Graphics Engineering</h3>
              <p className="text-slate-300 mb-4">
                Low-level graphics programming with Vulkan API. Custom 3D rendering engines achieving significant
                performance improvements through optimization.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="text-purple-400">▹</span>
                  <span>Vulkan API development</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="text-purple-400">▹</span>
                  <span>PBR materials system</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="text-purple-400">▹</span>
                  <span>35% performance gains</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Credentials Panel ── */}
        <section className="mb-24">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-cyan-500/20">
            <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">Credentials</span>

            <div className="mt-6 space-y-8">
              {/* Full Sail */}
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  Bachelor of Science in Computer Science
                </h3>
                <p className="text-cyan-400 font-mono text-sm mb-3">
                  Full Sail University
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="font-mono text-xs bg-cyan-500/10 text-cyan-300 px-3 py-1.5 rounded-lg border border-cyan-500/20">
                    Game Development Concentration
                  </span>
                  <span className="font-mono text-xs bg-cyan-500/10 text-cyan-300 px-3 py-1.5 rounded-lg border border-cyan-500/20">
                    GPA 3.8+
                  </span>
                  <span className="font-mono text-xs bg-cyan-500/10 text-cyan-300 px-3 py-1.5 rounded-lg border border-cyan-500/20">
                    120 Credits
                  </span>
                  <span className="font-mono text-xs bg-cyan-500/10 text-cyan-300 px-3 py-1.5 rounded-lg border border-cyan-500/20">
                    Graduated Feb 2026
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-700/50 pt-6">
                <h3 className="text-xl font-bold text-white mb-1">
                  US Navy Service
                </h3>
                <p className="text-slate-400 font-mono text-sm mb-3">
                  9+ Years Active Duty
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="font-mono text-xs bg-slate-700/50 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-600/50">
                    Submarine Mechanics
                  </span>
                  <span className="font-mono text-xs bg-slate-700/50 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-600/50">
                    Weapons Systems
                  </span>
                  <span className="font-mono text-xs bg-slate-700/50 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-600/50">
                    Quality Assurance
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Technical Expertise Grid ── */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Technical Expertise
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Game Development */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700/50">
              <h3 className="text-lg font-bold text-cyan-400 mb-4 font-mono tracking-wide">Game Development</h3>
              <div className="flex flex-wrap gap-2">
                <span className="font-mono text-xs bg-slate-700/50 text-cyan-300 px-3 py-1.5 rounded-lg border border-slate-600/50 hover:border-cyan-500/30 transition-colors">Unreal Engine 5.5</span>
                <span className="font-mono text-xs bg-slate-700/50 text-cyan-300 px-3 py-1.5 rounded-lg border border-slate-600/50 hover:border-cyan-500/30 transition-colors">C++</span>
                <span className="font-mono text-xs bg-slate-700/50 text-cyan-300 px-3 py-1.5 rounded-lg border border-slate-600/50 hover:border-cyan-500/30 transition-colors">Blueprint</span>
                <span className="font-mono text-xs bg-slate-700/50 text-cyan-300 px-3 py-1.5 rounded-lg border border-slate-600/50 hover:border-cyan-500/30 transition-colors">Unity C#</span>
                <span className="font-mono text-xs bg-slate-700/50 text-cyan-300 px-3 py-1.5 rounded-lg border border-slate-600/50 hover:border-cyan-500/30 transition-colors">Perforce</span>
              </div>
            </div>

            {/* Graphics & Systems */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700/50">
              <h3 className="text-lg font-bold text-cyan-400 mb-4 font-mono tracking-wide">Graphics & Systems</h3>
              <div className="flex flex-wrap gap-2">
                <span className="font-mono text-xs bg-slate-700/50 text-cyan-300 px-3 py-1.5 rounded-lg border border-slate-600/50 hover:border-cyan-500/30 transition-colors">Vulkan API</span>
                <span className="font-mono text-xs bg-slate-700/50 text-cyan-300 px-3 py-1.5 rounded-lg border border-slate-600/50 hover:border-cyan-500/30 transition-colors">GLSL</span>
                <span className="font-mono text-xs bg-slate-700/50 text-cyan-300 px-3 py-1.5 rounded-lg border border-slate-600/50 hover:border-cyan-500/30 transition-colors">PBR Rendering</span>
                <span className="font-mono text-xs bg-slate-700/50 text-cyan-300 px-3 py-1.5 rounded-lg border border-slate-600/50 hover:border-cyan-500/30 transition-colors">OpenGL</span>
              </div>
            </div>

            {/* Tools & Automation */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700/50">
              <h3 className="text-lg font-bold text-cyan-400 mb-4 font-mono tracking-wide">Tools & Automation</h3>
              <div className="flex flex-wrap gap-2">
                <span className="font-mono text-xs bg-slate-700/50 text-cyan-300 px-3 py-1.5 rounded-lg border border-slate-600/50 hover:border-cyan-500/30 transition-colors">Python FastMCP</span>
                <span className="font-mono text-xs bg-slate-700/50 text-cyan-300 px-3 py-1.5 rounded-lg border border-slate-600/50 hover:border-cyan-500/30 transition-colors">Editor Scripting</span>
                <span className="font-mono text-xs bg-slate-700/50 text-cyan-300 px-3 py-1.5 rounded-lg border border-slate-600/50 hover:border-cyan-500/30 transition-colors">Git/GitHub</span>
                <span className="font-mono text-xs bg-slate-700/50 text-cyan-300 px-3 py-1.5 rounded-lg border border-slate-600/50 hover:border-cyan-500/30 transition-colors">CI/CD</span>
              </div>
            </div>

            {/* Dev Environments */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700/50">
              <h3 className="text-lg font-bold text-cyan-400 mb-4 font-mono tracking-wide">Dev Environments</h3>
              <div className="flex flex-wrap gap-2">
                <span className="font-mono text-xs bg-slate-700/50 text-cyan-300 px-3 py-1.5 rounded-lg border border-slate-600/50 hover:border-cyan-500/30 transition-colors">Visual Studio 2022</span>
                <span className="font-mono text-xs bg-slate-700/50 text-cyan-300 px-3 py-1.5 rounded-lg border border-slate-600/50 hover:border-cyan-500/30 transition-colors">VSCode</span>
                <span className="font-mono text-xs bg-slate-700/50 text-cyan-300 px-3 py-1.5 rounded-lg border border-slate-600/50 hover:border-cyan-500/30 transition-colors">Rider</span>
                <span className="font-mono text-xs bg-slate-700/50 text-cyan-300 px-3 py-1.5 rounded-lg border border-slate-600/50 hover:border-cyan-500/30 transition-colors">Claude Desktop</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
