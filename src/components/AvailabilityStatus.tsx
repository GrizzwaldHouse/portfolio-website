'use client';

import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';

type AvailabilityStatus = 'graduating-soon' | 'available' | 'employed';

interface StatusConfig {
  text: string;
  subtext: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: ReactElement;
}

export default function AvailabilityStatus() {
  const [status, setStatus] = useState<AvailabilityStatus>('graduating-soon');

  useEffect(() => {
    const graduationDate = new Date('2026-02-06T00:00:00');
    const now = new Date();

    if (now >= graduationDate) {
      setStatus('available'); // After graduation, show as available
    } else {
      setStatus('graduating-soon'); // Before graduation
    }

    // Note: Change to 'employed' manually when you get a job
  }, []);

  const statusConfigs: Record<AvailabilityStatus, StatusConfig> = {
    'graduating-soon': {
      text: 'Graduating February 2026',
      subtext: 'Available for remote work',
      color: 'text-[#FFCC00]',
      bgColor: 'bg-[#FFCC00]/20',
      borderColor: 'border-[#FFCC00]/30',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
        </svg>
      )
    },
    'available': {
      text: 'Available for Hire',
      subtext: 'Open to remote opportunities',
      color: 'text-green-400',
      bgColor: 'bg-green-400/20',
      borderColor: 'border-green-400/30',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    },
    'employed': {
      text: 'Currently Employed',
      subtext: 'Not seeking opportunities',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/20',
      borderColor: 'border-blue-400/30',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
        </svg>
      )
    }
  };

  const config = statusConfigs[status];

  return (
    <div className={`inline-flex items-center gap-3 px-5 py-3 ${config.bgColor} border ${config.borderColor} rounded-lg backdrop-blur-sm`}>
      <div className={`${config.color} animate-pulse`}>
        {config.icon}
      </div>
      <div className="flex flex-col">
        <span className={`${config.color} font-bold text-sm`}>
          {config.text}
        </span>
        <span className="text-gray-300 text-xs">
          {config.subtext}
        </span>
      </div>
      {status === 'available' && (
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      )}
    </div>
  );
}
