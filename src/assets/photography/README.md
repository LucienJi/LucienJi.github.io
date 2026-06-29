# Photography — one folder per series/theme

Each subfolder matches a series id in `src/content/series/<id>.yaml`
(e.g. `photography/northern-light/` <-> `series/northern-light.yaml`).

To add a photo:
1. Drop the file in the matching theme folder.
2. Add `src/content/photos/<name>.yaml` with:
   ```yaml
   src: "photography/<series-id>/<file>.jpg"   # path relative to src/assets
   alt: "Required description for screen readers."
   series: "<series-id>"
   order: 1
   span: "single"   # single | wide | full
   selected: false  # true -> also shows on the homepage strip
   ```
New theme = new folder here + new `series/<id>.yaml`.
