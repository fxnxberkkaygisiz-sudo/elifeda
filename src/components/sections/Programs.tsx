import { getPerson, isSectionEnabled } from "@/lib/person";
import { Section, SectionHead, SectionMore, IndexRow } from "@/components/ui/Section";

/** Eğitim ve mentorluk programları. */
export function Programs({ compact = false }: { compact?: boolean }) {
  const { education } = getPerson();
  if (!isSectionEnabled("education") || !education.items.length) return null;

  return (
    <Section id="egitim" tone="band">
      <SectionHead
        folio="04 — Eğitim"
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

      {compact ? null : (
        <SectionMore href="/egitimler">Program ayrıntıları</SectionMore>
      )}
    </Section>
  );
}
