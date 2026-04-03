// LearningModal.tsx
// Developer: Marcus Daley
// Date: 2026-04-03
// Purpose: Learning question modal — gates pet actions behind educational content.
//          Teaches service dog knowledge as part of the gameplay loop. Displays multiple
//          choice questions with category labels and immediate feedback.

'use client';

import { LearningQuestion } from '@/types/pet';

interface LearningModalProps {
  question: LearningQuestion;
  onAnswer: (answerIndex: number) => void;
}

export default function LearningModal({ question, onAnswer }: LearningModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-800 border border-slate-600 rounded-2xl p-6 max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-[#FFCC00]/20 rounded-lg flex items-center justify-center">
            <span className="text-[#FFCC00] text-sm font-bold">?</span>
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">Learning Challenge</h3>
            <p className="text-gray-400 text-xs capitalize">
              {question.category.replace(/_/g, ' ')}
            </p>
          </div>
        </div>

        {/* Question */}
        <p className="text-gray-200 text-sm mb-4 leading-relaxed">
          {question.question}
        </p>

        {/* Options */}
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswer(index)}
              className="w-full text-left px-4 py-3 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 hover:border-[#FFCC00]/50 rounded-xl text-sm text-gray-300 hover:text-white transition-all duration-200"
            >
              <span className="text-[#FFCC00] font-mono mr-2">
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
            </button>
          ))}
        </div>

        {/* Hint */}
        <p className="text-gray-500 text-xs mt-4 text-center">
          Answer correctly to perform the action and earn XP
        </p>
      </div>
    </div>
  );
}
