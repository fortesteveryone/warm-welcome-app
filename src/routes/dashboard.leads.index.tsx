import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Filter, Download, Plus, Search, MoreHorizontal, Instagram, Linkedin, Facebook,
  ArrowUpDown, ArrowUp, ArrowDown, LayoutGrid, List, X, Trash2, Tag as TagIcon,
  ChevronLeft, ChevronRight, Star, Flame, Snowflake, Twitter, Youtube, Github,
  MessageCircle, Globe, Send as SendIcon, Hash,
} from "lucide-react";
import { PageHeader, Panel, Badge, Avatar, Mono } from "@/components/dashboard/dash-ui";
import { FormDialog, Field, fieldCls, textareaCls, gridCls } from "@/components/dashboard/form-dialog";
import {
  LEADS, LEAD_OWNERS, LEAD_SOURCES, LEAD_STAGES, LEAD_CATEGORIES, LEAD_INTENTS,
  LEAD_PLATFORMS, LEAD_COUNTRIES, LEAD_QUALIFICATIONS,
  type Lead, type LeadSource, type LeadStatus, type LeadIntent, type LeadPlatform,
  type LeadCategory, type LeadQualification,
} from "@/lib/leads-data";

export const Route = createFileRoute("/dashboard/leads/")({
  component: LeadsPage,
});

const sourceIcon = (s: LeadSource) =>
  s === "instagram" ? <Instagram className="h-3.5 w-3.5 text-rose-400" /> :
  s === "linkedin" ? <Linkedin className="h-3.5 w-3.5 text-sky-400" /> :
  <Facebook className="h-3.5 w-3.5 text-indigo-400" />;

type SortKey = "name" | "score" | "stage" | "owner" | "updated";
type SortDir = "asc" | "desc";

const STATUS_TABS = ["All", "Hot", "Warm", "Cold"] as const;
const PAGE_SIZE = 10;

function LeadsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof STATUS_TABS)[number]>("All");
  const [view, setView] = useState<"table" | "grid">("table");
  const [showFilters, setShowFilters] = useState(true);
  const [favOnly, setFavOnly] = useState(false);
  const [categories, setCategories] = useState<LeadCategory[]>([]);
  const [temperatures, setTemperatures] = useState<LeadStatus[]>([]);
  const [intents, setIntents] = useState<LeadIntent[]>([]);
  const [country, setCountry] = useState<string>("All");
  const [platforms, setPlatforms] = useState<LeadPlatform[]>([]);
  const [qualifications, setQualifications] = useState<LeadQualification[]>([]);
  const [stages, setStages] = useState<string[]>([]);
  const [owners, setOwners] = useState<string[]>([]);
  const [minScore, setMinScore] = useState(0);
  const [sortKey, setSortKey] = useState<SortKey>("updated");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [leads, setLeads] = useState<Lead[]>(LEADS);
  const [addOpen, setAddOpen] = useState(false);

  const toggle = <T,>(arr: T[], v: T) => arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = leads.filter((l) => {
      if (favOnly && !l.favourite) return false;
      if (status !== "All" && l.status !== status.toLowerCase()) return false;
      if (categories.length && !categories.includes(l.category)) return false;
      if (temperatures.length && !temperatures.includes(l.status)) return false;
      if (intents.length && !intents.includes(l.intent)) return false;
      if (country !== "All" && l.country !== country) return false;
      if (platforms.length && !platforms.includes(l.platform)) return false;
      if (qualifications.length && !qualifications.includes(l.qualification)) return false;
      if (stages.length && !stages.includes(l.stage)) return false;
      if (owners.length && !owners.includes(l.owner)) return false;
      if (l.score < minScore) return false;
      if (q && !(l.name.toLowerCase().includes(q) || l.company.toLowerCase().includes(q) || l.role.toLowerCase().includes(q) || l.email.toLowerCase().includes(q))) return false;
      return true;
    });
    const stageRank = (s: string) => LEAD_STAGES.indexOf(s as (typeof LEAD_STAGES)[number]);
    list = [...list].sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "name": cmp = a.name.localeCompare(b.name); break;
        case "score": cmp = a.score - b.score; break;
        case "stage": cmp = stageRank(a.stage) - stageRank(b.stage); break;
        case "owner": cmp = a.owner.localeCompare(b.owner); break;
        case "updated": cmp = leads.indexOf(a) - leads.indexOf(b); break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [leads, query, status, favOnly, categories, temperatures, intents, country, platforms, qualifications, stages, owners, minScore, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const activeFilterCount =
    (favOnly ? 1 : 0) + categories.length + temperatures.length + intents.length +
    (country !== "All" ? 1 : 0) + platforms.length + qualifications.length +
    stages.length + owners.length + (minScore > 0 ? 1 : 0);
  const allOnPageSelected = paged.length > 0 && paged.every((l) => selected.has(l.id));

  const onSort = (k: SortKey) => {
    if (sortKey === k) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(k); setSortDir(k === "score" || k === "updated" ? "desc" : "asc"); }
  };
  const sortIcon = (k: SortKey) =>
    sortKey !== k ? <ArrowUpDown className="h-3 w-3 opacity-40" /> :
    sortDir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />;

  const clearAll = () => {
    setFavOnly(false); setCategories([]); setTemperatures([]); setIntents([]);
    setCountry("All"); setPlatforms([]); setQualifications([]);
    setStages([]); setOwners([]); setMinScore(0); setQuery(""); setStatus("All"); setPage(1);
  };

  const toggleSelectAll = () => {
    const next = new Set(selected);
    if (allOnPageSelected) paged.forEach((l) => next.delete(l.id));
    else paged.forEach((l) => next.add(l.id));
    setSelected(next);
  };
  const toggleOne = (id: string) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

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
            <button onClick={() => setAddOpen(true)} className="inline-flex h-9 items-center gap-1.5 rounded-md bg-foreground px-3 text-sm font-medium text-background hover:bg-foreground/90">
              <Plus className="h-3.5 w-3.5" /> New lead
            </button>
          </>
        }
      />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[240px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder="Search by name, company, role, email…"
            className="h-9 w-full rounded-md border border-border bg-card/50 pl-9 pr-3 text-sm focus:border-foreground/40 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-1 rounded-md border border-border bg-card/50 p-0.5">
          {STATUS_TABS.map((t) => (
            <button
              key={t}
              onClick={() => { setStatus(t); setPage(1); }}
              className={`h-8 rounded px-2.5 text-xs transition ${status === t ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowFilters((s) => !s)}
          className={`inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-sm transition ${showFilters || activeFilterCount > 0 ? "border-foreground/40 bg-foreground/10" : "border-border bg-card/50 text-muted-foreground hover:text-foreground"}`}
        >
          <Filter className="h-3.5 w-3.5" /> Filters
          {activeFilterCount > 0 && <span className="rounded-full bg-foreground px-1.5 text-[10px] font-semibold text-background">{activeFilterCount}</span>}
        </button>
        <div className="flex items-center gap-1 rounded-md border border-border bg-card/50 p-0.5">
          <button onClick={() => setView("table")} className={`grid h-8 w-8 place-items-center rounded ${view === "table" ? "bg-foreground/10 text-foreground" : "text-muted-foreground"}`} aria-label="Table view">
            <List className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => setView("grid")} className={`grid h-8 w-8 place-items-center rounded ${view === "grid" ? "bg-foreground/10 text-foreground" : "text-muted-foreground"}`} aria-label="Grid view">
            <LayoutGrid className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <Panel>
          <div className="grid gap-5 p-5 md:grid-cols-4">
            <FilterGroup label="Source">
              {LEAD_SOURCES.map((s) => (
                <Chip key={s} active={sources.includes(s)} onClick={() => { setSources(toggle(sources, s)); setPage(1); }}>
                  {sourceIcon(s)} <span className="capitalize">{s}</span>
                </Chip>
              ))}
            </FilterGroup>
            <FilterGroup label="Stage">
              {LEAD_STAGES.map((s) => (
                <Chip key={s} active={stages.includes(s)} onClick={() => { setStages(toggle(stages, s)); setPage(1); }}>{s}</Chip>
              ))}
            </FilterGroup>
            <FilterGroup label="Owner">
              {LEAD_OWNERS.map((o) => (
                <Chip key={o} active={owners.includes(o)} onClick={() => { setOwners(toggle(owners, o)); setPage(1); }}>{o}</Chip>
              ))}
            </FilterGroup>
            <FilterGroup label={`Minimum score · ${minScore}`}>
              <input
                type="range" min={0} max={100} step={5}
                value={minScore}
                onChange={(e) => { setMinScore(Number(e.target.value)); setPage(1); }}
                className="w-full accent-foreground"
              />
              <div className="mt-1 flex justify-between text-[10px] text-muted-foreground"><span>0</span><span>50</span><span>100</span></div>
            </FilterGroup>
          </div>
          <div className="flex items-center justify-between border-t border-border px-5 py-3">
            <Mono className="text-muted-foreground">{filtered.length} of {leads.length} leads match</Mono>
            <button onClick={clearAll} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              <X className="h-3 w-3" /> Clear all
            </button>
          </div>
        </Panel>
      )}

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div className="flex items-center justify-between rounded-md border border-foreground/30 bg-foreground/5 px-4 py-2 text-sm">
          <span><span className="font-semibold">{selected.size}</span> selected</span>
          <div className="flex items-center gap-2">
            <button className="inline-flex h-7 items-center gap-1.5 rounded-md border border-border bg-card px-2.5 text-xs hover:bg-background">
              <TagIcon className="h-3 w-3" /> Tag
            </button>
            <button className="inline-flex h-7 items-center gap-1.5 rounded-md border border-border bg-card px-2.5 text-xs hover:bg-background">Assign owner</button>
            <button className="inline-flex h-7 items-center gap-1.5 rounded-md border border-rose-500/30 bg-rose-500/10 px-2.5 text-xs text-rose-300 hover:bg-rose-500/20">
              <Trash2 className="h-3 w-3" /> Delete
            </button>
            <button onClick={() => setSelected(new Set())} className="text-xs text-muted-foreground hover:text-foreground">Clear</button>
          </div>
        </div>
      )}

      {/* Results */}
      {filtered.length === 0 ? (
        <Panel><div className="p-12 text-center"><div className="text-sm font-medium">No leads match your filters</div><button onClick={clearAll} className="mt-3 text-xs text-muted-foreground underline hover:text-foreground">Clear filters</button></div></Panel>
      ) : view === "table" ? (
        <Panel>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-card/30 text-left">
                  <th className="w-10 px-4 py-3">
                    <input type="checkbox" checked={allOnPageSelected} onChange={toggleSelectAll} className="h-3.5 w-3.5 accent-foreground" />
                  </th>
                  <SortableTh label="Lead" k="name" onSort={onSort} icon={sortIcon("name")} />
                  <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-tight text-muted-foreground">Source</th>
                  <SortableTh label="Score" k="score" onSort={onSort} icon={sortIcon("score")} />
                  <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-tight text-muted-foreground">Status</th>
                  <SortableTh label="Stage" k="stage" onSort={onSort} icon={sortIcon("stage")} />
                  <SortableTh label="Owner" k="owner" onSort={onSort} icon={sortIcon("owner")} />
                  <SortableTh label="Updated" k="updated" onSort={onSort} icon={sortIcon("updated")} />
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {paged.map((l) => (
                  <tr key={l.id} className={`border-b border-border last:border-0 hover:bg-card/30 ${selected.has(l.id) ? "bg-foreground/5" : ""}`}>
                    <td className="px-4 py-3">
                      <input type="checkbox" checked={selected.has(l.id)} onChange={() => toggleOne(l.id)} className="h-3.5 w-3.5 accent-foreground" />
                    </td>
                    <td className="px-4 py-3">
                      <Link to="/dashboard/leads/$leadId" params={{ leadId: l.id }} className="group flex items-center gap-3">
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
                    <td className="px-4 py-3"><Badge tone={l.status}>{l.status}</Badge></td>
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
          <Pagination page={safePage} total={filtered.length} totalPages={totalPages} onPage={setPage} />
        </Panel>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {paged.map((l) => (
              <LeadCard key={l.id} lead={l} selected={selected.has(l.id)} onToggle={() => toggleOne(l.id)} />
            ))}
          </div>
          <Panel><Pagination page={safePage} total={filtered.length} totalPages={totalPages} onPage={setPage} /></Panel>
        </>
      )}

      <NewLeadDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onCreate={(lead) => { setLeads((cur) => [lead, ...cur]); setAddOpen(false); setPage(1); }}
      />
    </div>
  );
}

function NewLeadDialog({ open, onClose, onCreate }: { open: boolean; onClose: () => void; onCreate: (l: Lead) => void }) {
  return (
    <FormDialog
      open={open}
      onClose={onClose}
      title="New lead"
      description="Add a lead manually. It will appear at the top of the list."
      submitLabel="Create lead"
      onSubmit={(e) => {
        e.preventDefault();
        const f = e.currentTarget as HTMLFormElement;
        const d = new FormData(f);
        const name = String(d.get("name") || "").trim();
        if (!name) return;
        const score = Number(d.get("score") || 50);
        const lead: Lead = {
          id: `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString(36)}`,
          name,
          company: String(d.get("company") || ""),
          role: String(d.get("role") || ""),
          source: (d.get("source") as LeadSource) || "instagram",
          score,
          status: (d.get("status") as LeadStatus) || (score > 75 ? "hot" : score > 50 ? "warm" : "cold"),
          stage: String(d.get("stage") || "New"),
          owner: String(d.get("owner") || LEAD_OWNERS[0]),
          updated: "just now",
          email: String(d.get("email") || ""),
          phone: String(d.get("phone") || ""),
          city: String(d.get("city") || ""),
          country: String(d.get("country") || ""),
          website: String(d.get("website") || ""),
          tags: String(d.get("tags") || "").split(",").map((t) => t.trim()).filter(Boolean),
          about: String(d.get("about") || ""),
          dealValue: Number(d.get("dealValue") || 0),
          createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
          category: "Digital marketing",
          intent: "Medium",
          platform: ((d.get("source") as string) || "instagram") as Lead["platform"],
          qualification: "unreviewed",
          favourite: false,
        };
        onCreate(lead);
        f.reset();
      }}
    >
      <div className={gridCls}>
        <Field label="Name"><input name="name" required className={fieldCls} placeholder="Full name" /></Field>
        <Field label="Company"><input name="company" className={fieldCls} placeholder="Acme Inc." /></Field>
        <Field label="Role"><input name="role" className={fieldCls} placeholder="Founder, CMO…" /></Field>
        <Field label="Source">
          <select name="source" className={fieldCls} defaultValue="instagram">
            {LEAD_SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Stage">
          <select name="stage" className={fieldCls} defaultValue="New">
            {LEAD_STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Owner">
          <select name="owner" className={fieldCls} defaultValue={LEAD_OWNERS[0]}>
            {LEAD_OWNERS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
        <Field label="Status">
          <select name="status" className={fieldCls} defaultValue="warm">
            <option value="hot">hot</option><option value="warm">warm</option><option value="cold">cold</option>
          </select>
        </Field>
        <Field label="Score (0–100)"><input name="score" type="number" min={0} max={100} defaultValue={60} className={fieldCls} /></Field>
        <Field label="Email"><input name="email" type="email" className={fieldCls} placeholder="name@company.com" /></Field>
        <Field label="Phone"><input name="phone" className={fieldCls} placeholder="+1 555…" /></Field>
        <Field label="City"><input name="city" className={fieldCls} placeholder="City, Country" /></Field>
        <Field label="Website"><input name="website" className={fieldCls} placeholder="company.com" /></Field>
        <Field label="Deal value ($)"><input name="dealValue" type="number" min={0} step={100} defaultValue={0} className={fieldCls} /></Field>
        <Field label="Tags (comma separated)"><input name="tags" className={fieldCls} placeholder="VIP, SaaS" /></Field>
        <Field label="About / notes" span={2}><textarea name="about" className={textareaCls} placeholder="Short context about this lead…" /></Field>
      </div>
    </FormDialog>
  );
}

function SortableTh({ label, k, onSort, icon }: { label: string; k: SortKey; onSort: (k: SortKey) => void; icon: React.ReactNode }) {
  return (
    <th className="px-4 py-3">
      <button onClick={() => onSort(k)} className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-tight text-muted-foreground hover:text-foreground">
        {label} {icon}
      </button>
    </th>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Mono className="text-muted-foreground">{label}</Mono>
      <div className="mt-2 flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition ${active ? "border-foreground/40 bg-foreground/10 text-foreground" : "border-border bg-card/50 text-muted-foreground hover:text-foreground"}`}
    >
      {children}
    </button>
  );
}

function LeadCard({ lead, selected, onToggle }: { lead: Lead; selected: boolean; onToggle: () => void }) {
  return (
    <div className={`relative rounded-xl border bg-card/40 p-4 transition ${selected ? "border-foreground/40 bg-foreground/5" : "border-border hover:bg-card/60"}`}>
      <input type="checkbox" checked={selected} onChange={onToggle} className="absolute right-3 top-3 h-3.5 w-3.5 accent-foreground" />
      <Link to="/dashboard/leads/$leadId" params={{ leadId: lead.id }} className="flex items-start gap-3">
        <Avatar name={lead.name} className="h-10 w-10" />
        <div className="min-w-0 flex-1">
          <div className="truncate font-medium hover:underline">{lead.name}</div>
          <div className="truncate text-xs text-muted-foreground">{lead.role} · {lead.company}</div>
        </div>
      </Link>
      <div className="mt-4 flex items-center justify-between text-xs">
        <Badge tone={lead.status as LeadStatus}>{lead.status}</Badge>
        <span className="inline-flex items-center gap-1.5 text-muted-foreground">{sourceIcon(lead.source)}<span className="capitalize">{lead.source}</span></span>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-card">
          <div className={`h-full ${lead.score > 75 ? "bg-emerald-500" : lead.score > 50 ? "bg-amber-500" : "bg-sky-500"}`} style={{ width: `${lead.score}%` }} />
        </div>
        <span className="font-mono text-xs">{lead.score}</span>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-[11px] text-muted-foreground">
        <span>{lead.stage} · {lead.owner}</span>
        <Mono>{lead.updated}</Mono>
      </div>
    </div>
  );
}

function Pagination({ page, total, totalPages, onPage }: { page: number; total: number; totalPages: number; onPage: (p: number) => void }) {
  const start = (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(page * PAGE_SIZE, total);
  return (
    <div className="flex items-center justify-between border-t border-border px-4 py-3">
      <Mono className="text-muted-foreground">Showing {start}–{end} of {total}</Mono>
      <div className="flex items-center gap-1">
        <button onClick={() => onPage(Math.max(1, page - 1))} disabled={page === 1} className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-card disabled:opacity-30">
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button key={p} onClick={() => onPage(p)} className={`h-7 min-w-[28px] rounded-md px-2 text-xs ${p === page ? "bg-foreground/10 text-foreground" : "text-muted-foreground hover:bg-card"}`}>{p}</button>
        ))}
        <button onClick={() => onPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-card disabled:opacity-30">
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
