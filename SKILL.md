# Portfolio Website — Skills Reference

Quick-reference for Claude Code sessions. Reduces token usage by eliminating re-discovery.

## Project Identity

| Field | Value |
|-------|-------|
| Owner | Marcus Daley (GrizzwaldHouse on GitHub) |
| Role | Navy veteran, game developer, Full Sail graduate (Feb 2026) |
| Stack | Next.js 15 + React 19 + TypeScript 5.7 + Tailwind CSS 4 |
| Node | 20 (required for build) |
| Deploy | Vercel (primary) + Netlify (secondary) |
| URL | https://marcusdaley.dev |

## Routes (12 pages, 30 static paths)

| Route | Type | Purpose |
|-------|------|---------|
| `/` | Static (ISR 1h) | Home — HeroSection, FeaturedProjects, CTASection |
| `/projects` | Dynamic (SSR) | Project grid with CategoryFilter, GitHub enrichment |
| `/projects/[slug]` | SSG (15 slugs) | Detail pages generated from `projects.ts` |
| `/about` | Static | Journey, education, skills, tools |
| `/blog` | Static | Blog posts (2 "Coming Soon" placeholders) |
| `/contact` | Static | Email, GitHub, LinkedIn, availability |
| `/play` | Static | Interactive demos — Game of Life, Calculator |
| `/hub` | Static | 3D Three.js hero with mission selector cards |
| `/service-animal-game` | Static | Tamagotchi-style service animal care sim |
| `/service-animal-game/game` | Static | Game play screen |
| `/service-dog-portfolio` | Static | Service dog selection experience |
| `/service-dog-portfolio/game` | Static | Dog selector play screen |

## Design System (Full Sail branded)

### Colors — NEVER use generic blue-400/blue-500/blue-900
```
Primary gold:    #FFCC00  (headings, accents, active states, links)
Secondary red:   #D50032  (gradient endpoints, error states, CTAs)
Tertiary blue:   #3B82F6  (tool programming badges, email icon ONLY)
Background:      slate-900 (#0f172a), slate-800 (#1e293b)
Text:            white, gray-100, gray-300, gray-400, gray-500
```

### Gradients
```
Hero text:       from-[#FFCC00] via-white to-[#D50032]
CTA buttons:     from-[#FFCC00] to-[#D50032]
Section headers: from-[#FFCC00] to-[#D50032] bg-clip-text text-transparent
Background:      from-slate-900 via-slate-900 to-black (NOT via-blue-900)
```

### Fonts (loaded in layout.tsx via next/font/google)
```
Display/headings: Cinzel (--font-cinzel) weights 700-900
Body text:        Raleway (--font-raleway) weights 400-600
Code/mono:        JetBrains Mono (--font-jetbrains) weights 400-500
```

### UI Patterns
```
Cards:            bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl
Hover:            hover:border-[#FFCC00]/50 transition-colors duration-300
Focus:            focus:ring-2 focus:ring-[#FFCC00] focus:ring-offset-2 focus:ring-offset-slate-900
Glassmorphism:    bg-slate-800/80 backdrop-blur-sm
Tags/badges:      bg-[#FFCC00]/20 text-[#FFCC00] (gold) or bg-slate-700/50 text-gray-300 (neutral)
```

### CSS Theme Effects (globals.css)
```
.game-scanline   — Fixed gold scanline animation (z-index: 1, behind content)
.game-grid-bg    — Faint 32px grid overlay
.neon-text       — Gold neon pulse animation
.pixel-border    — Dashed gold pixel border
.crt-vignette    — Subtle edge darkening vignette
```

## Key Architecture Patterns

### Observer Pattern (deployment-observer.ts)
- Singleton `deploymentObserver` with re-entrancy guard
- Events: BUILD_STARTED, BUILD_SUCCEEDED, BUILD_FAILED, DEPLOYMENT_STATUS, CONFIG_UPDATED, THEME_CHANGED, PROJECT_MODIFIED
- `subscribe()` returns unsubscribe function
- `emit()` uses `Promise.allSettled` (not `Promise.all`)
- Queue drains after current emission completes
- One automatic retry on transient failures

### GitHub Integration (ISR at build time)
- `fetchGitHubRepos('GrizzwaldHouse')` — all public repos, 1h revalidate
- `enrichProjectWithGitHub(project, repos)` — match by `repoName`
- `fetchRepoReadme(owner, repo)` — raw README content
- `parseReadme(markdown)` — extract description, features, techStack
- Uses `GITHUB_TOKEN` env var for higher rate limits (optional)

