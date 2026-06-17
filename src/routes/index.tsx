import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity, AlertTriangle, ArrowRight, BadgeCheck, BarChart3, Brain,
  CheckCircle2, ChevronDown, Clock, Copy, Database, ExternalLink,
  Facebook, Filter, Flame, Globe2, Inbox, Layers, Linkedin, MessageSquare,
  Send, Shield, Sparkles, Tag, Target, Users, Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grow By Lead — Social media buying signals, scored and sales-ready" },
      { name: "description", content: "Grow By Lead turns public social media posts into structured, scored, outreach-ready leads for agencies, freelancers and sales teams." },
      { property: "og:title", content: "Grow By Lead — Social lead intelligence" },
      { property: "og:description", content: "From messy Facebook, LinkedIn and Reddit posts to clean, sales-ready leads with outreach drafts included." },
    ],
  }),
  component: Home,
});

/* ---------- small primitives ---------- */
function Pill({ children, tone = "muted" }: { children: React.ReactNode; tone?: "muted" | "primary" | "hot" | "warm" | "cold" | "accent" }) {
  const tones: Record<string, string> = {
    muted: "bg-muted text-muted-foreground border-border",
    primary: "bg-primary/10 text-primary border-primary/30",
    accent: "bg-accent/15 text-accent border-accent/30",
    hot: "bg-[color:var(--hot)]/15 text-[color:var(--hot)] border-[color:var(--hot)]/30",
    warm: "bg-[color:var(--warm)]/15 text-[color:var(--warm)] border-[color:var(--warm)]/30",
    cold: "bg-[color:var(--cold)]/15 text-[color:var(--cold)] border-[color:var(--cold)]/30",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

function SectionLabel({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
      <Icon className="h-3.5 w-3.5 text-primary" />
      {children}
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-5xl">
      {children}
    </h2>
  );
}

/* ---------- page ---------- */
function Home() {
  return (
    <div className="min-h-screen text-foreground">
      <Header />
      <main>
        <Hero />
        <Positioning />
        <Capture />
        <ExampleLead />
        <BeforeAfter />
        <Platforms />
        <Scoring />
        <Outreach />
        <Dashboard />
        <LeadProfile />
        <ManualReview />
        <UseCases />
        <Categories />
        <Coverage />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

/* ---------- header ---------- */
function Header() {
  const links = [
    ["What it captures", "#capture"],
    ["Example lead", "#example"],
    ["Platforms", "#platforms"],
    ["Scoring", "#scoring"],
    ["Pricing", "#pricing"],
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-[color:var(--primary-glow)] text-primary-foreground shadow-[var(--shadow-elegant)]">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold tracking-tight">Grow By Lead</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-sm text-muted-foreground transition hover:text-foreground">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="#pricing" className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline">Sign in</a>
          <a href="#pricing" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-elegant)] transition hover:brightness-110">
            Get started <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------- hero ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel icon={Activity}>Social lead intelligence · Pre-launch</SectionLabel>
          <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
            Every social post,{" "}
            <span className="font-serif italic text-primary">scored</span> and ready to close.
          </h1>
          <p className="mt-6 text-balance text-lg text-muted-foreground sm:text-xl">
            Grow By Lead reads the buying signals people already post on Facebook, LinkedIn and Reddit — and turns each one into a structured lead with summary, intent, urgency, competition and outreach drafts.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href="#pricing" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-elegant)] transition hover:brightness-110">
              Start capturing leads <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#example" className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-3 text-sm font-medium text-foreground backdrop-blur transition hover:bg-card">
              See an example lead
            </a>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">No credit card required during pre-launch.</p>
        </div>

        {/* Mock dashboard preview */}
        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="absolute -inset-x-10 -top-10 h-64 bg-[radial-gradient(60%_60%_at_50%_0%,oklch(0.78_0.17_155_/_0.25),transparent_70%)] blur-2xl" />
          <div className="relative rounded-2xl border border-border bg-card/80 p-3 shadow-[var(--shadow-card)] backdrop-blur">
            <div className="flex items-center justify-between border-b border-border px-3 py-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--hot)]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--warm)]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
              </div>
              <span className="font-mono">growbylead.app / inbox</span>
              <span>17 new today</span>
            </div>
            <div className="grid gap-3 p-3 md:grid-cols-[1fr,1.2fr]">
              <div className="space-y-2">
                {sampleLeads.map((l, i) => (
                  <MiniLeadRow key={i} l={l} active={i === 0} />
                ))}
              </div>
              <MiniLeadDetail />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const sampleLeads = [
  { title: "Paid portfolio website developer needed for updates", platform: "Facebook", temp: "Hot", service: "Web Dev", comp: "Low", ago: "12m" },
  { title: "Looking for SEO expert — local plumbing business", platform: "Reddit", temp: "Warm", service: "SEO", comp: "Medium", ago: "38m" },
  { title: "Need help managing our Instagram for restaurant", platform: "Facebook", temp: "Warm", service: "SMM", comp: "Low", ago: "1h" },
  { title: "Shopify store redesign — budget $2k", platform: "LinkedIn", temp: "Hot", service: "E-com", comp: "Medium", ago: "2h" },
  { title: "Anyone do landing pages for SaaS launch?", platform: "Reddit", temp: "Cold", service: "Landing", comp: "High", ago: "4h" },
] as const;

function MiniLeadRow({ l, active }: { l: typeof sampleLeads[number]; active?: boolean }) {
  const toneByTemp: Record<string, "hot" | "warm" | "cold"> = { Hot: "hot", Warm: "warm", Cold: "cold" };
  return (
    <div className={`rounded-xl border px-3 py-2.5 transition ${active ? "border-primary/40 bg-primary/5" : "border-border bg-background/40 hover:bg-card"}`}>
      <div className="flex items-start justify-between gap-2">
        <p className="line-clamp-1 text-sm font-medium text-foreground">{l.title}</p>
        <Pill tone={toneByTemp[l.temp]}>{l.temp}</Pill>
      </div>
      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
        <span>{l.platform}</span>
        <span>·</span>
        <span>{l.service}</span>
        <span>·</span>
        <span>{l.comp} competition</span>
        <span className="ml-auto">{l.ago}</span>
      </div>
    </div>
  );
}

function MiniLeadDetail() {
  return (
    <div className="rounded-xl border border-border bg-background/40 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <Pill tone="hot"><Flame className="h-3 w-3" /> Hot lead</Pill>
        <Pill tone="primary">High intent</Pill>
        <Pill tone="muted">Low competition</Pill>
        <Pill tone="accent">Facebook</Pill>
      </div>
      <h3 className="mt-3 text-base font-semibold leading-tight">Paid portfolio website developer needed for updates</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Khansa Maroof is looking for a website developer to update a portfolio website and mentioned good payment.
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <KV k="Service" v="Portfolio updates" />
        <KV k="Best channel" v="Social DM" />
        <KV k="Comments" v="8 visible" />
        <KV k="Posted" v="12 min ago" />
      </div>
      <div className="mt-3 rounded-lg border border-primary/30 bg-primary/10 p-3 text-xs text-foreground">
        <span className="font-medium text-primary">Recommended action: </span>
        Contact within 30 minutes with portfolio examples and ask for the current site link, required updates, timeline and payment terms.
      </div>
    </div>
  );
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-md border border-border bg-card/40 px-2.5 py-1.5">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</div>
      <div className="text-foreground">{v}</div>
    </div>
  );
}

/* ---------- positioning band ---------- */
function Positioning() {
  return (
    <section className="border-y border-border/60 bg-card/30">
      <div className="mx-auto max-w-5xl px-6 py-12 text-center">
        <p className="text-balance font-serif text-2xl italic text-foreground sm:text-3xl">
          “Grow By Lead turns public social media buying signals into structured, scored,
          outreach-ready leads — for agencies, freelancers and sales teams.”
        </p>
      </div>
    </section>
  );
}

/* ---------- what it captures ---------- */
const captureCards = [
  { icon: Database, title: "Source details", body: "Platform, post URL, author name, post type and capture time — every lead is traceable to a real public post." },
  { icon: Brain, title: "Lead summary", body: "A clean title, one-line summary, service needed, website type and budget signal if mentioned." },
  { icon: Flame, title: "Intent & temperature", body: "Hot, warm or cold — derived from urgency words, specificity and how directly the person asks." },
  { icon: Users, title: "Competition signal", body: "Comments and replies are read at capture time to flag low, medium or high competition." },
  { icon: Target, title: "Recommended action", body: "A specific next step — what to send, what to ask, and how fast to move on this lead." },
  { icon: Send, title: "Outreach drafts", body: "Three angle-tested message drafts ready to copy, adapt and send through DM or email." },
];

function Capture() {
  return (
    <section id="capture" className="mx-auto max-w-7xl px-6 py-24">
      <div className="max-w-2xl">
        <SectionLabel icon={Layers}>What Grow By Lead captures</SectionLabel>
        <H2><span className="font-serif italic">From messy social posts</span> to clean sales-ready leads.</H2>
        <p className="mt-4 text-muted-foreground">
          Every captured post is parsed into the same structured shape, so your team works from one consistent surface — not screenshots and bookmarks.
        </p>
      </div>
      <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {captureCards.map((c) => (
          <div key={c.title} className="group rounded-2xl border border-border bg-card/60 p-6 transition hover:border-primary/40 hover:bg-card">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <c.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-foreground">{c.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- example lead ---------- */
const drafts = [
  {
    angle: "Portfolio update support",
    subject: "Saw your post — happy to help with the portfolio updates",
    body: "Hi Khansa — I saw your post about needing updates to your portfolio site. I've shipped similar updates for designers and devs in the past. Could you share the current site link and the specific changes you'd like? Happy to give a clear quote and timeline today.",
  },
  {
    angle: "Fast turnaround offer",
    subject: "Quick turnaround on your portfolio updates",
    body: "Hi Khansa, if you're looking to wrap the portfolio updates this week I can usually turn small changes around in 24–48 hours. Mind sharing the link and a short list of what you want updated? I'll send back a fixed price.",
  },
  {
    angle: "Clear scope & payment",
    subject: "Scope & payment for portfolio updates",
    body: "Hi Khansa, thanks for the post. To give you an honest quote I'd love to see the current site and the exact updates needed. I work on milestone-based payments (50% upfront, 50% on delivery). Open to jump on a 10-min call if easier.",
  },
];

function ExampleLead() {
  const [open, setOpen] = useState(0);
  return (
    <section id="example" className="border-t border-border/60 bg-gradient-to-b from-transparent to-card/30">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <SectionLabel icon={Sparkles}>Example lead intelligence card</SectionLabel>
          <H2>This is what one captured post looks like inside Grow By Lead.</H2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr,1fr]">
          {/* Lead card */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="flex flex-wrap items-center gap-2">
              <Pill tone="accent"><Facebook className="h-3 w-3" /> Facebook</Pill>
              <Pill tone="hot"><Flame className="h-3 w-3" /> Hot</Pill>
              <Pill tone="primary">High intent</Pill>
              <Pill tone="muted">Low competition</Pill>
              <Pill tone="muted"><Clock className="h-3 w-3" /> 12 min ago</Pill>
            </div>
            <h3 className="mt-4 text-2xl font-semibold leading-tight text-foreground">
              Paid portfolio website developer needed for updates
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Khansa Maroof is looking for a website developer to update a portfolio website and mentioned good payment.
            </p>

            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              <KV k="Service needed" v="Portfolio website updates" />
              <KV k="Website type" v="Portfolio" />
              <KV k="Best channel" v="Social media message" />
              <KV k="Budget signal" v="Mentioned, no amount" />
              <KV k="Author" v="Khansa Maroof" />
              <KV k="Comments at capture" v="8 visible" />
            </div>

            <div className="mt-5 rounded-xl border border-primary/30 bg-primary/10 p-4">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
                <Target className="h-3.5 w-3.5" /> Recommended next action
              </div>
              <p className="mt-2 text-sm text-foreground">
                Contact quickly with portfolio website examples and ask for the current website link, required updates, timeline and payment details.
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-xl border border-border bg-background/40 px-4 py-3 text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="h-3.5 w-3.5 text-primary" />
                <span>No manual review needed — all key fields present.</span>
              </div>
              <a className="inline-flex items-center gap-1 text-foreground hover:text-primary" href="#">
                Open original post <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Outreach drafts */}
          <div className="rounded-2xl border border-border bg-card/60 p-6">
            <div className="flex items-center gap-2">
              <Send className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Outreach drafts</h4>
            </div>
            <div className="mt-4 space-y-2">
              {drafts.map((d, i) => (
                <div key={i} className="overflow-hidden rounded-xl border border-border bg-background/40">
                  <button
                    onClick={() => setOpen(open === i ? -1 : i)}
                    className="flex w-full items-center justify-between px-4 py-3 text-left text-sm transition hover:bg-card"
                  >
                    <span className="flex items-center gap-2">
                      <span className="grid h-6 w-6 place-items-center rounded-md bg-primary/10 text-xs font-medium text-primary">{i + 1}</span>
                      <span className="font-medium text-foreground">{d.angle}</span>
                    </span>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition ${open === i ? "rotate-180" : ""}`} />
                  </button>
                  {open === i && (
                    <div className="border-t border-border bg-card/40 px-4 py-3 text-sm">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">Subject</div>
                      <div className="mt-0.5 text-foreground">{d.subject}</div>
                      <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Message</div>
                      <p className="mt-1 whitespace-pre-line text-foreground/90">{d.body}</p>
                      <button className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs text-foreground transition hover:bg-secondary">
                        <Copy className="h-3 w-3" /> Copy message
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- before / after ---------- */
function BeforeAfter() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="max-w-2xl">
        <SectionLabel icon={Zap}>Before vs after</SectionLabel>
        <H2>The same post, before and after Grow By Lead.</H2>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card/40 p-6">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Before</div>
          <h3 className="mt-2 text-lg font-semibold text-foreground">A raw Facebook group post</h3>
          <div className="mt-4 rounded-xl border border-dashed border-border bg-background/40 p-4 text-sm text-muted-foreground">
            <p className="text-foreground/80">
              “Need a developer for portfolio website. Good payment. DM me please 🙏”
            </p>
            <p className="mt-3 text-xs">12 comments · 4 reactions · posted in “Web Designers BD”</p>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Messy. No clear service scope, no budget, no signal of how fresh or how competitive the lead is. You either scroll past it or burn an hour writing context yourself.
          </p>
        </div>
        <div className="rounded-2xl border border-primary/40 bg-gradient-to-b from-primary/10 to-transparent p-6">
          <div className="text-xs font-medium uppercase tracking-wider text-primary">After</div>
          <h3 className="mt-2 text-lg font-semibold text-foreground">A structured, scored lead</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ["Service", "Portfolio website update"],
              ["Intent", "High"],
              ["Temperature", "Hot"],
              ["Competition", "Low (8 visible comments)"],
              ["Action", "Contact within 30 minutes"],
              ["Outreach", "3 ready-to-send drafts"],
            ].map(([k, v]) => (
              <li key={k} className="flex items-start gap-3 rounded-lg border border-border bg-background/40 px-3 py-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">{k}:</span>
                <span className="ml-auto text-foreground">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- platforms ---------- */
const platforms = [
  { icon: Facebook, name: "Facebook groups", state: "Supported", note: "Service-request posts, business asks." },
  { icon: Linkedin, name: "LinkedIn posts", state: "Supported", note: "Hiring asks, agency searches, ICP signals." },
  { icon: MessageSquare, name: "Reddit threads", state: "Supported", note: "Niche subs, freelance asks, vendor recs." },
  { icon: Inbox, name: "Manual link import", state: "Supported", note: "Paste any post URL or screenshot text." },
  { icon: Activity, name: "Instagram captions", state: "Coming soon", note: "Captions and pinned comments only." },
  { icon: MessageSquare, name: "WhatsApp shared leads", state: "Coming soon", note: "Forward leads from your team groups." },
];

function Platforms() {
  return (
    <section id="platforms" className="border-y border-border/60 bg-card/30">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <SectionLabel icon={Globe2}>Supported platforms</SectionLabel>
          <H2>Capture leads from the places where buyers already post.</H2>
        </div>
        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {platforms.map((p) => (
            <div key={p.name} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-secondary text-foreground">
                <p.icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-foreground">{p.name}</h3>
                  <Pill tone={p.state === "Supported" ? "primary" : "muted"}>{p.state}</Pill>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{p.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- scoring ---------- */
const scoringFactors = [
  { icon: Target, title: "Intent level", body: "Does the post directly ask for a service, or just describe a problem?" },
  { icon: Clock, title: "Urgency", body: "Words like ASAP, urgent, today, quickly push priority up." },
  { icon: BarChart3, title: "Budget signal", body: "Any mention of price, hourly rate, or budget range." },
  { icon: Users, title: "Competition", body: "Number of visible comments and replies at capture time." },
  { icon: Sparkles, title: "Freshness", body: "How long ago the post was created — fresher leads convert better." },
  { icon: Tag, title: "Service fit", body: "Web, SEO, design, ads, dev — which category the request matches." },
];

function Scoring() {
  return (
    <section id="scoring" className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-12 md:grid-cols-[1fr,1.2fr] md:items-start">
        <div className="md:sticky md:top-24">
          <SectionLabel icon={BarChart3}>How lead scoring works</SectionLabel>
          <H2>Every lead is scored on six explainable factors.</H2>
          <p className="mt-4 text-muted-foreground">
            No black-box numbers. Each score comes with a short reason, so your team trusts the priority order — and can challenge it when needed.
          </p>
          <div className="mt-6 rounded-xl border border-border bg-card p-4 text-sm">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Example reasoning</div>
            <p className="mt-1.5 text-foreground/90">
              <span className="text-primary">Low competition.</span> Based on 8 visible comments at capture time — below the category median of 21.
            </p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {scoringFactors.map((f) => (
            <div key={f.title} className="rounded-xl border border-border bg-card/60 p-5">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent">
                <f.icon className="h-4 w-4" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- outreach preview ---------- */
function Outreach() {
  const items = [
    { angle: "Portfolio update support", excerpt: "Saw your post about needing updates to your portfolio site. Could you share the current link and the specific changes…" },
    { angle: "Fast turnaround offer", excerpt: "If you're looking to wrap the updates this week I can usually turn small changes around in 24–48 hours…" },
    { angle: "Clear scope & payment", excerpt: "To give you an honest quote I'd love to see the current site and the exact updates needed. I work on milestone-based…" },
  ];
  return (
    <section className="border-y border-border/60 bg-card/30">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <SectionLabel icon={Send}>Outreach drafts included</SectionLabel>
          <H2>Not just leads — <span className="font-serif italic">ready-to-send</span> outreach angles.</H2>
          <p className="mt-4 text-muted-foreground">
            Every lead ships with three short, human-sounding message drafts. Pick the angle that fits, tweak the name, and send.
          </p>
        </div>
        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {items.map((d, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-primary">Angle {i + 1}</span>
                <Copy className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <h3 className="mt-2 text-base font-semibold text-foreground">{d.angle}</h3>
              <p className="mt-2 text-sm text-muted-foreground">“{d.excerpt}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- dashboard features ---------- */
const dashFeatures = [
  "Lead list with status",
  "Search & filters",
  "Platform filter",
  "Category filter",
  "Temperature filter",
  "Competition filter",
  "Saved outreach drafts",
  "Assigned team member",
  "Export CSV / JSON",
  "Copy message",
  "Open original post",
  "Manual review queue",
];

function Dashboard() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-12 md:grid-cols-[1fr,1.1fr] md:items-center">
        <div>
          <SectionLabel icon={Filter}>CRM-style dashboard</SectionLabel>
          <H2>A real inbox for your social leads — not another spreadsheet.</H2>
          <p className="mt-4 text-muted-foreground">
            Triage by temperature, filter by service or platform, assign to a teammate and export anywhere. Built like the CRMs your team already lives in.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-2">
            {dashFeatures.map((f) => (
              <div key={f} className="flex items-center gap-2 rounded-md border border-border bg-card/40 px-3 py-2 text-sm">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                <span className="text-foreground/90">{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card/60 p-5">
          <div className="flex items-center gap-2 border-b border-border pb-3 text-xs text-muted-foreground">
            <Filter className="h-3.5 w-3.5" /> Filters
            <Pill tone="primary">Hot</Pill>
            <Pill tone="muted">Facebook</Pill>
            <Pill tone="muted">Web dev</Pill>
            <span className="ml-auto">17 results</span>
          </div>
          <div className="mt-3 space-y-2">
            {sampleLeads.slice(0, 4).map((l, i) => (
              <MiniLeadRow key={i} l={l} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- lead profile ---------- */
const profileSections = [
  ["Source", "Platform, author, post URL, post type, timing."],
  ["Location", "Country, city and confidence level — marked unknown when not clear."],
  ["Engagement", "Reactions, comments and shares at capture time."],
  ["Lead score", "Intent, temperature, urgency, competition with reasoning."],
  ["Recommended action", "A specific next step tailored to the post."],
  ["Outreach drafts", "Three angle-tested message drafts you can copy."],
  ["Manual review", "Clear flag if any critical field is uncertain."],
  ["History", "Status changes, assignments and notes from your team."],
];

function LeadProfile() {
  return (
    <section className="border-y border-border/60 bg-card/30">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <SectionLabel icon={Inbox}>Inside every lead profile</SectionLabel>
          <H2>Eight sections, one consistent shape.</H2>
        </div>
        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {profileSections.map(([t, b], i) => (
            <div key={t} className="rounded-xl border border-border bg-card p-5">
              <div className="text-xs font-medium text-primary">0{i + 1}</div>
              <h3 className="mt-2 text-sm font-semibold text-foreground">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- manual review ---------- */
const reviewChecks = [
  "Missing country → marked unknown, never guessed.",
  "Low-confidence location → flagged for review.",
  "Unclear service request → manual review queue.",
  "Spam-looking post → review required before contact.",
  "Duplicate post → deduplicated against existing leads.",
  "Missing budget → left empty instead of fabricated.",
];

function ManualReview() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-10 md:grid-cols-[1fr,1.2fr] md:items-center">
        <div>
          <SectionLabel icon={Shield}>Data quality</SectionLabel>
          <H2>Built-in quality checks <span className="font-serif italic">before</span> you contact anyone.</H2>
          <p className="mt-4 text-balance text-lg text-muted-foreground">
            We do not guess critical data. If something is unknown, we mark it clearly — so your team never sends a message based on a fabricated detail.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <AlertTriangle className="h-4 w-4 text-accent" /> What we check on every lead
          </div>
          <ul className="mt-4 space-y-2">
            {reviewChecks.map((c) => (
              <li key={c} className="flex items-start gap-3 rounded-lg border border-border bg-background/40 px-3 py-2.5 text-sm">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-foreground/90">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- use cases ---------- */
const useCases = [
  { title: "Web design agencies", body: "Find people asking for website design, redesign, portfolio sites and business websites — before they hit Upwork." },
  { title: "SEO experts", body: "Surface posts asking for ranking help, local SEO, traffic recovery and Google visibility issues." },
  { title: "Social media managers", body: "Catch businesses asking for page management, content calendars and ad creatives." },
  { title: "Freelancers", body: "Get to fresh service-request posts before the comments fill up and competition spikes." },
  { title: "Cold outreach teams", body: "Use structured lead data and outreach drafts to contact faster, with cleaner context." },
  { title: "Lead generation agencies", body: "Build daily lead packs for clients, filtered by category, country and platform." },
];

function UseCases() {
  return (
    <section className="border-y border-border/60 bg-card/30">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <SectionLabel icon={Users}>Use cases</SectionLabel>
          <H2>Built for teams that sell digital services.</H2>
        </div>
        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((u) => (
            <div key={u.title} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold text-foreground">{u.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{u.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- categories ---------- */
const categories = [
  "Website Development", "Website Redesign", "Portfolio Website", "E-commerce Website",
  "SEO", "Social Media Management", "Graphic Design", "Paid Ads",
  "Branding", "Business Automation", "Landing Pages", "Local Business Marketing",
];

function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="max-w-2xl">
        <SectionLabel icon={Tag}>Lead categories</SectionLabel>
        <H2>The service categories we track and classify.</H2>
      </div>
      <div className="mt-10 flex flex-wrap gap-2">
        {categories.map((c) => (
          <span key={c} className="rounded-full border border-border bg-card/60 px-4 py-2 text-sm text-foreground/90 transition hover:border-primary/40 hover:text-primary">
            {c}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------- coverage ---------- */
const countries = ["USA", "Canada", "UK", "Australia", "Bangladesh", "India", "UAE", "Global"];

function Coverage() {
  return (
    <section className="border-y border-border/60 bg-card/30">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-10 md:grid-cols-[1fr,1.2fr] md:items-center">
          <div>
            <SectionLabel icon={Globe2}>Global coverage</SectionLabel>
            <H2>Wherever buyers post, we organize.</H2>
            <p className="mt-4 text-muted-foreground">
              Grow By Lead can organize leads from any country when the post contains enough public signals. Country, city and confidence level are shown clearly — and left blank when they're not certain.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {countries.map((c) => (
              <span key={c} className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- pricing ---------- */
function Pricing() {
  const plans = [
    {
      name: "Day pass",
      price: "$10",
      cadence: "/ day",
      desc: "Try a full day of fresh leads — no subscription.",
      features: ["1 day of unlimited captures", "All platforms supported", "3 outreach drafts per lead", "CSV / JSON export", "Email support"],
      cta: "Start a day pass",
      featured: false,
    },
    {
      name: "Monthly",
      price: "$20",
      cadence: "/ month",
      desc: "For freelancers and small teams shipping outreach daily.",
      features: ["Unlimited captures", "All platforms supported", "Saved filters & views", "Outreach drafts library", "Manual review queue", "Priority support"],
      cta: "Get Monthly",
      featured: true,
    },
    {
      name: "Agency",
      price: "Custom",
      cadence: "",
      desc: "For agencies running outreach for multiple clients.",
      features: ["Everything in Monthly", "Multiple workspaces", "Team seats", "API access (beta)", "Webhook delivery", "Onboarding session"],
      cta: "Talk to us",
      featured: false,
    },
  ];
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <SectionLabel icon={BadgeCheck}>Pricing</SectionLabel>
        <H2>Simple pricing while we're in pre-launch.</H2>
        <p className="mt-4 text-muted-foreground">Lock in early pricing — plans will change once we open public access.</p>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`relative rounded-2xl border p-6 ${p.featured ? "border-primary/50 bg-card shadow-[var(--shadow-elegant)]" : "border-border bg-card/60"}`}
          >
            {p.featured && (
              <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                Most popular
              </span>
            )}
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{p.name}</h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-4xl font-semibold text-foreground">{p.price}</span>
              <span className="text-sm text-muted-foreground">{p.cadence}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            <ul className="mt-5 space-y-2">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-foreground/90">{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#"
              className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium transition ${
                p.featured
                  ? "bg-primary text-primary-foreground hover:brightness-110"
                  : "border border-border bg-background/40 text-foreground hover:bg-card"
              }`}
            >
              {p.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
const faqs = [
  { q: "Where do leads come from?", a: "Public posts on Facebook groups, LinkedIn and Reddit where people openly ask for a service. We only work with public buying signals — no private messages, no scraping private accounts." },
  { q: "How is the lead score calculated?", a: "Six explainable factors: intent, urgency, budget signal, competition, freshness and service fit. Every score ships with a short, human-readable reason." },
  { q: "What if a field is missing from the post?", a: "We mark it as unknown. Grow By Lead never fabricates a country, budget or service type. Missing critical fields trigger our manual review flag." },
  { q: "Can I export leads to my own CRM?", a: "Yes. CSV and JSON export are available on all plans. API access and webhook delivery are in beta on the Agency plan." },
  { q: "Is there a free trial?", a: "Yes — the $10 day pass gives you a full day of unlimited captures with no subscription. You can also reach out for a pre-launch demo." },
  { q: "How fresh are the leads?", a: "Most leads land in your inbox within minutes of being posted. Each lead shows its post age so your team knows when to move fast." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="border-t border-border/60 bg-card/30">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <div className="text-center">
          <SectionLabel icon={MessageSquare}>FAQ</SectionLabel>
          <H2>Common questions.</H2>
        </div>
        <div className="mt-10 space-y-2">
          {faqs.map((f, i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-border bg-card">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-sm font-medium text-foreground">{f.q}</span>
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="border-t border-border px-5 py-4 text-sm text-muted-foreground">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- final CTA ---------- */
function FinalCTA() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <div className="relative overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/15 via-card to-card p-10 text-center md:p-16">
        <div className="absolute inset-x-0 -top-24 h-48 bg-[radial-gradient(40%_60%_at_50%_100%,oklch(0.78_0.17_155_/_0.4),transparent_70%)] blur-2xl" />
        <h2 className="relative text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
          Stop scrolling groups. <span className="font-serif italic text-primary">Start closing.</span>
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-muted-foreground">
          Get structured, scored, outreach-ready leads from the social posts you'd otherwise miss.
        </p>
        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#pricing" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-elegant)] transition hover:brightness-110">
            Get started <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#example" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition hover:bg-secondary">
            See example lead
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */
function Footer() {
  const cols = [
    { title: "Product", links: ["Features", "Lead dashboard", "Lead examples", "Pricing", "Changelog"] },
    { title: "Solutions", links: ["For agencies", "For freelancers", "For SEO teams", "For web developers", "For outreach teams"] },
    { title: "Resources", links: ["Blog", "Guides", "Documentation", "API reference", "Support"] },
    { title: "Company", links: ["About", "Contact", "Careers", "Press"] },
    { title: "Legal", links: ["Privacy policy", "Terms", "Data usage", "Refund policy", "GDPR"] },
  ];
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr,repeat(5,1fr)]">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-[color:var(--primary-glow)] text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="text-sm font-semibold tracking-tight">Grow By Lead</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Social media buying signals, organized into structured, scored, outreach-ready leads.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-xs font-semibold uppercase tracking-wider text-foreground">{c.title}</div>
              <ul className="mt-4 space-y-2">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground transition hover:text-foreground">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Grow By Lead. All rights reserved.</span>
          <span>Made for sales teams that move fast.</span>
        </div>
      </div>
    </footer>
  );
}
