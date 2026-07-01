import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import {
  CalendarRange, Wallet, Eye, Star, Sparkles, MessageSquare, CheckCircle2,
  Clock, ChevronDown, X, Flame, MapPin, ArrowUpRight, Inbox, Zap, TrendingUp,
} from "lucide-react";
import { PageHeader, Stat, Panel, Badge, Avatar, Mono } from "@/components/dashboard/dash-ui";


export const Route = createFileRoute("/dashboard/")({
  component: Overview,
});

/* ─────────────────────── Mock user data ─────────────────────── */

const CREDITS = { balance: 312, included: 500, used: 188, plan: "Starter · $10/mo", resets: "Jul 1" };

const RECENT_OPENED = [
  { name: "Aisha Rahman",  headline: "Need a Shopify → Webflow redesign for jewellery brand",  country: "United Kingdom", flag: "🇬🇧", budget: "$3–6k",  when: "12m ago",  status: "replied" as const },
  { name: "Marcus Lin",    headline: "Looking for Webflow developer — 8-page marketing site", country: "United States", flag: "🇺🇸", budget: "$4–8k",  when: "1h ago",   status: "contacted" as const },
  { name: "Priya Devi",    headline: "WordPress site rebuild for a 3-location restaurant in Mumbai",     country: "India",          flag: "🇮🇳", budget: "$800–1.5k", when: "3h ago",   status: "saved" as const },
  { name: "Jonas Weber",   headline: "WordPress → Framer migration, logistics company",     country: "Germany",        flag: "🇩🇪", budget: "$5–10k", when: "Yesterday", status: "viewed" as const },
];

const RECOMMENDED = [
  { headline: "SaaS founder needs landing page rebuild on Webflow", country: "🇺🇸", budget: "$2–4k", posted: "8m ago",  score: 94, hot: true },
  { headline: "Boutique law firm — Framer rebuild + CMS setup",     country: "🇨🇦", budget: "$1.2k/mo", posted: "27m ago", score: 88, hot: true },
  { headline: "Wix to WordPress migration, 20+ pages",               country: "🇦🇺", budget: "$3k",  posted: "1h ago", score: 81, hot: false },
];

const ACTIVITY = [
  { who: "You",          what: "opened a lead — Aisha Rahman (Velvet & Co.)", cost: "-1 credit", when: "12m" },
  { who: "Aisha Rahman", what: "replied to your message",                     cost: "",          when: "8m" },
  { who: "You",          what: "saved 3 leads from Instagram category",       cost: "",          when: "2h" },
  { who: "System",       what: "added 142 new leads matching your filters",   cost: "",          when: "5h" },
];

const TASKS = [
  { text: "Follow up with Aisha Rahman — proposal sent",  due: "Today, 4:30pm", done: false },
  { text: "Open the 12 new leads in Webflow category",    due: "Today",         done: false },
  { text: "Reply to Marcus Lin",                          due: "Tomorrow",      done: false },
  { text: "Opened lead · Priya Devi",                     due: "Done",          done: true  },
];

const TOP_COUNTRIES = [
  { name: "United States", flag: "🇺🇸", count: 412, pct: 32 },
  { name: "United Kingdom", flag: "🇬🇧", count: 218, pct: 17 },
  { name: "Canada", flag: "🇨🇦", count: 184, pct: 14 },
  { name: "Australia", flag: "🇦🇺", count: 142, pct: 11 },
  { name: "Germany", flag: "🇩🇪", count: 98, pct: 8 },
];

function statusTone(s: "replied" | "contacted" | "saved" | "viewed") {
  if (s === "replied") return "success" as const;
  if (s === "contacted") return "warm" as const;
  if (s === "saved") return "hot" as const;
  return "muted" as const;
}

