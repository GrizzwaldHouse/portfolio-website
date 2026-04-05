'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

// Conway's Game of Life — web port of Marcus's C++ wxWidgets implementation
// Original: d:\FSO\conway-s-game-of-life-05-24-GrizzwaldHouse-main

const CELL_SIZE = 14;
const DEFAULT_GRID = 40;

/**
 * Creates a size x size 2D boolean grid.
 *
 * @param size   - Number of rows and columns.
 * @param random - When true, each cell has a 30% chance of starting alive;
 *                 when false (default), all cells start dead.
 * @returns A 2D boolean array where `true` = alive.
 */
function createGrid(size: number, random = false): boolean[][] {
    return Array.from({ length: size }, () =>
        Array.from({ length: size }, () => (random ? Math.random() < 0.3 : false))
    );
}

/**
 * Counts the living neighbors of a cell at (row, col).
 *
 * When `toroidal` is true, the grid wraps around (modular arithmetic)
 * so the top edge connects to the bottom and left to right — forming a
 * torus. When false, out-of-bounds neighbors are simply ignored.
 *
 * @returns A count from 0 to 8.
 */
function countNeighbors(
    grid: boolean[][],
    row: number,
    col: number,
    toroidal: boolean
): number {
    const size = grid.length;
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            let r = row + i;
            let c = col + j;
            if (toroidal) {
                r = (r + size) % size;
                c = (c + size) % size;
            } else if (r < 0 || r >= size || c < 0 || c >= size) {
                continue;
            }
            if (grid[r][c]) count++;
        }
    }
    return count;
}

/**
 * Computes the next generation of the grid using Conway's rules:
 * - A live cell with 2 or 3 neighbors survives; otherwise it dies.
 * - A dead cell with exactly 3 neighbors becomes alive.
 *
 * @returns An object with the new grid and the total living cell count.
 */
function nextGeneration(grid: boolean[][], toroidal: boolean): { grid: boolean[][]; living: number } {
    const size = grid.length;
    let living = 0;
    const next = grid.map((row, r) =>
        row.map((cell, c) => {
            const neighbors = countNeighbors(grid, r, c, toroidal);
            const alive = cell ? neighbors === 2 || neighbors === 3 : neighbors === 3;
            if (alive) living++;
            return alive;
        })
    );
    return { grid: next, living };
}

/**
 * Interactive Conway's Game of Life rendered on an HTML canvas.
 *
 * Web port of Marcus's C++ wxWidgets implementation. Features:
 * - Play/pause/step controls with configurable speed (20-500ms interval)
 * - Click-to-toggle cells on the canvas
 * - Toroidal or finite grid boundary modes
 * - Optional neighbor count overlay
 * - Adjustable grid sizes (20x20 to 60x60)
 *
 * Rendering uses a canvas 2D context (not React DOM) for performance.
 * The game loop runs via setInterval inside a useEffect, reading refs
 * to avoid stale closures on grid/speed state.
 */
