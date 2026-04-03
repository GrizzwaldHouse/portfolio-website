# Blue Team Functional Test Report

**Date:** 2026-04-03
**Project:** Marcus Daley Portfolio — AI-Driven Interactive Platform
**Branch:** `claude/portfolio-redesign-planning-44GNf`

---

## Summary

| Category | Tests | PASS | FAIL | WARNING |
|----------|-------|------|------|---------|
| Rendering | 7 | 6 | 1 | 0 |
| Interactive | 10 | 8 | 0 | 2 |
| State | 7 | 5 | 0 | 2 |
| Event | 4 | 3 | 0 | 1 |
| API/Data | 7 | 6 | 0 | 1 |
| Link | 5 | 2 | 0 | 3 |
| Crash | 13 | 10 | 1 | 2 |
| **TOTAL** | **53** | **40** | **2** | **11** |

---

## FAIL Findings (Fixed)

### BT-007: Missing favicon.ico — FIXED

**Location:** `src/app/layout.tsx:28`
Layout referenced `favicon.ico` which did not exist in `/public/`.

**Fix:** Created SVG favicon (`/public/favicon.svg`) matching the MD branding. Updated layout to reference `favicon.svg`.

### BT-046: EventBus SYSTEM_ERROR Infinite Recursion — FIXED

**Location:** `src/systems/EventBus.ts:31-33`
If a `SYSTEM_ERROR` handler throws, the catch block re-emits `SYSTEM_ERROR`, causing infinite recursion.

**Fix:** Added `isEmittingError` guard flag (applied in red team security fixes).

---

## WARNING Findings

### BT-014: Dropdown lacks click-outside-to-close — FIXED

**Location:** `src/components/ProjectDisplayControl.tsx`
Dropdown stayed open when clicking elsewhere on the page.

**Fix:** Added `useRef` + `mousedown` event listener to close dropdown on outside clicks.

### BT-021: requestAction while isAnswering — Accepted

**Location:** `src/state/usePetSystem.ts`
No guard in `requestAction` when `isAnswering` is true. UI buttons are disabled, preventing the issue in practice.

### BT-024: submitAnswer stale closure — Accepted

**Location:** `src/state/usePetSystem.ts`
`useCallback` dependencies correctly list `state.currentQuestion` and `state.pendingAction`. Low risk in practice since the modal closes after submission.

### BT-025: EventBus error handler recursion — FIXED

Same as BT-046. Guard flag prevents recursive error emissions.

### BT-035: GitHub API fetch client-side — Deferred (TD-007)

**Location:** `src/app/projects/page.tsx`, `src/systems/GitHubProjectLoader.ts`
ISR `revalidate` has no effect in client components. Every visitor hits the GitHub API directly (60 req/hr limit). Should be moved to a server component or API route in a future update.

### BT-038: Footer uses `<a>` instead of `<Link>` — Noted

**Location:** `src/app/layout.tsx:69-80`
Causes full page reloads on footer navigation. Minor UX issue.

### BT-039: NavBar uses `<a>` instead of `<Link>` — Noted

**Location:** `src/components/NavBar.tsx:30,46,88`
Causes full page reloads. Can be improved with Next.js `<Link>` component.

### BT-040: Unused nav component — Noted

**Location:** `src/components/ui/nav.tsx`
Legacy component not imported anywhere. Candidate for cleanup (TD-002).

### BT-041: ProjectDisplayControl localStorage try/catch — FIXED

**Location:** `src/components/ProjectDisplayControl.tsx:29`
`localStorage.getItem()` could throw in private browsing mode.

**Fix:** Wrapped both `getItem` and `setItem` calls in try/catch.

### BT-044: Project slug case mismatch for videos — Accepted

Slug normalization handles the mismatch. Projects without matching video data show a "video feed pending" placeholder correctly.

### BT-052: Pet stats exceed 100 via learning boosts — FIXED

**Location:** `src/systems/PetEngine.ts:99-118`
`applyLearningResult` spread `statBoosts` directly into state without clamping or adding to current values.

**Fix:** Changed to additive boosts with `Math.min(100, Math.max(0, current + boost))` clamping.

