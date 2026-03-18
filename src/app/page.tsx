import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Github, Linkedin, Instagram, Mail, ArrowUpRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-12 pt-24 pb-12 font-sans fade-in">
      <div className="w-full max-w-2xl flex flex-col items-center animate-slide-up">
        {/* HERO SECTION */}
        <section className="flex flex-col items-center text-center space-y-6 mb-12">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)] bg-neutral-900">
            {/* Fallback pattern if image is missing */}
            <div className="absolute inset-0 bg-gradient-to-tr from-neutral-800 to-neutral-700" />
            <Image
              src="/profile.jpeg"
              alt="Karan Raj"
              fill
              className="object-cover relative z-10"
              priority
            />
          </div>
          
          <div className="space-y-1.5 mt-2">
            <h2 className="text-xl font-semibold tracking-tight text-white/95">Karan Raj</h2>
            <p className="text-xs text-neutral-400 font-medium tracking-widest uppercase">Developer • Builder • Founder</p>
          </div>

          <div className="space-y-4 max-w-[28rem] mt-2">
            <h1 className="text-4xl sm:text-[2.75rem] leading-[1.1] font-bold tracking-tight text-white">
              From ideas to real products.
            </h1>
            <p className="text-neutral-400 text-base sm:text-[1.125rem] leading-relaxed mix-blend-plus-lighter mx-auto font-medium">
              I build software, experiment with AI, and ship real-world projects.
            </p>
          </div>
        </section>

        {/* PRIMARY ACTION BUTTONS */}
        <section className="w-full space-y-3.5 mb-20 flex flex-col items-center">
          <Button href="https://karanrajkr.vercel.app" variant="primary" external>
            View Portfolio <ArrowUpRight className="w-[1.125rem] h-[1.125rem] ml-1 opacity-70" />
          </Button>
          <Button href="https://github.com/Karan-Raj-KR" external>
            <Github className="w-[1.125rem] h-[1.125rem] mr-1.5 opacity-70" /> GitHub
          </Button>
          <Button href="https://www.linkedin.com/in/karanrajkr/" external>
            <Linkedin className="w-[1.125rem] h-[1.125rem] mr-1.5 opacity-70" /> LinkedIn
          </Button>
          <Button href="https://www.instagram.com/karan.rajkr/" external>
            <Instagram className="w-[1.125rem] h-[1.125rem] mr-1.5 opacity-70" /> Instagram
          </Button>
          <Button href="mailto:karanrajkr2008@gmail.com">
            <Mail className="w-[1.125rem] h-[1.125rem] mr-1.5 opacity-70" /> Contact Me
          </Button>
        </section>

        {/* CURRENTLY BUILDING */}
        <section className="w-full flex flex-col items-center mb-16 space-y-5">
          <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-[0.2em]">Currently Building</h3>
          <ul className="flex flex-col items-center space-y-2.5 w-full">
            <li className="text-neutral-300 bg-white/[0.03] border border-white/[0.05] rounded-xl px-5 py-3 text-sm font-medium hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300 w-full max-w-sm text-center">Smart Attendance System</li>
            <li className="text-neutral-300 bg-white/[0.03] border border-white/[0.05] rounded-xl px-5 py-3 text-sm font-medium hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300 w-full max-w-sm text-center">Productivity Lock App</li>
          </ul>
        </section>

        {/* FOOTER */}
        <footer className="w-full flex justify-center space-x-6 py-8 border-t border-white/[0.05] mt-auto">
          <a href="https://github.com/Karan-Raj-KR" target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-white hover:scale-110 transition-all duration-300">
            <Github className="w-[1.125rem] h-[1.125rem]" />
          </a>
          <a href="https://www.linkedin.com/in/karanrajkr/" target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-white hover:scale-110 transition-all duration-300">
            <Linkedin className="w-[1.125rem] h-[1.125rem]" />
          </a>
          <a href="mailto:karanrajkr2008@gmail.com" className="text-neutral-500 hover:text-white hover:scale-110 transition-all duration-300">
            <Mail className="w-[1.125rem] h-[1.125rem]" />
          </a>
        </footer>
      </div>
    </main>
  );
}
