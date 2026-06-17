import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, TrendingDown, Globe } from "lucide-react";
import { PageHeader, Panel, Stat, Sparkline, Mono } from "@/components/dashboard/dash-ui";

export const Route = createFileRoute("/dashboard/analytics")({
  component: AnalyticsPage,
});

const COUNTRIES = [
  { name: "United States", flag: "🇺🇸", value: 412, pct: 32 },
  { name: "United Kingdom", flag: "🇬🇧", value: 218, pct: 17 },
  { name: "India", flag: "🇮🇳", value: 184, pct: 14 },
  { name: "Germany", flag: "🇩🇪", value: 142, pct: 11 },
  { name: "Bangladesh", flag: "🇧🇩", value: 98, pct: 8 },
  { name: "Other", flag: "🌐", value: 230, pct: 18 },
];

function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Analytics"
        title="Performance"
        description="How your acquisition, outreach, and conversion are trending."
        actions={
          <select className="h-9 rounded-md border border-border bg-card/50 px-3 text-sm">
            <option>Last 30 days</option><option>This quarter</option><option>Year to date</option>
          </select>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Lead → Qualified" value="32.1%" delta="▲ 2.4pts" trend="up" icon={<TrendingUp className="h-4 w-4" />} />
        <Stat label="Reply rate" value="9.8%" delta="▲ 0.6pts" trend="up" />
        <Stat label="Meeting → Deal" value="41%" delta="▼ 1.8pts" trend="down" icon={<TrendingDown className="h-4 w-4" />} />
        <Stat label="Avg deal size" value="$8.4k" delta="▲ $0.9k" trend="up" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel className="lg:col-span-2" title="Revenue trend" description="Closed-Won revenue · last 30 days">
          <div className="p-5">
            <div className="h-56 text-[color:var(--signal,oklch(0.72_0.19_145))]">
              <Sparkline data={[8,12,10,18,16,22,28,24,32,30,38,42,40,48,52,46,58,62,55,68,72,80,75,88,92,86,98,104,110,118]} />
            </div>
          </div>
        </Panel>

        <Panel title="Channel mix" description="By revenue contribution">
          <div className="space-y-4 p-5">
            {[
              { c: "LinkedIn", v: 38, color: "bg-sky-500" },
              { c: "Email", v: 31, color: "bg-emerald-500" },
              { c: "Instagram", v: 18, color: "bg-rose-500" },
              { c: "Facebook", v: 9, color: "bg-indigo-500" },
              { c: "Referral", v: 4, color: "bg-amber-500" },
            ].map((s) => (
              <div key={s.c}>
                <div className="flex items-center justify-between text-sm">
                  <span>{s.c}</span><span className="font-mono text-xs text-muted-foreground">{s.v}%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-card">
                  <div className={`h-full ${s.color}`} style={{ width: `${s.v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Conversion funnel">
          <div className="space-y-2 p-5">
            {[
              { stage: "Visitors", v: 12420, w: 100 },
              { stage: "Leads captured", v: 3180, w: 78 },
              { stage: "Qualified", v: 1024, w: 56 },
              { stage: "Meetings booked", v: 412, w: 34 },
              { stage: "Deals won", v: 168, w: 18 },
            ].map((s, i) => (
              <div key={s.stage}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{s.stage}</span>
                  <span className="font-mono">{s.v.toLocaleString()}</span>
                </div>
                <div className="mx-auto h-8 overflow-hidden rounded-md bg-card" style={{ width: `${s.w}%` }}>
                  <div className={`h-full ${["bg-sky-500/70","bg-indigo-500/70","bg-amber-500/70","bg-orange-500/70","bg-emerald-500/70"][i]}`} />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="By country" actions={<Globe className="h-4 w-4 text-muted-foreground" />}>
          <ul className="divide-y divide-border">
            {COUNTRIES.map((c) => (
              <li key={c.name} className="flex items-center gap-3 px-5 py-3 text-sm">
                <span className="text-lg leading-none">{c.flag}</span>
                <span className="flex-1">{c.name}</span>
                <div className="h-1.5 w-32 overflow-hidden rounded-full bg-card">
                  <div className="h-full bg-foreground/60" style={{ width: `${c.pct * 2.5}%` }} />
                </div>
                <Mono className="w-12 text-right text-muted-foreground">{c.value}</Mono>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
