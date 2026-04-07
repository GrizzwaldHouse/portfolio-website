import Image from 'next/image';
import SkillsSection from '@/components/sections/SkillsSection';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-bg-primary)] via-[var(--color-bg-primary)] to-[var(--color-bg-primary)]">
      <div className="container mx-auto px-6 py-20">
        {/* Header Section with Profile */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          {/* Profile Image */}
          <div className="w-full lg:w-1/3 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[var(--color-primary)] shadow-2xl">
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
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
              About Me
            </h1>
            <p className="text-xl text-[var(--color-text-secondary)] mb-4">
              From Submarines to Game Development
            </p>
            <div className="inline-block px-4 py-2 bg-[var(--color-primary)]/20 border border-[var(--color-primary)] rounded-lg">
              <p className="text-[var(--color-primary)] font-semibold">
                Full Sail University Graduate &bull; February 2026
              </p>
            </div>
          </div>
        </div>

        {/* Journey Section */}
        <section className="mb-16">
          <div className="bg-[var(--color-bg-secondary)]/50 backdrop-blur-sm p-8 rounded-xl border border-[var(--color-border)]">
            <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6">My Journey</h2>

            <div className="space-y-4 text-[var(--color-text-secondary)] text-lg leading-relaxed">
              <p>
                I&apos;m Marcus Daley, a Navy veteran transitioning from submarine mechanics and weapons systems to
                game development. After 9 years serving my country, I discovered my passion for programming when
                I realized I enjoyed thinking about code problems as much as I used to enjoy playing video games.
              </p>

              <p>
                Having earned my Bachelor of Science in Computer Science with a Game Development
                concentration from <span className="text-[var(--color-primary)] font-semibold">Full Sail University</span> (graduated
                February 2026), I specialize in tool programming, quality assurance, and graphics engineering
                for the game development industry.
              </p>

              <p>
                My military background in systematic problem-solving and quality assurance provides a unique
                foundation for technical development work. I bring military-grade precision to game development
                quality standards, combining discipline with creative technical expertise.
              </p>
            </div>
          </div>
        </section>

        {/* Professional Focus */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
            Professional Focus
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Tool Programming */}
            <div className="bg-[var(--color-bg-secondary)]/50 backdrop-blur-sm p-8 rounded-xl border border-[var(--color-tertiary)]/30 hover:border-[var(--color-tertiary)] transition-all duration-300">
              <div className="w-12 h-12 bg-[var(--color-tertiary)]/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">&#x1F6E0;&#xFE0F;</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-tertiary)] mb-4">Tool Programming</h3>
              <p className="text-[var(--color-text-secondary)] mb-4">
                Specializing in Unreal Engine editor tools and AI-powered workflows. Built custom C++ subsystems
                and Python integration for game development automation.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <span className="text-[var(--color-tertiary)]">&#9657;</span>
                  <span>Custom editor utilities</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <span className="text-[var(--color-tertiary)]">&#9657;</span>
                  <span>MCP server integration</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <span className="text-[var(--color-tertiary)]">&#9657;</span>
                  <span>Python automation tools</span>
                </div>
              </div>
            </div>

            {/* Quality Assurance */}
            <div className="bg-[var(--color-bg-secondary)]/50 backdrop-blur-sm p-8 rounded-xl border border-[var(--color-primary)]/30 hover:border-[var(--color-primary)] transition-all duration-300">
              <div className="w-12 h-12 bg-[var(--color-primary)]/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">&#x2713;</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-4">Quality Assurance</h3>
              <p className="text-[var(--color-text-secondary)] mb-4">
                Automated testing frameworks for game engines. Expert in AI systems validation, algorithm testing,
                and performance optimization.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <span className="text-[var(--color-primary)]">&#9657;</span>
                  <span>Automated test frameworks</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <span className="text-[var(--color-primary)]">&#9657;</span>
                  <span>AI validation systems</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <span className="text-[var(--color-primary)]">&#9657;</span>
                  <span>Performance profiling</span>
                </div>
              </div>
            </div>

            {/* Graphics Engineering */}
            <div className="bg-[var(--color-bg-secondary)]/50 backdrop-blur-sm p-8 rounded-xl border border-[var(--color-secondary)]/30 hover:border-[var(--color-secondary)] transition-all duration-300">
              <div className="w-12 h-12 bg-[var(--color-secondary)]/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">&#x1F3A8;</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-secondary)] mb-4">Graphics Engineering</h3>
              <p className="text-[var(--color-text-secondary)] mb-4">
                Low-level graphics programming with Vulkan API. Custom 3D rendering engines achieving significant
                performance improvements through optimization.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <span className="text-[var(--color-secondary)]">&#9657;</span>
                  <span>Vulkan API development</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <span className="text-[var(--color-secondary)]">&#9657;</span>
                  <span>PBR materials system</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <span className="text-[var(--color-secondary)]">&#9657;</span>
                  <span>35% performance gains</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="mb-16">
          <div className="bg-[var(--color-bg-secondary)]/50 backdrop-blur-sm p-8 rounded-xl border border-[var(--color-primary)]/30">
            <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6">Education</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
                  Bachelor of Science in Computer Science
                </h3>
                <p className="text-lg text-[var(--color-primary)] mb-2">
                  Full Sail University &bull; Game Development Concentration
                </p>
                <p className="text-[var(--color-text-secondary)] mb-3">
                  Graduated: February 2026 &bull; GPA: 3.8+
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-[var(--color-primary)]/20 text-[var(--color-primary)] rounded-full text-sm">
                    120 Credits Earned
                  </span>
                  <span className="px-3 py-1 bg-[var(--color-secondary)]/20 text-[var(--color-secondary)] rounded-full text-sm">
                    Tool Programming Focus
                  </span>
                  <span className="px-3 py-1 bg-[var(--color-tertiary)]/20 text-[var(--color-tertiary)] rounded-full text-sm">
                    Technical QA Specialization
                  </span>
                </div>
              </div>

              <div className="border-t border-[var(--color-border)] pt-6">
                <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
                  US Navy Service
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  9+ Years &bull; Submarine Mechanics &amp; Weapons Systems
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills & Technologies — animated grid + chart */}
        <SkillsSection />
      </div>
    </div>
  );
}
