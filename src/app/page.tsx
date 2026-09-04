import Image from 'next/image';
import { Github, Linkedin, Instagram, Mail, ArrowUpRight } from 'lucide-react';
import { site } from '@/config/site';
import GitHubGraph from '@/components/GitHubGraph';

const socialIcon = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  mail: Mail,
} as const;

export default function Page() {
  return (
    <>
      <div className="aurora" aria-hidden />

      <main className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[420px] flex-col justify-center px-5 py-14">
        <div className="rounded-[28px] border border-[var(--card-border)] bg-[var(--card)] p-6 backdrop-blur-xl sm:p-7">

          {/* Header: avatar + status */}
          <div className="rise flex items-center gap-4" style={{ ['--d' as string]: '0ms' }}>
            {site.avatar === 'photo' ? (
              <Image
                src="/profile.jpeg"
                alt={site.name}
                width={56}
                height={56}
                priority
                className="h-14 w-14 rounded-full object-cover ring-1 ring-white/10"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.06] text-lg font-semibold ring-1 ring-white/10">
                {site.initials}
              </div>
            )}
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] px-3 py-1.5 text-[12px] text-[var(--ink-1)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: 'var(--accent)' }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: 'var(--accent)' }} />
              </span>
              {site.status}
            </span>
          </div>

          {/* Name + pitch */}
          <div className="rise mt-6" style={{ ['--d' as string]: '70ms' }}>
            <h1 className="font-[family-name:var(--font-display)] text-[34px] font-semibold leading-[1.05] tracking-[-0.02em]">
              {site.name}
            </h1>
            <p className="mt-2 text-[15px] leading-relaxed text-[var(--ink-1)]">{site.tagline}</p>
          </div>

          {/* Featured work */}
          <div className="rise mt-8" style={{ ['--d' as string]: '140ms' }}>
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--ink-2)]">
              Featured
            </span>
            <ul className="mt-3 flex flex-col gap-2.5">
              {site.featured.map((item) => {
                const inner = (
                  <>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-medium text-[var(--ink-0)]">{item.title}</span>
                      <span className="mt-1 block text-[13px] leading-snug text-[var(--ink-1)]">{item.blurb}</span>
                    </span>
                    {item.href ? (
                      <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ink-2)] transition-all group-hover:text-[var(--ink-0)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    ) : (
                      <span className="mt-0.5 shrink-0 rounded-full border border-[var(--card-border)] px-2 py-0.5 text-[10px] uppercase tracking-wide text-[var(--ink-2)]">
                        Soon
                      </span>
                    )}
                  </>
                );
                const base = "group flex items-start gap-3 rounded-2xl border border-[var(--card-border)] px-4 py-4";
                return (
                  <li key={item.title}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${base} transition-colors hover:border-[var(--card-border-hover)] hover:bg-white/[0.02]`}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className={base}>{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* GitHub activity */}
          <div className="rise mt-8" style={{ ['--d' as string]: '210ms' }}>
            <GitHubGraph />
          </div>

          {/* CTAs */}
          <div className="rise mt-8 flex flex-col gap-2.5" style={{ ['--d' as string]: '280ms' }}>
            <a
              href={site.ctaPrimary.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-[15px] font-semibold text-black transition-transform active:scale-[0.98]"
              style={{ background: 'var(--accent)' }}
            >
              {site.ctaPrimary.label}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={site.ctaSecondary.href}
              className="flex items-center justify-center gap-2 rounded-2xl border border-[var(--card-border)] px-5 py-3.5 text-[15px] font-medium text-[var(--ink-0)] transition-colors hover:border-[var(--card-border-hover)] active:scale-[0.98]"
            >
              {site.ctaSecondary.label}
            </a>
          </div>

          {/* Socials */}
          <div className="rise mt-7 flex items-center justify-between border-t border-[var(--card-border)] pt-5" style={{ ['--d' as string]: '350ms' }}>
            <div className="flex gap-1">
              {site.socials.map((s) => {
                const Icon = socialIcon[s.icon];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--ink-1)] transition-colors hover:bg-white/[0.05] hover:text-[var(--ink-0)]"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                );
              })}
            </div>
            <span className="text-[11px] text-[var(--ink-2)]">© {new Date().getFullYear()} {site.name}</span>
          </div>
        </div>
      </main>
    </>
  );
}
