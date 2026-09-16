// Image URLs are served through the i0.wp.com (Jetpack/Photon) CDN, the same
// way theme, setup and plugin screenshots reach the browser.

// Helper function to add i0.wp.com prefix to all image URLs
export function getImageUrl(screenshot: string): string {
  // If it's already a full URL
  if (screenshot.startsWith('http')) {
    try {
      const url = new URL(screenshot);
      // If it's from our domain, add i0.wp.com prefix
      if (url.hostname === 'omarchy.deepakness.com') {
        return `https://i0.wp.com/${url.hostname}${url.pathname}${url.search}${url.hash}`;
      }
    } catch {
      // Invalid URL, return as is
    }
    return screenshot;
  }

  // For relative paths, always add i0.wp.com prefix
  const path = screenshot.startsWith('/') ? screenshot : `/${screenshot}`;
  return `https://i0.wp.com/omarchy.deepakness.com${path}`;
}
