import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import {
  ArrowRight, ArrowRightLeft, ArrowUpRight, Check, ChevronDown, Code2, Facebook, Filter, Flame, Globe,
  Inbox, Instagram, Layers, Linkedin, Link2, ListChecks, MessageSquare, Paintbrush, Search, Send,
  Shield, ShoppingBag, Sparkles, Target, Users, Wand2, X,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { ProductShowcase } from "@/components/home/visual-sections";
import { HeroReel } from "@/components/home/hero-reel";
import { MockScore, MockSources } from "@/components/home/section-mockups";
import {
  SiShopify, SiWebflow, SiFramer, SiFacebook, SiReddit, SiX, SiInstagram, SiWordpress, SiWix,
  SiSlack, SiAsana, SiAirbnb, SiSpotify, SiFigma, SiGoogle, SiAtlassian, SiZoom, SiHubspot,
  SiNotion, SiLinear, SiVercel, SiStripe, SiThreads,
} from "react-icons/si";
import { FaLinkedin as SiLinkedIn } from "react-icons/fa";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Postly — Website service opportunities from public social posts" },
      { name: "description", content: "Postly turns public website-service posts on Facebook, LinkedIn, Instagram and Reddit into structured, scored, outreach-ready opportunities for web agencies, freelancers and CMS specialists." },
      { property: "og:title", content: "Postly" },
      { property: "og:description", content: "Find website design, development, redesign and CMS opportunities from public social posts." },
    ],
  }),
  component: Home,
});

/* ============================================================ Primitives ============================================================ */

function Mono({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-mono text-[11px] tracking-tight ${className}`}>{children}</span>;
}

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-6 ${className}`}>{children}</div>;
}

function SectionTitle({ kicker, title, lede }: { kicker: string; title: React.ReactNode; lede?: string }) {
  return (
    <div className="max-w-4xl">
      <Mono className="text-muted-foreground">{kicker}</Mono>
      <h2 className="mt-3 max-w-3xl text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.02em] sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {lede && <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-[17px]">{lede}</p>}
    </div>
  );
}

function Tag({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "hot" | "warm" | "cold" | "signal" }) {
  const tones = {
    default: "border-border bg-card text-foreground",
    hot: "border-[color:var(--hot)]/30 bg-[color:var(--hot)]/10 text-[color:var(--hot)]",
    warm: "border-[color:var(--warm)]/30 bg-[color:var(--warm)]/10 text-[color:var(--warm)]",
    cold: "border-[color:var(--cold)]/30 bg-[color:var(--cold)]/10 text-[color:var(--cold)]",
    signal: "border-[color:var(--signal)]/30 bg-[color:var(--signal)]/10 text-[color:var(--signal)]",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

function RedditIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 1a11 11 0 1 0 0 22 11 11 0 0 0 0-22Zm5.7 12.3a1.5 1.5 0 0 1-.1 2.1c-1.5 1.4-4 2.3-5.6 2.3s-4.1-.9-5.6-2.3a1.5 1.5 0 0 1 2-2.2c.8.8 2.3 1.5 3.6 1.5s2.8-.7 3.6-1.5a1.5 1.5 0 0 1 2.1.1Zm-7.8-2.1a1.6 1.6 0 1 1-3.1 0 1.6 1.6 0 0 1 3.1 0Zm7.3 0a1.6 1.6 0 1 1-3.1 0 1.6 1.6 0 0 1 3.1 0ZM18.8 6a1.8 1.8 0 0 0-1.3.6c-1.1-.7-2.5-1.1-4-1.2l.8-3.5 2.5.6a1.5 1.5 0 1 0 .2-1l-3-.7a.5.5 0 0 0-.6.4l-.9 4.2c-1.6.1-3 .5-4.2 1.2A1.8 1.8 0 1 0 6 9.4a3 3 0 0 0 0 .8c0 2.7 3 4.9 6.6 4.9s6.6-2.2 6.6-4.9a3 3 0 0 0 0-.8A1.8 1.8 0 0 0 18.8 6Z"/>
    </svg>
  );
}
function XIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2H21l-6.49 7.41L22 22h-6.81l-4.78-6.26L4.8 22H2l6.94-7.93L2 2h6.94l4.32 5.72L18.244 2Zm-2.39 18h1.88L7.27 4H5.29l10.564 16Z"/>
    </svg>
  );
}
function ThreadsIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12.2 2C6.6 2 3 5.6 3 11.9c0 6.4 3.5 10.1 9 10.1 5 0 8.4-2.6 8.9-6.7.4-3-.9-5.4-3.6-6.5-.4-2.6-2.2-4.1-5-4.1-2.1 0-3.8.8-4.7 2.3l1.7 1.1c.5-.9 1.5-1.4 2.9-1.4 1.7 0 2.7.7 3.1 2-3.5-.2-6.4 1.2-6.5 4 0 2.2 1.9 3.7 4.2 3.7 2.6 0 4.3-1.6 4.7-4.4 1.1.7 1.7 1.9 1.5 3.5-.4 2.9-2.7 4.5-6.2 4.5-4.4 0-7-2.9-7-8.2C5 6.9 7.5 4 12.2 4c3.2 0 5.5 1.3 6.6 3.8l1.8-.8C19.2 3.8 16.3 2 12.2 2Zm.4 11.7c-1.3 0-2.2-.7-2.2-1.7 0-1.3 1.6-2.1 4.1-2 0 .1 0 .2.1.3-.2 2.2-1.1 3.4-2 3.4Z"/>
    </svg>
  );
}

