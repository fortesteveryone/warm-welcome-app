import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Filter, Download, Plus, Search,
  ArrowUpDown, ArrowUp, ArrowDown, LayoutGrid, List, X, Trash2, Tag as TagIcon,
  ChevronLeft, ChevronRight, Star, Flame, Snowflake,
  MessageSquare, FileText, ArrowRight, Eye, Lock,
} from "lucide-react";
import { PageHeader, Panel, Mono } from "@/components/dashboard/dash-ui";
import { FormDialog, Field, fieldCls, textareaCls, gridCls } from "@/components/dashboard/form-dialog";
import { SocialTile, SocialPill, CountryBadge, countryFlag, platformVisual } from "@/lib/lead-visuals";
import {
  LEADS, LEAD_OWNERS, LEAD_SOURCES, LEAD_STAGES, LEAD_CATEGORIES, LEAD_INTENTS,
  LEAD_PLATFORMS, LEAD_COUNTRIES, LEAD_QUALIFICATIONS,
  type Lead, type LeadSource, type LeadStatus, type LeadIntent, type LeadPlatform,
  type LeadCategory, type LeadQualification,
} from "@/lib/leads-data";

export const Route = createFileRoute("/dashboard/leads/")({
  component: LeadsPage,
});

type SortKey = "name" | "score" | "stage" | "owner" | "updated";
type SortDir = "asc" | "desc";

const STATUS_TABS = ["All", "Hot", "Warm", "Cold"] as const;
const PAGE_SIZE = 8;
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

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

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
          className={`group flex items-center justify-between rounded-xl border px-4 py-3 text-left transition ${unopenedOnly ? "border-emerald-500/40 bg-emerald-500/10" : "border-border bg-card/40 hover:bg-card/60"}`}
        >
          <div>
            <Mono className="text-muted-foreground">Quick filter</Mono>
            <div className="mt-1 text-sm font-medium">{unopenedOnly ? "Showing only unopened" : "Show only unopened"}</div>
          </div>
          <span className={`grid h-8 w-8 place-items-center rounded-full border ${unopenedOnly ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-300" : "border-border bg-background/40 text-muted-foreground"}`}>
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
          {activeFilterCount > 0 && <span className="rounded-full bg-foreground px-1.5 text-[10px] font-semibold text-background">{activeFilterCount}</span>}
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
                <span className="h-2 w-2 rounded-full bg-amber-400" /> Warm
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
          <Panel><Pagination page={safePage} total={filtered.length} totalPages={totalPages} onPage={setPage} /></Panel>
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

/* ─────────────────────────── post-style lead card ─────────────────────────── */

