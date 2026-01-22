# Brand Identity & Visual System

> Cohesive visual identity for Marcus Daley's game development portfolio

**Version:** 1.0.0
**Last Updated:** 2026-01-22

---

## Brand Positioning

### Core Identity

**Who:** Marcus Daley - Navy veteran turned game development engineer
**What:** Tool programming, graphics engineering, and technical QA
**Tone:** Confident, technical, disciplined, but approachable

### Brand Personality Keywords

| Attribute | Expression |
|-----------|------------|
| **Technical** | Clean code, systems thinking, architecture diagrams |
| **Disciplined** | Military precision, methodical approach, quality standards |
| **Creative** | Game development passion, visual problem-solving |
| **Reliable** | Production-ready work, documented processes |
| **Approachable** | Human, direct communication, no pretense |

### Differentiation Statement

"A Navy-trained engineer who brings military-grade discipline to game development, combining deep technical expertise with a passion for building tools that empower other developers."

---

## Color System

### Primary Palette

Replacing the generic portfolio blue with a distinctive, professional palette that reflects technical depth and game development creativity.

```css
:root {
  /* Primary - Forge Orange (Technical craftsmanship) */
  --color-primary: #E85D04;        /* Vibrant forge orange */
  --color-primary-light: #F48C06;  /* Lighter variant */
  --color-primary-dark: #D00000;   /* Deeper accent */

  /* Secondary - Circuit Blue (Technical precision) */
  --color-secondary: #0077B6;      /* Professional tech blue */
  --color-secondary-light: #00B4D8; /* Cyber accent */
  --color-secondary-dark: #023E8A;  /* Deep tech blue */

  /* Neutral - Slate (Sophistication) */
  --color-neutral-900: #0F172A;    /* Deep background */
  --color-neutral-800: #1E293B;    /* Card backgrounds */
  --color-neutral-700: #334155;    /* Borders, dividers */
  --color-neutral-600: #475569;    /* Muted text */
  --color-neutral-400: #94A3B8;    /* Body text */
  --color-neutral-200: #E2E8F0;    /* Light text */
  --color-neutral-50: #F8FAFC;     /* White text */

  /* Accent - Full Sail Gold (Education brand alignment) */
  --color-accent: #FFCC00;         /* Full Sail gold */
  --color-accent-dark: #E6B800;    /* Hover state */

  /* Semantic Colors */
  --color-success: #10B981;        /* Green for "runnable" */
  --color-warning: #F59E0B;        /* Amber for "video only" */
  --color-error: #EF4444;          /* Red for errors */
}
```

### Color Usage Guidelines

| Element | Color | Usage |
|---------|-------|-------|
| **CTAs & Buttons** | Primary Orange | Main actions, "View Projects" |
| **Links** | Secondary Blue | Inline links, GitHub links |
| **Featured Badge** | Accent Gold | Full Sail affiliation, featured items |
| **Interactive** | Success Green | Runnable demos, live indicators |
| **Backgrounds** | Neutral 800-900 | Cards, sections |
| **Text** | Neutral 200-400 | Body copy, headings |

### Gradient Presets

```css
/* Hero gradient - Technical warmth */
.gradient-hero {
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%);
}

/* Accent gradient - Energy */
.gradient-accent {
  background: linear-gradient(90deg, #E85D04 0%, #F48C06 100%);
}

/* Tech gradient - Precision */
.gradient-tech {
  background: linear-gradient(135deg, #023E8A 0%, #0077B6 100%);
}

/* Card gradient - Depth */
.gradient-card {
  background: linear-gradient(180deg, #1E293B 0%, #0F172A 100%);
}
```

---

## Typography

### Font Stack

```css
/* Primary - Clean, technical sans-serif */
--font-primary: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;

/* Code/Technical - Monospace for code and data */
--font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;

/* Display - Bold headings (optional enhancement) */
--font-display: 'Outfit', 'Inter', sans-serif;
```

### Type Scale

| Level | Size | Weight | Usage |
|-------|------|--------|-------|
| **Display** | 4rem (64px) | 700 | Hero name |
| **H1** | 3rem (48px) | 700 | Page titles |
| **H2** | 2.25rem (36px) | 600 | Section headings |
| **H3** | 1.5rem (24px) | 600 | Card titles |
| **H4** | 1.125rem (18px) | 600 | Subsections |
| **Body** | 1rem (16px) | 400 | Paragraphs |
| **Small** | 0.875rem (14px) | 400 | Captions, meta |
| **Code** | 0.875rem (14px) | 400 | Code blocks |

---

## Visual Elements

### Icons & Symbols

**Style:** Outline icons with 1.5-2px stroke
**Library:** Heroicons (outline variant) or Lucide React
**Size Standard:** 20px (inline), 24px (buttons), 40px (features)

### Card Design

```css
.card {
  background: var(--color-neutral-800);
  border: 1px solid var(--color-neutral-700);
  border-radius: 12px;
  padding: 24px;
  transition: all 0.2s ease;
}

.card:hover {
  border-color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(232, 93, 4, 0.1);
}
```

### Button Styles

```css
/* Primary CTA */
.btn-primary {
  background: var(--color-primary);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: var(--color-primary-light);
  transform: translateY(-1px);
}

/* Secondary/Ghost */
.btn-secondary {
  background: transparent;
  border: 1px solid var(--color-neutral-600);
  color: var(--color-neutral-200);
}

.btn-secondary:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}
```

---

## Image Generation Prompts

For use with Leonardo AI, Midjourney, or ChatGPT image generation.

### Hero Section Background

