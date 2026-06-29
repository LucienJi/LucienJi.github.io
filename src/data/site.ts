/**
 * Monograph — Central site configuration.
 * ────────────────────────────────────────────────────────────────────────
 * This is the ONE file most edits start from. Masthead, Colophon, Hero,
 * ContactBlock and SEO all read from here. Replace every {PLACEHOLDER}.
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  /** Full name, used in <title>, hero, structured data. */
  name: string;
  /** Short wordmark shown in the masthead (often a surname or initials). */
  shortName: string;
  /** The one warm "thesis" sentence on the homepage hero. */
  tagline: string;
  /** A longer one-line description for SEO / meta. */
  description: string;
  role: string;
  field: string;
  university: string;
  universityUrl?: string;
  lab?: string;
  advisor?: string;
  advisorUrl?: string;
  location?: string;
  /** Honest status line (e.g. "Seeking summer 2026 internships"). "" hides it. */
  now: string;
  email: string;
  socials: {
    scholar?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    orcid?: string;
  };
  /** Path (under /public, base-aware) to the CV PDF. */
  cvPdf: string;
  /** Canonical production URL (set when you know your GitHub Pages URL). */
  url: string;
  nav: NavItem[];
  /** Feature flags — keep a section OFF until it has real content. */
  features: {
    notes: boolean;
    projects: boolean;
  };
}

/** Feature flags — keep a section OFF until it has real content. */
const features: SiteConfig["features"] = {
  notes: false, // flip to true once you write a note (src/content/notes/*.mdx)
  projects: true, // project deep-dives at /research/[slug]
};

export const site: SiteConfig = {
  name: "Jingtian Ji",
  shortName: "Jingtian Ji", // masthead wordmark
  tagline:
    "Robotics and machine learning — teaching robots to perceive, understand, and act in the real world.", // TODO: replace with your own one-line thesis
  description:
    "Jingtian Ji — PhD student in robotics and machine learning at the Toyota Technological Institute at Chicago (TTIC), advised by Matthew R. Walter.",
  role: "PhD Student",
  field: "Robotics · Machine Learning",
  university: "Toyota Technological Institute at Chicago",
  universityUrl: "https://www.ttic.edu/",
  lab: "Robot Intelligence through Perception Lab (RIPL)",
  advisor: "Matthew R. Walter",
  advisorUrl: "https://home.ttic.edu/~mwalter/",
  location: "Chicago, IL",
  now: "", // set a short status to show it on the hero (e.g. "Seeking summer 2026 internships")
  email: "jijingtian@ttic.edu",

  socials: {
    scholar: "https://scholar.google.com/citations?user=DeQM4Z4AAAAJ&hl=en",
    github: "https://github.com/LucienJi",
    // linkedin: "https://www.linkedin.com/in/...", // add when you have one
    // twitter: "https://x.com/...",
    // orcid: "https://orcid.org/0000-0000-0000-0000",
  },

  cvPdf: "/cv.pdf", // replace public/cv.pdf with your real CV
  url: "https://lucienji.github.io", // GitHub Pages user site

  nav: [
    { label: "Research", href: "/research" },
    { label: "CV", href: "/cv" },
    { label: "Photography", href: "/photography" },
    { label: "About", href: "/about" },
    ...(features.notes ? [{ label: "Notes", href: "/notes" }] : []),
  ],

  features,
};

export type Social = keyof SiteConfig["socials"];
