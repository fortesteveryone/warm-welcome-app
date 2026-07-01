import { Facebook, Instagram, Linkedin, MapPin, Send } from "lucide-react";

/* Animated black "screen recording" of the lead inbox. Pure CSS keyframes —
   behaves like a looping GIF without shipping a binary. */

type Lead = {
  title: string;
  platform: "Facebook" | "LinkedIn" | "Reddit" | "Instagram" | "X";
  country: string;
  flag: string;
  ago: string;
  hot?: boolean;
};

const REEL_LEADS: Lead[] = [
  { title: "Need WordPress dev to fix checkout — paying today", platform: "Facebook", country: "USA", flag: "🇺🇸", ago: "12s", hot: true },
  { title: "Need a WordPress developer to redesign my clinic site", platform: "LinkedIn", country: "UK", flag: "🇬🇧", ago: "38s" },
  { title: "Anyone do Webflow rebuilds? Budget $3k", platform: "Reddit", country: "Canada", flag: "🇨🇦", ago: "1m" },
  { title: "Looking for a Webflow dev to rebuild our landing page", platform: "LinkedIn", country: "UAE", flag: "🇦🇪", ago: "2m" },
  { title: "Framer portfolio update — small fixes", platform: "Reddit", country: "Australia", flag: "🇦🇺", ago: "3m", hot: true },
];

function PlatformDot({ name }: { name: Lead["platform"] }) {
  const map: Record<Lead["platform"], { Icon: React.ComponentType<{ className?: string }>; color: string }> = {
    Facebook:  { Icon: Facebook,  color: "#1877F2" },
    LinkedIn:  { Icon: Linkedin,  color: "#0A66C2" },
    Instagram: { Icon: Instagram, color: "#E1306C" },
    Reddit:    { Icon: () => <span style={{ color: "#FF4500" }}>●</span>, color: "#FF4500" },
    X:         { Icon: () => <span className="text-white">𝕏</span>, color: "#fff" },
  };
  const { Icon, color } = map[name];
  return <span style={{ color }} className="inline-flex h-3.5 w-3.5 items-center justify-center"><Icon className="h-3 w-3" /></span>;
}

export function HeroReel() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[color:var(--signal)]/30 bg-[#080808]">
      {/* window chrome */}
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-md bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-md bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-md bg-white/15" />
        </div>
        <span className="truncate font-mono text-[10px] text-white/40">growbylead.app / inbox</span>
        <span className="inline-flex shrink-0 items-center gap-1.5 text-[10px] text-[color:var(--signal)]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-md bg-[color:var(--signal)] shadow-[0_0_8px_var(--signal)]" />
          <span className="font-mono tracking-wider">REC</span>
        </span>
      </div>

      {/* top stat strip with ticking counter */}
      <div className="grid grid-cols-3 gap-2 border-b border-white/10 bg-black/40 p-3">
        <div className="rounded-md bg-white/[0.03] px-3 py-2">
          <div className="text-[9px] uppercase tracking-widest text-white/40">Today</div>
          <div className="mt-0.5 font-mono text-lg font-semibold text-white tabular-nums">
            <span className="reel-counter inline-block" />
          </div>
        </div>
        <div className="rounded-md bg-white/[0.03] px-3 py-2">
          <div className="text-[9px] uppercase tracking-widest text-white/40">Hot</div>
          <div className="mt-0.5 font-mono text-lg font-semibold text-[color:var(--signal)] tabular-nums">142</div>
        </div>
        <div className="rounded-md bg-white/[0.03] px-3 py-2">
          <div className="text-[9px] uppercase tracking-widest text-white/40">Reply</div>
          <div className="mt-0.5 font-mono text-lg font-semibold text-white tabular-nums">47<span className="text-white/40 text-xs">s</span></div>
        </div>
      </div>

      {/* feed — leads cascade in from top */}
      <div className="relative h-[280px] overflow-hidden p-3">
        <div className="reel-feed space-y-2">
          {[...REEL_LEADS, ...REEL_LEADS].map((l, i) => (
            <div
              key={i}
              className={`rounded-lg border px-3 py-2.5 ${
                l.hot
                  ? "border-[color:var(--signal)]/40 bg-[color:var(--signal)]/[0.08]"
                  : "border-white/8 bg-white/[0.025]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="line-clamp-1 text-[13px] font-medium text-white">{l.title}</p>
                {l.hot && (
                  <span className="shrink-0 rounded-md bg-[color:var(--signal)]/20 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[color:var(--signal)]">
                    Hot
                  </span>
                )}
              </div>
              <div className="mt-1.5 flex items-center gap-2 text-[10px] text-white/45">
                <PlatformBubble name={l.platform} />
                <span aria-hidden>{l.flag}</span>
                <span>{l.country}</span>
                <span className="ml-auto font-mono">{l.ago}</span>
              </div>
            </div>
          ))}
        </div>
        {/* fade masks */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-[#080808] to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#080808] to-transparent" />
      </div>

      {/* footer with sparkline */}
      <div className="flex items-center gap-3 border-t border-white/10 bg-black/40 px-3 py-2.5">
        <div className="inline-flex items-center gap-1.5 text-[10px] text-white/55">
          <MapPin className="h-3 w-3" /> 30+ countries · streaming
        </div>
        <svg viewBox="0 0 200 24" className="ml-auto h-5 w-32 overflow-visible">
          <path
            d="M0 18 Q 25 14 40 12 T 80 8 T 120 11 T 160 5 T 200 3"
            fill="none"
            stroke="oklch(0.74 0.19 145)"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="reel-spark"
          />
        </svg>
        <span className="inline-flex items-center gap-1 rounded-md bg-[color:var(--signal)]/15 px-2 py-0.5 text-[10px] font-medium text-[color:var(--signal)]">
          <Send className="h-2.5 w-2.5" /> sent
        </span>
      </div>
    </div>
  );
}

function PlatformBubble({ name }: { name: Lead["platform"] }) {
  return (
    <span className="inline-flex items-center gap-1">
      <PlatformDot name={name} />
      <span>{name}</span>
    </span>
  );
}
