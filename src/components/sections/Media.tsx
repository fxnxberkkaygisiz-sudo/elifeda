import Image from "next/image";
import { getPerson, isSectionEnabled } from "@/lib/person";
import { Section, SectionHead, SectionMore } from "@/components/ui/Section";

/**
 * Medya ve protokol kareleri — asimetrik ızgara, mono altyazılar.
 * Geniş slot 3:2, dar slot 1:1 kırpılır; böylece satırlar hizalı kalır.
 */
export function Media({ compact = false }: { compact?: boolean }) {
  const { profile } = getPerson();
  if (!isSectionEnabled("media")) return null;

  const frames = [
    {
      photo: profile.photos.signing,
      caption: "Kurumsal iş birliği protokolü imza töreni",
      span: "md:col-span-7",
      ratio: "aspect-[3/2]",
      position: "object-top",
    },
    {
      photo: profile.photos.ceremony,
      caption: "Protokol töreni, kurum temsilcileriyle",
      span: "md:col-span-5",
      ratio: "aspect-square",
      position: "object-center",
    },
    {
      photo: profile.photos.closeup,
      caption: "Portre",
      span: "md:col-span-5",
      ratio: "aspect-square",
      position: "object-center",
    },
    {
      photo: profile.photos.desk,
      caption: "Çalışma masası, analiz notları",
      span: "md:col-span-7",
      ratio: "aspect-[3/2]",
      position: "object-center",
    },
  ].filter((f) => f.photo);

  const visible = compact ? frames.slice(0, 2) : frames;

  return (
    <Section id="medya" tone="band">
      <SectionHead
        folio="06 — Arşiv"
        title="Medya ve protokoller"
        description="Kurumsal iş birlikleri, imza törenleri ve saha programlarından kareler."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-12">
        {visible.map((frame) => (
          <figure key={frame.photo.src} className={frame.span}>
            <div
              className={`bg-band-2 relative w-full overflow-hidden ${frame.ratio}`}
            >
              <Image
                src={frame.photo.src}
                alt={frame.photo.alt}
                fill
                sizes="(min-width: 768px) 55vw, 100vw"
                className={`object-cover transition-transform duration-700 hover:scale-[1.03] ${frame.position}`}
              />
            </div>
            <figcaption className="mono text-faint border-rule mt-3 border-t pt-3 text-[0.6875rem] tracking-[0.1em] uppercase">
              {frame.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {compact ? <SectionMore href="/medya">Tüm arşiv</SectionMore> : null}
    </Section>
  );
}
