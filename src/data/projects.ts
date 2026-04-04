export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: 'games' | 'engine' | 'tools' | 'ai-automation';
  tags: string[];
  engine?: 'unity' | 'unreal' | 'custom' | 'none';
  thumbnail: string;
  heroMedia: string;
  screenshots?: string[];
  description: string;
  role: string;
  contributions: string[];
  technicalHighlights: string[];
  repoName?: string;
  links: {
    github?: string;
    demo?: string;
    download?: string;
    video?: string;
  };
  embed?: {
    type: 'unity-webgl' | 'wasm' | 'canvas' | 'iframe' | 'video-only';
    buildPath?: string;
    width?: number;
    height?: number;
  };
  featured: boolean;
  date: string;
  status: 'complete' | 'in-progress' | 'archived';
}

export const projects: Project[] = [
  {
    slug: 'quidditch-ai-flight',
    title: 'Quidditch AI Flight System',
    tagline: 'Behavior tree-driven AI agents that collect items, mount brooms, and navigate 3D arenas.',
    category: 'games',
    tags: ['C++', 'Unreal Engine 5.4', 'Behavior Trees', 'AI', 'Blackboard'],
    engine: 'unreal',
    thumbnail: '/images/projects/placeholder.webp',
    heroMedia: '/images/projects/placeholder.webp',
    description:
      'Capstone project featuring a complete Quidditch AI flight system built in Unreal Engine 5.4. AI agents use behavior trees with Blackboard data to autonomously collect items, mount brooms, navigate to staging zones, and engage in aerial gameplay. The system demonstrates advanced navigation mesh integration, dynamic obstacle avoidance, and state machine transitions between ground and flight modes.',
    role: 'Solo Developer',
    contributions: [
      'Designed and implemented behavior tree architecture for AI flight navigation',
      'Built custom Blackboard keys for dynamic decision-making during gameplay',
      'Integrated NavMesh pathfinding with custom flight movement components',
      'Created staging zone system with trigger volumes and state transitions',
    ],
    technicalHighlights: [
      'Behavior Tree with 12+ task nodes and 4 decorator conditions',
      'Custom EQS (Environment Query System) for item detection',
      'Smooth ground-to-flight transition using interpolated movement modes',
    ],
    repoName: 'quidditch-ai-flight',
    links: {
      github: 'https://github.com/GrizzwaldHouse/quidditch-ai-flight',
    },
    embed: { type: 'video-only' },
    featured: true,
    date: '2026-02-01',
    status: 'in-progress',
  },
  {
    slug: 'island-escape',
    title: 'IslandEscape Survival Game',
    tagline: 'Voxel weapons, teleporter systems, health components, and interactive tooltips in UE5.',
    category: 'games',
    tags: ['C++', 'Unreal Engine 5.4', 'Blueprints', 'Game Systems'],
    engine: 'unreal',
    thumbnail: '/images/projects/placeholder.webp',
    heroMedia: '/images/projects/placeholder.webp',
    description:
      'A survival game built in Unreal Engine 5.4 reaching 90% completion. Features include a teleporter system for fast travel, voxel-based weapon crafting, a modular health component with damage types, and an interactive tooltip system for item inspection. Built with a focus on clean C++ architecture and reusable game systems.',
    role: 'Solo Developer',
    contributions: [
      'Implemented teleporter network with seamless level streaming',
      'Built voxel weapon system with procedural mesh generation',
      'Designed modular health component supporting multiple damage types',
      'Created interactive tooltip system with world-space UI widgets',
    ],
    technicalHighlights: [
      'Component-based architecture for maximum reusability',
      'Custom damage type system with resistances and vulnerabilities',
      'Level streaming integration for open-world teleportation',
    ],
    repoName: 'island-escape',
    links: {
      github: 'https://github.com/GrizzwaldHouse/island-escape',
    },
    embed: { type: 'video-only' },
    featured: true,
    date: '2025-12-15',
    status: 'complete',
  },
  {
    slug: 'mcp-command-panel',
    title: 'MCP Command Panel for Unreal Engine',
    tagline: 'C++ plugin + Python FastAPI backend bridging AI models to the Unreal Editor.',
    category: 'ai-automation',
    tags: ['C++', 'Python', 'FastAPI', 'HTTP/TCP', 'Unreal Engine'],
    engine: 'unreal',
    thumbnail: '/images/projects/placeholder.webp',
    heroMedia: '/images/projects/placeholder.webp',
    description:
      'A full-stack development tool combining a C++ Unreal Engine plugin with a Python FastAPI backend. The MCP Command Panel enables AI models (Claude, Gemini) to send commands directly to the Unreal Editor through HTTP/TCP networking. Features include editor utility widgets for command monitoring, real-time logging, and bidirectional communication.',
    role: 'Solo Developer',
    contributions: [
      'Built C++ Unreal plugin with HTTP client for FastAPI communication',
      'Designed Python FastAPI backend with WebSocket support',
      'Created Editor Utility Widget for real-time command monitoring',
      'Integrated multiple AI providers (Claude, Gemini) as command sources',
    ],
    technicalHighlights: [
      'Clean Architecture separation between networking and editor layers',
      'TCP keepalive with automatic reconnection logic',
      'JSON-RPC style command protocol with validation',
    ],
    repoName: 'mcp-command-panel',
    links: {
      github: 'https://github.com/GrizzwaldHouse/mcp-command-panel',
    },
    embed: { type: 'video-only' },
    featured: true,
    date: '2026-01-20',
    status: 'complete',
  },
  {
    slug: 'vulkan-renderer',
    title: 'Vulkan 3D Renderer',
    tagline: 'Custom 3D renderer with PBR materials, dynamic lighting, 35% performance optimization.',
    category: 'engine',
    tags: ['C++', 'Vulkan API', 'GLSL', 'CMake', 'PBR'],
    engine: 'custom',
    thumbnail: '/images/projects/placeholder.webp',
    heroMedia: '/images/projects/placeholder.webp',
    description:
      'A custom 3D rendering engine built from scratch using Vulkan API. Features physically-based rendering materials, dynamic point and directional lighting, shadow mapping, and a 35% performance optimization through pipeline state caching and command buffer reuse.',
    role: 'Solo Developer',
    contributions: [
      'Built Vulkan rendering pipeline from scratch with validation layers',
      'Implemented PBR material system with metallic-roughness workflow',
      'Designed dynamic lighting system with shadow mapping',
      'Achieved 35% performance improvement through pipeline optimization',
    ],
    technicalHighlights: [
      'Custom Vulkan abstraction layer for resource management',
      'PBR shading with image-based lighting',
      'Descriptor set pooling for efficient GPU resource binding',
    ],
    repoName: 'Vulkan-Renderer',
    links: {
      github: 'https://github.com/GrizzwaldHouse/Vulkan-Renderer',
    },
    embed: { type: 'video-only' },
    featured: true,
    date: '2025-11-01',
    status: 'complete',
  },
  {
    slug: 'brightforge',
    title: 'BrightForge',
    tagline: 'Hybrid CLI coding, design, and 3D generation agent using local LLMs with cloud fallback.',
    category: 'ai-automation',
    tags: ['Node.js', 'JavaScript', 'Python', 'Ollama', 'Three.js', 'SQLite'],
    engine: 'none',
    thumbnail: '/images/projects/placeholder.webp',
    heroMedia: '/images/projects/placeholder.webp',
    description:
      'A hybrid CLI agent that combines local LLM inference (via Ollama) with cloud API fallback for coding assistance, design generation, and 3D asset creation. Features include multi-model orchestration, persistent conversation history with SQLite, and Three.js-based 3D preview.',
    role: 'Solo Developer',
    contributions: [
      'Architected multi-model orchestration with local/cloud fallback',
      'Built persistent conversation history with SQLite storage',
      'Integrated Three.js for real-time 3D asset preview',
      'Designed plugin system for extensible tool capabilities',
    ],
    technicalHighlights: [
      'Graceful degradation from local Ollama to cloud APIs',
      'Streaming response handling across different LLM providers',
      'CLI interface with rich terminal formatting',
    ],
    repoName: 'BrightForge',
    links: {
      github: 'https://github.com/GrizzwaldHouse/BrightForge',
    },
    embed: { type: 'video-only' },
    featured: true,
    date: '2026-01-15',
    status: 'in-progress',
  },
  {
    slug: 'survival-companion',
    title: 'Modular Survival Companion Platform',
    tagline: 'C# 12/.NET 8/WPF desktop app with Clean Architecture for multi-game progression tracking.',
    category: 'tools',
    tags: ['C#', '.NET 8', 'WPF', 'MVVM', 'Clean Architecture'],
    engine: 'none',
    thumbnail: '/images/projects/placeholder.webp',
    heroMedia: '/images/projects/placeholder.webp',
    description:
      'A WPF desktop application built with C# 12 and .NET 8 following Clean Architecture principles. Designed as a modular companion tool supporting multiple survival games with progression tracking, save management, and game-specific plugins. Uses MVVM pattern with Result<T> error handling throughout.',
    role: 'Solo Developer',
    contributions: [
      'Architected Clean Architecture solution with domain/application/infrastructure layers',
      'Implemented MVVM pattern with command binding and observable collections',
      'Built plugin system for game-specific modules',
      'Designed Result<T> error handling pattern eliminating null reference exceptions',
    ],
    technicalHighlights: [
      'Clean Architecture with dependency inversion across all layers',
      'Result<T> monad pattern for explicit error handling',
      'Plugin-based extensibility for adding new games without core changes',
    ],
    repoName: 'survival-companion',
    links: {
      github: 'https://github.com/GrizzwaldHouse/survival-companion',
      download: 'https://github.com/GrizzwaldHouse/survival-companion/releases/latest',
    },
    embed: { type: 'video-only' },
    featured: false,
    date: '2026-01-10',
    status: 'in-progress',
  },
  {
    slug: 'game-of-life',
    title: "Conway's Game of Life",
    tagline: 'Interactive cellular automaton with toroidal wrapping, neighbor counts, and adjustable grid — ported from C++ to web.',
    category: 'games',
    tags: ['C++', 'wxWidgets', 'JavaScript', 'Canvas', 'Algorithms'],
    engine: 'custom',
    thumbnail: '/images/projects/placeholder.webp',
    heroMedia: '/images/projects/placeholder.webp',
    description:
      "A fully interactive Conway's Game of Life implementation, originally built as a C++ wxWidgets desktop application during Full Sail University coursework. Re-implemented as a web canvas component for this portfolio. Features include play/pause/step simulation, randomize with custom seeds, toroidal and finite boundary modes, adjustable grid size and speed, neighbor count overlay, and click-to-toggle cells.",
    role: 'Solo Developer',
    contributions: [
      'Built complete wxWidgets GUI with toolbar, menus, and settings dialog',
      'Implemented toroidal and finite boundary neighbor counting algorithms',
      'Added file I/O for saving and loading .cells patterns',
      'Ported to JavaScript Canvas for web-playable portfolio demo',
    ],
    technicalHighlights: [
      'Shunting-yard-inspired grid update using double buffering',
      'Toroidal wrap-around using modular arithmetic',
      'Custom rendering with per-cell neighbor count overlay',
    ],
    repoName: 'conway-s-game-of-life-05-24-GrizzwaldHouse',
    links: {
      github: 'https://github.com/GrizzwaldHouse/conway-s-game-of-life-05-24-GrizzwaldHouse',
    },
    embed: { type: 'canvas', width: 600, height: 600 },
    featured: false,
    date: '2024-05-01',
    status: 'complete',
  },
  {
    slug: 'crypt-crawler',
    title: 'Crypt Crawler',
    tagline: 'Team-built Unity dungeon crawler with WebGL build — explore procedural crypts and battle enemies.',
    category: 'games',
    tags: ['Unity', 'C#', 'WebGL', 'Team Project', 'Dungeon Crawler'],
    engine: 'unity',
    thumbnail: '/images/projects/placeholder.webp',
    heroMedia: '/images/projects/placeholder.webp',
    description:
      'A dungeon crawler game built in Unity as a team project (DarklightDevs) during Full Sail University. Features procedural crypt levels, enemy AI, player combat mechanics, and atmospheric lighting. Published as a WebGL build on Unity Play for browser-based gameplay.',
    role: 'Team Developer (DarklightDevs)',
    contributions: [
      'Contributed to gameplay systems and level design',
      'Helped implement enemy AI behavior and combat mechanics',
      'Participated in team coordination and code review with Perforce',
      'Published WebGL build for browser distribution',
    ],
    technicalHighlights: [
      'Unity WebGL deployment for zero-install browser gameplay',
      'Procedural dungeon generation with room connectivity',
      'Atmospheric post-processing effects for crypt ambiance',
    ],
    links: {
      demo: 'https://play.unity.com/en/games/2877d76b-1c0e-406b-9ff1-e95d42ed1ebc/cryptcrawler-webgl-builds',
    },
    embed: { type: 'iframe', width: 960, height: 600 },
    featured: false,
    date: '2024-09-01',
    status: 'complete',
  },
  {
    slug: 'calculator',
    title: 'Scientific Calculator',
    tagline: 'Full expression parser with Shunting-Yard algorithm, trig functions, and keyboard support — ported from C++ to web.',
    category: 'tools',
    tags: ['C++', 'wxWidgets', 'JavaScript', 'React', 'Algorithms'],
    engine: 'none',
    thumbnail: '/images/projects/placeholder.webp',
    heroMedia: '/images/projects/placeholder.webp',
    description:
      'A scientific calculator originally built as a C++ wxWidgets application (SWE_App) with a teammate during Full Sail coursework. Features a full expression parser using the Shunting-Yard algorithm, supporting arithmetic, parentheses, trigonometric functions (sin/cos/tan with degree-to-radian conversion), percentage, negation, and chained expressions. Re-implemented as a web app for this portfolio with full keyboard support.',
    role: 'Co-Developer',
    contributions: [
      'Implemented CalculatorProcessor with Shunting-Yard expression parsing',
      'Built ButtonFactory for modular UI button creation',
      'Designed tokenizer handling negative numbers and operator precedence',
      'Ported complete logic to JavaScript for web deployment',
    ],
    technicalHighlights: [
      'Shunting-Yard algorithm for correct operator precedence',
      'Tokenizer with context-aware negative number detection',
      'Singleton pattern for calculator processor instance',
    ],
    repoName: 'calculator-chris-GrizzwaldHouse',
    links: {
      github: 'https://github.com/GrizzwaldHouse/calculator-chris-GrizzwaldHouse',
    },
    embed: { type: 'canvas', width: 400, height: 500 },
    featured: false,
    date: '2024-06-01',
    status: 'complete',
  },
  {
    slug: 'wizard-jam',
    title: 'Wizard Jam',
    tagline: 'UE5 game jam project featuring spell-casting UI, magic systems, and multiplayer wizard combat.',
    category: 'games',
    tags: ['Unreal Engine 5', 'C++', 'Blueprints', 'Game Jam', 'UI/UX'],
    engine: 'unreal',
    thumbnail: '/images/projects/placeholder.webp',
    heroMedia: '/images/projects/placeholder.webp',
    description:
      'A game jam project built in Unreal Engine 5 during the Full Sail capstone course. Features a spell-casting system with custom UI for spell selection, visual effects for magic attacks, and multiplayer wizard combat. Built under game jam time constraints with rapid prototyping and iteration.',
    role: 'Team Developer',
    contributions: [
      'Developed spell-casting UI system with dynamic spell selection',
      'Implemented visual effects for magic attacks using Niagara particles',
      'Contributed to multiplayer networking and game state management',
      'Rapid prototyping under game jam time constraints',
    ],
    technicalHighlights: [
      'UE5 UMG widgets for dynamic spell UI',
      'Niagara particle systems for spell VFX',
      'Blueprint and C++ hybrid architecture for rapid iteration',
    ],
    links: {},
    embed: { type: 'video-only' },
    featured: false,
    date: '2025-08-01',
    status: 'complete',
  },
  {
    slug: 'honeybadger-vault',
    title: 'HoneyBadgerVault',
    tagline: 'AI-powered autonomous agent for secure vault management and intelligent automation.',
    category: 'ai-automation',
    tags: ['Python', 'AI Agents', 'Automation', 'Security', 'LLM Integration'],
    engine: 'none',
    thumbnail: '/images/projects/placeholder.webp',
    heroMedia: '/images/projects/placeholder.webp',
    description:
      'An autonomous AI agent system designed for secure vault management and intelligent task automation. Features multi-model LLM integration, secure credential handling, and automated workflow execution with comprehensive logging and error recovery.',
    role: 'Solo Developer',
    contributions: [
      'Architected autonomous agent framework with secure vault integration',
      'Implemented multi-model LLM orchestration for task planning',
      'Built secure credential management with encryption at rest',
      'Designed comprehensive logging and error recovery system',
    ],
    technicalHighlights: [
      'Autonomous agent architecture with goal-oriented planning',
      'Secure vault integration with AES-256 encryption',
      'Multi-provider LLM support with fallback chains',
    ],
    repoName: 'Agent-Alexander',
    links: {
      github: 'https://github.com/GrizzwaldHouse/Agent-Alexander',
    },
    embed: { type: 'video-only' },
    featured: true,
    date: '2026-03-01',
    status: 'in-progress',
  },
  {
    slug: 'deep-command',
    title: 'DeepCommand',
    tagline: 'Unreal Engine 5 tactical command simulation with AI-driven unit behavior and strategic gameplay.',
    category: 'games',
    tags: ['C++', 'Unreal Engine 5', 'AI', 'Tactical', 'Simulation'],
    engine: 'unreal',
    thumbnail: '/images/projects/placeholder.webp',
    heroMedia: '/images/projects/placeholder.webp',
    description:
      'A tactical command simulation built in Unreal Engine 5 featuring AI-driven unit behavior, strategic resource management, and real-time tactical decision-making. Combines deep gameplay systems with sophisticated AI opponents.',
    role: 'Solo Developer',
    contributions: [
      'Designed tactical AI system with behavior trees and utility scoring',
      'Implemented real-time unit command and control interface',
      'Built strategic resource management and base building systems',
      'Created dynamic difficulty adjustment based on player performance',
    ],
    technicalHighlights: [
      'Utility AI system for dynamic tactical decision-making',
      'Custom command interface with multi-unit selection and waypoints',
      'Performance-adaptive difficulty scaling',
    ],
    links: {},
    embed: { type: 'video-only' },
    featured: false,
    date: '2026-02-15',
    status: 'in-progress',
  },
  {
    slug: 'paws-of-valor',
    title: 'Paws of Valor',
    tagline: 'Service dog training simulation promoting veteran mental health awareness through interactive gameplay.',
    category: 'games',
    tags: ['Unity', 'C#', 'Simulation', 'Social Impact', 'Veterans'],
    engine: 'unity',
    thumbnail: '/images/projects/placeholder.webp',
    heroMedia: '/images/projects/placeholder.webp',
    description:
      'A service dog training simulation game that promotes veteran mental health awareness through interactive gameplay. Players train and bond with a virtual service dog while learning about PTSD support, therapeutic techniques, and the real impact service animals have on veterans\' lives.',
    role: 'Solo Developer',
    contributions: [
      'Designed empathetic gameplay loop centered on veteran mental health',
      'Implemented service dog AI with realistic behavior patterns',
      'Built training progression system with educational content',
      'Created accessible UI supporting diverse player needs',
    ],
    technicalHighlights: [
      'Companion AI with emotional state machine and bonding mechanics',
      'Educational content integration without breaking gameplay flow',
      'Accessibility-first design with configurable difficulty',
    ],
    links: {},
    embed: { type: 'video-only' },
    featured: false,
    date: '2026-01-01',
    status: 'in-progress',
  },
  {
    slug: 'developer-productivity-tracker',
    title: 'Developer Productivity Tracker',
    tagline: 'UE5 editor plugin tracking coding sessions, build times, and development metrics in real-time.',
    category: 'tools',
    tags: ['C++', 'Unreal Engine 5', 'Editor Plugin', 'Analytics', 'Developer Tools'],
    engine: 'unreal',
    thumbnail: '/images/projects/placeholder.webp',
    heroMedia: '/images/projects/placeholder.webp',
    description:
      'An Unreal Engine 5 editor plugin that tracks developer productivity metrics including coding session duration, build times, asset compilation stats, and workflow patterns. Provides real-time dashboards within the editor and exportable reports for team leads.',
    role: 'Solo Developer',
    contributions: [
      'Built UE5 editor subsystem for non-intrusive metric collection',
      'Implemented real-time dashboard with Slate UI widgets',
      'Designed data export pipeline for CSV and JSON reporting',
      'Created configurable tracking profiles for different workflows',
    ],
    technicalHighlights: [
      'UE5 Editor Subsystem architecture for lifecycle management',
      'Slate UI dashboard with real-time charting',
      'Minimal performance overhead through batched metric collection',
    ],
    repoName: 'DeveloperProductivityTracker',
    links: {
      github: 'https://github.com/GrizzwaldHouse/DeveloperProductivityTracker',
    },
    embed: { type: 'video-only' },
    featured: true,
    date: '2025-10-01',
    status: 'complete',
  },
  {
    slug: 'structured-logging',
    title: 'Structured Logging Plugin',
    tagline: 'UE5 plugin providing structured JSON logging with categories, severity levels, and output targets.',
    category: 'tools',
    tags: ['C++', 'Unreal Engine 5', 'Editor Plugin', 'Logging', 'Developer Tools'],
    engine: 'unreal',
    thumbnail: '/images/projects/placeholder.webp',
    heroMedia: '/images/projects/placeholder.webp',
    description:
      'An Unreal Engine 5 plugin that replaces the default logging system with structured JSON output. Supports log categories, severity levels, contextual metadata, multiple output targets (file, console, network), and runtime log filtering for production diagnostics.',
    role: 'Solo Developer',
    contributions: [
      'Designed structured log format with JSON serialization',
      'Implemented multiple output targets with async file writing',
      'Built runtime log filtering UI for in-editor diagnostics',
      'Created category-based log routing with configurable severity thresholds',
    ],
    technicalHighlights: [
      'Lock-free async log writing for zero gameplay impact',
      'JSON structured output compatible with ELK stack and Splunk',
      'Runtime-configurable category filtering via editor UI',
    ],
    repoName: 'StructuredLogging',
    links: {
      github: 'https://github.com/GrizzwaldHouse/StructuredLogging',
    },
    embed: { type: 'video-only' },
    featured: false,
    date: '2025-09-01',
    status: 'complete',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
