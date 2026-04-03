// page.tsx (contact)
// Developer: Marcus Daley
// Date: 2026-04-03
// Purpose: Communication hub with channel panels, base of operations,
//          system status, and mission parameters sections.

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-cyan-400 text-sm tracking-widest uppercase mb-4">
            // establishing_connection
          </p>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            OPEN CHANNEL
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Establish a communication link
          </p>
        </div>

        {/* Communication Channels - 2x2 Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Email */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 group group-hover:shadow-lg group-hover:shadow-cyan-500/10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400 font-mono">ONLINE</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Email</h3>
            <a
              href="mailto:daleym12@gmail.com"
              className="text-cyan-400 hover:text-cyan-300 transition text-lg break-words"
            >
              daleym12@gmail.com
            </a>
            <p className="text-sm text-gray-400 mt-3">
              Best for project inquiries and professional opportunities
            </p>
          </div>

          {/* LinkedIn */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 group group-hover:shadow-lg group-hover:shadow-cyan-500/10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400 font-mono">ONLINE</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">LinkedIn</h3>
            <a
              href="https://www.linkedin.com/in/marcusdaley-gamedev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition text-lg break-words"
            >
              linkedin.com/in/marcusdaley-gamedev
            </a>
            <p className="text-sm text-gray-400 mt-3">
              Connect with me professionally
            </p>
          </div>

          {/* GitHub */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 group group-hover:shadow-lg group-hover:shadow-cyan-500/10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400 font-mono">ONLINE</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">GitHub</h3>
            <a
              href="https://github.com/GrizzwaldHouse"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition text-lg break-words"
            >
              github.com/GrizzwaldHouse
            </a>
            <p className="text-sm text-gray-400 mt-3">
              View my code repositories and projects
            </p>
          </div>

          {/* YouTube */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 group group-hover:shadow-lg group-hover:shadow-cyan-500/10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400 font-mono">ONLINE</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">YouTube</h3>
            <a
              href="https://www.youtube.com/@marcusdaley7301"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition text-lg break-words"
            >
              @marcusdaley7301
            </a>
            <p className="text-sm text-gray-400 mt-3">
              Project demos and development videos
            </p>
          </div>
        </div>

        {/* Base of Operations */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
            <p className="font-mono text-cyan-400 text-sm tracking-widest uppercase mb-6">
              // base_of_operations
            </p>
            <h2 className="text-2xl font-bold text-white mb-6">
              BASE OF OPERATIONS
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Location */}
              <div>
                <p className="font-mono text-gray-500 text-xs uppercase mb-2">Location</p>
                <p className="text-gray-300 text-lg">
                  Temecula, California, United States
                </p>
              </div>

              {/* Availability */}
              <div>
                <p className="font-mono text-gray-500 text-xs uppercase mb-2">Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <p className="text-green-400 font-semibold">
                    Available for Remote Work
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Parameters */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-xl p-8">
            <p className="font-mono text-cyan-400 text-sm tracking-widest uppercase mb-4">
              // mission_parameters
            </p>
            <h2 className="text-2xl font-bold text-white mb-4">
              MISSION PARAMETERS
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              I&apos;m establishing a freelance tool programming career specializing in Unreal Engine development.
              I&apos;m seeking <span className="text-cyan-400 font-semibold">remote opportunities</span> that allow me to work from home
              while building long-term collaborations with game development teams.
            </p>

            <div className="space-y-3">
              <p className="font-mono text-cyan-400 text-sm mb-3">Accepted Roles:</p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400 font-mono">&gt;</span>
                  <span className="text-gray-300 font-mono">Tool Programmer</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400 font-mono">&gt;</span>
                  <span className="text-gray-300 font-mono">Gameplay Engineer</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400 font-mono">&gt;</span>
                  <span className="text-gray-300 font-mono">Technical QA</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400 font-mono">&gt;</span>
                  <span className="text-gray-300 font-mono">Graphics Programmer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
