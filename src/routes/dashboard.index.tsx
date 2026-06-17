import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { CalendarRange, UserPlus, Target, Flame, DollarSign, MessageSquare, CheckCircle2, Clock, ChevronDown, X } from "lucide-react";
import { PageHeader, Stat, Panel, Badge, Avatar, Sparkline, Mono } from "@/components/dashboard/dash-ui";

export const Route = createFileRoute("/dashboard/")({
  component: Overview,
});

const RECENT_LEADS = [
  { name: "Aisha Rahman", company: "Velvet & Co.", source: "Instagram", score: 92, status: "hot" as const, when: "2m ago" },
  { name: "Marcus Lin", company: "Northwave Studio", source: "LinkedIn", score: 81, status: "hot" as const, when: "14m ago" },
  { name: "Priya Devi", company: "Saffron Kitchen", source: "Facebook", score: 67, status: "warm" as const, when: "1h ago" },
  { name: "Jonas Weber", company: "Atlas Logistics", source: "X / Twitter", score: 54, status: "warm" as const, when: "3h ago" },
  { name: "Camila Reyes", company: "Lumen Health", source: "Instagram", score: 41, status: "cold" as const, when: "5h ago" },
];

const TASKS = [
  { text: "Follow up with Velvet & Co. on pricing", due: "Today, 4:30pm", done: false },
  { text: "Send proposal to Atlas Logistics", due: "Tomorrow", done: false },
  { text: "Review LinkedIn campaign creatives", due: "Fri", done: false },
  { text: "Onboarding call · Saffron Kitchen", due: "Done", done: true },
];

const ACTIVITY = [
  { who: "Aisha Rahman", what: "replied to your outreach", when: "2m" },
  { who: "Campaign · Q3 SaaS", what: "sent 142 emails (38% open)", when: "1h" },
  { who: "Marcus Lin", what: "moved to Negotiation", when: "3h" },
  { who: "You", what: "added 24 new leads from Instagram scan", when: "5h" },
  { who: "Priya Devi", what: "booked a discovery call", when: "Yesterday" },
];

function Overview() {
  return (
    <div className="space-y-8">
      <PageHeader
        kicker="Overview"
        title="Welcome back, Nasir"
        description="Here's what's happening across your pipeline today."
        actions={<DateRangeFilter />}
      />


      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="New leads" value="1,284" delta="▲ 12.4% vs last week" trend="up" icon={<UserPlus className="h-4 w-4" />} />
        <Stat label="Qualified" value="412" delta="▲ 8.1%" trend="up" icon={<Target className="h-4 w-4" />} />
        <Stat label="Hot deals" value="38" delta="▼ 2.0%" trend="down" icon={<Flame className="h-4 w-4" />} />
        <Stat label="Revenue (MTD)" value="$84,120" delta="▲ 21.6%" trend="up" icon={<DollarSign className="h-4 w-4" />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel
          className="lg:col-span-2"
          title="Lead acquisition"
          description="New leads captured per day · last 14 days"
          actions={<Badge tone="success">Live</Badge>}
        >
          <div className="p-5">
            <div className="h-48 text-[color:var(--signal,oklch(0.72_0.19_145))]">
              <Sparkline data={[12, 18, 14, 22, 28, 24, 33, 30, 41, 38, 46, 52, 49, 61]} />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3 border-t border-border pt-4 text-center">
              {[
                { l: "Instagram", v: "412", c: "text-rose-400" },
                { l: "LinkedIn", v: "318", c: "text-sky-400" },
                { l: "Facebook", v: "224", c: "text-indigo-400" },
                { l: "X / Twitter", v: "108", c: "text-foreground" },
              ].map((s) => (
                <div key={s.l}>
                  <div className={`text-lg font-semibold ${s.c}`}>{s.v}</div>
                  <Mono className="text-muted-foreground">{s.l}</Mono>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <Panel title="Pipeline value" description="By stage">
          <div className="space-y-3 p-5">
            {[
              { stage: "New", val: 142, pct: 100, c: "bg-sky-500/70" },
              { stage: "Qualified", val: 86, pct: 60, c: "bg-indigo-500/70" },
              { stage: "Proposal", val: 41, pct: 32, c: "bg-amber-500/70" },
              { stage: "Negotiation", val: 23, pct: 20, c: "bg-orange-500/70" },
              { stage: "Closed-Won", val: 14, pct: 12, c: "bg-emerald-500/70" },
            ].map((s) => (
              <div key={s.stage}>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{s.stage}</span>
                  <span className="font-medium">${s.val}k</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-card">
                  <div className={`h-full ${s.c}`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel className="lg:col-span-2" title="Recent leads" actions={<a className="text-xs text-muted-foreground hover:text-foreground" href="/dashboard/leads">View all →</a>}>
          <div className="divide-y divide-border">
            {RECENT_LEADS.map((l) => (
              <div key={l.name} className="flex items-center gap-3 px-5 py-3">
                <Avatar name={l.name} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium">{l.name}</span>
                    <Badge tone={l.status}>{l.status}</Badge>
                  </div>
                  <div className="truncate text-xs text-muted-foreground">
                    {l.company} · {l.source}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{l.score}</div>
                  <Mono className="text-muted-foreground">{l.when}</Mono>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel title="Tasks today">
            <ul className="divide-y divide-border">
              {TASKS.map((t) => (
                <li key={t.text} className="flex items-start gap-3 px-5 py-3">
                  {t.done ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" />
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

          <Panel title="Activity">
            <ul className="space-y-3 p-5">
              {ACTIVITY.map((a, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <div className="min-w-0">
                    <span className="font-medium">{a.who}</span> <span className="text-muted-foreground">{a.what}</span>
                    <div className="text-[11px] text-muted-foreground">{a.when} ago</div>
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
