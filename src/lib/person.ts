import { z } from "zod";
import personJson from "@/person.json";

/* ------------------------------------------------------------------
   person.json — TEK veri kaynağı.
   Bu dosya Zod ile valide edilir; tüm site verisi buradan (getPerson)
   okunur. Hiçbir bileşen person.json'ı doğrudan import etmemeli.
------------------------------------------------------------------- */

const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const personSchema = z.object({
  profile: z.object({
    firstName: z.string(),
    lastName: z.string(),
    fullName: z.string(),
    title: z.string(),
    tagline: z.string(),
    shortBio: z.string(),
    location: z.string(),
    birthPlace: z.string().optional().default(""),
    birthYear: z.number().optional(),
    activeSince: z.number().optional(),
    yearsOfExperience: z.number().optional().default(0),
    /** Boşsa portre yerine monogram bloğu gösterilir. */
    avatar: z.string().optional().default(""),
    avatarWidth: z.number().optional().default(1024),
    avatarHeight: z.number().optional().default(1024),
    avatarAlt: z.string().optional().default(""),
    photos: z
      .record(
        z.string(),
        z.object({
          src: z.string(),
          w: z.number(),
          h: z.number(),
          alt: z.string().optional().default(""),
        })
      )
      .optional()
      .default({}),
    languages: z.array(z.string()).default([]),
    knowsAbout: z.array(z.string()).default([]),
  }),
  seo: z.object({
    siteName: z.string(),
    titleDefault: z.string(),
    titleTemplate: z.string(),
    description: z.string(),
    keywords: z.array(z.string()).default([]),
    alternateNames: z.array(z.string()).default([]),
    url: z.url(),
    locale: z.string().optional().default("tr_TR"),
    twitterHandle: z.string().optional().default(""),
    googleSiteVerification: z.string().optional().default(""),
    yandexVerification: z.string().optional().default(""),
  }),
  navigation: z.array(linkSchema).default([]),
  /** Alt sayfaların başlık/açıklama metinleri (SEO + H1). */
  pages: z
    .record(
      z.string(),
      z.object({
        tag: z.string().optional().default(""),
        h1: z.string(),
        title: z.string(),
        description: z.string(),
        intro: z.string().optional().default(""),
      })
    )
    .default({}),
  about: z
    .object({
      heading: z.string().optional().default(""),
      body: z.array(z.string()).default([]),
      quote: z.string().optional().default(""),
      highlights: z
        .array(
          z.object({
            title: z.string(),
            description: z.string().optional().default(""),
          })
        )
        .default([]),
    })
    .prefault({}),
  /** Eğitim geçmişi ve sertifikalar. */
  credentials: z
    .array(
      z.object({
        name: z.string(),
        detail: z.string().optional().default(""),
        kind: z.enum(["education", "certification"]),
      })
    )
    .default([]),
  /** Dört aşamalı analiz çerçevesi. */
  method: z
    .object({
      heading: z.string().optional().default(""),
      description: z.string().optional().default(""),
      steps: z
        .array(
          z.object({
            step: z.string(),
            title: z.string(),
            description: z.string(),
          })
        )
        .default([]),
    })
    .prefault({}),
  expertise: z.array(z.string()).default([]),
  education: z
    .object({
      heading: z.string().optional().default(""),
      description: z.string().optional().default(""),
      items: z
        .array(
          z.object({
            title: z.string(),
            level: z.string().optional().default(""),
            description: z.string().optional().default(""),
          })
        )
        .default([]),
    })
    .prefault({}),
  markets: z
    .array(
      z.object({
        region: z.string(),
        label: z.string(),
        description: z.string().optional().default(""),
      })
    )
    .default([]),
  brokers: z
    .object({
      tag: z.string().optional().default("Aracı Kurum"),
      heading: z.string().optional().default(""),
      description: z.string().optional().default(""),
      note: z.string().optional().default(""),
      items: z
        .array(
          z.object({
            name: z.string(),
            role: z.string().optional().default(""),
            logo: z.string().optional().default(""),
            description: z.string().optional().default(""),
            registerLabel: z.string().optional().default("Hesap Aç"),
            registerHref: z.string().optional().default(""),
          })
        )
        .default([]),
    })
    .prefault({}),
  faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  socials: z
    .array(
      z.object({
        platform: z.string(),
        label: z.string(),
        handle: z.string().optional().default(""),
        url: z.string(),
      })
    )
    .default([]),
  contact: z
    .object({
      email: z.string().optional().default(""),
      phone: z.string().optional().default(""),
      note: z.string().optional().default(""),
    })
    .prefault({}),
  footerLinks: z.array(linkSchema).default([]),
  legal: z
    .object({
      tag: z.string().optional().default(""),
      title: z.string().optional().default(""),
      intro: z.string().optional().default(""),
      disclaimer: z.string().optional().default(""),
      copyright: z.string().optional().default(""),
      sections: z
        .array(z.object({ title: z.string(), body: z.string() }))
        .default([]),
    })
    .prefault({}),
  sitemap: z
    .array(
      z.object({
        path: z.string(),
        changeFrequency: z
          .enum([
            "always",
            "hourly",
            "daily",
            "weekly",
            "monthly",
            "yearly",
            "never",
          ])
          .optional()
          .default("monthly"),
        priority: z.number().min(0).max(1).optional().default(0.5),
      })
    )
    .default([]),
  sections: z.record(z.string(), z.boolean()).default({}),
});

export type Person = z.infer<typeof personSchema>;
export type PageMeta = Person["pages"][string];
export type NavLink = Person["navigation"][number];

let cached: Person | null = null;

/**
 * person.json'ı valide ederek döndürür (build-time cache'li).
 * Hatalı/eksik veri build'i anlamlı bir mesajla durdurur.
 */
export function getPerson(): Person {
  if (cached) return cached;
  const parsed = personSchema.safeParse(personJson);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  • ${i.path.join(".") || "(kök)"}: ${i.message}`)
      .join("\n");
    throw new Error(
      `person.json doğrulanamadı. Lütfen aşağıdaki alanları düzeltin:\n${issues}`
    );
  }
  cached = parsed.data;
  return cached;
}

/** Belirli bir bölümün açık olup olmadığını döndürür (varsayılan: açık). */
export function isSectionEnabled(key: string): boolean {
  return getPerson().sections[key] !== false;
}

/** Sondaki "/" olmadan kanonik site adresi. */
export function siteUrl(): string {
  return getPerson().seo.url.replace(/\/$/, "");
}

/**
 * Alt sayfa metinlerini döndürür (person.json > pages).
 * Eksik anahtar build'i anlamlı bir hatayla durdurur.
 */
export function getPage(slug: string): PageMeta {
  const page = getPerson().pages[slug];
  if (!page) {
    throw new Error(
      `person.json > pages içinde "${slug}" tanımlı değil. Lütfen bu sayfanın başlık ve açıklamasını ekleyin.`
    );
  }
  return page;
}
