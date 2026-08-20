import type { Metadata } from "next";
import Image from "next/image";
import { getPage, getPerson } from "@/lib/person";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHead, Folio } from "@/components/ui/Section";
import { Contact } from "@/components/sections/Contact";
import { BreadcrumbJsonLd, ProfilePageJsonLd } from "@/components/seo/JsonLd";

const SLUG = "ozgecmis";
const page = getPage(SLUG);

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    title: page.title,
    description: page.description,
    url: `/${SLUG}`,
    type: "profile",
  },
};

export default function OzgecmisPage() {
  const { profile, about, credentials, expertise } = getPerson();
  const education = credentials.filter((c) => c.kind === "education");
  const certs = credentials.filter((c) => c.kind === "certification");

  return (
    <>
      <ProfilePageJsonLd path={`/${SLUG}`} />
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
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <div className="frame-offset relative isolate">
              <Image
                src={profile.photos.portrait.src}
                alt={profile.photos.portrait.alt}
                width={profile.photos.portrait.w}
                height={profile.photos.portrait.h}
                priority
                sizes="(min-width: 768px) 38vw, 100vw"
                className="w-full object-cover"
              />
            </div>

            <dl className="border-rule mt-14 border-t">
              <div className="border-rule flex items-baseline justify-between gap-6 border-b py-5">
                <dt className="mono text-faint text-[0.6875rem] tracking-[0.12em] uppercase">
                  Ünvan
                </dt>
                <dd className="text-title text-ink text-right">{profile.title}</dd>
              </div>
              <div className="border-rule flex items-baseline justify-between gap-6 border-b py-5">
                <dt className="mono text-faint text-[0.6875rem] tracking-[0.12em] uppercase">
                  Deneyim
                </dt>
                <dd className="text-title text-ink text-right">
                  {profile.yearsOfExperience}+ yıl
                </dd>
              </div>
              <div className="border-rule flex items-baseline justify-between gap-6 border-b py-5">
                <dt className="mono text-faint text-[0.6875rem] tracking-[0.12em] uppercase">
                  Konum
                </dt>
                <dd className="text-title text-ink text-right">
                  {profile.location}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 py-5">
                <dt className="mono text-faint text-[0.6875rem] tracking-[0.12em] uppercase">
                  Diller
                </dt>
                <dd className="text-title text-ink text-right">
                  {profile.languages.join(" · ")}
                </dd>
              </div>
            </dl>
          </div>

          <div className="md:col-span-7">
            <h2 className="text-display text-ink">{about.heading}</h2>
            <div className="mt-8 space-y-5">
              {about.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-body-lg text-muted">
                  {paragraph}
                </p>
              ))}
            </div>

            {about.quote ? (
              <blockquote className="redbar mt-12">
                <p className="text-headline text-ink">{about.quote}</p>
                <cite className="mono text-faint mt-4 block text-[0.6875rem] tracking-[0.1em] uppercase not-italic">
                  {profile.fullName}
                </cite>
              </blockquote>
            ) : null}
          </div>
        </div>
      </Section>

      <Section tone="band">
        <SectionHead
          folio="Künye"
          title="Eğitim ve yetkinlik"
          description="Akademik altyapı ve mesleki gelişim başlıkları."
        />

        <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <Folio>Eğitim</Folio>
            <ul className="mt-8">
              {education.map((item) => (
                <li key={item.name} className="border-rule border-t py-6">
                  <h3 className="text-headline text-ink">{item.name}</h3>
                  <p className="text-muted mt-2">{item.detail}</p>
                </li>
              ))}
              <li className="border-rule border-t" />
            </ul>
          </div>

          <div>
            <Folio>Uzmanlık</Folio>
            <ul className="mt-8">
              {(certs.length
                ? certs.map((c) => ({ name: c.name, detail: c.detail }))
                : expertise.map((e) => ({ name: e, detail: "" }))
              ).map((item) => (
                <li
                  key={item.name}
                  className="border-rule flex items-baseline gap-4 border-t py-4"
                >
                  <span className="bg-signal mt-2 h-1 w-4 shrink-0" aria-hidden="true" />
                  <div>
                    <span className="text-title text-ink">{item.name}</span>
                    {item.detail ? (
                      <p className="text-muted mt-1 text-sm">{item.detail}</p>
                    ) : null}
                  </div>
                </li>
              ))}
              <li className="border-rule border-t" />
            </ul>
          </div>
        </div>
      </Section>

      <Contact />
    </>
  );
}
