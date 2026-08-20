import { getPerson, isSectionEnabled } from "@/lib/person";
import { Section, SectionHead, SectionMore, IndexRow } from "@/components/ui/Section";

/** Dört aşamalı karar çerçevesi — numaralı editoryal satırlar. */
export function Method({ compact = false }: { compact?: boolean }) {
  const { method } = getPerson();
  if (!isSectionEnabled("method") || !method.steps.length) return null;

  return (
    <Section id="yaklasim" tone="paper">
      <SectionHead
        folio="02 — Yöntem"
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

      {compact ? null : (
        <SectionMore href="/piyasa-yaklasimi">Yaklaşımın tamamı</SectionMore>
      )}
    </Section>
  );
}
