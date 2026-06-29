# Monograph — Final Design Specification

> A personal homepage for a Robotics + Machine Learning PhD student that makes **research credibility** and **photography** shine *at once*, by treating the whole site as a single *monograph*: a single-author scholarly study **and** a single-photographer photo-book, bound under one editorial discipline.

This document is implementation-ready. Build it with **Astro 7 (static)**, deploy to **GitHub Pages**. Content lives in **Markdown/MDX content collections** plus one central **`src/data/site.ts`**. A non-designer updates the site by editing frontmatter and dropping files in folders.

---

## 0. How this spec was decided (base + grafts)

**Base direction: "Monograph."** It won first place on 2 of 3 jury scorecards and tied first on the third. It scores highest on the brief's non-negotiable axes — academic credibility, accessibility, implementability — and solves the central challenge *structurally* (one accent hands all color to photographs; the reading measure "breathes" from a tight column to full-bleed so the scientist and artist modes never compete).

The following jury-highlighted ideas are **grafted in** (each cited by ≥2 jurors) and fully resolved into this one system:

| Graft | From | Decision |
|---|---|---|
| Dark "Plate Section" mode for photography | Rubric | **Adopt.** `/photography` + lightbox always render on the warm-charcoal palette so prints glow on gallery walls. |
| Shared card-grammar primitive | Field & Frame | **Adopt.** One `Card` chassis (hairline frame + soft shadow + mono metadata strip) powers paper cards *and* photo plates. |
| Same mono-metadata grammar for papers AND photos | REFERENCE FRAME | **Adopt the principle only.** Venue/year and place/year/EXIF share one mono voice. |
| Photo-essay editorial spreads (not a uniform grid) | Plate & Proof | **Adopt.** Series = intro + aspect-respecting diptychs/clusters. |
| Dual hero CTAs ("Read the research" / "See the photographs") | Plate & Proof | **Adopt.** |
| Numbered plates ("Plate IV") + real Colophon footer | Rubric | **Adopt.** |
| Richer marginalia (plain-language one-liners, "editor's notes") | Rubric | **Adopt** in the left margin rail. |
| Honest "NOW — seeking 2026 internships" status line | REFERENCE FRAME | **Adopt** (real data only). |
| Copy-BibTeX button + "copied" toast | Field & Frame | **Adopt** on research. |
| Pure-white mat for any photo shown over warm paper | Rubric | **Adopt** (color fidelity). |
| "Two ways of seeing" bridge (figure + photo, identical frames) | Plate & Proof / Field & Frame | **Adopt** as one home module. |
| Full-bleed photographic section dividers | Plate & Proof | **Adopt** (sparingly). |
| Build-time EXIF auto-extraction with frontmatter fallback | REFERENCE FRAME / Field & Frame | **Adopt cautiously** (`exifr`, optional, never blocks build; `alt` always required). |

**Explicitly REJECTED (resolved contradictions):**

- **No reticles / bounding-boxes / EXIF telemetry drawn ON the photographs.** Juror 1 floated an AF-box hero delight; Jurors 2 & 3 warned it defaces the art and turns a fine photograph into a CV detection demo. **Decision: photographs are always shown as clean matted prints.** The "where perception research meets photography" idea is carried *instead* by the shared mono-metadata grammar, the shared card chassis, and the "Two ways of seeing" bridge.
- **No operator-console costume:** no boot sequence, no live clock, no scan-sweep, no crosshair cursor (REFERENCE FRAME). Adopt only its *honest-data principle*.
- **No second accent color.** One accent (Cobalt). Reject cinnabar/terracotta/teal as additional accents — photographs supply 100% of the site's warm color.
- **No typewriter effects, no aperture-animation toggle** (Field & Frame). The theme toggle is a quiet cross-fade.
- **Hero is research-led, not co-equal.** Research leads in reading order; photography is one explicit click away via the second CTA (hedges the "hobbyist" read flagged for co-equal heroes).

---

## 1. Design philosophy

1. **One body of work, one discipline.** Research and photography are two *sections of one monograph*, not two personalities. They are unified by (a) a single warm-neutral palette, (b) one mono-metadata voice (venue/year ≡ place/year/EXIF), and (c) one shared card chassis.
2. **The measure breathes.** Prose lives in a tight ~720px reading column; images break out to full-bleed. The page literally *widens for pictures and contracts for reading* — the change in measure is the cue that you've crossed from scientist to artist. This is the loudest "motion" on the site.
3. **Photographs supply the color.** The UI is warm paper + warm ink + exactly one Cobalt accent reserved for interaction. The accent can never out-shout an image.
4. **Mode-shift for the gallery.** The photography section flips to a warm-charcoal "plate section" so prints glow on dark gallery walls instead of fighting ivory chrome.
5. **Restraint is the flex.** Type-forward, content-first, instantly trusted by an ML/robotics audience. Speak their native visual language (mono `§01`, `Fig. 03`, venue tags) without gimmickry.
6. **Fast, accessible, maintainable by design.** Static Astro on GitHub Pages; WCAG AA; full keyboard nav; mobile-first; everything edits via content collections + one config file.

