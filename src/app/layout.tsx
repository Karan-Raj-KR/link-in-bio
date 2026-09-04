import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { site } from '@/config/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://bio.karanrajkr.com'),
  title: `${site.name} | ${site.title}`,
  description: `${site.headline.line1} ${site.headline.highlight} — ${site.headline.subtext}`,
  keywords: ['Karan Raj', 'Developer', 'Builder', 'Founder', 'Portfolio', 'Link in Bio', 'CrewAI', 'Open Source'],
  authors: [{ name: site.name, url: 'https://karanrajkr.com' }],
  creator: site.name,
  openGraph: {
    title: `${site.name} | ${site.title}`,
    description: `${site.headline.line1} ${site.headline.highlight} — ${site.headline.subtext}`,
    url: 'https://bio.karanrajkr.com',
    siteName: `${site.name} — Link Hub`,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} | ${site.title}`,
    description: `${site.headline.line1} ${site.headline.highlight} — ${site.headline.subtext}`,
    creator: '@karanrajkr',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`}>
      <body className="font-sans min-h-[100dvh] h-full bg-black text-white selection:bg-white/20 overflow-x-hidden relative">
        {children}
      </body>
    </html>
  );
}
