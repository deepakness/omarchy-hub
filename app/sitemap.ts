import { MetadataRoute } from 'next';
import themesData from '../data/themes.json';
import setupsData from '../data/setups.json';
import resourcesData from '../data/resources.json';

const BASE_URL = 'https://omarchy.deepakness.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();
  
  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/setups`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/themes`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/resources`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Theme entries (linking to their GitHub repos)
  const themeEntries: MetadataRoute.Sitemap = themesData.map((theme) => ({
    url: theme.link,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Setup entries (linking to their external pages)
  const setupEntries: MetadataRoute.Sitemap = setupsData
    .filter((setup) => setup.link)
    .map((setup) => ({
      url: setup.link,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

  // Resource entries (linking to their external pages)
  const resourceEntries: MetadataRoute.Sitemap = resourcesData.map((resource) => ({
    url: resource.link,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [
    ...corePages,
    ...themeEntries,
    ...setupEntries,
    ...resourceEntries,
  ];
}
