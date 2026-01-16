'use client';

import { useEffect, useState } from 'react';

export default function GraduationAnnouncement() {
  const [isVisible, setIsVisible] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const graduationDate = new Date('2026-02-06T00:00:00');
    const fadeStartDate = new Date('2026-02-13T00:00:00'); // 7 days after graduation
    const fadeEndDate = new Date('2026-02-20T00:00:00'); // 14 days after graduation
    const now = new Date();

    // Show banner only after graduation
    if (now >= graduationDate && now < fadeEndDate) {
      setIsVisible(true);

      // Calculate fade opacity
      if (now >= fadeStartDate) {
        const fadeProgress = (now.getTime() - fadeStartDate.getTime()) / 
                            (fadeEndDate.getTime() - fadeStartDate.getTime());
        const calculatedOpacity = Math.max(0, 1 - fadeProgress);
        setOpacity(calculatedOpacity);
      }
    } else {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible || opacity === 0) {
    return null;
  }

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-50 transition-opacity duration-1000"
      style={{ opacity }}
    >
      <div className="bg-gradient-to-r from-[#FFCC00] via-[#D50032] to-[#FFCC00] text-white py-4 px-6 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <svg className="w-8 h-8 text-white animate-bounce" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
            </svg>
            <div>
              <h3 className="font-bold text-lg">🎓 I Just Graduated from Full Sail University!</h3>
              <p className="text-sm text-white/90">
                Bachelor of Science in Computer Science - Game Development | February 2026
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white hover:text-white/80 transition"
            aria-label="Close announcement"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
