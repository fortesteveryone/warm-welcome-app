import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import {
  ArrowRight, ArrowUpRight, BrainCircuit, Check, ChevronDown, Cpu, Code2, Copy, ExternalLink, Facebook,
  Filter, Flame, Globe, Heart, Inbox, Instagram, Layers, Linkedin, Link2, ListChecks, MapPin, Menu, MessageCircle,
  MessageSquare, Minus, Network, Plus, Search, Send, Share2, Shield, Sparkles, Target, Waypoints, X, Zap,
} from "lucide-react";
import logoAsset from "@/assets/growbylead-logo.png.asset.json";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { ProductShowcase, FeatureBento, StatsStrip } from "@/components/home/visual-sections";
import { HeroReel } from "@/components/home/hero-reel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Postly — Social media buying signals, scored and sales-ready" },
      { name: "description", content: "Postly turns public social media posts into structured, scored, outreach-ready leads for agencies, freelancers and sales teams." },
      { property: "og:title", content: "Postly" },
      { property: "og:description", content: "From messy social posts to clean, sales-ready leads with outreach drafts included." },
    ],
  }),
  component: Home,
});

/* ============================================================
   Primitives
   ============================================================ */

function Mono({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-mono text-[11px] tracking-tight ${className}`}>{children}</span>;
}

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-6 ${className}`}>{children}</div>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--signal)] shadow-[0_0_8px_var(--signal)]" />
      {children}
    </div>
  );
}

function SectionTitle({ kicker, title, lede }: { kicker: string; title: React.ReactNode; lede?: string }) {
  return (
    <div className="max-w-4xl">
      <Mono className="text-muted-foreground">{kicker}</Mono>
      <h2 className="mt-3 max-w-3xl text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.02em] sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {lede && <p className="mt-4 max-w-4xl text-base leading-relaxed text-muted-foreground md:text-[17px]">{lede}</p>}
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
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${tones[tone]}`}>
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

const PLATFORM_META: Record<string, { Icon: React.ComponentType<{ className?: string }>; color: string; label: string }> = {
  Facebook:  { Icon: ({ className }) => <Facebook  className={className} fill="currentColor" strokeWidth={0} />, color: "#1877F2", label: "Facebook" },
  LinkedIn:  { Icon: ({ className }) => <Linkedin  className={className} fill="currentColor" strokeWidth={0} />, color: "#0A66C2", label: "LinkedIn" },
  Reddit:    { Icon: RedditIcon, color: "#FF4500", label: "Reddit" },
  Instagram: { Icon: ({ className }) => <Instagram className={className} strokeWidth={1.75} />, color: "#E1306C", label: "Instagram" },
  X:         { Icon: XIcon, color: "#FFFFFF", label: "X" },
};

function PlatformBadge({ name, className = "h-3.5 w-3.5" }: { name: string; className?: string }) {
  const m = PLATFORM_META[name];
  if (!m) return <span className="text-xs">{name}</span>;
  const { Icon } = m;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs">
      <span style={{ color: m.color }} className="inline-flex"><Icon className={className} /></span>
      <span>{m.label}</span>
    </span>
  );
}

/* ============================================================
   Page
   ============================================================ */

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <Hero />
      <ProductShowcase />
      <Scope />
      <FeatureBento />
      <AfterLogin />
      
      <StatsStrip />
      <Platforms />
      <Scoring />
      
      <Concierge />
      <Pricing />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <SiteFooter />
    </div>
  );
}

/* ---------- top bar ---------- */
function TopBar() {
  const links: [string, string][] = [
    
    ["Platforms", "#platforms"],
    ["Scoring", "#scoring"],
    ["Pricing", "#pricing"],
    ["Blog", "/blog"],
  ];
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <Container className="flex h-14 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-7">
          <a href="#" className="flex shrink-0 items-center gap-2">
            <Logo />
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {links.map(([l, h]) => (
              <a key={h} href={h} className="text-sm text-muted-foreground transition hover:text-foreground">{l}</a>
            ))}
          </nav>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a href="#" className="hidden rounded-md border border-border bg-card/60 px-3.5 py-1.5 text-sm font-medium text-foreground transition hover:bg-card sm:inline-flex">
            Sign in
          </a>
          <a href="#pricing" className="hidden items-center gap-1.5 rounded-md bg-foreground px-3.5 py-1.5 text-sm font-medium text-background transition hover:bg-foreground/90 sm:inline-flex">
            Get started <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-md border border-border bg-card/60 text-foreground transition hover:bg-card md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </Container>

      {/* Mobile dropdown */}
      <div
        className={`overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden ${
          open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Container className="flex flex-col gap-1 py-3">
          {links.map(([l, h]) => (
            <a
              key={h}
              href={h}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm text-foreground/90 transition hover:bg-card"
            >
              <span>{l}</span>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
            </a>
          ))}
          <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border pt-3">
            <a href="#" onClick={() => setOpen(false)} className="inline-flex items-center justify-center rounded-md border border-border bg-card/60 px-3.5 py-2 text-sm font-medium text-foreground transition hover:bg-card">
              Sign in
            </a>
            <a href="#pricing" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-1.5 rounded-md bg-foreground px-3.5 py-2 text-sm font-medium text-background transition hover:bg-foreground/90">
              Get started <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </Container>
      </div>
    </header>
  );
}

function Logo({ className = "h-7 w-auto" }: { className?: string }) {
  return <img src={logoAsset.url} alt="Postly" className={className} />;
}

/* ---------- hero ---------- */
import { SiShopify, SiHubspot, SiWebflow, SiNotion, SiFramer, SiLinear, SiVercel, SiStripe, SiSlack, SiAsana, SiAirbnb, SiSpotify, SiFigma, SiGoogle, SiAtlassian, SiZoom, SiFacebook, SiReddit, SiX, SiInstagram, SiWordpress, SiWix, SiGoogleads, SiMeta, SiGoogleanalytics, SiGoogletagmanager } from "react-icons/si";
import { FaLinkedin as SiLinkedIn } from "react-icons/fa";

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
    <section className="relative overflow-hidden section-edge section-dark section-no-decor section-glow">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--signal)]/40 to-transparent" />
        <HeroFloatingSocials />
      </div>

      <Container className="relative pt-16 pb-14 md:pt-24 md:pb-20">
        <div className="grid items-center gap-10 md:gap-14 lg:grid-cols-[1.05fr_1fr]">
          {/* Left: copy */}
          <div className="min-w-0 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
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

            <h1 className="mt-6 text-balance text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl md:text-6xl lg:text-[64px]">
              Social posts to{" "}
              <span className="text-foreground/55">sales-ready leads.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-balance text-base text-foreground/65 md:text-lg lg:mx-0 lg:max-w-none">
              Postly turns public posts asking for web design, development, CMS and SEO help into scored, outreach-ready leads — delivered to your inbox daily.
            </p>

            {/* highlight strip */}
            <div className="mt-5 inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-foreground/20 bg-foreground/[0.04] px-4 py-1.5 text-sm">
              <Sparkles className="h-3.5 w-3.5 text-foreground" />
              <span className="text-foreground/80">Every day we surface <span className="font-semibold text-foreground">365+ fresh leads</span></span>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <a href="#pricing" className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition hover:bg-foreground/90">
                Early access — 40% lifetime off <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#pricing" className="inline-flex items-center gap-1.5 rounded-full border border-foreground/25 px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-foreground/10">
                Start now
              </a>
            </div>
          </div>

          <div className="relative min-w-0">
            <div aria-hidden className="pointer-events-none absolute -inset-10 -z-10 opacity-40">
              <div className="absolute inset-0 rounded-full bg-[color:var(--signal)]/5 blur-[80px]" />
            </div>
            <div aria-hidden className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[color:var(--signal)]/0 via-[color:var(--signal)]/10 to-[color:var(--signal)]/0 blur-2xl opacity-25" />
            <HeroReel />
          </div>
        </div>



        {/* monochrome logo marquee */}
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

        {/* coverage flag strip */}
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

