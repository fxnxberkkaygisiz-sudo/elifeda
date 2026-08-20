import type { Metadata } from "next";
import { getPerson } from "@/lib/person";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

const SLUG = "yasal-uyari";
const { legal } = getPerson();

export const metadata: Metadata = {
  title: legal.title,
  description: legal.disclaimer,
  alternates: { canonical: `/${SLUG}` },
  robots: { index: true, follow: true },
  openGraph: {
    title: legal.title,
    description: legal.disclaimer,
    url: `/${SLUG}`,
  },
};

export default function YasalUyariPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", path: "/" },
          { name: legal.title, path: `/${SLUG}` },
        ]}
      />

      <PageHero
        folio={legal.tag}
        title="Yasal Uyarı"
        intro={legal.intro}
        breadcrumb={[
          { name: "Ana Sayfa", path: "/" },
          { name: "Yasal Uyarı", path: `/${SLUG}` },
        ]}
      />

      <Section tone="paper" bordered={false}>
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="redbar sticky top-28">
              <p className="text-headline text-ink">{legal.disclaimer}</p>
            </div>
          </div>

          <div className="md:col-span-8">
            {legal.sections.map((item, i) => (
              <article key={item.title} className="border-rule border-t py-8">
                <div className="flex items-baseline gap-5">
                  <span className="mono text-signal shrink-0 text-[0.6875rem] tracking-[0.1em]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-headline text-ink">{item.title}</h2>
                </div>
                <p className="text-muted mt-4 md:pl-[3.6rem]">{item.body}</p>
              </article>
            ))}
            <div className="border-rule border-t" />
          </div>
        </div>
      </Section>
    </>
  );
}
