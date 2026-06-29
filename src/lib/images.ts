/**
 * Image resolver — lets content reference images by a path **relative to
 * `src/assets/`** (e.g. `photography/northern-light/nl-01.jpg`,
 * `projects/offline-rl/teaser.jpg`, `portraits/serious.jpg`) while still
 * getting full astro:assets optimization (AVIF/WebP/responsive/LQIP).
 *
 * A bare basename still works when it's unique, but PATHS are preferred so the
 * same filename (e.g. `teaser.jpg`) can live in many subfolders without clashing.
 * Videos are NOT handled here — put them in `public/media/**` and reference by URL.
 */
import type { ImageMetadata } from "astro";

const modules = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/**/*.{jpg,jpeg,png,JPG,JPEG,PNG,webp,avif,gif,tiff,svg}",
  { eager: true },
);

const byRel = new Map<string, ImageMetadata>(); // key: path relative to src/assets (and the full /src/assets path)
const byBasename = new Map<string, ImageMetadata>(); // key: filename (first wins; may be ambiguous)

for (const [full, mod] of Object.entries(modules)) {
  const meta = mod.default;
  byRel.set(full, meta);
  byRel.set(full.replace(/^\/src\/assets\//, ""), meta);
  const base = full.split("/").pop();
  if (base && !byBasename.has(base)) byBasename.set(base, meta);
}

/** Strip any leading `./`, `/`, `src/assets/`, `assets/` so callers can be loose. */
function normalize(src: string): string {
  return src.replace(/^\.?\/?/, "").replace(/^src\/assets\//, "").replace(/^assets\//, "");
}

/** Resolve a relative-to-assets path (preferred) or a unique basename to ImageMetadata. */
export function resolveImage(src: string | ImageMetadata | undefined): ImageMetadata | undefined {
  if (!src) return undefined;
  if (typeof src !== "string") return src; // already an imported asset
  const rel = normalize(src);
  return byRel.get(rel) ?? byRel.get(src) ?? byBasename.get(rel.split("/").pop() ?? "");
}

/** Like resolveImage, but throws a clear build-time error listing what's available. */
export function mustResolveImage(src: string | ImageMetadata): ImageMetadata {
  const meta = resolveImage(src);
  if (!meta) {
    const available = [...byRel.keys()].filter((k) => !k.startsWith("/")).sort().join(", ");
    throw new Error(
      `[images] Could not find "${typeof src === "string" ? src : "<metadata>"}" in src/assets/**.\nReference images by a path relative to src/assets/. Available: ${available || "(none)"}`,
    );
  }
  return meta;
}

export function hasImage(src: string): boolean {
  return resolveImage(src) !== undefined;
}