---

## 2. Color system

Warm-tinted paper/ink (never pure `#FFF`/`#000`) is the brand signature. **One** chromatic accent: Cobalt. All pairs meet WCAG AA (≥4.5:1 body, ≥3:1 large/UI). Implement as CSS custom properties; switch by `:root` / `[data-theme="dark"]`.

### 2.1 Light theme — "Paper" (default, respects `prefers-color-scheme`)

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#FBFBF9` | Page background (warm near-white book stock) |
| `--surface` | `#FFFFFF` | Raised cards / image mats (one step brighter than paper) |
| `--ink` | `#1A1A17` | Primary text — warm near-black (~15:1 on paper) |
| `--muted` | `#57564F` | Secondary / de-emphasised text (~7:1) |
| `--faint` | `#737067` | Captions, metadata, tertiary (~4.8:1) |
| `--line` | `#E6E5DE` | 1px hairlines, section rules, image frames |
| `--accent` | `#2E4FD4` | **Cobalt** — links, focus ring, active underline, eyebrows, small icons (~6:1) |
| `--accent-press` | `#2038B0` | Hover/active darker state |
| `--accent-soft` | `#EAEEFC` | Accent tint for hover backgrounds / active nav |
| `--mat` | `#FFFFFF` | Pure-white photo mat (color fidelity over warm paper) |
| `--focus` | `#2E4FD4` | Focus ring (2px solid, 2px offset) |

### 2.2 Dark theme — "Nocturne" (also the **Plate / gallery** palette)

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#141413` | Page background — warm charcoal (deliberately not pure black) |
| `--surface` | `#1D1D1B` | Raised cards / image mats |
| `--ink` | `#ECEAE2` | Primary text — warm off-white (~14:1) |
| `--muted` | `#A4A299` | Secondary text |
| `--faint` | `#83817A` | Captions, metadata |
| `--line` | `#2C2C28` | Hairlines / image frames |
| `--accent` | `#93A8FF` | Cobalt (dark) — links, focus, underline (~7:1 on `--paper`) |
| `--accent-press` | `#B7C4FF` | Hover/active lighter state |
| `--accent-soft` | `#1B2340` | Accent tint backgrounds |
| `--mat` | `#0E0E0D` | Near-black photo mat so prints glow |
| `--focus` | `#93A8FF` | Focus ring |

### 2.3 Shared (theme-independent)

| Token | Value | Role |
|---|---|---|
| `--lightbox-backdrop` | `rgba(10, 10, 9, 0.97)` | Lightbox dim (always dark, both themes) |
| `--shadow-card` | `0 1px 2px rgba(20,20,18,.04), 0 6px 20px rgba(20,20,18,.06)` | Soft card lift (light) |
| `--shadow-card-dark` | `0 1px 2px rgba(0,0,0,.3), 0 8px 24px rgba(0,0,0,.35)` | Card lift (dark/plate) |

### 2.4 Contrast verification (must hold after any tweak)

| Pair | Ratio | Standard |
|---|---|---|
| `--ink` on `--paper` (light) | ~15:1 | AAA |
| `--muted` on `--paper` (light) | ~7:1 | AA body |
| `--faint` on `--paper` (light) | ~4.7-4.8:1 | AA body (borderline — never go lighter) |
| `--accent` on `--paper` (light) | ~6:1 | AA body |
| `--ink` on `--paper` (dark) | ~14:1 | AAA |
| `--muted` on `--paper` (dark) | ~7:1 | AA body |
| `--accent` on `--paper` (dark) | ~7:1 | AA body |

> **Rule:** Any *new* color pairing introduced by an implementer must be re-checked to AA before merge.

---

## 3. Typography

Three families, three crisp roles. Discipline protects the "fast" goal (per jury): **self-host subset variable WOFF2, preload only the two primary faces, `font-display: swap`, cap weights**.

### 3.1 Families & roles

| Family | Role | Weights | Notes |
|---|---|---|---|
| **Newsreader** (variable, optical) | The *voice* — name/hero, ALL headings, long-form prose (bio, abstracts, notes), blockquotes, photo captions (italic) | 400, 500, 600; italic 400 | Carries scholarship + "monograph/book" feel. Optical sizing ON; large `opsz` on display. |
| **IBM Plex Mono** | The *instrument* — section numbers (`§01`), venue tags, dates, figure/plate labels (`Fig. 03`, `Plate IV`), eyebrows, nav, buttons, EXIF, footer | 400, 500 | UPPERCASE with 0.08–0.12em tracking at small sizes. Reads as code / lab-notebook / arXiv. |
| **Inter** (variable) | Quiet *utility* only — dense tables, fine print, form fields | 400, 500 | The least-seen face; never used for headings or prose. |

