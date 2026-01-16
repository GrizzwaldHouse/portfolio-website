export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Island Escape - Team Voxel Survival Game",
      date: "January 2026",
      excerpt: "Our team project featuring procedural terrain generation, AI combat systems, and comprehensive tool programming. Built with Unreal Engine 5.5.",
      link: "https://theendisnear469.itch.io/island-escape",
      tags: ["Unreal Engine", "C++", "Tool Programming", "Team Project"],
      type: "external"
    },
    {
      id: 2,
      title: "Building MCP Integration for Unreal Engine",
      date: "December 2025",
      excerpt: "Developing a custom Model Context Protocol server that enables AI-assisted game development workflows directly in Unreal Engine.",
      tags: ["Python", "FastMCP", "Unreal Engine", "AI Tools"],
      type: "internal"
    },
    {
      id: 3,
      title: "From Submarines to Game Development",
      date: "November 2025",
      excerpt: "My journey transitioning from 9 years as a Navy submarine mechanic to pursuing a career in game development and tool programming.",
      tags: ["Career", "Navy Veteran", "Full Sail University"],
      type: "internal"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#FFCC00] to-[#D50032] bg-clip-text text-transparent">
            Blog & Project Updates
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Development insights, project updates, and lessons learned
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post) => (
            <article 
              key={post.id} 
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 hover:border-[#FFCC00] transition-all duration-300"
            >
              {/* Post Header */}
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold text-white flex-1">
                  {post.title}
                </h2>
                {post.type === "external" && (
                  <svg 
                    className="w-5 h-5 text-[#FFCC00] flex-shrink-0 ml-2 mt-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                    />
                  </svg>
                )}
              </div>

              {/* Date */}
              <p className="text-sm text-gray-400 mb-4">{post.date}</p>

              {/* Excerpt */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Read More Link */}
              {post.type === "external" && post.link ? (
                <a 
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFCC00] hover:bg-[#D50032] text-slate-900 hover:text-white font-semibold rounded-lg transition-all duration-300"
                >
                  View on itch.io
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                    />
                  </svg>
                </a>
              ) : (
                <button 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all duration-300 cursor-not-allowed opacity-50"
                  disabled
                >
                  Coming Soon
                </button>
              )}
            </article>
          ))}
        </div>

        {/* Featured Project Callout */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-r from-[#FFCC00]/20 to-[#D50032]/20 backdrop-blur-sm rounded-xl p-8 border border-[#FFCC00]/30">
            <div className="flex items-start gap-6">
              <div className="bg-[#FFCC00]/20 p-4 rounded-lg">
                <svg className="w-8 h-8 text-[#FFCC00]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Island Escape - Featured Project
                </h3>
                <p className="text-gray-300 mb-4">
                  A comprehensive team project showcasing my tool programming and gameplay engineering skills. 
                  Features include procedural terrain generation, AI combat systems, modular pickup/inventory 
                  system, and designer-controlled spawner systems built with delegates.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="https://theendisnear469.itch.io/island-escape"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFCC00] hover:bg-[#D50032] text-slate-900 hover:text-white font-semibold rounded-lg transition-all duration-300"
                  >
                    Play on itch.io
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                  <a 
                    href="/projects"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all duration-300"
                  >
                    View All Projects
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter/Updates Section */}
        <div className="max-w-2xl mx-auto mt-16 text-center">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-300 mb-6">
              Follow my journey as I complete my degree and enter the game development industry. 
              More blog posts and project updates coming soon!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a 
                href="https://www.linkedin.com/in/marcusdaley-gamedev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFCC00] hover:bg-[#D50032] text-slate-900 hover:text-white font-semibold rounded-lg transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Follow on LinkedIn
              </a>
              <a 
                href="https://github.com/GrizzwaldHouse"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                View GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