### Three-Layer Fallback
1. `public/maintenance.html` — standalone HTML, zero dependencies
2. `src/app/error.tsx` — route-level error boundary (hides error.message in production)
3. `src/app/global-error.tsx` — root layout crash handler (inline styles, no layout deps)
4. `src/app/not-found.tsx` — custom 404 with suggested routes

### Project Data Flow
```
src/data/projects.ts (15 projects, curated data)
  → src/app/projects/page.tsx (enriches with GitHub API at build time)
  → src/components/projects/ProjectGrid.tsx + ProjectCard.tsx (renders)
  → src/app/projects/[slug]/page.tsx (detail pages via generateStaticParams)
```

## Component Map

### Layout (always rendered)
- `src/components/layout/Navbar.tsx` — sticky nav, 6 links (Home, Projects, Play, About, Blog, Contact)
- `src/components/layout/Footer.tsx` — site footer with links

### Sections (home page)
- `src/components/sections/HeroSection.tsx` — animated hero with gradient text
- `src/components/sections/FeaturedProjects.tsx` — top featured projects
- `src/components/sections/CTASection.tsx` — call-to-action hire section

### Projects
- `src/components/projects/ProjectGrid.tsx` — filterable project grid
- `src/components/projects/ProjectCard.tsx` — individual project card
- `src/components/projects/CategoryFilter.tsx` — category tabs (nuqs URL state)

### Interactive
- `src/components/ThreeHero.tsx` — Three.js 3D particle hero (hub page)
- `src/components/demos/GameOfLife.tsx` — Conway's Game of Life canvas
- `src/components/demos/Calculator.tsx` — Scientific calculator
- `src/components/demos/DemoEmbed.tsx` — iframe/canvas embed wrapper

### Status
- `src/components/AvailabilityStatus.tsx` — hire availability badge
- `src/components/GraduationCountdown.tsx` — graduated badge
- `src/components/GraduationAnnouncement.tsx` — graduation text

### Media
- `src/components/YouTubeEmbed.tsx` — YouTube iframe with lazy loading
- `src/components/ProjectVideoGallery.tsx` — video gallery for projects
- `src/components/ThemedBackground.tsx` — themed background wrapper

### Utilities
- `src/components/FreelanceModal.tsx` — freelance inquiry modal
- `src/components/ResumeDownload.tsx` — resume download button

## Data Files

| File | Purpose |
|------|---------|
| `src/data/projects.ts` | 15 projects with Project interface, `featuredProjects` export |
| `src/data/site-config.ts` | Name, URLs, email, social links |
| `src/data/skills.ts` | Skill categories and proficiency data |
| `src/data/approved-games.ts` | Approved playable games list |
| `src/data/projectVideos.ts` | YouTube video ID mapping per project |

## Common Tasks Cheat Sheet

### Add a new project
1. Add entry to `src/data/projects.ts` (follow `Project` interface)
2. Set `repoName` to match GitHub repo for auto-enrichment
3. Add thumbnail to `public/images/projects/`
4. Add video to `src/data/projectVideos.ts` if applicable

### Add a new page
1. Create `src/app/{route}/page.tsx`
2. Add link to `navLinks` array in `src/components/layout/Navbar.tsx`
3. Export `metadata` for SEO

### Fix stale .next cache (MODULE_NOT_FOUND errors)
```bash
# Stop dev server first, then:
powershell -Command "Remove-Item -Recurse -Force 'D:\portfolio-website\.next'"
npm run build
npm run dev
```

### Verify build health
```bash
npm run build  # Must show 30/30 pages, exit 0
```

## Projects Catalog (15 entries)

| Slug | Category | Featured | Status |
|------|----------|----------|--------|
| quidditch-ai-flight | games | yes | in-progress |
| island-escape | games | yes | complete |
| mcp-command-panel | ai-automation | yes | complete |
| vulkan-renderer | engine | yes | complete |
| brightforge | ai-automation | yes | in-progress |
| survival-companion | tools | no | in-progress |
| game-of-life | games | no | complete |
| crypt-crawler | games | no | complete |
| calculator | tools | no | complete |
| wizard-jam | games | no | complete |
| honeybadger-vault | ai-automation | yes | in-progress |
| deep-command | games | no | in-progress |
| paws-of-valor | games | no | in-progress |
| developer-productivity-tracker | tools | yes | complete |
| structured-logging | tools | no | complete |
