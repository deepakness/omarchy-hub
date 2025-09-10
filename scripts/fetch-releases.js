#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Fetches GitHub releases data by scraping the releases page
 * This avoids using the GitHub API and works with the HTML structure
 */
async function fetchReleases() {
  try {
    console.log('Fetching Omarchy releases from GitHub...');
    
    // Fetch the releases page
    const response = await fetch('https://github.com/basecamp/omarchy/releases');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    
    // Parse releases from HTML
    const releases = parseReleasesFromHTML(html);
    
    // Save to data file
    const dataPath = path.join(__dirname, '..', 'data', 'releases.json');
    fs.writeFileSync(dataPath, JSON.stringify(releases, null, 2));
    
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
  
  // Look for release links in the format: href="/basecamp/omarchy/releases/tag/v2.1.1"
  const releaseLinkRegex = /href="\/basecamp\/omarchy\/releases\/tag\/([^"]+)"/g;
  
  let match;
  const foundTags = new Set();
  
  while ((match = releaseLinkRegex.exec(html)) !== null) {
    const tag = match[1].trim();
    
    // Skip if it's not a version tag or we've already processed it
    if (!tag.startsWith('v') || foundTags.has(tag)) {
      continue;
    }
    
    foundTags.add(tag);
    
    // Extract date from relative-time elements near this tag
    const tagEscaped = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const dateRegex = new RegExp(`<relative-time[^>]*datetime="([^"]*)"[^>]*>[^<]*</relative-time>[^<]*<a[^>]*href="/basecamp/omarchy/releases/tag/${tagEscaped}"`, 'i');
    const dateMatch = html.match(dateRegex);
    const publishedAt = dateMatch ? dateMatch[1] : null;
    
    // Extract release URL
    const url = `https://github.com/basecamp/omarchy/releases/tag/${tag}`;
    
    // Check if this is the latest release by looking for "Latest" label near the tag
    const latestRegex = new RegExp(`href="/basecamp/omarchy/releases/tag/${tagEscaped}"[^>]*>[^<]*</a>[^<]*<span[^>]*class="[^"]*Label[^"]*Label--success[^"]*"[^>]*>Latest</span>`, 'i');
    const isLatest = latestRegex.test(html);
    
    // Try to extract changelog content
    const changelogRegex = new RegExp(`href="/basecamp/omarchy/releases/tag/${tagEscaped}"[\\s\\S]*?<div[^>]*class="[^"]*markdown-body[^"]*"[\\s\\S]*?<h2[^>]*>What changed\\?<\\/h2>([\\s\\S]*?)(?=<h2|<div[^>]*class="[^"]*markdown-body[^"]*"|$)`, 'i');
    const changelogMatch = html.match(changelogRegex);
    const changelog = changelogMatch ? changelogMatch[1].trim() : '';
    
    releases.push({
      tag,
      url,
      publishedAt,
      isLatest,
      changelog: changelog.substring(0, 500) + (changelog.length > 500 ? '...' : ''),
      description: extractDescription(changelog)
    });
  }
  
  // Sort by version (newest first)
  releases.sort((a, b) => {
    const aVersion = a.tag.replace('v', '').split('.').map(Number);
    const bVersion = b.tag.replace('v', '').split('.').map(Number);
    
    for (let i = 0; i < Math.max(aVersion.length, bVersion.length); i++) {
      const aNum = aVersion[i] || 0;
      const bNum = bVersion[i] || 0;
      if (aNum !== bNum) {
        return bNum - aNum;
      }
    }
    return 0;
  });
  
  return releases.slice(0, 10); // Limit to 10 most recent releases
}

/**
 * Extracts a short description from the changelog
 */
function extractDescription(changelog) {
  if (!changelog) return '';
  
  // Remove HTML tags and clean up
  const cleanText = changelog
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Take first sentence or first 100 characters
  const firstSentence = cleanText.split('.')[0];
  if (firstSentence.length <= 100) {
    return firstSentence + (cleanText.includes('.') ? '.' : '');
  }
  
  return cleanText.substring(0, 100) + '...';
}

// Run if called directly
if (require.main === module) {
  fetchReleases().then(() => {
    process.exit(0);
  }).catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
}

module.exports = { fetchReleases };
