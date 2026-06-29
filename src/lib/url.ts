/**
 * Base-aware URL helpers. GitHub Pages *project* sites are served from a
 * subpath (e.g. /repo/), so every internal link/asset must respect BASE_URL.
 * Always wrap internal hrefs with withBase().
 */
const BASE = import.meta.env.BASE_URL; // "/" or "/repo/"

export function isExternal(href: string): boolean {
  return /^[a-z]+:\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

export function withBase(path: string): string {
  if (!path) return BASE;
  if (isExternal(path) || path.startsWith("#")) return path;
  const base = BASE.endsWith("/") ? BASE.slice(0, -1) : BASE;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}` || "/";
}

/** True if `href` matches the current path (for aria-current on nav). */
export function isActive(href: string, currentPath: string): boolean {
  const strip = (s: string) => s.replace(/\/+$/, "") || "/";
  const target = strip(withBase(href));
  const here = strip(currentPath);
  const home = strip(withBase("/"));
  if (target === home) return here === home;
  return here === target || here.startsWith(target + "/");
}
