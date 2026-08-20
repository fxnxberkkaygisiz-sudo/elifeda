import { Hero } from "@/components/sections/Hero";
import { Ticker } from "@/components/sections/Ticker";
import { About } from "@/components/sections/About";
import { Method } from "@/components/sections/Method";
import { Markets } from "@/components/sections/Markets";
import { Programs } from "@/components/sections/Programs";
import { Brokers } from "@/components/sections/Brokers";
import { Media } from "@/components/sections/Media";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { PersonJsonLd, SiteNavigationJsonLd } from "@/components/seo/JsonLd";

export default function Home() {
  return (
    <>
      <PersonJsonLd />
      <SiteNavigationJsonLd />
      <Hero />
      <Ticker />
      <About />
      <Method />
      <Markets />
      <Programs />
      <Brokers />
      <Media compact />
      <Faq compact />
      <Contact />
    </>
  );
}
