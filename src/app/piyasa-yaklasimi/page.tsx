import type { Metadata } from "next";
import { getPage, getPerson } from "@/lib/person";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHead, IndexRow } from "@/components/ui/Section";
import { Markets } from "@/components/sections/Markets";
import { Contact } from "@/components/sections/Contact";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

const SLUG = "piyasa-yaklasimi";
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

export default function PiyasaYaklasimiPage() {
  const { method } = getPerson();

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

      <Section tone="paper" bordered={false}>
        <SectionHead
          folio="Çerçeve"
          title={method.heading}
          description={method.description}
        />

        <div className="mt-14">
          {method.steps.map((step) => (
            <IndexRow
              key={step.step}
              index={step.step}
              title={step.title}
              description={step.description}
            />
          ))}
          <div className="border-rule border-t" />
        </div>
      </Section>

      <Markets />
      <Contact />
    </>
  );
}
