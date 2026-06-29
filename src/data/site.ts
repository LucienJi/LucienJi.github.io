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
  lab?: string;
  advisor?: string;
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
  name: "Your Name", // EDIT ME
  shortName: "Y. Name", // EDIT ME — masthead wordmark
  tagline:
    "I teach robots to learn from interaction — turning messy real-world data into behavior you can trust.", // EDIT ME
  description:
    "Robotics + Machine Learning PhD student. Research in robot learning, and a photographer.",
  role: "PhD Candidate",
  field: "Robot Learning · Machine Learning",
  university: "Your University", // EDIT ME
  lab: "Your Lab", // EDIT ME (optional)
  advisor: "Prof. Advisor Name", // EDIT ME (optional)
  location: "City, State", // EDIT ME (optional)
  now: "Seeking summer 2026 internships", // EDIT ME — or set to "" to hide
  email: "you@university.edu", // EDIT ME

  socials: {
    scholar: "https://scholar.google.com/citations?user=XXXX", // EDIT ME
    github: "https://github.com/yourhandle", // EDIT ME
    linkedin: "https://www.linkedin.com/in/yourhandle", // EDIT ME
    // twitter: "https://x.com/yourhandle",
    // orcid: "https://orcid.org/0000-0000-0000-0000",
  },

  cvPdf: "/cv.pdf", // place the file at public/cv.pdf
  url: "https://yourname.github.io", // EDIT ME once deployed

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
