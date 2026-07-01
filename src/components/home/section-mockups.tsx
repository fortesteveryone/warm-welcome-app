import React from "react";
import { Check, Filter, Flame, Inbox, Search, Send, Sparkles, Target } from "lucide-react";
import { SiFacebook, SiInstagram, SiReddit } from "react-icons/si";
import { FaLinkedin as SiLinkedIn } from "react-icons/fa";

/* Tiny window chrome used across mockups */
function Chrome({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between border-b border-black/5 bg-white px-3.5 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span className="font-mono text-[10px] tracking-tight text-black/50">{label}</span>
        <span className="w-8" />
      </div>
      <div className="bg-[#FAFAFA] p-3.5">{children}</div>
    </div>
  );
}

/* -------- Filters / dashboard glimpse -------- */
export function MockFilters() {
  const filters = [
    { label: "Platform", value: "Facebook · LinkedIn · Reddit" },
    { label: "Country", value: "USA · UK · Global" },
    { label: "Service", value: "Redesign · WordPress" },
    { label: "Intent", value: "High" },
  ];
  return (
    <Chrome label="postly · filters">
      <div className="rounded-lg border border-black/5 bg-white p-3">
        <div className="mb-2 flex items-center gap-1.5 text-[10px] font-medium text-black/60">
          <Filter className="h-3 w-3" /> Active filters
        </div>
        <div className="space-y-1.5">
          {filters.map((f) => (
            <div key={f.label} className="flex items-center justify-between rounded-md border border-black/5 bg-[#FAFAFA] px-2.5 py-1.5">
              <span className="text-[11px] text-black/60">{f.label}</span>
              <span className="text-[11px] font-medium text-black/85">{f.value}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 pt-1">
            <span className="rounded-full bg-[color:var(--signal)]/15 px-2 py-0.5 text-[10px] font-semibold text-[color:var(--signal)]">128 matches</span>
            <span className="rounded-full border border-black/10 px-2 py-0.5 text-[10px] text-black/60">Last 24h</span>
          </div>
        </div>
      </div>
    </Chrome>
  );
}

/* -------- Opportunity feed -------- */
export function MockFeed() {
  const items = [
    { plat: "LinkedIn", color: "#0A66C2", Icon: SiLinkedIn, title: "Looking for a Webflow developer to rebuild our site", tag: "High intent", flag: "🇺🇸" },
    { plat: "Reddit", color: "#FF4500", Icon: SiReddit, title: "Need a WordPress dev for checkout issues — budget ready", tag: "Hot", flag: "🇬🇧" },
    { plat: "Facebook", color: "#1877F2", Icon: SiFacebook, title: "Small business looking to redesign landing page this month", tag: "Warm", flag: "🇦🇺" },
  ];
  return (
    <Chrome label="postly · opportunity feed">
      <div className="space-y-2">
        {items.map((i) => (
          <div key={i.title} className="flex items-start gap-2.5 rounded-lg border border-black/5 bg-white p-2.5">
            <div className="grid h-7 w-7 shrink-0 place-items-center rounded-md" style={{ background: `${i.color}18`, color: i.color }}>
              <i.Icon className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="line-clamp-1 text-[12px] font-medium text-black/90">{i.title}</div>
              <div className="mt-1 flex items-center gap-1.5 text-[10px] text-black/55">
                <span>{i.flag} {i.plat}</span>
                <span className="text-black/20">·</span>
                <span className="rounded-full bg-[color:var(--signal)]/12 px-1.5 py-0.5 font-semibold text-[color:var(--signal)]">{i.tag}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Chrome>
  );
}

/* -------- Score card -------- */
export function MockScore() {
  const bars = [
    { label: "Intent", value: 92 },
    { label: "Urgency", value: 78 },
    { label: "Budget signal", value: 64 },
    { label: "Freshness", value: 88 },
    { label: "Service fit", value: 95 },
  ];
  return (
    <Chrome label="postly · lead score">
      <div className="rounded-lg border border-black/5 bg-white p-3.5">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-mono text-[10px] text-black/50">Score</div>
            <div className="mt-0.5 text-2xl font-semibold tracking-tight">
              87<span className="text-sm text-black/40">/100</span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--signal)]/12 px-2 py-0.5 text-[10px] font-semibold text-[color:var(--signal)]">
            <Sparkles className="h-3 w-3" /> High intent
          </span>
        </div>
        <div className="mt-3 space-y-1.5">
          {bars.map((b) => (
            <div key={b.label}>
              <div className="flex items-center justify-between text-[10px] text-black/60">
                <span>{b.label}</span>
                <span className="tabular-nums text-black/80">{b.value}</span>
              </div>
              <div className="mt-0.5 h-1.5 overflow-hidden rounded-full bg-black/5">
                <div className="h-full rounded-full bg-[color:var(--signal)]" style={{ width: `${b.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Chrome>
  );
}

/* -------- Outreach draft -------- */
export function MockOutreach() {
  return (
    <Chrome label="postly · outreach draft">
      <div className="rounded-lg border border-black/5 bg-white p-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-medium text-black/60">
            <Send className="h-3 w-3" /> Suggested reply · Angle 1 of 3
          </div>
          <span className="rounded-md bg-[color:var(--signal)]/10 px-1.5 py-0.5 text-[9px] font-semibold text-[color:var(--signal)]">AI</span>
        </div>
        <p className="mt-2.5 text-[12px] leading-relaxed text-black/80">
          Hey Sara — saw your post about the Webflow rebuild. We've shipped 12 similar migrations
          this year with a 2-week turnaround. Happy to send a short Loom walkthrough if useful.
        </p>
        <div className="mt-3 flex items-center gap-1.5">
          <button className="inline-flex items-center gap-1 rounded-md bg-black px-2.5 py-1 text-[10px] font-semibold text-white">
            Send <Check className="h-3 w-3" />
          </button>
          <button className="rounded-md border border-black/10 px-2.5 py-1 text-[10px] text-black/70">Regenerate</button>
          <span className="ml-auto text-[10px] text-black/40">2 more angles</span>
        </div>
      </div>
    </Chrome>
  );
}

/* -------- Sources monitored -------- */
export function MockSources() {
  const rows = [
    { Icon: SiFacebook, name: "Facebook", color: "#1877F2", count: "142 posts", live: true },
    { Icon: SiLinkedIn, name: "LinkedIn", color: "#0A66C2", count: "98 posts", live: true },
    { Icon: SiInstagram, name: "Instagram", color: "#E4405F", count: "51 posts", live: true },
    { Icon: SiReddit, name: "Reddit", color: "#FF4500", count: "74 posts", live: true },
  ];
  return (
    <Chrome label="postly · sources · last 24h">
      <div className="space-y-1.5">
        {rows.map((r) => (
          <div key={r.name} className="flex items-center gap-2.5 rounded-md border border-black/5 bg-white px-2.5 py-2">
            <div className="grid h-7 w-7 place-items-center rounded-md" style={{ background: `${r.color}18`, color: r.color }}>
              <r.Icon className="h-3.5 w-3.5" />
            </div>
            <span className="text-[12px] font-medium text-black/85">{r.name}</span>
            <span className="ml-auto tabular-nums text-[11px] text-black/60">{r.count}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--signal)]/12 px-1.5 py-0.5 text-[9px] font-semibold text-[color:var(--signal)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--signal)]" /> Live
            </span>
          </div>
        ))}
      </div>
    </Chrome>
  );
}

/* -------- VIP hot inbox (unused fallback / extra) -------- */
export function MockHotInbox() {
  return (
    <Chrome label="postly · hot leads">
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2.5 rounded-md border border-black/5 bg-white p-2.5">
            <div className="grid h-7 w-7 place-items-center rounded-md bg-[color:var(--signal)]/12 text-[color:var(--signal)]">
              <Flame className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="line-clamp-1 text-[12px] font-medium">Shopify rebuild · $2k budget</div>
              <div className="text-[10px] text-black/50">Human-reviewed · Delivered to Gmail</div>
            </div>
            <Target className="h-3.5 w-3.5 text-black/30" />
          </div>
        ))}
      </div>
    </Chrome>
  );
}

export function MockSearch() {
  return (
    <Chrome label="postly · search">
      <div className="rounded-lg border border-black/5 bg-white p-2.5">
        <div className="flex items-center gap-2 rounded-md border border-black/10 bg-[#FAFAFA] px-2.5 py-1.5">
          <Search className="h-3.5 w-3.5 text-black/40" />
          <span className="text-[11px] text-black/70">"need a new website"</span>
          <span className="ml-auto rounded-md bg-black px-1.5 py-0.5 text-[9px] font-semibold text-white">⌘K</span>
        </div>
        <div className="mt-2 flex items-center gap-1 text-[10px] text-black/55">
          <Inbox className="h-3 w-3" /> 42 matching opportunities today
        </div>
      </div>
    </Chrome>
  );
}
