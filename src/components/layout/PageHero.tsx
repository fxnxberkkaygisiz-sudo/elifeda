import Link from "next/link";
import { Folio } from "@/components/ui/Section";

/**
 * Alt sayfa başlığı — künye + dev H1 + izlek (breadcrumb).
 */
export function PageHero({
  folio,
  title,
  intro,
  breadcrumb,
}: {
  folio: string;
  title: string;
  intro?: string;
  breadcrumb: { name: string; path: string }[];
}) {
  // Kırmızı nokta son kelimeden kopmasın diye başlık ikiye ayrılır.
  const words = title.split(" ");
  const lastWord = words.pop() ?? "";
  const leadWords = words.join(" ");

  return (
    <section className="bg-paper">
      <div className="shell pt-14 pb-16 md:pt-20 md:pb-20">
        <nav aria-label="İzlek" className="mb-10">
          <ol className="mono text-faint flex flex-wrap items-center gap-2 text-[0.6875rem] tracking-[0.1em] uppercase">
            {breadcrumb.map((crumb, i) => (
              <li key={crumb.path} className="flex items-center gap-2">
                {i > 0 ? <span aria-hidden="true">/</span> : null}
                {i === breadcrumb.length - 1 ? (
                  <span className="text-ink">{crumb.name}</span>
                ) : (
                  <Link href={crumb.path} className="hover:text-signal transition-colors">
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <Folio>{folio}</Folio>
          </div>
          <div className="md:col-span-8">
            <h1 className="text-page text-ink uppercase">
              {leadWords ? `${leadWords} ` : ""}
              <span className="whitespace-nowrap">
                {lastWord}
                <span className="text-signal">.</span>
              </span>
            </h1>
            {intro ? (
              <p className="text-body-lg text-muted border-rule mt-10 max-w-2xl border-t pt-8">
                {intro}
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <div className="bg-signal h-px w-full" aria-hidden="true" />
    </section>
  );
}
