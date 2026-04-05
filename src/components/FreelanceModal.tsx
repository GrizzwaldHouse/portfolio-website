'use client';

import { useEffect, useRef } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { freelanceLinks, siteConfig } from '@/data/site-config';

interface FreelanceModalProps {
  open: boolean;
  onClose: () => void;
}

export default function FreelanceModal({ open, onClose }: FreelanceModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  // Trap focus inside modal
  useEffect(() => {
    if (open) {
      dialogRef.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  const platforms = [
    {
      name: 'Upwork',
      url: freelanceLinks.upwork,
      color: 'from-green-500 to-green-600',
      description: 'Long-term contracts & hourly projects',
    },
    {
      name: 'Fiverr',
      url: freelanceLinks.fiverr,
      color: 'from-emerald-500 to-teal-600',
      description: 'Fixed-price gigs & quick turnarounds',
    },
    {
      name: 'LinkedIn',
      url: siteConfig.linkedin,
      color: 'from-[#3B82F6] to-[#2563EB]',
      description: 'Direct message for opportunities',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Hire Marcus — Choose a platform"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-[#FFCC00] rounded"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-white mb-2">
          Hire Marcus
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Choose your preferred platform to get started.
        </p>

        <div className="space-y-3">
          {platforms.map((platform) => {
            const hasUrl = platform.url && platform.url.length > 0;
            return hasUrl ? (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-slate-700/50 border border-slate-600 hover:border-slate-500 hover:bg-slate-700 transition-all group focus:outline-none focus:ring-2 focus:ring-[#FFCC00]"
              >
                <div>
                  <p className="font-semibold text-white group-hover:text-[#FFCC00] transition">
                    {platform.name}
                  </p>
                  <p className="text-xs text-gray-400">{platform.description}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-[#FFCC00] transition" />
              </a>
            ) : (
              <div
                key={platform.name}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-700/30 border border-slate-700 opacity-50"
              >
                <div>
                  <p className="font-semibold text-gray-400">{platform.name}</p>
                  <p className="text-xs text-gray-500">Coming soon</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
