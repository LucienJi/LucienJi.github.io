/**
 * Monograph — Content collections (Astro Content Layer API).
 * Add a paper / photo / job = drop a file in the matching folder. Only photo
 * `alt` is hard-required. See DESIGN.md §11 for the full content model.
 */
import { defineCollection } from "astro:content";
import { z } from "zod";
import { glob } from "astro/loaders";

const linksSchema = z
  .object({
    pdf: z.string().optional(),
    arxiv: z.string().optional(),
    code: z.string().optional(),
    project: z.string().optional(),
    bibtex: z.string().optional(),
    website: z.string().optional(),
    video: z.string().optional(),
  })
  .partial()
  .optional();

const publications = defineCollection({
  loader: glob({ pattern: "**/*.{yaml,yml,json}", base: "./src/content/publications" }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    year: z.number(),
    type: z
      .enum(["conference", "journal", "workshop", "preprint", "thesis"])
      .default("conference"),
    links: linksSchema,
    oneLiner: z.string().optional(), // plain-language margin summary
    tags: z.array(z.string()).default([]),
    teaser: z.string().optional(), // image basename in src/assets/**
    award: z.string().optional(),
    selected: z.boolean().default(false), // surfaces on the homepage
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number(),
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
    links: linksSchema,
    selected: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const timeline = defineCollection({
  loader: glob({ pattern: "**/*.{yaml,yml,json}", base: "./src/content/timeline" }),
  schema: z.object({
    role: z.string(),
    org: z.string(),
    location: z.string().optional(),
    start: z.string(), // "2024" or "2024-06"
    end: z.string().optional(), // omit for "Present"
    type: z.enum(["education", "industry", "service", "award"]),
    summary: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const series = defineCollection({
  loader: glob({ pattern: "**/*.{yaml,yml,md,mdx}", base: "./src/content/series" }),
  schema: z.object({
    title: z.string(),
    roman: z.string(), // "I", "II", ...
    intro: z.string().optional(),
    cover: z.string(), // image basename
    location: z.string().optional(),
    year: z.number().optional(),
    order: z.number().default(0),
  }),
});

const photos = defineCollection({
  loader: glob({ pattern: "**/*.{yaml,yml,json}", base: "./src/content/photos" }),
  schema: z.object({
    src: z.string(), // image basename in src/assets/**
    alt: z.string(), // REQUIRED — never auto-derived
    caption: z.string().optional(),
    location: z.string().optional(),
    year: z.number().optional(),
    series: z.string().optional(), // series id (filename) it belongs to
    order: z.number().default(0),
    exif: z
      .object({
        camera: z.string().optional(),
        lens: z.string().optional(),
        focal: z.string().optional(), // "35mm"
        shutter: z.string().optional(), // "1/125s"
        aperture: z.string().optional(), // "f/2.8"
        iso: z.string().optional(), // "ISO 400"
      })
      .optional(),
    aspect: z.number().optional(), // width/height override; else from the file
    span: z.enum(["single", "wide", "full"]).default("single"),
    selected: z.boolean().default(false), // surfaces on the homepage strip
  }),
});

const about = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/about" }),
  schema: z.object({
    title: z.string().default("About"),
    portrait: z.string().optional(), // image basename
    interests: z
      .array(z.object({ label: z.string(), note: z.string() }))
      .default([]),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notes" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  publications,
  projects,
  timeline,
  series,
  photos,
  about,
  notes,
};
