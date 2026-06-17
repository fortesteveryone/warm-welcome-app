import {
  Facebook, Linkedin, Instagram, Youtube, Twitter, Github,
  MessageCircle, Send as SendIcon, Hash, Globe, type LucideIcon,
} from "lucide-react";
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
    <span className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-0.5 text-[11px] text-foreground/80 ${className}`}>
      <span className="text-sm leading-none">{countryFlag(country)}</span>
      <span className="truncate">{country || "—"}</span>
    </span>
  );
}

/* ─────────── Colorful social platform icons ─────────── */

type PlatformVisual = {
  Icon: LucideIcon;
  /** brand text color */
  color: string;
  /** brand tinted bg */
  bg: string;
  /** brand ring */
  ring: string;
  label: string;
};

const MONO = {
  color: "text-foreground",
  bg: "bg-foreground/[0.06]",
  ring: "ring-foreground/15",
} as const;

const PLATFORM: Record<LeadPlatform, PlatformVisual> = {
  facebook:  { Icon: Facebook,      ...MONO, label: "Facebook" },
  linkedin:  { Icon: Linkedin,      ...MONO, label: "LinkedIn" },
  instagram: { Icon: Instagram,     ...MONO, label: "Instagram" },
  reddit:    { Icon: MessageCircle, ...MONO, label: "Reddit" },
  whatsapp:  { Icon: MessageCircle, ...MONO, label: "WhatsApp" },
  twitter:   { Icon: Twitter,       ...MONO, label: "Twitter" },
  x:         { Icon: Twitter,       ...MONO, label: "X" },
  youtube:   { Icon: Youtube,       ...MONO, label: "YouTube" },
  tiktok:    { Icon: Hash,          ...MONO, label: "TikTok" },
  telegram:  { Icon: SendIcon,      ...MONO, label: "Telegram" },
  discord:   { Icon: MessageCircle, ...MONO, label: "Discord" },
  snapchat:  { Icon: Hash,          ...MONO, label: "Snapchat" },
  pinterest: { Icon: Hash,          ...MONO, label: "Pinterest" },
  threads:   { Icon: Hash,          ...MONO, label: "Threads" },
  wechat:    { Icon: MessageCircle, ...MONO, label: "WeChat" },
  line:      { Icon: MessageCircle, ...MONO, label: "LINE" },
  quora:     { Icon: Globe,         ...MONO, label: "Quora" },
  medium:    { Icon: Globe,         ...MONO, label: "Medium" },
  github:    { Icon: Github,        ...MONO, label: "GitHub" },
  behance:   { Icon: Globe,         ...MONO, label: "Behance" },
  dribbble:  { Icon: Globe,         ...MONO, label: "Dribbble" },
  twitch:    { Icon: Globe,         ...MONO, label: "Twitch" },
  mastodon:  { Icon: Globe,         ...MONO, label: "Mastodon" },
  other:     { Icon: Globe,         ...MONO, label: "Other" },
};


export function platformVisual(p: LeadPlatform): PlatformVisual {
  return PLATFORM[p] ?? PLATFORM.other;
}

/** Square brand-colored social tile. */
export function SocialTile({
  platform, size = 32, className = "",
}: { platform: LeadPlatform; size?: number; className?: string }) {
  const v = platformVisual(platform);
  const px = `${size}px`;
  const iconPx = Math.round(size * 0.48);
  return (
    <span
      aria-label={v.label}
      style={{ width: px, height: px }}
      className={`grid place-items-center rounded-lg ring-1 ${v.bg} ${v.ring} ${className}`}
    >
      <v.Icon style={{ width: iconPx, height: iconPx }} className={v.color} />
    </span>
  );
}

/** Pill — brand-tinted bg, brand color icon, label text. */
export function SocialPill({ platform }: { platform: LeadPlatform }) {
  const v = platformVisual(platform);
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ${v.bg} ${v.ring} ${v.color}`}>
      <v.Icon className="h-3 w-3" />
      <span>{v.label}</span>
    </span>
  );
}
