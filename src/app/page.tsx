import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { site } from '@/config/site';

export default function Page() {
  return (
    <main className="mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col justify-center px-5 py-8 sm:py-12">
      {/* 1. Avatar, Name, One-line intro */}
      <header className="stagger-in flex flex-col items-center text-center" style={{ ['--delay' as string]: '0ms' }}>
        <Image
          src={site.avatar}
          alt={site.name}
          width={72}
          height={72}
          priority
          className="h-[72px] w-[72px] rounded-full object-cover ring-1 ring-white/15"
        />
        <h1 className="mt-4 text-[26px] font-semibold tracking-tight text-white sm:text-[28px]">
          {site.name}
        </h1>
        <p className="mt-1.5 max-w-[340px] text-[14px] leading-relaxed text-white/60">
          {site.tagline}
        </p>
      </header>

      {/* 2. Small status pill */}
      <div className="stagger-in mt-4 flex justify-center" style={{ ['--delay' as string]: '60ms' }}>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[12px] text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-white/70" aria-hidden />
          <span>{site.status}</span>
        </div>
      </div>

      {/* 3. The links, all at equal visual weight */}
      <nav aria-label="Links" className="mt-7 flex flex-col gap-2.5">
        {site.links.map((link, index) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('mailto:') ? undefined : '_blank'}
            rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            className="stagger-in group flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3.5 transition-all duration-150 hover:border-white/30 hover:bg-white/[0.05] active:scale-[0.99]"
            style={{ ['--delay' as string]: `${120 + index * 40}ms` }}
          >
            <span className="text-[15px] font-medium text-white/90 transition-colors group-hover:text-white">
              {link.label}
            </span>
            <ArrowUpRight
              className="h-4 w-4 text-white/30 transition-all duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/80"
              aria-hidden
            />
          </a>
        ))}
      </nav>

      {/* 4. ONE proof element, small, below the links */}
      <footer
        className="stagger-in mt-7 text-center"
        style={{ ['--delay' as string]: `${120 + site.links.length * 40 + 40}ms` }}
      >
        <a
          href={site.proof.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex flex-wrap items-center justify-center gap-1.5 text-[12px] text-white/45 transition-colors hover:text-white/80"
        >
          <span className="font-medium text-white/70 underline-offset-4 group-hover:text-white group-hover:underline">
            {site.proof.title}
          </span>
          <span className="text-white/30" aria-hidden>—</span>
          <span>{site.proof.description}</span>
          <ArrowUpRight className="h-3 w-3 text-white/30 transition-colors group-hover:text-white/70" aria-hidden />
        </a>
      </footer>
    </main>
  );
}
