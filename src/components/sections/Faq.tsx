import { Plus } from "lucide-react";
import { getPerson, isSectionEnabled } from "@/lib/person";
import { Section, SectionHead, SectionMore } from "@/components/ui/Section";

/** S.S.S. — hairline ayrımlı açılır liste. */
export function Faq({ compact = false }: { compact?: boolean }) {
  const { faq } = getPerson();
  if (!isSectionEnabled("faq") || !faq.length) return null;

  const items = compact ? faq.slice(0, 4) : faq;

  return (
    <Section id="sorular" tone="paper">
      <SectionHead
        folio="07 — S.S.S."
        title="Sıkça sorulan sorular"
        description="Kapsam, süreç ve sınırlar hakkında en sık gelen soruların yanıtları."
      />

      <div className="mt-14">
        {items.map((item, i) => (
          <details
            key={item.q}
            className="group border-rule border-t py-6"
            name="sss"
          >
            <summary className="flex cursor-pointer list-none items-start gap-5 [&::-webkit-details-marker]:hidden">
              <span className="mono text-signal mt-1.5 shrink-0 text-[0.6875rem] tracking-[0.1em]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-headline text-ink grow transition-colors group-open:text-signal">
                {item.q}
              </h3>
              <Plus
                size={20}
                className="text-signal mt-1 shrink-0 transition-transform duration-300 group-open:rotate-45"
                aria-hidden="true"
              />
            </summary>
            <p className="text-muted mt-5 max-w-3xl pl-0 md:pl-[3.6rem]">
              {item.a}
            </p>
          </details>
        ))}
        <div className="border-rule border-t" />
      </div>

      {compact ? <SectionMore href="/sorular">Tüm sorular</SectionMore> : null}
    </Section>
  );
}
