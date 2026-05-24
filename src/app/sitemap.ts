import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://amif.ma';
  const locales = ['fr', 'ar'];
  const paths = ['', '/about', '/missions', '/poles', '/team', '/blog', '/contact'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate localized URLs for sitemap
  for (const path of paths) {
    for (const locale of locales) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' || path === '/blog' ? 'daily' : 'weekly',
        priority: path === '' ? 1.0 : path === '/contact' ? 0.8 : 0.7,
      });
    }
  }

  return sitemapEntries;
}
