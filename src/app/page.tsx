import Image from 'next/image';
import Link from 'next/link';
import GraduationCountdown from '@/components/GraduationCountdown';
import AvailabilityStatus from '@/components/AvailabilityStatus';
import ResumeDownload from '@/components/ResumeDownload';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Profile Image */}
          <div className="w-full lg:w-1/3 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[#FFCC00] shadow-2xl">
              <Image
                src="/images/profile.jpg"
                alt="Marcus Daley - Tool Programmer"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Hero Content */}
          <div className="w-full lg:w-2/3 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#FFCC00] to-[#D50032] bg-clip-text text-transparent">
                Marcus Daley
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-4">
              Tool Programmer | Graphics Engineer | Technical QA
            </p>
            <p className="text-lg text-gray-400 mb-6 max-w-2xl">
              I build production-grade tools and rendering systems for game engines.
              Navy veteran bringing military-grade discipline to game development.
            </p>

            {/* Status Badges */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <AvailabilityStatus />
              <GraduationCountdown />
            </div>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                href="/projects"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
              >
                View Projects
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 bg-[#FFCC00] hover:bg-[#E6B800] text-slate-900 rounded-lg font-semibold transition-all duration-300 shadow-lg"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Pitch */}
      <section className="container mx-auto px-6 py-12">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-white mb-2">What I Build</h3>
              <p className="text-gray-400">
                Editor tools, rendering systems, and automation that help game teams ship faster.
              </p>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-white mb-2">How I Work</h3>
              <p className="text-gray-400">
                Systematic approach from 9 years Navy service. Document, test, verify, repeat.
              </p>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-white mb-2">What I'm Seeking</h3>
              <p className="text-gray-400">
                Remote tool programming or technical QA roles starting March 2026.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-slate-800/50 rounded-lg backdrop-blur-sm border border-slate-700">
            <div className="text-4xl font-bold text-[#FFCC00] mb-2">9+</div>
            <div className="text-gray-400 text-sm">Years Navy Service</div>
          </div>
          <div className="text-center p-6 bg-slate-800/50 rounded-lg backdrop-blur-sm border border-slate-700">
            <div className="text-4xl font-bold text-blue-400 mb-2">35%</div>
            <div className="text-gray-400 text-sm">Vulkan Perf Gain</div>
          </div>
          <div className="text-center p-6 bg-slate-800/50 rounded-lg backdrop-blur-sm border border-slate-700">
            <div className="text-4xl font-bold text-[#D50032] mb-2">3.8+</div>
            <div className="text-gray-400 text-sm">GPA</div>
          </div>
          <div className="text-center p-6 bg-slate-800/50 rounded-lg backdrop-blur-sm border border-slate-700">
            <div className="text-4xl font-bold text-purple-400 mb-2">Feb '26</div>
            <div className="text-gray-400 text-sm">Graduation</div>
          </div>
        </div>
      </section>

      {/* Technical Focus */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          Technical Focus
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Tool Programming */}
          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-blue-500/30 hover:border-blue-500 transition-all duration-300 group">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Tool Programming</h3>
            <p className="text-gray-300 mb-4">
              Editor tools and automation in Unreal Engine C++. Built MCP integration for
              AI-assisted development workflows.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">C++</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Python</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">UE5</span>
            </div>
          </div>

          {/* Graphics Engineering */}
          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-[#D50032]/30 hover:border-[#D50032] transition-all duration-300 group">
            <div className="w-12 h-12 bg-[#D50032]/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-[#D50032]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#D50032] mb-4">Graphics Engineering</h3>
            <p className="text-gray-300 mb-4">
              Custom Vulkan renderer with PBR materials. Achieved 35% performance gains through
              low-level optimization.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[#D50032]/20 text-[#D50032] rounded-full text-sm">Vulkan</span>
              <span className="px-3 py-1 bg-[#D50032]/20 text-[#D50032] rounded-full text-sm">GLSL</span>
              <span className="px-3 py-1 bg-[#D50032]/20 text-[#D50032] rounded-full text-sm">PBR</span>
            </div>
          </div>

          {/* Technical QA */}
          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-[#FFCC00]/30 hover:border-[#FFCC00] transition-all duration-300 group">
            <div className="w-12 h-12 bg-[#FFCC00]/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-[#FFCC00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#FFCC00] mb-4">Technical QA</h3>
            <p className="text-gray-300 mb-4">
              Automated testing frameworks for game systems. Navy-trained systematic approach
              to quality and validation.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[#FFCC00]/20 text-[#FFCC00] rounded-full text-sm">Testing</span>
              <span className="px-3 py-1 bg-[#FFCC00]/20 text-[#FFCC00] rounded-full text-sm">Validation</span>
              <span className="px-3 py-1 bg-[#FFCC00]/20 text-[#FFCC00] rounded-full text-sm">QA</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project Highlight */}
      <section className="container mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl border border-slate-700 p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <span className="text-[#FFCC00] text-sm font-semibold uppercase tracking-wider">Featured Project</span>
              <h3 className="text-3xl font-bold text-white mt-2 mb-4">Island Escape</h3>
              <p className="text-gray-300 mb-6">
                A voxel-based survival game built in Unreal Engine 5.5. I designed the modular
                pickup system, behavior tree AI, and teleportation mechanics. Try it directly
                in your browser.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <span>View All Projects</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <a
                  href="https://theendisnear469.itch.io/island-escape"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#fa5c5c] hover:bg-[#fa7070] text-white rounded-lg transition-colors"
                >
                  Play on itch.io
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-2xl border border-green-500/30 flex items-center justify-center">
                <span className="text-6xl">🏝️</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Download Section */}
      <section className="container mx-auto px-6 py-16">
        <ResumeDownload />
      </section>
    </div>
  );
}
