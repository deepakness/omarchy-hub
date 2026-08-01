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
    const response = await fetch('https://github.com/basecamp/omarchy/releases', {
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
    
    // Save to data file
    const dataPath = path.join(__dirname, '..', 'data', 'releases.json');
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
  
  // Extract unique version tags in page order (newest first typically)
  const releaseLinkRegex = /href="\/basecamp\/omarchy\/releases\/tag\/(v[^"]+)"/g;
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
      `href="/basecamp/omarchy/releases/tag/${escaped}"[\\s\\S]{0,600}Label--success[\\s\\S]{0,80}Latest`,
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
  
  for (let i = 0; i < foundTags.length; i++) {
    const tag = foundTags[i];
    const publishedAt = dates[i] || null;
    const url = `https://github.com/basecamp/omarchy/releases/tag/${tag}`;
    const isLatest = tag === latestTag;
    
    // Attempt to extract a short changelog snippet from the release body if present
    // GitHub renders release notes in markdown-body; keep it simple and limited
    let changelog = '';
    let description = '';
    const bodyPattern = new RegExp(
      `href="/basecamp/omarchy/releases/tag/${tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]{0,2000}?<div[^>]*class="[^"]*markdown-body[^"]*"[^>]*>([\\s\\S]*?)(?=<div[^>]*class="[^"]*markdown-body|</article|$)`,
      'i'
    );
    const bodyMatch = html.match(bodyPattern);
    if (bodyMatch) {
      changelog = bodyMatch[1]
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 500);
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
  
  const cleanText = changelog
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  const firstSentence = cleanText.split(/[.!?]/)[0];
  if (firstSentence.length <= 120) {
    return firstSentence + (cleanText.match(/[.!?]/) ? '.' : '');
  }
  
  return cleanText.substring(0, 100) + '...';
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
