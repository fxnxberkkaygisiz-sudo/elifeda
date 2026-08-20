import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { Masthead } from "@/components/layout/Masthead";
import { Footer } from "@/components/layout/Footer";
import { getPerson, siteUrl } from "@/lib/person";
import "./globals.css";

// "Sinyal" tasarım sistemi — tek aile: Archivo. Hiyerarşi ağırlık ve
// aralıkla kurulur; ayrı bir mono aile kullanılmaz.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});


const { profile, seo, navigation } = getPerson();
const base = siteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: { default: seo.titleDefault, template: seo.titleTemplate },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: profile.fullName, url: base }],
  creator: profile.fullName,
  publisher: profile.fullName,
  applicationName: seo.siteName,
  category: "finance",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "/",
    languages: { "tr-TR": base },
  },
  openGraph: {
    type: "profile",
    firstName: profile.firstName,
    lastName: profile.lastName,
    gender: "female",
    title: seo.titleDefault,
    description: seo.description,
    url: base,
    siteName: seo.siteName,
    locale: seo.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.titleDefault,
    description: seo.description,
    creator: seo.twitterHandle || undefined,
    site: seo.twitterHandle || undefined,
  },
  appleWebApp: {
    capable: true,
    title: seo.siteName,
    statusBarStyle: "black-translucent",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Search Console doğrulama kodu — person.json > seo alanından gelir.
    google: seo.googleSiteVerification || undefined,
    yandex: seo.yandexVerification || undefined,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#17181a",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${archivo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:bg-signal focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:text-sm focus:text-white focus:not-sr-only"
        >
          İçeriğe geç
        </a>
        <Masthead name={profile.fullName} nav={navigation} />
        <main id="main" className="grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