const sampleLeads = [
  { title: "Paid portfolio website developer needed for updates", platform: "Facebook", temp: "Hot",  service: "Web Dev", comp: "Low",    ago: "12m", flag: "🇧🇩", country: "Bangladesh" },
  { title: "Looking for SEO expert — local plumbing business",   platform: "Reddit",   temp: "Warm", service: "SEO",     comp: "Medium", ago: "38m", flag: "🇺🇸", country: "United States" },
  { title: "Need help managing our Instagram for restaurant",    platform: "Instagram",temp: "Warm", service: "SMM",     comp: "Low",    ago: "1h",  flag: "🇬🇧", country: "United Kingdom" },
  { title: "Shopify store redesign — budget $2k",                platform: "LinkedIn", temp: "Hot",  service: "E-com",   comp: "Medium", ago: "2h",  flag: "🇨🇦", country: "Canada" },
  { title: "Anyone do landing pages for SaaS launch?",           platform: "X",        temp: "Cold", service: "Landing", comp: "High",   ago: "4h",  flag: "🇦🇺", country: "Australia" },
] as const;

function InboxRow({ l, active }: { l: typeof sampleLeads[number]; active?: boolean }) {
  const toneByTemp: Record<string, "hot" | "warm" | "cold"> = { Hot: "hot", Warm: "warm", Cold: "cold" };
  return (
    <div className={`rounded-lg border px-3 py-2.5 transition ${active ? "border-foreground/30 bg-foreground/[0.04]" : "border-transparent hover:border-border hover:bg-card"}`}>
      <div className="flex items-start justify-between gap-3">
        <p className="line-clamp-1 text-sm font-medium">{l.title}</p>
        <Tag tone={toneByTemp[l.temp]}>{l.temp}</Tag>
      </div>
      <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
        <PlatformBadge name={l.platform} className="h-3 w-3" />
        <span>·</span>
        <span className="inline-flex items-center gap-1"><span aria-hidden>{l.flag}</span>{l.country}</span>
        <span className="ml-auto font-mono">{l.ago}</span>
      </div>
    </div>
  );
}

