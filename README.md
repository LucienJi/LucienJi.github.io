# Personal Website — "Monograph"

A fast, accessible personal site for a Robotics + Machine Learning researcher: **research / publications**, a **CV / experience** timeline, a **photography** gallery, and an **about** page. The whole site is treated as one bound volume — a single‑author scholarly study *and* a single‑photographer photo‑book — under one editorial design.

Built with **[Astro](https://astro.build)** (static), self‑hosted fonts, build‑time image optimization, light/dark themes, and a content model where **adding a paper or a photo is one file**. The full design spec is in [`DESIGN.md`](./DESIGN.md).

---

## Quick start

Requires **Node 18.17+ / 20+ / 22+** (any current LTS) and npm.

```bash
npm install      # first time only
npm run dev      # http://localhost:4321
npm run build    # outputs static site to ./dist
npm run preview  # preview the built ./dist
npm run check    # type / diagnostics check
```

---

## Make it yours (start here)

1. **Edit `src/data/site.ts`** — your name, wordmark, tagline, university/lab/advisor, the `now` status line, email, social links, CV path, and feature flags. Every `{PLACEHOLDER}` should be replaced. This one file powers the header, footer, hero, contact block, and SEO.
2. **Replace the images in `src/assets/`** — swap the placeholders in `src/assets/photos/` and `src/assets/figures/` (and `portrait.jpg`) with your own. Reference any image **by filename** in content; keep filenames unique.
3. **Drop in your CV** at `public/cv.pdf` (the path is `cvPdf` in `site.ts`).
4. **(Optional) Branding** — replace `public/favicon.svg` and `public/og.jpg` (the social‑share card).

---

## Editing content

All content lives in `src/content/<collection>/`. Fields and validation are defined in [`src/content.config.ts`](./src/content.config.ts). The **homepage automatically features** anything marked `selected: true`.

| To add… | Put a file in | Format |
|---|---|---|
| A publication | `src/content/publications/` | `.yaml` |
| A project deep‑dive (`/research/<slug>`) | `src/content/projects/` | `.mdx` |
| A CV / timeline entry | `src/content/timeline/` | `.yaml` |
| A photo **series** | `src/content/series/` | `.yaml` |
| A **photo** | `src/content/photos/` | `.yaml` |
| Your bio | `src/content/about/index.mdx` | `.mdx` |
| A note/blog post | `src/content/notes/` | `.mdx` |

**Add a publication** — create `src/content/publications/2025-my-paper.yaml`:

```yaml
title: "My Great Paper on Robot Learning"
authors: ["Your Name", "A. Coauthor"]   # your name is auto-bolded
venue: "CoRL"
year: 2025
type: "conference"                        # conference | journal | workshop | preprint | thesis
links:
  pdf: "https://…"
  arxiv: "https://arxiv.org/abs/…"
  code: "https://github.com/…"
  bibtex: "@inproceedings{…}"             # enables the one-click Copy BibTeX button
oneLiner: "A plain-language one-liner shown in the margin."
tags: ["manipulation", "rl"]
award: "Best Paper"                        # optional
selected: true                            # show on the homepage
```

**Add a photo** — create `src/content/photos/my-shot.yaml` (drop `my-shot.jpg` in `src/assets/photos/`):

```yaml
src: "my-shot.jpg"
alt: "A required, descriptive caption for screen readers."   # the ONLY required field
caption: "Blue hour over the fjord"
location: "Senja, Norway"
year: 2025
series: "northern-light"     # matches a file in src/content/series/
order: 2
span: "full"                 # full | wide | single — controls gallery layout
selected: true               # show on the homepage strip
exif:                        # optional; shown as a mono caption line
  focal: "20mm"
  shutter: "8s"
  aperture: "f/2.8"
  iso: "ISO 1600"
```

**Enable the Notes/blog section:** set `features.notes: true` in `src/data/site.ts` and add a `Notes` item to the `nav` array. It stays hidden until you do, so the site never looks empty.

---

## Design & customization

- **Colors, type, spacing, motion** are all CSS custom properties in `src/styles/tokens.css` — change them there and the whole site follows. Keep to the one cobalt accent so your photographs provide the color.
- **Fonts** are self‑hosted (Newsreader, IBM Plex Mono, Inter) via Fontsource and imported in `src/layouts/BaseLayout.astro`.
- **The design rationale and rules** (the "why") are in [`DESIGN.md`](./DESIGN.md).

---

## Deploy to GitHub Pages

A workflow is included at `.github/workflows/deploy.yml`.

1. Push this repo to GitHub.
2. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Set your URL so links and the sitemap are correct:
   - **User/org site** (repo named `<user>.github.io`): in `astro.config.mjs` keep `base: "/"` and set `site: "https://<user>.github.io"`; set `url` in `site.ts` to match.
   - **Project site** (any other repo name, served at `…/<repo>/`): set `base: "/<repo>/"` and `site: "https://<user>.github.io"` in `astro.config.mjs`, and `url` to `https://<user>.github.io/<repo>`.
4. Push to `main` — the Action builds and deploys automatically.

> All internal links already go through a base‑aware helper, so switching between user and project sites only needs the config above.

---

## Project structure

```
src/
  assets/         images (optimized at build; referenced by filename)
  components/     UI components (composed from a shared Card chassis)
  content/        your content (the files you edit) + content.config.ts schemas
  data/site.ts    central site configuration
  layouts/        BaseLayout (head, theme, nav/footer, view transitions)
  lib/            image resolver + base-aware URL helpers
  pages/          routes
  styles/         tokens.css (design tokens) + global.css
public/           cv.pdf, favicon.svg, og.jpg, .nojekyll
DESIGN.md         the full design specification
CLAUDE.md         notes for AI coding assistants / contributors
```

Built with Astro. Type set in Newsreader & IBM Plex Mono.