**Delivery:** Preload **Newsreader** + **IBM Plex Mono** only. Load Inter normally. Self-host via Fontsource (`@fontsource-variable/newsreader`, `@fontsource/ibm-plex-mono`, `@fontsource-variable/inter`) or download the subset WOFF2 from the Google Fonts CSS2 URLs in §13. Subset to Latin. Target total font payload **< 100 KB**.

**Font stacks (CSS variables):**
```css
--font-serif: "Newsreader", Georgia, "Times New Roman", serif;
--font-mono:  "IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace;
--font-sans:  "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
```

### 3.2 Type scale (fluid, mobile-first; root = 16px, body = 18px)

Base body 18px at leading 1.7; modular ratio ~1.25 (mobile) → ~1.333 (desktop) via `clamp()`.

| Role | Size | Line-height | Family / weight | Tracking |
|---|---|---|---|---|
| Display (name / hero) | `clamp(2.5rem, 6vw, 4.5rem)` | 1.05 | Newsreader 500 | -0.01em |
| H1 (page title) | `clamp(2rem, 4vw, 3rem)` | 1.1 | Newsreader 500 | -0.005em |
| H2 (section) | `clamp(1.5rem, 2.5vw, 2rem)` | 1.15 | Newsreader 600 | 0 |
| H3 | `1.25rem` (20px) | 1.3 | Newsreader 600 | 0 |
| Lede / standfirst | `1.25rem` (20px) | 1.6 | Newsreader 400 | 0 |
| Body (prose) | `1.125rem` (18px) | 1.7 | Newsreader 400 | 0 |
| Body (UI / dense) | `1rem` (16px) | 1.6 | Inter 400 | 0 |
| Caption | `0.9375rem` (15px) | 1.5 | Newsreader italic 400 | 0 |
| Meta (mono) | `0.8125rem` (13px) | 1.4 | IBM Plex Mono 400 | 0.04em |
| Eyebrow / label (mono) | `0.75rem` (12px) | 1.3 | IBM Plex Mono 500, UPPERCASE | 0.1em |
| Small / fine (Inter) | `0.875rem` (14px) | 1.5 | Inter 400 | 0 |

### 3.3 Measure & rhythm

- **Prose capped at 65–72ch (~720px).** Metadata lives in the margin rail, not inline.
- Headings may run wider (to ~30ch) for tension against the body.
- OpenType: old-style figures in prose; tabular figures in the CV timeline.

---

## 4. Spacing & sizing scale

8px spatial unit, 4px half-step. Tokens (use everywhere; no magic numbers):

| Token | px | rem |
|---|---|---|
| `--space-1` | 4 | 0.25rem |
| `--space-2` | 8 | 0.5rem |
| `--space-3` | 12 | 0.75rem |
| `--space-4` | 16 | 1rem |
| `--space-6` | 24 | 1.5rem |
| `--space-8` | 32 | 2rem |
| `--space-12` | 48 | 3rem |
| `--space-16` | 64 | 4rem |
| `--space-24` | 96 | 6rem |
| `--space-32` | 128 | 8rem |

- **Section vertical rhythm:** `clamp(64px, 10vw, 128px)` (mobile 64 → desktop 96–128). Sections separated by a 1px `--line` hairline + a mono `§`-marker.
- **Card padding:** 24px desktop / 16px mobile.
- **Radius:** `--radius: 2px` (hairline-era restraint; near-square). Photo mats and buttons share it.
- **Hairline:** always `1px solid var(--line)`.

---

## 5. Layout & grid

### 5.1 Three container widths — the "breathing" device (core idea)

| Container | Max width | Used by |
|---|---|---|
| `--measure-read` | **720px** (~65–72ch) | Prose: bio, abstracts, research statement, notes, project body |
| `--measure-wide` | **1140px** | Home overview, research list, CV, photo-essay index |
| Full-bleed | **100vw** | Photography plates, full-bleed section dividers, lightbox |

### 5.2 Margin-notes grid (desktop ≥1024px)

Two tracks borrowed from scholarly typesetting (Tufte / Distill margins):

```css
.spread {
  display: grid;
  grid-template-columns:
    [rail-start] minmax(160px, 200px) [rail-end]
    var(--space-12)                                 /* 48px gap */
    [main-start] minmax(0, var(--measure-read)) [main-end];
}
/* Left rail = mono marginalia: §-number, label, date, venue,
   plain-language one-liners, cobalt "editor's notes".
   Main = content. */
```

