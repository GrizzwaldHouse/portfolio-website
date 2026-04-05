'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dog, Gamepad2, Search, ArrowLeft, Award, Heart, Shield, Zap } from 'lucide-react';

const dogTypes = [
  {
    name: 'Guide Dog',
    icon: '🦮',
    description: 'Assists visually impaired individuals with navigation and obstacle detection.',
    traits: ['Patient', 'Focused', 'Reliable'],
    color: 'blue',
  },
  {
    name: 'Hearing Dog',
    icon: '🐕',
    description: 'Alerts deaf or hard-of-hearing individuals to important sounds.',
    traits: ['Alert', 'Responsive', 'Energetic'],
    color: 'purple',
  },
  {
    name: 'Mobility Dog',
    icon: '🐕‍🦺',
    description: 'Helps individuals with physical disabilities with daily tasks.',
    traits: ['Strong', 'Gentle', 'Supportive'],
    color: 'emerald',
  },
  {
    name: 'Medical Alert Dog',
    icon: '🐶',
    description: 'Detects and alerts to medical conditions like seizures or low blood sugar.',
    traits: ['Perceptive', 'Calm', 'Dedicated'],
    color: 'amber',
  },
];

const colorMap = {
  blue: {
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/30 hover:border-blue-500',
    text: 'text-blue-400',
    badge: 'bg-blue-500/20 text-blue-300',
  },
  purple: {
    bg: 'bg-purple-500/20',
    border: 'border-purple-500/30 hover:border-purple-500',
    text: 'text-purple-400',
    badge: 'bg-purple-500/20 text-purple-300',
  },
  emerald: {
    bg: 'bg-emerald-500/20',
    border: 'border-emerald-500/30 hover:border-emerald-500',
    text: 'text-emerald-400',
    badge: 'bg-emerald-500/20 text-emerald-300',
  },
  amber: {
    bg: 'bg-amber-500/20',
    border: 'border-amber-500/30 hover:border-amber-500',
    text: 'text-amber-400',
    badge: 'bg-amber-500/20 text-amber-300',
  },
};

export default function ServiceDogPortfolioHome() {
  const [particles] = useState(() =>
    [...Array(15)].map(() => ({
      initialX: Math.random() * 1000,
      initialY: Math.random() * 800,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 3,
    }))
  );

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-amber-950/10 to-slate-900 pointer-events-none" />

      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-500/30 rounded-full"
            initial={{ x: particle.initialX, y: particle.initialY }}
            animate={{
              y: [null, -30, 30],
              opacity: [0.2, 0.6, 0.2],
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
              className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Hub</span>
            </Link>
            <div className="flex items-center gap-2 text-amber-400">
              <Dog className="w-5 h-5" />
              <span className="font-semibold">Service Dog Selector</span>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-sm text-amber-400 mb-8">
                <Search className="w-4 h-4" />
                <span>Find Your Perfect Match</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  Service Dog
                </span>
                <br />
                <span className="text-white">Companion Selector</span>
              </h1>

              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                Discover the different types of service dogs and learn about their unique
                abilities, training requirements, and how they transform lives every day.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Dog Types Grid */}
        <section className="py-8 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {dogTypes.map((dog, index) => {
                const colors = colorMap[dog.color as keyof typeof colorMap];
                return (
                  <motion.div
                    key={dog.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                    className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1
                      ${colors.border}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`text-5xl p-3 rounded-xl ${colors.bg}`}>{dog.icon}</div>
                      <div className="flex-1">
                        <h3 className={`text-xl font-bold mb-2 ${colors.text}`}>{dog.name}</h3>
                        <p className="text-gray-400 text-sm mb-4">{dog.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {dog.traits.map((trait) => (
                            <span
                              key={trait}
                              className={`px-3 py-1 rounded-full text-xs font-medium ${colors.badge}`}
                            >
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Interactive Section CTA */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-3xl p-8 border border-amber-500/20 text-center"
            >
              <Gamepad2 className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-3">Interactive Experience</h2>
              <p className="text-gray-400 mb-6">
                Try our interactive game to learn more about caring for service dogs
                and test your knowledge!
              </p>
              <Link href="/service-dog-portfolio/game">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition"
                >
                  Play the Game
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Info Cards */}
        <section className="py-8 px-6 pb-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: <Award className="w-6 h-6" />, title: 'Certified Training', desc: '500+ hours of specialized training', bg: 'bg-amber-500/20', text: 'text-amber-400' },
                { icon: <Heart className="w-6 h-6" />, title: 'Emotional Bond', desc: 'Deep connection with handlers', bg: 'bg-pink-500/20', text: 'text-pink-400' },
                { icon: <Shield className="w-6 h-6" />, title: 'ADA Protected', desc: 'Legal access to public spaces', bg: 'bg-blue-500/20', text: 'text-blue-400' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="bg-slate-800/30 rounded-xl p-6 border border-white/5 text-center"
                >
                  <div className={`inline-flex p-3 rounded-xl ${item.bg} ${item.text} mb-4`}>
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-white/10 text-center">
          <p className="text-gray-500 text-sm">
            Part of{' '}
            <Link href="/hub" className="text-amber-400 hover:underline">
              Marcus Daley&apos;s Portfolio Hub
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
