import { useState } from "react";
import {
  ArrowUp, ArrowDown, ArrowUpDown,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
} from "lucide-react";
import { Mono } from "@/components/dashboard/dash-ui";
import { platformVisual } from "@/lib/lead-visuals";
import type { LeadIntent, LeadPlatform, LeadQualification } from "@/lib/leads-data";

export type SortKey = "name" | "score" | "stage" | "owner" | "updated";
export type SortDir = "asc" | "desc";

export const PAGE_SIZE_OPTIONS = [8, 16, 32, 50, 100] as const;

export function StatTile({ label, value, hint, tone }: {
  label: string; value: number | string; hint?: string; tone: "opened" | "unopened" | "muted";
}) {
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

export function SortMenu({ sortKey, sortDir, onSort }: {
  sortKey: SortKey; sortDir: SortDir; onSort: (k: SortKey) => void;
}) {
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

export function FilterGroup({ label, children, full = false }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={full ? "md:col-span-2 lg:col-span-3 xl:col-span-4" : ""}>
      <Mono className="text-muted-foreground">{label}</Mono>
      <div className="mt-2 flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

export function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs transition ${active ? "border-foreground/40 bg-foreground/10 text-foreground" : "border-border bg-card/50 text-muted-foreground hover:text-foreground"}`}
    >
      {children}
    </button>
  );
}

export function AllChip({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold transition ${active ? "border-foreground/40 bg-foreground/10 text-foreground" : "border-border bg-card/50 text-muted-foreground hover:text-foreground"}`}
    >
      All
    </button>
  );
}

export function IntentDot({ level }: { level: LeadIntent }) {
  const color = level === "High" ? "bg-emerald-400" : level === "Medium" ? "bg-amber-400" : "bg-sky-400";
  return <span className={`h-2 w-2 rounded-md ${color}`} />;
}

export function QualDot({ value }: { value: LeadQualification }) {
  const color = value === "qualified" ? "bg-emerald-400" : value === "disqualified" ? "bg-rose-400" : "bg-muted-foreground/60";
  return <span className={`h-2 w-2 rounded-md ${color}`} />;
}

export function PlatformIcon({ p }: { p: LeadPlatform }) {
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

export function Pagination({
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
