import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, MoreHorizontal, DollarSign, Calendar, Search, Filter, X } from "lucide-react";
import { PageHeader, Mono, Avatar, Badge, Stat } from "@/components/dashboard/dash-ui";
import { FormDialog, Field, fieldCls, gridCls } from "@/components/dashboard/form-dialog";

export const Route = createFileRoute("/dashboard/pipeline")({
  component: PipelinePage,
});

type Deal = { title: string; company: string; value: number; owner: string; due: string; tone?: "hot" | "warm" | "cold"; stage: string };

const ALL_DEALS: Deal[] = [
  { stage: "New", title: "Brand revamp", company: "Lumen Health", value: 4200, owner: "Nasir", due: "Aug 28" },
  { stage: "New", title: "Lead generation pilot", company: "Hearth Realty", value: 1800, owner: "Mei", due: "Aug 30" },
  { stage: "New", title: "Social audit", company: "Wave Mobility", value: 900, owner: "Sara", due: "Sep 02", tone: "cold" },
  { stage: "Qualified", title: "Quarterly retainer", company: "Saffron Kitchen", value: 6500, owner: "Sara", due: "Sep 04", tone: "warm" },
  { stage: "Qualified", title: "Ad management", company: "Bluepeak SaaS", value: 5200, owner: "Nasir", due: "Sep 05", tone: "warm" },
  { stage: "Proposal", title: "Full-service growth", company: "Northwave Studio", value: 18400, owner: "Nasir", due: "Sep 10", tone: "hot" },
  { stage: "Proposal", title: "Launch campaign", company: "Mori Apparel", value: 9800, owner: "Mei", due: "Sep 12", tone: "hot" },
  { stage: "Negotiation", title: "12-month retainer", company: "Velvet & Co.", value: 24000, owner: "Nasir", due: "Sep 15", tone: "hot" },
  { stage: "Closed-Won", title: "Brand identity", company: "Atlas Logistics", value: 12000, owner: "Sara", due: "Closed" },
  { stage: "Closed-Won", title: "Outreach sprint", company: "Hearth Realty", value: 3400, owner: "Mei", due: "Closed" },
];

const STAGE_META: Record<string, string> = {
  "New": "bg-sky-500/70",
  "Qualified": "bg-indigo-500/70",
  "Proposal": "bg-amber-500/70",
  "Negotiation": "bg-orange-500/70",
  "Closed-Won": "bg-emerald-500/70",
};
const STAGES = Object.keys(STAGE_META);
const OWNERS = ["Nasir", "Sara", "Mei"];

function PipelinePage() {
  const [query, setQuery] = useState("");
  const [owner, setOwner] = useState<string>("all");
  const [minValue, setMinValue] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_DEALS.filter((d) =>
      (owner === "all" || d.owner === owner) &&
      d.value >= minValue &&
      (!q || d.title.toLowerCase().includes(q) || d.company.toLowerCase().includes(q))
    );
  }, [query, owner, minValue]);

  const total = filtered.reduce((a, d) => a + d.value, 0);
  const wonValue = filtered.filter((d) => d.stage === "Closed-Won").reduce((a, d) => a + d.value, 0);

  const activeFilters = (owner !== "all" ? 1 : 0) + (minValue > 0 ? 1 : 0);

  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Pipeline"
        title="Deal pipeline"
        description="Drag-style kanban view (demo) — 5 stages across all active deals."
        actions={
          <button className="inline-flex h-9 items-center gap-1.5 rounded-md bg-foreground px-3 text-sm font-medium text-background hover:bg-foreground/90">
            <Plus className="h-3.5 w-3.5" /> New deal
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Open deals" value={String(filtered.filter((d) => d.stage !== "Closed-Won").length)} />
        <Stat label="Pipeline value" value={`$${(total / 1000).toFixed(1)}k`} trend="flat" />
        <Stat label="Closed-Won" value={`$${(wonValue / 1000).toFixed(1)}k`} trend="up" delta="this quarter" />
        <Stat label="Win rate" value="32%" delta="▲ 4pts" trend="up" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search deals…" className="h-9 w-full rounded-md border border-border bg-card/50 pl-9 pr-3 text-sm focus:border-foreground/40 focus:outline-none" />
        </div>
        <select value={owner} onChange={(e) => setOwner(e.target.value)} className="h-9 rounded-md border border-border bg-card/50 px-3 text-sm">
          <option value="all">All owners</option>
          {OWNERS.map((o) => (<option key={o} value={o}>{o}</option>))}
        </select>
        <label className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-card/50 px-3 text-xs text-muted-foreground">
          <Filter className="h-3.5 w-3.5" /> Min value
          <input type="number" min={0} step={500} value={minValue} onChange={(e) => setMinValue(Number(e.target.value) || 0)} className="h-6 w-20 rounded border border-border bg-background px-1.5 text-foreground" />
        </label>
        {activeFilters > 0 && (
          <button onClick={() => { setOwner("all"); setMinValue(0); setQuery(""); }} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <X className="h-3 w-3" /> Clear
          </button>
        )}
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {STAGES.map((stage) => {
          const deals = filtered.filter((d) => d.stage === stage);
          const sum = deals.reduce((a, d) => a + d.value, 0);
          return (
            <div key={stage} className="w-[290px] shrink-0">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${STAGE_META[stage]}`} />
                  <span className="text-sm font-semibold">{stage}</span>
                  <span className="rounded-full bg-card px-1.5 py-0.5 text-[10px] text-muted-foreground">{deals.length}</span>
                </div>
                <Mono className="text-muted-foreground">${(sum / 1000).toFixed(1)}k</Mono>
              </div>
              <div className="space-y-2.5">
                {deals.length === 0 && (
                  <div className="rounded-lg border border-dashed border-border bg-card/20 p-4 text-center text-[11px] text-muted-foreground">No deals</div>
                )}
                {deals.map((d) => (
                  <div key={d.title} className="rounded-lg border border-border bg-card/50 p-3 hover:bg-card">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-sm font-medium">{d.title}</div>
                      <button className="grid h-6 w-6 place-items-center rounded text-muted-foreground hover:bg-background"><MoreHorizontal className="h-3.5 w-3.5" /></button>
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{d.company}</div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm font-semibold">
                        <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />{d.value.toLocaleString()}
                      </div>
                      {d.tone && <Badge tone={d.tone}>{d.tone}</Badge>}
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-border pt-2">
                      <Avatar name={d.owner} className="h-6 w-6 text-[10px]" />
                      <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Calendar className="h-3 w-3" /> {d.due}
                      </span>
                    </div>
                  </div>
                ))}
                <button className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2 text-xs text-muted-foreground hover:bg-card hover:text-foreground">
                  <Plus className="h-3.5 w-3.5" /> Add deal
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