**Full-bleed breakout** inside a constrained page uses the content-grid pattern:

```css
.content-grid {
  display: grid;
  grid-template-columns:
    [full-start] minmax(var(--space-6), 1fr)
    [wide-start] minmax(0, calc((1140px - 720px) / 2))
    [read-start] min(720px, 100% - 2*var(--space-6)) [read-end]
    minmax(0, calc((1140px - 720px) / 2)) [wide-end]
    minmax(var(--space-6), 1fr) [full-end];
}
.content-grid > *            { grid-column: read-start / read-end; } /* default: reading column */
.content-grid > .wide        { grid-column: wide-start / wide-end; }
.content-grid > .full-bleed  { grid-column: full-start / full-end; }
```

### 5.3 Mobile (< 1024px)

Single column. Margin-rail labels **stack above** their content as inline mono kickers. Bleeds stay edge-to-edge. Whitespace is treated as a primary material.

### 5.4 Page chrome

- **Masthead** (top): wordmark left (mono small-caps), nav + theme toggle right, 1px rule beneath. Sticky is OPTIONAL; default static.
- **Colophon footer** (every page): name, email, social links, theme toggle, and the print-craft line: `Set in Newsreader & IBM Plex Mono · Built with Astro · Last revised {DATE}`.

---

## 6. Component inventory & guidance

> All interactive components: visible 2px focus ring (`--focus`, 2px offset), `:focus-visible` parity with `:hover`, ≥24px (ideally 44px) touch target, no color-only meaning.

1. **`BaseLayout.astro`** — `<html>` shell; inline no-flash theme script (sets `data-theme` before paint from `localStorage` → else `prefers-color-scheme`; honors `data-force-theme` on photography routes); `<head>` SEO/OG; font preloads; skip-link; renders Masthead + `<slot/>` + Colophon. Wraps content in `.content-grid`.
2. **`Masthead.astro`** — wordmark (mono small-caps `{NAME}`), nav (`Research · CV · Photography · About`), `ThemeToggle`. On photography routes the toggle is replaced by a static mono label `§ PLATES — gallery dark`.
3. **`Colophon.astro`** (footer) — links from `site.ts`; `Last revised` from build date or frontmatter.
4. **`ThemeToggle.astro`** — sun/moon button; `aria-pressed`; toggles `data-theme` + persists to `localStorage`; cross-fades via CSS-variable transition (~200ms). Hidden where `data-force-theme` is set.
5. **`SkipLink.astro`** — "Skip to content" → `#main`; visible on focus.
6. **`SectionMarker.astro`** — mono `§NN` + UPPERCASE label + hairline rule; precedes each major section. Props: `number`, `label`.
7. **`Eyebrow.astro`** — mono UPPERCASE cobalt kicker (e.g. `§ ROBOT LEARNING · MACHINE LEARNING`).
8. **`MarginRail.astro` / `Sidenote.astro`** — renders into the left rail on desktop; collapses to an inline tappable footnote toggle (`number ⊕` reveals note in flow) below 1024px. Carries dates, venues, one-liners, editor's notes.
9. **`Card.astro`** — **the shared chassis.** 1px `--line` frame, `--radius`, soft shadow, optional mono metadata strip. Slots: `media`, `body`, `meta`. PaperCard, PhotoPlate, ProjectCard, TimelineEntry all compose this. *Same chassis, different cargo.*
10. **`PaperCard.astro`** — title (Newsreader), authors (self **bold**), venue+year (mono `VenueBadge`), optional teaser figure, optional award badge, plain-language one-liner (margin), link row: `PDF · arXiv · Code · Project · BibTeX`.
11. **`VenueBadge.astro` / `Tag.astro`** — mono chip; cobalt on `--accent-soft` when active (filters).
12. **`CopyBibTeX.astro`** — button copies BibTeX to clipboard → `Toast` "Copied ✓"; `aria-live="polite"`.
13. **`Toast.astro`** — transient confirmation, polite live region, auto-dismiss ~2s.
14. **`PhotoPlate.astro`** — `ResponsiveImage` on a mat (`--mat`) inside a 1px keyline frame; mono caption (`Plate IV — {place}, {year}`) + optional EXIF marginalia. Click opens `Lightbox`. Hover/focus: 2px lift + softened shadow (no overlay drawn on the photo).
15. **`ResponsiveImage.astro`** — wraps astro:assets `<Image>`; enforces explicit `width`/`height` (aspect-ratio box, zero CLS), AVIF+WebP srcset, LQIP blur-up placeholder, `loading="lazy"` below fold / `eager` + `fetchpriority="high"` for hero/LCP. **`alt` is a required prop.**
16. **`Gallery.astro`** — justified-rows layout honoring true aspect ratios (Lightroom-style) for a series, OR the essay composer (below).
17. **`PhotoEssay.astro` / `SeriesSpread.astro`** — series header (roman numeral + title + intro paragraph + mono meta: location · year · frame count), then an aspect-respecting sequence of full-bleed singles, 2-up diptychs, and small clusters driven by per-image `span`/`aspect`.
18. **`Lightbox.astro`** — full-screen on `--lightbox-backdrop` (always dark); image fills viewport; mono caption + counter (`04 / 28`) pinned bottom-left; `← → Esc` keys; **focus-trapped**, `role="dialog"` `aria-modal="true"`, labelled; restores focus to the trigger on close. FLIP scale+opacity from thumbnail via View Transitions.
19. **`Hero.astro`** (home) — see §7.1.
20. **`TwoWaysOfSeeing.astro`** — bridge module: one research figure beside one photograph in **identical** keyline frames, with the *same* mono caption grammar; one line of copy ("Two ways of seeing the same world.").
21. **`FullBleedDivider.astro`** — a single full-bleed photographic band used as a section divider (sparingly: home + research only). Caption optional, mono, bottom-left.
22. **`Timeline.astro` / `TimelineEntry.astro`** — vertical timeline; mono dates (tabular figures) in the margin rail; role (Newsreader) + org + location + one-line summary; grouped Education / Industry / Service / Awards.
23. **`ContactBlock.astro`** — Email · Google Scholar · GitHub · LinkedIn · CV (PDF), each a mono link with cobalt underline-on-hover; pulls from `site.ts`. Includes inline SVG social icons (no icon font).
24. **`NowStatus.astro`** — honest one-line status from `site.ts` (e.g. `NOW — Seeking summer 2026 internships`); small cobalt dot + mono text. **Real data only; never fake.**
25. **`CTAButton.astro`** — `variant="primary"` (cobalt fill, `--surface` text) or `variant="ghost"` (1px frame, ink text). Used for the dual hero CTAs and `Download CV (PDF)`.
26. **`TableOfContents.astro`** (home) — numbered, leader-dotted list of sections (mono `01 / 02 / 03`) with tiny preview thumbnails. Optional.
27. **`Prose.astro`** — `.prose` wrapper for MDX (sets measure 720px, serif body, link styling, drop-cap option for bio/notes).

