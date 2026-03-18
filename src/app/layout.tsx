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
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div className="glow-blob bg-blue-500 w-[500px] h-[500px] top-[-20%] left-[-10%] opacity-[0.08]" />
          <div className="glow-blob bg-purple-500 w-[400px] h-[400px] bottom-[-10%] right-[-10%] opacity-[0.08]" />
        </div>
        {children}
      </body>
    </html>
  );
}
