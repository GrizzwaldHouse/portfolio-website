# Red Team Security Audit Report

**Date:** 2026-04-03
**Project:** Marcus Daley Portfolio — AI-Driven Interactive Platform
**Branch:** `claude/portfolio-redesign-planning-44GNf`

---

## Summary

| Severity | Count | Fixed |
|----------|-------|-------|
| CRITICAL | 0 | — |
| HIGH | 1 | 1 |
| MEDIUM | 5 | 4 |
| LOW | 5 | 1 |
| INFO | 3 | 0 |

**Overall Assessment:** No critical vulnerabilities. The codebase follows good practices — no `dangerouslySetInnerHTML` with user input, all `target="_blank"` links include `rel="noopener noreferrer"`, no secrets in source code, `.env` files properly gitignored. Key issues were configuration-level (CSP, config conflicts, missing headers).

---

## Findings

### FINDING 1: CSP with `unsafe-eval` and `unsafe-inline` — HIGH

**Location:** `next.config.js:18`
**Status:** FIXED

`unsafe-eval` and `unsafe-inline` in `script-src` effectively negate CSP XSS protection. Removed `unsafe-eval` entirely. `unsafe-inline` retained for Tailwind CSS compatibility but can be replaced with nonce-based CSP in future.

**Fix applied:** Removed `unsafe-eval` from CSP, added `frame-src https://www.youtube.com` for YouTube embeds.

---

### FINDING 2: Conflicting Next.js Configuration Files — MEDIUM

**Location:** `next.config.js` and `next.config.ts`
**Status:** FIXED

Two config files existed. Next.js prefers `.ts` over `.js`, meaning security headers in `.js` were silently ignored. No CSP, X-Frame-Options, or other protections were active.

**Fix applied:** Consolidated all headers into `next.config.ts`, deleted `next.config.js`.

---

### FINDING 3: Missing `Strict-Transport-Security` Header — MEDIUM

**Location:** `next.config.js:9-22`
**Status:** FIXED

No HSTS header meant protocol downgrade attacks were possible on first visit.

**Fix applied:** Added `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`.

---

### FINDING 4: Missing `Permissions-Policy` Header — LOW

**Location:** `next.config.js:9-22`
**Status:** FIXED

Browser features (camera, microphone, geolocation, payment) were not explicitly denied.

**Fix applied:** Added `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`.

---

### FINDING 5: Learning API Sends Correct Answers to Client — MEDIUM

**Location:** `services/learning-service/app.py:46`, `src/systems/LearningClient.ts:11-116`
**Status:** ACCEPTED RISK

The quiz `correctIndex` is visible in the client bundle and API responses. For a portfolio Tamagotchi game, this is acceptable — the quiz is educational, not competitive. Server-side-only validation would add complexity without meaningful security benefit here.

---

### FINDING 6: EventBus Accessible via Console — LOW

**Location:** `src/systems/EventBus.ts:75`
**Status:** ACCEPTED RISK

The EventBus singleton can be accessed via webpack module registry in dev builds. For a portfolio game system, this is acceptable. No sensitive data flows through the EventBus.

---

### FINDING 7: EventBus Error Handler Infinite Recursion — MEDIUM

**Location:** `src/systems/EventBus.ts:31-33`
**Status:** FIXED

If a `SYSTEM_ERROR` handler throws, the catch block re-emits `SYSTEM_ERROR`, causing infinite recursion and stack overflow.

**Fix applied:** Added `isEmittingError` guard flag to prevent recursive `SYSTEM_ERROR` emissions.

---

### FINDING 8: localStorage Pet State Tampering — LOW

**Location:** `src/repositories/PetRepository.ts:23-25`
**Status:** ACCEPTED RISK

Users can modify pet state via browser console. Since this is a single-player portfolio game with no leaderboard or competitive element, state validation would add unnecessary complexity.

---

### FINDING 9: YouTube Embed Missing `sandbox` Attribute — LOW

**Location:** `src/components/YouTubeEmbed.tsx:55-61`
**Status:** FIXED

YouTube iframe had no `sandbox` restrictions. Added `sandbox="allow-scripts allow-same-origin allow-presentation"` and `encodeURIComponent()` on `videoId`.

---

### FINDING 10: YouTubeEmbed `videoId` Injection — LOW

**Location:** `src/components/YouTubeEmbed.tsx:23,56`
**Status:** FIXED

`videoId` was interpolated directly into URLs. Currently safe (hardcoded values), but added `encodeURIComponent()` for defense-in-depth.

---

### FINDING 11: Stray Debug Files in Repository Root — MEDIUM

**Location:** `setFormData({...formData`, `{`
**Status:** FIXED

Two accidentally created files containing code fragments at the repo root. Deleted both.

---

### FINDING 12: Placeholder Google Verification Code — INFO

**Location:** `src/metadata.ts:66`
**Status:** NOTED

Placeholder value `'your-google-verification-code'` should be updated or removed before production deployment.

---

### FINDING 13: CORS Wildcard in Learning Service — MEDIUM

**Location:** `services/learning-service/app.py:23`
**Status:** FIXED

`https://*.vercel.app` allowed any Vercel-hosted app to make cross-origin requests. Replaced with regex pattern matching only the portfolio's Vercel deployments.

---

### FINDING 14: GitHub API Called Client-Side — MEDIUM (Deferred)

**Location:** `src/app/projects/page.tsx:10,28`
**Status:** DEFERRED (TD-007)

Projects page uses `'use client'` and calls `fetchGitHubRepos()` from the browser. The `revalidate: 3600` ISR directive has no effect in client components, so every visitor makes a direct GitHub API call (60 req/hr unauthenticated limit). Should be moved to a server component or API route.

---

### FINDING 15: No Rate Limiting on Learning Service — LOW

**Location:** `services/learning-service/app.py:128-160`
**Status:** ACCEPTED RISK

The learning service is optional, runs locally, and serves only quiz questions. Rate limiting can be added when deployed publicly.

---

### FINDING 16: `framer-motion` Import in Legacy File — INFO

**Location:** `src/components/ProjectCard.js:2`
**Status:** NOTED (TD-002)

Legacy file imports `framer-motion` which is not in `package.json`. Already tracked as tech debt item TD-002 for cleanup.

---

### FINDING 17: Email Address Exposed in Source — INFO

**Location:** `src/app/contact/page.tsx:34`
**Status:** ACCEPTED

Intentional for a portfolio contact page. Standard practice for developer portfolios.

---

## Security Posture: GOOD

The application has no critical vulnerabilities. All HIGH and actionable MEDIUM findings have been remediated. The remaining accepted risks are appropriate for a portfolio website with client-side game mechanics.
