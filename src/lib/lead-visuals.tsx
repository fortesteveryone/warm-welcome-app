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

const PLATFORM: Record<LeadPlatform, PlatformVisual> = {
  facebook:  { Icon: Facebook,       color: "text-[#1877F2]", bg: "bg-[#1877F2]/12", ring: "ring-[#1877F2]/35", label: "Facebook" },
  linkedin:  { Icon: Linkedin,       color: "text-[#0A66C2]", bg: "bg-[#0A66C2]/12", ring: "ring-[#0A66C2]/35", label: "LinkedIn" },
  instagram: { Icon: Instagram,      color: "text-[#E1306C]", bg: "bg-[#E1306C]/12", ring: "ring-[#E1306C]/35", label: "Instagram" },
  reddit:    { Icon: MessageCircle,  color: "text-[#FF4500]", bg: "bg-[#FF4500]/12", ring: "ring-[#FF4500]/35", label: "Reddit" },
  whatsapp:  { Icon: MessageCircle,  color: "text-[#25D366]", bg: "bg-[#25D366]/12", ring: "ring-[#25D366]/35", label: "WhatsApp" },
  twitter:   { Icon: Twitter,        color: "text-[#1DA1F2]", bg: "bg-[#1DA1F2]/12", ring: "ring-[#1DA1F2]/35", label: "Twitter" },
  x:         { Icon: Twitter,        color: "text-foreground", bg: "bg-foreground/10", ring: "ring-foreground/30", label: "X" },
  youtube:   { Icon: Youtube,        color: "text-[#FF0000]", bg: "bg-[#FF0000]/12", ring: "ring-[#FF0000]/35", label: "YouTube" },
  tiktok:    { Icon: Hash,           color: "text-[#FE2C55]", bg: "bg-[#FE2C55]/12", ring: "ring-[#FE2C55]/35", label: "TikTok" },
  telegram:  { Icon: SendIcon,       color: "text-[#229ED9]", bg: "bg-[#229ED9]/12", ring: "ring-[#229ED9]/35", label: "Telegram" },
  discord:   { Icon: MessageCircle,  color: "text-[#5865F2]", bg: "bg-[#5865F2]/12", ring: "ring-[#5865F2]/35", label: "Discord" },
  snapchat:  { Icon: Hash,           color: "text-[#FFC700]", bg: "bg-[#FFC700]/12", ring: "ring-[#FFC700]/35", label: "Snapchat" },
  pinterest: { Icon: Hash,           color: "text-[#E60023]", bg: "bg-[#E60023]/12", ring: "ring-[#E60023]/35", label: "Pinterest" },
  threads:   { Icon: Hash,           color: "text-foreground", bg: "bg-foreground/10", ring: "ring-foreground/30", label: "Threads" },
  wechat:    { Icon: MessageCircle,  color: "text-[#07C160]", bg: "bg-[#07C160]/12", ring: "ring-[#07C160]/35", label: "WeChat" },
  line:      { Icon: MessageCircle,  color: "text-[#06C755]", bg: "bg-[#06C755]/12", ring: "ring-[#06C755]/35", label: "LINE" },
  quora:     { Icon: Globe,          color: "text-[#B92B27]", bg: "bg-[#B92B27]/12", ring: "ring-[#B92B27]/35", label: "Quora" },
  medium:    { Icon: Globe,          color: "text-foreground", bg: "bg-foreground/10", ring: "ring-foreground/30", label: "Medium" },
  github:    { Icon: Github,         color: "text-[#A371F7]", bg: "bg-[#A371F7]/12", ring: "ring-[#A371F7]/35", label: "GitHub" },
  behance:   { Icon: Globe,          color: "text-[#1769FF]", bg: "bg-[#1769FF]/12", ring: "ring-[#1769FF]/35", label: "Behance" },
  dribbble:  { Icon: Globe,          color: "text-[#EA4C89]", bg: "bg-[#EA4C89]/12", ring: "ring-[#EA4C89]/35", label: "Dribbble" },
  twitch:    { Icon: Globe,          color: "text-[#9146FF]", bg: "bg-[#9146FF]/12", ring: "ring-[#9146FF]/35", label: "Twitch" },
  mastodon:  { Icon: Globe,          color: "text-[#6364FF]", bg: "bg-[#6364FF]/12", ring: "ring-[#6364FF]/35", label: "Mastodon" },
  other:     { Icon: Globe,          color: "text-muted-foreground", bg: "bg-foreground/5", ring: "ring-border", label: "Other" },
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
