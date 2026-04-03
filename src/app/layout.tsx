// layout.tsx
// Developer: Marcus Daley
// Date: 2026-04-03
// Purpose: Root layout with Command Center themed navigation and footer.
//          Stays as a server component for SEO. Interactive nav and pet widget
//          are extracted as client components.

import type { Metadata } from 'next';
import './globals.css';
import { siteMetadata, jsonLd } from '@/metadata';
import NavBar from '@/components/NavBar';
import TamagotchiWidget from '@/components/Tamagotchi/TamagotchiWidget';

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="font-sans">
        {/* Command Center Navigation (client component for active link state) */}
        <NavBar />

        {/* Spacer for fixed nav */}
        <div className="h-14" />

        {/* Main Content */}
        <main>{children}</main>

        {/* Tamagotchi Widget — floating on all pages */}
        <TamagotchiWidget />

        {/* Command Center Footer */}
        <footer className="bg-slate-950 border-t border-slate-800/50 py-12 mt-20">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-10 mb-10">
              {/* About */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-[10px]">
                    MD
                  </div>
                  <h3 className="text-white font-bold tracking-wide">MARCUS.DALEY</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Tool Programmer &amp; Game Developer. Navy veteran building event-driven systems
                  and AI-powered game development tools.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-gray-400 font-mono text-xs tracking-widest uppercase mb-4">Navigation</h3>
                <div className="flex flex-col gap-2">
                  {[
                    { href: '/projects', label: 'Projects' },
                    { href: '/blog', label: 'Dev Log' },
                    { href: '/about', label: 'About' },
                    { href: '/contact', label: 'Contact' },
                  ].map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-gray-500 hover:text-cyan-400 text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div>
                <h3 className="text-gray-400 font-mono text-xs tracking-widest uppercase mb-4">Connect</h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/in/marcusdaley-gamedev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-cyan-400 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a
                    href="https://github.com/GrizzwaldHouse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-cyan-400 transition-colors"
                    aria-label="GitHub"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@marcusdaley7301"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-cyan-400 transition-colors"
                    aria-label="YouTube"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800/50 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 text-xs font-mono">
                &copy; {new Date().getFullYear()} MARCUS.DALEY // ALL RIGHTS RESERVED
              </p>
              <p className="text-gray-600 text-xs font-mono">
                BUILT WITH NEXT.JS + TYPESCRIPT + TAILWIND // EVENT-DRIVEN ARCHITECTURE
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
