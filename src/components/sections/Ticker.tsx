import { getPerson } from "@/lib/person";

/** Şeridin tek turu — kesintisiz akış için iki kez basılır. */
function TickerRow({
  items,
  duplicate = false,
}: {
  items: string[];
  duplicate?: boolean;
}) {
  return (
    <span
      className="flex shrink-0 items-center"
      aria-hidden={duplicate ? "true" : undefined}
    >
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className="mono text-on-dark px-6 text-[0.6875rem] tracking-[0.12em] whitespace-nowrap uppercase">
            {item}
          </span>
          <span className="bg-signal h-1.5 w-1.5 shrink-0" aria-hidden="true" />
        </span>
      ))}
    </span>
  );
}

/**
 * Uzmanlık şeridi — antrasit zeminde yatay akan mono künye.
 * Sitenin imza detayı; hareketi azaltılmış tercihte durur.
 */
export function Ticker() {
  const { profile } = getPerson();
  const items = profile.knowsAbout;
  if (!items.length) return null;

  return (
    <div className="bg-ink overflow-hidden py-4">
      <div className="ticker-track">
        <TickerRow items={items} />
        <TickerRow items={items} duplicate />
      </div>
    </div>
  );
}
