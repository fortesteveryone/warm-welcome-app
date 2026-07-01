import type { ComponentType, SVGProps } from "react";
import {
  SiFacebook, SiInstagram, SiReddit, SiWhatsapp, SiX,
  SiYoutube, SiTiktok, SiTelegram, SiDiscord, SiSnapchat, SiPinterest,
  SiThreads, SiWechat, SiLine, SiQuora, SiMedium, SiGithub,
  SiBehance, SiDribbble, SiTwitch, SiMastodon,
} from "react-icons/si";
import { FaTwitter, FaLinkedinIn } from "react-icons/fa";

import { Globe } from "lucide-react";
import type { LeadPlatform } from "@/lib/leads-data";

/* ─────────── Country flags ─────────── */

const FLAG: Record<string, string> = {
  "Bangladesh": "🇧🇩",
  "United States": "🇺🇸",
  "India": "🇮🇳",
  "Germany": "🇩🇪",
  "Spain": "🇪🇸",
  "Ireland": "🇮🇪",
  "Japan": "🇯🇵",
  "Italy": "🇮🇹",
  "United Kingdom": "🇬🇧",
  "Pakistan": "🇵🇰",
  "Singapore": "🇸🇬",
  "United Arab Emirates": "🇦🇪",
  "Canada": "🇨🇦",
  "Australia": "🇦🇺",
  "France": "🇫🇷",
};

export function countryFlag(name: string): string {
  return FLAG[name] || "🌐";
}

export function CountryBadge({
  country, className = "",
}: { country: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border border-border bg-background/60 px-2.5 py-0.5 text-[11px] text-foreground/80 ${className}`}>
      <span className="text-sm leading-none">{countryFlag(country)}</span>
      <span className="truncate">{country || "—"}</span>
    </span>
  );
}

/* ─────────── Authentic brand social logos (simple-icons) ─────────── */

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

type PlatformVisual = {
  Icon: IconType;
  /** brand hex */
  brand: string;
  label: string;
  /** Tailwind text color class for legacy callers expecting `color`. */
  color: string;
  /** Tailwind tinted bg class for legacy callers. */
  bg: string;
  /** Tailwind ring class for legacy callers. */
  ring: string;
};

const make = (Icon: IconType, brand: string, label: string): PlatformVisual => ({
  Icon, brand, label,
  // Legacy classes for chips/tiles that still expect these — kept neutral so
  // the colored SVG carries the brand and the surface stays on the design system.
  color: "text-foreground",
  bg: "bg-foreground/[0.06]",
  ring: "ring-foreground/15",
});

const PLATFORM: Record<LeadPlatform, PlatformVisual> = {
  facebook:  make(SiFacebook,  "#1877F2", "Facebook"),
  linkedin:  make(FaLinkedinIn, "#0A66C2", "LinkedIn"),
  instagram: make(SiInstagram, "#E4405F", "Instagram"),
  reddit:    make(SiReddit,    "#FF4500", "Reddit"),
  whatsapp:  make(SiWhatsapp,  "#25D366", "WhatsApp"),
  twitter:   make(FaTwitter,   "#1DA1F2", "Twitter"),
  x:         make(SiX,         "#000000", "X"),
  youtube:   make(SiYoutube,   "#FF0000", "YouTube"),
  tiktok:    make(SiTiktok,    "#000000", "TikTok"),
  telegram:  make(SiTelegram,  "#26A5E4", "Telegram"),
  discord:   make(SiDiscord,   "#5865F2", "Discord"),
  snapchat:  make(SiSnapchat,  "#FFFC00", "Snapchat"),
  pinterest: make(SiPinterest, "#BD081C", "Pinterest"),
  threads:   make(SiThreads,   "#000000", "Threads"),
  wechat:    make(SiWechat,    "#07C160", "WeChat"),
  line:      make(SiLine,      "#00C300", "LINE"),
  quora:     make(SiQuora,     "#B92B27", "Quora"),
  medium:    make(SiMedium,    "#000000", "Medium"),
  github:    make(SiGithub,    "#FFFFFF", "GitHub"),
  behance:   make(SiBehance,   "#1769FF", "Behance"),
  dribbble:  make(SiDribbble,  "#EA4C89", "Dribbble"),
  twitch:    make(SiTwitch,    "#9146FF", "Twitch"),
  mastodon:  make(SiMastodon,  "#6364FF", "Mastodon"),
  other:     make(Globe as unknown as IconType, "#9CA3AF", "Other"),
};

export function platformVisual(p: LeadPlatform): PlatformVisual {
  return PLATFORM[p] ?? PLATFORM.other;
}

/** Square brand tile — white surface stamped with the official colored logo. */
export function SocialTile({
  platform, size = 32, className = "",
}: { platform: LeadPlatform; size?: number; className?: string }) {
  const v = platformVisual(platform);
  const px = `${size}px`;
  const iconPx = Math.round(size * 0.58);
  return (
    <span
      aria-label={v.label}
      style={{ width: px, height: px }}
      className={`grid place-items-center rounded-lg bg-white shadow-sm ring-1 ring-black/5 ${className}`}
    >
      <v.Icon style={{ width: iconPx, height: iconPx, color: v.brand }} />
    </span>
  );
}

/** Pill — colored brand logo + label, neutral surface. */
export function SocialPill({ platform }: { platform: LeadPlatform }) {
  const v = platformVisual(platform);
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/60 px-2.5 py-0.5 text-[11px] font-medium text-foreground/90">
      <v.Icon style={{ width: 12, height: 12, color: v.brand }} />
      <span>{v.label}</span>
    </span>
  );
}
