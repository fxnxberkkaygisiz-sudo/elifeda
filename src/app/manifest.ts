import type { MetadataRoute } from "next";
import { getPerson } from "@/lib/person";

export default function manifest(): MetadataRoute.Manifest {
  const { seo } = getPerson();

  return {
    name: seo.titleDefault,
    short_name: seo.siteName,
    description: seo.description,
    start_url: "/",
    display: "standalone",
    lang: "tr",
    background_color: "#ffffff",
    theme_color: "#17181a",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
