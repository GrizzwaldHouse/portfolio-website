// page.tsx
// Developer: Marcus Daley
// Date: 2026-04-03
// Purpose: Home page with Command Center 3D hybrid hero, system status dashboard,
//          glassmorphism expertise cards, and interactive AI companion section.

'use client';

import Image from 'next/image';
import Link from 'next/link';
import GraduationCountdown from '@/components/GraduationCountdown';
import AvailabilityStatus from '@/components/AvailabilityStatus';
import ResumeDownload from '@/components/ResumeDownload';
import TamagotchiWidget from '@/components/Tamagotchi/TamagotchiWidget';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[length:200%_200%] animate-gradient-shift bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-10 w-24 h-24 rounded-2xl border border-cyan-500/20 opacity-30 animate-float" />
        <div className="absolute top-40 right-20 w-16 h-16 rounded-full border border-blue-400/20 opacity-20 animate-float-reverse" />
        <div className="absolute bottom-32 left-1/4 w-20 h-20 rounded-xl border border-cyan-300/15 opacity-25 animate-float" />
        <div className="absolute bottom-20 right-1/3 w-12 h-12 rounded-lg border border-blue-500/25 opacity-20 animate-float-reverse" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center gap-8">
            {/* Profile Image with Glow Ring */}
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-cyan-400/50 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
              <Image
                src="/images/profile.jpg"
                alt="Marcus Daley - Tool Programmer"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Name with Shimmer */}
            <h1 className="text-5xl md:text-7xl font-bold bg-[length:200%_auto] animate-shimmer bg-gradient-to-r from-cyan-400 via-white to-cyan-400 bg-clip-text text-transparent">
              Marcus Daley
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl">
              Tool Programmer | Game Development QA | Graphics Engineer
            </p>

            {/* Veteran Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 font-semibold text-sm uppercase tracking-wider animate-pulse">
              US Navy Veteran
            </span>

            {/* Status Badges */}
            <div className="flex flex-wrap gap-4 justify-center">
              <AvailabilityStatus />
              <GraduationCountdown />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mt-4">
              <Link
                href="/projects"
                className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
              >
                Explore Projects
              </Link>
              <a
                href="#pet-companion"
                className="px-8 py-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40 hover:border-amber-500/60 rounded-lg font-semibold transition-all duration-300 shadow-lg"
              >
                Meet My AI Companion
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* System Status Dashboard */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-center font-mono text-sm uppercase tracking-widest text-gray-400 mb-12">
          System Status
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl">
            <div className="font-mono text-4xl font-bold text-cyan-400 mb-2">9+</div>
            <div className="text-gray-400 text-xs uppercase tracking-wider">Years Navy Service</div>
          </div>
          <div className="text-center p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl">
            <div className="font-mono text-4xl font-bold text-blue-400 mb-2">120</div>
            <div className="text-gray-400 text-xs uppercase tracking-wider">Credits Earned</div>
          </div>
          <div className="text-center p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl">
            <div className="font-mono text-4xl font-bold text-emerald-400 mb-2">3.8+</div>
            <div className="text-gray-400 text-xs uppercase tracking-wider">GPA</div>
          </div>
          <div className="text-center p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl">
            <div className="font-mono text-4xl font-bold text-purple-400 mb-2">FEB 2026</div>
            <div className="text-gray-400 text-xs uppercase tracking-wider">Graduation</div>
          </div>
        </div>
      </section>

      {/* Professional Focus */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-center font-mono text-sm uppercase tracking-widest text-gray-400 mb-12">
          Professional Focus
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Tool Programming */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:scale-[1.02] hover:border-cyan-500/30 transition-all duration-300">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">Tool Programming</h3>
            <p className="text-gray-300 mb-6">
              Custom editor tools and AI-powered workflows for Unreal Engine 5. Built MCP integration enabling real-time AI assistance in game development.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-cyan-500/10 text-cyan-300 text-xs px-2 py-1 rounded-full">C++</span>
              <span className="bg-cyan-500/10 text-cyan-300 text-xs px-2 py-1 rounded-full">Python</span>
              <span className="bg-cyan-500/10 text-cyan-300 text-xs px-2 py-1 rounded-full">UE5</span>
            </div>
          </div>

          {/* Quality Assurance */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:scale-[1.02] hover:border-amber-500/30 transition-all duration-300">
            <h3 className="text-2xl font-bold text-amber-400 mb-4">Quality Assurance</h3>
            <p className="text-gray-300 mb-6">
              Military-grade QA expertise with automated testing frameworks. Specialized in AI systems validation and performance optimization.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-amber-500/10 text-amber-300 text-xs px-2 py-1 rounded-full">Testing</span>
              <span className="bg-amber-500/10 text-amber-300 text-xs px-2 py-1 rounded-full">Validation</span>
              <span className="bg-amber-500/10 text-amber-300 text-xs px-2 py-1 rounded-full">QA</span>
            </div>
          </div>

          {/* Graphics Programming */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:scale-[1.02] hover:border-red-500/30 transition-all duration-300">
            <h3 className="text-2xl font-bold text-red-400 mb-4">Graphics Programming</h3>
            <p className="text-gray-300 mb-6">
              Custom 3D rendering engines with Vulkan API. Achieved 35% performance improvements through low-level graphics optimization.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-red-500/10 text-red-300 text-xs px-2 py-1 rounded-full">Vulkan</span>
              <span className="bg-red-500/10 text-red-300 text-xs px-2 py-1 rounded-full">GLSL</span>
              <span className="bg-red-500/10 text-red-300 text-xs px-2 py-1 rounded-full">PBR</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive AI Companion */}
      <section id="pet-companion" className="container mx-auto px-6 py-20">
        <h2 className="text-center font-mono text-sm uppercase tracking-widest text-gray-400 mb-8">
          Interactive AI Companion
        </h2>

        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-300 text-lg mb-6">
            Meet the AI companion living in the bottom-right corner of this site. This interactive Tamagotchi-style widget demonstrates event-driven architecture, state management, and real-time UI updates -- all built with React hooks and TypeScript.
          </p>
          <p className="text-gray-400">
            Click the floating button in the bottom-right corner to interact with your companion. Feed it, play with it, and watch its mood and stats evolve over time. The system showcases observer patterns, component composition, and persistent client-side state.
          </p>
        </div>
      </section>

      {/* Resume Download Section */}
      <section className="container mx-auto px-6 py-16">
        <ResumeDownload />
      </section>
    </div>
  );
}
