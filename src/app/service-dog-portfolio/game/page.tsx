'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Dog, CheckCircle, XCircle, Trophy, RotateCcw, Sparkles } from 'lucide-react';

type Question = {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

const questions: Question[] = [
  {
    question: 'What is the primary role of a Guide Dog?',
    options: [
      'Detecting medical emergencies',
      'Assisting visually impaired individuals',
      'Providing emotional support',
      'Alerting to sounds',
    ],
    correct: 1,
    explanation: 'Guide dogs help visually impaired individuals navigate safely, avoiding obstacles and hazards.',
  },
  {
    question: 'How many hours of training does a service dog typically receive?',
    options: ['50-100 hours', '100-200 hours', '300-500 hours', '500+ hours'],
    correct: 3,
    explanation: 'Service dogs undergo 500+ hours of rigorous, specialized training to perform their duties reliably.',
  },
  {
    question: 'Which law protects service dogs\' right to access public places?',
    options: ['HIPAA', 'ADA (Americans with Disabilities Act)', 'OSHA', 'FDA'],
    correct: 1,
    explanation: 'The ADA grants service dogs legal access to all public areas where their handlers go.',
  },
  {
    question: 'What type of service dog alerts their handler to sounds?',
    options: ['Guide Dog', 'Mobility Dog', 'Hearing Dog', 'Psychiatric Service Dog'],
    correct: 2,
    explanation: 'Hearing dogs alert deaf or hard-of-hearing individuals to important sounds like alarms, doorbells, or their name.',
  },
  {
    question: 'At what age do service dogs typically begin their training?',
    options: ['8-12 weeks', '6-12 months', '1-2 years', '3-4 years'],
    correct: 0,
    explanation: 'Service dogs start basic training as puppies (8-12 weeks) and continue advanced training as they mature.',
  },
];

export default function ServiceDogGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const handleAnswer = (index: number) => {
    if (showResult) return;

    setSelectedAnswer(index);
    const isCorrect = index === questions[currentQuestion].correct;

    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswers([...answers, isCorrect]);
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameComplete(true);
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setGameComplete(false);
    setAnswers([]);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return { emoji: '🏆', text: 'Perfect Score!', color: 'text-yellow-400' };
    if (percentage >= 80) return { emoji: '🌟', text: 'Excellent!', color: 'text-emerald-400' };
    if (percentage >= 60) return { emoji: '👍', text: 'Good Job!', color: 'text-blue-400' };
    if (percentage >= 40) return { emoji: '📚', text: 'Keep Learning!', color: 'text-amber-400' };
    return { emoji: '💪', text: 'Try Again!', color: 'text-orange-400' };
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-amber-950/10 to-slate-900 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-20">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link
              href="/service-dog-portfolio"
              className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-amber-400">
                <Dog className="w-5 h-5" />
                <span className="font-semibold">Knowledge Quiz</span>
              </div>
              {!gameComplete && (
                <div className="px-3 py-1 bg-slate-800/50 rounded-full text-sm text-gray-400">
                  {currentQuestion + 1} / {questions.length}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Game Container */}
        <main className="py-12 px-6">
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              {gameComplete ? (
                <motion.div
                  key="complete"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-white/10 p-8 text-center"
                >
                  <div className="text-7xl mb-6">{getScoreMessage().emoji}</div>
                  <h2 className={`text-3xl font-bold mb-2 ${getScoreMessage().color}`}>
                    {getScoreMessage().text}
                  </h2>
                  <p className="text-gray-400 mb-8">
                    You scored <span className="text-white font-bold">{score}</span> out of{' '}
                    <span className="text-white font-bold">{questions.length}</span>
                  </p>

                  {/* Score breakdown */}
                  <div className="flex justify-center gap-2 mb-8">
                    {answers.map((correct, i) => (
                      <div
                        key={i}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          correct ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {correct ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4 justify-center">
                    <motion.button
                      onClick={restartGame}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl"
                    >
                      <RotateCcw className="w-5 h-5" />
                      Play Again
                    </motion.button>
                    <Link href="/service-dog-portfolio">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-slate-700 text-white font-medium rounded-xl"
                      >
                        Back to Info
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden"
                >
                  {/* Progress bar */}
                  <div className="h-1 bg-slate-700">
                    <motion.div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Question */}
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <Sparkles className="w-6 h-6 text-amber-400" />
                      <span className="text-amber-400 font-medium">Question {currentQuestion + 1}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-8">
                      {questions[currentQuestion].question}
                    </h2>

                    {/* Options */}
                    <div className="space-y-3">
                      {questions[currentQuestion].options.map((option, index) => {
                        const isSelected = selectedAnswer === index;
                        const isCorrect = index === questions[currentQuestion].correct;
                        const showCorrect = showResult && isCorrect;
                        const showWrong = showResult && isSelected && !isCorrect;

                        return (
                          <motion.button
                            key={index}
                            onClick={() => handleAnswer(index)}
                            whileHover={!showResult ? { scale: 1.02 } : {}}
                            whileTap={!showResult ? { scale: 0.98 } : {}}
                            disabled={showResult}
                            className={`w-full text-left p-4 rounded-xl border transition-all ${
                              showCorrect
                                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                                : showWrong
                                ? 'bg-red-500/20 border-red-500 text-red-300'
                                : isSelected
                                ? 'bg-amber-500/20 border-amber-500 text-white'
                                : 'bg-slate-700/30 border-slate-600/30 text-gray-300 hover:border-amber-500/50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                  showCorrect
                                    ? 'bg-emerald-500/30'
                                    : showWrong
                                    ? 'bg-red-500/30'
                                    : 'bg-slate-600/50'
                                }`}
                              >
                                {String.fromCharCode(65 + index)}
                              </span>
                              <span>{option}</span>
                              {showCorrect && <CheckCircle className="w-5 h-5 ml-auto" />}
                              {showWrong && <XCircle className="w-5 h-5 ml-auto" />}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {showResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 bg-slate-700/30 rounded-xl border border-white/5"
                      >
                        <p className="text-gray-400 text-sm">
                          <span className="text-amber-400 font-medium">Explanation:</span>{' '}
                          {questions[currentQuestion].explanation}
                        </p>
                      </motion.div>
                    )}

                    {/* Next button */}
                    {showResult && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-6"
                      >
                        <motion.button
                          onClick={nextQuestion}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl"
                        >
                          {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
                        </motion.button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
