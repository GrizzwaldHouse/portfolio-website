// TamagotchiWidget.tsx
// Developer: Marcus Daley
// Date: 2026-04-03
// Purpose: Top-level Tamagotchi widget that composes the entire pet system into a
//          floating interactive element. Renders on all pages via the root layout.
//          Toggleable via a fixed-position button in the bottom-right corner.

'use client';

import { usePetSystem } from '@/state/usePetSystem';
import PetDisplay from './PetDisplay';
import LearningModal from './LearningModal';
import { useState } from 'react';

export default function TamagotchiWidget() {
  const {
    pet,
    currentQuestion,
    isAnswering,
    lastResult,
    requestAction,
    submitAnswer,
  } = usePetSystem();

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-br from-[#FFCC00] to-[#D50032] rounded-full shadow-lg hover:shadow-[#FFCC00]/30 transition-all duration-300 flex items-center justify-center group"
        aria-label="Toggle pet companion"
      >
        <span className="text-2xl group-hover:scale-110 transition-transform">
          {pet.mood === 'happy' || pet.mood === 'excited' ? '(^_^)' : '(- -)'}
        </span>
      </button>

      {/* Expanded pet panel */}
      {isExpanded && (
        <div className="fixed bottom-24 right-6 z-40 animate-in slide-in-from-bottom-4">
          <PetDisplay
            pet={pet}
            onAction={requestAction}
            disabled={isAnswering}
          />

          {/* Result toast */}
          {lastResult && (
            <div
              className={`mt-2 p-3 rounded-lg text-sm text-center font-medium ${
                lastResult.correct
                  ? 'bg-green-600/20 text-green-300 border border-green-600/30'
                  : 'bg-red-600/20 text-red-300 border border-red-600/30'
              }`}
            >
              {lastResult.message}
            </div>
          )}
        </div>
      )}

      {/* Learning question modal */}
      {isAnswering && currentQuestion && (
        <LearningModal question={currentQuestion} onAnswer={submitAnswer} />
      )}
    </>
  );
}
