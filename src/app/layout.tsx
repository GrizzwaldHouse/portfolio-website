import type { Metadata } from 'next';
import { Cinzel, Raleway, JetBrains_Mono } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import './globals.css';
import { siteConfig } from '@/data/site-config';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-cinzel',
  display: 'swap',
});

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-raleway',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${raleway.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className="font-sans bg-slate-900 text-gray-100 min-h-screen flex flex-col game-scanline game-grid-bg crt-vignette">
        <Navbar />
        <main className="flex-1 relative z-10">
          <NuqsAdapter>{children}</NuqsAdapter>
        </main>
        <Footer />
      </body>
    </html>
  );
}
