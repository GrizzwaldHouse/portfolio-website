export default function GraduationCountdown() {
  return (
    <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#FFCC00] to-[#D50032] rounded-lg shadow-lg">
      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
      </svg>
      <div className="flex flex-col">
        <span className="text-white font-bold text-sm">Full Sail University Graduate</span>
        <span className="text-white/90 text-xs">B.S. Computer Science - Game Development | February 2026</span>
      </div>
      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    </div>
  );
}
