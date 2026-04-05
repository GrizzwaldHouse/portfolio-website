'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Utensils, Sparkles, Moon, ArrowLeft, RefreshCw, Zap } from 'lucide-react';

type PetState = {
  happiness: number;
  hunger: number;
  energy: number;
  cleanliness: number;
  isAlive: boolean;
};

type ActionType = 'feed' | 'play' | 'clean' | 'sleep';

const StatBar = ({ label, value, color, icon }: { label: string; value: number; color: string; icon: React.ReactNode }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2 text-gray-400">
        {icon}
        <span>{label}</span>
      </div>
      <span className={`font-bold ${color}`}>{value}%</span>
    </div>
    <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${color.replace('text-', 'bg-')}`}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  </div>
);

const ActionButton = ({
  onClick,
  icon,
  label,
  color,
  disabled,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  color: string;
  disabled?: boolean;
}) => (
  <motion.button
    onClick={onClick}
    disabled={disabled}
    whileHover={{ scale: disabled ? 1 : 1.05 }}
    whileTap={{ scale: disabled ? 1 : 0.95 }}
    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all
      ${disabled
        ? 'bg-slate-800/30 border-slate-700/30 text-slate-600 cursor-not-allowed'
        : `bg-slate-800/50 border-${color}-500/30 hover:border-${color}-500 hover:shadow-lg hover:shadow-${color}-500/20 text-${color}-400`
      }`}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </motion.button>
);

