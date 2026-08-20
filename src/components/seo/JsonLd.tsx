import { getPerson, siteUrl } from "@/lib/person";

function JsonLdScript({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // Statik, güvenilir (person.json) veriden üretilir.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Ana sayfa: Person + WebSite + ProfilePage + hizmet kataloğu. */
export function PersonJsonLd() {
  const { profile, seo, socials, credentials, education } = getPerson();
  const base = siteUrl();

  const alumni = credentials
    .filter((c) => c.kind === "education")
    .map((c) => ({ "@type": "CollegeOrUniversity", name: c.name }));

  const certs = credentials
    .filter((c) => c.kind === "certification")
    .map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.name,
      description: c.detail,
    }));

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${base}/#person`,
        name: profile.fullName,
        givenName: profile.firstName,
        familyName: profile.lastName,
        jobTitle: profile.title,
        description: profile.shortBio,
        url: base,
        image: profile.avatar ? `${base}${profile.avatar}` : undefined,
        address: {
          "@type": "PostalAddress",
          addressLocality: profile.location,
          addressCountry: "TR",
        },
        birthPlace: profile.birthPlace
          ? { "@type": "Place", name: profile.birthPlace }
          : undefined,
        alumniOf: alumni.length ? alumni : undefined,
        hasCredential: certs.length ? certs : undefined,
        knowsAbout: profile.knowsAbout,
        knowsLanguage: profile.languages,
        sameAs: socials.length ? socials.map((s) => s.url) : undefined,
        makesOffer: education.items.map((item) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: item.title,
            description: item.description,
            educationalLevel: item.level,
            provider: { "@id": `${base}/#person` },
          },
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: seo.siteName,
        alternateName: seo.alternateNames.length
          ? seo.alternateNames
          : undefined,
        description: seo.description,
        inLanguage: "tr-TR",
        publisher: { "@id": `${base}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${base}/#webpage`,
        url: base,
        name: seo.titleDefault,
        description: seo.description,
        inLanguage: "tr-TR",
        isPartOf: { "@id": `${base}/#website` },
        about: { "@id": `${base}/#person` },
        mainEntity: { "@id": `${base}/#person` },
      },
    ],
  };

  return <JsonLdScript data={data} />;
}

/** Ana menüyü makine tarafından okunabilir hale getirir. */
export function SiteNavigationJsonLd() {
  const { navigation } = getPerson();
  const base = siteUrl();

  const items = navigation.filter(
    (i) => i.href.startsWith("/") && !i.href.includes("#")
  );
  if (!items.length) return null;

  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        "@id": `${base}/#navigation`,
        name: "Ana menü",
        itemListElement: items.map((item, i) => ({
          "@type": "SiteNavigationElement",
          position: i + 1,
          name: item.label,
          url: `${base}${item.href === "/" ? "" : item.href}`,
        })),
      }}
    />
  );
}

/** Alt sayfa yol hiyerarşisi. */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const base = siteUrl();

  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${base}${item.path === "/" ? "" : item.path}`,
        })),
      }}
    />
  );
}

/** Yalnızca /sorular sayfasında kullanılır. */
export function FaqJsonLd() {
  const { faq } = getPerson();
  if (!faq.length) return null;
  const base = siteUrl();

  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${base}/sorular#faq`,
        inLanguage: "tr-TR",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }}
    />
  );
}

/** /ozgecmis sayfası için biyografi işaretlemesi. */
export function ProfilePageJsonLd({ path }: { path: string }) {
  const { profile, about } = getPerson();
  const base = siteUrl();

  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${base}${path}#webpage`,
        url: `${base}${path}`,
        name: `${profile.fullName} Kimdir?`,
        description: profile.shortBio,
        inLanguage: "tr-TR",
        isPartOf: { "@id": `${base}/#website` },
        about: { "@id": `${base}/#person` },
        mainEntity: { "@id": `${base}/#person` },
        text: about.body.join(" "),
      }}
    />
  );
}
