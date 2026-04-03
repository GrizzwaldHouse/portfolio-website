// PetDisplay.tsx
// Developer: Marcus Daley
// Date: 2026-04-03
// Purpose: Main Tamagotchi display component — shows the pet visual, stat bars, mood,
//          XP progress, and action buttons. Flagship interactive feature of the portfolio.

'use client';

import { PetState, PetAction, PetMood } from '@/types/pet';

interface PetDisplayProps {
  pet: PetState;
  onAction: (action: PetAction) => void;
  disabled?: boolean;
}

const MOOD_EMOJI: Record<PetMood, string> = {
  [PetMood.HAPPY]: '(^_^)',
  [PetMood.CONTENT]: '(- _ -)',
  [PetMood.HUNGRY]: '(>_<)',
  [PetMood.SAD]: '(T_T)',
  [PetMood.TIRED]: '(-_-)zzz',
  [PetMood.EXCITED]: '(*o*)',
};

const MOOD_COLORS: Record<PetMood, string> = {
  [PetMood.HAPPY]: 'text-green-400',
  [PetMood.CONTENT]: 'text-blue-400',
  [PetMood.HUNGRY]: 'text-orange-400',
  [PetMood.SAD]: 'text-purple-400',
  [PetMood.TIRED]: 'text-gray-400',
  [PetMood.EXCITED]: 'text-yellow-400',
};

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-gray-400">{label}</span>
        <span className="text-gray-300">{Math.round(value)}</span>
      </div>
      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function PetDisplay({ pet, onAction, disabled }: PetDisplayProps) {
  return (
    <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 max-w-sm w-full">
      {/* Pet Header */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-white">{pet.name}</h3>
        <p className="text-xs text-gray-400">Level {pet.level} Service Dog</p>
      </div>

      {/* Pet Visual — ASCII art placeholder for Spline 3D */}
      <div className="bg-slate-900/50 rounded-xl p-6 mb-4 text-center border border-slate-600">
        <div className={`text-4xl font-mono ${MOOD_COLORS[pet.mood]} transition-colors duration-300`}>
          {MOOD_EMOJI[pet.mood]}
        </div>
        <p className="text-xs text-gray-500 mt-2 capitalize">{pet.mood}</p>
      </div>

      {/* Stats */}
      <div className="space-y-2 mb-4">
        <StatBar label="Hunger" value={pet.hunger} color="bg-orange-500" />
        <StatBar label="Happiness" value={pet.happiness} color="bg-pink-500" />
        <StatBar label="Intelligence" value={pet.intelligence} color="bg-blue-500" />
        <StatBar label="Energy" value={pet.energy} color="bg-green-500" />
      </div>

      {/* XP Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-400">XP</span>
          <span className="text-[#FFCC00]">{pet.xp}/100</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#FFCC00] to-[#D50032] transition-all duration-500"
            style={{ width: `${pet.xp}%` }}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onAction(PetAction.FEED)}
          disabled={disabled}
          className="px-3 py-2 bg-orange-600/20 hover:bg-orange-600/40 text-orange-300 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-orange-600/30"
        >
          Feed
        </button>
        <button
          onClick={() => onAction(PetAction.PLAY)}
          disabled={disabled}
          className="px-3 py-2 bg-pink-600/20 hover:bg-pink-600/40 text-pink-300 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-pink-600/30"
        >
          Play
        </button>
        <button
          onClick={() => onAction(PetAction.TRAIN)}
          disabled={disabled}
          className="px-3 py-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-blue-600/30"
        >
          Train
        </button>
        <button
          onClick={() => onAction(PetAction.REST)}
          disabled={disabled}
          className="px-3 py-2 bg-green-600/20 hover:bg-green-600/40 text-green-300 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-green-600/30"
        >
          Rest
        </button>
      </div>
    </div>
  );
}