function LeadPostCard({
  lead, isOpened, selected, onToggleSelect, onOpen, compact = false,
}: {
  lead: Lead;
  isOpened: boolean;
  selected: boolean;
  onToggleSelect: () => void;
  onOpen: () => void;
  compact?: boolean;
}) {
  const tone =
    lead.status === "hot"  ? { label: "Hot",  cls: "border-rose-500/40 bg-rose-500/10 text-rose-200",   icon: <Flame className="h-3 w-3" /> } :
    lead.status === "warm" ? { label: "Warm", cls: "border-amber-500/40 bg-amber-500/10 text-amber-200", icon: <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> } :
                              { label: "Cold", cls: "border-sky-500/40 bg-sky-500/10 text-sky-200",       icon: <Snowflake className="h-3 w-3" /> };

  const intentTone =
    lead.intent === "High"   ? "text-emerald-300" :
    lead.intent === "Medium" ? "text-amber-300" :
                               "text-sky-300";
  const intentDot =
    lead.intent === "High"   ? "bg-emerald-400" :
    lead.intent === "Medium" ? "bg-amber-400" :
                               "bg-sky-400";

  return (
    <article
      className={[
        "group relative flex flex-col rounded-xl border p-4 transition",
        isOpened
          ? "border-border bg-card/30 opacity-80 hover:opacity-100"
          : "border-emerald-500/20 bg-card/60 hover:border-emerald-500/40 hover:bg-card",
        selected ? "ring-1 ring-foreground/40" : "",
      ].join(" ")}
    >
      {/* select checkbox */}
      <input
        type="checkbox"
        checked={selected}
        onChange={onToggleSelect}
        className="absolute left-3 top-3 h-3.5 w-3.5 accent-foreground opacity-0 transition group-hover:opacity-100"
        aria-label="Select lead"
      />

      {/* top row */}
      <div className="flex items-start justify-between gap-2 pl-5">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {!isOpened ? (
            <span className="relative flex h-2 w-2" aria-label="Unopened">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
          ) : (
            <Lock className="h-3 w-3 text-muted-foreground" aria-label="Opened" />
          )}
          <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] ${tone.cls}`}>
            {tone.icon} {tone.label}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background/60 px-2 py-0.5 text-[11px] text-muted-foreground">
            <PlatformIcon p={lead.platform} /> <span className="capitalize">{lead.platform}</span>
          </span>
          {!compact && (
            <>
              <span className="text-[11px] text-muted-foreground">{lead.country}</span>
              <span className="text-[11px] text-muted-foreground">·</span>
              <span className="text-[11px] text-muted-foreground">{lead.category}</span>
            </>
          )}
        </div>
        <Star className={`h-4 w-4 shrink-0 ${lead.favourite ? "fill-amber-400 text-amber-400" : "text-muted-foreground/60"}`} />
      </div>

      {/* headline */}
      <p className={`mt-3 pl-5 ${compact ? "text-sm" : "text-[15px]"} ${isOpened ? "font-normal text-muted-foreground" : "font-semibold text-foreground"} leading-snug line-clamp-3`}>
        {lead.headline}
      </p>

      {/* topic pill */}
      <div className="mt-3 pl-5">
        <span className="inline-flex max-w-full items-center truncate rounded-md bg-background/60 px-2.5 py-1 text-xs text-foreground/80 ring-1 ring-border">
          {lead.topic.length > 38 ? lead.topic.slice(0, 36) + "…" : lead.topic}
        </span>
      </div>

      {/* meta row */}
      <div className="mt-3 flex items-center gap-3 pl-5 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {lead.comments}</span>
        <span className="inline-flex items-center gap-1"><FileText className="h-3 w-3" /> {lead.drafts} drafts</span>
        <span className={`inline-flex items-center gap-1 ${intentTone}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${intentDot}`} /> {lead.intent.toLowerCase()} intent
        </span>
        <span className="ml-auto font-mono">{lead.postedAt}</span>
      </div>

      {/* footer / CTA */}
      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 pl-5">
        <span className={`text-xs font-medium ${isOpened ? "text-muted-foreground" : "text-emerald-300"}`}>
          {isOpened ? "Opened" : "New · 1 credit"}
        </span>
        <Link
          to="/dashboard/leads/$leadId"
          params={{ leadId: lead.id }}
          onClick={onOpen}
          className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:underline"
        >
          {isOpened ? "View details" : "Open lead"} <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </article>
  );
}

/* ─────────────────────────── small UI bits ─────────────────────────── */

function StatTile({ label, value, hint, tone }: { label: string; value: number | string; hint?: string; tone: "opened" | "unopened" | "muted" }) {
  const accent =
    tone === "opened"   ? "text-muted-foreground" :
    tone === "unopened" ? "text-emerald-300" :
                          "text-foreground";
  return (
    <div className="rounded-xl border border-border bg-card/40 px-4 py-3">
      <Mono className="text-muted-foreground">{label}</Mono>
      <div className={`mt-1 text-xl font-semibold ${accent}`}>{value}</div>
      {hint && <div className="mt-0.5 text-[11px] text-muted-foreground">{hint}</div>}
    </div>
  );
}

function SortMenu({ sortKey, sortDir, onSort }: { sortKey: SortKey; sortDir: SortDir; onSort: (k: SortKey) => void }) {
  const opts: { k: SortKey; label: string }[] = [
    { k: "updated", label: "Recent" },
    { k: "score", label: "Score" },
    { k: "name", label: "Name" },
    { k: "stage", label: "Stage" },
    { k: "owner", label: "Owner" },
  ];
  return (
    <div className="flex items-center gap-1 rounded-md border border-border bg-card/50 p-0.5">
      {opts.map((o) => {
        const active = sortKey === o.k;
        return (
          <button
            key={o.k}
            onClick={() => onSort(o.k)}
            className={`inline-flex h-8 items-center gap-1 rounded px-2 text-xs transition ${active ? "bg-foreground/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {o.label}
            {active ? (sortDir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />) : <ArrowUpDown className="h-3 w-3 opacity-40" />}
          </button>
        );
      })}
    </div>
  );
}

