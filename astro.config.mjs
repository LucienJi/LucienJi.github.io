// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
//
// GitHub Pages:
//  • User/org site (USERNAME.github.io repo)  -> site: "https://USERNAME.github.io", base: "/"
//  • Project site  (any other repo name)      -> site: "https://USERNAME.github.io", base: "/REPO/"
// Keep `site` in sync with src/data/site.ts `url`.
export default defineConfig({
  site: "https://lucienji.github.io",
  base: "/",
  trailingSlash: "ignore",
  integrations: [
    mdx(),
    sitemap({
      // Notes aren't launched yet (site.features.notes = false) — keep the
      // placeholder /notes routes out of the sitemap so search engines don't
      // index them. Remove this filter when the Notes section goes live.
      filter: (page) => !page.includes("/notes"),
    }),
  ],
  markdown: {
    shikiConfig: { theme: "github-dark-default", wrap: true },
  },
});
