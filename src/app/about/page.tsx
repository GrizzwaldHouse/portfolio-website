import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-900">
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
              About Me
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              From Submarines to Game Development
            </p>
            <div className="inline-block px-4 py-2 bg-[#FFCC00]/20 border border-[#FFCC00] rounded-lg">
              <p className="text-[#FFCC00] font-semibold">
                Full Sail University Graduate • February 2026
              </p>
            </div>
          </div>
        </div>

        {/* Journey Section */}
        <section className="mb-16">
          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700">
            <h2 className="text-3xl font-bold text-[#FFCC00] mb-6">My Journey</h2>
            
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                I&apos;m Marcus Daley, a Navy veteran transitioning from submarine mechanics and weapons systems to
                game development. After 9 years serving my country, I discovered my passion for programming when 
                I realized I enjoyed thinking about code problems as much as I used to enjoy playing video games.
              </p>
              
              <p>
                Having earned my Bachelor of Science in Computer Science with a Game Development
                concentration from <span className="text-[#FFCC00] font-semibold">Full Sail University</span> (graduated
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
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#FFCC00] to-[#D50032] bg-clip-text text-transparent">
            Professional Focus
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Tool Programming */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-[#3B82F6]/30 hover:border-[#3B82F6] transition-all duration-300">
              <div className="w-12 h-12 bg-[#3B82F6]/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🛠️</span>
              </div>
              <h3 className="text-2xl font-bold text-[#3B82F6] mb-4">Tool Programming</h3>
              <p className="text-gray-300 mb-4">
                Specializing in Unreal Engine editor tools and AI-powered workflows. Built custom C++ subsystems
                and Python integration for game development automation.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-[#3B82F6]">▹</span>
                  <span>Custom editor utilities</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-[#3B82F6]">▹</span>
                  <span>MCP server integration</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-[#3B82F6]">▹</span>
                  <span>Python automation tools</span>
                </div>
              </div>
            </div>

            {/* Quality Assurance */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-[#FFCC00]/30 hover:border-[#FFCC00] transition-all duration-300">
              <div className="w-12 h-12 bg-[#FFCC00]/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-[#FFCC00] mb-4">Quality Assurance</h3>
              <p className="text-gray-300 mb-4">
                Automated testing frameworks for game engines. Expert in AI systems validation, algorithm testing, 
                and performance optimization.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-[#FFCC00]">▹</span>
                  <span>Automated test frameworks</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-[#FFCC00]">▹</span>
                  <span>AI validation systems</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-[#FFCC00]">▹</span>
                  <span>Performance profiling</span>
                </div>
              </div>
            </div>

            {/* Graphics Engineering */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-[#D50032]/30 hover:border-[#D50032] transition-all duration-300">
              <div className="w-12 h-12 bg-[#D50032]/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-2xl font-bold text-[#D50032] mb-4">Graphics Engineering</h3>
              <p className="text-gray-300 mb-4">
                Low-level graphics programming with Vulkan API. Custom 3D rendering engines achieving significant 
                performance improvements through optimization.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-[#D50032]">▹</span>
                  <span>Vulkan API development</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-[#D50032]">▹</span>
                  <span>PBR materials system</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-[#D50032]">▹</span>
                  <span>35% performance gains</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="mb-16">
          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-[#FFCC00]/30">
            <h2 className="text-3xl font-bold text-[#FFCC00] mb-6">Education</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Bachelor of Science in Computer Science
                </h3>
                <p className="text-lg text-[#FFCC00] mb-2">
                  Full Sail University • Game Development Concentration
                </p>
                <p className="text-gray-400 mb-3">
                  Graduated: February 2026 • GPA: 3.8+
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-[#FFCC00]/20 text-[#FFCC00] rounded-full text-sm">
                    120 Credits Earned
                  </span>
                  <span className="px-3 py-1 bg-[#D50032]/20 text-[#D50032] rounded-full text-sm">
                    Tool Programming Focus
                  </span>
                  <span className="px-3 py-1 bg-[#3B82F6]/20 text-[#3B82F6] rounded-full text-sm">
                    Technical QA Specialization
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  US Navy Service
                </h3>
                <p className="text-gray-400">
                  9+ Years • Submarine Mechanics & Weapons Systems
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills & Technologies */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Technical Expertise
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700">
              <h3 className="text-xl font-bold text-[#3B82F6] mb-4">Game Development</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-2 bg-[#3B82F6]/20 text-[#3B82F6] rounded-lg">Unreal Engine 5.5</span>
                <span className="px-3 py-2 bg-[#3B82F6]/20 text-[#3B82F6] rounded-lg">C++</span>
                <span className="px-3 py-2 bg-[#3B82F6]/20 text-[#3B82F6] rounded-lg">Blueprint</span>
                <span className="px-3 py-2 bg-[#3B82F6]/20 text-[#3B82F6] rounded-lg">Unity C#</span>
                <span className="px-3 py-2 bg-[#3B82F6]/20 text-[#3B82F6] rounded-lg">Perforce</span>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700">
              <h3 className="text-xl font-bold text-[#FFCC00] mb-4">Graphics & Systems</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-2 bg-[#FFCC00]/20 text-[#FFCC00] rounded-lg">Vulkan API</span>
                <span className="px-3 py-2 bg-[#FFCC00]/20 text-[#FFCC00] rounded-lg">GLSL</span>
                <span className="px-3 py-2 bg-[#FFCC00]/20 text-[#FFCC00] rounded-lg">PBR Rendering</span>
                <span className="px-3 py-2 bg-[#FFCC00]/20 text-[#FFCC00] rounded-lg">OpenGL</span>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700">
              <h3 className="text-xl font-bold text-[#D50032] mb-4">Tools & Automation</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-2 bg-[#D50032]/20 text-[#D50032] rounded-lg">Python FastMCP</span>
                <span className="px-3 py-2 bg-[#D50032]/20 text-[#D50032] rounded-lg">Editor Scripting</span>
                <span className="px-3 py-2 bg-[#D50032]/20 text-[#D50032] rounded-lg">Git/GitHub</span>
                <span className="px-3 py-2 bg-[#D50032]/20 text-[#D50032] rounded-lg">CI/CD</span>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700">
              <h3 className="text-xl font-bold text-gray-300 mb-4">Development Environments</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-2 bg-slate-700/50 text-gray-300 rounded-lg border border-slate-600">Visual Studio 2022</span>
                <span className="px-3 py-2 bg-slate-700/50 text-gray-300 rounded-lg border border-slate-600">VSCode</span>
                <span className="px-3 py-2 bg-slate-700/50 text-gray-300 rounded-lg border border-slate-600">Rider</span>
                <span className="px-3 py-2 bg-slate-700/50 text-gray-300 rounded-lg border border-slate-600">Claude Desktop</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
