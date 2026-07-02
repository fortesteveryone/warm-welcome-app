import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Filter, Download, Plus, Search,
  ArrowUpDown, ArrowUp, ArrowDown, LayoutGrid, List, X, Trash2, Tag as TagIcon,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Star, Flame, Snowflake,
  MessageSquare, FileText, ArrowRight, Eye, Lock, Heart, Repeat2,
} from "lucide-react";

import { PageHeader, Panel, Mono } from "@/components/dashboard/dash-ui";
import { FormDialog, Field, fieldCls, textareaCls, gridCls } from "@/components/dashboard/form-dialog";
import { SocialTile, countryFlag, platformVisual } from "@/lib/lead-visuals";
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
const PAGE_SIZE_OPTIONS = [8, 16, 32, 50, 100] as const;
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

/* ─────────────── lead card — real social-post vibe ─────────────── */

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
  const v = platformVisual(lead.platform);
  const initials = lead.name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  const handle = lead.authorHandle || ("@" + lead.name.toLowerCase().replace(/[^a-z0-9]+/g, ""));

  const tempBadge =
    lead.status === "hot"  ? { cls: "bg-rose-500/10 text-rose-600 ring-rose-500/25",     icon: <Flame className="h-3 w-3" />, label: "Hot" } :
    lead.status === "warm" ? { cls: "bg-amber-500/10 text-amber-700 ring-amber-500/25", icon: <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />, label: "Warm" } :
                              { cls: "bg-sky-500/10 text-sky-700 ring-sky-500/25",       icon: <Snowflake className="h-3 w-3" />, label: "Cold" };

  const excerpt = lead.postExcerpt || lead.headline;

  return (
    <article
      className={[
        "group relative isolate flex flex-col overflow-hidden rounded-2xl border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.4)] transition",
        isOpened
          ? "border-border/70 opacity-90 hover:opacity-100"
          : "border-border hover:border-foreground/25 hover:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.15)]",
        selected ? "ring-2 ring-[color:var(--signal)]/60" : "",
      ].join(" ")}
    >
      {/* select checkbox — top-right, appears on hover */}
      <input
        type="checkbox"
        checked={selected}
        onChange={onToggleSelect}
        className="absolute right-3 top-3 z-10 h-3.5 w-3.5 accent-[color:var(--signal)] opacity-0 transition group-hover:opacity-100"
        aria-label="Select lead"
      />

      {/* ── Post header: avatar + name/handle · time + platform tile ── */}
      <header className="flex items-start gap-3 px-4 pt-4">
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-[13px] font-semibold text-white ring-2 ring-white"
          style={{ background: `linear-gradient(135deg, ${v.brand}, color-mix(in oklab, ${v.brand} 60%, #111))` }}
          aria-hidden
        >
          {initials}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-sm font-semibold text-foreground">{lead.name}</span>
            {lead.favourite && <Star className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400" />}
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 text-[12px] text-muted-foreground">
            <span className="truncate">{handle}</span>
            <span>·</span>
            <span className="whitespace-nowrap">{lead.postedAt}</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <span className="text-sm leading-none">{countryFlag(lead.country)}</span>
              <span className="truncate">{lead.country}</span>
            </span>
          </div>
        </div>
        <SocialTile platform={lead.platform} size={28} className="shrink-0" />
      </header>

      {/* NEW pulse strip, only for unopened */}
      {!isOpened && (
        <div className="mt-2 flex items-center gap-1.5 px-4 text-[10px] font-semibold tracking-wide text-[color:var(--signal)]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--signal)] opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--signal)]" />
          </span>
          NEW LEAD
        </div>
      )}

      {/* ── Post body ── */}
      <div className="px-4 pb-3 pt-2">
        <p className={`${compact ? "text-[13.5px]" : "text-[14.5px]"} leading-relaxed text-foreground line-clamp-4 whitespace-pre-line`}>
          {excerpt}
        </p>
      </div>

      {/* chips row */}
      <div className="flex flex-wrap items-center gap-1.5 px-4 pb-3">
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ${tempBadge.cls}`}>
          {tempBadge.icon} {tempBadge.label}
        </span>
        <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          #{lead.category.replace(/\s+/g, "")}
        </span>
        <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          {lead.intent} intent
        </span>
      </div>

      {/* ── Engagement row — real social vibe ── */}
      <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-[12px] text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <Heart className="h-3.5 w-3.5" /> {lead.reactions ?? 0}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MessageSquare className="h-3.5 w-3.5" /> {lead.comments}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Repeat2 className="h-3.5 w-3.5" /> {lead.shares ?? 0}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5" /> {lead.drafts}
          </span>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--signal)]/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-[color:var(--signal)]">
          {lead.score}
        </span>
      </div>

      {/* ── Footer action row ── */}
      <div className="flex items-center justify-between gap-2 border-t border-border bg-muted/30 px-4 py-2.5">
        {isOpened ? (
          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
            <Lock className="h-3 w-3" /> Opened
          </span>
        ) : (
          <span className="text-[11px] text-muted-foreground">1 credit to open</span>
        )}
        <Link
          to="/dashboard/leads/$leadId"
          params={{ leadId: lead.id }}
          onClick={onOpen}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold transition ${
            isOpened
              ? "border border-border bg-white text-foreground hover:bg-muted"
              : "bg-[color:var(--signal)] text-white shadow-[0_6px_20px_-8px_color-mix(in_oklab,var(--signal)_60%,transparent)] hover:brightness-110"
          }`}
        >
          {isOpened ? "View details" : "Open post"} <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </article>
  );
}