---

## 7. Page-by-page layouts

> Placeholders (`{NAME}`, `{UNIVERSITY}`, `{LAB}`, `{ADVISOR}`, thesis line, NOW line, socials) all resolve from `src/data/site.ts`.

### 7.1 `/` — Home (Title Page)

Purpose: 60-second orientation for advisors, collaborators, recruiters; routes to depth.

1. **Masthead** — hairline bar: wordmark `{NAME}` (mono small-caps) left; nav + theme toggle right; 1px rule.
2. **Hero** (calm field of whitespace, flush-left):
   - Mono cobalt **Eyebrow**: `§ ROBOT LEARNING · MACHINE LEARNING — PhD CANDIDATE, {UNIVERSITY}`
   - **Name** in Newsreader 500 at display size, tight 1.05 leading.
   - **Thesis** — two lines of Newsreader (the only truly "warm" line): e.g. *"I teach robots to learn from interaction — turning messy real-world data into behavior you can trust."*
   - **`NowStatus`** line (honest): `NOW — Seeking summer 2026 internships`.
   - **Dual CTAs:** `Read the research →` (primary cobalt) · `See the photographs →` (ghost). Below them, a mono link row: `Email · Scholar · GitHub · LinkedIn · CV ↧` (cobalt underline draws on hover/focus).
   - **Hero plate** (right on desktop / below on mobile): ONE matted photograph — pure-white `--mat`, 1px keyline frame, mono caption `Fig. 01 — {place}, {year}`. Cross-fades through ~3 `selected` plates every ~6s; **frozen** under `prefers-reduced-motion`. *No overlays on the image.*
3. **`§01 — SELECTED RESEARCH`** — 3–4 `PaperCard`s (from `selected: true`), each with a margin one-liner. Ends with `All publications →`.
4. **`TwoWaysOfSeeing`** bridge — research figure | photograph in identical frames.
5. **`FullBleedDivider`** — one photographic band.
6. **`§02 — SELECTED PHOTOGRAPHS`** — curated full-bleed scroll-snap strip (~6 `selected` plates) + `View all photographs →`. Keeps the home calm.
7. **`§03 — ABOUT`** — short bio teaser (2–3 sentences) + `ContactBlock` + `Read more about me →`.
8. **Colophon** footer.

Content model: auto-curates from `selected: true` entries in `publications` + `photos` plus `site.ts`. Refreshing the home needs **no bespoke editing**.

### 7.2 `/research` — Research (The Record)

