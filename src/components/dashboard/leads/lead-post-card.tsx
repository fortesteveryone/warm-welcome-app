import { Link } from "@tanstack/react-router";
import {
  ArrowRight, Star, Flame, Snowflake, MessageSquare, FileText, Eye, Lock, Heart, Repeat2,
} from "lucide-react";
import { SocialTile, countryFlag, platformVisual } from "@/lib/lead-visuals";
import type { Lead } from "@/lib/leads-data";

export function LeadPostCard({
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
          ? "border-border/60 bg-muted/40 saturate-[0.85]"
          : "border-border hover:border-foreground/25 hover:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.15)]",
        selected ? "ring-2 ring-[color:var(--signal)]/60" : "",
      ].join(" ")}
    >
      {isOpened && (
        <div className="pointer-events-none absolute -left-9 top-3 z-10 -rotate-45 select-none bg-muted-foreground/25 px-10 py-0.5 text-[9px] font-bold uppercase tracking-widest text-foreground/70 backdrop-blur">
          Visited
        </div>
      )}

      <input
        type="checkbox"
        checked={selected}
        onChange={onToggleSelect}
        className="absolute right-3 top-3 z-10 h-3.5 w-3.5 accent-[color:var(--signal)] opacity-0 transition group-hover:opacity-100"
        aria-label="Select lead"
      />

      <header className="flex items-start gap-3 px-4 pt-4">
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-[13px] font-semibold text-white ring-2 ring-background"
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

      {!isOpened && (
        <div className="mt-2 flex items-center gap-1.5 px-4 text-[10px] font-semibold tracking-wide text-[color:var(--signal)]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--signal)] opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--signal)]" />
          </span>
          NEW LEAD
        </div>
      )}

      <div className="px-4 pb-3 pt-2">
        <p className={`${compact ? "text-[13.5px]" : "text-[14.5px]"} leading-relaxed text-foreground line-clamp-4 whitespace-pre-line`}>
          {excerpt}
        </p>
      </div>

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
              ? "border border-border bg-background text-foreground hover:bg-muted"
              : "bg-[color:var(--signal)] text-black shadow-[0_6px_20px_-8px_color-mix(in_oklab,var(--signal)_60%,transparent)] hover:brightness-110"
          }`}
        >
          {isOpened ? "View details" : "Open post"} <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      {/* Eye kept as import placeholder for future use */}
      <Eye className="hidden" />
    </article>
  );
}
