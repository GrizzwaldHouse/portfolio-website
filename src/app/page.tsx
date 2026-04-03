export default function Home() {
  return (
    <div className="under-construction">
      {/* Animated background particles */}
      <div className="particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 8}s`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              opacity: 0.15 + Math.random() * 0.25,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="content">
        {/* Gear animation */}
        <div className="gear-container">
          <div className="gear gear-lg">
            <div className="gear-hole" />
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="gear-tooth"
                style={{ transform: `rotate(${i * 45}deg)` }}
              />
            ))}
          </div>
          <div className="gear gear-sm">
            <div className="gear-hole" />
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="gear-tooth"
                style={{ transform: `rotate(${i * 60}deg)` }}
              />
            ))}
          </div>
        </div>

        {/* Heading */}
        <h1 className="heading">Portfolio Under Construction</h1>

        {/* Subtitle */}
        <p className="subtitle">Marcus Daley</p>

        {/* Message */}
        <p className="message">
          We&apos;re building something extraordinary. A completely reimagined,
          AI-driven portfolio experience is on the way.
        </p>

        {/* Progress bar */}
        <div className="progress-track">
          <div className="progress-bar" />
          <div className="progress-glow" />
        </div>

        {/* Timeline */}
        <p className="timeline">Coming Soon &mdash; 2026</p>

        {/* Social links */}
        <div className="social-links">
          <a
            href="https://github.com/GrizzwaldHouse"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="social-link"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/marcusdaley-gamedev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="social-link"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span>LinkedIn</span>
          </a>
          <a
            href="https://www.youtube.com/@marcusdaley7301"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="social-link"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            <span>YouTube</span>
          </a>
        </div>
      </div>

      <style>{`
        .under-construction {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #0f172a 50%, #1a1a2e 75%, #0f172a 100%);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Floating particles */
        .particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          bottom: -10px;
          background: linear-gradient(135deg, #60a5fa, #a78bfa);
          border-radius: 50%;
          animation: floatUp linear infinite;
        }

        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.1;
          }
          100% {
            transform: translateY(-100vh) scale(0.3);
            opacity: 0;
          }
        }

        /* Content */
        .content {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 2rem;
          max-width: 700px;
          animation: fadeInUp 1s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Gear animation */
        .gear-container {
          position: relative;
          width: 140px;
          height: 140px;
          margin: 0 auto 2.5rem;
        }

        .gear {
          position: absolute;
          border-radius: 50%;
          border: 3px solid rgba(96, 165, 250, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gear-lg {
          width: 100px;
          height: 100px;
          top: 0;
          left: 0;
          animation: spinGear 8s linear infinite;
          box-shadow:
            0 0 20px rgba(96, 165, 250, 0.15),
            inset 0 0 20px rgba(96, 165, 250, 0.08);
        }

        .gear-sm {
          width: 64px;
          height: 64px;
          bottom: 2px;
          right: 0;
          animation: spinGearReverse 6s linear infinite;
          border-color: rgba(167, 139, 250, 0.6);
          box-shadow:
            0 0 20px rgba(167, 139, 250, 0.15),
            inset 0 0 20px rgba(167, 139, 250, 0.08);
        }

        .gear-hole {
          width: 24%;
          height: 24%;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 2px solid rgba(255, 255, 255, 0.15);
        }

        .gear-tooth {
          position: absolute;
          width: 14px;
          height: 14px;
          background: inherit;
          border: 3px solid;
          border-color: inherit;
          border-radius: 3px;
          top: 50%;
          left: 50%;
          margin: -7px 0 0 -7px;
          transform-origin: center;
        }

        .gear-lg .gear-tooth {
          border-color: rgba(96, 165, 250, 0.6);
          background: rgba(96, 165, 250, 0.08);
          transform-origin: 50px 0;
          margin: -7px 0 0 -7px;
          top: 50%;
          left: 50%;
        }

        .gear-lg .gear-tooth {
          top: -4px;
          left: calc(50% - 7px);
          transform-origin: 7px 54px;
        }

        .gear-sm .gear-tooth {
          border-color: rgba(167, 139, 250, 0.6);
          background: rgba(167, 139, 250, 0.08);
          width: 11px;
          height: 11px;
          margin: -5.5px 0 0 -5.5px;
          top: -2px;
          left: calc(50% - 5.5px);
          transform-origin: 5.5px 34px;
        }

        @keyframes spinGear {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spinGearReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        /* Heading */
        .heading {
          font-size: clamp(2rem, 6vw, 3.5rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin-bottom: 0.75rem;
          background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 40%, #f472b6 70%, #60a5fa 100%);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientText 6s ease infinite;
        }

        @keyframes gradientText {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Subtitle */
        .subtitle {
          font-size: clamp(1.15rem, 3vw, 1.5rem);
          color: #94a3b8;
          font-weight: 600;
          margin-bottom: 1.75rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          animation: pulse 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        /* Message */
        .message {
          font-size: clamp(0.95rem, 2.5vw, 1.125rem);
          color: #cbd5e1;
          line-height: 1.7;
          max-width: 540px;
          margin: 0 auto 2.5rem;
        }

        /* Progress bar */
        .progress-track {
          position: relative;
          width: 100%;
          max-width: 400px;
          height: 4px;
          margin: 0 auto 2rem;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 999px;
          overflow: hidden;
        }

        .progress-bar {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6);
          background-size: 300% 100%;
          border-radius: 999px;
          animation: progressSlide 3s ease-in-out infinite;
        }

        .progress-glow {
          position: absolute;
          top: -4px;
          height: 12px;
          width: 80px;
          border-radius: 999px;
          background: radial-gradient(ellipse, rgba(139, 92, 246, 0.5), transparent);
          animation: glowSlide 3s ease-in-out infinite;
        }

        @keyframes progressSlide {
          0% { background-position: 0% 0; }
          50% { background-position: 100% 0; }
          100% { background-position: 0% 0; }
        }

        @keyframes glowSlide {
          0% { left: -80px; }
          50% { left: calc(100% + 0px); }
          100% { left: -80px; }
        }

        /* Timeline */
        .timeline {
          font-size: clamp(0.85rem, 2vw, 1rem);
          color: #64748b;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 2.5rem;
        }

        /* Social links */
        .social-links {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.25rem;
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.15);
          background: rgba(255, 255, 255, 0.03);
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
        }

        .social-link:hover {
          color: #e2e8f0;
          border-color: rgba(96, 165, 250, 0.4);
          background: rgba(96, 165, 250, 0.08);
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(96, 165, 250, 0.15);
        }

        .social-link svg {
          width: 18px;
          height: 18px;
        }

        @media (max-width: 480px) {
          .gear-container {
            width: 110px;
            height: 110px;
            margin-bottom: 2rem;
          }
          .gear-lg { width: 80px; height: 80px; }
          .gear-sm { width: 50px; height: 50px; }
          .social-links { gap: 0.75rem; }
          .social-link span { display: none; }
          .social-link { padding: 0.75rem; }
        }
      `}</style>
    </div>
  );
}
