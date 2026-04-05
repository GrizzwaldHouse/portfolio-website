import { Github, Linkedin } from 'lucide-react';
import { siteConfig } from '@/data/site-config';

// Site-wide footer with branding, social links, and copyright; rendered in the root layout.
export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <p className="font-bold bg-gradient-to-r from-[#FFCC00] to-[#D50032] bg-clip-text text-transparent">
              {siteConfig.name}
            </p>
            <p className="mt-1 text-sm text-gray-400">{siteConfig.tagline}</p>
          </div>

          {/* Links */}
          <div>
            <p className="font-semibold text-gray-300 mb-2">Connect</p>
            <div className="flex gap-4">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#FFCC00] transition focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:ring-offset-2 focus:ring-offset-slate-900 rounded p-1"
                aria-label="GitHub (opens in new tab)"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#FFCC00] transition focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:ring-offset-2 focus:ring-offset-slate-900 rounded p-1"
                aria-label="LinkedIn (opens in new tab)"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Legal */}
          <div className="text-sm text-gray-500">
            <p>&copy; 2026 {siteConfig.name}. All rights reserved.</p>
            <p className="mt-1">Built with Next.js &amp; TypeScript</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
