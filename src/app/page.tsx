import Image from 'next/image';
import Link from 'next/link';

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
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Marcus Daley
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-4">
              Tool Programmer | Game Development QA | Graphics Engineer
            </p>
            <p className="text-xl text-[#FFCC00] mb-8 font-semibold">
              US Navy Veteran building next-generation game development tools and AI-powered workflows
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <Link
                href="/projects"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
              >
                View Projects
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 bg-[#FFCC00] hover:bg-[#D50032] text-slate-900 hover:text-white rounded-lg font-semibold transition-all duration-300 shadow-lg"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-slate-800/50 rounded-lg backdrop-blur-sm border border-slate-700">
            <div className="text-4xl font-bold text-[#FFCC00] mb-2">9+</div>
            <div className="text-gray-400">Years Navy Service</div>
          </div>
          <div className="text-center p-6 bg-slate-800/50 rounded-lg backdrop-blur-sm border border-slate-700">
            <div className="text-4xl font-bold text-blue-400 mb-2">120</div>
            <div className="text-gray-400">Credits Earned</div>
          </div>
          <div className="text-center p-6 bg-slate-800/50 rounded-lg backdrop-blur-sm border border-slate-700">
            <div className="text-4xl font-bold text-[#D50032] mb-2">3.8+</div>
            <div className="text-gray-400">GPA</div>
          </div>
          <div className="text-center p-6 bg-slate-800/50 rounded-lg backdrop-blur-sm border border-slate-700">
            <div className="text-4xl font-bold text-purple-400 mb-2">Feb 2026</div>
            <div className="text-gray-400">Graduation</div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#FFCC00] to-[#D50032] bg-clip-text text-transparent">
          Professional Focus
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Tool Programming */}
          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-blue-500/30 hover:border-blue-500 transition-all duration-300">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Tool Programming</h3>
            <p className="text-gray-300 mb-4">
              Custom editor tools and AI-powered workflows for Unreal Engine 5. Built MCP integration enabling real-time AI assistance in game development.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">C++</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Python</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">UE5</span>
            </div>
          </div>

          {/* Quality Assurance */}
          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-[#FFCC00]/30 hover:border-[#FFCC00] transition-all duration-300">
            <h3 className="text-2xl font-bold text-[#FFCC00] mb-4">Quality Assurance</h3>
            <p className="text-gray-300 mb-4">
              Military-grade QA expertise with automated testing frameworks. Specialized in AI systems validation and performance optimization.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[#FFCC00]/20 text-[#FFCC00] rounded-full text-sm">Testing</span>
              <span className="px-3 py-1 bg-[#FFCC00]/20 text-[#FFCC00] rounded-full text-sm">Validation</span>
              <span className="px-3 py-1 bg-[#FFCC00]/20 text-[#FFCC00] rounded-full text-sm">QA</span>
            </div>
          </div>

          {/* Graphics Programming */}
          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-[#D50032]/30 hover:border-[#D50032] transition-all duration-300">
            <h3 className="text-2xl font-bold text-[#D50032] mb-4">Graphics Programming</h3>
            <p className="text-gray-300 mb-4">
              Custom 3D rendering engines with Vulkan API. Achieved 35% performance improvements through low-level graphics optimization.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[#D50032]/20 text-[#D50032] rounded-full text-sm">Vulkan</span>
              <span className="px-3 py-1 bg-[#D50032]/20 text-[#D50032] rounded-full text-sm">GLSL</span>
              <span className="px-3 py-1 bg-[#D50032]/20 text-[#D50032] rounded-full text-sm">PBR</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
