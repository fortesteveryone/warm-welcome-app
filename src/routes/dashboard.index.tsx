import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  Inbox, Bell, Eye, ArrowRight, Star, Flame, TrendingUp, TrendingDown,
  Target, Zap, Users, Clock, CheckCircle2, Activity, MessageSquare, Heart,
} from "lucide-react";
import { PageHeader, Panel, Mono, Sparkline } from "@/components/dashboard/dash-ui";
import { LEADS } from "@/lib/leads-data";
import { SocialTile, countryFlag, platformVisual } from "@/lib/lead-visuals";

export const Route = createFileRoute("/dashboard/")({
  component: Overview,
});

const DAILY_VIEW_LIMIT = 150;
const USER_FIRST_NAME = "Abdullah";

function greet() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

// Deterministic pseudo-random for demo series
const seeded = (seed: number, n: number, base = 20, spread = 40) =>
  Array.from({ length: n }, (_, i) => {
    const x = Math.sin(seed * 9301 + i * 49297) * 43758.5453;
    return Math.round(base + (x - Math.floor(x)) * spread);
  });

function Overview() {
  const todaysViews = 34;
  const remaining = DAILY_VIEW_LIMIT - todaysViews;
  const pct = Math.min(100, Math.round((todaysViews / DAILY_VIEW_LIMIT) * 100));

  const byPlatform = useMemo(() => {
    const map = new Map<string, number>();
    for (const l of LEADS) map.set(l.platform, (map.get(l.platform) ?? 0) + 1);
    return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, []);

  const byCountry = useMemo(() => {
    const map = new Map<string, number>();
    for (const l of LEADS) map.set(l.country, (map.get(l.country) ?? 0) + 1);
    return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, []);
  const maxCountry = Math.max(...byCountry.map(([, n]) => n), 1);

  const byCategory = useMemo(() => {
    const map = new Map<string, number>();
    for (const l of LEADS) map.set(l.category, (map.get(l.category) ?? 0) + 1);
    return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, []);
  const totalCat = byCategory.reduce((s, [, n]) => s + n, 0) || 1;

  const hotCount = LEADS.filter((l) => l.status === "hot").length;
  const warmCount = LEADS.filter((l) => l.status === "warm").length;
  const coldCount = LEADS.filter((l) => l.status === "cold").length;
  const tempTotal = hotCount + warmCount + coldCount;

  const highIntent = LEADS.filter((l) => l.intent === "High").length;
  const qualified = LEADS.filter((l) => l.qualification === "qualified").length;

  const trendSeries = seeded(7, 14, 30, 60);
  const openSeries = seeded(11, 14, 15, 30);
  const convSeries = seeded(3, 14, 8, 18);
  const avgScoreSeries = seeded(5, 14, 55, 30);

  const hourly = seeded(2, 24, 4, 22);
  const maxHourly = Math.max(...hourly);

  return (
    <div className="space-y-6">
      <PageHeader
        kicker={`${greet()}, ${USER_FIRST_NAME}`}
        title="Overview"
        description="Live pulse across your sourced posts, engagement, pipeline and daily budget."
        actions={
          <Link to="/dashboard/leads" className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[color:var(--signal)] px-3 text-sm font-medium text-black hover:brightness-110">
            <Inbox className="h-3.5 w-3.5" /> Open feed
          </Link>
        }
      />

      {/* KPI micro-card strip */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="New leads today" value="47" delta="+12%" trend="up" icon={<Zap className="h-3.5 w-3.5" />} series={trendSeries} />
        <KpiCard label="Leads opened" value={String(todaysViews)} delta="+8%" trend="up" icon={<Eye className="h-3.5 w-3.5" />} series={openSeries} />
        <KpiCard label="Avg lead score" value="72" delta="+3.4" trend="up" icon={<Target className="h-3.5 w-3.5" />} series={avgScoreSeries} />
        <KpiCard label="Reply rate" value="18.4%" delta="-1.2%" trend="down" icon={<MessageSquare className="h-3.5 w-3.5" />} series={convSeries} />
      </div>

      {/* Row: big activity chart + credits ring + temp ring */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Lead activity" description="Sourced posts · last 14 days" className="lg:col-span-2">
          <div className="p-5">
            <div className="flex items-center gap-4 text-[11px]">
              <LegendDot color="var(--signal)" label="New leads" />
              <LegendDot color="oklch(0.65 0.16 245)" label="Opened" />
              <LegendDot color="oklch(0.72 0.16 30)" label="Replies" />
            </div>
            <div className="mt-3 h-48">
              <AreaChart series={[
                { data: trendSeries, color: "var(--signal)" },
                { data: openSeries, color: "oklch(0.65 0.16 245)" },
                { data: convSeries, color: "oklch(0.72 0.16 30)" },
              ]} />
            </div>
          </div>
        </Panel>

        <Panel title="Today's budget">
          <div className="p-5">
            <RingChart value={pct} label={`${todaysViews}/${DAILY_VIEW_LIMIT}`} sub="views used" />
            <div className="mt-4 grid grid-cols-2 gap-2 text-center">
              <div className="rounded-lg border border-border bg-muted/30 p-2">
                <Mono className="text-muted-foreground">Remaining</Mono>
                <div className="mt-0.5 text-sm font-semibold">{remaining}</div>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-2">
                <Mono className="text-muted-foreground">Resets</Mono>
                <div className="mt-0.5 text-sm font-semibold">00:00</div>
              </div>
            </div>
          </div>
        </Panel>
      </div>

      {/* Row: pipeline mini cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <MiniStat icon={<Flame className="h-3.5 w-3.5 text-rose-400" />} label="Hot" value={hotCount} tone="rose" />
        <MiniStat icon={<Activity className="h-3.5 w-3.5 text-amber-400" />} label="Warm" value={warmCount} tone="amber" />
        <MiniStat icon={<Activity className="h-3.5 w-3.5 text-sky-400" />} label="Cold" value={coldCount} tone="sky" />
        <MiniStat icon={<Target className="h-3.5 w-3.5 text-[color:var(--signal)]" />} label="High intent" value={highIntent} tone="signal" />
        <MiniStat icon={<CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />} label="Qualified" value={qualified} tone="emerald" />
        <MiniStat icon={<Star className="h-3.5 w-3.5 text-amber-300" />} label="Favourites" value={LEADS.filter(l => l.favourite).length} tone="amber" />
      </div>

      {/* Row: platform strip */}
      <Panel title="By platform" description="Today's lead volume by source" actions={<Mono className="text-muted-foreground">10 sources</Mono>}>
        <div className="grid grid-cols-4 gap-3 p-5 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10">
          {byPlatform.map(([p, count]) => {
            const v = platformVisual(p as any);
            return (
              <div key={p} className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card/50 py-3.5 text-center transition hover:border-foreground/25">
                <SocialTile platform={p as any} size={34} />
                <div className="text-base font-semibold leading-none">{count}</div>
                <Mono className="text-[9px] text-muted-foreground">{v.label}</Mono>
              </div>
            );
          })}
        </div>
      </Panel>

      {/* Row: category donut + country bars + hourly heat */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="By category" description="Service split">
          <div className="p-5">
            <ul className="space-y-2.5">
              {byCategory.map(([c, n], i) => {
                const p = Math.round((n / totalCat) * 100);
                const hues = ["var(--signal)", "oklch(0.65 0.16 245)", "oklch(0.72 0.16 30)", "oklch(0.68 0.14 300)", "oklch(0.7 0.14 180)", "oklch(0.75 0.15 90)"];
                return (
                  <li key={c}>
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="truncate text-foreground/90">{c}</span>
                      <span className="tabular-nums text-muted-foreground">{n} · {p}%</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full" style={{ width: `${p}%`, background: hues[i % hues.length] }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Panel>

        <Panel title="By country" description="Where leads are">
          <ul className="divide-y divide-border">
            {byCountry.map(([c, n]) => (
              <li key={c} className="flex items-center gap-3 px-5 py-2.5 text-[13px]">
                <span className="text-base leading-none">{countryFlag(c)}</span>
                <span className="min-w-0 flex-1 truncate">{c}</span>
                <div className="h-1.5 w-24 overflow-hidden rounded-md bg-muted">
                  <div className="h-full bg-[color:var(--signal)]/80" style={{ width: `${(n / maxCountry) * 100}%` }} />
                </div>
                <Mono className="w-7 text-right text-foreground">{n}</Mono>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Activity heat" description="Leads found by hour (UTC)">
          <div className="p-5">
            <div className="grid grid-cols-12 gap-1">
              {hourly.map((v, i) => {
                const intensity = v / maxHourly;
                return (
                  <div
                    key={i}
                    title={`${i}:00 · ${v} leads`}
                    className="aspect-square rounded-[3px] border border-white/5"
                    style={{ background: `color-mix(in oklab, var(--signal) ${Math.round(intensity * 90)}%, oklch(0.15 0 0))` }}
                  />
                );
              })}
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
              <span>00:00</span><span>12:00</span><span>23:00</span>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2 text-[11px]">
              <span className="text-muted-foreground">Peak hour</span>
              <span className="font-semibold">{hourly.indexOf(maxHourly)}:00 · {maxHourly} leads</span>
            </div>
          </div>
        </Panel>
      </div>

      {/* Row: recent hot + upcoming */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel
          title="Recent hot leads"
          description="Fresh opportunities in your feed"
          className="lg:col-span-2"
          actions={<Link to="/dashboard/leads" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">See all <ArrowRight className="h-3 w-3" /></Link>}
        >
          <ul className="divide-y divide-border">
            {LEADS.filter((l) => l.status === "hot").slice(0, 6).map((l) => {
              const v = platformVisual(l.platform);
              return (
                <li key={l.id} className="flex items-center gap-3 px-5 py-3">
                  <SocialTile platform={l.platform} size={30} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate text-sm font-medium">{l.name}</span>
                      {l.favourite && <Star className="h-3 w-3 fill-amber-400 text-amber-400" />}
                    </div>
                    <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <span>{countryFlag(l.country)}</span>
                      <span className="truncate">{l.country}</span>
                      <span>·</span>
                      <span className="truncate" style={{ color: v.brand }}>{v.label}</span>
                      <span>·</span>
                      <span className="inline-flex items-center gap-0.5"><Heart className="h-2.5 w-2.5" />{l.reactions ?? 0}</span>
                    </div>
                  </div>
                  <span className="hidden rounded-full bg-[color:var(--signal)]/12 px-2 py-0.5 font-mono text-[10px] font-semibold text-[color:var(--signal)] sm:inline-block">
                    {l.score}
                  </span>
                  <Link
                    to="/dashboard/leads/$leadId"
                    params={{ leadId: l.id }}
                    className="inline-flex h-7 items-center gap-1 rounded-md border border-border bg-card px-2 text-[11px] text-foreground hover:bg-background"
                  >
                    Open <ArrowRight className="h-3 w-3" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Panel>

        <Panel title="Suggested actions" description="Move faster today">
          <ul className="divide-y divide-border">
            <ActionItem icon={<Clock className="h-3.5 w-3.5" />} title="12 unopened hot leads" body="Review before they cool off." />
            <ActionItem icon={<Users className="h-3.5 w-3.5" />} title="3 favourites pending reply" body="Draft an outreach message." />
            <ActionItem icon={<Bell className="h-3.5 w-3.5" />} title="New keyword match" body='"headless CMS migration" — 4 new leads.' />
            <ActionItem icon={<TrendingUp className="h-3.5 w-3.5" />} title="Reply rate down 1.2%" body="Try shorter opening lines." />
          </ul>
        </Panel>
      </div>
    </div>
  );
}

/* ─────────────── charts + tiles ─────────────── */

function KpiCard({ label, value, delta, trend, icon, series }: {
  label: string; value: string; delta: string; trend: "up" | "down"; icon: React.ReactNode; series: number[];
}) {
  const trendColor = trend === "up" ? "text-[color:var(--signal)]" : "text-rose-400";
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;
  return (
    <div className="panel-premium panel-premium-hover p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          {icon}
          <Mono>{label}</Mono>
        </div>
        <span className={`inline-flex items-center gap-0.5 rounded-full bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-medium ${trendColor}`}>
          <TrendIcon className="h-2.5 w-2.5" /> {delta}
        </span>
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight tabular-nums">{value}</div>
      <div className="mt-2 h-8">
        <Sparkline data={series} color={trend === "up" ? "oklch(0.72 0.19 145)" : "oklch(0.65 0.22 25)"} />
      </div>
    </div>
  );
}

function MiniStat({ icon, label, value, tone }: {
  icon: React.ReactNode; label: string; value: number; tone: "rose" | "amber" | "sky" | "signal" | "emerald";
}) {
  const ring: Record<typeof tone, string> = {
    rose: "ring-rose-500/20", amber: "ring-amber-500/20", sky: "ring-sky-500/20",
    signal: "ring-[color:var(--signal)]/25", emerald: "ring-emerald-500/20",
  };
  return (
    <div className={`rounded-xl border border-border bg-card/50 px-3.5 py-3 ring-1 ${ring[tone]}`}>
      <div className="flex items-center gap-1.5">{icon}<Mono className="text-muted-foreground">{label}</Mono></div>
      <div className="mt-1.5 text-xl font-semibold tabular-nums">{value}</div>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

function AreaChart({ series }: { series: { data: number[]; color: string }[] }) {
  const w = 600, h = 160;
  const all = series.flatMap((s) => s.data);
  const max = Math.max(...all);
  const min = 0;
  const range = max - min || 1;
  const n = series[0].data.length;
  const step = w / (n - 1);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-full w-full">
      {/* grid */}
      {[0.25, 0.5, 0.75].map((p) => (
        <line key={p} x1={0} x2={w} y1={h * p} y2={h * p} stroke="oklch(1 0 0 / 0.06)" strokeDasharray="3 4" />
      ))}
      {series.map((s, i) => {
        const pts = s.data.map((d, idx) => `${idx * step},${h - ((d - min) / range) * h}`);
        const line = pts.join(" ");
        const area = `M0,${h} L${pts.join(" L")} L${w},${h} Z`;
        return (
          <g key={i}>
            <path d={area} fill={s.color} opacity={0.12} />
            <polyline points={line} fill="none" stroke={s.color} strokeWidth={1.75} strokeLinejoin="round" strokeLinecap="round" />
          </g>
        );
      })}
    </svg>
  );
}

function RingChart({ value, label, sub }: { value: number; label: string; sub: string }) {
  const size = 160, stroke = 12, r = (size - stroke) / 2, c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div className="relative mx-auto grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} strokeWidth={stroke} stroke="oklch(1 0 0 / 0.06)" fill="none" />
        <circle
          cx={size/2} cy={size/2} r={r} strokeWidth={stroke}
          stroke="var(--signal)" fill="none" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={off}
          style={{ filter: "drop-shadow(0 0 8px var(--signal-glow))" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="text-2xl font-semibold tabular-nums">{label}</div>
          <Mono className="mt-1 block text-muted-foreground">{sub}</Mono>
        </div>
      </div>
    </div>
  );
}

function ActionItem({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <li className="flex items-start gap-3 px-5 py-3">
      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-[color:var(--signal)]/10 text-[color:var(--signal)] ring-1 ring-[color:var(--signal)]/25">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-medium">{title}</div>
        <div className="mt-0.5 text-[11.5px] text-muted-foreground">{body}</div>
      </div>
      <ArrowRight className="mt-1 h-3.5 w-3.5 text-muted-foreground" />
    </li>
  );
}
