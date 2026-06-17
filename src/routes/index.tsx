import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, Copy, ExternalLink, Facebook,
  Linkedin, Menu, MessageSquare, Minus, Plus, Sparkles, X,
} from "lucide-react";
import logoAsset from "@/assets/growbylead-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grow By Lead — Social media buying signals, scored and sales-ready" },
      { name: "description", content: "Grow By Lead turns public social media posts into structured, scored, outreach-ready leads for agencies, freelancers and sales teams." },
      { property: "og:title", content: "Grow By Lead" },
      { property: "og:description", content: "From messy social posts to clean, sales-ready leads with outreach drafts included." },
    ],
  }),
  component: Home,
});

/* ============================================================
   Primitives
   ============================================================ */

function Mono({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-mono text-[11px] tracking-tight ${className}`}>{children}</span>;
}

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-6 ${className}`}>{children}</div>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--signal)] shadow-[0_0_8px_var(--signal)]" />
      {children}
    </div>
  );
}

function SectionTitle({ kicker, title, lede }: { kicker: string; title: React.ReactNode; lede?: string }) {
  return (
    <div className="max-w-2xl">
      <Mono className="text-muted-foreground">{kicker}</Mono>
      <h2 className="mt-3 text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.02em] sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {lede && <p className="mt-4 text-base text-muted-foreground md:text-lg">{lede}</p>}
    </div>
  );
}

