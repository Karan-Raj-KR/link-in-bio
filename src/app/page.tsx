"use client";

import { useState, useEffect, useCallback, memo, useRef } from "react";
import { Github, Linkedin, Instagram, Mail, ExternalLink } from "lucide-react";
import { site } from "@/config/site";

// ============================================
// TEXT SCRAMBLE
// ============================================
const ScrambleText = memo(function ScrambleText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "•") return char;
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * 26)];
          })
          .join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 0.4;
    }, 25);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
});

// ============================================
// 3D TILT BUTTON WITH 150MS HOVER LIFT & BORDER BRIGHTENING
// ============================================
interface TiltButtonProps {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
}

const TiltButton = memo(function TiltButton({
  href,
  label,
  variant = "secondary",
  icon,
}: TiltButtonProps) {
  const [transform, setTransform] = useState("translate3d(0,0,0)");
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<number[]>([]);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const isPrimary = variant === "primary";

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setTransform(`perspective(1000px) rotateX(${y * -8}deg) rotateY(${x * 8}deg) translateY(-2px)`);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("translate3d(0,0,0)");
    setIsHovered(false);
  }, []);

  const handleClick = useCallback(() => {
    const id = Date.now();
    setRipples((prev) => [...prev, id]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r !== id)), 600);
  }, []);

  return (
    <a
      ref={buttonRef}
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={`
        group relative flex items-center justify-center gap-2.5
        w-full py-4 px-6 rounded-2xl
        font-medium text-sm overflow-hidden
        will-change-transform cursor-pointer
        transition-all duration-150 ease-out
        ${
          isPrimary
            ? "bg-white text-black border border-white hover:bg-zinc-100 hover:border-white/80 hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(255,255,255,0.2)] active:translate-y-0 active:scale-[0.99]"
            : "bg-white/5 text-white/90 backdrop-blur-md border border-white/10 hover:border-white/40 hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(255,255,255,0.06)] active:translate-y-0 active:scale-[0.99]"
        }
      `}
      style={{
        transform,
        transition:
          "transform 150ms ease-out, background-color 150ms ease-out, border-color 150ms ease-out, box-shadow 150ms ease-out",
      }}
    >
      {ripples.map((id, i) => (
        <span
          key={id}
          className="pointer-events-none absolute rounded-full bg-white/25"
          style={{
            left: "50%",
            top: "50%",
            width: 10,
            height: 10,
            transform: "translate(-50%, -50%)",
            animation: `ripple 0.6s ease-out forwards`,
            animationDelay: `${i * 50}ms`,
          }}
        />
      ))}

      {isPrimary && (
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
      )}

      {icon && (
        <span className={`transition-transform duration-150 ${isHovered ? "scale-110" : ""}`}>
          {icon}
        </span>
      )}
      <span>{label}</span>
      <ExternalLink
        className={`h-4 w-4 transition-all duration-150 ${
          isHovered ? "translate-x-0 opacity-100" : "-translate-x-1.5 opacity-0"
        }`}
      />
    </a>
  );
});

// ============================================
// MONOGRAM AVATAR (Single Green Accent Dot)
// ============================================
const FloatingAvatar = memo(function FloatingAvatar() {
  return (
    <div className="group relative">
      <div
        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)",
          transform: "scale(1.4)",
          animation: "pulse-glow 2s ease-in-out infinite",
        }}
      />
      <div
        className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-zinc-800 to-black transition-transform duration-300 group-hover:scale-105"
        style={{ boxShadow: "0 0 30px rgba(255,255,255,0.1)" }}
      >
        <span className="text-2xl font-bold text-white">{site.initials}</span>
        <div className="absolute inset-0 rounded-full ring-1 ring-white/20" />
      </div>
      {/* The single retained green dot on the page */}
      <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-black bg-emerald-500" />
    </div>
  );
});

// Icon lookup helper
const iconMap = {
  github: <Github className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
  instagram: <Instagram className="h-4 w-4" />,
  mail: <Mail className="h-4 w-4" />,
} as const;

// ============================================
// MAIN PAGE
// ============================================
export default function LinkInBio() {
  return (
    <main className="relative z-10 flex min-h-[100dvh] w-full flex-col items-center justify-center px-4 py-8 sm:py-12 my-auto">
      <div className="mx-auto my-auto flex w-full max-w-[420px] flex-col items-center text-center space-y-6 sm:space-y-7">
        
        {/* Monogram, Name, Title, and Status Pill (40ms Stagger) */}
        <div
          className="stagger-item flex flex-col items-center text-center space-y-3"
          style={{ ['--delay' as string]: '0ms' }}
        >
          <FloatingAvatar />
          <div className="space-y-1">
            <h2 className="text-xl font-semibold tracking-tight">
              <ScrambleText text={site.name} />
            </h2>
            <p className="text-sm tracking-wide text-white/50">
              <ScrambleText text={site.title} />
            </p>
          </div>
          {/* Status pill: Quiet text pill without competing green dot */}
          <div className="pt-1">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs text-white/70">
              <span>{site.status}</span>
            </div>
          </div>
        </div>

        {/* Headline with Unified Gradient on "real products." */}
        <div
          className="stagger-item text-center space-y-2.5"
          style={{ ['--delay' as string]: '80ms' }}
        >
          <h1 className="text-4xl font-bold tracking-tight leading-tight sm:text-5xl">
            <span className="block">{site.headline.line1}</span>
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent animate-gradient-x">
              {site.headline.highlight}
            </span>
          </h1>
          <p className="mx-auto max-w-xs text-sm leading-relaxed text-white/50 sm:text-base">
            {site.headline.subtext}
          </p>
        </div>

        {/* Primary CTA (View Portfolio) */}
        <div
          className="stagger-item w-full max-w-sm mx-auto"
          style={{ ['--delay' as string]: '160ms' }}
        >
          <TiltButton
            href={site.portfolio.href}
            label={site.portfolio.label}
            variant="primary"
            icon={<ExternalLink className="h-4 w-4" />}
          />
        </div>

        {/* 2x2 Social Grid */}
        <div
          className="stagger-item grid w-full max-w-sm grid-cols-2 gap-3 mx-auto"
          style={{ ['--delay' as string]: '240ms' }}
        >
          {site.links.map((link, idx) => (
            <div
              key={link.label}
              className="stagger-item"
              style={{ ['--delay' as string]: `${280 + idx * 40}ms` }}
            >
              <TiltButton
                href={link.href}
                label={link.label}
                icon={iconMap[link.icon]}
              />
            </div>
          ))}
        </div>

        {/* Readable proof line above footer - Centered on vertical axis */}
        <div
          className="stagger-item flex w-full justify-center text-center pt-1"
          style={{ ['--delay' as string]: '440ms' }}
        >
          <a
            href={site.proof.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex flex-wrap items-center justify-center text-center gap-1.5 text-[13px] text-zinc-300 transition-colors duration-150 hover:text-white sm:text-sm"
          >
            <span className="font-semibold text-white underline-offset-4 group-hover:underline">
              {site.proof.title}
            </span>
            <span className="text-zinc-500">—</span>
            <span className="text-zinc-300">{site.proof.description}</span>
            <ExternalLink
              className="h-3.5 w-3.5 text-zinc-400 transition-colors duration-150 group-hover:text-white"
              aria-hidden="true"
            />
          </a>
        </div>

        {/* Footer */}
        <div
          className="stagger-item"
          style={{ ['--delay' as string]: '480ms' }}
        >
          <p className="text-center text-xs text-white/30">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </main>
  );
}
