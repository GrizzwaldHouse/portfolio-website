// page.tsx (chat)
// Developer: Marcus Daley
// Date: 2026-04-03
// Purpose: Interactive demo page for the SPAGHETTI_RELAY chat server. Showcases the
//          C++ TCP chat server architecture through a browser-based simulation with
//          real command protocol, authentication, and bot conversations.

'use client';

import ChatTerminal from '@/components/ChatTerminal';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-4">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-mono text-cyan-400">LIVE SIMULATION</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              SPAGHETTI_RELAY
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-2">
            Network Chat Server — Interactive Demo
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            A browser-based simulation of my C++ Winsock2 TCP chat server. Features authentication,
            public/private messaging, session management, and real-time bot conversations.
            Try the commands below to interact with the server.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Terminal — 2 columns wide */}
          <div className="lg:col-span-2">
            <ChatTerminal />
          </div>

          {/* Sidebar — Architecture & Quick Reference */}
          <div className="space-y-6">
            {/* Quick Start */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider mb-4">
                Quick Start
              </h3>
              <div className="space-y-2 text-sm font-mono">
                <div className="flex gap-2">
                  <span className="text-gray-500">1.</span>
                  <code className="text-emerald-400">~login guest guest123</code>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-500">2.</span>
                  <code className="text-gray-300">Hello everyone!</code>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-500">3.</span>
                  <code className="text-emerald-400">~send NavyVet_Mike Hey!</code>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-500">4.</span>
                  <code className="text-emerald-400">~getlist</code>
                </div>
              </div>
            </div>

            {/* Command Reference */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider mb-4">
                Command Reference
              </h3>
              <div className="space-y-3 text-xs font-mono">
                {[
                  { cmd: '~help', desc: 'Show commands' },
                  { cmd: '~register <u> <p>', desc: 'Create account' },
                  { cmd: '~login <u> <p>', desc: 'Authenticate' },
                  { cmd: '~logout', desc: 'End session' },
                  { cmd: '~getlist', desc: 'Online users' },
                  { cmd: '~getlog', desc: 'Message history' },
                  { cmd: '~send <u> <msg>', desc: 'Private message' },
                ].map((item) => (
                  <div key={item.cmd} className="flex justify-between items-start gap-2">
                    <code className="text-cyan-300 whitespace-nowrap">{item.cmd}</code>
                    <span className="text-gray-500 text-right">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Diagram */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider mb-4">
                Server Architecture
              </h3>
              <div className="font-mono text-xs text-gray-400 space-y-1">
                <p className="text-cyan-400">┌─ Client Connection ─┐</p>
                <p>│  TCP Socket (8080)   │</p>
                <p>│  select() multiplex  │</p>
                <p className="text-cyan-400">└──────────┬───────────┘</p>
                <p>           │</p>
                <p className="text-yellow-400">┌──────────▼───────────┐</p>
                <p>│  Message Parser       │</p>
                <p>│  [1B len][NB data]    │</p>
                <p className="text-yellow-400">└──────────┬───────────┘</p>
                <p>     ┌─────┴─────┐</p>
                <p className="text-emerald-400">  ┌──▼──┐   ┌──▼──┐</p>
                <p>  │ CMD │   │ MSG │</p>
                <p className="text-emerald-400">  └──┬──┘   └──┬──┘</p>
                <p>     │         │</p>
                <p className="text-purple-400">  ┌──▼──────────▼──┐</p>
                <p>  │  Auth │ Route   │</p>
                <p>  │  Session Mgmt   │</p>
                <p className="text-purple-400">  └────────────────┘</p>
              </div>
            </div>

            {/* Source Code Link */}
            <a
              href="https://github.com/GrizzwaldHouse/MarcusDaley_SPAGHETTI_RELAY"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 hover:border-cyan-500/30 transition-all group"
            >
              <svg className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
                  View C++ Source Code
                </p>
                <p className="text-xs text-gray-500">
                  Original Winsock2 implementation
                </p>
              </div>
            </a>

            {/* Tech Stack */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider mb-3">
                Original Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {['C++', 'Winsock2', 'TCP/IP', 'select()', 'Win32'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-slate-700/50 text-cyan-300 text-xs font-mono rounded border border-slate-600/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <h3 className="text-sm font-mono text-emerald-400 uppercase tracking-wider mt-4 mb-3">
                Web Demo Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {['TypeScript', 'React', 'EventBus', 'Next.js'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-slate-700/50 text-emerald-300 text-xs font-mono rounded border border-slate-600/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Architecture Explanation */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-xl p-8">
            <h2 className="text-xl font-bold text-white mb-4">How This Works</h2>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-300">
              <div>
                <h3 className="text-cyan-400 font-semibold mb-2">Original C++ Server</h3>
                <p>
                  The SPAGHETTI_RELAY server uses Winsock2 TCP sockets with select()-based
                  multiplexing. Messages are framed with a 1-byte length prefix. The server
                  manages user accounts, sessions, and routes messages between authenticated clients.
                </p>
              </div>
              <div>
                <h3 className="text-emerald-400 font-semibold mb-2">Browser Simulation</h3>
                <p>
                  This demo faithfully reproduces the server logic in TypeScript, running entirely
                  in your browser. The same command protocol, authentication flow, and session
                  management from the C++ implementation are preserved. Bot users simulate
                  concurrent connections.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
