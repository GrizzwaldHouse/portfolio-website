'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig, freelanceLinks } from '@/data/site-config';
import FreelanceModal from '@/components/FreelanceModal';

// Above-the-fold hero for the home page; portrait, tagline, skill badges, and hire CTA with freelance modal.
export default function HeroSection() {
  const [hireOpen, setHireOpen] = useState(false);

  return (
    <section
      className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-slate-900 py-20 px-6 overflow-hidden"
      aria-label="Introduction"
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,204,0,0.08),_transparent_50%),_radial-gradient(ellipse_at_bottom_left,_rgba(213,0,50,0.06),_transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-white">Six Impossible Things</span>{' '}
            <span
              className="font-mono bg-gradient-to-r from-[#FFCC00] to-[#D50032] bg-clip-text text-transparent neon-text"
              style={{ fontSize: '0.65em', lineHeight: 1.6 }}
            >
              Before Breakfast
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-lg">
            Game developer and U.S. Navy veteran building AI-driven game systems,
            custom engines, and automation tools. Full Sail University Graduate &mdash;
            Game Development.
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {['C++', 'Unreal Engine 5', 'Unity', 'Python', 'Clean Architecture'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono bg-slate-800/90 text-[#FFCC00]/80 rounded border border-[#FFCC00]/20 hover:border-[#FFCC00]/50 hover:text-[#FFCC00] transition-all duration-300 uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="px-6 py-3 bg-gradient-to-r from-[#FFCC00] to-[#D50032] text-slate-900 font-semibold rounded-xl shadow-lg hover:shadow-[#FFCC00]/20 hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              View Projects
            </Link>
            <button
              onClick={() => setHireOpen(true)}
              className="px-6 py-3 border border-[#FFCC00]/40 text-[#FFCC00] rounded-xl hover:bg-[#FFCC00]/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Hire Marcus
            </button>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-slate-600 text-gray-300 rounded-xl hover:border-slate-500 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:ring-offset-2 focus:ring-offset-slate-900"
              aria-label="LinkedIn Profile (opens in new tab)"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>

        {/* Portrait with subtle float animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            className="relative w-full h-[400px] md:h-[500px]"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FFCC00]/20 to-[#D50032]/20 blur-3xl" />
            <Image
              src="/images/profile.jpg"
              alt="Marcus Daley — Game Developer and U.S. Navy Veteran"
              fill
              className="object-contain drop-shadow-2xl rounded-2xl relative z-10"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </motion.div>
      </div>

      <FreelanceModal open={hireOpen} onClose={() => setHireOpen(false)} />
    </section>
  );
}
