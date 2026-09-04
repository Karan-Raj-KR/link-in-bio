// ============================================================
// EDIT EVERYTHING HERE. This is the only file you touch to
// change copy, links, status, featured work and the accent.
// Items marked  ⟵ PLACEHOLDER  are guesses — replace them.
// ============================================================

export const site = {
  // --- Identity ---
  name: "Karan Raj",
  // Avatar: "photo" uses /public/profile.jpeg, "initials" shows the letters below.
  avatar: "photo" as "photo" | "initials",
  initials: "KR",
  tagline: "Open source, hackathons, and software people pay for.",

  // --- Status / current focus (the pill at the top) ---
  status: "Registering my company.",

  // --- Featured work: one line + live link each. An empty href renders the
  //     card as shipped-but-unlinked (no dead link). ---
  featured: [
    {
      title: "crewai-recipes",
      blurb: "Open-source CrewAI multi-agent template library. MIT licensed, 9 forks, merged PRs from outside contributors.",
      href: "https://github.com/Karan-Raj-KR/crewai-recipes",
    },
    {
      title: "VoiceRx",
      blurb: "Voice health assistant. Built solo at HackBLR 2026 — Top 40 of 2,500+ teams.",
      href: "", // ⟵ AWAITING LINK — paste the VoiceRx URL here before deploy
    },
  ],

  // --- GitHub activity (contribution graph) ---
  github: {
    username: "Karan-Raj-KR",
    // The fine-grained PAT is read from the GITHUB_PAT env var (never commit it).
    // If the token is missing/invalid, the graph degrades to a link — page still ships.
    profileUrl: "https://github.com/Karan-Raj-KR",
  },

  // --- Calls to action ---
  ctaPrimary: { label: "Visit karanrajkr.com", href: "https://karanrajkr.com" }, // ⟵ confirm .com is live
  ctaSecondary: { label: "Get in touch", href: "mailto:mail@karanrajkr.com" }, // switch to gmail if this inbox isn't live yet

  // --- Socials (rendered as small icons) ---
  socials: [
    { label: "GitHub", href: "https://github.com/Karan-Raj-KR", icon: "github" },
    { label: "LinkedIn", href: "https://linkedin.com/in/karanrajkr", icon: "linkedin" },
    { label: "Instagram", href: "https://instagram.com/karan.rajkr", icon: "instagram" },
  ] as { label: string; href: string; icon: "github" | "linkedin" | "instagram" | "mail" }[],

  // --- One memorable visual idea: the accent behind everything ---
  // Change this one value to re-tint the whole page (glow, links, CTA).
  accent: "#38BDF8", // sky blue. Try "#F59E0B" (amber) or "#A78BFA" (violet).
} as const;
