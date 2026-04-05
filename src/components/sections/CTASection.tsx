import { Github, Linkedin } from 'lucide-react';
import { siteConfig } from '@/data/site-config';

// Bottom-of-page call-to-action with LinkedIn and GitHub links; reuse on any page that needs a contact CTA.
export default function CTASection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-slate-800/50 to-slate-900" aria-label="Contact">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#FFCC00] to-[#D50032] bg-clip-text text-transparent">
          Let&apos;s Build Something Together
        </h2>
        <p className="mt-4 text-lg text-gray-400">
          Available for freelance, contract, and remote full-time opportunities.
          Specializing in Unreal Engine tool programming, graphics engineering, and
          AI-driven game systems.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FFCC00] to-[#D50032] text-slate-900 font-semibold rounded-xl shadow-lg hover:shadow-[#FFCC00]/20 hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <Linkedin className="w-5 h-5" />
            Connect on LinkedIn
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-600 text-gray-300 rounded-xl hover:border-slate-500 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <Github className="w-5 h-5" />
            View All Repos
          </a>
        </div>
      </div>
    </section>
  );
}
