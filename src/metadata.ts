import type { Metadata } from 'next';

export const siteMetadata: Metadata = {
  metadataBase: new URL('https://marcusdaley.dev'),
  title: {
    default: 'Marcus Daley | Tool Programmer & Game Developer',
    template: '%s | Marcus Daley'
  },
  description: 'Navy veteran transitioning to game development. Specializing in Unreal Engine tool programming, technical QA, and graphics engineering. Full Sail University graduate (Feb 2026).',
  keywords: [
    'game developer',
    'tool programmer',
    'unreal engine developer',
    'C++ programmer',
    'gameplay engineer',
    'technical QA',
    'graphics engineer',
    'vulkan api',
    'navy veteran',
    'full sail university',
    'remote game developer',
    'freelance game programmer',
    'unreal engine tools',
    'MCP integration',
    'procedural generation',
    'voxel survival game'
  ],
  authors: [{ name: 'Marcus Daley', url: 'https://github.com/GrizzwaldHouse' }],
  creator: 'Marcus Daley',
  publisher: 'Marcus Daley',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://marcusdaley.dev',
    siteName: 'Marcus Daley Portfolio',
    title: 'Marcus Daley | Tool Programmer & Game Developer',
    description: 'Navy veteran specializing in Unreal Engine tool programming, technical QA, and graphics engineering. Full Sail University graduate.',
    images: [
      {
        url: '/images/profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Marcus Daley - Tool Programmer',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marcus Daley | Tool Programmer & Game Developer',
    description: 'Navy veteran specializing in Unreal Engine tool programming, technical QA, and graphics engineering.',
    images: ['/images/profile.jpg'],
    creator: '@marcusdaley7301',
  },
  verification: {
    google: 'your-google-verification-code', // Add after setting up Google Search Console
  },
  alternates: {
    canonical: 'https://marcusdaley.dev',
  },
};

// Structured data for rich results
export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Marcus Daley',
  url: 'https://marcusdaley.dev',
  image: '/images/profile.jpg',
  jobTitle: 'Tool Programmer & Game Developer',
  description: 'Navy veteran specializing in Unreal Engine tool programming, technical QA, and graphics engineering.',
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Full Sail University',
  },
  sameAs: [
    'https://www.linkedin.com/in/marcusdaley-gamedev',
    'https://github.com/GrizzwaldHouse',
    'https://www.youtube.com/@marcusdaley7301',
  ],
  knowsAbout: [
    'Unreal Engine',
    'C++',
    'Tool Programming',
    'Game Development',
    'Technical QA',
    'Graphics Programming',
    'Vulkan API',
  ],
  memberOf: {
    '@type': 'Organization',
    name: 'United States Navy',
    description: 'Submarine Mechanic and Weapons Systems - 9 years of service',
  },
};
