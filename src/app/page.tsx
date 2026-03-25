"use client";

import { useState, useEffect, useCallback, useMemo, memo, useRef } from "react";
import { Github, Linkedin, Instagram, Mail, ExternalLink } from "lucide-react";

// ============================================
// TEXT SCRAMBLE (Memoised)
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
// 3D TILT BUTTON (Optimised)
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
    setTransform(`perspective(1000px) rotateX(${y * -12}deg) rotateY(${x * 12}deg) scale(1.02)`);
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
    setRipples(prev => [...prev, id]);
    setTimeout(() => setRipples(prev => prev.filter(r => r !== id)), 600);
  }, []);

  return (
    <a
      ref={buttonRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={`
        group relative flex items-center justify-center gap-3
        w-full max-w-sm mx-auto py-4 px-6 rounded-2xl
        font-medium text-sm overflow-hidden
        will-change-transform
        ${isPrimary 
          ? "bg-white text-black" 
          : "bg-white/5 text-white/90 backdrop-blur-md border border-white/10"
        }
      `}
      style={{
        transform,
        transition: "transform 0.1s ease-out, box-shadow 0.3s ease",
        boxShadow: isHovered 
          ? isPrimary 
            ? "0 0 40px rgba(255,255,255,0.12)" 
            : "0 0 30px rgba(147,51,234,0.15)"
          : "none",
      }}
    >
      {ripples.map((id, i) => (
        <span
          key={id}
          className="absolute rounded-full bg-white/25 pointer-events-none"
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
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      )}
      
      {icon && <span className={`transition-transform duration-200 ${isHovered ? "scale-110" : ""}`}>{icon}</span>}
      <span>{label}</span>
      <ExternalLink className={`w-4 h-4 transition-all duration-200 ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`} />
    </a>
  );
});

// ============================================
// STATIC AVATAR
// ============================================
const FloatingAvatar = memo(function FloatingAvatar() {
  return (
    <div className="relative group">
      <div 
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle, rgba(147,51,234,0.3) 0%, transparent 70%)",
          transform: "scale(1.4)",
          animation: "pulse-glow 2s ease-in-out infinite",
        }}
      />
      <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center transition-transform duration-300 group-hover:scale-105" style={{ boxShadow: "0 0 30px rgba(255,255,255,0.1)" }}>
        <span className="text-2xl font-bold text-white">KR</span>
        <div className="absolute inset-0 rounded-full ring-1 ring-white/20" />
      </div>
      <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-black" />
    </div>
  );
});

// ============================================
// REVEAL SECTION (Optimised)
// ============================================
const RevealSection = memo(function RevealSection({ 
  children, 
  delay = 0,
  className = ""
}: { 
  children: React.ReactNode; 
  delay?: number;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
});

// ============================================
// MAIN PAGE (Optimised)
// ============================================
export default function LinkInBio() {
  const links = useMemo(() => [
    { href: "https://github.com/Karan-Raj-KR", label: "GitHub", icon: <Github className="w-4 h-4" /> },
    { href: "https://linkedin.com/in/karanrajkr", label: "LinkedIn", icon: <Linkedin className="w-4 h-4" /> },
    { href: "https://instagram.com/karan.rajkr", label: "Instagram", icon: <Instagram className="w-4 h-4" /> },
    { href: "mailto:karanrajkr2008@gmail.com", label: "Contact Me", icon: <Mail className="w-4 h-4" /> },
  ], []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <style>{`
        @keyframes ripple {
          to { width: 200px; height: 200px; opacity: 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1.4); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 4s ease infinite;
        }
      `}</style>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
        <div className="w-full max-w-md mx-auto space-y-8">
          
          <RevealSection delay={0} className="flex flex-col items-center text-center space-y-3">
            <FloatingAvatar />
            <div className="space-y-1">
              <h2 className="text-xl font-semibold tracking-tight">
                <ScrambleText text="Karan Raj" />
              </h2>
              <p className="text-sm text-white/50 tracking-wide">
                <ScrambleText text="Developer • Builder • Founder" />
              </p>
            </div>
          </RevealSection>

          <RevealSection delay={150} className="text-center space-y-3">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
              <span className="block">From ideas to</span>
              <span className="bg-gradient-to-r from-emerald-400 via-white to-teal-400 bg-clip-text text-transparent animate-gradient-x">
                real products.
              </span>
            </h1>
            <p className="text-base text-white/50 max-w-xs mx-auto leading-relaxed">
              I build software, experiment with AI, and ship real-world projects.
            </p>
          </RevealSection>

          <RevealSection delay={300} className="pt-2">
            <TiltButton
              href="https://karanrajkr.zo.space"
              label="View Portfolio"
              variant="primary"
              icon={<ExternalLink className="w-4 h-4" />}
            />
          </RevealSection>

          <RevealSection delay={400} className="grid grid-cols-2 gap-3 w-full max-w-sm mx-auto">
            {links.map((link) => (
              <TiltButton
                key={link.label}
                href={link.href}
                label={link.label}
                icon={link.icon}
              />
            ))}
          </RevealSection>

          <RevealSection delay={550} className="pt-6">
            <p className="text-center text-xs text-white/20 mt-4">
              © {new Date().getFullYear()} Karan Raj
            </p>
          </RevealSection>
        </div>
      </main>
    </div>
  );
}