### BT-053: setTimeout setState after unmount — Accepted

**Location:** `src/components/Tamagotchi/TamagotchiWidget.tsx`
React 19 suppresses the "setState on unmounted component" warning. Harmless.

---

## Detailed Test Results

### Rendering (6 PASS, 1 FIXED)

| ID | Test | Result |
|----|------|--------|
| BT-001 | Home page sections render | PASS |
| BT-002 | Projects page with loading skeleton | PASS |
| BT-003 | About page timeline (4 entries) | PASS |
| BT-004 | Blog page entries and badges | PASS |
| BT-005 | Contact page channels (4) | PASS |
| BT-006 | Root layout structure | PASS |
| BT-007 | Favicon exists | FIXED |

### Interactive (8 PASS, 2 FIXED)

| ID | Test | Result |
|----|------|--------|
| BT-008 | NavBar mobile toggle | PASS |
| BT-009 | NavBar active link detection | PASS |
| BT-010 | TamagotchiWidget expand/collapse | PASS |
| BT-011 | PetDisplay action buttons | PASS |
| BT-012 | LearningModal answer buttons | PASS |
| BT-013 | ProjectDisplayControl dropdown | PASS |
| BT-014 | Dropdown click-outside close | FIXED |
| BT-015 | Collapsible project highlights | PASS |
| BT-016 | ProjectVideoGallery selector | PASS |
| BT-017 | ResumeDownload button | PASS |

### State Management (5 PASS, 2 Accepted)

| ID | Test | Result |
|----|------|--------|
| BT-018 | PetState initial load | PASS |
| BT-019 | Action request flow | PASS |
| BT-020 | submitAnswer guard | PASS |
| BT-021 | requestAction while answering | Accepted |
| BT-022 | Cleanup on unmount | PASS |
| BT-023 | Stat decay timer | PASS |
| BT-024 | submitAnswer closure | Accepted |

### Event System (3 PASS, 1 FIXED)

| ID | Test | Result |
|----|------|--------|
| BT-025 | Handler error isolation | FIXED |
| BT-026 | Duplicate handler prevention | PASS |
| BT-027 | Idempotent unsubscribe | PASS |
| BT-028 | Event log overflow | PASS |

### API/Data (6 PASS, 1 Deferred)

| ID | Test | Result |
|----|------|--------|
| BT-029 | GitHub API 403 handling | PASS |
| BT-030 | Malformed JSON handling | PASS |
| BT-031 | Network offline fallback | PASS |
| BT-032 | Question exhaustion cycling | PASS |
| BT-033 | Unknown questionId handling | PASS |
| BT-034 | Microservice fallback | PASS |
| BT-035 | ISR caching client-side | Deferred |

### Links (2 PASS, 3 Noted)

| ID | Test | Result |
|----|------|--------|
| BT-036 | Internal routes valid | PASS |
| BT-037 | External links rel attributes | PASS |
| BT-038 | Footer Link components | Noted |
| BT-039 | NavBar Link components | Noted |
| BT-040 | Unused nav component | Noted |

### Crash Scenarios (10 PASS, 1 FIXED, 2 Accepted)

| ID | Test | Result |
|----|------|--------|
| BT-041 | localStorage disabled | FIXED |
| BT-042 | profile.jpg missing | PASS |
| BT-043 | No matching videos | PASS |
| BT-044 | Slug case mismatch | Accepted |
| BT-045 | Division by zero / NaN | PASS |
| BT-046 | EventBus recursion | FIXED |
| BT-047 | Unknown PetAction | PASS |
| BT-048 | Resume PDF missing | PASS |
| BT-049 | GraduationCountdown post-grad | PASS |
| BT-050 | AvailabilityStatus post-grad | PASS |
| BT-051 | GraduationAnnouncement timing | PASS |
| BT-052 | Stat value clamping | FIXED |
| BT-053 | setTimeout unmount | Accepted |

---

## Verdict: PASS

All critical and high-priority issues have been resolved. The application is functionally stable with proper error handling, state management cleanup, and crash resilience.
