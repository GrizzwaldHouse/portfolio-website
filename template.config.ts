/**
 * Template Configuration
 *
 * This file is the single source of truth for customizing the portfolio.
 * Fork this repo and modify this file to create your own portfolio.
 *
 * All personal data, branding, and feature flags are controlled here.
 */

// =============================================================================
// SITE CONFIGURATION
// =============================================================================

export const siteConfig = {
  // Basic Info
  name: 'Marcus Daley',
  title: 'Tool Programmer | Graphics Engineer | Technical QA',
  tagline: 'I build production-grade tools and rendering systems for game engines.',
  description:
    'Game development engineer specializing in tool programming, graphics engineering, and technical QA. Navy veteran bringing military-grade discipline to software development.',

  // URLs (update when you have a custom domain)
  url: 'https://portfolio.pages.dev',
  repository: 'https://github.com/GrizzwaldHouse/portfolio-website',

  // Contact & Social
  social: {
    github: 'https://github.com/GrizzwaldHouse',
    linkedin: 'https://www.linkedin.com/in/marcusdaley-gamedev',
    email: '', // Add if you want email contact
    twitter: '', // Add Twitter/X handle if desired
  },

  // Professional Details
  availability: {
    status: 'available', // 'available' | 'limited' | 'unavailable'
    startDate: 'March 2026',
    seeking: ['Tool Programming', 'Technical QA', 'Graphics Engineering'],
    remote: true,
  },

  // Education
  education: {
    institution: 'Full Sail University',
    degree: 'Bachelor of Science, Computer Science',
    concentration: 'Game Development',
    graduationDate: 'February 2026',
    gpa: '3.8+',
  },

  // Experience Highlights
  experience: {
    military: {
      branch: 'United States Navy',
      years: 9,
      role: 'Submarine Mechanical & Weapons Systems',
    },
  },
};

// =============================================================================
// BRAND CONFIGURATION
// =============================================================================

export const brandConfig = {
  // Color Palette
  colors: {
    // Primary action color
    primary: '#3B82F6', // Blue-500

    // Accent colors (Full Sail branding)
    accent: '#FFCC00', // Gold
    accentSecondary: '#D50032', // Red

    // Semantic colors
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',

    // Background
    background: {
      primary: '#0F172A', // Slate-900
      secondary: '#1E293B', // Slate-800
      card: '#1E293B',
    },

    // Text
    text: {
      primary: '#F8FAFC', // Slate-50
      secondary: '#94A3B8', // Slate-400
      muted: '#64748B', // Slate-500
    },
  },

  // Typography (Google Fonts)
  fonts: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'JetBrains Mono',
  },

  // Logo (optional - set to null if using text logo)
  logo: null as string | null,

  // Theme keywords for visual generation
  visualKeywords: [
    'technical',
    'game development',
    'systems architecture',
    'precision engineering',
  ],
};

// =============================================================================
// FEATURE FLAGS
// =============================================================================

export const featureFlags = {
  // Demo Runtimes
  demos: {
    enabled: true,
    staticEmbed: true, // itch.io embeds
    terminal: true, // Terminal emulator demos
    webglViewer: false, // 3D model viewer (coming soon)
    wasmGames: false, // Full WASM games (coming soon)
  },

  // Portfolio Modes
  mode: 'developer' as 'developer' | 'client',

  // Developer Mode: Full portfolio with demos, GitHub links, tech details
  // Client Mode: Case study focus, inquiry CTAs, no raw GitHub links

  // Content Sections
  sections: {
    hero: true,
    about: true,
    projects: true,
    contact: true,
    blog: false, // Enable if you have blog content
    resume: true,
  },

  // Interactive Features
  interactions: {
    graduationCountdown: true,
    availabilityBadge: true,
    videoGallery: true,
    projectFiltering: false, // Coming soon
  },

  // Analytics (privacy-respecting)
  analytics: {
    enabled: false,
    provider: null as 'plausible' | 'umami' | 'google' | null,
    siteId: '',
  },

  // Coming Soon Features
  experimental: {
    renderer3D: false, // Paid 3D rendering service
    aiChat: false, // AI-powered portfolio assistant
  },
};

// =============================================================================
// CLIENT MODE CONFIGURATION
// =============================================================================

/**
 * Client Mode transforms the portfolio for business/freelance use.
 * Enable with: featureFlags.mode = 'client'
 */
export const clientModeConfig = {
  // Replace "View Repository" with case study links
  caseStudyUrls: {} as Record<string, string>,

  // Contact CTA
  contactCTA: {
    heading: 'Let\'s Work Together',
    subheading: 'Available for game development tool programming and technical consulting.',
    buttonText: 'Start a Conversation',
    buttonUrl: '/contact',
  },

  // Hide technical details inappropriate for non-technical clients
  hideElements: [
    'tech-stack-badges',
    'github-links',
    'code-snippets',
  ],

  // Pricing tiers (if offering services)
  services: [] as Array<{
    name: string;
    description: string;
    price: string;
    features: string[];
  }>,
};

// =============================================================================
// PROJECTS OVERRIDE
// =============================================================================

/**
 * Override project data for template customization.
 * Set featured projects, custom ordering, etc.
 */
export const projectsConfig = {
  // Which projects to feature (by slug)
  featured: [
    'island-escape',
    'vulkan-renderer',
    'wizardjam',
    'unrealmcp',
  ],

  // Project order (slugs in display order)
  order: [
    'island-escape',
    'vulkan-renderer',
    'wizardjam',
    'unrealmcp',
    'spaghetti-relay',
    'the-dynamic-design',
  ],

  // Projects to hide
  hidden: [] as string[],
};

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type SiteConfig = typeof siteConfig;
export type BrandConfig = typeof brandConfig;
export type FeatureFlags = typeof featureFlags;
export type ClientModeConfig = typeof clientModeConfig;
export type ProjectsConfig = typeof projectsConfig;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Check if a feature is enabled
 */
export function isFeatureEnabled(
  path: string
): boolean {
  const parts = path.split('.');
  let current: unknown = featureFlags;

  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return false;
    }
  }

  return current === true;
}

/**
 * Check if running in client mode
 */
export function isClientMode(): boolean {
  return featureFlags.mode === 'client';
}

/**
 * Get CSS variable for a brand color
 */
export function getBrandColor(
  colorPath: keyof typeof brandConfig.colors | string
): string {
  const parts = colorPath.split('.');
  let current: unknown = brandConfig.colors;

  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return brandConfig.colors.primary;
    }
  }

  return typeof current === 'string' ? current : brandConfig.colors.primary;
}
