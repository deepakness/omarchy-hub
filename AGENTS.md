# AGENTS.md

Omarchy Hub is a Next.js site listing community themes, setups, and resources for [Omarchy](https://omarchy.org). Content lives in `data/*.json`. Use npm.

## Adding a theme (from a GitHub issue)

1. Download the screenshot (PNG/JPG) from the submitter's repo into `public/themes/<slug>-1.png` (slug = kebab-case theme name).
2. Run `npm run optimize-images` — converts to WebP (1080px max width) and deletes the original.
3. Add an entry to `data/themes.json` with the next sequential `id`, referencing only the `.webp` file in `screenshot` (e.g. `themes/noir-1.webp`).
4. Add the new file's hash to `public/themes/.optimization-metadata.json` (format: `mtime-size`, e.g. `"noir-1.webp": "1786750168472-58054"`).
5. Run `npm run generate-docs` — regenerates THEMES.md and README stats.
6. Verify with `npm run build`.
7. Commit and push, then close the issue with a thank-you comment linking to the live listing. The site is hosted at `https://omarchy.deepakness.com` (themes live at `https://omarchy.deepakness.com/themes`) — do not link to `omarchy.org`, which is the Omarchy project site, not the hub.

## Adding a setup (from a tweet)

1. Save the tweet's media file into `public/setups/setup-<next-id>.<ext>` (e.g. `setup-111.jpeg`).
2. Run `npm run optimize-images` — converts to WebP (1080px max width) and deletes the original; it also updates `public/setups/.optimization-metadata.json`.
3. Add an entry to `data/setups.json` with the next sequential `id`, referencing only the `.webp` file in `screenshot` (e.g. `setups/setup-111.webp`) and the tweet URL as `link` (find it via `x.com/<user>` profile fetch or the syndication API `https://cdn.syndication.twimg.com/tweet-result?id=<status-id>&token=x`).
4. Run `npm run generate-docs` — regenerates SETUPS.md and README stats.
5. Verify with `npm run build`.
6. Commit and push. Setups live at `https://omarchy.deepakness.com/setups` — do not link to `omarchy.org`.

## Maintenance scripts

- `npm run fetch-releases` — updates `data/releases.json` from GitHub. Run before committing when origin has newer release-sync commits.
- `npm run generate-docs` — regenerates SETUPS.md, THEMES.md, RESOURCES.md, and README stats.

## Conventions

- Tags: keep them short — start with `unofficial`, then 2–3 tags trimmed from the issue (hyphenate multi-word tags, e.g. `pure-black`). Follow recent entries in `data/themes.json`.
- Author: plain GitHub username; link: repo URL without `.git`.
- Setups: plain username or name in the entry `name`; `device` summarizes the hardware from the tweet; tags follow entries in `data/setups.json` (e.g. `rgb`, `dual-monitor`, `thinkpad`).

## Pitfalls

- After `git pull`, mtime hashes in `.optimization-metadata.json` go stale and `optimize-images` re-processes every existing webp. Revert those unrelated changes (`git checkout -- public/themes/ public/setups/`) and keep only the new media file and its metadata entry.
- `optimize-images` processes both `public/themes/` and `public/setups/`; if stale hashes trigger reprocessing of existing images, only the new image's changes (new `.webp` + its metadata line) should survive.