**Prompt 1 - Technical Forge:**
```
Abstract digital art, dark slate blue background with orange ember particles floating upward, subtle circuit board patterns in deep blue, forge-like warmth emanating from center, no text, 16:9 aspect ratio, professional portfolio hero image, dark moody lighting, cinematic quality --ar 16:9 --style raw
```

**Prompt 2 - Systems Architecture:**
```
Minimalist abstract art, interconnected geometric nodes and lines forming a network pattern, dark navy background (#0F172A), glowing orange (#E85D04) and blue (#0077B6) connection points, subtle depth of field, represents systems thinking and architecture, no text, professional tech aesthetic --ar 16:9
```

**Prompt 3 - Code Flow:**
```
Abstract visualization of code or data flowing through a system, dark background with subtle grid, streams of light in orange and cyan colors, futuristic but professional, represents software engineering, no characters no text, cinematic lighting --ar 16:9
```

### About Section

**Prompt 4 - Military to Tech Transition:**
```
Abstract conceptual art showing transformation, left side has subtle metallic military elements (submarine hull texture, precision machinery), transitioning to right side with digital elements (code patterns, game controller silhouette), dark professional background, warm orange to cool blue gradient, no faces no text --ar 3:2
```

**Prompt 5 - Professional Portrait Background:**
```
Dark textured background for professional portrait, subtle hexagonal pattern, deep navy blue to charcoal gradient, slight orange accent lighting from one side, suitable for overlaying a portrait photo, no distracting elements --ar 1:1
```

### Project Section Accents

**Prompt 6 - Game Development:**
```
Abstract game development concept art, floating voxel cubes and geometric shapes, dark environment with dramatic lighting, orange and blue accent lights, represents creativity and technical precision, no text, professional portfolio style --ar 16:9
```

**Prompt 7 - Graphics Programming:**
```
Abstract 3D rendering visualization, wireframe mesh transitioning to shaded surface, PBR material spheres floating, dark background with subtle reflections, represents Vulkan/graphics programming, technical and artistic, no text --ar 16:9
```

**Prompt 8 - Tool Programming:**
```
Abstract visualization of gears, connectors, and UI elements floating in space, represents editor tools and automation, dark slate background, orange and cyan accent colors, clean professional aesthetic, no text --ar 16:9
```

### Themed Project Backgrounds (for ThemedBackground component)

**Hogwarts Theme:**
```
Mystical dark atmosphere, subtle purple and gold magical particles, ancient stone texture hints, enchanted library feel, no recognizable copyrighted elements, dark professional background, subtle glow --ar 16:9
```

**Cyberpunk Theme:**
```
Dark cyberpunk cityscape silhouette, neon blue and orange highlights, rain-slicked surfaces, circuit patterns in sky, no characters, moody atmospheric, professional and subtle --ar 16:9
```

**Nature Theme:**
```
Dark forest environment, volumetric green-gold lighting through trees, voxel-style ground hint, survival game atmosphere, mystical but grounded, no characters --ar 16:9
```

**Terminal Theme:**
```
Dark screen aesthetic, subtle green phosphor glow, faint matrix-style code rain, retro-futuristic terminal feel, professional and minimal, no readable text --ar 16:9
```

---

## Asset Organization

```
public/
└── images/
    └── branding/
        ├── hero/
        │   ├── hero-bg-technical-forge.webp
        │   ├── hero-bg-systems.webp
        │   └── hero-bg-code-flow.webp
        ├── about/
        │   ├── transition-concept.webp
        │   └── portrait-bg.webp
        ├── projects/
        │   ├── game-dev-accent.webp
        │   ├── graphics-accent.webp
        │   └── tools-accent.webp
        ├── themes/
        │   ├── theme-hogwarts.webp
        │   ├── theme-cyberpunk.webp
        │   ├── theme-nature.webp
        │   └── theme-terminal.webp
        └── social/
            ├── og-image.png      (1200x630)
            └── twitter-card.png  (1200x600)
```

---

## Implementation Notes

### CSS Variables Update

Update `globals.css` to include the new color system:

```css
@layer base {
  :root {
    --color-primary: 232 93 4;      /* E85D04 */
    --color-secondary: 0 119 182;   /* 0077B6 */
    --color-accent: 255 204 0;      /* FFCC00 */
  }
}
```

### Tailwind Config Extension

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        forge: {
          500: '#E85D04',
          600: '#D00000',
        },
        circuit: {
          400: '#00B4D8',
          500: '#0077B6',
          600: '#023E8A',
        },
      },
    },
  },
};
```

### Gradual Migration

1. Keep existing Full Sail gold (`#FFCC00`) for educational branding
2. Replace generic blues with Circuit Blue variants
3. Add Forge Orange as primary action color
4. Update hero section with new gradient
5. Apply themed backgrounds to project cards

---

## Brand Voice Guidelines

### Writing Style

- **Technical but accessible** - Explain concepts clearly without dumbing down
- **Direct and confident** - State capabilities without hedging or false modesty
- **Results-focused** - Lead with outcomes ("35% performance improvement")
- **Avoid** - Generic phrases ("passionate about coding"), excessive superlatives

### Example Transformations

**Before:** "I love coding and am passionate about game development!"
**After:** "I build production-grade tools and rendering systems for game engines."

**Before:** "I have experience with many technologies."
**After:** "C++ (primary), Vulkan API, Unreal Engine 5.5, Python automation."

**Before:** "I'm a quick learner and team player."
**After:** "9 years of Navy service built systematic problem-solving and quality-first discipline."

---

*Document maintained by Platform Engineering. For questions, see CONTRIBUTING.md.*
