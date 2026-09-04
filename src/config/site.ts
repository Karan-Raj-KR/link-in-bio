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
  tagline: "I build software, experiment with AI, and ship real products.", // ⟵ PLACEHOLDER — your one-line pitch

  // --- Status / current focus (the pill at the top) ---
  status: "Currently building something new.", // ⟵ PLACEHOLDER — verbatim status text

  // --- Featured work: exactly 3, one line + live link ---
  featured: [
    { title: "Project One", blurb: "One line on what it is and why it matters.", href: "https://karanrajkr.com" }, // ⟵ PLACEHOLDER
    { title: "Project Two", blurb: "One line on what it is and why it matters.", href: "https://karanrajkr.com" }, // ⟵ PLACEHOLDER
    { title: "Project Three", blurb: "One line on what it is and why it matters.", href: "https://karanrajkr.com" }, // ⟵ PLACEHOLDER
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
  ctaSecondary: { label: "Get in touch", href: "mailto:karanrajkr2008@gmail.com" }, // ⟵ PLACEHOLDER email

  // --- Socials (rendered as small icons) ---
  socials: [
    { label: "GitHub", href: "https://github.com/Karan-Raj-KR", icon: "github" },
    { label: "LinkedIn", href: "https://linkedin.com/in/karanrajkr", icon: "linkedin" },
    { label: "Instagram", href: "https://instagram.com/karan.rajkr", icon: "instagram" },
  ] as { label: string; href: string; icon: "github" | "linkedin" | "instagram" | "mail" }[],

  // --- One memorable visual idea: the accent behind everything ---
  // Change this one value to re-tint the whole page (glow, links, CTA).
  accent: "#F59E0B", // amber. Try "#38BDF8" (sky) or "#A78BFA" (violet).
} as const;
