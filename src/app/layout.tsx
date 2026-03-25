import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Karan Raj | Developer • Builder • Founder',
  description: 'From ideas to real products. I build software, experiment with AI, and ship real-world projects.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased dark`}>
      <body className="font-sans min-h-screen bg-black text-white selection:bg-white/20 overflow-x-hidden relative">
        {children}
      </body>
    </html>
  );
}
