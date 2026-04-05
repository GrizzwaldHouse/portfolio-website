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
      className="relative bg-gradient-to-br from-[var(--color-bg-primary)] via-[var(--color-bg-primary)] to-[var(--color-bg-primary)] py-20 px-6 overflow-hidden"
      aria-label="Introduction"
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_color-mix(in_srgb,var(--color-primary)_8%,transparent),_transparent_50%),_radial-gradient(ellipse_at_bottom_left,_color-mix(in_srgb,var(--color-secondary)_6%,transparent),_transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-[var(--color-text-primary)]">Six Impossible Things</span>{' '}
            <span
              className="font-mono bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent neon-text"
              style={{ fontSize: '0.65em', lineHeight: 1.6 }}
            >
              Before Breakfast
            </span>
          </h1>

          <p className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-lg">
            Game developer and U.S. Navy veteran building AI-driven game systems,
            custom engines, and automation tools. Full Sail University Graduate &mdash;
            Game Development.
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {['C++', 'Unreal Engine 5', 'Unity', 'Python', 'Clean Architecture'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono bg-[var(--color-bg-secondary)]/90 text-[var(--color-primary)]/80 rounded border border-[var(--color-primary)]/20 hover:border-[var(--color-primary)]/50 hover:text-[var(--color-primary)] transition-all duration-300 uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="px-6 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-[var(--color-bg-primary)] font-semibold rounded-xl shadow-lg hover:shadow-[var(--color-primary)]/20 hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg-primary)]"
            >
              View Projects
            </Link>
            <button
              onClick={() => setHireOpen(true)}
              className="px-6 py-3 border border-[var(--color-primary)]/40 text-[var(--color-primary)] rounded-xl hover:bg-[var(--color-primary)]/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg-primary)]"
            >
              Hire Marcus
            </button>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-[var(--color-border)] text-[var(--color-text-secondary)] rounded-xl hover:border-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg-primary)]"
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
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 blur-3xl" />
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
