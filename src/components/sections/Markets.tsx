import { getPerson, isSectionEnabled } from "@/lib/person";
import { Section, SectionHead } from "@/components/ui/Section";

/** Takip edilen piyasalar — dev mono bölge kodları. */
export function Markets() {
  const { markets, expertise } = getPerson();
  if (!isSectionEnabled("markets") || !markets.length) return null;

  return (
    <Section id="piyasalar" tone="dark">
      <SectionHead
        folio="03 — Kapsam"
        title="Çalışma alanı: Borsa İstanbul"
        description="Tüm analiz ve eğitim çalışmaları Borsa İstanbul hisse senedi piyasası üzerinedir. Endeks, sektör ve hisse üç ayrı ölçekte birlikte okunur."
        dark
      />

      <div className="mt-14 grid gap-px md:grid-cols-3">
        {markets.map((market) => (
          <article key={market.region} className="border-rule-dark border-t py-8 md:pr-8">
            <span className="mono text-signal text-5xl leading-none font-medium tracking-tight">
              {market.region}
            </span>
            <h3 className="text-headline text-on-dark mt-5">{market.label}</h3>
            <p className="text-on-dark-soft mt-3 text-sm">{market.description}</p>
          </article>
        ))}
      </div>

      <div className="border-rule-dark mt-16 border-t pt-8">
        <p className="mono text-faint text-[0.6875rem] tracking-[0.12em] uppercase">
          Uzmanlık Alanları
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          {expertise.map((item) => (
            <li key={item} className="text-on-dark-soft flex items-center gap-3 text-sm">
              <span className="bg-signal h-1 w-1 shrink-0" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
