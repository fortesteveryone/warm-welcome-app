import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { ProductShowcase } from "@/components/home/visual-sections";
import { FinalCTA } from "@/components/final-cta";
import { Hero } from "@/components/home/sections/hero";
import { Scope } from "@/components/home/sections/scope";
import { AfterLogin } from "@/components/home/sections/after-login";
import { Platforms } from "@/components/home/sections/platforms";
import { Scoring } from "@/components/home/sections/scoring";
import { Pricing } from "@/components/home/sections/pricing";
import { BuiltFor } from "@/components/home/sections/built-for";
import { FAQ } from "@/components/home/sections/faq";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Postly — Website service opportunities from public social posts" },
      { name: "description", content: "Postly turns public website-service posts on Facebook, LinkedIn, and Reddit into structured, scored, outreach-ready opportunities for web agencies, freelancers and CMS specialists." },
      { property: "og:title", content: "Postly — Website service opportunities from public social posts" },
      { property: "og:description", content: "Find website design, development, redesign and CMS opportunities from public social posts — scored and ready for outreach." },
      { property: "og:url", content: "https://friendly-code-place.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://friendly-code-place.lovable.app/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <Hero />
      <Scope />
      <ProductShowcase />
      <AfterLogin />
      <Platforms />
      <Scoring />
      <Pricing />
      <BuiltFor />
      <FAQ />
      <FinalCTA />
      <SiteFooter />
    </div>
  );
}