const PLATFORM_META: Record<string, { color: string; label: string }> = {
  Facebook:  { color: "#1877F2", label: "Facebook" },
  LinkedIn:  { color: "#0A66C2", label: "LinkedIn" },
  Reddit:    { color: "#FF4500", label: "Reddit" },
  Instagram: { color: "#E1306C", label: "Instagram" },
  X:         { color: "#0F0F0F", label: "X" },
};

/* ============================================================ Page ============================================================ */

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

/* ---------- hero (UNCHANGED CONTENT) ---------- */
const TRUSTED_LOGOS = [
  { name: "Shopify", Icon: SiShopify, color: "#95BF47" },
  { name: "HubSpot", Icon: SiHubspot, color: "#FF7A59" },
  { name: "Slack", Icon: SiSlack, color: "#4A154B" },
  { name: "Asana", Icon: SiAsana, color: "#F06A6A" },
  { name: "Airbnb", Icon: SiAirbnb, color: "#FF5A5F" },
  { name: "Spotify", Icon: SiSpotify, color: "#1DB954" },
  { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
  { name: "Google", Icon: SiGoogle, color: "#4285F4" },
  { name: "Atlassian", Icon: SiAtlassian, color: "#0052CC" },
  { name: "Zoom", Icon: SiZoom, color: "#2D8CFF" },
  { name: "Webflow", Icon: SiWebflow, color: "#146EF5" },
  { name: "Notion", Icon: SiNotion, color: "#FFFFFF" },
  { name: "Framer", Icon: SiFramer, color: "#0055FF" },
  { name: "Linear", Icon: SiLinear, color: "#5E6AD2" },
  { name: "Vercel", Icon: SiVercel, color: "#FFFFFF" },
  { name: "Stripe", Icon: SiStripe, color: "#635BFF" },
];

function Hero() {
  return (
    <section className="relative overflow-hidden section-edge section-light section-no-decor section-glow">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_55%,rgba(255,255,255,0.6)_78%,#ffffff_95%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--signal)]/40 to-transparent" />
        <HeroFloatingSocials />
      </div>

      <Container className="relative pt-12 pb-12 sm:pt-16 sm:pb-14 md:pt-24 md:pb-20">
        <div className="grid items-center gap-8 sm:gap-10 md:gap-14">
          <div className="min-w-0 text-center">
            <div className="flex justify-center">
              <a
                href="#pricing"
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/80 py-1 pl-3 pr-1.5 text-xs text-muted-foreground backdrop-blur transition hover:border-[color:var(--signal)]/50 hover:bg-card hover:text-foreground"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--signal)] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--signal)] shadow-[0_0_8px_var(--signal)]" />
                </span>
                <span>Early access open</span>
                <span className="text-foreground/40">→</span>
                <span className="text-foreground">40% lifetime discount</span>
                <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-foreground px-2 py-1 text-[11px] font-semibold text-background transition group-hover:bg-[color:var(--signal)] group-hover:text-background">
                  Claim <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
                </span>
              </a>
            </div>

            <h1 className="mt-6 text-balance text-[1.9rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl md:text-6xl lg:text-[64px]">
              Find website service opportunities{" "}
              <span className="text-[color:var(--signal)]">from public social posts</span>
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-balance text-base text-foreground/65 md:text-lg">
              Built for web designers, web developers, CMS specialists and agencies — Postly turns public posts asking for website design, development, redesign and CMS help into scored, outreach-ready leads in your dashboard.
            </p>

            <div className="mt-6 flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 text-sm text-foreground/70">
                Every day we surface <span className="rounded-full bg-[color:var(--signal)]/15 px-2.5 py-0.5 font-semibold text-[color:var(--signal)]">365+ fresh leads</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#pricing" className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition hover:bg-foreground/90">
                Request early access <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#product" className="inline-flex items-center gap-1.5 rounded-md border border-foreground/15 bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90">
                See example leads
              </a>
            </div>
          </div>

          <div className="relative w-full min-w-0">
            <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 -z-10 h-64 w-64 rounded-md bg-[color:var(--signal)]/40 blur-[90px]" />
            <HeroReel />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-6 -bottom-6 h-12 rounded-[50%] bg-black/40 blur-2xl"
            />
          </div>
        </div>

        <div className="marquee-mask mt-12 w-full overflow-hidden">
          <div className="animate-marquee-rtl flex w-max items-center gap-10 will-change-transform">
            {[...TRUSTED_LOGOS, ...TRUSTED_LOGOS].map((logo, i) => (
              <span key={`${logo.name}-${i}`} className="flex shrink-0 items-center gap-2.5 text-foreground/70">
                <logo.Icon className="h-6 w-6 shrink-0" style={{ color: logo.color }} />
                <span className="text-sm font-semibold tracking-tight text-foreground/80">{logo.name}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-foreground/60">
          {[
            ["🇺🇸", "USA"], ["🇬🇧", "UK"], ["🇨🇦", "Canada"], ["🇦🇺", "Australia"],
            ["🇧🇩", "Bangladesh"], ["🇮🇳", "India"], ["🇦🇪", "UAE"], ["🇸🇬", "Singapore"],
          ].map(([f, n]) => (
            <span key={n} className="inline-flex items-center gap-1.5"><span className="text-base leading-none" aria-hidden>{f}</span>{n}</span>
          ))}
          <span className="inline-flex items-center gap-1.5 font-medium text-foreground/80">
            <span className="text-foreground/60">and</span>
            <Globe className="h-3.5 w-3.5 text-foreground" /> Global coverage
          </span>
        </div>
      </Container>
    </section>
  );
}

/* ---------- trust / category strip ---------- */
function TrustStrip() {
  const services = [
    "Website design", "Website development", "Redesign", "WordPress", "Webflow",
    "Wix", "Framer", "Shopify website rebuild", "Landing pages", "CMS migration",
  ];
  const countries = ["USA", "UK", "Canada", "Australia", "UAE", "Bangladesh", "India", "Singapore", "Global coverage"];
  return (
    <section className="section-edge section-light">
      <Container className="py-12 md:py-14">
        <p className="mx-auto max-w-3xl text-center text-sm font-medium text-foreground/80 md:text-base">
          Built for web designers, web developers, CMS specialists and agencies — Postly turns public posts asking for <span className="text-[color:var(--signal)]">website design, development, redesign and CMS help</span> into scored, outreach-ready leads in your dashboard.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-muted-foreground md:text-sm">
          {services.map((s, i) => (
            <React.Fragment key={s}>
              <span className="text-foreground/75">{s}</span>
              {i < services.length - 1 && <span aria-hidden className="text-foreground/25">·</span>}
            </React.Fragment>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
          {countries.map((c, i) => (
            <React.Fragment key={c}>
              <span>{c}</span>
              {i < countries.length - 1 && <span aria-hidden className="text-foreground/25">·</span>}
            </React.Fragment>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- scope (what we cover) ---------- */
type BrandMark = { Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string };
const tagBrand: Record<string, BrandMark[]> = {
  WordPress: [{ Icon: SiWordpress, color: "#21759B" }],
  Webflow:   [{ Icon: SiWebflow,   color: "#146EF5" }],
  Wix:       [{ Icon: SiWix,       color: "#0C6EFC" }],
  Framer:    [{ Icon: SiFramer,    color: "#0055FF" }],
  "Shopify website rebuild": [{ Icon: SiShopify, color: "#95BF47" }],
};

const scopeCategories: { Icon: React.ComponentType<{ className?: string }>; title: string; tags: string[] }[] = [
  { Icon: Code2,   title: "Website work",       tags: ["Website design", "Website development", "Design + development", "Redesign", "Rebuild", "Landing pages"] },
  { Icon: Layers,  title: "CMS platforms",      tags: ["WordPress", "Webflow", "Wix", "Framer", "Shopify website rebuild"] },
  { Icon: Search,  title: "Migrations & setup", tags: ["WordPress → Webflow", "Wix → WordPress", "Shopify → Webflow", "CMS setup", "Platform migration"] },
];

const outOfScope = [
  "SEO-only requests", "Paid ads", "Logo design only", "Social media management",
  "Recruiting posts", "General business directories", "Physical product leads", "Unrelated service categories",
];

function Scope() {
  return (
    <section className="section-edge section-dark relative overflow-hidden">
      <Container className="relative py-16 md:py-20">
        <SectionTitle
          kicker="What we cover"
          title={<>Only <span className="text-[color:var(--signal)]">website and CMS</span> opportunities.</>}
          lede="Postly tracks posts where people ask for website design, development, redesign, landing page, CMS, or platform migration help."
        />

        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {scopeCategories.map(({ Icon, title, tags }) => (
            <div key={title} className="rounded-xl border border-border bg-card/60 p-5 transition hover:bg-card">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-background/40 text-[color:var(--signal)]">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {tags.map((t) => {
                  const brand = tagBrand[t];
                  return (
                    <span key={t} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/40 px-2 py-0.5 text-[11px] text-muted-foreground">
                      {brand?.map((b, i) => <b.Icon key={i} className="h-3 w-3" style={{ color: b.color }} />)}
                      {t}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-[color:var(--signal)]/25 bg-[color:var(--signal)]/[0.06] p-5">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[color:var(--signal)]" />
              <Mono className="text-[color:var(--signal)]">In scope</Mono>
            </div>
            <p className="mt-2 text-sm text-foreground/90">
              Anyone selling website design, development, redesign, rebuild, landing pages, CMS setup, or platform migration services. If a public post asks for this kind of website help, it belongs in Postly.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card/50 p-5">
            <div className="flex items-center gap-2">
              <X className="h-4 w-4 text-red-500" />
              <Mono className="text-red-500">Not in scope</Mono>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {outOfScope.map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/40 px-2 py-0.5 text-[11px] text-foreground/70 line-through decoration-red-500/70 decoration-[1.5px]">
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

/* ---------- why teams switch ---------- */
const whyCards = [
  { Icon: Filter, title: "Useful filters",     desc: "Filter by platform, country, service type, intent, budget signal, and lead temperature." },
  { Icon: Target, title: "Scores with context", desc: "Every score includes a short reason so your team understands the priority." },
  { Icon: Globe,  title: "Global by default",  desc: "Track website opportunities across supported countries without locking your pipeline to one market." },
  { Icon: Send,   title: "Faster first replies", desc: "Open an opportunity, choose a reply angle, personalize it, and follow up with less manual work." },
];

function WhyTeamsSwitch() {
  return (
    <section className="section-edge section-dark relative overflow-hidden">
      <Container className="py-16 md:py-20">
        <SectionTitle
          kicker="Why teams switch"
          title={<>Built like a workflow, <span className="text-[color:var(--signal)]">not a spreadsheet.</span></>}
          lede="Everything is organized so your team can review, qualify, save, and respond to website opportunities faster."
        />
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {whyCards.map(({ Icon, title, desc }) => (
            <div key={title} className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-white text-[color:var(--signal)] ring-1 ring-[color:var(--signal)]/30">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-tight">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}

/* ---------- signal engine ---------- */
function SignalEngine() {
  return (
    <section className="section-edge section-light">
      <Container className="py-16 md:py-20">
        <SectionTitle
          kicker="Signal engine"
          title={<>We track public posts. <span className="text-[color:var(--signal)]">You choose the best ones.</span></>}
          lede="Postly monitors supported public sources, detects website-service intent, and turns relevant posts into structured opportunities."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5"><SiFacebook className="h-4 w-4" style={{ color: "#1877F2" }} /> Facebook</span>
                <span className="text-foreground/25">·</span>
                <span className="inline-flex items-center gap-1.5"><SiLinkedIn className="h-4 w-4" style={{ color: "#0A66C2" }} /> LinkedIn</span>
                <span className="text-foreground/25">·</span>
                <span className="inline-flex items-center gap-1.5"><SiInstagram className="h-4 w-4" style={{ color: "#E4405F" }} /> Instagram</span>
                <span className="text-foreground/25">·</span>
                <span className="inline-flex items-center gap-1.5"><SiReddit className="h-4 w-4" style={{ color: "#FF4500" }} /> Reddit</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">Sources monitored today</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Postly parses public posts across four live platforms, detects website-service intent, and routes qualified opportunities into your dashboard.
              </p>
              <p className="mt-4 text-xs text-muted-foreground">X and Threads are planned for future coverage.</p>
            </div>
            <div className="mt-6"><MockSources /></div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6">
            <div>
              <div className="flex items-center justify-between">
                <Tag tone="signal">● Lead detail · High intent</Tag>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </div>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">Every opportunity opens into a full briefing.</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                See the summary, service need, score, source proof, reply angles, and activity timeline in one screen.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                {["Summary", "Service need", "Score & reasons", "Source proof", "Reply angles", "Activity timeline"].map((k) => (
                  <div key={k} className="rounded-md border border-border bg-background/40 px-3 py-2 text-foreground/80">{k}</div>
                ))}
              </div>
            </div>
            <div className="mt-6"><MockScore /></div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- after login ---------- */
const afterLoginItems = [
  { Icon: Inbox,      title: "Fresh opportunity feed",     body: "New website-service posts from supported platforms, sorted by freshness and intent." },
  { Icon: ListChecks, title: "Structured opportunity profile", body: "Each post becomes a clean profile with title, summary, service need, project type, budget signal, and source platform." },
  { Icon: Target,     title: "Scoring with reasons",       body: "Intent, urgency, freshness, competition, and service fit are scored with a short explanation." },
  { Icon: Link2,      title: "Original post proof",        body: "Open the source post and verify the author, post time, platform, comments, and context before outreach." },
  { Icon: Send,       title: "Outreach drafts",            body: "Get multiple reply angles per opportunity, then edit the message in your own voice." },
  { Icon: Filter,     title: "Inbox actions & filters",    body: "Save, filter, tag, contact, export, or flag opportunities for later review." },
];

function AfterLogin() {
  return (
    <section id="features" className="section-edge section-dark">
      <Container className="py-16 md:py-20">
        <SectionTitle
          kicker="After login"
          title={<>Exactly what you get <span className="text-[color:var(--signal)]">inside your account.</span></>}
          lede="Your dashboard shows the information needed to verify, prioritize, and manage website opportunities from one place."
        />
        <div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {afterLoginItems.map(({ Icon, title, body }, i) => (
            <div key={title} className="group relative rounded-xl border border-border bg-white p-6 transition hover:shadow-sm">
              <div className="flex items-center justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-white text-[color:var(--signal)]">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <Mono className="text-muted-foreground">0{i + 1}</Mono>
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-tight">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
          <Shield className="h-3.5 w-3.5 text-[color:var(--signal)]" />
          <span>If a field is missing from the original post, Postly marks it as <span className="text-foreground">unknown</span>. We do not guess country, budget, or service type.</span>
        </div>
      </Container>
    </section>
  );
}

/* ---------- by the numbers ---------- */
function ByTheNumbers() {
  const liveSocials = [
    { Icon: SiFacebook, name: "Facebook", color: "#1877F2" },
    { Icon: SiLinkedIn, name: "LinkedIn", color: "#0A66C2" },
    { Icon: SiInstagram, name: "Instagram", color: "#E4405F" },
    { Icon: SiReddit, name: "Reddit", color: "#FF4500" },
  ];
  const stats: Array<{ value: React.ReactNode; label: React.ReactNode }> = [
    { value: "365+",   label: "Fresh website-service posts daily" },
    { value: "30+",    label: "Countries monitored" },
    {
      value: "4 Live",
      label: (
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {liveSocials.map(({ Icon, name, color }, i) => (
            <span key={name} className="inline-flex items-center gap-1">
              <Icon className="h-3.5 w-3.5" style={{ color }} />
              <span>{name}</span>
              {i < liveSocials.length - 1 && <span className="text-muted-foreground/60">·</span>}
            </span>
          ))}
        </span>
      ),
    },
    { value: "Auto",   label: "Structured and scored" },
  ];
  return (
    <section className="section-edge section-light">
      <Container className="py-16 md:py-20">
        <SectionTitle
          kicker="By the numbers"
          title={<>Built for a <span className="text-[color:var(--signal)]">daily outreach pipeline.</span></>}
          lede="Postly keeps your opportunity feed fresh, structured, and ready for consistent follow-up."
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-5">
              <div className="text-3xl font-semibold tracking-[-0.02em] text-foreground">{s.value}</div>
              <div className="mt-1.5 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- platforms ---------- */
type PlatformEntry = {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  name: string;
  state: "live" | "soon";
  note: string;
};

const platforms: PlatformEntry[] = [
  { icon: SiFacebook,  color: "#1877F2", name: "Facebook",  state: "live", note: "Public groups and pages where business owners ask for website help." },
  { icon: SiLinkedIn,  color: "#0A66C2", name: "LinkedIn",  state: "live", note: "Founder posts, agency requests, and public website service recommendations." },
  { icon: SiInstagram, color: "#E4405F", name: "Instagram", state: "live", note: "Captions and comments from creators and businesses asking for website support." },
  { icon: SiReddit,    color: "#FF4500", name: "Reddit",    state: "live", note: "Niche communities where people discuss website fixes, rebuilds, and CMS help." },
  { icon: SiX,         color: "#0F0F0F", name: "X",         state: "soon", note: "Public posts with service requests, RFPs, and website-intent keywords." },
  { icon: SiThreads,   color: "#0F0F0F", name: "Threads",   state: "soon", note: "Conversation-first posts from creators and small businesses asking for support." },
];

const dailyVolumeStats = [
  { value: "365+",       label: "Fresh website-service posts daily" },
  { value: "Website work", label: "Design, development, redesign, rebuild, and landing pages" },
  { value: "CMS work",   label: "WordPress, Webflow, Wix, Framer, Shopify rebuilds, and migrations" },
  { value: "Worldwide",  label: "Opportunities from supported countries around the world" },
];

function Platforms() {
  return (
    <section id="platforms" className="section-edge section-dark">
      <Container className="py-16 md:py-20">
        <SectionTitle
          kicker="Platforms"
          title={<>Monitor the places where <span className="text-[color:var(--signal)]">buyers ask for website help.</span></>}
          lede="Postly currently tracks Facebook, LinkedIn, Instagram, and Reddit, with X and Threads planned for future coverage."
        />

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {dailyVolumeStats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-white p-5">
              <div className="text-2xl font-semibold tracking-[-0.02em] text-foreground">{s.value}</div>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 text-xs text-muted-foreground">
          Daily volume can vary by platform, country, and source activity.
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {platforms.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.name} className="group rounded-xl border border-border bg-white p-5 transition hover:shadow-sm">
                <div className="flex items-center justify-between">
                  <div
                    className="grid h-10 w-10 place-items-center rounded-lg"
                    style={{ color: p.color }}
                  >
                    <Icon className="h-9 w-9" />
                  </div>
                  {p.state === "live" ? <Tag tone="signal">● Live</Tag> : <Tag>○ Soon</Tag>}
                </div>
                <h3 className="mt-4 text-base font-semibold tracking-tight">{p.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.note}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ---------- scoring ---------- */
const scoringFactors: [string, string][] = [
  ["Intent level", "Does the post directly ask for website help, or only mention a general problem?"],
  ["Urgency", "Words like ASAP, urgent, today, or quickly increase the priority."],
  ["Budget signal", "Any mention of budget, price, hourly rate, or payment readiness."],
  ["Competition", "How many visible comments and replies exist at capture time."],
  ["Freshness", "How recently the post was published."],
  ["Service fit", "Whether the request matches website design, development, redesign, rebuild, landing page, or CMS work."],
];

function Scoring() {
  return (
    <section id="scoring" className="section-edge section-light relative overflow-hidden">
      <Container className="relative py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:items-start">
          <div className="md:sticky md:top-24">
            <SectionTitle
              kicker="Scoring"
              title={<>Six factors. <span className="text-[color:var(--signal)]">Clear reasons.</span></>}
              lede="Each opportunity is scored using visible signals from the post, so your team understands why it should be prioritized."
            />
            <div className="mt-6 rounded-xl border border-border bg-white/80 p-5 backdrop-blur-md shadow-sm">
              <div className="flex items-center justify-between">
                <Mono className="text-muted-foreground">AI reasoning</Mono>
                <span className="rounded-md bg-[color:var(--signal)]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[color:var(--signal)]">AI</span>
              </div>
              <p className="mt-3 text-sm">
                <span className="text-[color:var(--signal)]">Low competition.</span> Based on visible comments at capture time, this post has fewer competing replies than similar website-service requests.
              </p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {scoringFactors.map(([t, b], i) => (
              <div key={t} className="group relative overflow-hidden rounded-xl border border-border bg-white/70 p-5 backdrop-blur-md shadow-sm transition hover:-translate-y-0.5 hover:border-[color:var(--signal)]/30">
                <div className="flex items-center justify-between">
                  <Mono className="text-muted-foreground">F.0{i + 1}</Mono>
                  <span className="rounded-md bg-[color:var(--signal)]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[color:var(--signal)]">AI</span>
                </div>
                <h3 className="mt-3 text-base font-semibold tracking-tight">{t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- VIP add-on ---------- */
function VipAddon() {
  const perks = [
    { Icon: Flame,  title: "Hot leads only",       body: "We select the strongest website-service opportunities from the daily feed." },
    { Icon: Shield, title: "Human-reviewed",       body: "Each VIP lead is checked before it reaches your inbox." },
    { Icon: Send,   title: "Gmail delivery",       body: "Approved hot leads will be sent to Gmail when the VIP add-on launches." },
    { Icon: Inbox,  title: "Dedicated VIP inbox",  body: "A separate Hot Leads section will help teams focus on the best opportunities first." },
  ];
  return (
    <section id="vip" className="section-edge section-dark">
      <Container className="py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.05fr_1fr] md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-border bg-card/70 px-3 py-1 text-xs text-muted-foreground">
              <Flame className="h-3 w-3 text-[color:var(--signal)]" /> VIP add-on · Coming soon
            </div>
            <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.025em] md:text-5xl">
              VIP Hot Leads, <span className="text-muted-foreground">reviewed before they reach you.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
              For teams that want extra filtering, Postly VIP will manually review the strongest website opportunities and send approved hot leads to Gmail.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-md border border-border bg-card/60 px-5 py-2.5 text-sm font-medium text-muted-foreground">
                Coming soon
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Check className="h-3.5 w-3.5 text-[color:var(--signal)]" /> Pricing and launch date to be announced
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-1 shadow-[0_30px_120px_-30px_oklch(0.72_0.19_145/0.35)]">
            <div className="flex items-center justify-between border-b border-border px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-md bg-[#EA4335]/15 text-[#EA4335]">
                  <MessageSquare className="h-3.5 w-3.5" />
                </span>
                <Mono className="text-muted-foreground">gmail · inbox</Mono>
              </div>
              <Mono className="text-muted-foreground">Preview</Mono>
            </div>
            <div className="space-y-3 p-5">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Postly · VIP</div>
                <Tag tone="hot"><Flame className="h-3 w-3" /> Hot lead</Tag>
              </div>
              <div className="text-base font-semibold tracking-tight">
                New hot lead — Shopify store redesign, $2k budget
              </div>
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/40 px-2 py-0.5">
                  <span style={{ color: PLATFORM_META.LinkedIn.color }}><Linkedin className="h-3 w-3" fill="currentColor" strokeWidth={0} /></span>
                  LinkedIn
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/40 px-2 py-0.5">🇨🇦 Canada</span>
                <Tag tone="signal">High intent</Tag>
                <Tag>Low competition</Tag>
              </div>
              <p className="text-sm text-muted-foreground">
                Manually reviewed because the author mentioned a clear budget, timeline, and active replies. Recommended action: review and respond quickly.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {perks.map(({ Icon, title, body }) => (
            <div key={title} className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">
              <div className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-background/40 text-[color:var(--signal)]">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-tight">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- pricing ---------- */
function Pricing() {
  const [showLaunchModal, setShowLaunchModal] = useState(false);
  const plans = [
    {
      name: "Free", price: "$0", cadence: "/ month",
      desc: "A limited way to test fresh website opportunities.",
      features: [
        "Limited daily opportunities",
        "Facebook and Reddit sample feed",
        "Refreshed every 24 hours",
        "Save opportunities for up to 24 hours",
        "No card required",
      ] as React.ReactNode[],
      cta: "Start free", featured: false, free: true,
    },
    {
      name: "Pro", price: "$10", cadence: "/ month after launch",
      desc: "For freelancers and agencies doing website-service outreach every day.",
      features: [
        "Access to all live platforms",
        "More daily website opportunities",
        "Save opportunities for up to 1 month",
        "Filters, tags, and export",
        "Outreach drafts",
        "Early access: 1 month free + lifetime 40% discount",
      ],
      cta: "Apply for early access", featured: true,
    },
    {
      name: "VIP · Hot Leads", price: "Coming soon", cadence: "",
      desc: "Human-reviewed hot leads delivered to Gmail after approval.",
      features: [
        "Everything in Pro",
        "Manually filtered hot leads",
        "Gmail delivery after approval",
        "Dedicated Hot Leads dashboard",
        "Priority support",
      ],
      cta: "Coming soon", featured: false, vip: true, soon: true,
    },
  ];
  return (
    <section id="pricing" className="section-edge section-light">
      <Container className="py-16 md:py-20">
        <div className="text-center">
          <Mono className="text-muted-foreground">Pricing</Mono>
          <h2 className="mx-auto mt-3 max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.025em] md:text-4xl">
            Simple launch pricing.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
            Start with free access, upgrade when you need more volume, and unlock the early access lifetime discount while it is available.
          </p>
          <div className="mx-auto mt-6 inline-flex max-w-xl items-center gap-2 rounded-md border border-[color:var(--signal)]/40 bg-[color:var(--signal)]/10 px-4 py-1.5 text-xs font-medium text-[color:var(--signal)]">
            <Sparkles className="h-3.5 w-3.5" />
            Early access users can unlock 1 month free and a lifetime 40% discount.
          </div>
          <div className="mx-auto mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span className="font-mono uppercase tracking-[0.18em] text-[10px]">Live on</span>
            <span className="inline-flex items-center gap-1.5"><SiFacebook className="h-4 w-4" style={{ color: "#1877F2" }} /> <span className="text-foreground/80">Facebook</span></span>
            <span className="inline-flex items-center gap-1.5"><SiLinkedIn className="h-4 w-4" style={{ color: "#0A66C2" }} /> <span className="text-foreground/80">LinkedIn</span></span>
            <span className="inline-flex items-center gap-1.5"><SiInstagram className="h-4 w-4" style={{ color: "#E4405F" }} /> <span className="text-foreground/80">Instagram</span></span>
            <span className="inline-flex items-center gap-1.5"><SiReddit className="h-4 w-4" style={{ color: "#FF4500" }} /> <span className="text-foreground/80">Reddit</span></span>
          </div>
        </div>
        <div className="mt-14 grid gap-3 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-xl border p-6 md:p-7 ${
                p.featured
                  ? "border-foreground/30 bg-card shadow-[0_0_0_1px_oklch(1_0_0/0.06),0_30px_80px_-30px_oklch(0.72_0.19_145/0.3)]"
                  : (p as { vip?: boolean }).vip
                    ? "border-[color:var(--signal)]/40 bg-card"
                    : "border-border bg-card/50"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-2.5 left-6 rounded-md bg-[#0f5132] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm">
                  Most popular
                </span>
              )}
              {(p as { vip?: boolean }).vip && (
                <span className="absolute -top-2.5 left-6 inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  <Flame className="h-2.5 w-2.5 text-[color:var(--signal)]" /> Coming soon
                </span>
              )}
              <Mono className="text-muted-foreground">{p.name}</Mono>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="text-5xl font-semibold tracking-[-0.03em]">{p.price}</span>
                <span className="text-sm text-muted-foreground">{p.cadence}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <ul className="mt-6 space-y-2.5">
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--signal)]" />
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>
              {(p as { soon?: boolean }).soon ? (
                <span className="mt-8 inline-flex w-full cursor-not-allowed items-center justify-center gap-1.5 rounded-md border border-border bg-card/40 px-4 py-2.5 text-sm font-medium text-muted-foreground">
                  {p.cta}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowLaunchModal(true)}
                  className={`mt-8 inline-flex w-full items-center justify-center gap-1.5 rounded-md px-4 py-2.5 text-sm font-medium transition ${
                    p.featured
                      ? "bg-foreground text-background hover:bg-foreground/90"
                      : "border border-border bg-background hover:bg-card"
                  }`}
                >
                  {p.cta} <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </Container>
      {showLaunchModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 px-4 backdrop-blur-sm"
          onClick={() => setShowLaunchModal(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-border bg-card p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowLaunchModal(false)}
              className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground hover:bg-background hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="inline-flex items-center gap-1.5 rounded-md border border-[color:var(--signal)]/40 bg-[color:var(--signal)]/10 px-2.5 py-0.5 text-[10px] font-medium text-[color:var(--signal)]">
              <Sparkles className="h-3 w-3" /> Early access
            </div>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">Apply for early access.</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Get 1 month of Pro free plus a lifetime 40% discount when paid plans go live.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <a
                href="#"
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:bg-foreground/90"
              >
                Create free account <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <button
                type="button"
                onClick={() => setShowLaunchModal(false)}
                className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium hover:bg-card"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------- built for (replaces testimonials) ---------- */
const builtForCards = [
  { Icon: Paintbrush,     title: "Freelance web designers",     body: "Find people asking for redesigns, portfolio updates, landing pages, and small website fixes." },
  { Icon: Code2,          title: "WordPress developers",         body: "Track posts about WordPress setup, checkout issues, plugin fixes, rebuilds, and migrations." },
  { Icon: Wand2,          title: "Webflow and Framer studios",   body: "Find founders and businesses looking for modern rebuilds, landing pages, and CMS improvements." },
  { Icon: Users,          title: "Small web agencies",           body: "Build a daily outreach pipeline from public website-service requests across supported platforms." },
  { Icon: ShoppingBag,    title: "Shopify website specialists",  body: "Spot redesign, rebuild, and migration requests from store owners who need website help." },
  { Icon: ArrowRightLeft, title: "CMS migration teams",          body: "Find requests involving platform switches, CMS setup, and website rebuild projects." },
];

function BuiltFor() {
  return (
    <section id="built-for" className="section-edge section-dark">
      <Container className="py-16 md:py-20">
        <SectionTitle
          kicker="Built for"
          title={<>Built for <span className="text-[color:var(--signal)]">website service sellers.</span></>}
          lede="Postly is made for teams that sell website work and need a cleaner way to find active demand."
        />
        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {builtForCards.map(({ Icon, title, body }) => (
            <div key={title} className="rounded-xl border border-border bg-white p-6 transition hover:shadow-sm">
              <div className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-white text-[color:var(--signal)]">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-tight">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- FAQ ---------- */
const faqs = [
  { q: "What kind of leads will I get?", a: "You will get public posts where people ask for website design, development, redesign, rebuild, landing page, CMS setup, WordPress, Webflow, Wix, Framer, or Shopify website help." },
  { q: "What do I get after login?", a: "You get a fresh opportunity feed, structured profiles, scoring with reasons, original post proof, outreach drafts, filters, save actions, and export options." },
  { q: "Which platforms are supported?", a: "Facebook, LinkedIn, Instagram, and Reddit are live. X and Threads are planned for future coverage." },
  { q: "How many leads will I get per day?", a: "Postly surfaces 365+ fresh website-service posts daily. Exact volume can vary by platform, country, and source activity." },
  { q: "Which countries do the leads come from?", a: "Postly monitors public website-service posts from 30+ countries. Country is shown only when it is clear from the post, profile, or source context." },
  { q: "Do you guess missing information?", a: "No. If budget, country, service type, or contact details are not clear from the original post, Postly marks the field as unknown." },
  { q: "Can I see the original post?", a: "Yes. Each opportunity includes source proof so you can verify the original post before contacting anyone." },
  { q: "Who is this for?", a: "Postly is for web agencies, web designers, web developers, WordPress developers, Webflow experts, Wix specialists, Framer specialists, Shopify website specialists, freelancers, and CMS teams." },
  { q: "Do I get outreach messages?", a: "Yes. Postly provides multiple reply angles that you can personalize before sending." },
  { q: "How is the lead score calculated?", a: "The score is based on intent, urgency, budget signal, competition, freshness, and service fit. Each score includes a short reason." },
  { q: "Can I export leads to my own CRM?", a: "Yes. Pro users can export opportunities and organize them inside their own outreach or CRM workflow." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section-edge section-light">
      <Container className="py-16 md:py-20">
        <SectionTitle kicker="FAQ" title={<>Common <span className="text-[color:var(--signal)]">questions.</span></>} />
        <div className="mt-10 divide-y divide-border rounded-xl border border-border bg-card/50">
          {faqs.map((f, i) => (
            <div key={i}>
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5">
                <span className="text-sm font-medium md:text-base">{f.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <div className="px-5 pb-5 text-sm text-muted-foreground md:px-6 md:pb-6">{f.a}</div>}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- floating socials (used in hero + final CTA) ---------- */
function HeroFloatingSocials() {
  const ICONS = [
    { Icon: SiFacebook,  color: "#1877F2" },
    { Icon: SiLinkedIn,  color: "#0A66C2" },
    { Icon: SiReddit,    color: "#FF4500" },
    { Icon: SiX,         color: "#0F0F0F" },
    { Icon: SiInstagram, color: "#E4405F" },
  ];
  const SLOTS = [
    { top: "10%", left: "2%"  },
    { top: "18%", right: "3%" },
    { top: "62%", left: "3%"  },
    { top: "70%", right: "2%" },
    { top: "40%", left: "1%"  },
    { top: "48%", right: "1%" },
    { top: "84%", left: "8%"  },
    { top: "86%", right: "9%" },
  ] as const;
  const rand = (min: number, max: number) => Math.random() * (max - min) + min;
  type Item = { key: number; iconIdx: number; slotIdx: number; size: number; rotate: number };
  const build = (key: number, prevIcon: number, prevSlot: number): Item => {
    let iconIdx = Math.floor(Math.random() * ICONS.length);
    if (iconIdx === prevIcon) iconIdx = (iconIdx + 1) % ICONS.length;
    let slotIdx = Math.floor(Math.random() * SLOTS.length);
    if (slotIdx === prevSlot) slotIdx = (slotIdx + 1) % SLOTS.length;
    const rotate = (Math.random() < 0.5 ? -1 : 1) * rand(28, 42);
    const size = Math.round(rand(56, 84));
    return { key, iconIdx, slotIdx, size, rotate };
  };
  const [item, setItem] = React.useState<Item>(() => build(1, -1, -1));
  React.useEffect(() => {
    let n = 2;
    const t = setInterval(() => {
      setItem((prev) => build(n++, prev.iconIdx, prev.slotIdx));
    }, 4200);
    return () => clearInterval(t);
  }, []);
  const { Icon, color } = ICONS[item.iconIdx];
  const slot = SLOTS[item.slotIdx];
  return (
    <div
      key={item.key}
      className="social-fade absolute blur-[1.5px]"
      style={{
        ...slot,
        width: item.size,
        height: item.size,
        color,
        transform: `rotate(${item.rotate}deg)`,
        ['--dur' as never]: `4.2s`,
        ['--peak' as never]: '0.38',
        ['--fx' as never]: '0px',
        ['--fy' as never]: '0px',
      } as React.CSSProperties}
    >
      <Icon size={item.size} />
    </div>
  );
}

function FloatingSocials() {
  const items = [
    { Icon: SiFacebook, color: "#1877F2", top: "14%", left: "5%",   size: 72, dur: "18s", delay: "0s",  peak: "0.55", fx: "-18px", fy: "8px",   blur: "blur-md" },
    { Icon: SiReddit,   color: "#FF4500", top: "70%", right: "8%",  size: 56, dur: "18s", delay: "0s",  peak: "0.55", fx: "12px",  fy: "-10px", blur: "blur-sm" },
    { Icon: SiLinkedIn, color: "#0A66C2", top: "68%", left: "9%",   size: 64, dur: "18s", delay: "6s",  peak: "0.55", fx: "-14px", fy: "-12px", blur: "blur-md" },
    { Icon: SiInstagram,color: "#E4405F", top: "20%", left: "44%",  size: 52, dur: "18s", delay: "12s", peak: "0.5",  fx: "0px",   fy: "-12px", blur: "blur-sm" },
    { Icon: SiFacebook, color: "#1877F2", top: "74%", left: "46%",  size: 52, dur: "18s", delay: "12s", peak: "0.5",  fx: "0px",   fy: "12px",  blur: "blur-sm" },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {items.map((it, i) => {
        const { Icon, color, size, dur, delay, peak, fx, fy, blur } = it;
        const style: React.CSSProperties = {
          top: it.top,
          left: (it as { left?: string }).left,
          right: (it as { right?: string }).right,
          width: size,
          height: size,
          color,
          ['--dur' as never]: dur,
          ['--peak' as never]: peak,
          ['--fx' as never]: fx,
          ['--fy' as never]: fy,
          animationDelay: delay,
        } as React.CSSProperties;
        return (
          <div key={i} className={`social-fade absolute ${blur}`} style={style}>
            <Icon size={size} />
          </div>
        );
      })}
    </div>
  );
}

function FinalCTA() {
  return (
    <section className="relative section-edge section-dark overflow-hidden">
      <Container className="relative py-16 md:py-20">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-10 text-center md:p-16">
          <FloatingSocials />
          <h2 className="relative text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.03em] md:text-6xl">
            Stop scrolling.<br />
            <span className="bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-transparent">Start closing.</span>
          </h2>
          <p className="relative mx-auto mt-5 max-w-lg text-muted-foreground">
            Find structured, scored website opportunities from public social posts without manually checking every platform.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#pricing" className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:bg-foreground/90">
              Get access <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#platforms" className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/40 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur transition hover:bg-card">
              See platforms
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
