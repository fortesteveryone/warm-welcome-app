import { ArrowUpRight, Inbox, Sparkles, Target, Send } from "lucide-react";
import dashLeads from "@/assets/dashboard-leads.jpg";
import dashAnalytics from "@/assets/dashboard-analytics.jpg";
import { Container } from "@/components/home/primitives";

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-foreground/15 bg-foreground/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/70">
      {children}
    </span>
  );
}

/* Product showcase: big black dashboard + bento callouts */
export function ProductShowcase() {
  return (
    <section id="product" className="section-edge section-light relative overflow-hidden scroll-mt-24">
      <Container className="py-16 md:py-20">
        <div className="flex flex-col items-center text-center">
          <Kicker>Inside Postly</Kicker>
          <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.02em] sm:text-4xl md:text-[44px]">
            A focused workspace for <span className="text-[color:var(--signal)]">website opportunities</span>.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Review fresh public posts from real business owners, understand the opportunity in seconds, and prepare a personalised reply without ever jumping between platforms or browser tabs.
          </p>
        </div>

        {/* Bento grid */}
        <div className="mt-14 grid gap-4 lg:grid-cols-6 lg:grid-rows-[auto_auto]">
          {/* Big screenshot — spans 4 cols */}
          <figure className="relative col-span-6 overflow-hidden rounded-2xl border border-foreground/10 bg-[#0a0a0a] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.4)] lg:col-span-4 lg:row-span-2">
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[color:var(--signal)]/15 to-transparent" />
            <div className="relative p-5 sm:p-7">
              <div className="mb-4 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white">
                  <Inbox className="h-3 w-3" /> Lead Inbox
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-[color:var(--signal)]/20 px-2.5 py-1 text-[11px] font-medium text-[color:var(--signal)]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-md bg-[color:var(--signal)]" /> Live
                </span>
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Your website opportunity feed, organized and ready.
              </h3>
              <p className="mt-2 max-w-md text-sm text-white/60">
                Review fresh public posts from Facebook, LinkedIn, and Reddit with filters, scores, and source proof in one clean view.
              </p>
              <div className="relative mt-6 overflow-hidden rounded-xl border border-white/10">
                <img
                  src={dashLeads}
                  alt="Postly dashboard inbox"
                  width={1600}
                  height={1024}
                  loading="lazy"
                  className="w-full"
                />
              </div>
            </div>
          </figure>

          {/* Lead score card */}
          <div className="col-span-6 overflow-hidden rounded-2xl border border-foreground/10 bg-[#0a0a0a] p-5 text-white sm:col-span-3 lg:col-span-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-medium">
                <Target className="h-3 w-3" /> Lead Score
              </span>
              <ArrowUpRight className="h-4 w-4 text-white/40" />
            </div>
            <h3 className="mt-3 text-base font-semibold tracking-tight">Prioritize the best opportunities first.</h3>
            <p className="mt-1 text-xs text-white/55">See why a post looks promising based on intent, urgency, freshness, competition, budget signal, and service fit.</p>
            <div className="relative mt-4 overflow-hidden rounded-lg border border-white/10">
              <img
                src={dashAnalytics}
                alt="Lead score view"
                width={1280}
                height={896}
                loading="lazy"
                className="w-full"
              />
            </div>
          </div>

          {/* AI replies — colored card (signal green tint) */}
          <div className="relative col-span-6 overflow-hidden rounded-2xl border border-[color:var(--signal)]/30 bg-gradient-to-br from-[color:var(--signal)]/12 via-card to-card p-6 sm:col-span-3 lg:col-span-2">
            <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-md bg-[color:var(--signal)]/20 blur-3xl" />
            <span className="inline-flex items-center gap-1.5 rounded-md bg-[color:var(--signal)]/15 px-2.5 py-1 text-[11px] font-medium text-[color:var(--signal)]">
              <Sparkles className="h-3 w-3" /> Reply Angles
            </span>
            <h3 className="mt-3 text-base font-semibold tracking-tight">Personalized replies without starting from scratch.</h3>
            <p className="mt-1 text-xs text-muted-foreground">Turn each qualified website opportunity into clear reply angles based on the original post, service need, urgency, and budget signal.</p>
            <div className="mt-4 space-y-2">
              {["Offer website redesign help", "Ask about scope & timeline", "Share a quick next step"].map((t, i) => (
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
