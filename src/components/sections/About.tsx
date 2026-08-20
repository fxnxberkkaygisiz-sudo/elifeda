import Image from "next/image";
import { getPerson } from "@/lib/person";
import { Section, SectionHead, SectionMore, Folio } from "@/components/ui/Section";

/**
 * Hakkında özeti — solda portre, sağda biyografi ve dört öne çıkan başlık.
 */
export function About() {
  const { profile, about } = getPerson();
  const desk = profile.photos.desk;

  return (
    <Section id="hakkinda" tone="band">
      <SectionHead
        folio="01 — Hakkında"
        title={about.heading}
        description={about.body[0]}
      />

      <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <div className="frame-offset relative isolate">
            <Image
              src={desk.src}
              alt={desk.alt}
              width={desk.w}
              height={desk.h}
              sizes="(min-width: 768px) 38vw, 100vw"
              className="w-full object-cover"
            />
          </div>
          <p className="mono text-faint mt-5 text-[0.6875rem] tracking-[0.1em] uppercase">
            {profile.location} · {profile.yearsOfExperience}+ yıl piyasa deneyimi
          </p>
        </div>

        <div className="md:col-span-7">
          <div className="space-y-5">
            {about.body.slice(1).map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-muted text-body-lg">
                {paragraph}
              </p>
            ))}
          </div>

          {about.quote ? (
            <blockquote className="redbar mt-10">
              <p className="text-headline text-ink">{about.quote}</p>
              <cite className="mono text-faint mt-4 block text-[0.6875rem] tracking-[0.1em] uppercase not-italic">
                {profile.fullName}
              </cite>
            </blockquote>
          ) : null}

          <SectionMore href="/ozgecmis">Tüm özgeçmiş</SectionMore>
        </div>
      </div>

      <div className="mt-20">
        <Folio>Öne Çıkanlar</Folio>
        <div className="mt-8 grid gap-px md:grid-cols-2 lg:grid-cols-4">
          {about.highlights.map((item, i) => (
            <article
              key={item.title}
              className="border-signal bg-paper border-t-2 p-7"
            >
              <span className="mono text-signal text-[0.6875rem] tracking-[0.1em]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-title text-ink mt-4">{item.title}</h3>
              <p className="text-muted mt-3 text-sm">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
