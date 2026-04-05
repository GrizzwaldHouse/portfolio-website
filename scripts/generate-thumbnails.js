/**
 * generate-thumbnails.js
 *
 * Generates unique, professional thumbnail images (800x450 .webp) for all
 * 15 portfolio projects. Each thumbnail uses category-specific color schemes,
 * geometric patterns, and clear title typography.
 *
 * Usage: node scripts/generate-thumbnails.js
 */

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'projects');
const WIDTH = 800;
const HEIGHT = 450;

// Category color schemes
const CATEGORY_THEMES = {
  games: {
    bgFrom: '#1a0a0a',
    bgTo: '#2a1010',
    accent1: '#D50032',
    accent2: '#FFCC00',
    motif: 'gamepad',
  },
  engine: {
    bgFrom: '#0a0a1a',
    bgTo: '#101020',
    accent1: '#3B82F6',
    accent2: '#60A5FA',
    motif: 'pipeline',
  },
  tools: {
    bgFrom: '#0a1a0a',
    bgTo: '#102010',
    accent1: '#10B981',
    accent2: '#FFCC00',
    motif: 'gear',
  },
  'ai-automation': {
    bgFrom: '#1a0a1a',
    bgTo: '#201020',
    accent1: '#A855F7',
    accent2: '#FFCC00',
    motif: 'neural',
  },
};

// All 15 projects
const PROJECTS = [
  { slug: 'quidditch-ai-flight', title: 'Quidditch AI Flight System', category: 'games', icon: 'broom' },
  { slug: 'island-escape', title: 'IslandEscape Survival Game', category: 'games', icon: 'island' },
  { slug: 'mcp-command-panel', title: 'MCP Command Panel', category: 'ai-automation', icon: 'terminal' },
  { slug: 'vulkan-renderer', title: 'Vulkan 3D Renderer', category: 'engine', icon: 'cube' },
  { slug: 'brightforge', title: 'BrightForge', category: 'ai-automation', icon: 'spark' },
  { slug: 'survival-companion', title: 'Survival Companion Platform', category: 'tools', icon: 'shield' },
  { slug: 'game-of-life', title: "Conway's Game of Life", category: 'games', icon: 'grid' },
  { slug: 'crypt-crawler', title: 'Crypt Crawler', category: 'games', icon: 'dungeon' },
  { slug: 'calculator', title: 'Scientific Calculator', category: 'tools', icon: 'calc' },
  { slug: 'wizard-jam', title: 'Wizard Jam', category: 'games', icon: 'wand' },
  { slug: 'honeybadger-vault', title: 'HoneyBadgerVault', category: 'ai-automation', icon: 'vault' },
  { slug: 'deep-command', title: 'DeepCommand', category: 'games', icon: 'radar' },
  { slug: 'paws-of-valor', title: 'Paws of Valor', category: 'games', icon: 'paw' },
  { slug: 'developer-productivity-tracker', title: 'Dev Productivity Tracker', category: 'tools', icon: 'chart' },
  { slug: 'structured-logging', title: 'Structured Logging Plugin', category: 'tools', icon: 'log' },
];

