"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import type { NavLink } from "@/lib/person";

/**
 * Üst künye çubuğu — ince, mono, hairline alt çizgili.
 * Aktif sayfa kırmızı alt çizgiyle işaretlenir.
 */
export function Masthead({ name, nav }: { name: string; nav: NavLink[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Menü açıkken arka plan kaymasın.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="bg-paper/95 border-rule sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="shell flex h-16 items-center justify-between gap-6 md:h-20">
        <Link
          href="/"
          className="mono flex items-center gap-2.5 text-[0.8125rem] font-semibold tracking-[0.14em] uppercase"
        >
          <span
            className="bg-signal inline-block h-2.5 w-2.5"
            aria-hidden="true"
          />
          {name}
        </Link>

        <nav aria-label="Ana menü" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`mono relative py-1 text-[0.6875rem] font-semibold tracking-[0.1em] uppercase transition-colors ${
                      active ? "text-ink" : "text-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`bg-signal absolute -bottom-0.5 left-0 h-px transition-all duration-300 ${
                        active ? "w-full" : "w-0"
                      }`}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobil-menu"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          className="border-rule text-ink hover:border-signal hover:text-signal flex h-10 w-10 items-center justify-center border transition-colors lg:hidden"
        >
          {open ? <X size={17} /> : <Menu size={17} />}
        </button>
      </div>

      {open ? (
        <nav
          id="mobil-menu"
          aria-label="Mobil menü"
          className="bg-paper border-rule border-t lg:hidden"
        >
          <ul className="shell py-2">
            {nav.map((item, i) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <li key={item.href} className="border-rule border-b last:border-b-0">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-4"
                  >
                    <span className="mono text-signal w-6 text-[0.6875rem] tracking-widest">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-title ${active ? "text-signal" : "text-ink"}`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
