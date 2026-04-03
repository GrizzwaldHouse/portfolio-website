# Project Architecture Audit

**Date:** 2026-04-03
**Project:** Marcus Daley Portfolio — AI-Driven Interactive Platform

---

## Architecture Overview

### Pattern: Event-Driven + Repository + Dependency Injection

```
┌─────────────┐     ┌──────────────┐     ┌────────────────┐
│  UI Layer   │────▶│   EventBus   │◀────│  SplineController │
│  (React)    │     │  (Observer)  │     │  (3D Adapter)     │
└──────┬──────┘     └──────┬───────┘     └──────────────────┘
       │                   │
       ▼                   ▼
┌──────────────┐    ┌──────────────┐
│ usePetSystem │    │  PetEngine   │
│ (React Hook) │───▶│ (Game Logic) │
└──────────────┘    └──────┬───────┘
                           │
                    ┌──────▼───────┐     ┌────────────────┐
                    │PetRepository │     │ LearningClient │
                    │(localStorage)│     │(API + Fallback)│
                    └──────────────┘     └────────────────┘
```

### Layer Compliance

| Layer | Files | Dependencies | Verdict |
|-------|-------|-------------|---------|
| Types | `src/types/` (3 files) | None | CLEAN |
| Systems | `src/systems/` (4 files) | Types only | CLEAN |
| Repositories | `src/repositories/` (2 files) | Types only | CLEAN |
| State | `src/state/` (1 file) | Systems + Types | CLEAN |
| Components | `src/components/` | State + Types | CLEAN |
| Pages | `src/app/` (5 pages) | Components only | CLEAN |

### Anti-Pattern Check

| Anti-Pattern | Status |
|-------------|--------|
| Global mutable state | NONE — EventBus is singleton but immutable interface |
| Polling loops | NONE — EventBus Observer pattern, setInterval for game timer only |
| Hardcoded config values | NONE — All config in constants/types (XP_PER_LEVEL, ACTION_GATES, DISPLAY_CONFIG) |
| Unrestricted public state | NONE — PetEngine returns Readonly<PetState>, repository encapsulated |
| Direct cross-system calls | NONE — All communication via EventBus |
| Missing cleanup | NONE — All subscriptions cleaned up in destroy()/useEffect cleanup |

---

## File Organization

```
src/
├── app/                    # Next.js pages (routing layer)
│   ├── page.tsx           # Home — client component (TamagotchiWidget)
│   ├── projects/page.tsx  # Projects — client component (dynamic loading)
│   ├── about/page.tsx     # About — server component (CSS-only)
│   ├── blog/page.tsx      # Blog — server component (CSS-only)
│   ├── contact/page.tsx   # Contact — server component (CSS-only)
│   ├── layout.tsx         # Root layout — server component
│   └── globals.css        # Tailwind import
├── components/            # UI components
│   ├── Tamagotchi/        # Pet system UI (3 components)
│   ├── NavBar.tsx         # Navigation (client — usePathname)
│   ├── ProjectDisplayControl.tsx  # Recruiter toggle (client)
│   └── [existing]/        # Preserved components
├── systems/               # Business logic (framework-agnostic)
│   ├── EventBus.ts        # Central event system
│   ├── PetEngine.ts       # Game logic
│   ├── SplineController.ts # 3D adapter
│   ├── LearningClient.ts  # Quiz system
│   └── GitHubProjectLoader.ts # API integration
├── repositories/          # Persistence layer
│   ├── PetRepository.ts   # localStorage
│   └── ProjectRepository.ts # GitHub + overrides merge
├── state/                 # React bridges
│   └── usePetSystem.ts    # Hook for pet system
├── types/                 # Type contracts
│   ├── events.ts          # EventType, GameEvent
│   ├── pet.ts             # PetState, actions, learning
│   ├── spline.ts          # Animation types
│   └── project.ts         # Project, GitHubRepo
└── data/                  # Configuration data
    ├── projectOverrides.ts # Featured project enrichment
    └── projectVideos.ts   # Video mappings
```

## Verdict: APPROVED

Architecture follows the 95/5 rule — core systems (EventBus, PetEngine, LearningClient) are reusable across projects. Only page-specific JSX is project-specific.
