import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Star, Search, ArrowRight, Heart, MessageSquare, Repeat2 } from "lucide-react";
import { PageHeader, Panel, Mono } from "@/components/dashboard/dash-ui";
import { SocialTile, countryFlag } from "@/lib/lead-visuals";
import { LEADS } from "@/lib/leads-data";

export const Route = createFileRoute("/dashboard/favourites")({
  head: () => ({ meta: [{ title: "Favourites — Postly CRM" }] }),
  component: FavouritesPage,
});

function FavouritesPage() {
  const [query, setQuery] = useState("");
  const favs = useMemo(
    () => LEADS.filter((l) => l.favourite).filter((l) =>
      !query ? true : (l.name + l.company + l.headline + l.postExcerpt).toLowerCase().includes(query.toLowerCase())
    ),
    [query]
  );

  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Favourites"
        title="Favourites Leads"
        description="The posts you starred for follow-up. Star toggles from any lead card or detail page."
        actions={
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search favourites…"
              className="h-9 w-64 rounded-md border border-border bg-card/60 pl-9 pr-3 text-sm focus:border-[color:var(--signal)]/40 focus:outline-none"
            />
          </div>
        }
      />

      {favs.length === 0 ? (
        <Panel>
          <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-card ring-1 ring-border">
              <Star className="h-5 w-5 text-muted-foreground" />
            </span>
            <div>
              <h2 className="text-base font-semibold">No favourites yet</h2>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Star any lead to save it here for quick access.
              </p>
            </div>
            <Link
              to="/dashboard/leads"
              className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-[color:var(--signal)] px-3 py-1.5 text-sm font-medium text-black hover:brightness-110"
            >
              Browse leads <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Panel>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {favs.map((l) => (
            <article key={l.id} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
              <header className="flex items-start gap-3 px-4 pt-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[color:var(--signal)]/40 to-emerald-800/40 text-[12px] font-semibold text-white ring-1 ring-border">
                  {l.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-sm font-semibold">{l.name}</span>
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  </div>
                  <div className="mt-0.5 flex items-center gap-1.5 text-[12px] text-muted-foreground">
                    <span>{countryFlag(l.country)}</span>
                    <span className="truncate">{l.country}</span>
                    <span>·</span>
                    <span className="truncate">{l.postedAt}</span>
                  </div>
                </div>
                <SocialTile platform={l.platform} size={26} />
              </header>
              <p className="line-clamp-3 px-4 pb-3 pt-2 text-[13.5px] leading-relaxed text-foreground">
                {l.postExcerpt || l.headline}
              </p>
              <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-[12px] text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1"><Heart className="h-3 w-3" /> {l.reactions ?? 0}</span>
                  <span className="inline-flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {l.comments}</span>
                  <span className="inline-flex items-center gap-1"><Repeat2 className="h-3 w-3" /> {l.shares ?? 0}</span>
                </div>
                <Link
                  to="/dashboard/leads/$leadId"
                  params={{ leadId: l.id }}
                  className="inline-flex items-center gap-1 rounded-md bg-[color:var(--signal)] px-2.5 py-1 text-[11px] font-medium text-black hover:brightness-110"
                >
                  Open <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
      <Mono className="block text-muted-foreground">{favs.length} favourite{favs.length === 1 ? "" : "s"}</Mono>
    </div>
  );
}
