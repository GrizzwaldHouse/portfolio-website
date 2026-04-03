# Technical Debt Report

**Date:** 2026-04-03

---

## Active Debt

### TD-001: Spline 3D Scene Not Connected
**Priority:** Medium
**Description:** SplineController adapter is complete but no actual Spline scene exists. The pet system displays ASCII art instead of 3D visuals.
**Resolution:** Create a Spline scene, add `@splinetool/react-spline` with dynamic import, connect via `setSplineApp()`.

### TD-002: Duplicate Configuration Files
**Priority:** Low
**Description:** Both `tailwind.config.js` and `tailwind.config.ts` exist. Both `next.config.js` and `next.config.ts` exist.
**Resolution:** Remove `.js` versions, keep only `.ts` versions.

### TD-003: Unused Dependencies
**Priority:** Low
**Description:** `@radix-ui/react-slot` is in package.json but unused in the codebase.
**Resolution:** `npm uninstall @radix-ui/react-slot`

### TD-004: Legacy Component Files
**Priority:** Low
**Description:** `src/components/ProjectCard.js` (legacy, unused), `src/components/ui/nav.tsx` (legacy), `/components/ui/` root directory (duplicate of src/components/ui/).
**Resolution:** Delete legacy files and directories.

### TD-005: Google Fonts Removed for Build Compatibility
**Priority:** Low
**Description:** Inter font from `next/font/google` was removed because the build environment lacks network access. Production should restore it.
**Resolution:** Re-add `import { Inter } from 'next/font/google'` when deploying with network access.

### TD-006: ESLint Circular Structure Warning
**Priority:** Low
**Description:** Build shows ESLint circular JSON structure warning related to React plugin config. Does not affect build output.
**Resolution:** Update eslint-config-next or adjust eslint.config.mjs.

---

## Debt Resolved This Sprint

- Hardcoded project data → replaced with dynamic GitHub API loading
- Missing file headers → all new files have standard headers
- No event-driven architecture → complete EventBus + Observer pattern
- No mobile navigation → hamburger menu added
- No active link state → NavBar with usePathname()
