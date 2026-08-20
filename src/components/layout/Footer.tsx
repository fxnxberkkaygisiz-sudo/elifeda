import Link from "next/link";
import { getPerson } from "@/lib/person";

/**
 * Alt künye — antrasit blok, dergi kolofonu düzeni.
 * Solda dev isim, sağda bağlantı sütunları, altta yasal şerit.
 */
export function Footer() {
  const { profile, seo, footerLinks, legal, contact, socials, expertise } =
    getPerson();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-on-dark-soft">
      <div className="shell py-20 md:py-24">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <p className="mono text-on-dark-soft text-[0.6875rem] tracking-[0.12em] uppercase">
              <span className="bg-signal mr-3 inline-block h-2.5 w-2.5 align-middle" />
              {seo.siteName}
            </p>
            <p className="text-display text-on-dark mt-6">
              {profile.firstName}
              <br />
              <span className="whitespace-nowrap">
                {profile.lastName}
                <span className="text-signal">.</span>
              </span>
            </p>
            <p className="mt-6 max-w-sm text-sm">{profile.title}</p>
            <p className="mono text-faint mt-8 text-[0.6875rem] tracking-[0.1em] uppercase">
              {profile.location} · TR
            </p>
          </div>

          <nav
            aria-label="Alt menü"
            className="md:col-span-4 md:col-start-7"
          >
            <p className="mono text-faint text-[0.6875rem] tracking-[0.12em] uppercase">
              Site Haritası
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="underlink hover:text-on-dark text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {socials.length ? (
              <>
                <p className="mono text-faint mt-10 text-[0.6875rem] tracking-[0.12em] uppercase">
                  Sosyal
                </p>
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                  {socials.map((s) => (
                    <li key={s.url}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="me noopener noreferrer"
                        className="underlink hover:text-on-dark text-sm transition-colors"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </nav>

          <div className="md:col-span-2">
            <p className="mono text-faint text-[0.6875rem] tracking-[0.12em] uppercase">
              Alanlar
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {expertise.slice(0, 5).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-rule-dark border-t">
        <div className="shell flex flex-col gap-4 py-7 md:flex-row md:items-center md:justify-between">
          <p className="mono text-faint text-[0.6875rem] tracking-[0.09em] uppercase">
            © {year} {profile.fullName} · {legal.copyright}
          </p>
          <p className="text-faint max-w-xl text-xs">{legal.disclaimer}</p>
        </div>
      </div>

      {contact.email ? (
        <span className="sr-only">{contact.email}</span>
      ) : null}
    </footer>
  );
}
