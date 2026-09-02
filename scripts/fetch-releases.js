#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Fetches GitHub releases data by scraping the releases page
 * This avoids using the GitHub API and works with the HTML structure
 */
async function fetchReleases() {
  try {
    console.log('Fetching Omarchy releases from GitHub...');
    
    // Fetch the releases page
    const response = await fetch('https://github.com/omacom/omarchy/releases', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OmarchyHub/1.0; +https://github.com/deepakness/omarchy-hub)'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    
    // Parse releases from HTML
    const releases = parseReleasesFromHTML(html);
    const dataPath = path.join(__dirname, '..', 'data', 'releases.json');

    // Do not wipe existing data if scraping returned nothing (HTML/path changes).
    if (!releases.length) {
      throw new Error('Parsed 0 releases from GitHub HTML; refusing to overwrite existing data');
    }
    
    // Save to data file
    fs.writeFileSync(dataPath, JSON.stringify(releases, null, 2) + '\n');
    
    console.log(`✅ Successfully fetched ${releases.length} releases`);
    console.log(`📁 Saved to: ${dataPath}`);
    
    return releases;
  } catch (error) {
    console.error('❌ Error fetching releases:', error.message);
    
    // Fallback to existing data if available
    const dataPath = path.join(__dirname, '..', 'data', 'releases.json');
    if (fs.existsSync(dataPath)) {
      console.log('📁 Using existing releases data as fallback');
      return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    }
    
    // Return empty array if no fallback available
    return [];
  }
}

/**
 * Parses release data from GitHub releases page HTML
 */
function parseReleasesFromHTML(html) {
  const releases = [];
  
  // Extract unique version tags in page order (newest first typically).
  // Upstream moved from basecamp/omarchy to omacom/omarchy; match both paths.
  const releaseLinkRegex = /href="\/(?:basecamp|omacom)\/omarchy\/releases\/tag\/(v[^"]+)"/g;
  const foundTags = [];
  const seen = new Set();
  let match;
  while ((match = releaseLinkRegex.exec(html)) !== null) {
    const tag = match[1].trim();
    if (!seen.has(tag)) {
      seen.add(tag);
      foundTags.push(tag);
    }
  }
  
  // Extract published dates from relative-time elements (in same order as tags)
  const dateRegex = /<relative-time class="no-wrap"[^>]*datetime="([^"]+)"/g;
  const dates = [];
  while ((match = dateRegex.exec(html)) !== null) {
    dates.push(match[1]);
  }
  
  // Identify latest: look for the tag that has the "Latest" success label nearby
  let latestTag = null;
  for (const tag of foundTags) {
    const escaped = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const latestPattern = new RegExp(
      `href="/(?:basecamp|omacom)/omarchy/releases/tag/${escaped}"[\\s\\S]{0,800}Label--success[\\s\\S]{0,80}Latest`,
      'i'
    );
    if (latestPattern.test(html)) {
      latestTag = tag;
      break;
    }
  }
  // Fallback: first tag is usually latest
  if (!latestTag && foundTags.length > 0) {
    latestTag = foundTags[0];
  }

  // Extract release body snippets from markdown-body sections (in page order, matches tags)
  // GitHub currently renders each release's notes in a div.markdown-body
  const bodyParts = html.split(/<div[^>]*class="[^"]*markdown-body[^"]*"[^>]*>/i);
  const bodyTexts = [];
  for (let i = 1; i < bodyParts.length; i++) {
    // Take content until a reasonable end; strip tags for clean text
    let raw = bodyParts[i];
    // Limit to avoid pulling in subsequent page content
    const closeIdx = raw.search(/<\/article>|<div[^>]*class="[^"]*Box-footer/i);
    if (closeIdx > 0) raw = raw.substring(0, closeIdx);
    const text = raw
      .replace(/<[^>]+>/g, ' ')
      .replace(/&gt;/g, '>')
      .replace(/&lt;/g, '<')
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim();
    bodyTexts.push(text);
  }
  
  for (let i = 0; i < foundTags.length; i++) {
    const tag = foundTags[i];
    const publishedAt = dates[i] || null;
    const url = `https://github.com/omacom/omarchy/releases/tag/${tag}`;
    const isLatest = tag === latestTag;
    
    // Match body by order (bodies appear in same order as tags on the page)
    let changelog = '';
    let description = '';
    if (bodyTexts[i]) {
      changelog = bodyTexts[i].substring(0, 500);
      description = extractDescription(changelog);
    }
    
    releases.push({
      tag,
      url,
      publishedAt,
      isLatest,
      changelog: changelog + (changelog.length >= 500 ? '...' : ''),
      description
    });
  }
  
  // Sort by version (newest first) as safety
  releases.sort((a, b) => {
    const aVersion = a.tag.replace(/^v/, '').split('.').map(Number);
    const bVersion = b.tag.replace(/^v/, '').split('.').map(Number);
    for (let i = 0; i < Math.max(aVersion.length, bVersion.length); i++) {
      const aNum = aVersion[i] || 0;
      const bNum = bVersion[i] || 0;
      if (aNum !== bNum) return bNum - aNum;
    }
    return 0;
  });
  
  return releases.slice(0, 10); // Limit to 10 most recent
}

/**
 * Extracts a short description from the changelog
 */
function extractDescription(changelog) {
  if (!changelog) return '';
  
  let cleanText = changelog
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  // Skip leading "Omarchy x.y.z" title if present
  cleanText = cleanText.replace(/^Omarchy\s+v?\d+(?:\.\d+)*\s*/i, '').trim();
  
  // Prefer content after the install blurb if present
  const afterIso = cleanText.match(/SHA256:\s*[a-f0-9]+\s*(.*)/i);
  if (afterIso && afterIso[1] && afterIso[1].length > 40) {
    cleanText = afterIso[1].trim();
  }

  // Take first meaningful chunk (up to ~120 chars, prefer sentence end)
  if (cleanText.length <= 120) {
    return cleanText;
  }
  const cut = cleanText.substring(0, 120);
  const lastPunct = Math.max(cut.lastIndexOf('.'), cut.lastIndexOf('!'), cut.lastIndexOf('?'));
  if (lastPunct > 40) {
    return cut.substring(0, lastPunct + 1);
  }
  return cut.trim() + '...';
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  fetchReleases().then(() => {
    process.exit(0);
  }).catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
}

export { fetchReleases };
