// ChatTerminal.tsx
// Developer: Marcus Daley
// Date: 2026-04-03
// Purpose: Terminal-style UI for the SPAGHETTI_RELAY chat server demo. Renders a
//          retro terminal with command input, message display, color-coded output,
//          and a protocol visualizer showing the TCP message framing in real-time.

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ChatServer } from '@/systems/chat/ChatServer';

interface ChatMessage {
  timestamp: string;
  sender: string;
  content: string;
  type: 'system' | 'chat' | 'private' | 'error' | 'command' | 'info';
}

const TYPE_COLORS: Record<string, string> = {
  system: 'text-cyan-400',
  chat: 'text-gray-200',
  private: 'text-purple-400',
  error: 'text-red-400',
  command: 'text-yellow-400',
  info: 'text-green-400',
};

const SENDER_COLORS: Record<string, string> = {
  SERVER: 'text-cyan-500',
  NavyVet_Mike: 'text-blue-400',
  PixelPusher: 'text-pink-400',
  CodeWizard: 'text-emerald-400',
  guest: 'text-yellow-400',
  admin: 'text-red-400',
};

export default function ChatTerminal() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lastFrame, setLastFrame] = useState<string | null>(null);
  const serverRef = useRef<ChatServer | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleMessage = useCallback((message: ChatMessage) => {
    setMessages((prev) => [...prev.slice(-200), message]);

    // Show protocol frame visualization
    const frameLen = message.content.length;
    const hex = frameLen.toString(16).padStart(2, '0').toUpperCase();
    setLastFrame(`[0x${hex}][${frameLen} bytes] → ${message.content.substring(0, 40)}${message.content.length > 40 ? '...' : ''}`);
  }, []);

  useEffect(() => {
    const server = new ChatServer(handleMessage);
    serverRef.current = server;
    server.initialize();

    return () => {
      server.destroy();
    };
  }, [handleMessage]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !serverRef.current) return;

    setCommandHistory((prev) => [...prev.slice(-50), input]);
    setHistoryIndex(-1);
    serverRef.current.processInput(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = historyIndex + 1;
      if (newIndex < commandHistory.length) {
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = historyIndex - 1;
      if (newIndex >= 0) {
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Terminal Window */}
      <div className="bg-slate-950 rounded-xl border border-slate-700/50 overflow-hidden shadow-2xl">
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs font-mono text-gray-400">
            SPAGHETTI_RELAY v2.0 — TCP:8080
          </span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-mono text-green-400">CONNECTED</span>
          </div>
        </div>

        {/* Message Display */}
        <div
          ref={scrollRef}
          className="h-[400px] overflow-y-auto p-4 font-mono text-sm leading-relaxed scrollbar-thin"
          onClick={() => inputRef.current?.focus()}
        >
          {messages.map((msg, i) => (
            <div key={i} className="mb-1">
              <span className="text-gray-600 text-xs mr-2">[{msg.timestamp}]</span>
              {msg.sender !== 'SERVER' && msg.type === 'chat' && (
                <span className={`${SENDER_COLORS[msg.sender] ?? 'text-gray-300'} mr-1`}>
                  {msg.sender}:
                </span>
              )}
              <span className={TYPE_COLORS[msg.type] ?? 'text-gray-300'}>
                {msg.type === 'chat' && msg.sender !== 'SERVER' ? msg.content : msg.content}
              </span>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t border-slate-700/50">
          <div className="flex items-center px-4 py-3 bg-slate-900/50">
            <span className="text-cyan-500 font-mono text-sm mr-2">{'>'}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a command or message..."
              className="flex-1 bg-transparent text-gray-200 font-mono text-sm outline-none placeholder-gray-600"
              autoFocus
              autoComplete="off"
              spellCheck={false}
            />
            <button
              type="submit"
              className="ml-2 px-3 py-1 bg-cyan-600/20 text-cyan-400 text-xs font-mono rounded border border-cyan-600/30 hover:bg-cyan-600/30 transition-colors"
            >
              SEND
            </button>
          </div>
        </form>
      </div>

      {/* Protocol Visualizer */}
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider">
            TCP Frame Monitor — Winsock2 Protocol
          </h4>
        </div>
        <div className="font-mono text-xs">
          {lastFrame ? (
            <div className="flex items-start gap-2">
              <span className="text-cyan-500">{'>>>'}</span>
              <span className="text-emerald-400">{lastFrame}</span>
            </div>
          ) : (
            <span className="text-gray-600">Awaiting transmission...</span>
          )}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Protocol:</span>
            <span className="text-cyan-400">TCP/IPv4</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Framing:</span>
            <span className="text-cyan-400">[1B len][NB data]</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Max Payload:</span>
            <span className="text-cyan-400">255 bytes</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Multiplexing:</span>
            <span className="text-cyan-400">select()</span>
          </div>
        </div>
      </div>
    </div>
  );
}
