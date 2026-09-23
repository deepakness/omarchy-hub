// Homepage strips are ordered by importance, not only by recency: entries with
// `featured: true` come first, then everything else newest-first.
//
// `featured` is the single source of truth: Card and PluginCard derive their
// `#featured` badge from it, so entries must never also carry a `featured` tag.
//
// `id` is required in the parameter type to keep it from being a "weak type",
// so entries that never set `featured` still satisfy it.
export function isFeatured(entry: { id: string; featured?: boolean }): boolean {
  return entry.featured === true;
}

export function byFeaturedThenNewest<T extends { id: string; featured?: boolean }>(
  a: T,
  b: T,
): number {
  return Number(isFeatured(b)) - Number(isFeatured(a)) || Number(b.id) - Number(a.id);
}