// --- Utility drawing functions ---

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function drawGradientBackground(ctx, colorFrom, colorTo) {
  const grad = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  grad.addColorStop(0, colorFrom);
  grad.addColorStop(1, colorTo);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function drawSubtleNoise(ctx, opacity) {
  for (let i = 0; i < 3000; i++) {
    const x = Math.random() * WIDTH;
    const y = Math.random() * HEIGHT;
    const brightness = Math.floor(Math.random() * 80 + 120);
    ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${opacity})`;
    ctx.fillRect(x, y, 1, 1);
  }
}

// --- Category-specific pattern drawers ---

function drawGameMotif(ctx, accent1, accent2, seed) {
  // Diagonal scan lines
  ctx.strokeStyle = `${accent1}15`;
  ctx.lineWidth = 1;
  for (let i = -HEIGHT; i < WIDTH + HEIGHT; i += 18) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i - HEIGHT, HEIGHT);
    ctx.stroke();
  }

  // Floating hexagons
  const rng = mulberry32(seed);
  for (let i = 0; i < 8; i++) {
    const cx = rng() * WIDTH;
    const cy = rng() * HEIGHT;
    const size = rng() * 30 + 15;
    const alpha = rng() * 0.12 + 0.04;
    drawHexagon(ctx, cx, cy, size, accent2, alpha);
  }

  // Controller/crosshair accent shapes
  for (let i = 0; i < 4; i++) {
    const cx = rng() * WIDTH;
    const cy = rng() * HEIGHT;
    const size = rng() * 20 + 10;
    drawCrosshair(ctx, cx, cy, size, accent1, 0.15);
  }
}

function drawEngineMotif(ctx, accent1, accent2, seed) {
  // Pipeline grid
  ctx.strokeStyle = `${accent1}12`;
  ctx.lineWidth = 1;
  for (let x = 0; x < WIDTH; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, HEIGHT);
    ctx.stroke();
  }
  for (let y = 0; y < HEIGHT; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(WIDTH, y);
    ctx.stroke();
  }

  // Floating 3D wireframe cubes
  const rng = mulberry32(seed);
  for (let i = 0; i < 6; i++) {
    const cx = rng() * WIDTH;
    const cy = rng() * HEIGHT;
    const size = rng() * 35 + 20;
    const alpha = rng() * 0.15 + 0.05;
    drawWireframeCube(ctx, cx, cy, size, accent2, alpha);
  }

  // Circuit trace paths
  for (let i = 0; i < 3; i++) {
    drawCircuitTrace(ctx, rng, accent1, 0.1);
  }
}

function drawToolMotif(ctx, accent1, accent2, seed) {
  // Dot matrix pattern
  ctx.fillStyle = `${accent1}08`;
  for (let x = 10; x < WIDTH; x += 20) {
    for (let y = 10; y < HEIGHT; y += 20) {
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Gear outlines
  const rng = mulberry32(seed);
  for (let i = 0; i < 5; i++) {
    const cx = rng() * WIDTH;
    const cy = rng() * HEIGHT;
    const size = rng() * 40 + 20;
    const alpha = rng() * 0.12 + 0.04;
    drawGear(ctx, cx, cy, size, accent2, alpha);
  }

  // Bracket/code motifs
  for (let i = 0; i < 4; i++) {
    const cx = rng() * WIDTH;
    const cy = rng() * HEIGHT;
    drawCodeBrackets(ctx, cx, cy, rng() * 20 + 12, accent1, 0.1);
  }
}

function drawNeuralMotif(ctx, accent1, accent2, seed) {
  // Neural network nodes and connections
  const rng = mulberry32(seed);
  const nodes = [];
  for (let i = 0; i < 20; i++) {
    nodes.push({
      x: rng() * WIDTH,
      y: rng() * HEIGHT,
      r: rng() * 4 + 2,
    });
  }

  // Draw connections between nearby nodes
  ctx.strokeStyle = `${accent1}10`;
  ctx.lineWidth = 1;
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
      if (dist < 200) {
        ctx.globalAlpha = Math.max(0.02, 0.12 * (1 - dist / 200));
        ctx.strokeStyle = accent1;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }
  ctx.globalAlpha = 1;

  // Draw nodes
  for (const node of nodes) {
    ctx.fillStyle = `${accent2}20`;
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = `${accent2}40`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Pulsing rings
  for (let i = 0; i < 3; i++) {
    const cx = rng() * WIDTH;
    const cy = rng() * HEIGHT;
    const size = rng() * 50 + 30;
    drawPulseRing(ctx, cx, cy, size, accent1, 0.08);
  }
}

// --- Shape primitives ---

function drawHexagon(ctx, cx, cy, size, color, alpha) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.globalAlpha = alpha;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const x = cx + size * Math.cos(angle);
    const y = cy + size * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

function drawCrosshair(ctx, cx, cy, size, color, alpha) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.globalAlpha = alpha;
  ctx.lineWidth = 1.5;
  // Horizontal
  ctx.beginPath();
  ctx.moveTo(cx - size, cy);
  ctx.lineTo(cx + size, cy);
  ctx.stroke();
  // Vertical
  ctx.beginPath();
  ctx.moveTo(cx, cy - size);
  ctx.lineTo(cx, cy + size);
  ctx.stroke();
  // Circle
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.6, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawWireframeCube(ctx, cx, cy, size, color, alpha) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.globalAlpha = alpha;
  ctx.lineWidth = 1;
  const h = size * 0.5;
  const d = size * 0.3;
  // Front face
  ctx.strokeRect(cx - h, cy - h, size, size);
  // Back face offset
  ctx.strokeRect(cx - h + d, cy - h - d, size, size);
  // Connecting lines
  const corners = [
    [cx - h, cy - h],
    [cx + h, cy - h],
    [cx + h, cy + h],
    [cx - h, cy + h],
  ];
  for (const [x, y] of corners) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + d, y - d);
    ctx.stroke();
  }
  ctx.restore();
}

function drawCircuitTrace(ctx, rng, color, alpha) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.globalAlpha = alpha;
  ctx.lineWidth = 2;
  let x = rng() * WIDTH;
  let y = rng() * HEIGHT;
  ctx.beginPath();
  ctx.moveTo(x, y);
  for (let i = 0; i < 8; i++) {
    const dir = Math.floor(rng() * 4);
    const len = rng() * 60 + 20;
    if (dir === 0) x += len;
    else if (dir === 1) x -= len;
    else if (dir === 2) y += len;
    else y -= len;
    ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
}

function drawGear(ctx, cx, cy, size, color, alpha) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.globalAlpha = alpha;
  ctx.lineWidth = 1.5;
  const teeth = 10;
  const innerR = size * 0.7;
  const outerR = size;
  ctx.beginPath();
  for (let i = 0; i < teeth * 2; i++) {
    const angle = (Math.PI / teeth) * i;
    const r = i % 2 === 0 ? outerR : innerR;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
  // Inner circle
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.35, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawCodeBrackets(ctx, cx, cy, size, color, alpha) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.globalAlpha = alpha;
  ctx.lineWidth = 2;
  ctx.font = `${size}px monospace`;
  ctx.fillStyle = color;
  ctx.fillText('{ }', cx, cy);
  ctx.restore();
}

function drawPulseRing(ctx, cx, cy, size, color, alpha) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  for (let i = 0; i < 3; i++) {
    ctx.globalAlpha = alpha * (1 - i * 0.3);
    ctx.beginPath();
    ctx.arc(cx, cy, size + i * 12, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

// --- Accent bar and border ---

function drawAccentBar(ctx, accent1, accent2) {
  // Bottom accent bar
  const grad = ctx.createLinearGradient(0, HEIGHT - 4, WIDTH, HEIGHT - 4);
  grad.addColorStop(0, accent1);
  grad.addColorStop(0.5, accent2);
  grad.addColorStop(1, accent1);
  ctx.fillStyle = grad;
  ctx.fillRect(0, HEIGHT - 4, WIDTH, 4);
}

function drawGlassBorder(ctx, accent1) {
  ctx.strokeStyle = `${accent1}30`;
  ctx.lineWidth = 1;
  ctx.strokeRect(0.5, 0.5, WIDTH - 1, HEIGHT - 1);
}

function drawGlowOrb(ctx, x, y, radius, color, alpha) {
  const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
  grad.addColorStop(0, `${color}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`);
  grad.addColorStop(1, `${color}00`);
  ctx.fillStyle = grad;
  ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
}

// --- Icon-specific accent drawers ---

function drawProjectIcon(ctx, icon, accent1, accent2) {
  switch (icon) {
    case 'broom':
      drawBroomIcon(ctx, accent1, accent2);
      break;
    case 'island':
      drawIslandIcon(ctx, accent1, accent2);
      break;
    case 'terminal':
      drawTerminalIcon(ctx, accent1, accent2);
      break;
    case 'cube':
      drawLargeCube(ctx, accent1, accent2);
      break;
    case 'spark':
      drawSparkIcon(ctx, accent1, accent2);
      break;
    case 'shield':
      drawShieldIcon(ctx, accent1, accent2);
      break;
    case 'grid':
      drawGridIcon(ctx, accent1, accent2);
      break;
    case 'dungeon':
      drawDungeonIcon(ctx, accent1, accent2);
      break;
    case 'calc':
      drawCalcIcon(ctx, accent1, accent2);
      break;
    case 'wand':
      drawWandIcon(ctx, accent1, accent2);
      break;
    case 'vault':
      drawVaultIcon(ctx, accent1, accent2);
      break;
    case 'radar':
      drawRadarIcon(ctx, accent1, accent2);
      break;
    case 'paw':
      drawPawIcon(ctx, accent1, accent2);
      break;
    case 'chart':
      drawChartIcon(ctx, accent1, accent2);
      break;
    case 'log':
      drawLogIcon(ctx, accent1, accent2);
      break;
  }
}

function drawBroomIcon(ctx, accent1, accent2) {
  const cx = 680, cy = 120;
  ctx.save();
  ctx.globalAlpha = 0.2;
  ctx.strokeStyle = accent2;
  ctx.lineWidth = 3;
  // Broom handle
  ctx.beginPath();
  ctx.moveTo(cx - 40, cy + 40);
  ctx.lineTo(cx + 30, cy - 30);
  ctx.stroke();
  // Bristles
  for (let i = -3; i <= 3; i++) {
    ctx.beginPath();
    ctx.moveTo(cx - 40, cy + 40);
    ctx.lineTo(cx - 60 + i * 4, cy + 65);
    ctx.stroke();
  }
  // Speed lines
  ctx.strokeStyle = accent1;
  ctx.lineWidth = 1;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(cx + 35 + i * 12, cy - 20 + i * 8);
    ctx.lineTo(cx + 55 + i * 12, cy - 20 + i * 8);
    ctx.stroke();
  }
  ctx.restore();
}

function drawIslandIcon(ctx, accent1, accent2) {
  const cx = 680, cy = 120;
  ctx.save();
  ctx.globalAlpha = 0.2;
  // Island mound
  ctx.fillStyle = accent1;
  ctx.beginPath();
  ctx.ellipse(cx, cy + 20, 50, 20, 0, 0, Math.PI * 2);
  ctx.fill();
  // Palm tree trunk
  ctx.strokeStyle = accent2;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx, cy + 15);
  ctx.quadraticCurveTo(cx + 5, cy - 10, cx + 3, cy - 30);
  ctx.stroke();
  // Palm leaves
  for (let angle = -0.8; angle <= 0.8; angle += 0.4) {
    ctx.beginPath();
    ctx.moveTo(cx + 3, cy - 30);
    ctx.quadraticCurveTo(cx + 3 + Math.cos(angle) * 25, cy - 40 + Math.sin(angle) * 15, cx + 3 + Math.cos(angle) * 35, cy - 25 + Math.sin(angle) * 20);
    ctx.stroke();
  }
  ctx.restore();
}

function drawTerminalIcon(ctx, accent1, accent2) {
  const cx = 660, cy = 100;
  ctx.save();
  ctx.globalAlpha = 0.2;
  // Terminal window
  ctx.strokeStyle = accent1;
  ctx.lineWidth = 2;
  ctx.strokeRect(cx, cy, 80, 55);
  // Title bar
  ctx.fillStyle = accent1;
  ctx.fillRect(cx, cy, 80, 12);
  // Prompt
  ctx.fillStyle = accent2;
  ctx.font = '14px monospace';
  ctx.fillText('> _', cx + 8, cy + 32);
  ctx.fillStyle = accent1;
  ctx.fillText('$ mcp', cx + 8, cy + 48);
  ctx.restore();
}

function drawLargeCube(ctx, accent1, accent2) {
  const cx = 680, cy = 110;
  ctx.save();
  ctx.globalAlpha = 0.2;
  const s = 40;
  // Front face
  ctx.strokeStyle = accent1;
  ctx.lineWidth = 2;
  ctx.strokeRect(cx - s / 2, cy - s / 2, s, s);
  // Back face
  const d = 18;
  ctx.strokeStyle = accent2;
  ctx.strokeRect(cx - s / 2 + d, cy - s / 2 - d, s, s);
  // Connections
  ctx.strokeStyle = accent1;
  ctx.lineWidth = 1;
  [[cx - s / 2, cy - s / 2], [cx + s / 2, cy - s / 2], [cx + s / 2, cy + s / 2], [cx - s / 2, cy + s / 2]].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + d, y - d);
    ctx.stroke();
  });
  ctx.restore();
}

function drawSparkIcon(ctx, accent1, accent2) {
  const cx = 690, cy = 115;
  ctx.save();
  ctx.globalAlpha = 0.2;
  ctx.strokeStyle = accent2;
  ctx.lineWidth = 2;
  // Spark / lightning bolt
  ctx.beginPath();
  ctx.moveTo(cx, cy - 30);
  ctx.lineTo(cx - 10, cy);
  ctx.lineTo(cx + 5, cy);
  ctx.lineTo(cx - 5, cy + 30);
  ctx.stroke();
  // Radiating lines
  ctx.strokeStyle = accent1;
  ctx.lineWidth = 1;
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI / 4) * i;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * 20, cy + Math.sin(angle) * 20);
    ctx.lineTo(cx + Math.cos(angle) * 35, cy + Math.sin(angle) * 35);
    ctx.stroke();
  }
  ctx.restore();
}

function drawShieldIcon(ctx, accent1, accent2) {
  const cx = 690, cy = 115;
  ctx.save();
  ctx.globalAlpha = 0.2;
  ctx.strokeStyle = accent1;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy - 30);
  ctx.lineTo(cx + 25, cy - 15);
  ctx.lineTo(cx + 25, cy + 10);
  ctx.quadraticCurveTo(cx, cy + 35, cx, cy + 35);
  ctx.quadraticCurveTo(cx, cy + 35, cx - 25, cy + 10);
  ctx.lineTo(cx - 25, cy - 15);
  ctx.closePath();
  ctx.stroke();
  // Plus/cross inside
  ctx.strokeStyle = accent2;
  ctx.beginPath();
  ctx.moveTo(cx - 10, cy);
  ctx.lineTo(cx + 10, cy);
  ctx.moveTo(cx, cy - 10);
  ctx.lineTo(cx, cy + 10);
  ctx.stroke();
  ctx.restore();
}

function drawGridIcon(ctx, accent1, accent2) {
  const cx = 655, cy = 85;
  ctx.save();
  ctx.globalAlpha = 0.2;
  const cellSize = 8;
  const grid = 8;
  // Draw a mini Game of Life pattern (glider + block)
  const alive = [
    [1, 0], [2, 1], [0, 2], [1, 2], [2, 2],  // glider
    [5, 5], [6, 5], [5, 6], [6, 6],            // block
  ];
  for (let r = 0; r < grid; r++) {
    for (let c = 0; c < grid; c++) {
      const x = cx + c * cellSize;
      const y = cy + r * cellSize;
      const isAlive = alive.some(([ac, ar]) => ar === r && ac === c);
      if (isAlive) {
        ctx.fillStyle = accent2;
        ctx.fillRect(x, y, cellSize - 1, cellSize - 1);
      } else {
        ctx.strokeStyle = accent1;
        ctx.lineWidth = 0.5;
        ctx.strokeRect(x, y, cellSize - 1, cellSize - 1);
      }
    }
  }
  ctx.restore();
}

function drawDungeonIcon(ctx, accent1, accent2) {
  const cx = 670, cy = 100;
  ctx.save();
  ctx.globalAlpha = 0.2;
  // Dungeon arch
  ctx.strokeStyle = accent1;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx - 25, cy + 30);
  ctx.lineTo(cx - 25, cy - 10);
  ctx.arc(cx, cy - 10, 25, Math.PI, 0);
  ctx.lineTo(cx + 25, cy + 30);
  ctx.stroke();
  // Skull-like dots
  ctx.fillStyle = accent2;
  ctx.beginPath();
  ctx.arc(cx - 8, cy, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx + 8, cy, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawCalcIcon(ctx, accent1, accent2) {
  const cx = 665, cy = 90;
  ctx.save();
  ctx.globalAlpha = 0.2;
  // Calculator body
  ctx.strokeStyle = accent1;
  ctx.lineWidth = 2;
  ctx.strokeRect(cx, cy, 55, 70);
  // Display
  ctx.fillStyle = accent2;
  ctx.globalAlpha = 0.1;
  ctx.fillRect(cx + 5, cy + 5, 45, 18);
  ctx.globalAlpha = 0.2;
  // Buttons grid
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      ctx.fillStyle = r === 0 && c === 2 ? accent1 : accent2;
      ctx.globalAlpha = 0.15;
      ctx.fillRect(cx + 5 + c * 15, cy + 28 + r * 14, 12, 10);
    }
  }
  ctx.restore();
}

function drawWandIcon(ctx, accent1, accent2) {
  const cx = 690, cy = 115;
  ctx.save();
  ctx.globalAlpha = 0.2;
  // Wand
  ctx.strokeStyle = accent2;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx - 30, cy + 25);
  ctx.lineTo(cx + 15, cy - 20);
  ctx.stroke();
  // Sparkles at tip
  ctx.fillStyle = accent1;
  const sparkles = [[-5, -5], [8, -12], [-8, -15], [12, -3], [0, -20]];
  for (const [dx, dy] of sparkles) {
    ctx.beginPath();
    ctx.arc(cx + 15 + dx, cy - 20 + dy, 2, 0, Math.PI * 2);
    ctx.fill();
  }
  // Star
  drawStar(ctx, cx + 18, cy - 28, 8, accent2, 0.25);
  ctx.restore();
}

function drawStar(ctx, cx, cy, size, color, alpha) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const outerAngle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
    const innerAngle = outerAngle + Math.PI / 5;
    const ox = cx + size * Math.cos(outerAngle);
    const oy = cy + size * Math.sin(outerAngle);
    const ix = cx + (size * 0.4) * Math.cos(innerAngle);
    const iy = cy + (size * 0.4) * Math.sin(innerAngle);
    if (i === 0) ctx.moveTo(ox, oy);
    else ctx.lineTo(ox, oy);
    ctx.lineTo(ix, iy);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawVaultIcon(ctx, accent1, accent2) {
  const cx = 680, cy = 110;
  ctx.save();
  ctx.globalAlpha = 0.2;
  // Vault door circle
  ctx.strokeStyle = accent1;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, 30, 0, Math.PI * 2);
  ctx.stroke();
  // Inner circle
  ctx.beginPath();
  ctx.arc(cx, cy, 18, 0, Math.PI * 2);
  ctx.stroke();
  // Handle spokes
  ctx.strokeStyle = accent2;
  ctx.lineWidth = 2;
  for (let i = 0; i < 4; i++) {
    const angle = (Math.PI / 2) * i + Math.PI / 4;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * 8, cy + Math.sin(angle) * 8);
    ctx.lineTo(cx + Math.cos(angle) * 18, cy + Math.sin(angle) * 18);
    ctx.stroke();
  }
  // Lock keyhole
  ctx.fillStyle = accent2;
  ctx.beginPath();
  ctx.arc(cx, cy, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawRadarIcon(ctx, accent1, accent2) {
  const cx = 685, cy = 110;
  ctx.save();
  ctx.globalAlpha = 0.2;
  // Radar circles
  ctx.strokeStyle = accent1;
  ctx.lineWidth = 1;
  for (let r = 10; r <= 35; r += 12) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  // Cross lines
  ctx.beginPath();
  ctx.moveTo(cx - 35, cy);
  ctx.lineTo(cx + 35, cy);
  ctx.moveTo(cx, cy - 35);
  ctx.lineTo(cx, cy + 35);
  ctx.stroke();
  // Sweep line
  ctx.strokeStyle = accent2;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + 30, cy - 18);
  ctx.stroke();
  // Blips
  ctx.fillStyle = accent2;
  ctx.beginPath();
  ctx.arc(cx + 15, cy - 8, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx - 10, cy + 18, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawPawIcon(ctx, accent1, accent2) {
  const cx = 685, cy = 110;
  ctx.save();
  ctx.globalAlpha = 0.2;
  ctx.fillStyle = accent2;
  // Main pad
  ctx.beginPath();
  ctx.ellipse(cx, cy + 8, 14, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  // Toe pads
  const toes = [[-12, -8], [-4, -16], [4, -16], [12, -8]];
  for (const [dx, dy] of toes) {
    ctx.beginPath();
    ctx.ellipse(cx + dx, cy + dy, 5, 6, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  // Heart above paw
  ctx.fillStyle = accent1;
  ctx.beginPath();
  ctx.arc(cx - 5, cy - 30, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx + 5, cy - 30, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx - 10, cy - 28);
  ctx.lineTo(cx, cy - 18);
  ctx.lineTo(cx + 10, cy - 28);
  ctx.fill();
  ctx.restore();
}

function drawChartIcon(ctx, accent1, accent2) {
  const cx = 655, cy = 85;
  ctx.save();
  ctx.globalAlpha = 0.2;
  // Axes
  ctx.strokeStyle = accent1;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx, cy + 60);
  ctx.lineTo(cx + 80, cy + 60);
  ctx.stroke();
  // Bars
  const bars = [15, 35, 25, 50, 40];
  ctx.fillStyle = accent2;
  for (let i = 0; i < bars.length; i++) {
    ctx.globalAlpha = 0.15 + i * 0.02;
    ctx.fillRect(cx + 8 + i * 14, cy + 60 - bars[i], 10, bars[i]);
  }
  // Trend line
  ctx.globalAlpha = 0.2;
  ctx.strokeStyle = accent1;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx + 13, cy + 60 - 15);
  ctx.lineTo(cx + 27, cy + 60 - 35);
  ctx.lineTo(cx + 41, cy + 60 - 25);
  ctx.lineTo(cx + 55, cy + 60 - 50);
  ctx.lineTo(cx + 69, cy + 60 - 40);
  ctx.stroke();
  ctx.restore();
}

function drawLogIcon(ctx, accent1, accent2) {
  const cx = 660, cy = 90;
  ctx.save();
  ctx.globalAlpha = 0.2;
  // Log file lines
  ctx.font = '10px monospace';
  const lines = [
    { text: '[INFO]  Module loaded', color: accent1 },
    { text: '[DEBUG] Pipeline init', color: accent2 },
    { text: '[INFO]  Build success', color: accent1 },
    { text: '[WARN]  Cache miss', color: accent2 },
    { text: '{ "level": "info" }', color: accent1 },
  ];
  for (let i = 0; i < lines.length; i++) {
    ctx.fillStyle = lines[i].color;
    ctx.globalAlpha = 0.15;
    ctx.fillText(lines[i].text, cx, cy + i * 14);
  }
  ctx.restore();
}

// --- Seeded PRNG (Mulberry32) for deterministic randomness ---

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return Math.abs(hash);
}

// --- Title text drawing with word wrap ---

function drawTitle(ctx, title, accent1, accent2) {
  ctx.save();

  // Measure and potentially split into lines
  const maxWidth = WIDTH - 100;
  ctx.font = 'bold 36px Arial, sans-serif';

  // Check if title fits in one line
  const metrics = ctx.measureText(title);
  let lines;
  if (metrics.width <= maxWidth) {
    lines = [title];
  } else {
    // Split title into two lines
    const words = title.split(' ');
    const mid = Math.ceil(words.length / 2);
    lines = [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
  }

  const lineHeight = 44;
  const startY = HEIGHT / 2 - ((lines.length - 1) * lineHeight) / 2 + 20;

  for (let i = 0; i < lines.length; i++) {
    const y = startY + i * lineHeight;
    const x = 50;

    // Text shadow
    ctx.fillStyle = '#00000080';
    ctx.fillText(lines[i], x + 2, y + 2);

    // Main text with gradient
    const textGrad = ctx.createLinearGradient(x, y - 30, x + 400, y);
    textGrad.addColorStop(0, '#FFFFFF');
    textGrad.addColorStop(1, '#E2E8F0');
    ctx.fillStyle = textGrad;
    ctx.fillText(lines[i], x, y);
  }

  // Category tag below title
  const tagY = startY + lines.length * lineHeight + 10;
  ctx.font = '14px Arial, sans-serif';
  ctx.fillStyle = accent1;
  ctx.globalAlpha = 0.6;

  // Small accent line before tag
  ctx.fillRect(50, tagY - 5, 30, 2);
  ctx.fillStyle = accent2;
  ctx.globalAlpha = 0.5;
  ctx.fillText('MARCUS DALEY', 90, tagY);

  ctx.restore();
}

// --- Main generator ---

function generateThumbnail(project) {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');
  const theme = CATEGORY_THEMES[project.category];
  const seed = hashString(project.slug);

  // 1. Gradient background
  drawGradientBackground(ctx, theme.bgFrom, theme.bgTo);

  // 2. Subtle noise texture
  drawSubtleNoise(ctx, 0.02);

  // 3. Ambient glow orbs
  const rng = mulberry32(seed + 100);
  drawGlowOrb(ctx, rng() * WIDTH * 0.6 + WIDTH * 0.2, rng() * HEIGHT * 0.4 + 50, 180, theme.accent1, 0.06);
  drawGlowOrb(ctx, rng() * WIDTH * 0.5 + WIDTH * 0.3, rng() * HEIGHT * 0.4 + HEIGHT * 0.4, 120, theme.accent2, 0.04);

  // 4. Category-specific background pattern
  switch (theme.motif) {
    case 'gamepad':
      drawGameMotif(ctx, theme.accent1, theme.accent2, seed);
      break;
    case 'pipeline':
      drawEngineMotif(ctx, theme.accent1, theme.accent2, seed);
      break;
    case 'gear':
      drawToolMotif(ctx, theme.accent1, theme.accent2, seed);
      break;
    case 'neural':
      drawNeuralMotif(ctx, theme.accent1, theme.accent2, seed);
      break;
  }

  // 5. Project-specific icon in top-right area
  drawProjectIcon(ctx, project.icon, theme.accent1, theme.accent2);

  // 6. Title and attribution
  drawTitle(ctx, project.title, theme.accent1, theme.accent2);

  // 7. Accent bar and glass border
  drawAccentBar(ctx, theme.accent1, theme.accent2);
  drawGlassBorder(ctx, theme.accent1);

  // 8. Top-left category badge
  ctx.save();
  ctx.font = 'bold 11px Arial, sans-serif';
  const catLabel = project.category.toUpperCase().replace('-', ' ');
  const badgeWidth = ctx.measureText(catLabel).width + 20;
  ctx.fillStyle = `${theme.accent1}30`;
  ctx.beginPath();
  ctx.roundRect(20, 20, badgeWidth, 26, 4);
  ctx.fill();
  ctx.strokeStyle = `${theme.accent1}50`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(20, 20, badgeWidth, 26, 4);
  ctx.stroke();
  ctx.fillStyle = theme.accent1;
  ctx.globalAlpha = 0.8;
  ctx.fillText(catLabel, 30, 38);
  ctx.restore();

  return canvas;
}

// --- Main execution ---

async function main() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`Generating ${PROJECTS.length} thumbnails to ${OUTPUT_DIR}\n`);

  for (const project of PROJECTS) {
    const canvas = generateThumbnail(project);
    const buffer = canvas.toBuffer('image/png');

    // Write as .webp — canvas doesn't support webp natively on all platforms,
    // so we write PNG and rename to .webp. For true webp, use sharp in postprocessing.
    // However, browsers handle PNG-in-.webp-extension fine, and Next.js Image optimizes anyway.
    // Better approach: output as PNG, then convert if sharp is available.
    const outputPath = path.join(OUTPUT_DIR, `${project.slug}.webp`);
    fs.writeFileSync(outputPath, buffer);
    console.log(`  [OK] ${project.slug}.webp (${Math.round(buffer.length / 1024)}KB)`);
  }

  console.log(`\nDone! Generated ${PROJECTS.length} thumbnails.`);
}

main().catch((err) => {
  console.error('Failed to generate thumbnails:', err);
  process.exit(1);
});
