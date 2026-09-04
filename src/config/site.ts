// ============================================================
// bio.karanrajkr.com — Configuration
// Status pill, links, identity, and proof element in ONE place.
// ============================================================

export interface BioLink {
  label: string;
  href: string;
}

export interface ProofItem {
  title: string;
  description: string;
  href: string;
}

export const site = {
  // 1. Identity
  name: "Karan Raj",
  avatar: "/profile.jpeg", // Path to avatar in /public
  initials: "KR",
  tagline: "Building software, open source, and hackathons.",

  // 2. Status pill
  status: "Registering my company.",

  // 3. Links (rendered with equal visual weight)
  links: [
    { label: "karanrajkr.com", href: "https://karanrajkr.com" },
    { label: "GitHub", href: "https://github.com/Karan-Raj-KR" },
    { label: "LinkedIn", href: "https://linkedin.com/in/karanrajkr" },
    { label: "Instagram", href: "https://instagram.com/karan.rajkr" },
    { label: "Email", href: "mailto:mail@karanrajkr.com" },
  ] as BioLink[],

  // 4. One proof element (small, below the links)
  proof: {
    title: "crewai-recipes",
    description: "open-source CrewAI templates, 9 forks",
    href: "https://github.com/Karan-Raj-KR/crewai-recipes",
  } as ProofItem,
} as const;
