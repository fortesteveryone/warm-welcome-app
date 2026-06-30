import {
  ArrowUpRight, Bot, Filter, Flame, Globe, Inbox, Layers, MessageSquare,
  Send, Sparkles, Target, TrendingUp, Zap,
} from "lucide-react";
import dashLeads from "@/assets/dashboard-leads.jpg";
import dashAnalytics from "@/assets/dashboard-analytics.jpg";
import dashLeadDetail from "@/assets/dashboard-lead-detail.jpg";
import orb3d from "@/assets/3d-orb.jpg";
import cards3d from "@/assets/3d-cards.jpg";

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-6 ${className}`}>{children}</div>;
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/70">
      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--signal)] shadow-[0_0_8px_var(--signal)]" />
      {children}
    </span>
  );
}

/* ---------- Product showcase: big black dashboard + bento callouts ---------- */
export function ProductShowcase() {
  return (
    <section className="section-edge section-light relative overflow-hidden">
      <Container className="py-20 md:py-28">
        <div className="flex flex-col items-center text-center">
          <Kicker>Inside the product</Kicker>
          <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.02em] sm:text-4xl md:text-[44px]">
            A focused workspace built for one job —{" "}
            <span className="text-muted-foreground">turning posts into replies.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Every screen is engineered for speed: triage in seconds, score with reason, reply with intent.
          </p>
        </div>

        {/* Bento grid */}
        <div className="mt-14 grid gap-4 lg:grid-cols-6 lg:grid-rows-[auto_auto]">
          {/* Big screenshot — spans 4 cols */}
          <figure className="relative col-span-6 overflow-hidden rounded-2xl border border-foreground/10 bg-[#0a0a0a] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.4)] lg:col-span-4 lg:row-span-2">
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[color:var(--signal)]/15 to-transparent" />
            <div className="relative p-5 sm:p-7">
              <div className="mb-4 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white">
                  <Inbox className="h-3 w-3" /> Lead Inbox
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--signal)]/20 px-2.5 py-1 text-[11px] font-medium text-[color:var(--signal)]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--signal)]" /> Live
                </span>
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Your inbox, your pipeline, your scoreboard.
              </h3>
              <p className="mt-2 max-w-md text-sm text-white/60">
                Triage 500+ fresh leads daily without losing context. Filters, scores, and one-click outreach in a single view.
              </p>
              <div className="relative mt-6 overflow-hidden rounded-xl border border-white/10">
                <img
                  src={dashLeads}
                  alt="Grow By Lead dashboard inbox"
                  width={1600}
                  height={1024}
                  loading="lazy"
                  className="w-full"
                />
              </div>
            </div>
          </figure>

          {/* Analytics card */}
          <div className="col-span-6 overflow-hidden rounded-2xl border border-foreground/10 bg-[#0a0a0a] p-5 text-white sm:col-span-3 lg:col-span-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium">
                <TrendingUp className="h-3 w-3" /> Trend
              </span>
              <ArrowUpRight className="h-4 w-4 text-white/40" />
            </div>
            <h3 className="mt-3 text-base font-semibold tracking-tight">Always-on analytics</h3>
            <p className="mt-1 text-xs text-white/55">Daily volume, source mix, conversion — all auto-rolled.</p>
            <div className="relative mt-4 overflow-hidden rounded-lg border border-white/10">
              <img
                src={dashAnalytics}
                alt="Analytics view"
                width={1280}
                height={896}
                loading="lazy"
                className="w-full"
              />
            </div>
          </div>

          {/* AI replies — colored card (signal green tint) */}
          <div className="relative col-span-6 overflow-hidden rounded-2xl border border-[color:var(--signal)]/30 bg-gradient-to-br from-[color:var(--signal)]/12 via-card to-card p-6 sm:col-span-3 lg:col-span-2">
            <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[color:var(--signal)]/20 blur-3xl" />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--signal)]/15 px-2.5 py-1 text-[11px] font-medium text-[color:var(--signal)]">
              <Sparkles className="h-3 w-3" /> AI outreach
            </span>
            <h3 className="mt-3 text-base font-semibold tracking-tight">3 reply angles, ready to send</h3>
            <p className="mt-1 text-xs text-muted-foreground">No blank page. Pick a tone, edit a word, send.</p>
            <div className="mt-4 space-y-2">
              {["Portfolio update support", "Fast turnaround offer", "Clear scope & payment"].map((t, i) => (
                <div
                  key={t}
                  className={`flex items-center justify-between rounded-lg border px-3 py-2 text-xs ${
                    i === 0
                      ? "border-[color:var(--signal)]/40 bg-[color:var(--signal)]/[0.08] text-foreground"
                      : "border-border bg-background/60 text-muted-foreground"
                  }`}
                >
                  <span className="truncate">{t}</span>
                  <Send className="h-3 w-3 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Feature bento: colored cards with mini visuals ---------- */
const featureCards = [
  {
    Icon: Filter,
    title: "Filters that actually filter",
    desc: "Slice by platform, country, intent, temperature, budget signal — in one click.",
    tone: "noir" as const,
  },
  {
    Icon: Bot,
    title: "Scored with a reason",
    desc: "Every score ships with a one-line human explanation, not a black box.",
    tone: "signal" as const,
  },
  {
    Icon: Globe,
    title: "Global by default",
    desc: "Live in 30+ countries. Country tags, language hints, time-zone aware.",
    tone: "soft" as const,
  },
  {
    Icon: Zap,
    title: "Replies in under a minute",
    desc: "Open lead → pick angle → send. Average outreach time: 47 seconds.",
    tone: "noir" as const,
  },
];

export function FeatureBento() {
  return (
    <section className="section-edge section-dark relative overflow-hidden">
      <Container className="py-20 md:py-28">
        <div className="grid items-end gap-8 md:grid-cols-[1fr_auto] md:gap-12">
          <div>
            <Kicker>Why teams switch</Kicker>
            <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.02em] sm:text-4xl md:text-[44px]">
              Built like a product, <span className="text-muted-foreground">not a spreadsheet.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground md:text-base">
            Four things you'll feel inside thirty seconds of using Grow By Lead.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {featureCards.map(({ Icon, title, desc, tone }) => {
            const styles =
              tone === "noir"
                ? "card-noir border"
                : tone === "signal"
                  ? "border border-[color:var(--signal)]/30 bg-gradient-to-br from-[color:var(--signal)]/12 via-card to-card"
                  : "border border-border bg-card";
            return (
              <div
                key={title}
                className={`relative overflow-hidden rounded-2xl p-6 transition hover:-translate-y-1 ${styles}`}
              >
                {tone === "signal" && (
                  <div aria-hidden className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[color:var(--signal)]/25 blur-3xl" />
                )}
                <div className="relative">
                  <div
                    className={`grid h-10 w-10 place-items-center rounded-lg ${
                      tone === "noir"
                        ? "bg-white/10 text-[color:var(--signal)]"
                        : tone === "signal"
                          ? "bg-[color:var(--signal)]/20 text-[color:var(--signal)]"
                          : "border border-border bg-background/60 text-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-4 text-base font-semibold tracking-tight">{title}</h3>
                  <p className={`mt-1.5 text-sm leading-relaxed ${tone === "noir" ? "text-white/60" : "text-muted-foreground"}`}>
                    {desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Split feature: 3D visual + lead detail screenshot */}
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {/* 3D orb card */}
          <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-[#0a0a0a] p-6 text-white">
            <div className="grid items-center gap-6 sm:grid-cols-[1fr_auto]">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#0a0a0a]">
                  <Target className="h-3 w-3 text-[color:var(--signal)]" /> Signal engine
                </span>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">
                  We listen to the open web — you reply to the ones that matter.
                </h3>
                <p className="mt-2 text-sm text-white/60">
                  Our engine parses public posts across Facebook, LinkedIn, Reddit, Instagram and X, scores intent, and drops only the qualified ones in your inbox.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                  {["Facebook", "LinkedIn", "Reddit", "Instagram", "X"].map((p) => (
                    <span key={p} className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-white/75">{p}</span>
                  ))}
                </div>
              </div>
              <img
                src={orb3d}
                alt=""
                width={1024}
                height={1024}
                loading="lazy"
                className="mx-auto h-44 w-44 shrink-0 sm:h-52 sm:w-52"
              />
            </div>
          </div>

          {/* Lead detail screenshot */}
          <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-[#0a0a0a] p-6 text-white">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium">
                <MessageSquare className="h-3 w-3" /> Lead detail
              </span>
              <span className="text-[11px] text-white/40">High intent · 92/100</span>
            </div>
            <h3 className="mt-3 text-xl font-semibold tracking-tight">
              Every lead opens into a full briefing.
            </h3>
            <p className="mt-2 text-sm text-white/60">
              Profile, scores, original post proof, AI reply, timeline — everything you need to close, in one screen.
            </p>
            <div className="relative mt-5 overflow-hidden rounded-xl border border-white/10">
              <img
                src={dashLeadDetail}
                alt="Lead detail view"
                width={1024}
                height={1280}
                loading="lazy"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Stats strip with 3D visual ---------- */
export function StatsStrip() {
  const stats = [
    { k: "500+", v: "Fresh leads daily" },
    { k: "30+", v: "Countries covered" },
    { k: "5", v: "Platforms parsed" },
    { k: "<60s", v: "Avg time to reply" },
  ];
  return (
    <section className="section-edge section-light">
      <Container className="py-16 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-[#0a0a0a] p-2">
            <img
              src={cards3d}
              alt=""
              width={1024}
              height={1024}
              loading="lazy"
              className="w-full rounded-xl"
            />
          </div>
          <div>
            <Kicker>By the numbers</Kicker>
            <h2 className="mt-4 max-w-md text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.02em] sm:text-4xl">
              Built to scale with how fast you can reply.
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div
                  key={s.v}
                  className={`relative overflow-hidden rounded-xl p-5 ${
                    i % 2 === 0
                      ? "card-noir border"
                      : "border border-border bg-card"
                  }`}
                >
                  {i % 2 === 0 && (
                    <Flame className="absolute right-3 top-3 h-4 w-4 text-[color:var(--signal)]" />
                  )}
                  <div className={`text-3xl font-semibold tracking-tight ${i % 2 === 0 ? "text-white" : "text-foreground"}`}>{s.k}</div>
                  <div className={`mt-1 text-xs ${i % 2 === 0 ? "text-white/55" : "text-muted-foreground"}`}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