Purpose: establish credibility with a complete, scannable body of work.

- Short **research-statement lede** (reading column).
- Optional **Research themes** (2–4 areas, one diagram each).
- **Publications grouped by year** (newest first; year as a large mono folio in the rail). Each row = `PaperCard`: title (serif), authors (self **bold**), venue+year (mono badge), margin one-liner, links `PDF · arXiv · Code · Project · BibTeX` (BibTeX = `CopyBibTeX`), optional award badge.
- **Selected / All** toggle; mono **tag** filters (robot learning, manipulation, RL, perception).

Content model: `src/content/publications/*.yaml`. Add a paper = append one entry.

### 7.3 `/research/[slug]` — Project deep-dive (optional)

Purpose: deep-dive a flagship project. Reads like a mini paper page: teaser figure, abstract, method figures (mono `Fig. N`), results, BibTeX block, links. Reading column for prose; figures may go `wide`/`full-bleed`.

Content model: `src/content/projects/[slug].mdx` (full MDX so figures/captions/embeds are authored inline).

### 7.4 `/cv` — CV / Experience

Purpose: timeline of education, internships, employment + downloadable CV.

- **`Timeline`**: mono dates in margin rail; sections Education / Industry & Internships / Service & Teaching / Awards.
- Prominent **`Download CV (PDF)`** `CTAButton`.
- Optional skills/tools line (mono tags).

Content model: `src/content/timeline/*.yaml`. CV PDF in `/public`, path in `site.ts`.

### 7.5 `/photography` — Photography (Plates index) — **forced dark "Plate" mode**

Purpose: the artist side, as an exhibition / photo-book. **This route always renders on the Nocturne palette** regardless of the global theme (gallery walls). Toggle replaced by `§ PLATES — gallery dark`.

- Index of **series as essays** (`PhotoEssay` headers): roman numeral + title (e.g. `I — Northern Light`), one-line intent paragraph, mono meta (location · year · frame count), then an **aspect-respecting mosaic** (mix of full-bleed singles, diptychs, small clusters — never a uniform tile dump).
- Each plate: near-black `--mat`, 1px keyline, italic-serif + mono caption. Click → `Lightbox`.

Content model: `src/content/series/*` + `src/content/photos/*`.

### 7.6 `/photography/[series]` — Photo essay — **forced dark**

Purpose: immersive single-series gallery like a printed portfolio.

- Full-bleed **hero plate**; art-directed sequence of singles/diptychs/clusters honoring each image's aspect; mono plate captions (`Plate IV — Kyoto, 2024`) + optional EXIF marginalia (`35mm · 1/125s · f/2.8 · ISO 400`); keyboard `Lightbox`.

### 7.7 `/about` — About (Author's Note + contact hub)

Purpose: personality + the human; the contact hub.

- Framed **portrait** plate (pure-white mat, keyline).
- Longer **first-person bio** in Newsreader prose (reading column), optional 3-line cobalt **drop cap**.
- **Interests / Hobbies** list (mono labels + short serif lines; optional small line-icons).
- **`ContactBlock`** — Email, Google Scholar, GitHub, LinkedIn, CV — mono links from `site.ts`.

Content model: `src/content/about.mdx` for prose; socials from `site.ts` (identical to footer).

### 7.8 `/notes` — Notes / Writing (optional, feature-flagged OFF)

Reverse-chron list (mono date + serif title); posts render in the 720px reading column. Flag in `site.ts` (`features.notes`) keeps it OFF until there's content so the site never looks empty.

### 7.9 `/404`

Minimal, on-brand: mono `§ 404 — PAGE NOT FOUND`, one serif line, link home. No gimmicks.

---

## 8. Photography gallery treatment (the central-challenge solution)

