# Media served as-is (videos, large downloads)

Files here are copied verbatim to the site (NOT optimized). Use for project teaser VIDEOS.

`public/media/projects/<slug>/teaser.mp4`

Then in `src/content/projects/<slug>.mdx` frontmatter:
```yaml
teaserVideo: "/media/projects/<slug>/teaser.mp4"   # self-hosted file, OR
teaserVideo: "https://youtu.be/XXXXXXXXXXX"          # a YouTube/Vimeo link (embedded)
teaserPoster: "/media/projects/<slug>/poster.jpg"    # optional still frame
```
Paths are made base-aware automatically. Keep clips short/compressed (Git isn't ideal for huge files).
