# CV — LaTeX source

The LaTeX source for Jingtian Ji's CV. One file, `cv.tex`, drives everything.
The built `cv.pdf` is what the website serves (via `public/cv.pdf`).

## Build

From this folder:

```bash
make            # build cv.pdf
make watch      # auto-rebuild on save while editing
make publish    # build, then copy cv.pdf -> ../public/cv.pdf (updates the site)
make clean      # delete LaTeX aux files
```

Or from the repo root (same thing, wired into npm):

```bash
npm run cv          # build cv/cv.pdf
npm run cv:publish  # build + copy to public/cv.pdf
```

Requires a TeX Live install (`pdflatex`, `latexmk`) — already present on this
machine. Packages used (`fontawesome5`, `titlesec`, `enumitem`, `microtype`,
`hyperref`, `geometry`, `lmodern`) ship with a standard TeX Live.

## Updating each year

Everything lives in `cv.tex`, split into clearly-labelled section blocks.

- **Add a publication** — copy one `\item` line under `% PUBLICATIONS`, edit it,
  and put it at the top (newest first). `\me` prints your name in bold.
- **Add a job / award / skill** — copy the nearest existing line in that section.
- **Education, dates** — edit the `\daterow{...}{...}` lines.

## Toggles

Near the top of `cv.tex`:

- `\showphonetrue` / `\showphonefalse` — show or hide the phone number.
  Use `\showphonefalse` for the **public copy hosted on the website**, and keep
  a private full copy (with phone) for direct applications if you like.

## Publishing to the website

`make publish` (or `npm run cv:publish`) overwrites `../public/cv.pdf`. Commit
and push, and the GitHub Pages deploy picks it up. The site links to it from the
`/cv` page and from `site.cvPdf` in `src/data/site.ts`.
