# AGENTS.md

Omarchy Hub is a Next.js site listing community themes, setups, and resources for [Omarchy](https://omarchy.org). Content lives in `data/*.json`. Use npm.

## Adding a theme (from a GitHub issue)

1. Download the screenshot (PNG/JPG) from the submitter's repo into `public/themes/<slug>-1.png` (slug = kebab-case theme name).
2. Run `npm run optimize-images` — converts to WebP (1080px max width) and deletes the original.
3. Add an entry to `data/themes.json` with the next sequential `id`, referencing only the `.webp` file in `screenshot` (e.g. `themes/noir-1.webp`).
4. Add the new file's hash to `public/themes/.optimization-metadata.json` (format: `mtime-size`, e.g. `"noir-1.webp": "1786750168472-58054"`).
5. Run `npm run generate-docs` — regenerates THEMES.md and README stats.
6. Verify with `npm run build`.

## Conventions

- Tags: keep them short — start with `unofficial`, then 2–3 tags trimmed from the issue (hyphenate multi-word tags, e.g. `pure-black`). Follow recent entries in `data/themes.json`.
- Author: plain GitHub username; link: repo URL without `.git`.

## Pitfalls

- After `git pull`, mtime hashes in `.optimization-metadata.json` go stale and `optimize-images` re-processes every existing webp. Revert those unrelated changes (`git checkout -- public/themes/`) and keep only the new theme's image and metadata entry.
