# VikFlow Library — static site

Pure static HTML/CSS/JS. No npm, Node, build step, database, or framework.

## Content structure

- `content/projects/*.json`
- `content/case-studies/*.json`
- `content/insights/*.json`
- `content/resources/*.json`

Each item can include `heroImage` + `heroAlt`, and an optional `gallery` array. Individual `sections` can also include `image` + `imageAlt`.

Resources use `payhipUrl` and `ctaLabel`. Payhip handles the resource email/checkout/file delivery. This site does not collect resource-download emails itself.

## Adding content

1. Add the new JSON file to the appropriate folder.
2. Add its path to the matching list in `js/library.js`.
3. Put images in `assets/media/` and reference them from the JSON.
4. Push/upload the static files.

The browser renders the JSON at runtime when the site is served over HTTP(S), such as Vercel.
