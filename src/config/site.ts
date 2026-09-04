// ============================================================
// bio.karanrajkr.com — Configuration
// ============================================================

export interface SiteLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "instagram" | "mail";
}

export interface ProofItem {
  title: string;
  description: string;
  href: string;
}

export const site = {
  // Identity & Monogram
  name: "Karan Raj",
  title: "Developer • Builder • Founder",
  initials: "KR",
  tagline: "Open source, hackathons, and software people pay for.",

  // Status pill under title
  status: "Registering my company.",

  // Headline
  headline: {
    line1: "From ideas to",
    highlight: "real products.",
    subtext: "Open source, hackathons, and software people pay for.",
  },

  // Primary CTA
  portfolio: {
    label: "View Portfolio",
    href: "https://karanrajkr.com",
  },

  // 2x2 Social Grid
  links: [
    { label: "GitHub", href: "https://github.com/Karan-Raj-KR", icon: "github" },
    { label: "LinkedIn", href: "https://linkedin.com/in/karanrajkr", icon: "linkedin" },
    { label: "Instagram", href: "https://instagram.com/karan.rajkr", icon: "instagram" },
    { label: "Contact Me", href: "mailto:karanrajkr2008@gmail.com", icon: "mail" },
  ] as SiteLink[],

  // Readable Proof Line above footer
  proof: {
    title: "crewai-recipes",
    description: "open-source CrewAI templates, 9 forks",
    href: "https://github.com/Karan-Raj-KR/crewai-recipes",
  },
} as const;
