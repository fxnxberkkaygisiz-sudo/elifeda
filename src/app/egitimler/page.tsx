import type { Metadata } from "next";
import { getPage, getPerson } from "@/lib/person";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHead, IndexRow, ActionLink } from "@/components/ui/Section";
import { Contact } from "@/components/sections/Contact";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

const SLUG = "egitimler";
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

export default function EgitimlerPage() {
  const { education, about } = getPerson();

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
          folio="Programlar"
          title={education.heading}
          description={education.description}
        />

        <div className="mt-14">
          {education.items.map((item, i) => (
            <IndexRow
              key={item.title}
              index={String(i + 1).padStart(2, "0")}
              title={item.title}
              meta={item.level}
              description={item.description}
            />
          ))}
          <div className="border-rule border-t" />
        </div>
      </Section>

      <Section tone="dark">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <blockquote className="text-display text-on-dark">
              {about.quote}
            </blockquote>
          </div>
          <div className="md:col-span-5 md:pt-2">
            <p className="text-on-dark-soft">
              Programlar sınırlı kontenjanlıdır. Katılım koşulları ve takvim için
              e-posta üzerinden bilgi alabilirsiniz.
            </p>
            <div className="mt-8">
              <ActionLink href="/iletisim" variant="onDark">
                Bilgi Al
              </ActionLink>
            </div>
          </div>
        </div>
      </Section>

      <Contact />
    </>
  );
}