1. **Mode-shift.** `/photography` + `/photography/[series]` + the lightbox render on the warm-charcoal **Nocturne** palette in both global themes, so prints glow on gallery walls and never fight ivory chrome. (Set `data-force-theme="dark"` on `<html>` for these routes; restore the user's theme on navigation away.)
2. **Editorial sequencing, not a grid.** Work is grouped into **named series** and composed as **photo-essays** (intro + aspect-respecting diptychs/clusters). Curation is mandatory — an uncurated dump breaks both the photo-book concept and the calm.
3. **Every image is a hung print.** Each plate sits on a mat (`--mat`) inside a 1px keyline frame. Over warm paper (home hero, teaser strip) the mat is **pure white** for color fidelity; in plate mode it is **near-black** so prints glow. **No reticles, boxes, or telemetry are ever drawn on a photograph.**
4. **Mono caption grammar (the unifier).** Captions use the *same* mono voice as research metadata: `Plate IV — Kyoto, 2024` and optional EXIF `35mm · 1/125s · f/2.8 · ISO 400`. This is what makes a photo's metadata rhyme with a paper's venue/year — the "one instrument" effect — **without** any HUD costume.
5. **Lightbox.** Full-screen on `--lightbox-backdrop`; image fills viewport; mono caption + counter (`04 / 28`) bottom-left; `←/→/Esc`; focus-trapped, `aria-modal`, screen-reader labelled; restores focus on close; FLIP morph from the thumbnail.
6. **Homepage stays calm.** Only a curated strip of ~6 `selected: true` plates (scroll-snap full-bleed) appears, with `View all photographs →`.
7. **Performance.** astro:assets + sharp emit responsive **AVIF/WebP** srcsets at build time; explicit aspect-ratio boxes + **LQIP blur-up** → zero CLS; lazy-load below the fold; preload only the hero plate.
8. **EXIF pipeline (optional, non-blocking).** Add `exifr` as a dev dependency; at build, read camera/lens/focal/shutter/ISO/date from the file and merge under any frontmatter values (frontmatter wins). If `exifr` is absent or a file lacks EXIF, fall back silently to frontmatter. **`alt` is always a required content field** and never auto-derived.

---

## 9. Motion guidelines

Instrument-grade and quiet — motion confirms actions, it never performs. Default easing `cubic-bezier(0.2, 0.65, 0.3, 0.9)`; standard duration 200–420ms.

| Motion | Spec |
|---|---|
| Section / list reveal | Fade up 8–12px over ~420ms on scroll-in (IntersectionObserver), staggered ~60ms, once only |
| Links & mono labels | Cobalt underline draws left→right via `scaleX` on hover **and** focus (keyboard-equal) |
| Theme toggle | Cross-fade all colors via CSS-variable transition (~200ms); no hard flip, no aperture animation |
| Cross-page nav | Astro **View Transitions** — soft shared-element feel; most striking when a plate expands into its lightbox (FLIP scale+opacity) |
| Gallery hover/focus | Plate lifts 2px, shadow softens (no overlay on the image) |
| Hero plate | Cross-fades through ~3 plates every ~6s |
| Loudest "motion" | **The layout breathing** — measure contracting for reading, expanding to full-bleed for images |

**`prefers-reduced-motion: reduce`** collapses all transforms to instant opacity-only, freezes the hero rotation, disables View-Transition movement. **Never:** parallax, scroll-jacking, custom cursor, boot sequence, scan-sweep, live clock, typewriter.

---

## 10. Accessibility (WCAG AA — hard gate)

- **Contrast:** all pairs in §2.4 meet AA; re-verify any new pair.
- **Keyboard:** full nav; `SkipLink` first; visible 2px `--focus` ring (2px offset) on every interactive element; logical tab order; `:focus-visible` parity with `:hover`.
- **Lightbox:** focus trap, `role="dialog"` + `aria-modal="true"` + label; `Esc` closes; focus returns to trigger.
- **Landmarks:** one `<header>`, `<main id="main">`, `<nav aria-label>`, `<footer>`; one `<h1>` per page; ordered headings.
- **Images:** `alt` required by schema; decorative images `alt=""`. Captions are not a substitute for alt.
- **Color is never the only signal:** active filters/nav also carry an underline or weight change, not just cobalt.
- **Forms** (if any): visible labels, `aria-describedby` for hints, error text with `aria-live`.
- **Reduced motion** fully honored (§9).
- **Targets:** ≥24px (aim 44px) hit areas, especially mono nav/links on mobile — re-check mono tracking/size and AA at mobile widths.
- **Theme:** set before paint (inline script) to avoid a flash; respects `prefers-color-scheme` on first visit.
- **Plate mode** dark palette is AA-verified, so forcing dark on photography never drops below AA.

---

## 11. Content model (collections + central config)

Astro **content collections** (Content Layer API, `src/content.config.ts` with `glob` loaders, Zod schemas) + one central **`src/data/site.ts`**. Adding a paper/photo = append frontmatter + drop a file. **Only `alt` is hard-required on photos.**

### `src/data/site.ts`
```ts
export const site = {
  name: "{NAME}",
  shortName: "{NAME}",            // wordmark
  tagline: "{thesis line}",
  role: "PhD Candidate",
  field: "Robot Learning · Machine Learning",
  university: "{UNIVERSITY}",
  lab: "{LAB}",
  advisor: "{ADVISOR}",
  now: "Seeking summer 2026 internships",   // honest status; "" to hide
  email: "name@university.edu",
  socials: {
    scholar: "https://scholar.google.com/...",
    github:  "https://github.com/...",
    linkedin:"https://www.linkedin.com/in/...",
  },
  cvPdf: "/cv.pdf",
  nav: [
    { label: "Research", href: "/research" },
    { label: "CV", href: "/cv" },
    { label: "Photography", href: "/photography" },
    { label: "About", href: "/about" },
  ],
  features: { notes: false },     // feature flags
  accent: "cobalt",
};
```

### Collections (`src/content.config.ts`)

| Collection | Loc | Key frontmatter (Zod) |
|---|---|---|
| `publications` | `src/content/publications/*.yaml` | `title, authors[], venue, year, type, links{pdf?,arxiv?,code?,project?,bibtex?}, oneLiner?, tags[]?, teaser?, award?, selected?(bool)` |
| `projects` | `src/content/projects/*.mdx` | `title, slug, summary, year, cover?, tags[]?, links{}?` + MDX body |
| `timeline` | `src/content/timeline/*.yaml` | `role, org, location?, start, end?, type(education\|industry\|service\|award), summary?, logo?` |
| `series` | `src/content/series/*.{yaml,mdx}` | `id, title, roman, intro?, cover, location?, year?, order` |
| `photos` | `src/content/photos/*.yaml` | `src, alt(REQUIRED), caption?, location?, year?, series, order, exif?{camera,lens,focal,shutter,iso}, aspect?, span?, selected?(bool)` |
| `about` | `src/content/about.mdx` | prose (+ optional `portrait`) |
| `notes` | `src/content/notes/*.mdx` | `title, date, summary?, draft?` (feature-flagged) |

Images live in `src/assets/...` (so astro:assets/sharp optimize them). CV PDF in `public/`.

---

## 12. Build, performance & deployment

- **Astro static** (`output: "static"`). Already present: `@astrojs/mdx`, `@astrojs/sitemap`, `sharp`. Add: `astro.config.mjs` with `site: "https://{user}.github.io"`, `base: "/{repo}"` (or root if user/org pages), `integrations: [mdx(), sitemap()]`. Add `exifr` (dev) for the EXIF pipeline.
- **GitHub Pages:** GitHub Action using `withastro/action`; output `dist/`; add `public/.nojekyll`. All internal links/asset paths must respect `base` (use Astro's `import.meta.env.BASE_URL` / `<a href>` helpers).
- **Performance budget:** fonts **< 100 KB** total (2 preloaded WOFF2 + Inter); **LCP < 2.5s** (hero image preloaded, dimensioned, AVIF/WebP); **CLS ≈ 0** (aspect-ratio boxes + LQIP everywhere); JS only as small islands (theme toggle, lightbox, copy-BibTeX, IntersectionObserver reveals).
- **SEO:** per-page `<title>`/description, Open Graph + Twitter cards (default OG = a strong photograph or the wordmark), sitemap, canonical URLs.

### Suggested file structure
```
src/
  assets/                 # images optimized by astro:assets
  components/             # see §6 inventory
  content/
    publications/  projects/  timeline/  series/  photos/  notes/
    about.mdx
  content.config.ts       # collections + Zod schemas + glob loaders
  data/site.ts            # central config
  layouts/BaseLayout.astro
  pages/
    index.astro
    research/index.astro
    research/[slug].astro
    cv.astro
    photography/index.astro
    photography/[series].astro
    about.astro
    notes/index.astro   notes/[slug].astro   # behind features.notes
    404.astro
  styles/tokens.css       # all CSS custom properties (§2,§3,§4)
public/  cv.pdf  .nojekyll  favicon
astro.config.mjs
```

---

## 13. Font loading (concrete)

Preferred: **self-host** via Fontsource (`@fontsource-variable/newsreader`, `@fontsource/ibm-plex-mono`, `@fontsource-variable/inter`), subset Latin, preload Newsreader + IBM Plex Mono. If linking Google Fonts directly instead, use these exact CSS2 URLs (and `preconnect` to `fonts.gstatic.com`):

- `https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap`
- `https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap`
- `https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap`

---

## 14. Definition of done (acceptance)

- [ ] All six required content areas present: research/papers, projects, experience timeline, photography gallery, interests/hobbies, about+portrait+contact (email, Scholar, GitHub, LinkedIn, CV PDF).
- [ ] Light + dark themes; no-flash theme init; `/photography` forces dark plate mode; lightbox always dark.
- [ ] Measure "breathes": prose ≤720px, images full-bleed.
- [ ] One Cobalt accent only; all contrast pairs AA.
- [ ] Full keyboard nav; focus-trapped lightbox; visible focus rings; `prefers-reduced-motion` honored.
- [ ] AVIF/WebP + LQIP + aspect-ratio boxes → CLS ≈ 0; LCP < 2.5s; fonts < 100 KB.
- [ ] Home auto-curates from `selected: true`.
- [ ] A non-designer can add a paper (one YAML entry) or a photo (drop file + `alt`) with no layout edits.
- [ ] Builds static and deploys to GitHub Pages with correct `base`.
