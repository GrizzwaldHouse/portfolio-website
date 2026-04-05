'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Gamepad2, MessageSquare, ArrowLeft, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Gamepad2 className="w-8 h-8" />,
    title: 'Interactive Training',
    description: 'Care for your virtual service animal companion through feeding, playing, and nurturing.',
    color: 'emerald',
    link: '/service-animal-game/game',
    cta: 'Start Training',
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    title: 'Provide Feedback',
    description: 'Help us improve the training simulation with your valuable insights and suggestions.',
    color: 'blue',
    link: '#',
    cta: 'Coming Soon',
  },
];

const colorMap = {
  emerald: {
    bg: 'bg-emerald-500/20',
    border: 'border-emerald-500/30 hover:border-emerald-500',
    text: 'text-emerald-400',
    glow: 'hover:shadow-emerald-500/30',
  },
  blue: {
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/30 hover:border-blue-500',
    text: 'text-blue-400',
    glow: 'hover:shadow-blue-500/30',
  },
};

export default function ServiceAnimalGameHome() {
  const [particles] = useState(() =>
    [...Array(20)].map(() => ({
      initialX: Math.random() * 1000,
      initialY: Math.random() * 800,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }))
  );

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-emerald-950/20 to-slate-900 pointer-events-none" />

      {/* Floating particles effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-500/30 rounded-full"
            initial={{ x: particle.initialX, y: particle.initialY }}
            animate={{
              y: [null, -20, 20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link
              href="/hub"
              className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Hub</span>
            </Link>
            <div className="flex items-center gap-2 text-emerald-400">
              <Heart className="w-5 h-5" />
              <span className="font-semibold">Service Animal Training</span>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-sm text-emerald-400 mb-8">
                <Sparkles className="w-4 h-4" />
                <span>Interactive Experience</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Service Animal
                </span>
                <br />
                <span className="text-white">Training Simulator</span>
              </h1>

              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                Experience the responsibilities of caring for a service animal through our
                interactive Tamagotchi-style simulation. Learn to balance nutrition,
                exercise, hygiene, and emotional well-being.
              </p>
            </motion.div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {features.map((feature, index) => {
                const colors = colorMap[feature.color as keyof typeof colorMap];
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  >
                    <Link href={feature.link}>
                      <div
                        className={`relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 cursor-pointer overflow-hidden
                          ${colors.border} ${colors.glow} hover:shadow-xl hover:-translate-y-1`}
                      >
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${colors.bg} ${colors.text}`}>
                          {feature.icon}
                        </div>

                        <h2 className={`text-2xl font-bold mb-3 ${colors.text}`}>
                          {feature.title}
                        </h2>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                          {feature.description}
                        </p>

                        <span className={`inline-flex items-center gap-2 font-semibold ${colors.text}`}>
                          {feature.cta}
                          <svg
                            width="16"
                            height="16"
                            aria-hidden="true"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-6 bg-black/20">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-black text-emerald-400">4</div>
                <div className="text-gray-500 text-sm">Care Actions</div>
              </div>
              <div>
                <div className="text-3xl font-black text-teal-400">100%</div>
                <div className="text-gray-500 text-sm">Interactive</div>
              </div>
              <div>
                <div className="text-3xl font-black text-cyan-400">Real-time</div>
                <div className="text-gray-500 text-sm">Stats Tracking</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-white/10 text-center">
          <p className="text-gray-500 text-sm">
            Part of{' '}
            <Link href="/hub" className="text-emerald-400 hover:underline">
              Marcus Daley&apos;s Portfolio Hub
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
