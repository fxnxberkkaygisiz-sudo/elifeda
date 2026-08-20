import type { MetadataRoute } from "next";
import { getPerson } from "@/lib/person";

export default function manifest(): MetadataRoute.Manifest {
  const { seo } = getPerson();

  return {
    name: seo.titleDefault,
    short_name: seo.siteName,
    description: seo.description,
    start_url: "/",
    scope: "/",
    id: "/",
    display: "standalone",
    orientation: "portrait",
    lang: "tr",
    dir: "ltr",
    categories: ["finance", "education", "business"],
    background_color: "#ffffff",
    theme_color: "#17181a",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      { name: "Hakkında", url: "/ozgecmis" },
      { name: "Eğitim & Mentorluk", url: "/egitimler" },
      { name: "İletişim", url: "/iletisim" },
    ],
    prefer_related_applications: false,
  };
}
