import Link from 'next/link';

const suggestedRoutes = [
  { href: '/', label: 'Home', description: 'Back to the main page' },
  { href: '/projects', label: 'Projects', description: 'View my work' },
  { href: '/about', label: 'About', description: 'My background and skills' },
  { href: '/play', label: 'Play', description: 'Interactive demos' },
];

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-lg w-full text-center">
        {/* 404 display */}
        <p className="text-7xl font-bold bg-gradient-to-r from-[#FFCC00] to-[#D50032] bg-clip-text text-transparent mb-4">
          404
        </p>

        <h1 className="text-2xl font-bold text-white mb-3">Page Not Found</h1>

        <p className="text-gray-400 mb-10">
          The page you are looking for does not exist or has been moved.
        </p>

        {/* Suggested routes */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {suggestedRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="group rounded-lg border border-slate-700 bg-slate-800/50 backdrop-blur-sm p-4 text-left hover:border-[#FFCC00]/50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <span className="block text-sm font-semibold text-white group-hover:text-[#FFCC00] transition-colors duration-300">
                {route.label}
              </span>
              <span className="block text-xs text-gray-500 mt-1">
                {route.description}
              </span>
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="w-16 h-0.5 bg-gradient-to-r from-[#FFCC00] to-[#D50032] mx-auto mb-4 rounded-full" />

        <p className="text-sm text-gray-500">
          If you believe this is a mistake, please{' '}
          <a
            href="mailto:daleym12@gmail.com"
            className="text-[#FFCC00] hover:underline"
          >
            let me know
          </a>
          .
        </p>
      </div>
    </div>
  );
}
