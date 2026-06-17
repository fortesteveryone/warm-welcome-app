import { createFileRoute, Link } from "@tanstack/react-router";
import { Filter, Download, Plus, Search, MoreHorizontal, Instagram, Linkedin, Facebook } from "lucide-react";
import { PageHeader, Panel, Badge, Avatar, Mono } from "@/components/dashboard/dash-ui";
import { LEADS } from "@/lib/leads-data";

export const Route = createFileRoute("/dashboard/leads/")({
  component: LeadsPage,
});


const sourceIcon = (s: string) =>
  s === "instagram" ? <Instagram className="h-3.5 w-3.5 text-rose-400" /> :
  s === "linkedin" ? <Linkedin className="h-3.5 w-3.5 text-sky-400" /> :
  <Facebook className="h-3.5 w-3.5 text-indigo-400" />;

function LeadsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Leads"
        title="All leads"
        description="Sourced from your connected social platforms, scored and ready for outreach."
        actions={
          <>
            <button className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-card/50 px-3 text-sm hover:bg-card">
              <Download className="h-3.5 w-3.5" /> Export
            </button>
            <button className="inline-flex h-9 items-center gap-1.5 rounded-md bg-foreground px-3 text-sm font-medium text-background hover:bg-foreground/90">
              <Plus className="h-3.5 w-3.5" /> New lead
            </button>
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[240px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input placeholder="Search by name, company, role…" className="h-9 w-full rounded-md border border-border bg-card/50 pl-9 pr-3 text-sm focus:border-foreground/40 focus:outline-none" />
        </div>
        {["All", "Hot", "Warm", "Cold", "Unassigned"].map((t, i) => (
          <button key={t} className={`h-9 rounded-md border px-3 text-sm ${i === 0 ? "border-foreground/40 bg-foreground/10" : "border-border bg-card/50 text-muted-foreground hover:text-foreground"}`}>
            {t}
          </button>
        ))}
        <button className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-card/50 px-3 text-sm text-muted-foreground hover:text-foreground">
          <Filter className="h-3.5 w-3.5" /> Filters
        </button>
      </div>

      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-card/30 text-left">
                {["Lead", "Source", "Score", "Status", "Stage", "Owner", "Updated", ""].map((h) => (
                  <th key={h} className="px-4 py-3 font-mono text-[11px] uppercase tracking-tight text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LEADS.map((l) => (
                <tr key={l.id} className="border-b border-border last:border-0 hover:bg-card/30">
                  <td className="px-4 py-3">
                    <Link to="/dashboard/leads/$leadId" params={{ leadId: l.id }} className="flex items-center gap-3 group">
                      <Avatar name={l.name} />
                      <div className="min-w-0">
                        <div className="truncate font-medium group-hover:underline">{l.name}</div>
                        <div className="truncate text-xs text-muted-foreground">{l.role} · {l.company}</div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      {sourceIcon(l.source)} <span className="capitalize">{l.source}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-card">
                        <div className={`h-full ${l.score > 75 ? "bg-emerald-500" : l.score > 50 ? "bg-amber-500" : "bg-sky-500"}`} style={{ width: `${l.score}%` }} />
                      </div>
                      <span className="font-mono text-xs">{l.score}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><Badge tone={l.status as "hot" | "warm" | "cold"}>{l.status}</Badge></td>
                  <td className="px-4 py-3 text-muted-foreground">{l.stage}</td>
                  <td className="px-4 py-3 text-muted-foreground">{l.owner}</td>
                  <td className="px-4 py-3"><Mono className="text-muted-foreground">{l.updated}</Mono></td>
                  <td className="px-4 py-3 text-right">
                    <button className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-card hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <Mono className="text-muted-foreground">Showing 1–8 of 1,284</Mono>
          <div className="flex items-center gap-1">
            {["Prev", "1", "2", "3", "…", "161", "Next"].map((p, i) => (
              <button key={i} className={`h-7 min-w-[28px] rounded-md px-2 text-xs ${p === "1" ? "bg-foreground/10 text-foreground" : "text-muted-foreground hover:bg-card"}`}>{p}</button>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  );
}
