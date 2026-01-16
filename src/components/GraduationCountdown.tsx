'use client';

import { useEffect, useState } from 'react';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isGraduated: boolean;
}

export default function GraduationCountdown() {
  const graduationDate = new Date('2026-02-06T00:00:00'); // Set exact graduation date
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isGraduated: false,
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = graduationDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isGraduated: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds, isGraduated: false });
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, []);

  if (timeRemaining.isGraduated) {
    return (
      <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#FFCC00] to-[#D50032] rounded-lg shadow-lg">
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
        </svg>
        <div className="flex flex-col">
          <span className="text-white font-bold text-sm">Full Sail Graduate</span>
          <span className="text-white/90 text-xs">February 2026</span>
        </div>
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      </div>
    );
  }

  return (
    <div className="inline-flex flex-col gap-3 px-6 py-4 bg-slate-800/50 backdrop-blur-sm border border-[#FFCC00]/30 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <svg className="w-5 h-5 text-[#FFCC00]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
        </svg>
        <span className="text-white font-bold text-sm">Graduating February 2026</span>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold text-[#FFCC00]">
            {timeRemaining.days}
          </div>
          <div className="text-xs text-gray-400">Days</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold text-[#FFCC00]">
            {timeRemaining.hours}
          </div>
          <div className="text-xs text-gray-400">Hours</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold text-[#FFCC00]">
            {timeRemaining.minutes}
          </div>
          <div className="text-xs text-gray-400">Mins</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold text-[#FFCC00]">
            {timeRemaining.seconds}
          </div>
          <div className="text-xs text-gray-400">Secs</div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 mt-1">
        Full Sail University
      </div>
    </div>
  );
}
