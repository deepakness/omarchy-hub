# Scripts

This directory contains utility scripts for the Omarchy Hub website.

## fetch-releases.js

Automatically fetches the latest Omarchy releases from the GitHub releases page and saves them to `data/releases.json`.

### Features

- Scrapes the GitHub releases page without using the API
- Extracts release tags, URLs, and metadata
- Identifies the latest release
- Sorts releases by version (newest first)
- Limits to 10 most recent releases
- Includes fallback handling for network issues

### Usage

```bash
# Run manually
npm run fetch-releases

# Automatically runs before build
npm run build
```

### Output

The script generates a `data/releases.json` file with the following structure:

```json
[
  {
    "tag": "v2.1.1",
    "url": "https://github.com/basecamp/omarchy/releases/tag/v2.1.1",
    "publishedAt": "2024-09-09T19:37:00Z",
    "isLatest": true,
    "changelog": "What changed? content...",
    "description": "Short description extracted from changelog"
  }
]
```

### Integration

The releases data is automatically displayed on the homepage in a "Latest Releases" section above the "Useful Links" section. Each release is shown as a card with:

- Release tag (e.g., v2.1.1)
- "Latest" badge for the most recent release
- Short description
- Publication date
- Link to GitHub release page
