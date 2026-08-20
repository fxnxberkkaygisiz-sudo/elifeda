import { Mail } from "lucide-react";
import { getPerson } from "@/lib/person";
import { Section, Folio } from "@/components/ui/Section";

/** Kapanış çağrısı — antrasit zeminde dev tipografi. */
export function Contact({ full = false }: { full?: boolean }) {
  const { profile, contact, socials } = getPerson();

  return (
    <Section id="iletisim" tone="dark">
      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7">
          <Folio dark>08 — Bağlantı</Folio>
          <h2 className="text-mega text-on-dark mt-8 uppercase">
            İletişim
            <span className="text-signal">.</span>
          </h2>
          <p className="text-body-lg text-on-dark-soft mt-8 max-w-xl">
            {contact.note}
          </p>
        </div>

        <div className="md:col-span-5">
          <dl className="border-rule-dark border-t">
            <div className="border-rule-dark flex flex-col gap-1 border-b py-6">
              <dt className="mono text-faint text-[0.6875rem] tracking-[0.12em] uppercase">
                E-posta
              </dt>
              <dd className="text-title text-on-dark">
                {contact.email ? (
                  <a
                    href={`mailto:${contact.email}`}
                    className="underlink inline-flex items-center gap-2.5"
                  >
                    <Mail size={17} className="text-signal" />
                    {contact.email}
                  </a>
                ) : (
                  <span className="text-on-dark-soft">
                    E-posta adresi eklenecek
                  </span>
                )}
              </dd>
            </div>

            <div className="border-rule-dark flex flex-col gap-1 border-b py-6">
              <dt className="mono text-faint text-[0.6875rem] tracking-[0.12em] uppercase">
                Konum
              </dt>
              <dd className="text-title text-on-dark">{profile.location}</dd>
            </div>

            {socials.length ? (
              <div className="flex flex-col gap-1 py-6">
                <dt className="mono text-faint text-[0.6875rem] tracking-[0.12em] uppercase">
                  Sosyal
                </dt>
                <dd className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                  {socials.map((s) => (
                    <a
                      key={s.url}
                      href={s.url}
                      target="_blank"
                      rel="me noopener noreferrer"
                      className="underlink text-on-dark text-sm"
                    >
                      {s.label}
                    </a>
                  ))}
                </dd>
              </div>
            ) : null}
          </dl>

          {full ? (
            <p className="text-faint mt-8 text-xs">
              Bireysel yatırım tavsiyesi, portföy yönetimi ve alım-satım talepleri
              yanıtlanmaz. Bu site yatırım danışmanlığı kapsamında değildir.
            </p>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