function Overview() {
  const creditsPct = Math.round((CREDITS.used / CREDITS.included) * 100);

  return (
    <div className="space-y-8">
      <PageHeader
        kicker="Overview"
        title="Welcome back, Nasir"
        description="Your leads, credits and activity — all in one place."
        actions={<DateRangeFilter />}
      />

      {/* ── Credits / quota strip ─────────────────────────────────── */}
      <Panel>
        <div className="grid gap-5 p-5 lg:grid-cols-[1.6fr_1fr_1fr] lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-muted-foreground" />
              <Mono className="text-muted-foreground">Credits</Mono>
              <Badge tone="muted">{CREDITS.plan}</Badge>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-semibold tracking-tight">{CREDITS.balance}</span>
              <span className="text-sm text-muted-foreground">credits left · resets {CREDITS.resets}</span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-card">
              <div className="h-full bg-foreground/70" style={{ width: `${creditsPct}%` }} />
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Used {CREDITS.used} of {CREDITS.included}</span>
              <span>1 credit = 1 lead opened</span>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-background/40 p-4">
            <Mono className="text-muted-foreground">This month</Mono>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-semibold">188</span>
              <span className="text-xs text-muted-foreground">leads opened</span>
            </div>
            <div className="mt-2 text-xs text-[color:var(--signal)]">▲ 24 vs last month</div>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              to="/dashboard/leads"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-foreground px-3 text-sm font-medium text-background hover:bg-foreground/90"
            >
              <Inbox className="h-4 w-4" /> Browse leads
            </Link>
            <Link
              to="/dashboard/settings"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-card/50 px-3 text-sm hover:bg-card"
            >
              <Zap className="h-4 w-4" /> Top up credits
            </Link>
          </div>
        </div>
      </Panel>



      {/* ── Stat grid ─────────────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Opened today" value="14" delta="▲ 3 vs yesterday" trend="up" icon={<Eye className="h-4 w-4" />} />
        <Stat label="Saved leads" value="46" delta="▲ 5 this week" trend="up" icon={<Star className="h-4 w-4" />} />
        <Stat label="Replies received" value="18" delta="9.6% reply rate" trend="up" icon={<MessageSquare className="h-4 w-4" />} />
        <Stat label="Hot matches" value="9" delta="New since morning" trend="up" icon={<Flame className="h-4 w-4" />} />
      </div>

      {/* ── Activity chart + match quality ────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel
          className="lg:col-span-2"
          title="Leads you opened"
          description="Daily lead opens · last 14 days"
          actions={<Badge tone="success">Live</Badge>}
        >
          <div className="p-5">
            <div className="flex h-[90px] items-end gap-[3px]">
              {[6, 9, 7, 11, 14, 12, 16, 13, 18, 15, 20, 22, 19, 24].map((v, i, arr) => {
                const max = Math.max(...arr);
                const isLast = i === arr.length - 1;
                return (
                  <div
                    key={i}
                    className={`flex-1 rounded-t-[2px] ${isLast ? "bg-[color:var(--signal)]" : "bg-card"}`}
                    style={{ height: `${(v / max) * 100}%` }}
                    title={`${v} leads`}
                  />
                );
              })}
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3 border-t border-border pt-4 text-center">
              {[
                { l: "Web design", v: "82" },
                { l: "Webflow",    v: "54" },
                { l: "SEO",        v: "31" },
                { l: "WordPress",  v: "21" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-lg font-semibold text-foreground">{s.v}</div>
                  <Mono className="text-muted-foreground">{s.l}</Mono>
                </div>
              ))}
            </div>
          </div>
        </Panel>


        <Panel title="Your funnel" description="From open to reply">
          <div className="space-y-3 p-5">
            {[
              { stage: "Leads opened",   v: 188, w: 100, c: "bg-sky-500/70" },
              { stage: "Saved",          v: 46,  w: 62,  c: "bg-indigo-500/70" },
              { stage: "Contacted",      v: 31,  w: 44,  c: "bg-amber-500/70" },
              { stage: "Replied",        v: 18,  w: 28,  c: "bg-orange-500/70" },
              { stage: "Deal won",       v: 4,   w: 12,  c: "bg-[color:var(--signal)]/70" },
            ].map((s) => (
              <div key={s.stage}>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{s.stage}</span>
                  <span className="font-medium">{s.v}</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-card">
                  <div className={`h-full ${s.c}`} style={{ width: `${s.w}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* ── Recommended + countries ───────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel
          className="lg:col-span-2"
          title="Recommended for you"
          description="Fresh leads matching your filters"
          actions={
            <Link to="/dashboard/leads" className="text-xs text-muted-foreground hover:text-foreground">
              See all leads →
            </Link>
          }
        >
          <ul className="divide-y divide-border">
            {RECOMMENDED.map((r, i) => (
              <li key={i} className="flex items-start gap-3 px-5 py-4">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-card text-base">{r.country}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium">{r.headline}</span>
                    {r.hot && <Badge tone="hot">Hot</Badge>}
                  </div>
                  <div className="mt-0.5 flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Sparkles className="h-3 w-3" /> Match {r.score}</span>
                    <span>· {r.budget}</span>
                    <span>· {r.posted}</span>
                  </div>
                </div>
                <button className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-border bg-background/60 px-2.5 text-xs hover:bg-card">
                  Open <ArrowUpRight className="h-3 w-3" />
                </button>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Top countries" description="In your lead feed" actions={<MapPin className="h-4 w-4 text-muted-foreground" />}>
          <ul className="divide-y divide-border">
            {TOP_COUNTRIES.map((c) => (
              <li key={c.name} className="flex items-center gap-3 px-5 py-3 text-sm">
                <span className="text-lg leading-none">{c.flag}</span>
                <span className="flex-1 truncate">{c.name}</span>
                <div className="h-1.5 w-20 overflow-hidden rounded-full bg-card">
                  <div className="h-full bg-foreground/60" style={{ width: `${c.pct * 2.8}%` }} />
                </div>
                <Mono className="w-10 text-right text-muted-foreground">{c.count}</Mono>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* ── Recently opened + tasks + activity ────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel
          className="lg:col-span-2"
          title="Recently opened leads"
          actions={
            <Link to="/dashboard/leads" className="text-xs text-muted-foreground hover:text-foreground">
              View all →
            </Link>
          }
        >
          <div className="divide-y divide-border">
            {RECENT_OPENED.map((l) => (
              <div key={l.name} className="flex items-center gap-3 px-5 py-3">
                <Avatar name={l.name} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium">{l.headline}</span>
                  </div>
                  <div className="truncate text-xs text-muted-foreground">
                    {l.name} · <span className="mr-0.5">{l.flag}</span>{l.country} · {l.budget}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <Badge tone={statusTone(l.status)}>{l.status}</Badge>
                  <Mono className="w-16 text-right text-muted-foreground">{l.when}</Mono>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel title="Your tasks">
            <ul className="divide-y divide-border">
              {TASKS.map((t) => (
                <li key={t.text} className="flex items-start gap-3 px-5 py-3">
                  {t.done ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-[color:var(--signal)]" />
                  ) : (
                    <span className="mt-0.5 h-4 w-4 rounded-full border border-border" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className={`text-sm ${t.done ? "text-muted-foreground line-through" : ""}`}>{t.text}</div>
                    <div className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock className="h-3 w-3" /> {t.due}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Activity" actions={<TrendingUp className="h-4 w-4 text-muted-foreground" />}>
            <ul className="space-y-3 p-5">
              {ACTIVITY.map((a, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <span className="font-medium">{a.who}</span>{" "}
                    <span className="text-muted-foreground">{a.what}</span>
                    <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                      <span>{a.when} ago</span>
                      {a.cost && <Badge tone="muted">{a.cost}</Badge>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── Date-range filter ─────────────────────── */

type Preset = "today" | "yesterday" | "7d" | "30d" | "quarter" | "ytd" | "custom";
const PRESETS: { id: Preset; label: string; days?: number }[] = [
  { id: "today", label: "Today" },
  { id: "yesterday", label: "Yesterday" },
  { id: "7d", label: "Last 7 days", days: 7 },
  { id: "30d", label: "Last 30 days", days: 30 },
  { id: "quarter", label: "This quarter" },
  { id: "ytd", label: "Year to date" },
  { id: "custom", label: "Custom range" },
];

function startOfDay(d: Date) { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; }
function endOfDay(d: Date)   { const x = new Date(d); x.setHours(23, 59, 0, 0); return x; }
function fmtInput(d: Date) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}
function fmtLabel(d: Date) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())} ${d.toLocaleString("en", { month: "short" })} ${d.getFullYear()}, ${p(d.getHours())}:${p(d.getMinutes())}`;
}

function computeRange(p: Preset, custom: { from: Date; to: Date }): { from: Date; to: Date } {
  const now = new Date();
  switch (p) {
    case "today":     return { from: startOfDay(now), to: endOfDay(now) };
    case "yesterday": { const y = new Date(now); y.setDate(y.getDate() - 1); return { from: startOfDay(y), to: endOfDay(y) }; }
    case "7d":        { const f = new Date(now); f.setDate(f.getDate() - 6); return { from: startOfDay(f), to: endOfDay(now) }; }
    case "30d":       { const f = new Date(now); f.setDate(f.getDate() - 29); return { from: startOfDay(f), to: endOfDay(now) }; }
    case "quarter":   { const q = Math.floor(now.getMonth() / 3) * 3; return { from: startOfDay(new Date(now.getFullYear(), q, 1)), to: endOfDay(now) }; }
    case "ytd":       return { from: startOfDay(new Date(now.getFullYear(), 0, 1)), to: endOfDay(now) };
    case "custom":    return custom;
  }
}

function DateRangeFilter() {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<Preset>("7d");
  const initial = useMemo(() => {
    const now = new Date();
    const from = new Date(now); from.setDate(from.getDate() - 6);
    return { from: startOfDay(from), to: endOfDay(now) };
  }, []);
  const [custom, setCustom] = useState(initial);
  const [draftFrom, setDraftFrom] = useState(fmtInput(initial.from));
  const [draftTo, setDraftTo] = useState(fmtInput(initial.to));
  const [error, setError] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const range = computeRange(preset, custom);
  const label = preset === "custom"
    ? `${fmtLabel(range.from)}  →  ${fmtLabel(range.to)}`
    : PRESETS.find((p) => p.id === preset)!.label;

  const applyCustom = () => {
    const f = new Date(draftFrom);
    const t = new Date(draftTo);
    if (isNaN(f.getTime()) || isNaN(t.getTime())) { setError("Pick valid dates"); return; }
    if (f.getTime() > t.getTime()) { setError("Start must be before end"); return; }
    setError(null);
    setCustom({ from: f, to: t });
    setPreset("custom");
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-9 max-w-[420px] items-center gap-2 rounded-md border border-border bg-card/50 px-3 text-sm hover:bg-card"
      >
        <CalendarRange className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="truncate">{label}</span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </button>

      {open && (
        <>
          <button aria-label="Close" className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div
            ref={panelRef}
            className="absolute right-0 z-40 mt-2 w-[360px] overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div>
                <Mono className="text-muted-foreground">Filter by date</Mono>
                <div className="mt-0.5 text-sm font-medium">Date range</div>
              </div>
              <button onClick={() => setOpen(false)} className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-background hover:text-foreground">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1.5 border-b border-border p-3">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { setPreset(p.id); if (p.id !== "custom") setOpen(false); }}
                  className={`rounded-md border px-2.5 py-1.5 text-left text-xs transition ${preset === p.id ? "border-foreground/40 bg-foreground/10 text-foreground" : "border-border bg-background/60 text-muted-foreground hover:text-foreground"}`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="space-y-3 p-4">
              <label className="block">
                <Mono className="text-muted-foreground">Start</Mono>
                <input
                  type="datetime-local"
                  value={draftFrom}
                  onChange={(e) => setDraftFrom(e.target.value)}
                  min="2020-01-01T00:00"
                  max="2030-12-31T23:59"
                  className="mt-1.5 h-9 w-full rounded-md border border-border bg-background/60 px-3 text-sm focus:border-foreground/40 focus:outline-none"
                />
              </label>
              <label className="block">
                <Mono className="text-muted-foreground">End</Mono>
                <input
                  type="datetime-local"
                  value={draftTo}
                  onChange={(e) => setDraftTo(e.target.value)}
                  min="2020-01-01T00:00"
                  max="2030-12-31T23:59"
                  className="mt-1.5 h-9 w-full rounded-md border border-border bg-background/60 px-3 text-sm focus:border-foreground/40 focus:outline-none"
                />
              </label>
              <p className="text-[11px] text-muted-foreground">
                Tip — you can pick any moment, e.g. <span className="font-mono">12 Dec 2024, 10:05</span> through <span className="font-mono">7 Jan 2027, 10:05</span>.
              </p>
              {error && <p className="text-xs text-rose-300">{error}</p>}
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  onClick={() => { setDraftFrom(fmtInput(initial.from)); setDraftTo(fmtInput(initial.to)); setError(null); }}
                  className="inline-flex h-8 items-center rounded-md border border-border bg-background px-2.5 text-xs hover:bg-card"
                >
                  Reset
                </button>
                <button
                  onClick={applyCustom}
                  className="inline-flex h-8 items-center rounded-md bg-foreground px-3 text-xs font-medium text-background hover:bg-foreground/90"
                >
                  Apply range
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
