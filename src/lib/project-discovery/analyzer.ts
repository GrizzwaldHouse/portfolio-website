// src/lib/project-discovery/analyzer.ts
// Analyzes GitHub repositories to determine project type and runtime feasibility

import {
  GitHubRepoMeta,
  ProjectAnalysis,
  ProjectType,
  RuntimeFeasibility,
  LANGUAGE_HEURISTICS,
  TOPIC_CLASSIFICATIONS,
} from './types';

/**
 * Analyzes a GitHub repository and returns classification data
 */
export function analyzeRepository(repo: GitHubRepoMeta): ProjectAnalysis {
  const languageBreakdown = calculateLanguageBreakdown(repo.languages);
  const detectedType = detectProjectType(repo, languageBreakdown);
  const runtimeFeasibility = determineRuntimeFeasibility(repo, detectedType);
  const detectedTech = detectTechStack(repo, languageBreakdown);

  return {
    primaryLanguage: repo.primaryLanguage,
    languageBreakdown,
    detectedType: detectedType.type,
    typeConfidence: detectedType.confidence,
    typeSignals: detectedType.signals,
    runtimeFeasibility: runtimeFeasibility.type,
    runtimeSignals: runtimeFeasibility.signals,
    detectedTech: detectedTech.technologies,
    frameworks: detectedTech.frameworks,
    buildSystems: detectedTech.buildSystems,
    hasTests: detectHasTests(repo),
    hasCICD: detectHasCICD(repo),
    hasDocumentation: detectHasDocumentation(repo),
    lastActivity: repo.pushedAt,
    activityScore: calculateActivityScore(repo.pushedAt),
  };
}

/**
 * Calculate language breakdown percentages
 */
function calculateLanguageBreakdown(
  languages: Record<string, number>
): ProjectAnalysis['languageBreakdown'] {
  const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);

  return Object.entries(languages)
    .map(([language, bytes]) => ({
      language,
      bytes,
      percentage: total > 0 ? Math.round((bytes / total) * 100) : 0,
    }))
    .sort((a, b) => b.percentage - a.percentage);
}

/**
 * Detect project type based on various signals
 */
function detectProjectType(
  repo: GitHubRepoMeta,
  languageBreakdown: ProjectAnalysis['languageBreakdown']
): { type: ProjectType; confidence: number; signals: string[] } {
  const signals: string[] = [];
  const scores: Record<ProjectType, number> = {
    game: 0,
    'graphics-engine': 0,
    renderer: 0,
    tool: 0,
    cli: 0,
    library: 0,
    simulation: 0,
    'web-app': 0,
    other: 0,
  };

  // Topic-based signals (highest weight)
  for (const topic of repo.topics) {
    const topicLower = topic.toLowerCase();

    if (topicLower.includes('game') && !topicLower.includes('engine')) {
      scores.game += 30;
      signals.push(`Topic contains 'game': ${topic}`);
    }
    if (topicLower.includes('engine') || topicLower.includes('renderer')) {
      scores['graphics-engine'] += 30;
      scores.renderer += 20;
      signals.push(`Topic indicates engine/renderer: ${topic}`);
    }
    if (topicLower.includes('tool') || topicLower.includes('editor')) {
      scores.tool += 25;
      signals.push(`Topic indicates tool: ${topic}`);
    }
    if (topicLower.includes('cli') || topicLower.includes('terminal')) {
      scores.cli += 25;
      signals.push(`Topic indicates CLI: ${topic}`);
    }
    if (topicLower.includes('vulkan') || topicLower.includes('opengl') || topicLower.includes('graphics')) {
      scores.renderer += 20;
      scores['graphics-engine'] += 15;
      signals.push(`Topic indicates graphics: ${topic}`);
    }
    if (topicLower.includes('unreal') || topicLower.includes('unity')) {
      scores.game += 25;
      signals.push(`Topic indicates game engine: ${topic}`);
    }
  }

  // Name-based signals
  const nameLower = repo.name.toLowerCase();
  if (nameLower.includes('game') || nameLower.includes('jam')) {
    scores.game += 15;
    signals.push(`Name suggests game: ${repo.name}`);
  }
  if (nameLower.includes('render') || nameLower.includes('vulkan') || nameLower.includes('gl')) {
    scores.renderer += 20;
    signals.push(`Name suggests renderer: ${repo.name}`);
  }
  if (nameLower.includes('tool') || nameLower.includes('mcp') || nameLower.includes('editor')) {
    scores.tool += 15;
    signals.push(`Name suggests tool: ${repo.name}`);
  }
  if (nameLower.includes('relay') || nameLower.includes('server') || nameLower.includes('chat')) {
    scores.cli += 10;
    scores.tool += 10;
    signals.push(`Name suggests networking/CLI: ${repo.name}`);
  }

  // Language-based signals
  for (const { language, percentage } of languageBreakdown) {
    if (percentage < 5) continue;

    const heuristics = LANGUAGE_HEURISTICS[language];
    if (heuristics) {
      const weight = Math.min(percentage / 10, 10);
      for (const type of heuristics) {
        scores[type] += weight;
      }
      signals.push(`Language ${language} (${percentage}%) suggests: ${heuristics.join(', ')}`);
    }
  }

  // Description-based signals
  const descLower = (repo.description || '').toLowerCase();
  if (descLower.includes('game')) scores.game += 10;
  if (descLower.includes('render') || descLower.includes('graphics')) scores.renderer += 10;
  if (descLower.includes('engine')) scores['graphics-engine'] += 10;
  if (descLower.includes('tool') || descLower.includes('utility')) scores.tool += 10;

  // Find the highest scoring type
  const sortedTypes = Object.entries(scores)
    .sort(([, a], [, b]) => b - a) as [ProjectType, number][];

  const [topType, topScore] = sortedTypes[0];
  const [, secondScore] = sortedTypes[1] || ['other', 0];

  // Calculate confidence based on margin between top scores
  const confidence = topScore > 0
    ? Math.min((topScore - secondScore) / topScore + 0.3, 1)
    : 0.1;

  return {
    type: topScore > 0 ? topType : 'other',
    confidence: Math.round(confidence * 100) / 100,
    signals,
  };
}

