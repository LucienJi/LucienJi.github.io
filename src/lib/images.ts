/**
 * Image resolver — lets content files reference images by *basename* while
 * still getting full astro:assets optimization (AVIF/WebP/responsive/LQIP).
 *
 * Drop photos in `src/assets/**` and reference them in YAML as just the file
 * name (e.g. `src: aurora-01.jpg`). Filenames must be unique across assets.
 */
import type { ImageMetadata } from "astro";

const modules = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/**/*.{jpg,jpeg,png,JPG,JPEG,PNG,webp,avif,gif,tiff,svg}",
  { eager: true },
);

const byBasename = new Map<string, ImageMetadata>();
const byPath = new Map<string, ImageMetadata>();

for (const [path, mod] of Object.entries(modules)) {
  const meta = mod.default;
  byPath.set(path, meta);
  const base = path.split("/").pop();
  if (base) byBasename.set(base, meta);
}

/** Resolve a basename or full /src/assets path to ImageMetadata, or undefined. */
export function resolveImage(src: string | ImageMetadata | undefined): ImageMetadata | undefined {
  if (!src) return undefined;
  if (typeof src !== "string") return src; // already ImageMetadata
  return byPath.get(src) ?? byBasename.get(src) ?? byBasename.get(src.split("/").pop() ?? "");
}

/** Like resolveImage but throws a clear build-time error when missing. */
export function mustResolveImage(src: string | ImageMetadata): ImageMetadata {
  const meta = resolveImage(src);
  if (!meta) {
    const names = [...byBasename.keys()].sort().join(", ");
    throw new Error(
      `[images] Could not find "${typeof src === "string" ? src : "<metadata>"}" in src/assets/**.\nAvailable: ${names || "(none)"}`,
    );
  }
  return meta;
}

export function hasImage(src: string): boolean {
  return resolveImage(src) !== undefined;
}
