import { getPerson, isSectionEnabled } from "@/lib/person";
import { Section, SectionHead, ActionLink } from "@/components/ui/Section";

/** Referanslı aracı kurumlar — kırmızı zeminli tek blok. */
export function Brokers() {
  const { brokers } = getPerson();
  if (!isSectionEnabled("brokers") || !brokers.items.length) return null;

  return (
    <Section id="araci-kurum" tone="paper">
      <SectionHead
        folio="05 — İş Birliği"
        title={brokers.heading}
        description={brokers.description}
      />

      <div
        className={`mt-14 grid gap-px ${
          brokers.items.length >= 2 ? "lg:grid-cols-3" : "lg:grid-cols-2"
        }`}
      >
        {brokers.items.map((broker) => (
          <article
            key={broker.name}
            className="bg-signal flex flex-col justify-between p-9 text-white md:p-11"
          >
            <div>
              <p className="mono text-[0.6875rem] tracking-[0.12em] text-white/70 uppercase">
                {broker.role}
              </p>
              {broker.logo ? (
                <h3 className="mt-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={broker.logo}
                    alt={broker.name}
                    className="h-12 w-auto max-w-[260px] object-contain object-left"
                  />
                </h3>
              ) : (
                <h3 className="text-display mt-5">{broker.name}</h3>
              )}
              <p className="mt-5 max-w-md text-white/85">{broker.description}</p>
            </div>

            {broker.registerHref ? (
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={broker.registerHref}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="mono text-signal inline-flex items-center gap-2.5 bg-white px-7 py-4 text-[0.6875rem] font-semibold tracking-[0.1em] uppercase transition-colors hover:bg-ink hover:text-white"
                >
                  {broker.registerLabel}
                  <span aria-hidden="true">↗</span>
                </a>
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
            ) : null}
          </article>
        ))}

        <div className="border-rule flex flex-col justify-between gap-10 border p-9 md:p-11 lg:col-span-full lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="mono text-faint text-[0.6875rem] tracking-[0.12em] uppercase">
              Kapsam
            </p>
            <p className="text-body-lg text-muted mt-6">{brokers.note}</p>
          </div>
          <div className="shrink-0">
            <ActionLink href="/araci-kurumlar" variant="outline">
              Ayrıntılar
            </ActionLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