function Tag({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "hot" | "warm" | "cold" | "signal" }) {
  const tones = {
    default: "border-border bg-card text-foreground",
    hot: "border-[color:var(--hot)]/30 bg-[color:var(--hot)]/10 text-[color:var(--hot)]",
    warm: "border-[color:var(--warm)]/30 bg-[color:var(--warm)]/10 text-[color:var(--warm)]",
    cold: "border-[color:var(--cold)]/30 bg-[color:var(--cold)]/10 text-[color:var(--cold)]",
    signal: "border-[color:var(--signal)]/30 bg-[color:var(--signal)]/10 text-[color:var(--signal)]",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

/* ============================================================
   Page
   ============================================================ */

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <Hero />
      <LogoStrip />
      <ExampleLead />
      <BeforeAfter />
      <Platforms />
      <Scoring />
      <Dashboard />
      <UseCases />
      <Coverage />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ---------- top bar ---------- */
function TopBar() {
  const links: [string, string][] = [
    ["Example", "#example"],
    ["Platforms", "#platforms"],
    ["Scoring", "#scoring"],
    ["Pricing", "#pricing"],
    ["Docs", "#"],
  ];
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <Container className="flex h-14 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-7">
          <a href="#" className="flex shrink-0 items-center gap-2">
            <Logo />
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {links.map(([l, h]) => (
              <a key={h} href={h} className="text-sm text-muted-foreground transition hover:text-foreground">{l}</a>
            ))}
          </nav>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a href="#" className="hidden rounded-md border border-border bg-card/60 px-3.5 py-1.5 text-sm font-medium text-foreground transition hover:bg-card sm:inline-flex">
            Sign in
          </a>
          <a href="#pricing" className="hidden items-center gap-1.5 rounded-md bg-foreground px-3.5 py-1.5 text-sm font-medium text-background transition hover:bg-foreground/90 sm:inline-flex">
            Get started <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-md border border-border bg-card/60 text-foreground transition hover:bg-card md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </Container>

      {/* Mobile dropdown */}
      <div
        className={`overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden ${
          open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Container className="flex flex-col gap-1 py-3">
          {links.map(([l, h]) => (
            <a
              key={h}
              href={h}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm text-foreground/90 transition hover:bg-card"
            >
              <span>{l}</span>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
            </a>
          ))}
          <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border pt-3">
            <a href="#" onClick={() => setOpen(false)} className="inline-flex items-center justify-center rounded-md border border-border bg-card/60 px-3.5 py-2 text-sm font-medium text-foreground transition hover:bg-card">
              Sign in
            </a>
            <a href="#pricing" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-1.5 rounded-md bg-foreground px-3.5 py-2 text-sm font-medium text-background transition hover:bg-foreground/90">
              Get started <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </Container>
      </div>
    </header>
  );
}

function Logo({ className = "h-7 w-auto" }: { className?: string }) {
  return <img src={logoAsset.url} alt="Grow By Lead" className={className} />;
}

/* ---------- hero ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden section-edge">
      {/* gradient mesh */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-200px] h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.72_0.19_145/0.18),transparent_60%)] blur-3xl" />
        <div className="absolute right-[-200px] top-[100px] h-[500px] w-[700px] rounded-full bg-[radial-gradient(circle_at_center,oklch(0.7_0.16_230/0.15),transparent_60%)] blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <Container className="relative pt-24 pb-20 text-center md:pt-32 md:pb-28">
        <div className="flex justify-center">
          <Eyebrow>
            <span>Now in pre-launch</span>
            <span className="text-foreground/40">→</span>
            <span className="text-foreground">Read the changelog</span>
          </Eyebrow>
        </div>
        <h1 className="mx-auto mt-7 max-w-4xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.035em] sm:text-6xl md:text-7xl lg:text-[88px]">
          Social posts to{" "}
          <span className="bg-gradient-to-br from-[color:var(--signal)] to-foreground/60 bg-clip-text text-transparent">
            sales-ready leads.
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-balance text-base text-muted-foreground md:text-lg">
          We read buying signals on Facebook, LinkedIn and Reddit — and ship structured leads with intent, urgency, competition and outreach drafts.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href="#pricing" className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:bg-foreground/90">
            Start for free <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#example" className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur transition hover:bg-card">
            See example lead
          </a>
        </div>

        {/* preview window */}
        <div className="relative mx-auto mt-20 max-w-5xl">
          <div className="absolute -inset-x-20 -top-10 -bottom-10 rounded-[40px] bg-gradient-to-b from-foreground/5 to-transparent blur-2xl" />
          <div className="relative rounded-xl border border-border bg-card/80 p-1 shadow-[0_30px_120px_-20px_oklch(0.72_0.19_145/0.25),0_0_0_1px_oklch(1_0_0/0.04)] backdrop-blur">
            <div className="flex items-center justify-between border-b border-border px-4 py-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.7_0.2_25)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.16_70)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.72_0.19_145)]" />
              </div>
              <Mono className="text-muted-foreground">growbylead.app / inbox</Mono>
              <Mono className="text-muted-foreground">17 new today</Mono>
            </div>
            <div className="grid gap-3 p-3 text-left md:grid-cols-[1fr_1.15fr]">
              <div className="space-y-1.5">
                {sampleLeads.map((l, i) => <InboxRow key={i} l={l} active={i === 0} />)}
              </div>
              <PreviewDetail />
            </div>
          </div>
        </div>
      </Container>
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

function InboxRow({ l, active }: { l: typeof sampleLeads[number]; active?: boolean }) {
  const toneByTemp: Record<string, "hot" | "warm" | "cold"> = { Hot: "hot", Warm: "warm", Cold: "cold" };
  return (
    <div className={`rounded-lg border px-3 py-2.5 transition ${active ? "border-foreground/30 bg-foreground/[0.04]" : "border-transparent hover:border-border hover:bg-card"}`}>
      <div className="flex items-start justify-between gap-3">
        <p className="line-clamp-1 text-sm font-medium">{l.title}</p>
        <Tag tone={toneByTemp[l.temp]}>{l.temp}</Tag>
      </div>
      <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
        <span>{l.platform}</span><span>·</span><span>{l.service}</span><span>·</span><span>{l.comp} comp</span>
        <span className="ml-auto font-mono">{l.ago}</span>
      </div>
    </div>
  );
}

function PreviewDetail() {
  return (
    <div className="rounded-lg border border-border bg-background/40 p-4">
      <div className="flex flex-wrap items-center gap-1.5">
        <Tag tone="hot">● Hot</Tag>
        <Tag tone="signal">High intent</Tag>
        <Tag>Low competition</Tag>
        <Tag>Facebook</Tag>
      </div>
      <h3 className="mt-3 text-base font-semibold leading-tight tracking-tight">Paid portfolio website developer needed for updates</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Khansa Maroof is looking for a developer to update a portfolio website and mentioned good payment.
      </p>
      <div className="mt-3 grid grid-cols-2 gap-1.5 text-xs">
        {[["Service", "Portfolio updates"], ["Channel", "Social DM"], ["Comments", "8 visible"], ["Posted", "12m ago"]].map(([k, v]) => (
          <div key={k} className="rounded-md border border-border bg-card/40 px-2.5 py-1.5">
            <Mono className="text-muted-foreground">{k}</Mono>
            <div className="mt-0.5 text-foreground">{v}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-md border border-[color:var(--signal)]/30 bg-[color:var(--signal)]/[0.08] p-3 text-xs">
        <Mono className="text-[color:var(--signal)]">Recommended action</Mono>
        <p className="mt-1.5 text-foreground/90">
          Contact within 30 minutes with portfolio examples. Ask for current site link, required updates, timeline and payment terms.
        </p>
      </div>
    </div>
  );
}

/* ---------- value strip ---------- */
function LogoStrip() {
  const items = ["Structured", "Scored", "Sales-ready", "Outreach drafts", "Manual review", "CSV / JSON"];
  return (
    <div className="section-edge">
      <Container className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5">
        {items.map((t) => (
          <span key={t} className="flex items-center gap-2 text-xs text-muted-foreground">
            <Check className="h-3 w-3 text-[color:var(--signal)]/80" /> {t}
          </span>
        ))}
      </Container>
    </div>
  );
}

/* (Capture / BentoCard / SummaryGraphic / TempGraphic / CompGraphic removed — redundant internal detail) */


/* ---------- example lead ---------- */
const drafts = [
  { angle: "Portfolio update support", subject: "Saw your post — happy to help with the portfolio updates", body: "Hi Khansa — I saw your post about needing updates to your portfolio site. I've shipped similar updates for designers and devs in the past. Could you share the current site link and the specific changes you'd like? Happy to give a clear quote and timeline today." },
  { angle: "Fast turnaround offer", subject: "Quick turnaround on your portfolio updates", body: "Hi Khansa, if you're looking to wrap the portfolio updates this week I can usually turn small changes around in 24–48 hours. Mind sharing the link and a short list of what you want updated? I'll send back a fixed price." },
  { angle: "Clear scope & payment", subject: "Scope & payment for portfolio updates", body: "Hi Khansa, thanks for the post. To give you an honest quote I'd love to see the current site and the exact updates needed. I work on milestone-based payments (50% upfront, 50% on delivery). Open to jump on a 10-min call if easier." },
];

function ExampleLead() {
  const [open, setOpen] = useState(0);
  return (
    <section id="example" className="section-edge">
      <Container className="py-24 md:py-32">
        <SectionTitle
          kicker="02 / Example"
          title={<>One captured post, <span className="text-muted-foreground">fully structured.</span></>}
        />
        <div className="mt-14 grid gap-3 lg:grid-cols-[1.1fr_1fr]">
          <article className="rounded-xl border border-border bg-card p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-1.5">
              <Tag>Facebook</Tag>
              <Tag tone="hot">● Hot</Tag>
              <Tag tone="signal">High intent</Tag>
              <Tag>Low competition</Tag>
              <Mono className="ml-auto text-muted-foreground">12m ago</Mono>
            </div>
            <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.02em] md:text-3xl">
              Paid portfolio website developer needed for updates
            </h3>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              Khansa Maroof is looking for a website developer to update a portfolio website and mentioned good payment.
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-px rounded-lg bg-border overflow-hidden">
              {[
                ["Service", "Portfolio updates"],
                ["Website type", "Portfolio"],
                ["Channel", "Social DM"],
                ["Budget", "Mentioned"],
                ["Author", "Khansa Maroof"],
                ["Comments", "8 visible"],
              ].map(([k, v]) => (
                <div key={k} className="bg-card px-4 py-3">
                  <Mono className="text-muted-foreground">{k}</Mono>
                  <dd className="mt-1 text-sm">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 rounded-lg border border-[color:var(--signal)]/30 bg-[color:var(--signal)]/[0.08] p-4">
              <Mono className="text-[color:var(--signal)]">Recommended next action</Mono>
              <p className="mt-2 text-sm">
                Contact quickly with portfolio website examples and ask for the current website link, required updates, timeline and payment details.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
              <span>● No manual review needed — all key fields present</span>
              <a href="#" className="inline-flex items-center gap-1 text-foreground hover:underline">
                Open original post <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </article>
          <aside className="rounded-xl border border-border bg-card/50 p-6 md:p-8">
            <div className="flex items-center justify-between">
              <Mono className="text-muted-foreground">Outreach drafts</Mono>
              <Mono className="text-muted-foreground">03 angles</Mono>
            </div>
            <div className="mt-4 divide-y divide-border rounded-lg border border-border bg-background/40">
              {drafts.map((d, i) => (
                <div key={i}>
                  <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left">
                    <span className="flex items-center gap-3">
                      <Mono className="text-muted-foreground">0{i + 1}</Mono>
                      <span className="text-sm font-medium">{d.angle}</span>
                    </span>
                    {open === i ? <Minus className="h-4 w-4 text-muted-foreground" /> : <Plus className="h-4 w-4 text-muted-foreground" />}
                  </button>
                  {open === i && (
                    <div className="border-t border-border bg-card/40 px-4 py-4 text-sm">
                      <Mono className="text-muted-foreground">Subject</Mono>
                      <p className="mt-1">{d.subject}</p>
                      <Mono className="mt-3 inline-block text-muted-foreground">Message</Mono>
                      <p className="mt-1 text-foreground/90">{d.body}</p>
                      <button className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs hover:bg-secondary">
                        <Copy className="h-3 w-3" /> Copy message
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}

/* ---------- before / after ---------- */
function BeforeAfter() {
  return (
    <section className="section-edge section-tint">
      <Container className="py-24 md:py-32">
        <SectionTitle kicker="03 / Before vs after" title={<>The same post, <span className="text-muted-foreground">transformed.</span></>} />
        <div className="mt-14 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card/40 p-6 md:p-8">
            <Mono className="text-muted-foreground">Before — raw Facebook post</Mono>
            <div className="mt-5 rounded-lg border border-dashed border-border bg-background/40 p-4 text-sm">
              <p className="text-foreground/80">“Need a developer for portfolio website. Good payment. DM me please 🙏”</p>
              <Mono className="mt-3 inline-block text-muted-foreground">12 comments · 4 reactions · Web Designers BD</Mono>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Messy. No clear scope, no budget, no signal of freshness or competition. You scroll past it — or burn an hour writing context yourself.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-xl border border-[color:var(--signal)]/30 bg-card p-6 md:p-8">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--signal)] to-transparent" />
            <Mono className="text-[color:var(--signal)]">After — structured, scored lead</Mono>
            <ul className="mt-5 divide-y divide-border rounded-lg border border-border bg-background/40">
              {[
                ["Service", "Portfolio website update"],
                ["Intent", "High"],
                ["Temperature", "Hot"],
                ["Competition", "Low · 8 visible comments"],
                ["Action", "Contact within 30 minutes"],
                ["Outreach", "3 ready-to-send drafts"],
              ].map(([k, v]) => (
                <li key={k} className="grid grid-cols-3 items-center gap-3 px-4 py-3 text-sm">
                  <Mono className="text-muted-foreground">{k}</Mono>
                  <span className="col-span-2 text-right">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- platforms ---------- */
const platforms = [
  { icon: Facebook, name: "Facebook groups", state: "live", note: "Service-request posts, business asks." },
  { icon: Linkedin, name: "LinkedIn posts", state: "live", note: "Hiring asks, agency searches, ICP signals." },
  { icon: MessageSquare, name: "Reddit threads", state: "live", note: "Niche subs, freelance asks, vendor recs." },
  { icon: ArrowUpRight, name: "Manual link import", state: "live", note: "Paste any post URL or screenshot text." },
  { icon: MessageSquare, name: "Instagram captions", state: "soon", note: "Captions and pinned comments only." },
  { icon: MessageSquare, name: "WhatsApp shared", state: "soon", note: "Forward leads from your team groups." },
];

function Platforms() {
  return (
    <section id="platforms" className="section-edge">
      <Container className="py-24 md:py-32">
        <SectionTitle kicker="04 / Platforms" title={<>Capture leads from <span className="text-muted-foreground">where buyers post.</span></>} />
        <div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {platforms.map((p) => (
            <div key={p.name} className="group rounded-xl border border-border bg-card/50 p-5 transition hover:bg-card">
              <div className="flex items-center justify-between">
                <div className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-background">
                  <p.icon className="h-4 w-4" strokeWidth={1.75} />
                </div>
                {p.state === "live" ? <Tag tone="signal">● Live</Tag> : <Tag>○ Soon</Tag>}
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-tight">{p.name}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{p.note}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- scoring ---------- */
const scoringFactors = [
  ["Intent level", "Does the post directly ask for a service, or just describe a problem?"],
  ["Urgency", "Words like ASAP, urgent, today, quickly push priority up."],
  ["Budget signal", "Any mention of price, hourly rate, or budget range."],
  ["Competition", "Number of visible comments and replies at capture time."],
  ["Freshness", "How long ago the post was created — fresher leads convert better."],
  ["Service fit", "Web, SEO, design, ads, dev — which category the request matches."],
];

function Scoring() {
  return (
    <section id="scoring" className="section-edge section-tint">
      <Container className="py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:items-start">
          <div className="md:sticky md:top-24">
            <SectionTitle
              kicker="05 / Scoring"
              title={<>Six factors. <span className="text-muted-foreground">No black box.</span></>}
              lede="Each score ships with a short reason — your team trusts the priority order, and can challenge it."
            />
            <div className="mt-6 rounded-xl border border-border bg-card p-5">
              <Mono className="text-muted-foreground">Sample reasoning</Mono>
              <p className="mt-3 text-sm">
                <span className="text-[color:var(--signal)]">Low competition.</span> Based on 8 visible comments at capture time — below the category median of 21.
              </p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {scoringFactors.map(([t, b], i) => (
              <div key={t} className="rounded-xl border border-border bg-card/50 p-5">
                <div className="flex items-center justify-between">
                  <Mono className="text-muted-foreground">F.0{i + 1}</Mono>
                  <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <h3 className="mt-3 text-base font-semibold tracking-tight">{t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- outreach ---------- */
function Outreach() {
  const items = [
    { angle: "Portfolio update support", excerpt: "Saw your post about needing updates to your portfolio site. Could you share the current link and the specific changes…" },
    { angle: "Fast turnaround offer", excerpt: "If you're looking to wrap the updates this week I can usually turn small changes around in 24–48 hours…" },
    { angle: "Clear scope & payment", excerpt: "To give you an honest quote I'd love to see the current site and the exact updates needed. I work on milestone-based…" },
  ];
  return (
    <section className="section-edge">
      <Container className="py-24 md:py-32">
        <SectionTitle
          kicker="06 / Outreach"
          title={<>Not just leads — <span className="text-muted-foreground">ready-to-send angles.</span></>}
          lede="Every lead ships with three short, human-sounding drafts. Pick the angle that fits, tweak the name, and send."
        />
        <div className="mt-14 grid gap-3 md:grid-cols-3">
          {items.map((d, i) => (
            <div key={i} className="rounded-xl border border-border bg-card/50 p-6 transition hover:bg-card">
              <div className="flex items-center justify-between">
                <Tag tone="signal">Angle 0{i + 1}</Tag>
                <Copy className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-tight">{d.angle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">“{d.excerpt}”</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- dashboard ---------- */
const dashFeatures = [
  "Lead list with status", "Search & filters", "Platform filter", "Category filter",
  "Temperature filter", "Competition filter", "Saved outreach drafts", "Assigned team member",
  "Export CSV / JSON", "Copy message", "Open original post", "Manual review queue",
];

function Dashboard() {
  return (
    <section className="section-edge section-tint">
      <Container className="py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div>
            <SectionTitle
              kicker="07 / Dashboard"
              title={<>An inbox for social leads — <span className="text-muted-foreground">not a spreadsheet.</span></>}
              lede="Triage by temperature, filter by service or platform, assign to a teammate and export anywhere."
            />
            <div className="mt-8 grid grid-cols-2 gap-2">
              {dashFeatures.map((f) => (
                <div key={f} className="flex items-center gap-2 rounded-md border border-border bg-card/40 px-3 py-2 text-sm">
                  <Check className="h-3.5 w-3.5 text-[color:var(--signal)]" /> {f}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card/50 p-1">
            <div className="flex items-center justify-between border-b border-border px-4 py-2">
              <div className="flex items-center gap-2">
                <Tag tone="hot">● Hot</Tag>
                <Tag>Facebook</Tag>
                <Tag>Web dev</Tag>
              </div>
              <Mono className="text-muted-foreground">17 results</Mono>
            </div>
            <div className="divide-y divide-border">
              {sampleLeads.slice(0, 4).map((l, i) => (
                <div key={i} className={`grid grid-cols-12 items-center gap-2 px-4 py-3 text-sm transition hover:bg-card ${i === 0 ? "bg-foreground/[0.04]" : ""}`}>
                  <Mono className="col-span-1 text-muted-foreground">0{i + 1}</Mono>
                  <span className="col-span-6 truncate">{l.title}</span>
                  <span className="col-span-2 text-xs text-muted-foreground">{l.platform}</span>
                  <span className="col-span-2"><Tag tone={l.temp.toLowerCase() as "hot" | "warm" | "cold"}>{l.temp}</Tag></span>
                  <Mono className="col-span-1 text-right text-muted-foreground">{l.ago}</Mono>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- profile ---------- */
const profileSections = [
  ["Source", "Platform, author, post URL, post type, timing."],
  ["Location", "Country, city and confidence — marked unknown when unclear."],
  ["Engagement", "Reactions, comments and shares at capture time."],
  ["Lead score", "Intent, temperature, urgency, competition with reasoning."],
  ["Recommended action", "A specific next step tailored to the post."],
  ["Outreach drafts", "Three angle-tested message drafts you can copy."],
  ["Manual review", "Clear flag if any critical field is uncertain."],
  ["History", "Status, assignments and notes from your team."],
];

function Profile() {
  return (
    <section className="section-edge">
      <Container className="py-24 md:py-32">
        <SectionTitle kicker="08 / Lead profile" title={<>Eight sections, <span className="text-muted-foreground">one consistent shape.</span></>} />
        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4">
          {profileSections.map(([t, b], i) => (
            <div key={t} className="rounded-xl border border-border bg-card/50 p-5">
              <Mono className="text-[color:var(--signal)]">0{i + 1}</Mono>
              <h3 className="mt-3 text-sm font-semibold tracking-tight">{t}</h3>
              <p className="mt-1.5 text-xs text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- review ---------- */
const reviewChecks = [
  "Missing country → marked unknown, never guessed",
  "Low-confidence location → flagged for review",
  "Unclear service request → manual review queue",
  "Spam-looking post → review required before contact",
  "Duplicate post → deduplicated against existing leads",
  "Missing budget → left empty instead of fabricated",
];

function Review() {
  return (
    <section className="section-edge section-tint">
      <Container className="py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-center">
          <SectionTitle
            kicker="09 / Data quality"
            title={<>We do not <span className="text-muted-foreground">guess critical data.</span></>}
            lede="If something is unknown, we mark it clearly — so your team never sends a message based on a fabricated detail."
          />
          <ul className="divide-y divide-border rounded-xl border border-border bg-card/50">
            {reviewChecks.map((c, i) => (
              <li key={c} className="flex items-start gap-4 px-5 py-4">
                <Mono className="mt-0.5 text-muted-foreground">Q.0{i + 1}</Mono>
                <span className="text-sm">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/* ---------- use cases ---------- */
const useCases = [
  ["Web design agencies", "Catch people asking for website design, redesign or portfolio sites — before they hit Upwork."],
  ["SEO experts", "Posts about ranking help, local SEO and traffic recovery, surfaced as they happen."],
  ["Social media managers", "Businesses asking for page management, content calendars and ad creatives."],
  ["Freelancers", "Get to fresh service-request posts before the comments fill up."],
  ["Outreach teams", "Structured lead data + drafts means faster, cleaner first contact."],
  ["Lead-gen agencies", "Build daily lead packs for clients, filtered by category, country and platform."],
];

function UseCases() {
  return (
    <section className="section-edge">
      <Container className="py-24 md:py-32">
        <SectionTitle kicker="10 / Use cases" title={<>Built for teams that <span className="text-muted-foreground">sell digital services.</span></>} />
        <div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map(([t, b]) => (
            <div key={t} className="rounded-xl border border-border bg-card/50 p-6 transition hover:bg-card">
              <h3 className="text-base font-semibold tracking-tight">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b}</p>
              <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm text-foreground hover:gap-1.5 transition-all">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>
      </Container>
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
    <section className="section-edge section-tint">
      <Container className="py-24 md:py-32">
        <SectionTitle kicker="11 / Categories" title={<>Service categories <span className="text-muted-foreground">we classify.</span></>} />
        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <span key={c} className="rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm transition hover:border-foreground/30 hover:bg-card">
              {c}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- coverage ---------- */
const countries = [
  { flag: "🇺🇸", name: "United States", live: true },
  { flag: "🇨🇦", name: "Canada", live: true },
  { flag: "🇬🇧", name: "United Kingdom", live: true },
  { flag: "🇦🇺", name: "Australia", live: true },
  { flag: "🇧🇩", name: "Bangladesh", live: true },
  { flag: "🇮🇳", name: "India", live: true },
  { flag: "🇦🇪", name: "UAE", live: true },
  { flag: "🇸🇬", name: "Singapore", live: true },
  { flag: "🇩🇪", name: "Germany", live: false },
  { flag: "🇫🇷", name: "France", live: false },
  { flag: "🇧🇷", name: "Brazil", live: false },
  { flag: "🌍", name: "Global pool", live: true },
];

function Coverage() {
  return (
    <section className="section-edge">
      <Container className="py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:items-center">
          <SectionTitle
            kicker="12 / Coverage"
            title={<>Wherever buyers post, <span className="text-muted-foreground">we organize.</span></>}
            lede="Country and city show only when confident — left blank when not. We don't guess geography."
          />
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3 md:grid-cols-4">
            {countries.map((c) => (
              <div key={c.name} className="flex items-center justify-between gap-2 bg-card px-4 py-3.5">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="text-lg leading-none" aria-hidden>{c.flag}</span>
                  <span className="truncate text-sm font-medium">{c.name}</span>
                </div>
                {c.live
                  ? <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--signal)] shadow-[0_0_6px_var(--signal)]" />
                  : <Mono className="shrink-0 text-muted-foreground">soon</Mono>}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- pricing ---------- */
function Pricing() {
  const plans = [
    {
      name: "Day pass", price: "$10", cadence: "/ day", desc: "Try a full day of fresh leads — no subscription.",
      features: ["1 day of unlimited captures", "All platforms supported", "3 outreach drafts per lead", "CSV / JSON export", "Email support"],
      cta: "Start day pass", featured: false,
    },
    {
      name: "Monthly", price: "$20", cadence: "/ month", desc: "For freelancers and small teams shipping outreach daily.",
      features: ["Unlimited captures", "All platforms supported", "Saved filters & views", "Outreach drafts library", "Manual review queue", "Priority support"],
      cta: "Get Monthly", featured: true,
    },
    {
      name: "Agency", price: "Custom", cadence: "", desc: "For agencies running outreach for multiple clients.",
      features: ["Everything in Monthly", "Multiple workspaces", "Team seats", "API access (beta)", "Webhook delivery", "Onboarding session"],
      cta: "Talk to us", featured: false,
    },
  ];
  return (
    <section id="pricing" className="section-edge section-tint">
      <Container className="py-24 md:py-32">
        <div className="text-center">
          <Mono className="text-muted-foreground">13 / Pricing</Mono>
          <h2 className="mx-auto mt-3 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.025em] md:text-5xl">
            Simple pricing <span className="text-muted-foreground">while we're in pre-launch.</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-3 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-xl border p-6 md:p-7 ${
                p.featured
                  ? "border-foreground/30 bg-card shadow-[0_0_0_1px_oklch(1_0_0/0.06),0_30px_80px_-30px_oklch(0.72_0.19_145/0.3)]"
                  : "border-border bg-card/50"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-2.5 left-6 rounded-full border border-[color:var(--signal)]/40 bg-[color:var(--signal)]/15 px-2.5 py-0.5 text-[10px] font-medium text-[color:var(--signal)]">
                  Most popular
                </span>
              )}
              <Mono className="text-muted-foreground">{p.name}</Mono>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="text-5xl font-semibold tracking-[-0.03em]">{p.price}</span>
                <span className="text-sm text-muted-foreground">{p.cadence}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <ul className="mt-6 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--signal)]" />
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`mt-8 inline-flex w-full items-center justify-center gap-1.5 rounded-md px-4 py-2.5 text-sm font-medium transition ${
                  p.featured
                    ? "bg-foreground text-background hover:bg-foreground/90"
                    : "border border-border bg-background hover:bg-card"
                }`}
              >
                {p.cta} <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>
      </Container>
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
    <section className="section-edge">
      <Container className="py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-[1fr_1.5fr]">
          <SectionTitle kicker="14 / FAQ" title={<>Common <span className="text-muted-foreground">questions.</span></>} />
          <div className="divide-y divide-border rounded-xl border border-border bg-card/50">
            {faqs.map((f, i) => (
              <div key={i}>
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                  <span className="text-sm font-medium md:text-base">{f.q}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && <div className="px-5 pb-5 text-sm text-muted-foreground">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- final CTA ---------- */
function FinalCTA() {
  return (
    <section className="section-edge section-tint">
      <Container className="py-24 md:py-32">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-10 text-center md:p-16">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.72_0.19_145/0.18),transparent_60%)] blur-3xl" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--signal)]/60 to-transparent" />
          </div>
          <h2 className="relative text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.03em] md:text-6xl">
            Stop scrolling.<br />
            <span className="bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-transparent">Start closing.</span>
          </h2>
          <p className="relative mx-auto mt-5 max-w-md text-muted-foreground">
            Structured, scored, outreach-ready leads from the social posts you'd otherwise miss.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#pricing" className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:bg-foreground/90">
              Get access <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#example" className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/40 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur transition hover:bg-card">
              See example lead
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- footer ---------- */
function Footer() {
  const cols = [
    { title: "Product", links: ["Features", "Dashboard", "Lead examples", "Pricing", "Changelog"] },
    { title: "Solutions", links: ["Agencies", "Freelancers", "SEO teams", "Developers", "Outreach"] },
    { title: "Resources", links: ["Blog", "Guides", "Docs", "API reference", "Support"] },
    { title: "Company", links: ["About", "Contact", "Careers", "Press"] },
    { title: "Legal", links: ["Privacy", "Terms", "Data usage", "Refund", "GDPR"] },
  ];
  return (
    <footer className="bg-background">
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-[1.6fr_repeat(5,1fr)]">
          <div>
            <div className="flex items-center gap-2">
              <Logo className="h-8 w-auto" />
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Social media buying signals, organized into structured, scored, outreach-ready leads.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/50 px-2.5 py-1 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--signal)]" /> All systems normal
              </span>
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <Mono className="text-foreground">{c.title}</Mono>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground transition hover:text-foreground">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
          <Mono className="text-muted-foreground">© {new Date().getFullYear()} Grow By Lead</Mono>
          <Mono className="text-muted-foreground">Built for sales teams that move fast</Mono>
        </div>
      </Container>
    </footer>
  );
}
