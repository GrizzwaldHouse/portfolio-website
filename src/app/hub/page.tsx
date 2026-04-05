'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import ThreeHero from '@/components/ThreeHero';

const missions = [
  {
    id: 'portfolio',
    title: 'Main Portfolio',
    description:
      'Professional showcase of game development projects, tools, and graphics engineering work. Island Escape, Vulkan Renderer, UnrealMCP, and more.',
    tags: ['C++', 'UE5', 'Vulkan', 'Python'],
    link: '/',
    linkText: 'Launch Mission',
    color: 'gold',
    icon: (
      <svg width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: 'service-animal',
    title: 'Service Animal Game',
    description:
      'Interactive Tamagotchi-style simulation for service animal care training. Manage happiness, hunger, energy, and cleanliness of your virtual companion.',
    tags: ['Next.js', 'React', 'Zustand', 'Framer'],
    link: '/service-animal-game',
    linkText: 'Start Training',
    color: 'red',
    icon: (
      <svg width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    id: 'service-dog',
    title: 'Service Dog Selector',
    description:
      'Interactive animal selection experience with game mechanics and state management. Explore different service dog types and find your perfect match.',
    tags: ['Next.js', 'TypeScript', 'Formik', 'Recharts'],
    link: '/service-dog-portfolio',
    linkText: 'Explore Dogs',
    color: 'navy',
    icon: (
      <svg width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    ),
  },
];

const skills = [
  { name: 'Tool Programming (C++, Python, UE5)', percent: 95 },
  { name: 'Graphics Programming (Vulkan, GLSL, PBR)', percent: 88 },
  { name: 'Quality Assurance & Testing', percent: 92 },
  { name: 'Web Development (React, Next.js, TypeScript)', percent: 85 },
];

const stats = [
  { value: '9+', label: 'Years Navy Service' },
  { value: '120', label: 'Credits Earned' },
  { value: '3.8+', label: 'GPA' },
  { value: "Feb '26", label: 'Graduation' },
];

const colorClasses = {
  gold: {
    border: 'border-[#FFCC00]/30 hover:border-[#FFCC00]',
    accent: 'before:bg-gradient-to-r before:from-[#FFCC00] before:to-[#FFD633]',
    icon: 'bg-[#FFCC00]/20 text-[#FFCC00]',
    title: 'text-[#FFCC00]',
    tag: 'bg-[#FFCC00]/20 text-[#FFCC00]',
    link: 'text-[#FFCC00]',
    shadow: 'hover:shadow-[#FFCC00]/30',
  },
  red: {
    border: 'border-[#D50032]/30 hover:border-[#D50032]',
    accent: 'before:bg-gradient-to-r before:from-[#D50032] before:to-[#E5114A]',
    icon: 'bg-[#D50032]/20 text-[#D50032]',
    title: 'text-[#D50032]',
    tag: 'bg-[#D50032]/20 text-[#D50032]',
    link: 'text-[#D50032]',
    shadow: 'hover:shadow-[#D50032]/30',
  },
  navy: {
    border: 'border-slate-500/30 hover:border-slate-400',
    accent: 'before:bg-gradient-to-r before:from-slate-500 before:to-slate-400',
    icon: 'bg-slate-600/30 text-gray-300',
    title: 'text-gray-300',
    tag: 'bg-slate-600/30 text-gray-300',
    link: 'text-gray-300',
    shadow: 'hover:shadow-slate-500/30',
  },
};

export default function HubPage() {
  const skillsRef = useRef<HTMLDivElement>(null);
  const skillBarsAnimated = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!skillsRef.current || skillBarsAnimated.current) return;

      const rect = skillsRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        skillBarsAnimated.current = true;
        const fills = skillsRef.current.querySelectorAll('.skill-fill');
        fills.forEach((fill) => fill.classList.add('animate-skill'));
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) translateY(-10px)`;
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) translateY(0)';
  };

  return (
    <>
      <ThreeHero />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFCC00]/10 border border-[#FFCC00]/30 rounded-full text-sm text-[#FFCC00] mb-8 animate-pulse">
            <span>US Navy Veteran</span>
            <span>|</span>
            <span>Full Sail University</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-[#FFCC00] via-white to-[#D50032] bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
            MARCUS DALEY
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-4">
            Tool Programmer | Game Development QA | Graphics Engineer
          </p>

          <p className="text-lg text-[#FFCC00] font-semibold mb-16">
            Choose Your Mission
          </p>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 text-sm animate-bounce">
            <span>Scroll to Explore</span>
            <svg width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Missions Section */}
        <section className="py-24 px-6 max-w-6xl mx-auto" id="missions">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-[#FFCC00] to-[#D50032] bg-clip-text text-transparent">
            Select Mission
          </h2>
          <p className="text-center text-gray-400 mb-16 text-lg">
            Explore my portfolio of game development projects and interactive experiences
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {missions.map((mission) => {
              const colors = colorClasses[mission.color as keyof typeof colorClasses];
              return (
                <Link href={mission.link} key={mission.id} className="block">
                  <div
                    className={`relative bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 cursor-pointer overflow-hidden
                      ${colors.border} ${colors.shadow} hover:shadow-2xl
                      before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:rounded-t-2xl ${colors.accent}`}
                    style={{ transformStyle: 'preserve-3d' }}
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={handleCardMouseLeave}
                  >
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${colors.icon}`}>
                      {mission.icon}
                    </div>

                    <h3 className={`text-2xl font-bold mb-3 ${colors.title}`}>{mission.title}</h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">{mission.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {mission.tags.map((tag) => (
                        <span key={tag} className={`px-3 py-1 rounded-full text-xs font-medium ${colors.tag}`}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className={`inline-flex items-center gap-2 font-semibold ${colors.link} group-hover:gap-4 transition-all`}>
                      {mission.linkText}
                      <svg width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-24 px-6 bg-black/30" ref={skillsRef}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-[#FFCC00] to-[#D50032] bg-clip-text text-transparent">
              Technical Arsenal
            </h2>
            <p className="text-center text-gray-400 mb-16 text-lg">
              Core competencies honed through Navy service and game development studies
            </p>

            <div className="space-y-8">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-gray-200">{skill.name}</span>
                    <span className="text-[#FFCC00] font-bold">{skill.percent}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="skill-fill h-full bg-gradient-to-r from-[#FFCC00] to-[#D50032] rounded-full origin-left scale-x-0 transition-transform duration-1000 ease-out"
                      style={{ width: `${skill.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-8 bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-white/10"
              >
                <div className="text-4xl font-black bg-gradient-to-r from-[#FFCC00] to-[#D50032] bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer provided by layout */}
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }

        .animate-skill {
          transform: scaleX(1) !important;
        }
      `}</style>
    </>
  );
}
