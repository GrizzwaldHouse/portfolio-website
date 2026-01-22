// src/components/demos/runtimes/TerminalRuntime.tsx
// Interactive terminal emulator for CLI project demonstrations

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import type { Project } from '@/data/projects';

interface TerminalRuntimeProps {
  project: Project;
  onReady: () => void;
  onError: (error: string) => void;
}

interface TerminalLine {
  id: number;
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
}

// Command handlers for different projects
const createCommandHandler = (project: Project) => {
  const config = project.runtime.config as {
    shell?: string;
    welcomeMessage?: string;
    prompt?: string;
    commands?: string[];
  } | undefined;

  const availableCommands = config?.commands || ['help'];

  // Base commands available to all terminals
  const baseCommands: Record<string, (args: string[]) => string[]> = {
    help: () => [
      'Available commands:',
      ...availableCommands.map(cmd => `  ${cmd}`),
      '',
      'Type a command to see a simulated response.',
    ],
    clear: () => [],
    about: () => [
      `Project: ${project.title}`,
      `Description: ${project.description}`,
      '',
      `Technologies: ${project.tech.join(', ')}`,
    ],
  };

  // Project-specific command simulations
  const projectCommands: Record<string, Record<string, (args: string[]) => string[]>> = {
    'unrealmcp': {
      'mcp.spawn': (args) => [
        `[MCP] Spawning actor...`,
        `  Class: ${args[0] || 'StaticMeshActor'}`,
        `  Location: (0, 0, 0)`,
        `  Rotation: (0, 0, 0)`,
        `[MCP] Actor spawned successfully: Actor_${Math.floor(Math.random() * 1000)}`,
      ],
      'mcp.modify': (args) => [
        `[MCP] Modifying actor properties...`,
        `  Target: ${args[0] || 'SelectedActor'}`,
        `  Property: ${args[1] || 'Location'}`,
        `  Value: ${args[2] || '(100, 200, 0)'}`,
        `[MCP] Property updated successfully`,
      ],
      'mcp.query': (args) => [
        `[MCP] Querying scene...`,
        `  Filter: ${args[0] || 'All'}`,
        ``,
        `Found 12 actors:`,
        `  - StaticMeshActor_1 (Cube)`,
        `  - StaticMeshActor_2 (Sphere)`,
        `  - PointLight_1`,
        `  - DirectionalLight_1`,
        `  - PlayerStart`,
        `  ... and 7 more`,
      ],
      'mcp.list': () => [
        'Available MCP commands:',
        '  mcp.spawn <class> - Spawn a new actor',
        '  mcp.modify <actor> <prop> <value> - Modify actor property',
        '  mcp.query [filter] - Query scene actors',
        '  mcp.delete <actor> - Delete an actor',
      ],
    },
    'spaghetti-relay': {
      connect: (args) => [
        `Connecting to server...`,
        `Server: ${args[0] || 'localhost:8080'}`,
        `Connection established.`,
        ``,
        `Welcome to SPAGHETTI_RELAY`,
        `Type 'login <username> <password>' or 'register <username> <password>'`,
      ],
      login: (args) => {
        if (args.length < 2) {
          return ['Usage: login <username> <password>'];
        }
        return [
          `Authenticating ${args[0]}...`,
          `Login successful!`,
          ``,
          `Welcome back, ${args[0]}!`,
          `You have 3 unread messages.`,
        ];
      },
      register: (args) => {
        if (args.length < 2) {
          return ['Usage: register <username> <password>'];
        }
        return [
          `Creating account for ${args[0]}...`,
          `Account created successfully!`,
          `You can now login with: login ${args[0]} <password>`,
        ];
      },
      send: (args) => [
        `[PUBLIC] You: ${args.join(' ') || 'Hello, world!'}`,
        `Message sent to 5 users.`,
      ],
      whisper: (args) => {
        if (args.length < 2) {
          return ['Usage: whisper <username> <message>'];
        }
        return [
          `[PRIVATE to ${args[0]}] You: ${args.slice(1).join(' ')}`,
          `Private message sent.`,
        ];
      },
      users: () => [
        'Online users (5):',
        '  * Marcus (you)',
        '  * Alice',
        '  * Bob',
        '  * Charlie',
        '  * Guest_123',
      ],
      rooms: () => [
        'Available rooms:',
        '  #general (5 users)',
        '  #random (2 users)',
        '  #dev (3 users)',
      ],
      quit: () => [
        'Disconnecting from server...',
        'Goodbye!',
      ],
    },
  };

  return (input: string): string[] => {
    const [command, ...args] = input.trim().toLowerCase().split(/\s+/);

    if (!command) return [];

    // Check base commands first
    if (baseCommands[command]) {
      return baseCommands[command](args);
    }

    // Check project-specific commands
    const projectCmds = projectCommands[project.slug];
    if (projectCmds?.[command]) {
      return projectCmds[command](args);
    }

    // Unknown command
    return [
      `Command not found: ${command}`,
      `Type 'help' for available commands.`,
    ];
  };
};

