import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Filter, Download, Plus, Search,
  LayoutGrid, List, X, Trash2, Tag as TagIcon,
  Star, Flame, Snowflake, Eye,
} from "lucide-react";

import { PageHeader, Panel, Mono } from "@/components/dashboard/dash-ui";
import {
  LEADS, LEAD_OWNERS, LEAD_STAGES, LEAD_CATEGORIES, LEAD_INTENTS,
  LEAD_PLATFORMS, LEAD_COUNTRIES, LEAD_QUALIFICATIONS,
  type Lead, type LeadStatus, type LeadIntent, type LeadPlatform,
  type LeadCategory, type LeadQualification,
} from "@/lib/leads-data";
import { LeadPostCard } from "@/components/dashboard/leads/lead-post-card";
import {
  StatTile, SortMenu, FilterGroup, Chip, AllChip, IntentDot, QualDot, PlatformIcon, Pagination,
  type SortKey, type SortDir,
} from "@/components/dashboard/leads/leads-toolbar";
import { NewLeadDialog } from "@/components/dashboard/leads/new-lead-dialog";

export const Route = createFileRoute("/dashboard/leads/")({
  component: LeadsPage,
});

const STATUS_TABS = ["All", "Hot", "Warm", "Cold"] as const;
const OPENED_KEY = "leads:opened";
const CREDIT_COST = 1;
const CREDITS_PER_USD = 50; // $10 → 500 opens

function loadOpened(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try { return new Set(JSON.parse(localStorage.getItem(OPENED_KEY) || "[]")); }
  catch { return new Set(); }
}

function LeadsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof STATUS_TABS)[number]>("All");
  const [view, setView] = useState<"feed" | "grid">("feed");
  const [showFilters, setShowFilters] = useState(false);
  const [favOnly, setFavOnly] = useState(false);
  const [unopenedOnly, setUnopenedOnly] = useState(false);
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
  const [pageSize, setPageSize] = useState<number>(8);

  const [leads, setLeads] = useState<Lead[]>(LEADS);
  const [addOpen, setAddOpen] = useState(false);

  const [opened, setOpened] = useState<Set<string>>(() => new Set());
  useEffect(() => { setOpened(loadOpened()); }, []);
  const persistOpened = (next: Set<string>) => {
    setOpened(next);
    try { localStorage.setItem(OPENED_KEY, JSON.stringify([...next])); } catch { /* noop */ }
  };
  const markOpened = (id: string) => {
    if (opened.has(id)) return;
    const next = new Set(opened);
    next.add(id);
    persistOpened(next);
  };

  const toggle = <T,>(arr: T[], v: T) => arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = leads.filter((l) => {
      if (favOnly && !l.favourite) return false;
      if (unopenedOnly && opened.has(l.id)) return false;
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
      if (q && !(l.headline.toLowerCase().includes(q) || l.topic.toLowerCase().includes(q) || l.name.toLowerCase().includes(q) || l.company.toLowerCase().includes(q) || l.role.toLowerCase().includes(q) || l.email.toLowerCase().includes(q))) return false;
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
  }, [leads, opened, query, status, favOnly, unopenedOnly, categories, temperatures, intents, country, platforms, qualifications, stages, owners, minScore, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const activeFilterCount =
    (favOnly ? 1 : 0) + (unopenedOnly ? 1 : 0) + categories.length + temperatures.length + intents.length +
    (country !== "All" ? 1 : 0) + platforms.length + qualifications.length +
    stages.length + owners.length + (minScore > 0 ? 1 : 0);
  const allOnPageSelected = paged.length > 0 && paged.every((l) => selected.has(l.id));

  const onSort = (k: SortKey) => {
    if (sortKey === k) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(k); setSortDir(k === "score" || k === "updated" ? "desc" : "asc"); }
  };

  const clearAll = () => {
    setFavOnly(false); setUnopenedOnly(false); setCategories([]); setTemperatures([]); setIntents([]);
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

  const openedCount = opened.size;
  const totalCount = leads.length;
  const unopenedCount = totalCount - openedCount;
  const usdSpent = (openedCount * CREDIT_COST / CREDITS_PER_USD).toFixed(2);

  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Leads"
        title="All leads"
        description="Each lead is a sourced post. Read the summary first — opening a lead uses 1 credit."
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

      {/* Credit / opened stats */}
      <div className="grid gap-3 sm:grid-cols-4">
        <StatTile label="Opened" value={openedCount} hint={`$${usdSpent} spent`} tone="opened" />
        <StatTile label="Unopened" value={unopenedCount} hint={`${totalCount} total`} tone="unopened" />
        <StatTile label="Cost per open" value="1 credit" hint={`$10 ≈ ${10 * CREDITS_PER_USD} leads`} tone="muted" />
        <button
          onClick={() => { setUnopenedOnly((u) => !u); setPage(1); }}
          className={`group flex items-center justify-between rounded-xl border px-4 py-3 text-left transition ${unopenedOnly ? "border-foreground/30 bg-foreground/[0.07]" : "border-border bg-card/40 hover:bg-card/60"}`}
        >
          <div>
            <Mono className="text-muted-foreground">Quick filter</Mono>
            <div className="mt-1 text-sm font-medium">{unopenedOnly ? "Showing only unopened" : "Show only unopened"}</div>
          </div>
          <span className={`grid h-8 w-8 place-items-center rounded-md border ${unopenedOnly ? "border-foreground/40 bg-foreground/10 text-foreground" : "border-border bg-background/40 text-muted-foreground"}`}>
            <Eye className="h-4 w-4" />
          </span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[240px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder="Search headline, topic, name, company…"
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
        <SortMenu sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
        <button
          onClick={() => setShowFilters((s) => !s)}
          className={`inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-sm transition ${showFilters || activeFilterCount > 0 ? "border-foreground/40 bg-foreground/10" : "border-border bg-card/50 text-muted-foreground hover:text-foreground"}`}
        >
          <Filter className="h-3.5 w-3.5" /> Filters
          {activeFilterCount > 0 && <span className="rounded-md bg-foreground px-1.5 text-[10px] font-semibold text-background">{activeFilterCount}</span>}
        </button>
        <div className="flex items-center gap-1 rounded-md border border-border bg-card/50 p-0.5">
          <button onClick={() => setView("feed")} className={`grid h-8 w-8 place-items-center rounded ${view === "feed" ? "bg-foreground/10 text-foreground" : "text-muted-foreground"}`} aria-label="Feed view">
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
          <div className="grid gap-6 p-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <FilterGroup label="Saved">
              <Chip active={favOnly} onClick={() => { setFavOnly((f) => !f); setPage(1); }}>
                <Star className={`h-3.5 w-3.5 ${favOnly ? "fill-amber-400 text-amber-400" : ""}`} /> Favourites only
              </Chip>
              <Chip active={unopenedOnly} onClick={() => { setUnopenedOnly((f) => !f); setPage(1); }}>
                <Eye className="h-3.5 w-3.5" /> Unopened only
              </Chip>
            </FilterGroup>

            <FilterGroup label="Category">
              <AllChip active={categories.length === 0} onClick={() => { setCategories([]); setPage(1); }} />
              {LEAD_CATEGORIES.map((c) => (
                <Chip key={c} active={categories.includes(c)} onClick={() => { setCategories(toggle(categories, c)); setPage(1); }}>{c}</Chip>
              ))}
            </FilterGroup>

            <FilterGroup label="Temperature">
              <AllChip active={temperatures.length === 0} onClick={() => { setTemperatures([]); setPage(1); }} />
              <Chip active={temperatures.includes("hot")} onClick={() => { setTemperatures(toggle(temperatures, "hot" as LeadStatus)); setPage(1); }}>
                <Flame className="h-3.5 w-3.5 text-rose-400" /> Hot
              </Chip>
              <Chip active={temperatures.includes("warm")} onClick={() => { setTemperatures(toggle(temperatures, "warm" as LeadStatus)); setPage(1); }}>
                <span className="h-2 w-2 rounded-md bg-amber-400" /> Warm
              </Chip>
              <Chip active={temperatures.includes("cold")} onClick={() => { setTemperatures(toggle(temperatures, "cold" as LeadStatus)); setPage(1); }}>
                <Snowflake className="h-3.5 w-3.5 text-sky-400" /> Cold
              </Chip>
            </FilterGroup>

            <FilterGroup label="Intent level">
              <AllChip active={intents.length === 0} onClick={() => { setIntents([]); setPage(1); }} />
              {LEAD_INTENTS.map((i) => (
                <Chip key={i} active={intents.includes(i)} onClick={() => { setIntents(toggle(intents, i)); setPage(1); }}>
                  <IntentDot level={i} /> {i}
                </Chip>
              ))}
            </FilterGroup>

            <FilterGroup label="Country">
              <select
                value={country}
                onChange={(e) => { setCountry(e.target.value); setPage(1); }}
                className="h-9 w-full rounded-md border border-border bg-background/60 px-3 text-sm focus:border-foreground/40 focus:outline-none"
              >
                {LEAD_COUNTRIES.map((c) => (<option key={c} value={c}>{c}</option>))}
              </select>
            </FilterGroup>

            <FilterGroup label="Status">
              <AllChip active={qualifications.length === 0} onClick={() => { setQualifications([]); setPage(1); }} />
              {LEAD_QUALIFICATIONS.map((q) => (
                <Chip key={q} active={qualifications.includes(q)} onClick={() => { setQualifications(toggle(qualifications, q)); setPage(1); }}>
                  <QualDot value={q} /> <span className="capitalize">{q}</span>
                </Chip>
              ))}
            </FilterGroup>

            <FilterGroup label="Stage">
              <AllChip active={stages.length === 0} onClick={() => { setStages([]); setPage(1); }} />
              {LEAD_STAGES.map((s) => (
                <Chip key={s} active={stages.includes(s)} onClick={() => { setStages(toggle(stages, s)); setPage(1); }}>{s}</Chip>
              ))}
            </FilterGroup>

            <FilterGroup label="Owner">
              <AllChip active={owners.length === 0} onClick={() => { setOwners([]); setPage(1); }} />
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
              <div className="mt-1 flex w-full justify-between text-[10px] text-muted-foreground"><span>0</span><span>50</span><span>100</span></div>
            </FilterGroup>

            <FilterGroup label="Platform" full>
              <AllChip active={platforms.length === 0} onClick={() => { setPlatforms([]); setPage(1); }} />
              {LEAD_PLATFORMS.map((p) => (
                <Chip key={p} active={platforms.includes(p)} onClick={() => { setPlatforms(toggle(platforms, p)); setPage(1); }}>
                  <PlatformIcon p={p} /> <span className="capitalize">{p}</span>
                </Chip>
              ))}
            </FilterGroup>
          </div>
          <div className="flex items-center justify-between border-t border-border px-5 py-3">
            <Mono className="text-muted-foreground">{filtered.length} of {leads.length} leads match · {activeFilterCount} filter{activeFilterCount === 1 ? "" : "s"} active</Mono>
            <button onClick={clearAll} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              <X className="h-3 w-3" /> Clear all
            </button>
          </div>
        </Panel>
      )}

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div className="flex items-center justify-between rounded-md border border-foreground/30 bg-foreground/5 px-4 py-2 text-sm">
          <span><span className="font-semibold">{selected.size}</span> selected · {paged.length > 0 && (
            <button onClick={toggleSelectAll} className="text-xs text-muted-foreground underline hover:text-foreground">
              {allOnPageSelected ? "deselect page" : "select page"}
            </button>
          )}</span>
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
      ) : view === "feed" ? (
        <>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {paged.map((l) => (
              <LeadPostCard
                key={l.id}
                lead={l}
                isOpened={opened.has(l.id)}
                selected={selected.has(l.id)}
                onToggleSelect={() => toggleOne(l.id)}
                onOpen={() => markOpened(l.id)}
              />
            ))}
          </div>
          <Panel><Pagination page={safePage} total={filtered.length} totalPages={totalPages} pageSize={pageSize} onPage={setPage} onPageSize={(n) => { setPageSize(n); setPage(1); }} /></Panel>
        </>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paged.map((l) => (
              <LeadPostCard
                key={l.id}
                lead={l}
                isOpened={opened.has(l.id)}
                selected={selected.has(l.id)}
                onToggleSelect={() => toggleOne(l.id)}
                onOpen={() => markOpened(l.id)}
                compact
              />
            ))}
          </div>
          <Panel><Pagination page={safePage} total={filtered.length} totalPages={totalPages} pageSize={pageSize} onPage={setPage} onPageSize={(n) => { setPageSize(n); setPage(1); }} /></Panel>
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
