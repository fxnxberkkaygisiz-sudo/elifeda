import type { Metadata } from "next";
import { getPage } from "@/lib/person";
import { PageHero } from "@/components/layout/PageHero";
import { Contact } from "@/components/sections/Contact";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

const SLUG = "iletisim";
const page = getPage(SLUG);

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    title: page.title,
    description: page.description,
    url: `/${SLUG}`,
  },
};

export default function IletisimPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", path: "/" },
          { name: page.title, path: `/${SLUG}` },
        ]}
      />

      <PageHero
        folio={page.tag}
        title={page.h1}
        intro={page.intro}
        breadcrumb={[
          { name: "Ana Sayfa", path: "/" },
          { name: page.title, path: `/${SLUG}` },
        ]}
      />

      <Contact full />
    </>
  );
}