export default function GameOfLife() {
    const [gridSize, setGridSize] = useState(DEFAULT_GRID);
    const [grid, setGrid] = useState(() => createGrid(DEFAULT_GRID));
    const [running, setRunning] = useState(false);
    const [generation, setGeneration] = useState(0);
    const [livingCells, setLivingCells] = useState(0);
    const [toroidal, setToroidal] = useState(false);
    const [showNeighbors, setShowNeighbors] = useState(false);
    const [speed, setSpeed] = useState(100);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const runningRef = useRef(running);
    const gridRef = useRef(grid);
    const toroidalRef = useRef(toroidal);
    const speedRef = useRef(speed);

    useEffect(() => {
        runningRef.current = running;
        gridRef.current = grid;
        toroidalRef.current = toroidal;
        speedRef.current = speed;
    });

    // Draw the grid on canvas
    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const g = gridRef.current;
        const size = g.length;
        const w = size * CELL_SIZE;
        canvas.width = w;
        canvas.height = w;

        // Background
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, w, w);

        // Cells
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (g[r][c]) {
                    ctx.fillStyle = '#FFCC00';
                    ctx.fillRect(c * CELL_SIZE + 1, r * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
                }
                // Neighbor count display
                if (showNeighbors) {
                    const n = countNeighbors(g, r, c, toroidalRef.current);
                    if (n > 0) {
                        ctx.fillStyle = g[r][c] ? '#0f172a' : 'rgba(255,255,255,0.35)';
                        ctx.font = '9px monospace';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(
                            String(n),
                            c * CELL_SIZE + CELL_SIZE / 2,
                            r * CELL_SIZE + CELL_SIZE / 2
                        );
                    }
                }
            }
        }

        // Grid lines
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth = 0.5;
        for (let i = 0; i <= size; i++) {
            ctx.beginPath();
            ctx.moveTo(i * CELL_SIZE, 0);
            ctx.lineTo(i * CELL_SIZE, w);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, i * CELL_SIZE);
            ctx.lineTo(w, i * CELL_SIZE);
            ctx.stroke();
        }
    }, [showNeighbors]);

    useEffect(() => {
        draw();
    }, [grid, showNeighbors, draw]);

    // Game loop — uses useEffect + setInterval to avoid self-referencing useCallback
    useEffect(() => {
        if (!running) return;
        const id = setInterval(() => {
            const { grid: next, living } = nextGeneration(gridRef.current, toroidalRef.current);
            setGrid(next);
            setGeneration((g) => g + 1);
            setLivingCells(living);
        }, speedRef.current);
        return () => clearInterval(id);
    }, [running]);

    const handlePlay = () => {
        setRunning(true);
        runningRef.current = true;
    };

    const handlePause = () => {
        setRunning(false);
    };

    const handleStep = () => {
        const { grid: next, living } = nextGeneration(grid, toroidal);
        setGrid(next);
        setGeneration((g) => g + 1);
        setLivingCells(living);
    };

    const handleClear = () => {
        setRunning(false);
        setGrid(createGrid(gridSize));
        setGeneration(0);
        setLivingCells(0);
    };

    const handleRandomize = () => {
        const g = createGrid(gridSize, true);
        setGrid(g);
        setGeneration(0);
        const living = g.flat().filter(Boolean).length;
        setLivingCells(living);
    };

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const col = Math.floor(((e.clientX - rect.left) * scaleX) / CELL_SIZE);
        const row = Math.floor(((e.clientY - rect.top) * scaleY) / CELL_SIZE);
        if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
            const newGrid = grid.map((r) => [...r]);
            newGrid[row][col] = !newGrid[row][col];
            setGrid(newGrid);
            setLivingCells((prev) => prev + (newGrid[row][col] ? 1 : -1));
        }
    };

    const handleGridSizeChange = (newSize: number) => {
        setRunning(false);
        setGridSize(newSize);
        setGrid(createGrid(newSize));
        setGeneration(0);
        setLivingCells(0);
    };

    return (
        <div className="w-full" id="game-of-life-demo">
            {/* Controls */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
                <button
                    onClick={running ? handlePause : handlePlay}
                    className="px-4 py-2 bg-gradient-to-r from-[#FFCC00] to-[#D50032] text-slate-900 font-bold rounded-lg text-sm hover:scale-105 transition-transform"
                    id="gol-play-pause"
                >
                    {running ? '⏸ Pause' : '▶ Play'}
                </button>
                <button
                    onClick={handleStep}
                    disabled={running}
                    className="px-4 py-2 bg-slate-700 text-gray-200 rounded-lg text-sm hover:bg-slate-600 disabled:opacity-40 transition"
                    id="gol-step"
                >
                    ⏭ Step
                </button>
                <button
                    onClick={handleRandomize}
                    className="px-4 py-2 bg-slate-700 text-gray-200 rounded-lg text-sm hover:bg-slate-600 transition"
                    id="gol-randomize"
                >
                    🎲 Randomize
                </button>
                <button
                    onClick={handleClear}
                    className="px-4 py-2 bg-slate-700 text-gray-200 rounded-lg text-sm hover:bg-slate-600 transition"
                    id="gol-clear"
                >
                    🗑 Clear
                </button>
                <button
                    onClick={() => setToroidal(!toroidal)}
                    className={`px-4 py-2 rounded-lg text-sm transition ${toroidal ? 'bg-[#FFCC00]/20 text-[#FFCC00] border border-[#FFCC00]/40' : 'bg-slate-700 text-gray-200'}`}
                    id="gol-toroidal"
                >
                    {toroidal ? '🔄 Toroidal' : '⬜ Finite'}
                </button>
                <button
                    onClick={() => setShowNeighbors(!showNeighbors)}
                    className={`px-4 py-2 rounded-lg text-sm transition ${showNeighbors ? 'bg-[#FFCC00]/20 text-[#FFCC00] border border-[#FFCC00]/40' : 'bg-slate-700 text-gray-200'}`}
                    id="gol-neighbors"
                >
                    {showNeighbors ? '#⃣ Counts On' : '#⃣ Counts Off'}
                </button>
            </div>

            {/* Settings row */}
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-300">
                <label className="flex items-center gap-2">
                    Grid:
                    <select
                        value={gridSize}
                        onChange={(e) => handleGridSizeChange(Number(e.target.value))}
                        className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-gray-200"
                        id="gol-grid-size"
                    >
                        {[20, 30, 40, 50, 60].map((s) => (
                            <option key={s} value={s}>{s}×{s}</option>
                        ))}
                    </select>
                </label>
                <label className="flex items-center gap-2">
                    Speed:
                    <input
                        type="range"
                        min={20}
                        max={500}
                        step={10}
                        value={speed}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                        className="w-24 accent-[#FFCC00]"
                        id="gol-speed"
                    />
                    <span className="text-xs text-gray-500">{speed}ms</span>
                </label>
            </div>

            {/* Status bar */}
            <div className="flex gap-6 mb-3 text-sm font-mono">
                <span className="text-gray-400">
                    Generation: <span className="text-[#FFCC00] font-bold">{generation}</span>
                </span>
                <span className="text-gray-400">
                    Living Cells: <span className="text-[#FFCC00] font-bold">{livingCells}</span>
                </span>
            </div>

            {/* Canvas */}
            <div className="overflow-auto rounded-xl border border-slate-700 bg-slate-900/50 max-h-[600px]">
                <canvas
                    ref={canvasRef}
                    onClick={handleCanvasClick}
                    className="cursor-crosshair"
                    style={{ imageRendering: 'pixelated' }}
                    id="gol-canvas"
                />
            </div>

            <p className="text-xs text-gray-500 mt-3">
                Click cells to toggle. Use controls to play, pause, step, or randomize the simulation.
            </p>
        </div>
    );
}
