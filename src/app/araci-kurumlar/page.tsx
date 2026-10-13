import type { Metadata } from "next";
import { getPage, getPerson } from "@/lib/person";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHead } from "@/components/ui/Section";
import { Contact } from "@/components/sections/Contact";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

const SLUG = "araci-kurumlar";
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

export default function AraciKurumlarPage() {
  const { brokers } = getPerson();

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
          folio="Kurumlar"
          title={brokers.heading}
          description={brokers.description}
        />

        <div className="mt-14 space-y-px">
          {brokers.items.map((broker) => (
            <article
              key={broker.name}
              className="bg-signal grid gap-8 p-9 text-white md:grid-cols-12 md:p-12"
            >
              <div className="md:col-span-5">
                <p className="mono text-[0.6875rem] tracking-[0.12em] text-white/70 uppercase">
                  {broker.role}
                </p>
                {broker.logo ? (
                  <h2 className="mt-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={broker.logo}
                      alt={broker.name}
                      className="h-14 w-auto max-w-[280px] object-contain object-left"
                    />
                  </h2>
                ) : (
                  <h2 className="text-display mt-5">{broker.name}</h2>
                )}
              </div>
              <div className="md:col-span-7">
                <p className="text-body-lg text-white/85">{broker.description}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {broker.registerHref ? (
                    <a
                      href={broker.registerHref}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="mono text-signal hover:bg-ink inline-flex items-center gap-2.5 bg-white px-7 py-4 text-[0.6875rem] font-semibold tracking-[0.1em] uppercase transition-colors hover:text-white"
                    >
                      {broker.registerLabel}
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                  {broker.secondaryHref ? (
                    <a
                      href={broker.secondaryHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mono hover:text-signal inline-flex items-center gap-2.5 border border-white/60 px-7 py-4 text-[0.6875rem] font-semibold tracking-[0.1em] text-white uppercase transition-colors hover:bg-white"
                    >
                      {broker.secondaryLabel}
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="border-rule mt-14 border-t pt-8">
          <p className="mono text-faint text-[0.6875rem] tracking-[0.12em] uppercase">
            Kapsam ve Sorumluluk
          </p>
          <p className="text-muted mt-5 max-w-3xl">{brokers.note}</p>
        </div>
      </Section>

      <Contact />
    </>
  );
}
