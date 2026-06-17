import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowUpRight, ChevronDown, Copy, ExternalLink, Facebook, Linkedin,
  MessageSquare, Plus, Minus,
} from "lucide-react";

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
   Layout primitives — Swiss editorial
   ============================================================ */

function Rule() {
  return <hr className="border-0 border-t border-foreground/15" />;
}

function Mono({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-mono text-[11px] uppercase tracking-[0.16em] ${className}`}>{children}</span>;
}

function SectionHeader({ index, kicker, title, lede }: { index: string; kicker: string; title: React.ReactNode; lede?: string }) {
  return (
    <header className="grid grid-cols-12 gap-6 border-t border-foreground pt-6">
      <div className="col-span-12 flex items-center justify-between md:col-span-3">
        <Mono className="text-foreground">§ {index}</Mono>
        <Mono className="text-muted-foreground md:hidden">{kicker}</Mono>
      </div>
      <div className="col-span-12 md:col-span-9">
        <Mono className="hidden text-muted-foreground md:inline">{kicker}</Mono>
        <h2 className="mt-2 text-balance font-serif text-4xl leading-[1.02] tracking-tight md:text-6xl">
          {title}
        </h2>
        {lede && <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">{lede}</p>}
      </div>
    </header>
  );
}

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1280px] px-6 md:px-10 ${className}`}>{children}</div>;
}

/* ============================================================
   Page
   ============================================================ */