export function TerminalRuntime({ project, onReady, onError }: TerminalRuntimeProps) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const lineIdRef = useRef(0);

  const config = project.runtime.config as {
    shell?: string;
    welcomeMessage?: string;
    prompt?: string;
    commands?: string[];
  } | undefined;

  const prompt = config?.prompt || '$ ';
  const welcomeMessage = config?.welcomeMessage || `${project.title} Terminal`;
  const executeCommand = useCallback(createCommandHandler(project), [project]);

  // Initialize terminal
  useEffect(() => {
    const initialLines: TerminalLine[] = [
      { id: lineIdRef.current++, type: 'system', content: welcomeMessage },
      { id: lineIdRef.current++, type: 'system', content: "Type 'help' for available commands." },
      { id: lineIdRef.current++, type: 'system', content: '' },
    ];
    setLines(initialLines);
    onReady();
  }, [welcomeMessage, onReady]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input on click
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const addLine = (type: TerminalLine['type'], content: string) => {
    setLines(prev => [...prev, { id: lineIdRef.current++, type, content }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentInput.trim()) return;

    // Add input line
    addLine('input', `${prompt}${currentInput}`);

    // Handle clear command specially
    if (currentInput.trim().toLowerCase() === 'clear') {
      setLines([]);
      setCurrentInput('');
      return;
    }

    // Execute command and add output
    const output = executeCommand(currentInput);
    output.forEach(line => addLine('output', line));

    // Update history
    setCommandHistory(prev => [...prev, currentInput]);
    setHistoryIndex(-1);
    setCurrentInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(newIndex);
      if (newIndex >= 0) {
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      if (newIndex >= 0) {
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else {
        setCurrentInput('');
      }
    }
  };

  return (
    <div
      ref={terminalRef}
      onClick={handleTerminalClick}
      className="bg-slate-950 text-green-400 font-mono text-sm p-4 h-[400px] overflow-y-auto cursor-text"
    >
      {/* Terminal lines */}
      {lines.map(line => (
        <div
          key={line.id}
          className={`whitespace-pre-wrap ${
            line.type === 'input' ? 'text-white' :
            line.type === 'error' ? 'text-red-400' :
            line.type === 'system' ? 'text-blue-400' :
            'text-green-400'
          }`}
        >
          {line.content}
        </div>
      ))}

      {/* Input line */}
      <form onSubmit={handleSubmit} className="flex items-center">
        <span className="text-white">{prompt}</span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={e => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-white outline-none caret-green-400"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>

      {/* Blinking cursor effect */}
      <style jsx>{`
        input {
          caret-color: #4ade80;
        }
        input::placeholder {
          color: transparent;
        }
      `}</style>
    </div>
  );
}

export default TerminalRuntime;
