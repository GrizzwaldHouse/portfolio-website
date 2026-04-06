export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#FFCC00] to-[#D50032] bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Let's discuss your next game development project
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Email */}
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-blue-500/30 hover:border-blue-500 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="bg-blue-500/20 p-4 rounded-lg">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                <a 
                  href="mailto:daleym12@gmail.com" 
                  className="text-blue-400 hover:text-blue-300 transition text-lg"
                >
                  daleym12@gmail.com
                </a>
                <p className="text-sm text-gray-300 mt-3">
                  Best for project inquiries and professional opportunities
                </p>
              </div>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-[#FFCC00]/30 hover:border-[#FFCC00] transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="bg-[#FFCC00]/20 p-4 rounded-lg">
                <svg className="w-8 h-8 text-[#FFCC00]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">LinkedIn</h3>
                <a 
                  href="https://www.linkedin.com/in/marcusdaley-gamedev" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FFCC00] hover:text-[#FFD633] transition text-lg break-words"
                >
                  linkedin.com/in/marcusdaley-gamedev
                </a>
                <p className="text-sm text-gray-300 mt-3">
                  Connect with me professionally
                </p>
              </div>
            </div>
          </div>

          {/* GitHub */}
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-purple-500/30 hover:border-purple-500 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="bg-purple-500/20 p-4 rounded-lg">
                <svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">GitHub</h3>
                <a 
                  href="https://github.com/GrizzwaldHouse" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition text-lg"
                >
                  github.com/GrizzwaldHouse
                </a>
                <p className="text-sm text-gray-300 mt-3">
                  View my code repositories and projects
                </p>
              </div>
            </div>
          </div>

          {/* YouTube */}
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-[#D50032]/30 hover:border-[#D50032] transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="bg-[#D50032]/20 p-4 rounded-lg">
                <svg className="w-8 h-8 text-[#D50032]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">YouTube</h3>
                <a 
                  href="https://www.youtube.com/@marcusdaley7301" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D50032] hover:text-[#E5114A] transition text-lg"
                >
                  @marcusdaley7301
                </a>
                <p className="text-sm text-gray-300 mt-3">
                  Project demos and development videos
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Location & Availability */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Location & Availability
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Location</h3>
                  <p className="text-gray-300">Temecula, California, United States</p>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-start gap-4">
                <div className="bg-[#FFCC00]/20 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-[#FFCC00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Availability</h3>
                  <p className="text-[#FFCC00] font-semibold mb-1">Graduating February 2026</p>
                  <p className="text-gray-300">Available for remote work</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seeking Roles */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-8 border border-blue-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">What I'm Looking For</h2>
            <p className="text-gray-200 mb-6">
              I'm establishing a freelance tool programming career specializing in Unreal Engine development. 
              I'm seeking <span className="text-[#FFCC00] font-semibold">remote opportunities</span> that allow me to work from home 
              while building long-term collaborations with game development teams.
            </p>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-[#FFCC00] mb-3">Ideal Opportunities:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span className="text-gray-300">Tool Programmer positions</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span className="text-gray-300">Gameplay Engineer roles</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span className="text-gray-300">Technical QA Specialist positions</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span className="text-gray-300">Graphics Programmer opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
