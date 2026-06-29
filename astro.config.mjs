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
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: { theme: "github-dark-default", wrap: true },
  },
});
