# Project media (images) — one folder per project

Folder name = the project slug (filename in `src/content/projects/<slug>.mdx`)
and/or the publication it belongs to. Put the teaser image and figures here:
`projects/<slug>/teaser.jpg`, `projects/<slug>/fig-01.jpg`, ...

Reference them by path relative to src/assets:
- a publication's   `teaser: "projects/<slug>/teaser.jpg"`
- a project's       `cover:  "projects/<slug>/teaser.jpg"`

VIDEOS do NOT go here (astro:assets only processes images) — put project teaser
videos in `public/media/projects/<slug>/` instead (see public/media/README.md).
