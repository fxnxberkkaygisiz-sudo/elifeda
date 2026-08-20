import Image from "next/image";
import { getPerson } from "@/lib/person";
import { ActionLink, Folio } from "@/components/ui/Section";

/**
 * Açılış — asimetrik editoryal ızgara.
 * Solda dev isim tipografisi, sağda kırmızı ofset çerçeveli portre.
 */
export function Hero() {
  const { profile } = getPerson();
  const portrait = profile.photos.portrait;

  return (
    <section className="bg-paper relative overflow-hidden">
      <div className="shell pt-14 pb-16 md:pt-20 md:pb-24">
        <div className="grid items-end gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <Folio>{profile.title}</Folio>

            <h1 className="text-mega text-ink mt-8 uppercase">
              {profile.firstName}
              <br />
              <span className="whitespace-nowrap">
                {profile.lastName}
                <span className="text-signal">.</span>
              </span>
            </h1>

            <div className="border-rule mt-10 border-t pt-8">
              <p className="text-headline text-ink max-w-xl">
                {profile.tagline}
              </p>
              <p className="text-body-lg text-muted mt-6 max-w-xl">
                {profile.shortBio}
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <ActionLink href="/ozgecmis">Hakkında</ActionLink>
              <ActionLink href="/iletisim" variant="outline">
                İletişim
              </ActionLink>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="frame-offset relative isolate max-w-md md:ml-auto">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                width={portrait.w}
                height={portrait.h}
                priority
                sizes="(min-width: 768px) 34vw, 100vw"
                className="w-full object-cover grayscale-[0.15]"
              />
              <span
                className="bg-signal absolute -top-px -left-px z-10 h-14 w-1"
                aria-hidden="true"
              />
            </div>

            <dl className="border-rule mt-14 grid grid-cols-2 gap-x-6 gap-y-5 border-t pt-6">
              <div>
                <dt className="mono text-faint text-[0.6875rem] tracking-[0.12em] uppercase">
                  Konum
                </dt>
                <dd className="text-title text-ink mt-1.5">
                  {profile.location}
                </dd>
              </div>
              <div>
                <dt className="mono text-faint text-[0.6875rem] tracking-[0.12em] uppercase">
                  Diller
                </dt>
                <dd className="text-title text-ink mt-1.5">
                  {profile.languages.join(" · ")}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Kırmızı ince ayraç — hero ile şeridi ayırır */}
      <div className="bg-signal h-px w-full" aria-hidden="true" />
    </section>
  );
}