function Home() {
  return (
    <div className="text-foreground">
      <TopBar />
      <Hero />
      <Marquee />
      <Capture />
      <ExampleLead />
      <BeforeAfter />
      <Platforms />
      <Scoring />
      <Outreach />
      <Dashboard />
      <Profile />
      <Review />
      <UseCases />
      <Categories />
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
  return (
    <div className="border-b border-foreground/15 bg-background/85 backdrop-blur sticky top-0 z-40">
      <Container className="flex h-14 items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <span className="grid h-6 w-6 place-items-center bg-foreground text-background font-serif text-sm leading-none">G</span>
          <span className="text-sm font-semibold tracking-tight">Grow By Lead</span>
          <Mono className="ml-3 hidden text-muted-foreground md:inline">/ pre-launch</Mono>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {[["What it captures", "#capture"], ["Example", "#example"], ["Scoring", "#scoring"], ["Pricing", "#pricing"]].map(([l, h]) => (
            <a key={h} href={h} className="text-sm text-muted-foreground transition hover:text-foreground">{l}</a>
          ))}
        </nav>
        <a href="#pricing" className="group inline-flex items-center gap-1.5 border border-foreground bg-foreground px-3.5 py-1.5 text-sm font-medium text-background transition hover:bg-background hover:text-foreground">
          Get access <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </Container>
    </div>
  );
}

/* ---------- hero ---------- */
function Hero() {
  return (
    <section className="border-b border-foreground/15">
      <Container className="pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 flex items-center justify-between md:col-span-3">
            <Mono>§ 00 / Index</Mono>
            <Mono className="text-muted-foreground">Vol. 01</Mono>
          </div>
          <div className="col-span-12 md:col-span-9">
            <Mono className="text-muted-foreground">Social lead intelligence — for agencies, freelancers & sales teams</Mono>
            <h1 className="mt-5 font-serif text-[clamp(2.6rem,7.2vw,7rem)] leading-[0.95] tracking-tight">
              Every social post,<br />
              <span className="italic">scored</span> and ready to close.
            </h1>
            <div className="mt-8 grid grid-cols-12 gap-6">
              <p className="col-span-12 max-w-xl text-lg text-foreground/80 md:col-span-7">
                Grow By Lead reads the buying signals people already post on Facebook, LinkedIn and Reddit — and turns each one into a structured lead with summary, intent, urgency, competition and three outreach drafts.
              </p>
              <div className="col-span-12 flex flex-col items-start gap-3 md:col-span-5 md:items-end">
                <a href="#pricing" className="inline-flex items-center gap-2 bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:bg-accent">
                  Start capturing leads <ArrowUpRight className="h-4 w-4" />
                </a>
                <a href="#example" className="inline-flex items-center gap-2 border border-foreground/30 px-5 py-3 text-sm font-medium text-foreground transition hover:border-foreground">
                  See an example lead
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* hero numbers — real product facts, not fake metrics */}
        <div className="mt-16 grid grid-cols-2 border-t border-foreground/20 md:grid-cols-4">
          {[
            ["06", "Scoring factors per lead"],
            ["03", "Outreach drafts per lead"],
            ["04", "Platforms supported"],
            ["01", "Source of truth"],
          ].map(([n, l]) => (
            <div key={l} className="border-r border-foreground/15 px-2 py-6 last:border-r-0 md:px-6">
              <div className="font-serif text-5xl leading-none md:text-6xl">{n}</div>
              <div className="mt-3 text-sm text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- marquee strip ---------- */
function Marquee() {
  const items = ["Facebook groups", "LinkedIn posts", "Reddit threads", "Manual link import", "Lead summary", "Intent + temperature", "Competition signal", "Outreach drafts", "Manual review", "CSV / JSON export"];
  return (
    <div className="overflow-hidden border-b border-foreground/15 bg-foreground py-4 text-background">
      <div className="flex animate-[marquee_40s_linear_infinite] gap-12 whitespace-nowrap">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="font-mono text-[12px] uppercase tracking-[0.18em]">— {t}</span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }`}</style>
    </div>
  );
}

/* ---------- capture ---------- */
const captureCards = [
  ["Source details", "Platform, post URL, author name, post type and capture time — every lead is traceable to a real public post."],
  ["Lead summary", "A clean title, one-line summary, service needed, website type and budget signal if mentioned."],
  ["Intent & temperature", "Hot, warm or cold — derived from urgency words, specificity and how directly the person asks."],
  ["Competition signal", "Comments and replies are read at capture time to flag low, medium or high competition."],
  ["Recommended action", "A specific next step — what to send, what to ask, and how fast to move on this lead."],
  ["Outreach drafts", "Three angle-tested message drafts ready to copy, adapt and send through DM or email."],
];

function Capture() {
  return (
    <section id="capture">
      <Container className="py-24 md:py-32">
        <SectionHeader
          index="01"
          kicker="What Grow By Lead captures"
          title={<>From messy social posts<br /><span className="italic">to clean sales-ready leads.</span></>}
          lede="Every captured post is parsed into the same structured shape, so your team works from one consistent surface — not screenshots and bookmarks."
        />
        <div className="mt-12 grid grid-cols-1 border-t border-foreground/15 md:grid-cols-3">
          {captureCards.map(([t, b], i) => (
            <div
              key={t}
              className={`border-b border-foreground/15 p-6 md:border-r md:p-8 ${
                (i + 1) % 3 === 0 ? "md:border-r-0" : ""
              } ${i >= captureCards.length - 3 ? "md:border-b-0" : ""}`}
            >
              <Mono className="text-muted-foreground">{String(i + 1).padStart(2, "0")}</Mono>
              <h3 className="mt-3 font-serif text-2xl leading-tight md:text-3xl">{t}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- example lead ---------- */
const drafts = [
  { angle: "Portfolio update support", subject: "Saw your post — happy to help with the portfolio updates", body: "Hi Khansa — I saw your post about needing updates to your portfolio site. I've shipped similar updates for designers and devs in the past. Could you share the current site link and the specific changes you'd like? Happy to give a clear quote and timeline today." },
  { angle: "Fast turnaround offer", subject: "Quick turnaround on your portfolio updates", body: "Hi Khansa, if you're looking to wrap the portfolio updates this week I can usually turn small changes around in 24–48 hours. Mind sharing the link and a short list of what you want updated? I'll send back a fixed price." },
  { angle: "Clear scope & payment", subject: "Scope & payment for portfolio updates", body: "Hi Khansa, thanks for the post. To give you an honest quote I'd love to see the current site and the exact updates needed. I work on milestone-based payments (50% upfront, 50% on delivery). Open to jump on a 10-min call if easier." },
];

function ExampleLead() {
  const [open, setOpen] = useState(0);
  return (
    <section id="example" className="bg-foreground text-background">
      <Container className="py-24 md:py-32">
        <header className="grid grid-cols-12 gap-6 border-t border-background/20 pt-6">
          <div className="col-span-12 md:col-span-3"><Mono>§ 02</Mono></div>
          <div className="col-span-12 md:col-span-9">
            <Mono className="text-background/60">Example lead intelligence card</Mono>
            <h2 className="mt-2 text-balance font-serif text-4xl leading-[1.02] tracking-tight md:text-6xl">
              This is what one captured post<br /><span className="italic">looks like inside Grow By Lead.</span>
            </h2>
          </div>
        </header>

        <div className="mt-14 grid grid-cols-12 gap-6">
          {/* lead card */}
          <article className="col-span-12 bg-background p-6 text-foreground md:col-span-7 md:p-10">
            <div className="flex flex-wrap items-center gap-2 border-b border-foreground/15 pb-4">
              <Tag>Facebook</Tag>
              <Tag tone="hot">Hot</Tag>
              <Tag>High intent</Tag>
              <Tag>Low competition</Tag>
              <Mono className="ml-auto text-muted-foreground">12 min ago</Mono>
            </div>
            <h3 className="mt-6 font-serif text-3xl leading-tight md:text-4xl">
              Paid portfolio website developer needed for updates
            </h3>
            <p className="mt-3 text-base text-muted-foreground">
              Khansa Maroof is looking for a website developer to update a portfolio website and mentioned good payment.
            </p>

            <dl className="mt-6 grid grid-cols-2 border-t border-foreground/15">
              {[
                ["Service needed", "Portfolio website updates"],
                ["Website type", "Portfolio"],
                ["Best channel", "Social media message"],
                ["Budget signal", "Mentioned, no amount"],
                ["Author", "Khansa Maroof"],
                ["Comments at capture", "8 visible"],
              ].map(([k, v]) => (
                <div key={k} className="border-b border-foreground/15 py-3 odd:border-r odd:pr-4 even:pl-4">
                  <Mono className="text-muted-foreground">{k}</Mono>
                  <dd className="mt-1 text-sm">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 border-l-2 border-accent bg-accent/5 p-4">
              <Mono className="text-accent">Recommended next action</Mono>
              <p className="mt-2 text-sm text-foreground">
                Contact quickly with portfolio website examples and ask for the current website link, required updates, timeline and payment details.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-foreground/15 pt-4 text-xs text-muted-foreground">
              <span>No manual review needed — all key fields present.</span>
              <a href="#" className="inline-flex items-center gap-1 text-foreground hover:text-accent">
                Open original post <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </article>

          {/* drafts */}
          <aside className="col-span-12 md:col-span-5">
            <div className="border border-background/30 p-6 md:p-8">
              <Mono>Outreach drafts · 03</Mono>
              <div className="mt-5 divide-y divide-background/20 border-y border-background/20">
                {drafts.map((d, i) => (
                  <div key={i}>
                    <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-3 py-4 text-left">
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-[11px] text-background/60">0{i + 1}</span>
                        <span className="font-serif text-xl italic">{d.angle}</span>
                      </span>
                      {open === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </button>
                    {open === i && (
                      <div className="pb-5 text-sm">
                        <Mono className="text-background/60">Subject</Mono>
                        <p className="mt-1">{d.subject}</p>
                        <Mono className="mt-4 inline-block text-background/60">Message</Mono>
                        <p className="mt-1 text-background/90">{d.body}</p>
                        <button className="mt-4 inline-flex items-center gap-1.5 border border-background/30 px-2.5 py-1.5 text-xs transition hover:border-background">
                          <Copy className="h-3 w-3" /> Copy message
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}

function Tag({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "hot" | "warm" | "cold" }) {
  const tones = {
    default: "border-foreground/20 text-foreground",
    hot: "border-[color:var(--hot)] text-[color:var(--hot)]",
    warm: "border-[color:var(--warm)] text-[color:var(--warm)]",
    cold: "border-[color:var(--cold)] text-[color:var(--cold)]",
  };
  return (
    <span className={`inline-flex items-center border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${tones[tone]}`}>
      {children}
    </span>
  );
}

/* ---------- before / after ---------- */
function BeforeAfter() {
  return (
    <section>
      <Container className="py-24 md:py-32">
        <SectionHeader
          index="03"
          kicker="Before vs after"
          title={<>The same post, <span className="italic">before and after.</span></>}
        />
        <div className="mt-12 grid grid-cols-1 gap-0 border-t border-foreground/15 md:grid-cols-2">
          <div className="border-b border-foreground/15 p-8 md:border-b-0 md:border-r md:p-10">
            <Mono className="text-muted-foreground">Before — raw Facebook post</Mono>
            <div className="mt-6 border border-dashed border-foreground/30 p-5">
              <p className="font-serif text-2xl leading-snug italic text-foreground/80">
                “Need a developer for portfolio website. Good payment. DM me please 🙏”
              </p>
              <p className="mt-4 text-xs text-muted-foreground">12 comments · 4 reactions · posted in “Web Designers BD”</p>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Messy. No clear scope, no budget, no signal of freshness or competition. You scroll past it — or burn an hour writing context yourself.
            </p>
          </div>
          <div className="bg-foreground p-8 text-background md:p-10">
            <Mono className="text-background/60">After — structured, scored lead</Mono>
            <ul className="mt-6 divide-y divide-background/20 border-y border-background/20">
              {[
                ["Service", "Portfolio website update"],
                ["Intent", "High"],
                ["Temperature", "Hot"],
                ["Competition", "Low · 8 visible comments"],
                ["Action", "Contact within 30 minutes"],
                ["Outreach", "3 ready-to-send drafts"],
              ].map(([k, v]) => (
                <li key={k} className="grid grid-cols-3 gap-4 py-3">
                  <Mono className="col-span-1 text-background/60">{k}</Mono>
                  <span className="col-span-2 font-serif text-lg">{v}</span>
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
  { icon: Facebook, name: "Facebook groups", state: "Supported", note: "Service-request posts, business asks." },
  { icon: Linkedin, name: "LinkedIn posts", state: "Supported", note: "Hiring asks, agency searches, ICP signals." },
  { icon: MessageSquare, name: "Reddit threads", state: "Supported", note: "Niche subs, freelance asks, vendor recs." },
  { icon: ArrowUpRight, name: "Manual link import", state: "Supported", note: "Paste any post URL or screenshot text." },
  { icon: MessageSquare, name: "Instagram captions", state: "Coming soon", note: "Captions and pinned comments only." },
  { icon: MessageSquare, name: "WhatsApp shared leads", state: "Coming soon", note: "Forward leads from your team groups." },
];

function Platforms() {
  return (
    <section id="platforms" className="border-t border-foreground/15">
      <Container className="py-24 md:py-32">
        <SectionHeader
          index="04"
          kicker="Supported platforms"
          title={<>Capture leads from the places<br /><span className="italic">where buyers already post.</span></>}
        />
        <div className="mt-12 grid grid-cols-1 border-t border-foreground/15 md:grid-cols-3">
          {platforms.map((p, i) => (
            <div
              key={p.name}
              className={`border-b border-foreground/15 p-6 md:p-8 ${(i + 1) % 3 !== 0 ? "md:border-r" : ""} ${i >= platforms.length - 3 ? "md:border-b-0" : ""}`}
            >
              <div className="flex items-start justify-between">
                <p.icon className="h-5 w-5" strokeWidth={1.5} />
                <Mono className={p.state === "Supported" ? "text-foreground" : "text-muted-foreground"}>
                  {p.state === "Supported" ? "● Live" : "○ Soon"}
                </Mono>
              </div>
              <h3 className="mt-5 font-serif text-2xl">{p.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.note}</p>
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
    <section id="scoring">
      <Container className="py-24 md:py-32">
        <SectionHeader
          index="05"
          kicker="How lead scoring works"
          title={<>Six explainable factors. <span className="italic">No black box.</span></>}
          lede="Each score comes with a short reason, so your team trusts the priority order — and can challenge it when needed."
        />
        <div className="mt-12 grid grid-cols-12 gap-6">
          <ol className="col-span-12 divide-y divide-foreground/15 border-y border-foreground/15 md:col-span-8">
            {scoringFactors.map(([t, b], i) => (
              <li key={t} className="grid grid-cols-12 gap-6 py-6">
                <Mono className="col-span-2 text-muted-foreground">F.0{i + 1}</Mono>
                <h3 className="col-span-10 font-serif text-3xl leading-tight md:col-span-4">{t}</h3>
                <p className="col-span-12 text-sm text-muted-foreground md:col-span-6">{b}</p>
              </li>
            ))}
          </ol>
          <aside className="col-span-12 md:col-span-4">
            <div className="sticky top-24 border border-foreground/15 bg-card p-6">
              <Mono className="text-muted-foreground">Sample reasoning</Mono>
              <p className="mt-4 font-serif text-2xl italic leading-snug">
                “Low competition. Based on 8 visible comments at capture time — below the category median of 21.”
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}

/* ---------- outreach ---------- */
function Outreach() {
  const items = [
    { n: "01", angle: "Portfolio update support", excerpt: "Saw your post about needing updates to your portfolio site. Could you share the current link and the specific changes…" },
    { n: "02", angle: "Fast turnaround offer", excerpt: "If you're looking to wrap the updates this week I can usually turn small changes around in 24–48 hours…" },
    { n: "03", angle: "Clear scope & payment", excerpt: "To give you an honest quote I'd love to see the current site and the exact updates needed. I work on milestone-based…" },
  ];
  return (
    <section className="border-t border-foreground/15 bg-card/40">
      <Container className="py-24 md:py-32">
        <SectionHeader
          index="06"
          kicker="Outreach drafts included"
          title={<>Not just leads — <span className="italic">ready-to-send</span> angles.</>}
          lede="Every lead ships with three short, human-sounding message drafts. Pick the angle that fits, tweak the name, and send."
        />
        <div className="mt-12 grid grid-cols-1 gap-0 border-t border-foreground/15 md:grid-cols-3">
          {items.map((d, i) => (
            <div key={d.n} className={`border-b border-foreground/15 p-6 md:p-8 ${i < 2 ? "md:border-r" : ""} md:border-b-0`}>
              <div className="flex items-center justify-between">
                <Mono className="text-accent">Angle {d.n}</Mono>
                <Copy className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <h3 className="mt-4 font-serif text-2xl">{d.angle}</h3>
              <p className="mt-3 text-sm italic text-muted-foreground">“{d.excerpt}”</p>
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
    <section>
      <Container className="py-24 md:py-32">
        <SectionHeader
          index="07"
          kicker="CRM-style dashboard"
          title={<>A real inbox for social leads — <span className="italic">not another spreadsheet.</span></>}
        />
        <div className="mt-12 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <p className="text-base text-muted-foreground">
              Triage by temperature, filter by service or platform, assign to a teammate and export anywhere. Built like the CRMs your team already lives in.
            </p>
            <ul className="mt-8 grid grid-cols-1 divide-y divide-foreground/15 border-y border-foreground/15">
              {dashFeatures.map((f, i) => (
                <li key={f} className="grid grid-cols-[auto,1fr] items-center gap-4 py-2.5">
                  <Mono className="text-muted-foreground">{String(i + 1).padStart(2, "0")}</Mono>
                  <span className="text-sm">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 md:col-span-7">
            <div className="border border-foreground/15 bg-card p-1">
              <div className="flex items-center justify-between border-b border-foreground/15 px-3 py-2">
                <Mono className="text-muted-foreground">growbylead.app / inbox</Mono>
                <Mono>17 new today</Mono>
              </div>
              <ul className="divide-y divide-foreground/10">
                {sampleLeads.map((l, i) => (
                  <li key={i} className={`grid grid-cols-12 items-center gap-3 px-3 py-3 text-sm ${i === 0 ? "bg-foreground text-background" : ""}`}>
                    <Mono className={i === 0 ? "col-span-1 text-background/60" : "col-span-1 text-muted-foreground"}>{String(i + 1).padStart(2, "0")}</Mono>
                    <span className="col-span-6 truncate font-serif text-lg">{l.title}</span>
                    <span className={`col-span-2 text-xs ${i === 0 ? "text-background/70" : "text-muted-foreground"}`}>{l.platform}</span>
                    <span className="col-span-2"><Tag tone={l.temp.toLowerCase() as "hot" | "warm" | "cold"}>{l.temp}</Tag></span>
                    <span className={`col-span-1 text-right font-mono text-[11px] ${i === 0 ? "text-background/70" : "text-muted-foreground"}`}>{l.ago}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

const sampleLeads = [
  { title: "Paid portfolio website developer needed for updates", platform: "Facebook", temp: "Hot", ago: "12m" },
  { title: "Looking for SEO expert — local plumbing business", platform: "Reddit", temp: "Warm", ago: "38m" },
  { title: "Need help managing our Instagram for restaurant", platform: "Facebook", temp: "Warm", ago: "1h" },
  { title: "Shopify store redesign — budget $2k", platform: "LinkedIn", temp: "Hot", ago: "2h" },
  { title: "Anyone do landing pages for SaaS launch?", platform: "Reddit", temp: "Cold", ago: "4h" },
] as const;

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

function Profile() {
  return (
    <section className="border-t border-foreground/15">
      <Container className="py-24 md:py-32">
        <SectionHeader
          index="08"
          kicker="Inside every lead profile"
          title={<>Eight sections, <span className="italic">one consistent shape.</span></>}
        />
        <div className="mt-12 grid grid-cols-2 border-t border-foreground/15 md:grid-cols-4">
          {profileSections.map(([t, b], i) => (
            <div
              key={t}
              className={`border-b border-foreground/15 p-5 md:p-7 ${(i + 1) % 4 !== 0 ? "md:border-r" : ""} ${i % 2 === 0 ? "border-r" : ""} ${i >= profileSections.length - 4 ? "md:border-b-0" : ""}`}
            >
              <Mono className="text-accent">0{i + 1}</Mono>
              <h3 className="mt-3 font-serif text-xl">{t}</h3>
              <p className="mt-2 text-xs text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </Container>
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

function Review() {
  return (
    <section>
      <Container className="py-24 md:py-32">
        <div className="grid grid-cols-12 gap-6 border-t border-foreground pt-6">
          <div className="col-span-12 md:col-span-5">
            <Mono>§ 09 · Data quality</Mono>
            <h2 className="mt-3 font-serif text-4xl leading-[1.02] tracking-tight md:text-6xl">
              We do not <span className="italic">guess</span> critical data.
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              If something is unknown, we mark it clearly — so your team never sends a message based on a fabricated detail.
            </p>
          </div>
          <div className="col-span-12 md:col-span-7">
            <ul className="divide-y divide-foreground/15 border-y border-foreground/15">
              {reviewChecks.map((c, i) => (
                <li key={c} className="grid grid-cols-[auto,1fr] gap-5 py-4">
                  <Mono className="text-muted-foreground">Q.0{i + 1}</Mono>
                  <span className="text-base">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- use cases ---------- */
const useCases = [
  ["Web design agencies", "Find people asking for website design, redesign, portfolio sites and business websites — before they hit Upwork."],
  ["SEO experts", "Surface posts asking for ranking help, local SEO, traffic recovery and Google visibility issues."],
  ["Social media managers", "Catch businesses asking for page management, content calendars and ad creatives."],
  ["Freelancers", "Get to fresh service-request posts before the comments fill up and competition spikes."],
  ["Cold outreach teams", "Use structured lead data and outreach drafts to contact faster, with cleaner context."],
  ["Lead generation agencies", "Build daily lead packs for clients, filtered by category, country and platform."],
];

function UseCases() {
  return (
    <section className="border-t border-foreground/15 bg-foreground text-background">
      <Container className="py-24 md:py-32">
        <header className="grid grid-cols-12 gap-6 border-t border-background/30 pt-6">
          <div className="col-span-12 md:col-span-3"><Mono>§ 10</Mono></div>
          <div className="col-span-12 md:col-span-9">
            <Mono className="text-background/60">Use cases</Mono>
            <h2 className="mt-2 font-serif text-4xl leading-[1.02] tracking-tight md:text-6xl">
              Built for teams that <span className="italic">sell digital services.</span>
            </h2>
          </div>
        </header>
        <div className="mt-12 grid grid-cols-1 border-t border-background/30 md:grid-cols-3">
          {useCases.map(([t, b], i) => (
            <div
              key={t}
              className={`border-b border-background/30 p-6 md:p-8 ${(i + 1) % 3 !== 0 ? "md:border-r" : ""} ${i >= useCases.length - 3 ? "md:border-b-0" : ""}`}
            >
              <Mono className="text-background/60">{String(i + 1).padStart(2, "0")}</Mono>
              <h3 className="mt-3 font-serif text-2xl">{t}</h3>
              <p className="mt-3 text-sm text-background/70">{b}</p>
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
    <section>
      <Container className="py-24 md:py-32">
        <SectionHeader
          index="11"
          kicker="Lead categories we track"
          title={<>The service categories <span className="italic">we classify.</span></>}
        />
        <ul className="mt-10 grid grid-cols-2 border-t border-foreground/15 md:grid-cols-4">
          {categories.map((c, i) => (
            <li
              key={c}
              className={`flex items-baseline gap-3 border-b border-foreground/15 p-4 md:p-6 ${(i + 1) % 4 !== 0 ? "md:border-r" : ""} ${i % 2 === 0 ? "border-r md:border-r" : ""} ${i >= categories.length - 4 ? "md:border-b-0" : ""}`}
            >
              <Mono className="text-muted-foreground">{String(i + 1).padStart(2, "0")}</Mono>
              <span className="font-serif text-xl leading-tight">{c}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ---------- coverage ---------- */
const countries = ["USA", "Canada", "UK", "Australia", "Bangladesh", "India", "UAE", "Global"];

function Coverage() {
  return (
    <section className="border-t border-foreground/15">
      <Container className="py-24 md:py-32">
        <div className="grid grid-cols-12 gap-6 border-t border-foreground pt-6">
          <div className="col-span-12 md:col-span-5">
            <Mono>§ 12 · Global coverage</Mono>
            <h2 className="mt-3 font-serif text-4xl leading-[1.02] tracking-tight md:text-6xl">
              Wherever buyers post, <span className="italic">we organize.</span>
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              Country, city and confidence level are shown clearly when available — and left blank when they're not certain.
            </p>
          </div>
          <div className="col-span-12 md:col-span-7">
            <ul className="grid grid-cols-2 border-y border-foreground/15">
              {countries.map((c, i) => (
                <li
                  key={c}
                  className={`flex items-center justify-between border-b border-foreground/15 px-4 py-4 ${i % 2 === 0 ? "border-r" : ""} ${i >= countries.length - 2 ? "border-b-0" : ""}`}
                >
                  <span className="font-serif text-2xl">{c}</span>
                  <Mono className="text-muted-foreground">Live</Mono>
                </li>
              ))}
            </ul>
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
      cta: "Start a day pass", featured: false,
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
    <section id="pricing" className="border-t border-foreground/15">
      <Container className="py-24 md:py-32">
        <SectionHeader
          index="13"
          kicker="Pricing"
          title={<>Simple pricing <span className="italic">while we're in pre-launch.</span></>}
          lede="Lock in early pricing — plans will change once we open public access."
        />
        <div className="mt-12 grid grid-cols-1 border-t border-foreground/15 md:grid-cols-3">
          {plans.map((p, i) => (
            <div
              key={p.name}
              className={`relative border-b border-foreground/15 p-8 md:p-10 ${i < 2 ? "md:border-r" : ""} md:border-b-0 ${
                p.featured ? "bg-foreground text-background" : ""
              }`}
            >
              {p.featured && (
                <Mono className="absolute right-6 top-6 text-background/70">★ Most popular</Mono>
              )}
              <Mono className={p.featured ? "text-background/60" : "text-muted-foreground"}>{p.name}</Mono>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-serif text-6xl leading-none">{p.price}</span>
                <span className={`text-sm ${p.featured ? "text-background/70" : "text-muted-foreground"}`}>{p.cadence}</span>
              </div>
              <p className={`mt-3 text-sm ${p.featured ? "text-background/80" : "text-muted-foreground"}`}>{p.desc}</p>
              <ul className={`mt-8 divide-y border-y ${p.featured ? "divide-background/20 border-background/20" : "divide-foreground/15 border-foreground/15"}`}>
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 py-2.5 text-sm">
                    <span className="font-mono text-[11px] opacity-60">→</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`mt-8 inline-flex w-full items-center justify-between border px-4 py-3 text-sm font-medium transition ${
                  p.featured
                    ? "border-background bg-background text-foreground hover:bg-accent hover:text-background hover:border-accent"
                    : "border-foreground bg-foreground text-background hover:bg-accent hover:border-accent"
                }`}
              >
                {p.cta} <ArrowUpRight className="h-4 w-4" />
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
    <section className="border-t border-foreground/15">
      <Container className="py-24 md:py-32">
        <SectionHeader index="14" kicker="Frequently asked" title={<>Common <span className="italic">questions.</span></>} />
        <div className="mt-12 divide-y divide-foreground/15 border-y border-foreground/15">
          {faqs.map((f, i) => (
            <div key={i}>
              <button onClick={() => setOpen(open === i ? null : i)} className="grid w-full grid-cols-12 items-center gap-6 py-6 text-left">
                <Mono className="col-span-2 text-muted-foreground md:col-span-1">Q.0{i + 1}</Mono>
                <span className="col-span-9 font-serif text-2xl leading-tight md:col-span-10 md:text-3xl">{f.q}</span>
                <span className="col-span-1 flex justify-end">
                  {open === i ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                </span>
              </button>
              {open === i && (
                <div className="grid grid-cols-12 gap-6 pb-6">
                  <div className="col-span-12 md:col-span-1" />
                  <p className="col-span-12 max-w-2xl text-base text-muted-foreground md:col-span-10">{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- final CTA ---------- */
function FinalCTA() {
  return (
    <section className="border-t border-foreground/15 bg-foreground text-background">
      <Container className="py-32 md:py-40 text-center">
        <Mono className="text-background/60">— § Closing</Mono>
        <h2 className="mt-6 font-serif text-[clamp(2.8rem,8vw,8rem)] leading-[0.92] tracking-tight">
          Stop scrolling groups.<br /><span className="italic text-accent">Start closing.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-background/80">
          Structured, scored, outreach-ready leads — from the social posts you'd otherwise miss.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="#pricing" className="inline-flex items-center gap-2 bg-background px-6 py-3.5 text-sm font-medium text-foreground transition hover:bg-accent hover:text-background">
            Get access <ArrowUpRight className="h-4 w-4" />
          </a>
          <a href="#example" className="inline-flex items-center gap-2 border border-background/40 px-6 py-3.5 text-sm font-medium text-background transition hover:border-background">
            See example lead
          </a>
        </div>
      </Container>
    </section>
  );
}

/* ---------- footer ---------- */
function Footer() {
  const cols = [
    { title: "Product", links: ["Features", "Lead dashboard", "Lead examples", "Pricing", "Changelog"] },
    { title: "Solutions", links: ["For agencies", "For freelancers", "For SEO teams", "For developers", "For outreach"] },
    { title: "Resources", links: ["Blog", "Guides", "Documentation", "API reference", "Support"] },
    { title: "Company", links: ["About", "Contact", "Careers", "Press"] },
    { title: "Legal", links: ["Privacy", "Terms", "Data usage", "Refund", "GDPR"] },
  ];
  return (
    <footer className="border-t border-foreground/15 bg-background">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-[1.6fr,repeat(5,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-6 w-6 place-items-center bg-foreground text-background font-serif text-sm leading-none">G</span>
              <span className="text-sm font-semibold tracking-tight">Grow By Lead</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Social media buying signals, organized into structured, scored, outreach-ready leads.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <Mono className="text-foreground">{c.title}</Mono>
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
        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-foreground/15 pt-6">
          <Mono className="text-muted-foreground">© {new Date().getFullYear()} Grow By Lead</Mono>
          <Mono className="text-muted-foreground">Made for sales teams that move fast</Mono>
        </div>
      </Container>
    </footer>
  );
}
