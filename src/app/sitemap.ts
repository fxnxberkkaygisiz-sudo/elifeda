import type { MetadataRoute } from "next";
import { getPerson, siteUrl } from "@/lib/person";

/**
 * https://elifeda.com.tr/sitemap.xml
 * Sayfa listesi person.json > sitemap alanından yönetilir.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const { sitemap: pages } = getPerson();
  const base = siteUrl();
  const lastModified = new Date();

  return pages.map((page) => ({
    url: `${base}${page.path === "/" ? "" : page.path}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
