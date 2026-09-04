import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { site } from '@/config/site';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: `${site.name} — Links`,
  description: `${site.name} · ${site.tagline}`,
  metadataBase: new URL('https://bio.karanrajkr.com'),
  openGraph: {
    title: `${site.name}`,
    description: site.tagline,
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} bg-black text-white antialiased`}>
      <body className="min-h-[100dvh] bg-black text-white selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
