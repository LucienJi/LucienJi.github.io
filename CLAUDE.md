# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal website for a Robotics + Machine Learning PhD student — research, CV, a photography gallery, and an about page. Built with **Astro 7 (static output)**, deployed to **GitHub Pages**. The visual system is called **"Monograph"** and its full, authoritative spec lives in **`DESIGN.md`** at the repo root — read it before making design changes.

## Commands

```bash
npm run dev      # local dev server (http://localhost:4321)
npm run build    # production build to ./dist
npm run preview  # serve the built ./dist locally
npm run check    # astro check — type & diagnostic pass (run before committing)
```

There is no test suite; `npm run check` + `npm run build` are the gates. Node is installed via Homebrew (`/opt/homebrew/bin` on PATH).

## Architecture — the parts that span multiple files

**Content drives everything.** Pages are thin; almost all real data is content, not markup. The two editing surfaces are:
- `src/data/site.ts` — one central config (name, tagline, university, socials, CV path, nav, `features` flags). Consumed by `BaseLayout`, `Masthead`, `Colophon`, `Hero`, `ContactBlock`, SEO.
- `src/content/**` + `src/content.config.ts` — Astro **Content Layer** collections (`glob` loaders + Zod schemas): `publications`, `projects`, `timeline`, `series`, `photos`, `about`, `notes`. Adding a paper/photo/job = drop one file. The **homepage auto-curates** from entries marked `selected: true` (publications + photos) — there is no hand-maintained home content.

**Image pipeline (path-relative references).** Content references images by a path **relative to `src/assets/`** (e.g. `photography/northern-light/nl-01.jpg`, `projects/offline-rl/teaser.jpg`, `portraits/serious.jpg`); a unique bare filename also resolves. `src/lib/images.ts` builds the lookup via `import.meta.glob('/src/assets/**')` and `components/ResponsiveImage.astro` feeds astro:assets `<Picture>` (AVIF/WebP, responsive `widths`, zero-CLS box). Folder layout: `portraits/` (headshots), `photography/<series-id>/` (one per theme, matching a `series` entry id), `projects/<slug>/` (per-project images). `mustResolveImage` throws at build if a path is missing. **Videos are not optimized** — they live in `public/media/projects/<slug>/` (served verbatim) and are referenced by URL; `components/ProjectTeaser.astro` renders a self-hosted `<video>`, a YouTube/Vimeo embed, or the cover image, driven by a project's `teaserVideo` / `teaserPoster` / `cover`. Each media folder has its own `README.md`.

**Theming + view transitions are coupled — edit carefully.** `BaseLayout.astro` sets the theme before paint with an inline (`is:inline`) script reading `data-force-theme` → `localStorage` → `prefers-color-scheme`. `ClientRouter` (view transitions) is enabled globally, so a second bundled script re-applies the theme on `astro:after-swap`. The `/photography` routes pass `forceTheme="dark"` to `BaseLayout` (the gallery "plate" palette); `Masthead` then swaps the theme toggle for a static `§ PLATES` label. **Consequence for any interactive island:** initialize on `document.addEventListener('astro:page-load', …)` (fires on first load *and* after every client navigation) and make init idempotent (guard with a `dataset` flag). `DOMContentLoaded` alone will break after navigation. Existing islands that follow this: `ThemeToggle`, `Lightbox`, `Hero` (crossfade), `CopyBibTeX`, `Toast`, and the research filter.

**GitHub Pages base path.** Internal links and asset paths must be base-aware. Always wrap internal hrefs with `withBase()` from `src/lib/url.ts`. Foundation components that take a logical path (`CTAButton`, `Card`, `ContactBlock`, `Masthead`) call `withBase` internally — don't double-wrap. For a **project** Pages site (served from `/<repo>/`), set `base` in `astro.config.mjs` and `url` in `site.ts`; for a user/org site (`<user>.github.io`) keep `base: "/"`.

**Design tokens are the single source of truth.** `src/styles/tokens.css` defines all color/type/space/motion as CSS custom properties (light `:root` + `[data-theme="dark"]`); `src/styles/global.css` holds the reset, element defaults, layout utilities, and `.prose`. Components use `var(--…)` and these utility classes — **no hardcoded colors or magic-number spacing.** There is exactly **one** chromatic accent (cobalt); photographs supply all other color.

**Composition over bespoke markup.** `components/Card.astro` is a shared "chassis" (hairline frame + shadow + optional mono meta strip) that `PaperCard`, `PhotoPlate`, timeline rows, etc. compose. The "breathing measure" is done with three width utilities — `.wrap-read` (720px prose), `.wrap-wide` (1140px), `.full-bleed` (100vw images) — not a single rigid grid. Path aliases (`@layouts`, `@components`, `@lib`, `@data`, `@styles`) are configured in `tsconfig.json` and resolve in Astro.

## Conventions

- Photo `alt` is the only hard-required photo field; EXIF is optional frontmatter (auto-extraction via exifr was intentionally deferred).
- In author lists, bold the author whose string equals `site.name`.
- Gate unfinished sections behind `site.features.*` (e.g. `notes`) so the site never shows an empty area.
- Accessibility is a hard gate (WCAG AA): one `<h1>`/page, required alt, keyboard support, visible focus, and `prefers-reduced-motion` honored. The forced-dark gallery palette is AA-verified.

## Deployment

`.github/workflows/deploy.yml` builds with `withastro/action` and publishes `./dist` to GitHub Pages on push to `main` (enable Pages → "GitHub Actions" in repo settings). `public/.nojekyll` is required so `_astro/` assets are served.
