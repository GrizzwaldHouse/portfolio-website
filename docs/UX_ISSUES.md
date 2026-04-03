# UX Issues Report

**Date:** 2026-04-03

---

## Active Issues

### UX-001: Quiz Repetition on Every Gated Action
**Severity:** Low
**Location:** `src/systems/PetEngine.ts` — `canPerformAction()`
**Description:** Every Feed/Play/Train action requires answering a quiz question, even if the user just answered one correctly. This could feel tedious for returning users.
**Recommendation:** Add a cooldown timer or streak system — after 3 correct answers in a row, allow 1 free action.

### UX-002: Floating Pet Button Discoverability
**Severity:** Low
**Location:** `src/components/Tamagotchi/TamagotchiWidget.tsx`
**Description:** The floating button uses ASCII text which may not be immediately recognizable as interactive on first visit.
**Recommendation:** Add a one-time tooltip/hint animation on first visit ("Meet your AI companion!") that fades after 5 seconds.

### UX-003: Project Display Control on Mobile
**Severity:** Low
**Location:** `src/components/ProjectDisplayControl.tsx`
**Description:** The dropdown control is small on mobile. The "Showing X of Y" text may wrap awkwardly.
**Recommendation:** On mobile, simplify to icon-only toggle or move below the section title.

---

## Resolved Issues

- Navigation active state highlighting — resolved with NavBar client component
- Mobile responsiveness — all pages use responsive grid (md: breakpoints)
- WCAG contrast — all text meets 4.5:1 minimum against dark backgrounds
- Color-only indicators — all status dots paired with text labels (ONLINE, LIVE, etc.)