/**
 * Determine what kind of runtime is feasible for this project
 */
function determineRuntimeFeasibility(
  repo: GitHubRepoMeta,
  projectType: { type: ProjectType; signals: string[] }
): { type: RuntimeFeasibility; signals: string[] } {
  const signals: string[] = [];
  const topics = repo.topics.map(t => t.toLowerCase());
  const nameLower = repo.name.toLowerCase();

  // Check for itch.io or external embed possibilities
  if (repo.homepage?.includes('itch.io')) {
    signals.push('Has itch.io homepage - can embed directly');
    return { type: 'static-embed', signals };
  }

  // Check for Unreal/Unity WebGL potential
  const isUnreal = topics.some(t => t.includes('unreal')) ||
                   nameLower.includes('unreal') ||
                   repo.description?.toLowerCase().includes('unreal');
  const isUnity = topics.some(t => t.includes('unity')) ||
                  nameLower.includes('unity');

  if (isUnreal || isUnity) {
    signals.push(`${isUnreal ? 'Unreal' : 'Unity'} project detected`);
    signals.push('WebGL/WASM export potentially available');
    // For now, default to video-only unless explicitly configured
    // Real WASM exports require manual setup
    return { type: 'video-only', signals };
  }

  // Check for graphics/renderer projects
  if (projectType.type === 'renderer' || projectType.type === 'graphics-engine') {
    signals.push('Graphics project - could use WebGL viewer for model showcase');
    return { type: 'webgl-viewer', signals };
  }

  // Check for CLI/terminal projects
  if (projectType.type === 'cli' ||
      nameLower.includes('relay') ||
      nameLower.includes('chat') ||
      nameLower.includes('server')) {
    signals.push('CLI/networking project - terminal emulator viable');
    return { type: 'terminal-demo', signals };
  }

  // Check for tool projects
  if (projectType.type === 'tool') {
    // Tools might have various demo options
    if (topics.some(t => t.includes('mcp') || t.includes('editor'))) {
      signals.push('Editor tool - terminal demo for commands');
      return { type: 'terminal-demo', signals };
    }
    signals.push('Tool project - may need custom demo approach');
    return { type: 'video-only', signals };
  }

  // Check for web-based projects
  const hasWebLanguages = repo.primaryLanguage === 'JavaScript' ||
                          repo.primaryLanguage === 'TypeScript' ||
                          topics.some(t => t.includes('web') || t.includes('react'));
  if (hasWebLanguages && projectType.type === 'web-app') {
    signals.push('Web project - could run as code playground');
    return { type: 'code-playground', signals };
  }

  // Default: check if we have videos available
  signals.push('No specific runtime detected - falling back to video showcase');
  return { type: 'video-only', signals };
}

/**
 * Detect technology stack from repository signals
 */