function FilterGroup({ label, children, full = false }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={full ? "md:col-span-2 lg:col-span-3 xl:col-span-4" : ""}>
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

function AllChip({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold transition ${active ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300" : "border-border bg-card/50 text-muted-foreground hover:text-foreground"}`}
    >
      All
    </button>
  );
}

function IntentDot({ level }: { level: LeadIntent }) {
  const color = level === "High" ? "bg-emerald-400" : level === "Medium" ? "bg-amber-400" : "bg-sky-400";
  return <span className={`h-2 w-2 rounded-full ${color}`} />;
}

function QualDot({ value }: { value: LeadQualification }) {
  const color = value === "qualified" ? "bg-emerald-400" : value === "disqualified" ? "bg-rose-400" : "bg-muted-foreground/60";
  return <span className={`h-2 w-2 rounded-full ${color}`} />;
}

function PlatformIcon({ p }: { p: LeadPlatform }) {
  const v = platformVisual(p);
  return <v.Icon className={`h-3.5 w-3.5 ${v.color}`} />;
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

/* ─────────────────────────── new lead dialog ─────────────────────────── */

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
        const company = String(d.get("company") || "");
        const headline = String(d.get("headline") || "").trim() ||
          `${name.split(" ")[0]} from ${company || "their company"} is looking for help with a new project — open to see details.`;
        const topic = String(d.get("topic") || "").trim() || "New inbound lead";
        const now = new Date();
        const pad = (n: number) => String(n).padStart(2, "0");
        const lead: Lead = {
          id: `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString(36)}`,
          name,
          company,
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
          createdAt: now.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
          category: "Digital marketing",
          intent: "Medium",
          platform: ((d.get("source") as string) || "instagram") as Lead["platform"],
          qualification: "unreviewed",
          favourite: false,
          headline,
          topic,
          comments: 0,
          drafts: 0,
          postedAt: `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()} | ${pad(now.getHours())}:${pad(now.getMinutes())}`,
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
        <Field label="Temperature">
          <select name="status" className={fieldCls} defaultValue="warm">
            <option value="hot">hot</option><option value="warm">warm</option><option value="cold">cold</option>
          </select>
        </Field>
        <Field label="Score (0–100)"><input name="score" type="number" min={0} max={100} defaultValue={60} className={fieldCls} /></Field>
        <Field label="Topic"><input name="topic" className={fieldCls} placeholder="e.g. Video editor for YouTube vlog" /></Field>
        <Field label="Email"><input name="email" type="email" className={fieldCls} placeholder="name@company.com" /></Field>
        <Field label="Phone"><input name="phone" className={fieldCls} placeholder="+1 555…" /></Field>
        <Field label="Country"><input name="country" className={fieldCls} placeholder="Country" /></Field>
        <Field label="Headline (what they're looking for)" span={2}><textarea name="headline" className={textareaCls} placeholder="Khansa Maroof is looking for a website developer to work on a portfolio website update and…" /></Field>
        <Field label="Tags (comma separated)" span={2}><input name="tags" className={fieldCls} placeholder="VIP, SaaS" /></Field>
        <Field label="About / notes" span={2}><textarea name="about" className={textareaCls} placeholder="Short context about this lead…" /></Field>
      </div>
    </FormDialog>
  );
}
