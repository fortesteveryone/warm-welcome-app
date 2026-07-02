import React from "react";
import { ArrowRight, Globe } from "lucide-react";
import {
  SiShopify, SiWebflow, SiFramer, SiFacebook, SiReddit, SiX, SiInstagram, SiWix,
  SiSlack, SiAsana, SiAirbnb, SiSpotify, SiFigma, SiGoogle, SiAtlassian, SiZoom, SiHubspot,
  SiNotion, SiLinear, SiVercel, SiStripe,
} from "react-icons/si";
import { FaLinkedin as SiLinkedIn } from "react-icons/fa";
import { Container } from "@/components/home/primitives";
import { HeroReel } from "@/components/home/hero-reel";

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

export function Hero() {
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
                Get early access <ArrowRight className="h-4 w-4" />
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
