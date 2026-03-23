"use client";

import { useState, useEffect, useCallback, useMemo, memo, useRef } from "react";
import { Github, Linkedin, Instagram, Mail, ExternalLink, Briefcase, Lock, Sparkles } from "lucide-react";

// ============================================
// OPTIMISED TYPES
// ============================================
interface MousePosition {
  x: number;
  y: number;
}

// ============================================
// CSS-ONLY PARTICLES (No JS RAF Loop)
// ============================================
const CSSParticles = memo(function CSSParticles() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {useMemo(() => Array.from({ length: 20 }, (_, i) => {
        const size = 1 + (i % 3);
        const left = (i * 5) % 100;
        const delay = i * 0.5;
        const duration = 15 + (i % 10);
        
        return (
          <div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              animation: `float-particle ${duration}s linear ${delay}s infinite`,
              boxShadow: `0 0 ${size * 2}px ${size / 2}px rgba(255,255,255,0.15)`,
            }}
          />
        );
      }), [])}
    </div>
  );
});

// ============================================
// LAZY LOADED CURSOR (Only on Desktop)
// ============================================
const CustomCursor = memo(function CustomCursor({ 
  mousePosition, 
  isHovering 
}: {
  mousePosition: MousePosition;
  isHovering: boolean;
}) {
  return (
    <>
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference hidden md:block will-change-transform"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 2.5 : 1})`,
          width: 20,
          height: 20,
          backgroundColor: "white",
          borderRadius: "50%",
          transition: "transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />
      <div
        className="fixed pointer-events-none z-[9998] hidden md:block will-change-transform"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: `translate(-50%, -50%)`,
          width: isHovering ? 80 : 35,
          height: isHovering ? 80 : 35,
          background: `radial-gradient(circle, rgba(255,255,255,${isHovering ? 0.25 : 0.12}) 0%, transparent 70%)`,
          borderRadius: "50%",
          transition: "width 0.2s ease, height 0.2s ease",
        }}
      />
    </>
  );
});

// ============================================
// OPTIMISED MORPHING BLOBS (CSS Animations)
// ============================================
const MorphingBlobs = memo(function MorphingBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none will-change-transform" aria-hidden="true">
      <div
        className="absolute top-[20%] left-[15%] w-[400px] h-[400px] rounded-full opacity-20 blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(147,51,234,0.5) 0%, transparent 70%)",
          animation: "morph 10s ease-in-out infinite, drift 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[25%] right-[20%] w-[350px] h-[350px] rounded-full opacity-15 blur-[80px]"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)",
          animation: "morph 12s ease-in-out infinite reverse, drift 25s ease-in-out infinite reverse",
        }}
      />
    </div>
  );
});

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
  onHoverChange?: (hovering: boolean) => void;
}

const TiltButton = memo(function TiltButton({ 
  href, 
  label, 
  variant = "secondary", 
  icon, 
  onHoverChange,
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
    onHoverChange?.(true);
  }, [onHoverChange]);

  const handleMouseLeave = useCallback(() => {
    setTransform("translate3d(0,0,0)");
    setIsHovered(false);
    onHoverChange?.(false);
  }, [onHoverChange]);

  const handleClick = useCallback((e: React.MouseEvent) => {
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
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const mouseTimeoutRef = useRef<NodeJS.Timeout>();
  const lastMouseRef = useRef<MousePosition>({ x: 0, y: 0 });

  // Debounced mouse tracking (16ms = ~60fps)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
      
      if (mouseTimeoutRef.current) return;
      
      mouseTimeoutRef.current = setTimeout(() => {
        setMousePosition(lastMouseRef.current);
        mouseTimeoutRef.current = undefined;
      }, 16);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (mouseTimeoutRef.current) clearTimeout(mouseTimeoutRef.current);
    };
  }, []);

  const handleHoverChange = useCallback((hovering: boolean) => {
    setIsHovering(hovering);
  }, []);

  const links = useMemo(() => [
    { href: "https://github.com/Karan-Raj-KR", label: "GitHub", icon: <Github className="w-4 h-4" /> },
    { href: "https://linkedin.com/in/karanrajkr", label: "LinkedIn", icon: <Linkedin className="w-4 h-4" /> },
    { href: "https://instagram.com/karan.rajkr", label: "Instagram", icon: <Instagram className="w-4 h-4" /> },
    { href: "mailto:karanrajkr2008@gmail.com", label: "Contact Me", icon: <Mail className="w-4 h-4" /> },
  ], []);

  const projects = useMemo(() => [
    { name: "AI Agent Framework", icon: <Sparkles className="w-4 h-4" />, status: "Beta" },
    { name: "Open Source CLI Tools", icon: <Lock className="w-4 h-4" />, status: "Active" },
    { name: "Portfolio Redesign", icon: <Briefcase className="w-4 h-4" />, status: "Soon" },
  ], []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <style>{`
        @keyframes float-particle {
          0% { transform: translateY(110vh) translateX(0); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-10vh) translateX(20px); opacity: 0; }
        }
        @keyframes morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        @keyframes drift {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(30px, -20px); }
          50% { transform: translate(-20px, 30px); }
          75% { transform: translate(20px, 20px); }
        }
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
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
      
      <MorphingBlobs />
      <CSSParticles />
      
      <CustomCursor mousePosition={mousePosition} isHovering={isHovering} />

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
              <span className="bg-gradient-to-r from-purple-400 via-white to-blue-400 bg-clip-text text-transparent animate-gradient-x">
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
              onHoverChange={handleHoverChange}
            />
          </RevealSection>

          <RevealSection delay={400} className="space-y-3">
            {links.map((link) => (
              <TiltButton
                key={link.label}
                href={link.href}
                label={link.label}
                icon={link.icon}
                onHoverChange={handleHoverChange}
              />
            ))}
          </RevealSection>

          <RevealSection delay={550} className="pt-6">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4">
              <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Currently Building
              </h3>
              <div className="space-y-2">
                {projects.map((project) => (
                  <div 
                    key={project.name}
                    className="flex items-center justify-between group cursor-pointer py-1"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-white/40 group-hover:text-purple-400 transition-colors duration-200">
                        {project.icon}
                      </span>
                      <span className="text-sm text-white/70 group-hover:text-white transition-colors duration-200">
                        {project.name}
                      </span>
                    </div>
                    <span className="text-xs text-white/30">{project.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>

          <RevealSection delay={700} className="pt-6">
            <footer className="flex items-center justify-center gap-6">
              {useMemo(() => [
                { icon: <Github className="w-5 h-5" />, href: "https://github.com/Karan-Raj-KR" },
                { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com/in/karanrajkr" },
                { icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com/karan.rajkr" },
                { icon: <Mail className="w-5 h-5" />, href: "mailto:karanrajkr2008@gmail.com" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-all duration-200 hover:scale-125"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {item.icon}
                </a>
              )), [])}
            </footer>
            <p className="text-center text-xs text-white/20 mt-4">
              © {new Date().getFullYear()} Karan Raj
            </p>
          </RevealSection>
        </div>
      </main>
    </div>
  );
}