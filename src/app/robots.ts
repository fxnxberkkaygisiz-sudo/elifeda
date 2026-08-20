import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/person";

/** https://elifeda.com.tr/robots.txt */
export default function robots(): MetadataRoute.Robots {
  const base = siteUrl();

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
