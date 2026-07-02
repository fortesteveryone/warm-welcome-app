import React from "react";
import { Check, Code2, Layers, Search, X } from "lucide-react";
import {
  SiShopify, SiWebflow, SiFramer, SiWordpress, SiWix,
  SiNextdotjs, SiReact, SiLaravel, SiPhp, SiNodedotjs,
} from "react-icons/si";
import { Container, Mono, SectionTitle } from "@/components/home/primitives";

type BrandMark = { Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string };
const tagBrand: Record<string, BrandMark[]> = {
  WordPress: [{ Icon: SiWordpress, color: "#21759B" }],
  Webflow:   [{ Icon: SiWebflow,   color: "#146EF5" }],
  Wix:       [{ Icon: SiWix,       color: "#0C6EFC" }],
  Framer:    [{ Icon: SiFramer,    color: "#0055FF" }],
  "Shopify website rebuild": [{ Icon: SiShopify, color: "#95BF47" }],
  "Next.js":  [{ Icon: SiNextdotjs, color: "#111111" }],
  React:      [{ Icon: SiReact,     color: "#61DAFB" }],
  Laravel:    [{ Icon: SiLaravel,   color: "#FF2D20" }],
  PHP:        [{ Icon: SiPhp,       color: "#777BB4" }],
  "Node.js":  [{ Icon: SiNodedotjs, color: "#5FA04E" }],
};

const scopeCategories: {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  tags: string[];
}[] = [
  {
    Icon: Code2,
    title: "Website work — any stack",
    subtitle: "CMS or custom code — if it's a website, it counts.",
    tags: ["Website design", "Website development", "Design + development", "Redesign", "Rebuild", "Landing pages", "Custom code builds"],
  },
  {
    Icon: Layers,
    title: "CMS & custom stacks",
    subtitle: "Not just CMS. Next.js, React, Laravel, PHP, Node — all in scope.",
    tags: ["WordPress", "Webflow", "Wix", "Framer", "Shopify website rebuild", "Next.js", "React", "Laravel", "PHP", "Node.js"],
  },
  {
    Icon: Search,
    title: "Migrations & setup",
    subtitle: "Moving between CMS platforms or from a custom stack to a CMS (and vice versa).",
    tags: ["WordPress → Webflow", "Wix → WordPress", "Shopify → Webflow", "WordPress → Next.js", "CMS setup", "Platform migration"],
  },
];

const outOfScope = [
  "E-commerce only", "Plumber sites only", "Portfolio only", "Restaurant sites only",
  "Real estate only", "WordPress only", "Next.js only", "PHP only", "Shopify only",
];

export function Scope() {
  return (
    <section className="section-edge section-dark relative overflow-hidden">
      <Container className="relative py-16 md:py-20">
        <SectionTitle
          kicker="What we cover"
          title={<>Any <span className="text-[color:var(--signal)]">website build</span> — CMS or custom code.</>}
          lede="Postly tracks posts where people ask for website design, development, redesign, landing pages, CMS work, or custom stack builds — WordPress, Webflow, Next.js, Laravel, PHP, and more."
        />

        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {scopeCategories.map(({ Icon, title, subtitle, tags }) => {
            return (
              <div
                key={title}
                className="group relative overflow-hidden rounded-xl border border-border bg-white p-5 transition hover:-translate-y-0.5 hover:border-[color:var(--signal)]/40 hover:shadow-[0_20px_60px_-30px_oklch(0.72_0.19_145/0.35)]"
              >
                <div className="relative flex items-center gap-3">
                  <div className="icon-pop grid h-9 w-9 place-items-center rounded-lg border border-border bg-background/40 text-[color:var(--signal)]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
                </div>
                <p className="relative mt-2 text-xs text-muted-foreground">{subtitle}</p>
                <div className="relative mt-4 flex flex-wrap gap-1.5">
                  {tags.map((t) => {
                    const brand = tagBrand[t];
                    return (
                      <span key={t} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/60 px-2 py-0.5 text-[11px] text-muted-foreground">
                        {brand?.map((b, i) => <b.Icon key={i} className="h-3 w-3" style={{ color: b.color }} />)}
                        {t}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-xl border border-[color:var(--signal)]/30 bg-gradient-to-br from-[color:var(--signal)]/12 via-card to-card p-5">
            <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-md bg-[color:var(--signal)]/20 blur-3xl" />
            <div className="relative flex items-center gap-2">
              <Check className="h-4 w-4 text-[color:var(--signal)]" />
              <Mono className="text-[color:var(--signal)]">In scope</Mono>
            </div>
            <p className="relative mt-2 text-sm text-foreground/90">
              Anyone selling website design, development, redesign, rebuild, landing pages, CMS setup, or platform migration services. If a public post asks for this kind of website help, it belongs in Postly.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-white p-5">
            <div className="flex items-center gap-2">
              <X className="h-4 w-4 text-red-500" />
              <Mono className="text-red-500">We don't narrow by</Mono>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              No niche, industry, or stack filter — every website-service post is in, whether it's e-commerce, plumbing, WordPress, or Next.js.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {outOfScope.map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/40 px-2 py-0.5 text-[11px] text-foreground/70 line-through decoration-red-500/60 decoration-[0.5px]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Postly is built for website-service sellers. If the post is not about website or CMS help, we do not treat it as a qualified opportunity.
        </p>
      </Container>
    </section>
  );
}