function detectTechStack(
  repo: GitHubRepoMeta,
  languageBreakdown: ProjectAnalysis['languageBreakdown']
): { technologies: string[]; frameworks: string[]; buildSystems: string[] } {
  const technologies: string[] = [];
  const frameworks: string[] = [];
  const buildSystems: string[] = [];

  // Add primary languages
  for (const { language, percentage } of languageBreakdown) {
    if (percentage >= 5) {
      technologies.push(language);
    }
  }

  // Detect from topics
  const topicMappings: Record<string, { tech?: string; framework?: string; build?: string }> = {
    'unreal-engine': { framework: 'Unreal Engine 5.5' },
    'unity': { framework: 'Unity' },
    'vulkan': { tech: 'Vulkan API' },
    'opengl': { tech: 'OpenGL' },
    'cmake': { build: 'CMake' },
    'meson': { build: 'Meson' },
    'react': { framework: 'React' },
    'nextjs': { framework: 'Next.js' },
    'fastmcp': { framework: 'FastMCP' },
    'winsock': { tech: 'Winsock' },
    'networking': { tech: 'Networking' },
    'blueprints': { tech: 'Blueprints' },
    'perforce': { build: 'Perforce' },
    'git': { build: 'Git' },
  };

  for (const topic of repo.topics) {
    const mapping = topicMappings[topic.toLowerCase()];
    if (mapping) {
      if (mapping.tech && !technologies.includes(mapping.tech)) {
        technologies.push(mapping.tech);
      }
      if (mapping.framework && !frameworks.includes(mapping.framework)) {
        frameworks.push(mapping.framework);
      }
      if (mapping.build && !buildSystems.includes(mapping.build)) {
        buildSystems.push(mapping.build);
      }
    }
  }

  // Detect from name/description
  const text = `${repo.name} ${repo.description || ''}`.toLowerCase();

  if (text.includes('vulkan')) technologies.push('Vulkan API');
  if (text.includes('glsl')) technologies.push('GLSL');
  if (text.includes('unreal')) frameworks.push('Unreal Engine');
  if (text.includes('mcp')) frameworks.push('MCP');
  if (text.includes('winsock') || text.includes('networking')) technologies.push('Winsock');

  return {
    technologies: [...new Set(technologies)],
    frameworks: [...new Set(frameworks)],
    buildSystems: [...new Set(buildSystems)],
  };
}

/**
 * Check if repo has tests
 */
function detectHasTests(repo: GitHubRepoMeta): boolean {
  // Would need file tree access for accurate detection
  // For now, check topics and common patterns
  const indicators = ['tests', 'testing', 'test-coverage', 'ci'];
  return repo.topics.some(t => indicators.includes(t.toLowerCase()));
}

/**
 * Check if repo has CI/CD
 */
function detectHasCICD(repo: GitHubRepoMeta): boolean {
  const indicators = ['ci', 'cd', 'github-actions', 'travis', 'circleci'];
  return repo.topics.some(t => indicators.includes(t.toLowerCase()));
}

/**
 * Check if repo has documentation
 */
function detectHasDocumentation(repo: GitHubRepoMeta): boolean {
  // Check for docs-related topics
  const indicators = ['documentation', 'docs', 'documented'];
  return repo.topics.some(t => indicators.includes(t.toLowerCase())) ||
         repo.description !== null && repo.description.length > 50;
}

/**
 * Calculate activity score (0-100) based on last push date
 */
function calculateActivityScore(pushedAt: string): number {
  const lastPush = new Date(pushedAt);
  const now = new Date();
  const daysSincePush = Math.floor((now.getTime() - lastPush.getTime()) / (1000 * 60 * 60 * 24));

  // Score decreases with time
  if (daysSincePush < 7) return 100;
  if (daysSincePush < 30) return 90;
  if (daysSincePush < 90) return 75;
  if (daysSincePush < 180) return 60;
  if (daysSincePush < 365) return 40;
  return 20;
}

/**
 * Generate a theme based on project characteristics
 */
export function generateTheme(
  repo: GitHubRepoMeta,
  projectType: ProjectType
): 'default' | 'hogwarts' | 'cyberpunk' | 'nature' | 'terminal' {
  const nameLower = repo.name.toLowerCase();
  const topics = repo.topics.map(t => t.toLowerCase());

  // Wizard/magic theme
  if (nameLower.includes('wizard') || nameLower.includes('magic') ||
      topics.some(t => t.includes('wizard') || t.includes('magic'))) {
    return 'hogwarts';
  }

  // Nature/survival theme
  if (nameLower.includes('island') || nameLower.includes('survival') ||
      nameLower.includes('nature') || nameLower.includes('voxel') ||
      topics.some(t => t.includes('survival') || t.includes('nature'))) {
    return 'nature';
  }

  // Terminal/CLI theme
  if (projectType === 'cli' || nameLower.includes('relay') ||
      nameLower.includes('terminal') || nameLower.includes('chat')) {
    return 'terminal';
  }

  // Cyberpunk for tech/graphics projects
  if (projectType === 'renderer' || projectType === 'graphics-engine' ||
      projectType === 'tool' || nameLower.includes('vulkan') ||
      nameLower.includes('mcp') || nameLower.includes('ai')) {
    return 'cyberpunk';
  }

  return 'default';
}
