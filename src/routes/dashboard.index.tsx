import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Inbox, Bell, Eye, ArrowRight, Star, Flame } from "lucide-react";
import { PageHeader, Panel, Mono } from "@/components/dashboard/dash-ui";
import { LEADS } from "@/lib/leads-data";
import { SocialTile, countryFlag, platformVisual } from "@/lib/lead-visuals";

export const Route = createFileRoute("/dashboard/")({
  component: Overview,
});

const DAILY_VIEW_LIMIT = 150;
const USER_FIRST_NAME = "Abdullah";

function greet() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function Overview() {
  const todaysViews = 34;
  const remaining = DAILY_VIEW_LIMIT - todaysViews;
  const pct = Math.min(100, Math.round((todaysViews / DAILY_VIEW_LIMIT) * 100));

  // Platform distribution — real data from generated leads
  const byPlatform = useMemo(() => {
    const map = new Map<string, number>();
    for (const l of LEADS) map.set(l.platform, (map.get(l.platform) ?? 0) + 1);
    return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, []);

  const byCountry = useMemo(() => {
    const map = new Map<string, number>();
    for (const l of LEADS) map.set(l.country, (map.get(l.country) ?? 0) + 1);
    return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, []);

  const maxCountry = Math.max(...byCountry.map(([, n]) => n), 1);

  return (
    <div className="space-y-8">
      <PageHeader
        kicker="Overview"
        title={`${greet()}, ${USER_FIRST_NAME}.`}
        description="Browse, save favourites and act on today's fresh website-service leads."
      />

      {/* Two-card intro row */}
      <div className="grid gap-4 lg:grid-cols-2">
        <IntroCard
          icon={<Inbox className="h-4 w-4 text-[color:var(--signal)]" />}
          title="Manage Leads"
          body="You have full outreach data access. Open any lead to see the original post, contact channel and outreach drafts — 1 credit per open."
          cta={{ to: "/dashboard/leads", label: "Browse all leads" }}
        />
        <IntroCard
          icon={<Bell className="h-4 w-4 text-[color:var(--signal)]" />}
          title="Notifications on"
          body="You'll be notified when fresh, high-scoring leads matching your filters land in your feed."
          cta={{ to: "/dashboard/notifications", label: "See notifications" }}
        />
      </div>

      {/* Today's lead views */}
      <Panel>
        <div className="grid gap-6 p-5 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <Mono className="text-muted-foreground">Today's lead views</Mono>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-semibold tracking-tight">{todaysViews}</span>
              <span className="text-sm text-muted-foreground">of {DAILY_VIEW_LIMIT} · resets at midnight</span>
            </div>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-card">
              <div
                className="h-full rounded-full bg-[color:var(--signal)] shadow-[0_0_18px_-2px_var(--signal-glow)]"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>1 view = 1 lead opened</span>
              <span>{remaining} views left</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <MiniStat label="Opened" value={todaysViews} />
            <MiniStat label="Favourites" value={12} />
            <MiniStat label="Hot" value={9} tone="hot" />
          </div>
        </div>
      </Panel>

      {/* Platform strip */}
      <Panel title="By platform" description="Today's lead volume by source">
        <div className="grid grid-cols-4 gap-3 p-5 sm:grid-cols-6 md:grid-cols-8">
          {byPlatform.map(([p, count]) => {
            const v = platformVisual(p as any);
            return (
              <div
                key={p}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card/50 py-4 text-center"
              >
                <SocialTile platform={p as any} size={36} />
                <div className="text-lg font-semibold leading-none">{count}</div>
                <Mono className="text-[10px] text-muted-foreground">{v.label}</Mono>
              </div>
            );
          })}
        </div>
      </Panel>

      {/* By country + Favourites preview */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="By country" description="Where your leads are">
          <ul className="divide-y divide-border">
            {byCountry.map(([c, n]) => (
              <li key={c} className="flex items-center gap-3 px-5 py-3 text-sm">
                <span className="text-base leading-none">{countryFlag(c)}</span>
                <span className="min-w-0 flex-1 truncate">{c}</span>
                <div className="h-1.5 w-28 overflow-hidden rounded-md bg-card">
                  <div
                    className="h-full bg-[color:var(--signal)]/80"
                    style={{ width: `${(n / maxCountry) * 100}%` }}
                  />
                </div>
                <Mono className="w-8 text-right text-foreground">{n}</Mono>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel
          title="Recent hot leads"
          description="Fresh opportunities in your feed"
          actions={
            <Link to="/dashboard/leads" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              See all <ArrowRight className="h-3 w-3" />
            </Link>
          }
        >
          <ul className="divide-y divide-border">
            {LEADS.filter((l) => l.status === "hot").slice(0, 5).map((l) => {
              const v = platformVisual(l.platform);
              return (
                <li key={l.id} className="flex items-start gap-3 px-5 py-3">
                  <SocialTile platform={l.platform} size={30} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate text-sm font-medium">{l.name}</span>
                      {l.favourite && <Star className="h-3 w-3 fill-amber-400 text-amber-400" />}
                    </div>
                    <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <span>{countryFlag(l.country)}</span>
                      <span className="truncate">{l.country}</span>
                      <span>·</span>
                      <span className="truncate" style={{ color: v.brand }}>{v.label}</span>
                    </div>
                  </div>
                  <Link
                    to="/dashboard/leads/$leadId"
                    params={{ leadId: l.id }}
                    className="inline-flex h-7 items-center gap-1 rounded-md border border-border bg-card px-2 text-[11px] text-foreground hover:bg-background"
                  >
                    Open <ArrowRight className="h-3 w-3" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

function IntroCard({
  icon, title, body, cta,
}: { icon: React.ReactNode; title: string; body: string; cta: { to: string; label: string } }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-5">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-md bg-[color:var(--signal)]/12 ring-1 ring-[color:var(--signal)]/30">
          {icon}
        </span>
        <Mono className="text-muted-foreground">{title}</Mono>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-foreground/85">{body}</p>
      <Link
        to={cta.to}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--signal)] hover:brightness-110"
      >
        {cta.label} <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

function MiniStat({ label, value, tone = "default" }: { label: string; value: number; tone?: "default" | "hot" }) {
  return (
    <div className="rounded-xl border border-border bg-card/50 px-3 py-3 text-center">
      <div className={`text-xl font-semibold ${tone === "hot" ? "text-rose-400" : "text-foreground"}`}>
        {tone === "hot" ? (
          <span className="inline-flex items-center gap-1"><Flame className="h-4 w-4" /> {value}</span>
        ) : value}
      </div>
      <Mono className="mt-0.5 text-muted-foreground">{label}</Mono>
    </div>
  );
}
