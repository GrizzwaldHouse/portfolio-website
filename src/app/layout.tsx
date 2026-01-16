import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { siteMetadata, jsonLd } from '@/metadata';
import GraduationAnnouncement from '@/components/GraduationAnnouncement';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* Additional meta tags for better SEO */}
        <meta name="theme-color" content="#0f172a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={inter.className}>
        {/* Graduation Announcement Banner (auto-fades after graduation) */}
        <GraduationAnnouncement />
        
        {/* Navigation */}
        <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-40">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="text-xl font-bold bg-gradient-to-r from-[#FFCC00] to-[#D50032] bg-clip-text text-transparent">
                Marcus Daley
              </a>
              <div className="flex gap-6">
                <a href="/" className="text-gray-300 hover:text-[#FFCC00] transition">
                  Home
                </a>
                <a href="/projects" className="text-gray-300 hover:text-[#FFCC00] transition">
                  Projects
                </a>
                <a href="/blog" className="text-gray-300 hover:text-[#FFCC00] transition">
                  Blog
                </a>
                <a href="/about" className="text-gray-300 hover:text-[#FFCC00] transition">
                  About
                </a>
                <a href="/contact" className="text-gray-300 hover:text-[#FFCC00] transition">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-slate-900 border-t border-slate-800 py-8 mt-20">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* About Section */}
              <div>
                <h3 className="text-white font-bold mb-3">Marcus Daley</h3>
                <p className="text-gray-400 text-sm">
                  Tool Programmer & Game Developer. Navy veteran specializing in Unreal Engine development.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-white font-bold mb-3">Quick Links</h3>
                <div className="flex flex-col gap-2">
                  <a href="/projects" className="text-gray-400 hover:text-[#FFCC00] text-sm transition">
                    Projects
                  </a>
                  <a href="/blog" className="text-gray-400 hover:text-[#FFCC00] text-sm transition">
                    Blog
                  </a>
                  <a href="/about" className="text-gray-400 hover:text-[#FFCC00] text-sm transition">
                    About
                  </a>
                  <a href="/contact" className="text-gray-400 hover:text-[#FFCC00] text-sm transition">
                    Contact
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-white font-bold mb-3">Connect</h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/in/marcusdaley-gamedev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#FFCC00] transition"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a
                    href="https://github.com/GrizzwaldHouse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#FFCC00] transition"
                    aria-label="GitHub"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@marcusdaley7301"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#FFCC00] transition"
                    aria-label="YouTube"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-slate-800 pt-6 text-center text-gray-400 text-sm">
              <p>© {new Date().getFullYear()} Marcus Daley. All rights reserved.</p>
              <p className="mt-2">
                Built with Next.js, TypeScript, and Tailwind CSS • Full Sail University Graduate
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