/* ─────────────────────────── small UI bits ─────────────────────────── */

function StatTile({ label, value, hint, tone }: { label: string; value: number | string; hint?: string; tone: "opened" | "unopened" | "muted" }) {
  const accent =
    tone === "opened"   ? "text-muted-foreground" :
    tone === "unopened" ? "text-foreground" :
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
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs transition ${active ? "border-foreground/40 bg-foreground/10 text-foreground" : "border-border bg-card/50 text-muted-foreground hover:text-foreground"}`}
    >
      {children}
    </button>
  );
}

function AllChip({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold transition ${active ? "border-foreground/40 bg-foreground/10 text-foreground" : "border-border bg-card/50 text-muted-foreground hover:text-foreground"}`}
    >
      All
    </button>
  );
}

function IntentDot({ level }: { level: LeadIntent }) {
  const color = level === "High" ? "bg-emerald-400" : level === "Medium" ? "bg-amber-400" : "bg-sky-400";
  return <span className={`h-2 w-2 rounded-md ${color}`} />;
}

function QualDot({ value }: { value: LeadQualification }) {
  const color = value === "qualified" ? "bg-emerald-400" : value === "disqualified" ? "bg-rose-400" : "bg-muted-foreground/60";
  return <span className={`h-2 w-2 rounded-md ${color}`} />;
}

function PlatformIcon({ p }: { p: LeadPlatform }) {
  const v = platformVisual(p);
  return <v.Icon className={`h-3.5 w-3.5 ${v.color}`} />;
}

function getPageWindow(page: number, totalPages: number): (number | "…")[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  const out: (number | "…")[] = [1];
  const left = Math.max(2, page - 1);
  const right = Math.min(totalPages - 1, page + 1);
  if (left > 2) out.push("…");
  for (let i = left; i <= right; i++) out.push(i);
  if (right < totalPages - 1) out.push("…");
  out.push(totalPages);
  return out;
}

function Pagination({
  page, total, totalPages, pageSize, onPage, onPageSize,
}: {
  page: number;
  total: number;
  totalPages: number;
  pageSize: number;
  onPage: (p: number) => void;
  onPageSize: (n: number) => void;
}) {
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  const [jump, setJump] = useState("");
  const submitJump = (e: React.FormEvent) => {
    e.preventDefault();
    const n = Number(jump);
    if (Number.isFinite(n) && n >= 1 && n <= totalPages) onPage(Math.floor(n));
    setJump("");
  };
  const win = getPageWindow(page, totalPages);
  const atStart = page <= 1;
  const atEnd = page >= totalPages;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3">
      {/* Left: range + page size */}
      <div className="flex items-center gap-3">
        <Mono className="text-muted-foreground">Showing {start}–{end} of {total}</Mono>
        <label className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <span className="hidden sm:inline">Rows</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSize(Number(e.target.value))}
            className="h-7 rounded-md border border-border bg-card/50 px-1.5 text-xs text-foreground focus:border-foreground/40 focus:outline-none"
          >
            {PAGE_SIZE_OPTIONS.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Center: page buttons */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPage(1)} disabled={atStart}
          className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-card disabled:opacity-30"
          aria-label="First page" title="First page"
        >
          <ChevronsLeft className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => onPage(Math.max(1, page - 1))} disabled={atStart}
          className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-card disabled:opacity-30"
          aria-label="Previous page" title="Previous page"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
        {win.map((p, i) =>
          p === "…" ? (
            <span key={`e${i}`} className="px-1 text-xs text-muted-foreground">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onPage(p)}
              aria-current={p === page ? "page" : undefined}
              className={`h-7 min-w-[28px] rounded-md px-2 text-xs ${
                p === page ? "bg-foreground text-background font-semibold" : "text-muted-foreground hover:bg-card"
              }`}
            >
              {p}
            </button>
          ),
        )}
        <button
          onClick={() => onPage(Math.min(totalPages, page + 1))} disabled={atEnd}
          className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-card disabled:opacity-30"
          aria-label="Next page" title="Next page"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => onPage(totalPages)} disabled={atEnd}
          className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-card disabled:opacity-30"
          aria-label="Last page" title="Last page"
        >
          <ChevronsRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Right: jump-to-page */}
      <form onSubmit={submitJump} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <span className="hidden sm:inline">Go to</span>
        <input
          type="number" min={1} max={totalPages}
          value={jump}
          onChange={(e) => setJump(e.target.value)}
          placeholder={String(page)}
          className="h-7 w-14 rounded-md border border-border bg-card/50 px-2 text-xs text-foreground focus:border-foreground/40 focus:outline-none"
        />
        <span>/ {totalPages}</span>
        <button
          type="submit"
          className="ml-1 inline-flex h-7 items-center rounded-md border border-border bg-card/50 px-2 text-xs text-foreground hover:bg-card"
        >
          Go
        </button>
      </form>
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
          category: "Website Design",
          intent: "Medium",
          platform: ((d.get("source") as string) || "instagram") as Lead["platform"],
          qualification: "unreviewed",
          favourite: false,
          headline,
          topic,
          comments: 0,
          drafts: 0,
          postedAt: `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()} | ${pad(now.getHours())}:${pad(now.getMinutes())}`,
          postExcerpt: String(d.get("about") || headline),
          postUrl: "",
          authorHandle: "@" + String(d.get("name") || "new").toLowerCase().replace(/[^a-z0-9]+/g, "."),
          urgency: "This week",
          reactions: 0,
          shares: 0,
          replyAngles: [],
          flag: "🌐",
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
