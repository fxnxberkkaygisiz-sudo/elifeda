import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/* ------------------------------------------------------------------
   "Sinyal" tasarım dili — ortak yapı taşları.
   Keskin köşe, hairline çizgi, mono künye. Gölge ve yuvarlatma yok.
------------------------------------------------------------------- */

/** Mono künye etiketi — başında kısa kırmızı çizgi. */
export function Folio({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <span className={`folio ${dark ? "folio-dark" : ""}`}>
      <span className="folio-mark" aria-hidden="true" />
      {children}
    </span>
  );
}

/** Bölüm kabı. `tone` ile zemin seçilir. */
export function Section({
  id,
  children,
  className = "",
  tone = "paper",
  bordered = true,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  tone?: "paper" | "band" | "dark";
  bordered?: boolean;
}) {
  const bg =
    tone === "dark"
      ? "bg-ink text-on-dark-soft"
      : tone === "band"
        ? "bg-band"
        : "bg-paper";

  const edge = bordered
    ? tone === "dark"
      ? "border-t border-rule-dark"
      : "border-t border-rule"
    : "";

  return (
    <section
      id={id}
      className={`scroll-mt-24 py-20 md:py-28 ${bg} ${edge} ${className}`}
    >
      <div className="shell">{children}</div>
    </section>
  );
}

/**
 * Bölüm başlığı — iki sütunlu editoryal düzen.
 * Solda künye, sağda başlık ve açıklama.
 */
export function SectionHead({
  folio,
  title,
  description,
  dark = false,
}: {
  folio: string;
  title: string;
  description?: string;
  dark?: boolean;
}) {
  return (
    <header className="grid gap-6 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-4">
        <Folio dark={dark}>{folio}</Folio>
      </div>
      <div className="md:col-span-8">
        <h2 className={`text-display ${dark ? "text-on-dark" : "text-ink"}`}>
          {title}
        </h2>
        {description ? (
          <p
            className={`text-body-lg mt-5 max-w-2xl ${
              dark ? "text-on-dark-soft" : "text-muted"
            }`}
          >
            {description}
          </p>
        ) : null}
      </div>
    </header>
  );
}

/** Bölüm altı "devamı" bağlantısı — alt çizgisi hover'da dolar. */
export function SectionMore({
  href,
  children,
  dark = false,
}: {
  href: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group mono mt-12 inline-flex items-center gap-3 text-[0.6875rem] font-semibold tracking-[0.12em] uppercase ${
        dark ? "text-on-dark" : "text-ink"
      }`}
    >
      <span className="underlink pb-1">{children}</span>
      <ArrowRight
        size={15}
        className="text-signal transition-transform duration-300 group-hover:translate-x-1.5"
      />
    </Link>
  );
}

/** Birincil / ikincil eylem — dikdörtgen, keskin köşeli. */
export function ActionLink({
  href,
  children,
  external = false,
  variant = "solid",
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  variant?: "solid" | "outline" | "onDark";
}) {
  const styles: Record<string, string> = {
    solid: "bg-signal text-white hover:bg-signal-deep",
    outline: "border border-ink/25 text-ink hover:border-signal hover:text-signal",
    onDark: "border border-on-dark/30 text-on-dark hover:border-signal hover:bg-signal hover:text-white",
  };

  const classes = `mono inline-flex items-center justify-center gap-2.5 px-7 py-4 text-[0.6875rem] font-semibold tracking-[0.1em] uppercase transition-colors duration-200 ${styles[variant]}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={classes}
      >
        {children}
        <ArrowUpRight size={15} />
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      <ArrowRight size={15} />
    </Link>
  );
}

/**
 * Numaralı editoryal satır — büyük mono indeks + başlık + açıklama.
 * Yöntem ve program listelerinde kullanılır.
 */
export function IndexRow({
  index,
  title,
  meta,
  description,
  dark = false,
}: {
  index: string;
  title: string;
  meta?: string;
  description: string;
  dark?: boolean;
}) {
  return (
    <article
      className={`group grid items-start gap-4 border-t py-9 md:grid-cols-12 md:gap-8 ${
        dark ? "border-rule-dark" : "border-rule"
      }`}
    >
      <div className="md:col-span-2">
        <span className="mono text-signal text-4xl leading-none font-medium tracking-tight md:text-5xl">
          {index}
        </span>
      </div>
      <div className="md:col-span-4">
        <h3
          className={`text-headline ${dark ? "text-on-dark" : "text-ink"} transition-colors group-hover:text-signal`}
        >
          {title}
        </h3>
        {meta ? (
          <span className="mono text-faint mt-2 block text-[0.6875rem] tracking-[0.1em] uppercase">
            {meta}
          </span>
        ) : null}
      </div>
      <div className="md:col-span-6">
        <p className={dark ? "text-on-dark-soft" : "text-muted"}>{description}</p>
      </div>
    </article>
  );
}
