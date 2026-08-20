import type { Metadata } from "next";
import { getPerson } from "@/lib/person";
import { ActionLink, Folio } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const { navigation } = getPerson();

  return (
    <section className="bg-paper">
      <div className="shell py-24 md:py-32">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Folio>Hata 404</Folio>
          </div>
          <div className="md:col-span-8">
            <h1 className="text-page text-ink uppercase">
              Sayfa
              <br />
              <span className="whitespace-nowrap">
                bulunamadı<span className="text-signal">.</span>
              </span>
            </h1>
            <p className="text-body-lg text-muted border-rule mt-10 max-w-xl border-t pt-8">
              Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Aşağıdaki
              bölümlerden devam edebilirsiniz.
            </p>

            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="underlink text-title text-ink pb-1"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <ActionLink href="/">Ana sayfaya dön</ActionLink>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-signal h-px w-full" aria-hidden="true" />
    </section>
  );
}