function PreviewDetail() {
  return (
    <div className="rounded-lg border border-border bg-background/40 p-4">
      <div className="flex flex-wrap items-center gap-1.5">
        <Tag tone="hot">● Hot</Tag>
        <Tag tone="signal">High intent</Tag>
        <Tag>Low competition</Tag>
        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2 py-0.5 text-[11px] font-medium">
          <span style={{ color: PLATFORM_META.Facebook.color }}><Facebook className="h-3 w-3" fill="currentColor" strokeWidth={0} /></span>
          Facebook
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2 py-0.5 text-[11px]">
          🇧🇩 Bangladesh
        </span>
      </div>
      <h3 className="mt-3 text-base font-semibold leading-tight tracking-tight">Paid portfolio website developer needed for updates</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Khansa Maroof is looking for a developer to update a portfolio website and mentioned good payment.
      </p>
      <div className="mt-3 grid grid-cols-3 gap-1.5 text-xs">
        {[
          ["Reactions", "6", Heart],
          ["Comments", "8", MessageCircle],
          ["Shares", "—", Share2],
        ].map(([k, v, I]) => {
          const Ico = I as React.ComponentType<{ className?: string }>;
          return (
            <div key={k as string} className="rounded-md border border-border bg-card/40 px-2.5 py-1.5">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Ico className="h-3 w-3" />
                <Mono>{k as string}</Mono>
              </div>
              <div className="mt-0.5 text-foreground">{v as string}</div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 rounded-md border border-[color:var(--signal)]/30 bg-[color:var(--signal)]/[0.08] p-3 text-xs">
        <Mono className="text-[color:var(--signal)]">Recommended action</Mono>
        <p className="mt-1.5 text-foreground/90">
          Contact within 30 minutes with portfolio examples. Ask for current site link, required updates, timeline and payment terms.
        </p>
      </div>
    </div>
  );
}

/* ---------- scope (what we cover) ---------- */
type BrandMark = { Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string };
const tagBrand: Record<string, BrandMark[]> = {
  WordPress: [{ Icon: SiWordpress, color: "#21759B" }],
  Webflow:   [{ Icon: SiWebflow,   color: "#146EF5" }],
  Wix:       [{ Icon: SiWix,       color: "#0C6EFC" }],
  Framer:    [{ Icon: SiFramer,    color: "#0055FF" }],
  "Paid ads (Meta / Google)": [{ Icon: SiGoogleads, color: "#4285F4" }],
  "E-commerce stores": [{ Icon: SiShopify, color: "#95BF47" }],
  "Analytics / GTM / CRO": [{ Icon: SiGoogleanalytics, color: "#E37400" }],
  "Social media management": [{ Icon: SiFacebook, color: "#1877F2" }],
};

const scopeCategories: { Icon: React.ComponentType<{ className?: string }>; title: string; tags: string[] }[] = [
  { Icon: Code2,   title: "Website design & development", tags: ["Website design", "Website development", "Design + development", "Redesign", "Rebuild"] },
  { Icon: Layers,  title: "CMS platforms",                tags: ["WordPress", "Webflow", "Wix", "Framer"] },
  { Icon: Search,  title: "Digital marketing — SEO only", tags: ["Local SEO", "Technical SEO", "On-page SEO", "Off-page / link building", "SEO audits"] },
];

const outOfScope = [
  "E-commerce stores", "Paid ads (Meta / Google)", "Design & branding", "Logo / graphic design",
  "Social media management", "Analytics / GTM / CRO", "Real estate", "Legal", "Healthcare",
  "Recruiting", "Physical products", "Financial services",
];

function Scope() {
  return (
    <section className="section-edge section-light relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <SiLinkedIn
          className="social-float absolute -left-4 top-10 h-20 w-20 opacity-[0.09] blur-[2px]"
          style={{ color: "#0A66C2", ["--dur" as never]: "16s", ["--dx" as never]: "16px", ["--dy" as never]: "-14px", ["--r" as never]: "-6deg" } as React.CSSProperties}
        />
        <SiFacebook
          className="social-float absolute right-2 bottom-8 h-24 w-24 opacity-[0.08] blur-[2.5px]"
          style={{ color: "#1877F2", ["--dur" as never]: "19s", ["--dx" as never]: "-14px", ["--dy" as never]: "18px", ["--r" as never]: "8deg" } as React.CSSProperties}
        />
      </div>
      <Container className="relative py-16 md:py-20">
        <SectionTitle
          kicker="What we cover"
          title={<>Only for <span className="text-muted-foreground">website &amp; SEO</span> service sellers.</>}
          lede="Postly is niche on purpose. We only capture posts where people ask for website work (design, development, redesign, rebuild) on WordPress, Webflow, Wix or Framer — plus SEO help. Nothing else."
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
                    <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/40 px-2 py-0.5 text-[11px] text-muted-foreground">
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
              Anyone selling website design, development, redesign or rebuild on WordPress, Webflow, Wix or Framer — or SEO services. If a post asks for that kind of help, it lands in your inbox.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card/50 p-5">
            <div className="flex items-center gap-2">
              <X className="h-4 w-4 text-red-500" />
              <Mono className="text-red-500">Not in scope (today)</Mono>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              We don't capture leads for general industries like:
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {outOfScope.map((t) => {
                const brand = tagBrand[t];
                return (
                  <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/40 px-2 py-0.5 text-[11px] text-foreground/70 line-through decoration-red-500/70 decoration-[1.5px]">
                    {brand?.map((b, i) => <b.Icon key={i} className="h-3 w-3 no-underline" style={{ color: b.color }} />)}
                    {t}
                  </span>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              We focus only on website + SEO leads. If you sell something else, Postly probably isn't the right fit.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- after login (what you get) ---------- */
const afterLoginItems = [
  { Icon: Inbox,      title: "Fresh lead feed",        body: "Newly captured service-request posts from Facebook, LinkedIn, Reddit and manual imports — sorted by freshness." },
  { Icon: ListChecks, title: "Structured lead profile", body: "Each post becomes a clean profile: title, summary, service need, project type, budget signal and source platform." },
  { Icon: Target,     title: "Lead scoring with reasons", body: "Intent, temperature, urgency and competition level — each score ships with a short, human reason." },
  { Icon: Link2,      title: "Original post proof",     body: "Open the source post, see the author, post time, reactions, comments and platform — verify before you reach out." },
  { Icon: Send,       title: "Outreach drafts",        body: "Multiple ready-to-send message angles per lead — copy, tweak, send. No blank-page outreach." },
  { Icon: Filter,     title: "Inbox actions & filters", body: "Save, filter, assign, contact, export, or flag for manual review. Built like an inbox, not a spreadsheet." },
];

function AfterLogin() {
  return (
    <section id="features" className="section-edge section-dark">
      <Container className="py-16 md:py-20">
        <SectionTitle
          kicker="After login"
          title={<>Exactly what you get <span className="text-muted-foreground">inside your account.</span></>}
          lede="No mystery box. Here's what lands in your dashboard the moment you sign in."
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
          <span>If a field is missing from the post, we mark it as <span className="text-foreground">unknown</span> — we never guess country, budget or service type.</span>
        </div>
      </Container>
    </section>
  );
}

/* (Capture / BentoCard / SummaryGraphic / TempGraphic / CompGraphic removed — redundant internal detail) */





/* ---------- platforms ---------- */
type PlatformEntry = {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  name: string;
  state: "live" | "soon";
  note: string;
};

const platforms: PlatformEntry[] = [
  { icon: ({ className }) => <Facebook  className={className} fill="currentColor" strokeWidth={0} />, color: "#1877F2", name: "Facebook",  state: "live", note: "Service-request posts and business asks across public groups and pages." },
  { icon: ({ className }) => <Linkedin  className={className} fill="currentColor" strokeWidth={0} />, color: "#0A66C2", name: "LinkedIn",  state: "live", note: "Hiring asks, agency searches and ICP buying signals from public posts." },
  { icon: ({ className }) => <Instagram className={className} strokeWidth={1.75} />,                  color: "#E1306C", name: "Instagram", state: "live", note: "Captions and pinned comments from creator and business accounts." },
  { icon: RedditIcon,  color: "#FF4500", name: "Reddit",   state: "live", note: "Niche subreddits, freelance asks and vendor recommendation threads." },
  { icon: XIcon,       color: "#000000", name: "X (Twitter)", state: "soon", note: "Public posts with service requests, RFPs and intent keywords." },
  { icon: ThreadsIcon, color: "#000000", name: "Threads",     state: "soon", note: "Conversation-first posts from creators and small businesses." },
];

const dailyVolumeStats = [
  { value: "365+", label: "Fresh leads / day", hint: "Minimum daily volume across all live platforms — usually higher." },
  { value: "400+", label: "Website design & development", hint: "WordPress, Webflow, Wix, Framer — design, dev, redesign, rebuild." },
  { value: "200+", label: "SEO requests", hint: "Local, technical, on-page and link building help." },
  { value: "Worldwide", label: "Any country", hint: "Leads come from buyers anywhere in the world — no region lock." },
];

function Platforms() {
  return (
    <section id="platforms" className="section-edge section-dark">
      <Container className="py-16 md:py-20">
        <SectionTitle
          kicker="Platforms"
          title={<>Capture leads from <span className="text-muted-foreground">where buyers post.</span></>}
          lede="At least 500 fresh website &amp; SEO leads are captured every day from buyers around the world — what you see below is the daily minimum, not a cap."
        />

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {dailyVolumeStats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-white p-5">
              <div className="text-3xl font-semibold tracking-[-0.02em] text-foreground">{s.value}</div>
              <div className="mt-1 text-sm font-medium">{s.label}</div>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.hint}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Tag tone="signal">● Daily minimum</Tag>
          <span>365+ total · 250+ web design &amp; development · 200+ SEO · from any country.</span>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {platforms.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.name} className="group rounded-xl border border-border bg-white p-5 transition hover:shadow-sm">
                <div className="flex items-center justify-between">
                  <div
                    className="grid h-10 w-10 place-items-center rounded-lg border border-border"
                    style={{ background: `color-mix(in oklab, ${p.color} 14%, transparent)`, color: p.color }}
                  >
                    <Icon className="h-5 w-5" />
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
const scoringFactors = [
  ["Intent level", "Does the post directly ask for a service, or just describe a problem?"],
  ["Urgency", "Words like ASAP, urgent, today, quickly push priority up."],
  ["Budget signal", "Any mention of price, hourly rate, or budget range."],
  ["Competition", "Number of visible comments and replies at capture time."],
  ["Freshness", "How long ago the post was created — fresher leads convert better."],
  ["Service fit", "Web design, development, CMS (WP / Webflow / Wix / Framer) or SEO — which one the request matches."],
];

function Scoring() {
  return (
    <section id="scoring" className="section-edge section-light relative overflow-hidden bg-white">


      <Container className="relative py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:items-start">
          <div className="md:sticky md:top-24">
            <SectionTitle
              kicker="Scoring"
              title={<>Six factors. <span className="text-muted-foreground">No black box.</span></>}
              lede="Our AI reads every public post, weighs six signals, and ships a short human reason with each score — so your team trusts the priority order."
            />
            <div className="mt-6 rounded-xl border border-border bg-white/80 p-5 backdrop-blur-md shadow-sm">
              <div className="flex items-center justify-between">
                <Mono className="text-muted-foreground">AI reasoning</Mono>
                <span className="rounded-md bg-[color:var(--signal)]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[color:var(--signal)]">AI</span>
              </div>
              <p className="mt-3 text-sm">
                <span className="text-[color:var(--signal)]">Low competition.</span> Based on 8 visible comments at capture time — below the category median of 21.
              </p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {scoringFactors.map(([t, b], i) => (
              <div key={t} className="group relative overflow-hidden rounded-xl border border-border bg-white/70 p-5 backdrop-blur-md shadow-sm transition hover:-translate-y-0.5 hover:border-[color:var(--signal)]/30">
                <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[color:var(--signal)]/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
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

/* (Outreach standalone section removed — drafts already shown in ExampleLead) */


/* (Dashboard, Lead profile + Data quality sections removed — internal detail, not user-facing) */


/* ---------- use cases ---------- */
const useCases = [
  "Web design agencies",
  "Freelance web designers",
  "Webflow / WordPress developers",
  "Wix & Framer studios",
  "SEO experts & consultants",
  "Local SEO agencies",
  "Lead-gen agencies",
  "Outreach teams",
];

function UseCases() {
  return (
    <section className="section-edge section-dark">
      <Container className="py-12 md:py-16">
        <div className="flex flex-col items-center text-center">
          <Mono className="text-muted-foreground">Who uses it</Mono>
          <h3 className="mt-2 text-lg font-semibold tracking-tight md:text-xl">
            Built for people selling <span className="text-muted-foreground">website &amp; SEO</span> services.
          </h3>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5">
            {useCases.map((t) => (
              <span key={t} className="rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-foreground/85">
                {t}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* (Categories chip list removed — trimming page length) */


/* ---------- coverage section removed — covered in hero flag strip ---------- */

/* ---------- concierge (VIP hot-leads) ---------- */
function Concierge() {
  const perks = [
    { Icon: Flame,       title: "Hot leads only",          body: "We hand-pick the highest-intent posts of the day — no cold or maybe-leads in the mix." },
    { Icon: Shield,      title: "Human-filtered",          body: "Every lead is manually reviewed by our team before it reaches your inbox." },
    { Icon: Send,        title: "Delivered to Gmail",      body: "Hot leads are sent straight to your Gmail the moment they're approved — no need to refresh the dashboard." },
    { Icon: Inbox,       title: "Dedicated VIP inbox",     body: "A separate \"Hot Leads\" section unlocks in your dashboard so you can act on the best opportunities first." },
  ];
  return (
    <section id="concierge" className="section-edge section-dark">
      <Container className="py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.05fr_1fr] md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs text-muted-foreground">
              <Flame className="h-3 w-3 text-[color:var(--signal)]" /> VIP add-on · Coming soon
            </div>
            <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.025em] md:text-5xl">
              Hot leads, hand-picked and <span className="text-muted-foreground">delivered to your Gmail.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
              We're putting the finishing touches on this. Soon you'll be able to upgrade to VIP and we'll manually filter the day's hottest website &amp; SEO leads, then ship them to your Gmail in real time — plus unlock a dedicated <span className="text-foreground">Hot Leads</span> section inside your dashboard.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-full border border-border bg-card/60 px-5 py-2.5 text-sm font-medium text-muted-foreground">
                Coming soon
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Check className="h-3.5 w-3.5 text-[color:var(--signal)]" /> Pricing &amp; launch date — to be announced
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-1 shadow-[0_30px_120px_-30px_oklch(0.72_0.19_145/0.35)]">
            {/* mock Gmail message */}
            <div className="flex items-center justify-between border-b border-border px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#EA4335]/15 text-[#EA4335]">
                  <MessageSquare className="h-3.5 w-3.5" />
                </span>
                <Mono className="text-muted-foreground">gmail · inbox</Mono>
              </div>
              <Mono className="text-muted-foreground">Just now</Mono>
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
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/40 px-2 py-0.5">
                  <span style={{ color: PLATFORM_META.LinkedIn.color }}><Linkedin className="h-3 w-3" fill="currentColor" strokeWidth={0} /></span>
                  LinkedIn
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/40 px-2 py-0.5">🇨🇦 Canada</span>
                <Tag tone="signal">High intent</Tag>
                <Tag>Low competition</Tag>
              </div>
              <p className="text-sm text-muted-foreground">
                Manually reviewed at 09:14 — author mentioned a clear budget, 2-week timeline and is actively replying to comments. Recommended: contact within the hour.
              </p>
              <div className="flex items-center justify-between rounded-md border border-border bg-background/40 px-3 py-2 text-xs">
                <span className="inline-flex items-center gap-1.5"><Link2 className="h-3 w-3 text-muted-foreground" /> Open lead in dashboard</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
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
      name: "Free", price: "$0", cadence: "/ month", desc: "Get a daily taste of fresh leads — no card, no commitment.",
      features: [
        <span className="inline-flex items-center gap-1.5"><SiFacebook className="h-4 w-4" style={{ color: "#1877F2" }} /> <strong className="font-semibold text-foreground">100 Facebook</strong> hot leads / day</span>,
        <span className="inline-flex items-center gap-1.5"><SiReddit className="h-4 w-4" style={{ color: "#FF4500" }} /> <strong className="font-semibold text-foreground">50 Reddit</strong> hot leads / day</span>,
        "150 leads total, refreshed every 24h",
        "Save leads for up to 24 hours",
        "Support available (24–48h response)",
      ] as React.ReactNode[],
      cta: "Start free", featured: false, free: true,
    },
    {
      name: "Pro", price: "$10", cadence: "/ month", desc: "For sellers shipping outreach every day across every channel.",
      features: [
        "Unlimited leads across all platforms",
        "Save leads for up to 1 month (auto-delete after)",
        "Hot lead notifications in real time",
        "Email support within 12 hours",
        "Everything in Free",
      ],
      cta: "Apply for early access", featured: true,
    },
    {
      name: "VIP · Hot leads", price: "Soon", cadence: "", desc: "Hand-picked hot leads delivered to your Gmail in real time. Launching soon.",
      features: [
        "Everything in Pro",
        "Manually filtered hot leads",
        "Real-time Gmail delivery",
        "Dedicated Hot Leads dashboard",
        "Priority over standard queue",
        "Concierge support",
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
            Simple, honest pricing <span className="text-muted-foreground">— and free during our launch window.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
            Pick the plan that matches how you sell. Every paid plan is 100% free while we're launching — no card required, no auto-charge when the offer ends. Cancel anytime.
          </p>
          <div className="mx-auto mt-6 inline-flex max-w-xl items-center gap-2 rounded-full border border-[color:var(--signal)]/40 bg-[color:var(--signal)]/10 px-4 py-1.5 text-xs font-medium text-[color:var(--signal)]">
            <Sparkles className="h-3.5 w-3.5" />
            Apply for early access — unlock Pro free for 1 month.
          </div>
          <div className="mx-auto mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span className="font-mono uppercase tracking-[0.18em] text-[10px]">Live on</span>
            <span className="inline-flex items-center gap-1.5"><SiFacebook className="h-4 w-4" style={{ color: "#1877F2" }} /> <span className="text-foreground/80">Facebook</span></span>
            <span className="inline-flex items-center gap-1.5"><SiLinkedIn className="h-4 w-4" style={{ color: "#0A66C2" }} /> <span className="text-foreground/80">LinkedIn</span></span>
            <span className="inline-flex items-center gap-1.5"><SiReddit className="h-4 w-4" style={{ color: "#FF4500" }} /> <span className="text-foreground/80">Reddit</span></span>
            <span className="inline-flex items-center gap-1.5"><SiInstagram className="h-4 w-4" style={{ color: "#E4405F" }} /> <span className="text-foreground/80">Instagram</span></span>
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
                <span className="absolute -top-2.5 left-6 rounded-full bg-[#0f5132] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm">
                  Most popular
                </span>
              )}
              {(p as { vip?: boolean }).vip && (
                <span className="absolute -top-2.5 left-6 inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  <Flame className="h-2.5 w-2.5 text-[color:var(--signal)]" /> Coming soon
                </span>
              )}
              <Mono className="text-muted-foreground">{p.name}</Mono>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className={`text-5xl font-semibold tracking-[-0.03em] ${p.featured && !((p as { soon?: boolean }).soon) ? "text-muted-foreground/60 line-through decoration-[color:var(--signal)]/60 decoration-2" : ""}`}>{p.price}</span>
                <span className="text-sm text-muted-foreground">{p.cadence}</span>
                {p.featured && !((p as { soon?: boolean }).soon) && (
                  <span className="ml-1 rounded-full bg-[color:var(--signal)]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[color:var(--signal)]">Free now</span>
                )}
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
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--signal)]/40 bg-[color:var(--signal)]/10 px-2.5 py-0.5 text-[10px] font-medium text-[color:var(--signal)]">
              <Sparkles className="h-3 w-3" /> Launch offer
            </div>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">No payment needed — yet.</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              To celebrate our launch, Postly is <span className="text-foreground font-medium">completely free</span> for everyone. Just create an account and start using all features — no card, no checkout.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Paid plans will be enabled in about 10–15 days. Until then, every feature is free for everyone.
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

/* ---------- testimonials (auto-marquee, no controls) ---------- */
const testimonials: { name: string; role: string; avatar: string; quote: string }[] = [
  { name: "Arif Chowdhury", role: "Founder · Pixelhaus (Webflow studio)", avatar: "https://i.pravatar.cc/120?img=11", quote: "We replaced two cold-call VAs with Postly. Within 3 weeks we booked 11 discovery calls — all from Facebook group posts we'd never have seen." },
  { name: "Nadia Rahman", role: "SEO consultant", avatar: "https://i.pravatar.cc/120?img=32", quote: "The scoring is the best part. I skip the cold ones and only reply to warm/hot leads — my reply rate is 4× what it was last quarter." },
  { name: "Lucas Pereira", role: "Co-founder · Pereira Studios", avatar: "https://i.pravatar.cc/120?img=15", quote: "Outreach drafts saved my Mondays. I used to spend 2 hours writing first messages — now I tweak the draft and send in 5 minutes." },
  { name: "Maya Chen", role: "Local SEO agency owner", avatar: "https://i.pravatar.cc/120?img=20", quote: "Finally a tool that understands my niche. Every lead is a real local business asking for SEO — not a random 'need a website' post." },
  { name: "Tanvir Hasan", role: "Senior web developer · Freelance", avatar: "https://i.pravatar.cc/120?img=12", quote: "The country + platform filters alone are worth the subscription. I only work with US/CA/UK clients and the inbox respects that." },
  { name: "Priya Shah", role: "Outreach lead · 4-person agency", avatar: "https://i.pravatar.cc/120?img=23", quote: "Our team shares one inbox now. We assign leads, mark contacted, and stop double-replying. It feels like a CRM built for cold posts." },
  { name: "Eitan Gold", role: "Design lead · Goldhaus", avatar: "https://i.pravatar.cc/120?img=7", quote: "The hot-leads Gmail add-on closes deals for us. I get the alert, reply within 10 minutes, and clients are visibly impressed by the speed." },
  { name: "Sara Lindqvist", role: "Freelance web designer", avatar: "https://i.pravatar.cc/120?img=38", quote: "I was about to quit freelancing. Postly gave me 3 paying clients in my first month — I'm fully booked through next quarter." },
  { name: "Noah Whitman", role: "Founder · Whitman & Co", avatar: "https://i.pravatar.cc/120?img=60", quote: "Honest review: the data quality is good, not perfect. But it's still 10× better than scraping Reddit manually like I used to." },
  { name: "Jordan Ali", role: "Technical SEO", avatar: "https://i.pravatar.cc/120?img=53", quote: "I export the daily leads to my own CRM and run my own outreach cadence on top. The structured data makes that 1-click easy." },
];

function TestimonialCard({ t }: { t: typeof testimonials[number] }) {
  return (
    <figure className="flex w-[340px] shrink-0 flex-col justify-between rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <blockquote className="text-[15px] leading-relaxed text-foreground/90">
        <span aria-hidden className="mr-1 text-[color:var(--signal)]">“</span>
        {t.quote}
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
        <div className="min-w-0 text-sm leading-tight">
          <p className="truncate font-medium">{t.name}</p>
          <p className="truncate text-xs text-muted-foreground">{t.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

function Testimonials() {
  const row = [...testimonials, ...testimonials]; // duplicate for seamless loop
  return (
    <section id="testimonials" className="section-edge section-dark">
      <Container className="py-16 md:py-20">
        <SectionTitle
          kicker="Loved by"
          title={<>Agencies, freelancers and SEO teams <span className="text-muted-foreground">already using it daily.</span></>}
        />
      </Container>
      <div className="marquee-mask relative overflow-hidden pb-16 md:pb-20">
        <div className="animate-marquee-rtl flex w-max gap-5 will-change-transform">
          {row.map((t, i) => <TestimonialCard key={i} t={t} />)}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
const faqs = [
  { q: "What kind of leads will I get?", a: "Only website and SEO service requests — website design, development, design + development, redesign and rebuild work on WordPress, Webflow, Wix or Framer, plus SEO (local, technical, on-page and link building). We do not capture leads for e-commerce stores, paid ads, design / branding, social media management, analytics / GTM / CRO, or unrelated industries like real estate, legal, healthcare, recruiting, physical products or financial services." },
  { q: "What do I get after login?", a: "A clean lead inbox with structured social media leads — original post links, AI-written summaries, scoring with reasons, competition signals and outreach drafts your team can copy and send." },
  { q: "Which platforms are supported?", a: "Facebook, LinkedIn, Instagram and Reddit are live right now. X (Twitter) and Threads are coming soon." },
  { q: "How many leads will I get per day?", a: "At least 500 fresh leads are captured every single day across the live platforms — that's the minimum, real numbers are usually higher. Of those, 400+ are website design & development requests (WordPress, Webflow, Wix, Framer — design, dev, redesign, rebuild) and 200+ are SEO requests (local, technical, on-page and link building). You'll never run out of work to reach out to." },
  { q: "Which countries do the leads come from?", a: "Any country. Postly captures public service-request posts from buyers worldwide — there is no region or country lock. You can filter the inbox by country if you only want to work with specific markets." },
  { q: "Do you guess missing information?", a: "No. If country, city, budget or other details aren't clear in the post, Postly marks them as unknown instead of guessing. Missing critical fields are flagged for manual review." },
  { q: "Can I see the original post?", a: "Yes. Every lead keeps the source link, author name and post time, so you can verify before contacting." },
  { q: "Who is this for?", a: "Web design agencies, SEO experts, freelancers, social media managers, cold outreach teams and lead-generation agencies selling digital services." },
  { q: "Do I get outreach messages?", a: "Yes. Each qualified lead ships with multiple outreach draft angles based on the post context — copy, edit, send." },
  { q: "How is the lead score calculated?", a: "Six explainable factors: intent, urgency, budget signal, competition, freshness and service fit. Each score includes a short, human-readable reason." },
  { q: "Can I export leads to my own CRM?", a: "Yes. CSV and JSON export are available on all plans. API access and webhook delivery are in beta on the Agency plan." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section-edge section-light">
      <Container className="py-16 md:py-20">
        <SectionTitle kicker="FAQ" title={<>Common <span className="text-muted-foreground">questions.</span></>} />
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

/* ---------- final CTA ---------- */
function HeroFloatingSocials() {
  // One logo at a time, appearing near the outer corners of the hero (outside
  // the ~1200px content column). Each cycle picks a different icon, a fresh
  // edge slot, and a subtle rotation for a professional, non-repetitive feel.
  const ICONS = [
    { Icon: SiFacebook,  color: "#1877F2" },
    { Icon: SiLinkedIn,  color: "#0A66C2" },
    { Icon: SiReddit,    color: "#FF4500" },
    { Icon: SiX,         color: "#0F0F0F" },
    { Icon: SiInstagram, color: "#E4405F" },
  ];
  // Edge slots — hugging the corners / outer margins of the hero on all sizes.
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
        ['--dur' as any]: `4.2s`,
        ['--peak' as any]: '0.38',
        ['--fx' as any]: '0px',
        ['--fy' as any]: '0px',
      }}
    >
      <Icon size={item.size} />
    </div>
  );
}


function FloatingSocials() {
  // Ambient social logos that softly fade in and out around the CTA card.
  // Only 2-3 visible at any time — staggered across a shared 18s loop in 3 pairs.
  const items = [
    { Icon: SiFacebook, color: "#1877F2", top: "14%", left: "5%",   size: 72, dur: "18s", delay: "0s",  peak: "0.55", fx: "-18px", fy: "8px",   blur: "blur-md" },
    { Icon: SiReddit,   color: "#FF4500", top: "70%", right: "8%",  size: 56, dur: "18s", delay: "0s",  peak: "0.55", fx: "12px",  fy: "-10px", blur: "blur-sm" },
    { Icon: SiLinkedIn, color: "#0A66C2", top: "68%", left: "9%",   size: 64, dur: "18s", delay: "6s",  peak: "0.55", fx: "-14px", fy: "-12px", blur: "blur-md" },
    { Icon: SiX,        color: "#0F0F0F", top: "16%", right: "6%",  size: 56, dur: "18s", delay: "6s",  peak: "0.5",  fx: "16px",  fy: "12px",  blur: "blur-sm" },
    { Icon: SiInstagram,color: "#E4405F", top: "20%", left: "44%",  size: 52, dur: "18s", delay: "12s", peak: "0.5",  fx: "0px",   fy: "-12px", blur: "blur-sm" },
    { Icon: SiFacebook, color: "#1877F2", top: "74%", left: "46%",  size: 52, dur: "18s", delay: "12s", peak: "0.5",  fx: "0px",   fy: "12px",  blur: "blur-sm" },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {items.map((it, i) => {
        const { Icon, color, size, dur, delay, peak, fx, fy, blur } = it;
        const style: React.CSSProperties = {
          top: it.top,
          left: (it as any).left,
          right: (it as any).right,
          width: size,
          height: size,
          color,
          ['--dur' as any]: dur,
          ['--peak' as any]: peak,
          ['--fx' as any]: fx,
          ['--fy' as any]: fy,
          animationDelay: delay,
        };
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
          <p className="relative mx-auto mt-5 max-w-md text-muted-foreground">
            Structured, scored, outreach-ready leads from the social posts you'd otherwise miss.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#pricing" className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:bg-foreground/90">
              Get access <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#platforms" className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/40 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur transition hover:bg-card">
              See platforms
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- footer ---------- */
function Footer() {
  const cols: { title: string; links: { label: string; soon?: boolean }[] }[] = [
    { title: "Product", links: [{ label: "Features" }, { label: "Dashboard" }, { label: "Lead examples" }, { label: "Pricing" }, { label: "Changelog", soon: true }] },
    { title: "Solutions", links: [{ label: "Agencies" }, { label: "Freelancers" }, { label: "SEO teams" }, { label: "Developers" }, { label: "Outreach" }] },
    { title: "Resources", links: [{ label: "Blog", soon: true }, { label: "Guides", soon: true }, { label: "Docs", soon: true }, { label: "API reference", soon: true }, { label: "Support" }] },
    { title: "Company", links: [{ label: "About" }, { label: "Contact" }, { label: "Careers", soon: true }, { label: "Press", soon: true }] },
    { title: "Legal", links: [{ label: "Privacy" }, { label: "Terms" }, { label: "Data usage" }, { label: "Refund" }, { label: "GDPR" }] },
  ];
  return (
    <footer className="bg-background">
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-[1.6fr_repeat(5,1fr)]">
          <div>
            <div className="flex items-center gap-2">
              <Logo className="h-8 w-auto" />
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Social media buying signals, organized into structured, scored, outreach-ready leads.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/50 px-2.5 py-1 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--signal)]" /> All systems normal
              </span>
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <Mono className="text-foreground">{c.title}</Mono>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href="#" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground">
                      {l.label}
                      {l.soon && <span className="rounded-full border border-border bg-card/60 px-1.5 py-px text-[9px] font-medium uppercase tracking-wide text-muted-foreground">Soon</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
          <Mono className="text-muted-foreground">© {new Date().getFullYear()} Postly</Mono>
          <Mono className="text-muted-foreground">Built for sales teams that move fast</Mono>
        </div>
      </Container>
    </footer>
  );
}
