# Embedded Project Runtime Architecture

> Production-grade system for running interactive project demos directly on the portfolio

**Version:** 1.0.0
**Status:** Design Phase
**Author:** Platform Engineering
**Last Updated:** 2026-01-22

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Design Goals & Constraints](#design-goals--constraints)
3. [Architecture Overview](#architecture-overview)
4. [Security Model](#security-model)
5. [Runtime Types](#runtime-types)
6. [Component Architecture](#component-architecture)
7. [Data Schema](#data-schema)
8. [Loading & Error States](#loading--error-states)
9. [Performance Budget](#performance-budget)
10. [Deployment Strategy](#deployment-strategy)
11. [Implementation Phases](#implementation-phases)
12. [Risk Assessment](#risk-assessment)

---

## Executive Summary

This document describes a secure, static-host-compatible architecture for embedding interactive project demonstrations directly within the portfolio website. The system enables recruiters and visitors to experience projects firsthand without leaving the site, while maintaining strict security boundaries and professional presentation standards.

### Key Capabilities

- **Live WASM Games** - Play compiled Unreal/Unity WebGL exports in-browser
- **Interactive Code Demos** - Run sandboxed JavaScript/TypeScript examples
- **API Playgrounds** - Test REST/GraphQL endpoints with mock data
- **3D Model Viewers** - Inspect Vulkan renderer outputs via Three.js
- **Terminal Emulators** - Demonstrate CLI tools in simulated environments

---

## Design Goals & Constraints

### Primary Goals

| Goal | Description | Priority |
|------|-------------|----------|
| **Security First** | Zero possibility of XSS, data exfiltration, or main site compromise | P0 |
| **Static Hosting** | Must deploy to Vercel/Netlify/GitHub Pages without custom backends | P0 |
| **Recruiter UX** | One-click demos, instant loading perception, graceful fallbacks | P0 |
| **Progressive Enhancement** | Site fully functional without JS; demos enhance, not replace | P1 |
| **Mobile Responsive** | Touch-friendly controls, responsive viewports | P1 |
| **Accessibility** | WCAG 2.1 AA compliance, keyboard navigation, screen reader support | P1 |

### Non-Goals

- Running arbitrary user-submitted code
- Server-side compute for demos
- Real-time multiplayer functionality
- Persistent state across sessions (beyond localStorage in sandbox)

### Constraints

1. **Vercel Free Tier Limits**
   - 100GB bandwidth/month
   - 1000 serverless function hours (not using these)
   - 10-second function timeout (N/A for static)

2. **Browser Compatibility**
   - Target: Last 2 versions of Chrome, Firefox, Safari, Edge
   - WebAssembly required for game demos
   - WebGL 2.0 for 3D viewers

3. **Bundle Size**
   - Main portfolio JS: <100KB gzipped (excluding demos)
   - Demo loader shell: <15KB gzipped
   - Individual demo bundles: Lazy-loaded, no limit

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          PORTFOLIO MAIN ORIGIN                               │
│                    (portfolio.example.com)                                   │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                         Next.js App Shell                                ││
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                   ││
│  │  │   Projects   │  │    About     │  │   Contact    │                   ││
│  │  │    Page      │  │    Page      │  │    Page      │                   ││
│  │  └──────┬───────┘  └──────────────┘  └──────────────┘                   ││
│  │         │                                                                ││
│  │         ▼                                                                ││
│  │  ┌──────────────────────────────────────────────────────────────────┐   ││
│  │  │                    ProjectShowcase Component                      │   ││
│  │  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐      │   ││
│  │  │  │  VideoGallery  │  │  DemoLauncher  │  │  FallbackView  │      │   ││
│  │  │  │   (existing)   │  │    (new)       │  │    (new)       │      │   ││
│  │  │  └────────────────┘  └───────┬────────┘  └────────────────┘      │   ││
│  │  └──────────────────────────────┼───────────────────────────────────┘   ││
│  └─────────────────────────────────┼───────────────────────────────────────┘│
└────────────────────────────────────┼────────────────────────────────────────┘
                                     │
                     ┌───────────────┴───────────────┐
                     │     SANDBOXED IFRAME          │
                     │  (null origin / blob: URL)    │
                     │                               │
                     │  sandbox="allow-scripts"      │
                     │  (NO allow-same-origin)       │
                     │                               │
                     ▼                               │
┌────────────────────────────────────────────────────┴────────────────────────┐
│                         DEMO RUNTIME SANDBOX                                 │
│                    (Isolated execution context)                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                        Runtime Controller                             │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐      │   │
│  │  │   WASM     │  │  WebGL     │  │  CodeMirror│  │  Terminal  │      │   │
│  │  │  Loader    │  │  Canvas    │  │  Editor    │  │  Emulator  │      │   │
│  │  └────────────┘  └────────────┘  └────────────┘  └────────────┘      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  Communication: postMessage() only (structured clone algorithm)              │
│  Allowed: ArrayBuffer, TypedArray, primitives                               │
│  Blocked: Functions, DOM references, prototypes                             │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Origin Isolation Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│                    ORIGIN HIERARCHY                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  MAIN ORIGIN (Full Trust)                                       │
│  └── portfolio.vercel.app                                       │
│      ├── Can read/write own cookies                             │
│      ├── Can access localStorage                                │
│      ├── Protected by CSP                                       │
│      └── Houses all portfolio UI                                │
│                                                                  │
│  SANDBOX ORIGIN (Zero Trust)                                    │
│  └── null (via srcdoc or blob:)                                │
│      ├── Cannot access parent cookies                          │
│      ├── Cannot access parent storage                          │
│      ├── Cannot navigate parent                                │
│      ├── Cannot read parent DOM                                │
│      └── Can ONLY postMessage() to parent                      │
│                                                                  │
│  STATIC ASSET CDN (Read-Only Trust)                            │
│  └── demos.portfolio.vercel.app (or /demos/* path)             │
│      ├── WASM binaries                                         │
│      ├── WebGL assets (textures, models)                       │
│      ├── Demo bundle JS                                        │
│      └── Served with immutable cache headers                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Security Model

### Threat Model

| Threat | Vector | Mitigation |
|--------|--------|------------|
| **XSS from demo code** | Malicious script in demo bundle | Sandboxed iframe without `allow-same-origin` |
| **Data exfiltration** | Demo reads sensitive portfolio data | Origin isolation, no shared storage |
| **Clickjacking** | Demo tricks user into clicking | Contained in visible iframe, no overlays |
| **Crypto mining** | Demo abuses CPU/GPU | Resource limits via browser, user can close |
| **Storage exhaustion** | Demo fills localStorage | Sandbox has separate (or no) storage quota |
| **Network abuse** | Demo makes unauthorized requests | CSP in demo, fetch blocked to non-allowlisted |
| **Prototype pollution** | Demo corrupts JS globals | Separate realm, cannot affect parent |

### Iframe Sandbox Configuration

```typescript
// SECURITY CRITICAL: These attributes form our primary security boundary

const SANDBOX_ATTRIBUTES = [
  'allow-scripts',           // Required: Run demo JavaScript
  'allow-pointer-lock',      // Optional: For FPS games (user must click)
  // 'allow-downloads',      // DISABLED: No file downloads from demos
  // 'allow-forms',          // DISABLED: No form submissions
  // 'allow-modals',         // DISABLED: No alert/confirm/prompt
  // 'allow-orientation-lock', // DISABLED: No screen orientation lock
  // 'allow-popups',         // DISABLED: No window.open()
  // 'allow-same-origin',    // NEVER: Would defeat entire sandbox
  // 'allow-storage-access-api', // DISABLED: No cookie access
  // 'allow-top-navigation', // DISABLED: Cannot navigate parent
].join(' ');

// Content Security Policy for sandbox content
const SANDBOX_CSP = [
  "default-src 'none'",
  "script-src 'unsafe-inline' 'unsafe-eval' blob:",  // For WASM
  "style-src 'unsafe-inline'",
  "img-src blob: data:",
  "font-src data:",
  "connect-src blob:",  // For WASM streaming
  "worker-src blob:",   // For Web Workers if needed
  "child-src blob:",    // For nested iframes if needed
].join('; ');
```

### PostMessage Protocol

```typescript
// All communication uses structured clone (safe by design)
// Custom protocol with type discrimination

type DemoMessage =
  | { type: 'DEMO_READY'; capabilities: string[] }
  | { type: 'DEMO_LOADED'; loadTimeMs: number }
  | { type: 'DEMO_ERROR'; error: string; recoverable: boolean }
  | { type: 'DEMO_RESIZE'; width: number; height: number }
  | { type: 'DEMO_EXIT'; reason: 'user' | 'complete' | 'error' }
  | { type: 'DEMO_PROGRESS'; percent: number; stage: string }
  | { type: 'DEMO_METRICS'; fps: number; memory: number };

type HostMessage =
  | { type: 'HOST_INIT'; config: DemoConfig }
  | { type: 'HOST_PAUSE' }
  | { type: 'HOST_RESUME' }
  | { type: 'HOST_TERMINATE' };

// Message validation on host side
function handleDemoMessage(event: MessageEvent) {
  // SECURITY: Verify origin is our sandbox (null for blob:/srcdoc)
  if (event.origin !== 'null' && !event.origin.startsWith('blob:')) {
    console.warn('Rejected message from unexpected origin:', event.origin);
    return;
  }

  // SECURITY: Validate message structure
  if (!isValidDemoMessage(event.data)) {
    console.warn('Rejected malformed message:', event.data);
    return;
  }

  // Process validated message
  processDemoMessage(event.data);
}
```

---

## Runtime Types

### 1. WASM Game Runtime

For Unreal Engine, Unity WebGL, and custom WASM builds.

```typescript
interface WasmRuntimeConfig {
  type: 'wasm';
  wasmUrl: string;           // URL to .wasm file
  jsLoaderUrl: string;       // URL to JS bootstrapper
  dataUrl?: string;          // URL to .data file (asset pack)
  memoryMB: number;          // Initial memory (64-512)
  canvas: {
    width: number;
    height: number;
    antiAlias: boolean;
    preserveDrawingBuffer: boolean;
  };
  controls: {
    keyboard: boolean;
    mouse: boolean;
    gamepad: boolean;
    touch: boolean;
  };
}

// Example: Island Escape game
const islandEscapeConfig: WasmRuntimeConfig = {
  type: 'wasm',
  wasmUrl: '/demos/island-escape/game.wasm',
  jsLoaderUrl: '/demos/island-escape/loader.js',
  dataUrl: '/demos/island-escape/game.data',
  memoryMB: 256,
  canvas: {
    width: 1280,
    height: 720,
    antiAlias: true,
    preserveDrawingBuffer: false,
  },
  controls: {
    keyboard: true,
    mouse: true,
    gamepad: true,
    touch: false,
  },
};
```

### 2. WebGL Viewer Runtime

For 3D model viewers and Vulkan renderer showcases.

```typescript
interface WebGLViewerConfig {
  type: 'webgl-viewer';
  models: Array<{
    url: string;              // GLTF/GLB/OBJ URL
    name: string;
    defaultCamera: CameraConfig;
  }>;
  environment?: {
    hdri?: string;            // Environment map
    background: 'transparent' | 'gradient' | 'hdri';
    ambientIntensity: number;
  };
  controls: {
    orbit: boolean;
    pan: boolean;
    zoom: boolean;
    autoRotate: boolean;
  };
}
```

### 3. Code Playground Runtime

For interactive code examples and API demonstrations.

```typescript
interface CodePlaygroundConfig {
  type: 'code-playground';
  language: 'javascript' | 'typescript' | 'python' | 'rust';
  initialCode: string;
  readOnly?: boolean;
  runnable: boolean;
  outputType: 'console' | 'html' | 'canvas';
  packages?: string[];        // For import simulation
  apiMocks?: Record<string, unknown>;  // Mock API responses
}
```

### 4. Terminal Emulator Runtime

For CLI tool demonstrations.

```typescript
interface TerminalConfig {
  type: 'terminal';
  shell: 'bash' | 'powershell' | 'custom';
  commands: Map<string, CommandHandler>;  // Available commands
  filesystem: VirtualFileSystem;          // In-memory FS
  welcomeMessage: string;
  prompt: string;
}
```

### 5. Static Embed Runtime

For itch.io games, CodePen, and other external embeds with controlled framing.

```typescript
interface StaticEmbedConfig {
  type: 'static-embed';
  src: string;                // External URL (itch.io, CodePen, etc.)
  allowList: string[];        // Allowed domains for this embed type
  sandbox: string;            // Sandbox attributes for external content
  aspectRatio: string;        // e.g., '16/9', '4/3', '1/1'
  fallbackImage: string;      // Screenshot if embed fails
}
```

---

## Component Architecture

```
src/
├── components/
│   └── demos/
│       ├── DemoLauncher.tsx        # Main entry point
│       ├── DemoContainer.tsx       # Iframe wrapper + controls
│       ├── DemoOverlay.tsx         # Loading/error/pause overlays
│       ├── DemoControls.tsx        # Fullscreen, volume, settings
│       ├── DemoFallback.tsx        # Graceful degradation UI
│       │
│       ├── runtimes/
│       │   ├── WasmRuntime.tsx     # WASM game loader
│       │   ├── WebGLViewer.tsx     # 3D model viewer
│       │   ├── CodePlayground.tsx  # Code editor + runner
│       │   ├── TerminalEmulator.tsx # Terminal simulation
│       │   └── StaticEmbed.tsx     # External iframe wrapper
│       │
│       └── hooks/
│           ├── useDemoState.ts     # Demo lifecycle management
│           ├── useDemoMessaging.ts # PostMessage handling
│           ├── useDemoMetrics.ts   # FPS/memory tracking
│           └── useDemoFullscreen.ts # Fullscreen API wrapper
│
├── data/
│   └── projectDemos.ts             # Demo configurations by project
│
└── lib/
    └── demo-runtime/
        ├── sandbox-template.ts     # HTML template for sandbox
        ├── message-protocol.ts     # Type-safe messaging
        ├── feature-detection.ts    # WebGL/WASM capability checks
        └── error-boundaries.ts     # Error handling utilities
```

### DemoLauncher Component

```tsx
// src/components/demos/DemoLauncher.tsx

interface DemoLauncherProps {
  projectSlug: string;
  demo: DemoConfig;
  className?: string;
}

export function DemoLauncher({ projectSlug, demo, className }: DemoLauncherProps) {
  const [state, dispatch] = useDemoState();
  const capabilities = useCapabilityDetection(demo.type);

  // Don't render if capabilities not met
  if (!capabilities.supported) {
    return (
      <DemoFallback
        reason={capabilities.reason}
        fallbackImage={demo.fallbackImage}
        fallbackVideo={demo.fallbackVideo}
      />
    );
  }

  return (
    <div className={cn('relative rounded-lg overflow-hidden', className)}>
      {/* Thumbnail + Play Button (initial state) */}
      {state.status === 'idle' && (
        <DemoThumbnail
          image={demo.thumbnail}
          title={demo.title}
          onLaunch={() => dispatch({ type: 'LAUNCH' })}
          estimatedLoadTime={demo.estimatedLoadTime}
        />
      )}

      {/* Loading state */}
      {state.status === 'loading' && (
        <DemoOverlay type="loading" progress={state.progress} />
      )}

      {/* Active demo */}
      {(state.status === 'loading' || state.status === 'running') && (
        <DemoContainer
          config={demo}
          onMessage={handleDemoMessage}
          onError={(error) => dispatch({ type: 'ERROR', error })}
        />
      )}

      {/* Error state */}
      {state.status === 'error' && (
        <DemoOverlay
          type="error"
          error={state.error}
          onRetry={() => dispatch({ type: 'RETRY' })}
          onFallback={() => dispatch({ type: 'FALLBACK' })}
        />
      )}

      {/* Controls overlay */}
      {state.status === 'running' && (
        <DemoControls
          onPause={() => dispatch({ type: 'PAUSE' })}
          onFullscreen={handleFullscreen}
          onExit={() => dispatch({ type: 'EXIT' })}
          metrics={state.metrics}
        />
      )}
    </div>
  );
}
```

### Sandbox Template Generator

```typescript
// src/lib/demo-runtime/sandbox-template.ts

export function generateSandboxHTML(config: DemoConfig): string {
  const csp = buildContentSecurityPolicy(config);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="${csp}">
  <title>Demo Runtime</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; overflow: hidden; }
    body {
      background: #0a0a0a;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #root { width: 100%; height: 100%; }
    canvas {
      width: 100%;
      height: 100%;
      display: block;
      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
    }
  </style>
</head>
<body>
  <div id="root"></div>
  <script>
    // Establish secure communication with host
    const HOST_ORIGIN = '*'; // Parent checks our origin

    function sendToHost(message) {
      window.parent.postMessage(message, HOST_ORIGIN);
    }

    function handleHostMessage(event) {
      // Process host commands
      const { type, ...payload } = event.data;
      switch (type) {
        case 'HOST_INIT':
          initializeRuntime(payload.config);
          break;
        case 'HOST_PAUSE':
          pauseRuntime();
          break;
        case 'HOST_RESUME':
          resumeRuntime();
          break;
        case 'HOST_TERMINATE':
          terminateRuntime();
          break;
      }
    }

    window.addEventListener('message', handleHostMessage);

    // Signal ready state
    sendToHost({ type: 'DEMO_READY', capabilities: detectCapabilities() });

    // Runtime-specific initialization will be injected below
    ${generateRuntimeScript(config)}
  </script>
</body>
</html>
  `.trim();
}
```

---

## Data Schema

```typescript
// src/data/projectDemos.ts

export interface DemoConfig {
  // Identity
  id: string;
  projectSlug: string;
  title: string;
  description: string;

  // Runtime configuration (discriminated union)
  runtime:
    | WasmRuntimeConfig
    | WebGLViewerConfig
    | CodePlaygroundConfig
    | TerminalConfig
    | StaticEmbedConfig;

  // Presentation
  thumbnail: string;
  fallbackImage?: string;
  fallbackVideo?: string;  // YouTube ID for graceful degradation

  // Requirements
  requirements: {
    webgl?: 1 | 2;
    wasm?: boolean;
    memory?: number;        // Minimum MB
    screenWidth?: number;   // Minimum pixels
    touch?: boolean;        // Requires touch support
  };

  // Metadata
  estimatedLoadTime: 'instant' | 'fast' | 'moderate' | 'slow';
  lastUpdated: string;
  version: string;
}

// Project demos registry
export const projectDemos: Record<string, DemoConfig[]> = {
  'island-escape': [
    {
      id: 'island-escape-webgl',
      projectSlug: 'island-escape',
      title: 'Play Island Escape',
      description: 'Experience the voxel survival game directly in your browser',
      runtime: {
        type: 'wasm',
        wasmUrl: '/demos/island-escape/game.wasm',
        jsLoaderUrl: '/demos/island-escape/loader.js',
        memoryMB: 256,
        canvas: { width: 1280, height: 720, antiAlias: true, preserveDrawingBuffer: false },
        controls: { keyboard: true, mouse: true, gamepad: true, touch: false },
      },
      thumbnail: '/demos/island-escape/thumbnail.webp',
      fallbackVideo: 'ZCpSUudUw_s',  // Existing YouTube video
      requirements: { webgl: 2, wasm: true, memory: 512, screenWidth: 800 },
      estimatedLoadTime: 'moderate',
      lastUpdated: '2026-01-22',
      version: '1.0.0',
    },
  ],

  'vulkan-renderer': [
    {
      id: 'vulkan-model-viewer',
      projectSlug: 'vulkan-renderer',
      title: 'Interactive 3D Viewer',
      description: 'Explore 3D models rendered with the custom Vulkan engine',
      runtime: {
        type: 'webgl-viewer',
        models: [
          { url: '/demos/vulkan/sponza.glb', name: 'Sponza Atrium', defaultCamera: { ... } },
          { url: '/demos/vulkan/helmet.glb', name: 'Damaged Helmet', defaultCamera: { ... } },
        ],
        environment: { hdri: '/demos/vulkan/env.hdr', background: 'hdri', ambientIntensity: 0.5 },
        controls: { orbit: true, pan: true, zoom: true, autoRotate: true },
      },
      thumbnail: '/demos/vulkan/thumbnail.webp',
      fallbackVideo: 'vulkan-video-id',
      requirements: { webgl: 2 },
      estimatedLoadTime: 'fast',
      lastUpdated: '2026-01-22',
      version: '1.0.0',
    },
  ],

  'unreal-mcp': [
    {
      id: 'unreal-mcp-playground',
      projectSlug: 'unreal-mcp',
      title: 'MCP Command Playground',
      description: 'Try out MCP commands in a simulated Unreal Editor environment',
      runtime: {
        type: 'terminal',
        shell: 'custom',
        commands: new Map([
          ['mcp.spawn', handleSpawnCommand],
          ['mcp.modify', handleModifyCommand],
          ['mcp.query', handleQueryCommand],
        ]),
        filesystem: createMockFilesystem(),
        welcomeMessage: 'UnrealMCP Terminal v1.0 - Type "help" for commands',
        prompt: 'UE5> ',
      },
      thumbnail: '/demos/unreal-mcp/thumbnail.webp',
      fallbackVideo: 'unreal-mcp-video-id',
      requirements: {},
      estimatedLoadTime: 'instant',
      lastUpdated: '2026-01-22',
      version: '1.0.0',
    },
  ],

  'spaghetti-relay': [
    {
      id: 'spaghetti-relay-chat',
      projectSlug: 'spaghetti-relay',
      title: 'Chat Demo',
      description: 'Interactive demonstration of the relay server with simulated clients',
      runtime: {
        type: 'terminal',
        shell: 'custom',
        commands: chatCommands,
        filesystem: emptyFilesystem,
        welcomeMessage: 'SPAGHETTI_RELAY v1.0 - Simulated multi-client chat',
        prompt: '> ',
      },
      thumbnail: '/demos/spaghetti-relay/thumbnail.webp',
      requirements: {},
      estimatedLoadTime: 'instant',
      lastUpdated: '2026-01-22',
      version: '1.0.0',
    },
  ],
};
```

---

## Loading & Error States

### State Machine

```
┌──────────┐   launch()   ┌───────────┐   ready    ┌─────────┐
│   IDLE   │ ──────────▶  │  LOADING  │ ────────▶  │ RUNNING │
└──────────┘              └───────────┘            └─────────┘
     ▲                         │                        │
     │                         │ error                  │ error/exit
     │                         ▼                        ▼
     │                    ┌─────────┐              ┌─────────┐
     └────── retry ────── │  ERROR  │ ◀─────────  │ PAUSED  │
                          └─────────┘              └─────────┘
                               │
                               │ fallback
                               ▼
                          ┌──────────┐
                          │ FALLBACK │
                          └──────────┘
```

### Loading UX

```tsx
// Progressive loading stages with meaningful feedback

interface LoadingStage {
  id: string;
  label: string;
  weight: number;  // Percentage of total load time
}

const wasmLoadingStages: LoadingStage[] = [
  { id: 'init', label: 'Initializing runtime...', weight: 5 },
  { id: 'wasm', label: 'Loading game engine...', weight: 40 },
  { id: 'data', label: 'Loading assets...', weight: 45 },
  { id: 'compile', label: 'Compiling shaders...', weight: 8 },
  { id: 'ready', label: 'Starting game...', weight: 2 },
];

// Overlay component
function DemoLoadingOverlay({ stage, progress }: LoadingOverlayProps) {
  return (
    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
      <div className="w-64 space-y-4">
        {/* Animated logo/spinner */}
        <div className="flex justify-center">
          <LoadingSpinner size={48} />
        </div>

        {/* Stage label */}
        <p className="text-white text-center text-sm">
          {stage.label}
        </p>

        {/* Progress bar */}
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Cancel button */}
        <button
          onClick={onCancel}
          className="w-full py-2 text-white/60 hover:text-white text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
```

### Error Recovery

```tsx
// Graceful error handling with actionable recovery options

interface DemoError {
  code: string;
  message: string;
  recoverable: boolean;
  suggestedAction: 'retry' | 'fallback' | 'upgrade' | 'none';
}

const errorMessages: Record<string, DemoError> = {
  'WEBGL_UNSUPPORTED': {
    code: 'WEBGL_UNSUPPORTED',
    message: 'Your browser doesn\'t support WebGL 2.0',
    recoverable: false,
    suggestedAction: 'upgrade',
  },
  'WASM_UNSUPPORTED': {
    code: 'WASM_UNSUPPORTED',
    message: 'WebAssembly is not available',
    recoverable: false,
    suggestedAction: 'upgrade',
  },
  'LOAD_TIMEOUT': {
    code: 'LOAD_TIMEOUT',
    message: 'Loading took too long',
    recoverable: true,
    suggestedAction: 'retry',
  },
  'RUNTIME_CRASH': {
    code: 'RUNTIME_CRASH',
    message: 'The demo encountered an error',
    recoverable: true,
    suggestedAction: 'retry',
  },
  'MEMORY_EXCEEDED': {
    code: 'MEMORY_EXCEEDED',
    message: 'Not enough memory available',
    recoverable: false,
    suggestedAction: 'fallback',
  },
};

function DemoErrorOverlay({ error, onRetry, onFallback }: ErrorOverlayProps) {
  return (
    <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-8">
      <div className="max-w-md text-center space-y-4">
        <div className="text-red-400 text-4xl">⚠</div>
        <h3 className="text-white text-lg font-medium">{error.message}</h3>

        <div className="flex gap-3 justify-center">
          {error.recoverable && (
            <button onClick={onRetry} className="px-4 py-2 bg-blue-600 text-white rounded">
              Try Again
            </button>
          )}
          <button onClick={onFallback} className="px-4 py-2 bg-white/10 text-white rounded">
            Watch Video Instead
          </button>
        </div>

        {error.suggestedAction === 'upgrade' && (
          <p className="text-white/60 text-sm">
            Try using the latest version of Chrome, Firefox, or Edge.
          </p>
        )}
      </div>
    </div>
  );
}
```

---

## Performance Budget

### Initial Load (Portfolio Page)

| Asset | Budget | Notes |
|-------|--------|-------|
| Portfolio JS bundle | <100KB gzip | Excludes demo code |
| Demo launcher shell | <15KB gzip | Just thumbnail + button |
| Total blocking resources | <150KB | Above fold content |
| Time to Interactive | <2s | On 3G connection |

### Demo Launch (On-Demand)

| Demo Type | Max Bundle Size | Max Load Time |
|-----------|-----------------|---------------|
| Terminal Emulator | 50KB | <1s |
| Code Playground | 200KB | <2s |
| WebGL Viewer | 500KB + models | <5s |
| WASM Game | 10MB+ | <30s (with progress) |

### Runtime Performance

| Metric | Target | Measurement |
|--------|--------|-------------|
| Frame rate | 60fps | `requestAnimationFrame` timing |
| Input latency | <16ms | Input event to frame delta |
| Memory usage | <512MB | `performance.memory` (Chrome) |
| GPU memory | <1GB | Estimated from texture sizes |

---

## Deployment Strategy

### Asset Structure

```
public/
└── demos/
    ├── _shared/                    # Shared runtime assets
    │   ├── terminal-runtime.js     # Terminal emulator bundle
    │   ├── webgl-viewer.js         # Three.js viewer bundle
    │   └── code-playground.js      # Monaco editor bundle
    │
    ├── island-escape/
    │   ├── game.wasm               # Compiled game (Unreal WebGL)
    │   ├── game.data               # Asset pack
    │   ├── loader.js               # Boot loader
    │   ├── thumbnail.webp          # Preview image
    │   └── manifest.json           # Version & integrity hashes
    │
    ├── vulkan-renderer/
    │   ├── sponza.glb              # 3D model
    │   ├── helmet.glb              # 3D model
    │   ├── env.hdr                 # Environment map
    │   └── thumbnail.webp
    │
    └── [other-projects]/
```

### Cache Strategy

```javascript
// next.config.js additions

module.exports = {
  async headers() {
    return [
      // Existing security headers...

      // Demo assets - aggressive caching with versioned URLs
      {
        source: '/demos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },
};
```

### Build Pipeline

```yaml
# GitHub Actions workflow addition

- name: Build Demo Assets
  run: |
    # Validate demo manifests
    node scripts/validate-demo-manifests.js

    # Generate integrity hashes
    node scripts/generate-demo-hashes.js

    # Optimize WASM (if source available)
    wasm-opt -O3 public/demos/**/*.wasm

    # Compress large assets
    brotli -k public/demos/**/*.{wasm,data,glb}
```

---

## Implementation Phases

### Phase 1: Foundation (Week 1)

- [ ] Create demo component architecture
- [ ] Implement sandbox iframe with security attributes
- [ ] Build postMessage protocol and validation
- [ ] Add capability detection utilities
- [ ] Create DemoLauncher with loading/error states
- [ ] Add fallback to existing YouTube videos

### Phase 2: Terminal Runtime (Week 2)

- [ ] Implement terminal emulator component
- [ ] Create virtual filesystem abstraction
- [ ] Build command parser and executor
- [ ] Add demo for SPAGHETTI_RELAY (chat simulation)
- [ ] Add demo for UnrealMCP (command playground)

### Phase 3: WebGL Viewer (Week 3)

- [ ] Integrate Three.js in sandboxed context
- [ ] Build model loader (GLTF/GLB support)
- [ ] Implement orbit controls and camera
- [ ] Add environment mapping
- [ ] Create demo for Vulkan renderer project

### Phase 4: WASM Games (Week 4)

- [ ] Research Unreal Engine HTML5 export format
- [ ] Implement WASM loader with streaming
- [ ] Add progress tracking for large downloads
- [ ] Handle memory management
- [ ] Create demo for Island Escape (if export available)

### Phase 5: Polish & Optimization (Week 5)

- [ ] Performance optimization pass
- [ ] Accessibility audit and fixes
- [ ] Mobile responsiveness improvements
- [ ] Documentation and maintenance guides
- [ ] Analytics integration for demo usage

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| WASM games too large for web | Medium | High | Offer "lite" versions, prioritize video fallback |
| Browser compatibility issues | Medium | Medium | Capability detection, graceful degradation |
| Security vulnerability in sandbox | Low | Critical | Regular security audit, minimal sandbox permissions |
| CDN costs exceed budget | Low | Medium | Aggressive caching, lazy loading, bandwidth monitoring |
| Demo content becomes outdated | Medium | Low | Version tracking, automated staleness alerts |
| Mobile performance issues | High | Medium | Device detection, disable on low-end devices |

---

## Appendix A: Browser Support Matrix

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| WebAssembly | 57+ | 52+ | 11+ | 16+ |
| WebGL 2.0 | 56+ | 51+ | 15+ | 79+ |
| SharedArrayBuffer | 68+* | 79+ | 15.2+ | 79+ |
| Pointer Lock | 37+ | 50+ | 10.1+ | 13+ |
| Gamepad API | 35+ | 29+ | 10.1+ | 12+ |

*Requires COOP/COEP headers for SharedArrayBuffer

---

## Appendix B: Security Checklist

- [ ] Iframe uses `sandbox` attribute without `allow-same-origin`
- [ ] CSP prevents external script loading in sandbox
- [ ] PostMessage validates origin before processing
- [ ] PostMessage validates message structure (type guards)
- [ ] No sensitive data passed to sandbox
- [ ] Demo assets served with integrity hashes
- [ ] COOP/COEP headers set for SharedArrayBuffer (if needed)
- [ ] User must explicitly click to launch demos (no autoplay)
- [ ] Resource limits documented and enforced
- [ ] Escape hatch (close button) always accessible

---

## Appendix C: Recruiter Experience Goals

1. **Zero Friction**: Click thumbnail → demo loads → experience project
2. **Professional Polish**: Smooth animations, clear feedback, no janky states
3. **Instant Credibility**: Shows technical capability beyond just talking about it
4. **Memorable Differentiation**: Interactive > video > screenshots > text
5. **Graceful Degradation**: Always has fallback, never shows broken state
6. **Mobile Friendly**: Works on recruiter's phone during commute
7. **Fast Exit**: Can close demo and return to portfolio instantly

---

*Document maintained by Platform Engineering. For questions, see CONTRIBUTING.md.*