export default function ServiceAnimalGame() {
  const [pet, setPet] = useState<PetState>({
    happiness: 100,
    hunger: 0,
    energy: 100,
    cleanliness: 100,
    isAlive: true,
  });
  const [gameStarted, setGameStarted] = useState(false);
  const [lastAction, setLastAction] = useState('');
  const [actionAnimation, setActionAnimation] = useState('');

  useEffect(() => {
    if (gameStarted && pet.isAlive) {
      const interval = setInterval(() => {
        setPet((prev) => {
          const newState = {
            ...prev,
            happiness: Math.max(0, prev.happiness - 2),
            hunger: Math.min(100, prev.hunger + 2),
            energy: Math.max(0, prev.energy - 1),
            cleanliness: Math.max(0, prev.cleanliness - 1),
          };
          newState.isAlive = newState.hunger < 100 && newState.happiness > 0 && newState.energy > 0;
          return newState;
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [gameStarted, pet.isAlive]);

  const performAction = (action: ActionType) => {
    if (!pet.isAlive) return;

    setActionAnimation(action);
    setTimeout(() => setActionAnimation(''), 500);

    switch (action) {
      case 'feed':
        setPet((prev) => ({
          ...prev,
          hunger: Math.max(0, prev.hunger - 30),
          happiness: Math.min(100, prev.happiness + 10),
        }));
        setLastAction('Yum! Your companion enjoyed a healthy meal!');
        break;
      case 'play':
        setPet((prev) => ({
          ...prev,
          happiness: Math.min(100, prev.happiness + 20),
          energy: Math.max(0, prev.energy - 20),
        }));
        setLastAction('Woohoo! Playtime was a blast!');
        break;
      case 'clean':
        setPet((prev) => ({
          ...prev,
          cleanliness: 100,
          happiness: Math.min(100, prev.happiness + 10),
        }));
        setLastAction('Squeaky clean and feeling fresh!');
        break;
      case 'sleep':
        setPet((prev) => ({
          ...prev,
          energy: 100,
        }));
        setLastAction('Zzz... A restful nap restored all energy!');
        break;
    }
  };

  const restartGame = () => {
    setPet({
      happiness: 100,
      hunger: 0,
      energy: 100,
      cleanliness: 100,
      isAlive: true,
    });
    setGameStarted(false);
    setLastAction('');
  };

  const getPetMood = () => {
    const avg = (pet.happiness + (100 - pet.hunger) + pet.energy + pet.cleanliness) / 4;
    if (avg > 80) return { emoji: '😊', text: 'Thriving!', color: 'text-emerald-400' };
    if (avg > 60) return { emoji: '🙂', text: 'Content', color: 'text-teal-400' };
    if (avg > 40) return { emoji: '😐', text: 'Needs Attention', color: 'text-yellow-400' };
    if (avg > 20) return { emoji: '😟', text: 'Struggling', color: 'text-orange-400' };
    return { emoji: '😢', text: 'Critical!', color: 'text-red-400' };
  };

  const mood = getPetMood();

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-emerald-950/20 to-slate-900 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-20">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link
              href="/service-animal-game"
              className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </Link>
            <div className="flex items-center gap-2 text-emerald-400">
              <Heart className="w-5 h-5" />
              <span className="font-semibold">Virtual Service Dog</span>
            </div>
          </div>
        </header>

        {/* Game Container */}
        <main className="py-12 px-6">
          <div className="max-w-lg mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden"
            >
              {/* Pet Display Area */}
              <div className="p-8 text-center border-b border-white/10 bg-gradient-to-b from-emerald-500/5 to-transparent">
                <AnimatePresence mode="wait">
                  {!gameStarted ? (
                    <motion.div
                      key="start"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="text-8xl mb-6">🐕</div>
                      <h2 className="text-2xl font-bold text-white mb-2">Meet Your Companion</h2>
                      <p className="text-gray-400 mb-8">
                        Take care of your virtual service dog by keeping them happy, fed, rested, and clean.
                      </p>
                      <motion.button
                        onClick={() => setGameStarted(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition"
                      >
                        Begin Training
                      </motion.button>
                    </motion.div>
                  ) : !pet.isAlive ? (
                    <motion.div
                      key="gameover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="text-8xl mb-6">😢</div>
                      <h2 className="text-2xl font-bold text-red-400 mb-2">Game Over</h2>
                      <p className="text-gray-400 mb-8">
                        Your companion couldn&apos;t continue. Remember to balance all their needs!
                      </p>
                      <motion.button
                        onClick={restartGame}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 mx-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl"
                      >
                        <RefreshCw className="w-5 h-5" />
                        Try Again
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="playing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        className="text-8xl mb-4"
                        animate={
                          actionAnimation
                            ? {
                                scale: [1, 1.2, 1],
                                rotate: [0, -10, 10, 0],
                              }
                            : {}
                        }
                        transition={{ duration: 0.5 }}
                      >
                        🐕
                      </motion.div>
                      <div className={`text-lg font-semibold ${mood.color} mb-2`}>
                        {mood.emoji} {mood.text}
                      </div>
                      {lastAction && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-emerald-400 text-sm"
                        >
                          {lastAction}
                        </motion.p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Stats */}
              {gameStarted && pet.isAlive && (
                <div className="p-6 space-y-4 border-b border-white/10">
                  <StatBar
                    label="Happiness"
                    value={pet.happiness}
                    color="text-pink-400"
                    icon={<Heart className="w-4 h-4" />}
                  />
                  <StatBar
                    label="Hunger"
                    value={100 - pet.hunger}
                    color="text-orange-400"
                    icon={<Utensils className="w-4 h-4" />}
                  />
                  <StatBar
                    label="Energy"
                    value={pet.energy}
                    color="text-yellow-400"
                    icon={<Zap className="w-4 h-4" />}
                  />
                  <StatBar
                    label="Cleanliness"
                    value={pet.cleanliness}
                    color="text-cyan-400"
                    icon={<Sparkles className="w-4 h-4" />}
                  />
                </div>
              )}

              {/* Actions */}
              {gameStarted && pet.isAlive && (
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <ActionButton
                      onClick={() => performAction('feed')}
                      icon={<Utensils className="w-6 h-6" />}
                      label="Feed"
                      color="orange"
                    />
                    <ActionButton
                      onClick={() => performAction('play')}
                      icon={<Heart className="w-6 h-6" />}
                      label="Play"
                      color="pink"
                    />
                    <ActionButton
                      onClick={() => performAction('clean')}
                      icon={<Sparkles className="w-6 h-6" />}
                      label="Clean"
                      color="cyan"
                    />
                    <ActionButton
                      onClick={() => performAction('sleep')}
                      icon={<Moon className="w-6 h-6" />}
                      label="Sleep"
                      color="purple"
                    />
                  </div>
                </div>
              )}
            </motion.div>

            {/* Tips */}
            {gameStarted && pet.isAlive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 p-4 bg-slate-800/30 rounded-xl border border-white/5"
              >
                <p className="text-gray-500 text-sm text-center">
                  💡 Tip: Balance all stats to keep your companion happy. Stats decrease over time!
                </p>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
