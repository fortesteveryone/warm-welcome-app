import { createFileRoute } from "@tanstack/react-router";
import { Plus, MoreHorizontal, DollarSign, Calendar } from "lucide-react";
import { PageHeader, Mono, Avatar, Badge } from "@/components/dashboard/dash-ui";

export const Route = createFileRoute("/dashboard/pipeline")({
  component: PipelinePage,
});

type Deal = { title: string; company: string; value: number; owner: string; due: string; tone?: "hot" | "warm" | "cold" };
const COLUMNS: { stage: string; tone: string; deals: Deal[] }[] = [
  {
    stage: "New", tone: "bg-sky-500/70",
    deals: [
      { title: "Brand revamp", company: "Lumen Health", value: 4200, owner: "Nasir", due: "Aug 28" },
      { title: "Lead generation pilot", company: "Hearth Realty", value: 1800, owner: "Mei", due: "Aug 30" },
      { title: "Social audit", company: "Wave Mobility", value: 900, owner: "Sara", due: "Sep 02", tone: "cold" },
    ],
  },
  {
    stage: "Qualified", tone: "bg-indigo-500/70",
    deals: [
      { title: "Quarterly retainer", company: "Saffron Kitchen", value: 6500, owner: "Sara", due: "Sep 04", tone: "warm" },
      { title: "Ad management", company: "Bluepeak SaaS", value: 5200, owner: "Nasir", due: "Sep 05", tone: "warm" },
    ],
  },
  {
    stage: "Proposal", tone: "bg-amber-500/70",
    deals: [
      { title: "Full-service growth", company: "Northwave Studio", value: 18400, owner: "Nasir", due: "Sep 10", tone: "hot" },
      { title: "Launch campaign", company: "Mori Apparel", value: 9800, owner: "Mei", due: "Sep 12", tone: "hot" },
    ],
  },
  {
    stage: "Negotiation", tone: "bg-orange-500/70",
    deals: [
      { title: "12-month retainer", company: "Velvet & Co.", value: 24000, owner: "Nasir", due: "Sep 15", tone: "hot" },
    ],
  },
  {
    stage: "Closed-Won", tone: "bg-emerald-500/70",
    deals: [
      { title: "Brand identity", company: "Atlas Logistics", value: 12000, owner: "Sara", due: "Closed" },
      { title: "Outreach sprint", company: "Hearth Realty", value: 3400, owner: "Mei", due: "Closed" },
    ],
  },
];

function PipelinePage() {
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

      <div className="flex gap-4 overflow-x-auto pb-2">
        {COLUMNS.map((col) => {
          const total = col.deals.reduce((a, d) => a + d.value, 0);
          return (
            <div key={col.stage} className="w-[290px] shrink-0">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${col.tone}`} />
                  <span className="text-sm font-semibold">{col.stage}</span>
                  <span className="rounded-full bg-card px-1.5 py-0.5 text-[10px] text-muted-foreground">{col.deals.length}</span>
                </div>
                <Mono className="text-muted-foreground">${(total / 1000).toFixed(1)}k</Mono>
              </div>
              <div className="space-y-2.5">
                {col.deals.map((d) => (
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
