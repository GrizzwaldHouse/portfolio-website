import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-6 py-20">
        {/* Header Section with Profile */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          {/* Profile Image */}
          <div className="w-full lg:w-1/3 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[#FFCC00] shadow-2xl">
              <Image
                src="/images/profile.jpg"
                alt="Marcus Daley"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Header Content */}
          <div className="w-full lg:w-2/3 text-center lg:text-left">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#FFCC00] to-[#D50032] bg-clip-text text-transparent">
              Marcus Daley
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              Game Development Engineer | Tool Programmer | Graphics Systems
            </p>
            <p className="text-lg text-gray-400 mb-6 max-w-2xl">
              I build production-grade tools and rendering systems for game engines.
              Nine years of Navy service taught me that quality isn't negotiable—I bring
              that same discipline to every line of code.
            </p>
            <div className="inline-block px-4 py-2 bg-[#FFCC00]/20 border border-[#FFCC00] rounded-lg">
              <p className="text-[#FFCC00] font-semibold">
                Full Sail University • BS Computer Science • February 2026
              </p>
            </div>
          </div>
        </div>

        {/* The Short Version */}
        <section className="mb-16">
          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700">
            <h2 className="text-3xl font-bold text-white mb-6">The Short Version</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">What I Do</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFCC00] mt-1">▹</span>
                    <span>Build editor tools and workflow automation in Unreal Engine (C++)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFCC00] mt-1">▹</span>
                    <span>Develop custom rendering systems with Vulkan API</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFCC00] mt-1">▹</span>
                    <span>Design automated testing frameworks for game systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFCC00] mt-1">▹</span>
                    <span>Integrate AI assistance into development workflows (MCP)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#FFCC00] mb-3">What I'm Looking For</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">▹</span>
                    <span>Remote tool programming or technical QA roles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">▹</span>
                    <span>Teams that value code quality and systematic approaches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">▹</span>
                    <span>Opportunities to build internal tools that help other developers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">▹</span>
                    <span>Available to start: March 2026</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Background */}
        <section className="mb-16">
          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700">
            <h2 className="text-3xl font-bold text-white mb-6">Background</h2>

            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                Before game development, I spent nine years in the Navy working on submarine
                mechanical and weapons systems. That environment doesn't tolerate shortcuts—when
                you're 400 feet underwater, everything has to work exactly as designed. I learned
                to approach problems systematically, document everything, and verify twice.
              </p>

              <p>
                I discovered programming when I started automating repetitive tasks and realized
                I enjoyed thinking about code problems more than playing games. That realization
                led me to Full Sail University, where I've spent three years studying computer
                science with a game development focus.
              </p>

              <p>
                The transition from mechanical systems to software wasn't as different as you'd
                think. Both require understanding how components interact, identifying failure
                points, and building in redundancy. The main difference is that software lets
                me iterate faster—and I don't have to hold my breath while debugging.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Focus Areas */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#FFCC00] to-[#D50032] bg-clip-text text-transparent">
            Technical Focus
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Tool Programming */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-blue-500/30 hover:border-blue-500 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-blue-400 mb-4">Tool Programming</h3>
              <p className="text-gray-300 mb-4">
                I build editor extensions and automation systems that make other developers'
                work easier. My UnrealMCP project integrates AI assistance directly into the
                Unreal Editor workflow.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">▹</span>
                  <span>Unreal Engine C++ subsystems</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">▹</span>
                  <span>Python automation (FastMCP)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">▹</span>
                  <span>Editor utility widgets</span>
                </div>
              </div>
            </div>

            {/* Graphics Engineering */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-[#D50032]/30 hover:border-[#D50032] transition-all duration-300">
              <div className="w-12 h-12 bg-[#D50032]/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#D50032]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#D50032] mb-4">Graphics Engineering</h3>
              <p className="text-gray-300 mb-4">
                Low-level graphics programming from the ground up. Built a complete Vulkan
                renderer with PBR materials and achieved 35% performance improvements through
                targeted optimization.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="text-[#D50032]">▹</span>
                  <span>Vulkan API (from scratch)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#D50032]">▹</span>
                  <span>GLSL shader programming</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#D50032]">▹</span>
                  <span>PBR and IBL implementation</span>
                </div>
              </div>
            </div>

            {/* Quality Assurance */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-[#FFCC00]/30 hover:border-[#FFCC00] transition-all duration-300">
              <div className="w-12 h-12 bg-[#FFCC00]/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#FFCC00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#FFCC00] mb-4">Technical QA</h3>
              <p className="text-gray-300 mb-4">
                Quality assurance isn't just finding bugs—it's building systems that prevent
                them. I design automated testing frameworks and validation pipelines that
                catch issues before they ship.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="text-[#FFCC00]">▹</span>
                  <span>Automated test frameworks</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FFCC00]">▹</span>
                  <span>AI behavior validation</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FFCC00]">▹</span>
                  <span>Performance profiling</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education & Credentials */}
        <section className="mb-16">
          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-[#FFCC00]/30">
            <h2 className="text-3xl font-bold text-[#FFCC00] mb-6">Education & Service</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-l-4 border-[#FFCC00] pl-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Bachelor of Science, Computer Science
                </h3>
                <p className="text-lg text-[#FFCC00] mb-2">
                  Full Sail University
                </p>
                <p className="text-gray-400 mb-3">
                  Game Development Concentration • GPA: 3.8+
                </p>
                <p className="text-gray-300 text-sm">
                  Expected graduation February 2026. Coursework includes graphics programming,
                  game engine architecture, AI systems, and software engineering practices.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  United States Navy
                </h3>
                <p className="text-lg text-blue-400 mb-2">
                  9+ Years Active Service
                </p>
                <p className="text-gray-400 mb-3">
                  Submarine Mechanical & Weapons Systems
                </p>
                <p className="text-gray-300 text-sm">
                  Maintained critical systems under demanding conditions. Developed systematic
                  approaches to diagnostics, documentation, and quality assurance that directly
                  inform my software engineering practice.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Skills */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Technical Stack
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-bold text-blue-400 mb-4">Languages</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-lg text-sm">C++ (primary)</span>
                <span className="px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-lg text-sm">Python</span>
                <span className="px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-lg text-sm">C#</span>
                <span className="px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-lg text-sm">GLSL</span>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-bold text-[#FFCC00] mb-4">Game Engines</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-[#FFCC00]/20 text-[#FFCC00] rounded-lg text-sm">Unreal Engine 5.5</span>
                <span className="px-3 py-1.5 bg-[#FFCC00]/20 text-[#FFCC00] rounded-lg text-sm">Unity</span>
                <span className="px-3 py-1.5 bg-[#FFCC00]/20 text-[#FFCC00] rounded-lg text-sm">Custom Engines</span>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-bold text-[#D50032] mb-4">Graphics APIs</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-[#D50032]/20 text-[#D50032] rounded-lg text-sm">Vulkan</span>
                <span className="px-3 py-1.5 bg-[#D50032]/20 text-[#D50032] rounded-lg text-sm">OpenGL</span>
                <span className="px-3 py-1.5 bg-[#D50032]/20 text-[#D50032] rounded-lg text-sm">PBR/IBL</span>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-bold text-purple-400 mb-4">Tools & Workflow</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded-lg text-sm">Git/Perforce</span>
                <span className="px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded-lg text-sm">CMake</span>
                <span className="px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded-lg text-sm">VS 2022</span>
                <span className="px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded-lg text-sm">Rider</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
