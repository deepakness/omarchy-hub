# AGENTS.md

## Cursor Cloud specific instructions

Omarchy Hub is a single Next.js 16 (App Router) + React 19 + TypeScript site. Content is static JSON in `data/`; there is no backend, database, or auth. Standard commands live in `package.json` (`dev`, `build`, `start`, `lint`).

Non-obvious caveats for this repo:

- `npm run dev` (and `build`) trigger the `predev` hook (`scripts/fetch-releases.js`, `scripts/optimize-images.js`, `scripts/generate-docs.js`). This step takes ~30s on the first run before `next dev` actually starts serving on http://localhost:3000, so wait for the `✓ Ready` line before hitting the server.
- The `predev`/build scripts modify tracked files in place: `data/releases.json`, the optimized `public/setups/*.webp` and `public/themes/*.webp` images, and the generated `SETUPS.md` / `THEMES.md` / `RESOURCES.md` / `README.md` stats. Do NOT commit these regenerated artifacts unless the change is intentional — run `git checkout -- .` to discard them before committing unrelated work.
- `fetch-releases.js` scrapes GitHub for Omarchy releases but has offline fallbacks, so the site still builds/runs without network access.
- `npm run lint` passes; there is one pre-existing `@next/next/no-img-element` warning in `components/Card.tsx` (warning only, not an error).
