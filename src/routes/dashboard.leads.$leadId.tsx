import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft, Quote, Zap, MessageSquare, Heart, Share2, TrendingUp, Clock,
  Star, ExternalLink, ChevronDown, ChevronUp, ClipboardList, AlertTriangle,
  Sparkles, ListChecks, Smartphone, Globe2, FileText, Send,
  Briefcase, FileSignature, Users, Gauge, Lightbulb, Copy, Check,
  CheckCircle2, XCircle, Instagram, Linkedin, Facebook, Youtube, Twitter,
  Github, MessageCircle, Send as SendIcon, Hash, ArrowLeftRight,
} from "lucide-react";
import { getLeadById, type Lead, type LeadPlatform } from "@/lib/leads-data";

export const Route = createFileRoute("/dashboard/leads/$leadId")({
  loader: ({ params }) => {
    const lead = getLeadById(params.leadId);
    if (!lead) throw notFound();
    return { lead };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.lead.name ?? "Lead"} — Grow By Lead CRM` },
      { name: "robots", content: "noindex" },
    ],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl py-12 text-center text-sm text-muted-foreground">
      Lead not found.
      <div className="mt-3">
        <Link to="/dashboard/leads" className="text-emerald-300 hover:underline">Back to all leads</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="mx-auto max-w-2xl py-12 text-center text-sm text-muted-foreground">
      {String(error)} <button onClick={reset} className="ml-2 underline">retry</button>
    </div>
  ),
  component: LeadDetailPage,
});

/* ─────────────────────── derive view-model from existing fields ─────────────────────── */

const PLATFORM_LUCIDE: Partial<Record<LeadPlatform, typeof Globe2>> = {
  facebook: Facebook, linkedin: Linkedin, instagram: Instagram, twitter: Twitter,
  x: Twitter, youtube: Youtube, github: Github, whatsapp: MessageCircle,
  telegram: SendIcon, discord: MessageCircle, threads: Hash, reddit: MessageCircle,
  other: Globe2,
};
function PlatformGlyph({ p, className = "h-3.5 w-3.5" }: { p: LeadPlatform; className?: string }) {
  const I = PLATFORM_LUCIDE[p];
  return I ? <I className={className} /> : <Globe2 className={className} />;
}

type Derived = {
  tempLabel: "Hot lead" | "Warm lead" | "Cold lead";
  tempCls: string;
  qualLabel: string;
  qualCls: string;
  urgency: "High" | "Medium" | "Low";
  urgencyCls: string;
  competition: "High" | "Medium" | "Low";
  competitionCls: string;
  competitionReason: string;
  nextAction: string;
  reactions: number;
  shares: number;
  locationConf: "High" | "Medium" | "Low";
  postType: string;
  channel: string;
  portfolioReq: boolean;
  proposalReq: boolean;
  handle: string;
  drafts: { topic: string; subject: string; message: string }[];
};

function derive(lead: Lead): Derived {
  const temp =
    lead.status === "hot"  ? { tempLabel: "Hot lead"  as const, tempCls: "border-rose-500/40 bg-rose-500/10 text-rose-200" } :
    lead.status === "warm" ? { tempLabel: "Warm lead" as const, tempCls: "border-amber-500/40 bg-amber-500/10 text-amber-200" } :
                              { tempLabel: "Cold lead" as const, tempCls: "border-sky-500/40 bg-sky-500/10 text-sky-200" };

  const qual = lead.qualification === "qualified"
    ? { qualLabel: "Qualified", qualCls: "border-emerald-500/40 bg-emerald-500/10 text-emerald-200" }
    : lead.qualification === "disqualified"
    ? { qualLabel: "Disqualified", qualCls: "border-rose-500/40 bg-rose-500/10 text-rose-200" }
    : { qualLabel: "Unreviewed", qualCls: "border-border bg-background/60 text-muted-foreground" };

  const urgency = lead.intent;
  const urgencyCls =
    urgency === "High"   ? "border-rose-500/40 bg-rose-500/10 text-rose-200" :
    urgency === "Medium" ? "border-amber-500/40 bg-amber-500/10 text-amber-200" :
                            "border-sky-500/40 bg-sky-500/10 text-sky-200";

  const competition: "High" | "Medium" | "Low" =
    lead.comments >= 10 ? "High" : lead.comments >= 4 ? "Medium" : "Low";
  const competitionCls =
    competition === "High"   ? "border-rose-500/40 bg-rose-500/10 text-rose-200" :
    competition === "Medium" ? "border-amber-500/40 bg-amber-500/10 text-amber-200" :
                                "border-emerald-500/40 bg-emerald-500/10 text-emerald-200";
  const competitionReason =
    lead.comments === 0
      ? "No replies on the original post yet — you'd likely be the first to reach out."
      : `The post has ${lead.comments} visible comments, showing some active interest from other ${lead.category.toLowerCase()} providers.`;

  const nextAction =
    `Contact ${lead.name.split(" ")[0]} with relevant ${lead.category.toLowerCase()} experience, reference what they wrote in the post, and ask about budget, timeline and how they want to be contacted on ${lead.platform}.`;

  const handle =
    "@" + lead.name.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 14) +
    String((lead.score * 7) % 999).padStart(3, "0");

  const reactions = Math.max(0, Math.round(lead.score / 12) + (lead.favourite ? 4 : 0));
  const shares = Math.max(0, Math.round(lead.score / 30));

  const locationConf: "High" | "Medium" | "Low" =
    lead.country === "All" || !lead.country ? "Low" : lead.city ? "High" : "Medium";

  const postType =
    lead.category === "SaaS" || lead.category === "E-commerce"
      ? "Tooling / product request"
      : "Service requirement post";

  const channel =
    lead.platform === "linkedin" ? "LinkedIn InMail" :
    lead.platform === "instagram" ? "Instagram DM" :
    lead.platform === "facebook"  ? "Facebook Messenger" :
    lead.platform === "reddit"    ? "Reddit chat" :
    lead.platform === "youtube"   ? "YouTube about-page email" :
    lead.platform === "twitter" || lead.platform === "x" ? "X DM" :
    "Social media message";

  const portfolioReq = /portfolio|design|video|website|graphic/i.test(lead.category) || lead.score > 70;
  const proposalReq  = lead.stage === "Proposal" || lead.stage === "Negotiation";

  const first = lead.name.split(" ")[0];
  const drafts = [
    {
      topic: `${lead.category} fit for ${lead.company}`,
      subject: `${lead.category} support for ${lead.company}`,
      message:
        `Hi ${first}, I saw your post about looking for a ${lead.category.toLowerCase()} for ${lead.company}. ` +
        `I work with ${lead.category.toLowerCase().includes("market") ? "founder-led teams" : "small teams"} on exactly this kind of project. ` +
        `Could you share the timeline, the main goals for the first month, and how you'd prefer we keep in touch?`,
    },
    {
      topic: "Long-term partnership angle",
      subject: `Long-term ${lead.category.toLowerCase()} partner`,
      message:
        `Hi ${first}, I noticed you're looking for someone who can grow with ${lead.company} long-term. ` +
        `I'd love to learn a bit more about the role, expected workload and what success looks like in 90 days — ` +
        `happy to share a few relevant samples first if that's easier.`,
    },
    {
      topic: `${lead.platform} audience focus`,
      subject: `${lead.category} ideas for your ${lead.platform} audience`,
      message:
        `Hi ${first}, your ${lead.platform} presence stands out — I can help shape ${lead.category.toLowerCase()} ideas that fit how ${lead.company}'s audience already engages there. ` +
        `Want me to send over 2–3 starter concepts and a short plan for the first two weeks?`,
    },
  ];

  return {
    ...temp, ...qual, urgency, urgencyCls, competition, competitionCls, competitionReason, nextAction,
    reactions, shares, locationConf, postType, channel, portfolioReq, proposalReq, handle, drafts,
  };
}

/* ─────────────────────── page ─────────────────────── */

function LeadDetailPage() {
  const { lead } = Route.useLoaderData();
  const d = derive(lead);
  const [favourite, setFavourite] = useState<boolean>(lead.favourite);
  const [vote, setVote] = useState<"qualified" | "disqualified" | null>(
    lead.qualification === "qualified" ? "qualified" :
    lead.qualification === "disqualified" ? "disqualified" : null,
  );
  const [expanded, setExpanded] = useState(false);
  const [openSections, setOpenSections] = useState({ details: true, classification: true, drafts: true });
  const fullText = `${lead.headline} ${lead.about}`;
  const isLong = fullText.length > 220;

  return (
    <div className="mx-auto max-w-[1100px] space-y-5">
      <Link to="/dashboard/leads" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> All leads
      </Link>

      {/* ── Hero quote card ── */}
      <section className="rounded-2xl border border-border bg-card/40 p-5">
        <header className="flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${d.tempCls}`}>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
            {d.tempLabel}
          </span>
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] ${d.qualCls}`}>
            <ArrowLeftRight className="h-3 w-3" /> {d.qualLabel}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-1 text-[11px] text-muted-foreground">
            <PlatformGlyph p={lead.platform} className="h-3 w-3" />
            <span className="capitalize">{lead.platform}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-1 text-[11px] text-muted-foreground">
            <Globe2 className="h-3 w-3" /> {lead.country}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-1 text-[11px] text-muted-foreground">
            <Briefcase className="h-3 w-3" /> {lead.category}
            <span className="text-muted-foreground/60">›</span>
            <span className="text-foreground/80">{lead.topic}</span>
          </span>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setFavourite((f) => !f)}
              className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-background/60 px-2.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <Star className={`h-3.5 w-3.5 ${favourite ? "fill-amber-400 text-amber-400" : ""}`} />
              {favourite ? "Saved" : "Save"}
            </button>
            <a
              href={`https://${lead.website}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-background/60 px-2.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Source
            </a>
          </div>
        </header>

        {/* Quote */}
        <div className="mt-4 flex gap-3">
          <Quote className="mt-1 h-4 w-4 shrink-0 text-emerald-400" />
          <div className="min-w-0">
            <p className={`text-[15px] leading-relaxed text-foreground/90 ${expanded || !isLong ? "" : "line-clamp-3"}`}>
              {lead.headline}{lead.about ? ` ${lead.about}` : ""}
            </p>
            {isLong && (
              <button
                onClick={() => setExpanded((e) => !e)}
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-emerald-300 hover:underline"
              >
                {expanded ? "See less" : "See more"}
              </button>
            )}
          </div>
        </div>

        {/* Topic pill */}
        <div className="mt-4">
          <span className="inline-flex items-center gap-2 rounded-lg bg-background/60 px-3 py-2 text-sm ring-1 ring-border">
            <Zap className="h-3.5 w-3.5 text-emerald-400" /> {lead.topic}
          </span>
        </div>

        {/* Stat tiles */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatBlock icon={<MessageSquare className="h-4 w-4 text-sky-300" />} value={lead.comments} label="Comments" tone="sky" />
          <StatBlock icon={<Heart className="h-4 w-4 text-rose-300" />} value={d.reactions} label="Reactions" tone="rose" />
          <StatBlock icon={<Share2 className="h-4 w-4 text-indigo-300" />} value={d.shares} label="Shares" tone="indigo" />
          <StatBlock icon={<TrendingUp className="h-4 w-4 text-emerald-300" />} value={lead.intent} label="Intent" tone="emerald" />
        </div>

        {/* Footer meta */}
        <footer className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><Clock className="h-3 w-3" /> {lead.postedAt}</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-foreground/10 text-[10px] font-semibold uppercase text-foreground">
              {d.handle[1]}
            </span>
            {d.handle}
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5">
            Owner · <span className="text-foreground">{lead.owner}</span>
          </span>
        </footer>
      </section>

      {/* ── Lead Details ── */}
      <Section
        title="Lead Details"
        icon={<FileText className="h-4 w-4 text-emerald-400" />}
        open={openSections.details}
        onToggle={() => setOpenSections((s) => ({ ...s, details: !s.details }))}
      >
        <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
          <FactTile icon={<Smartphone className="h-4 w-4 text-emerald-300" />} label="Platform preference" value={cap(lead.platform)} />
          <FactTile icon={<Globe2 className="h-4 w-4 text-emerald-300" />} label="Location confidence" value={d.locationConf} sub={lead.city || lead.country} />
          <FactTile icon={<FileText className="h-4 w-4 text-emerald-300" />} label="Post type" value={d.postType} />
          <FactTile icon={<Send className="h-4 w-4 text-emerald-300" />} label="Best outreach channel" value={d.channel} />
        </div>
        <div className="grid gap-3 px-4 pb-4 sm:grid-cols-2">
          <YesNoTile
            icon={<Briefcase className="h-4 w-4" />}
            label="Portfolio requested"
            value={d.portfolioReq}
            yesText="Portfolio expected"
            noText="Not requested"
          />
          <YesNoTile
            icon={<FileSignature className="h-4 w-4" />}
            label="Proposal requested"
            value={d.proposalReq}
            yesText="Proposal expected"
            noText="Not requested"
          />
        </div>
      </Section>

      {/* ── Classification + Qualification ── */}
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Section
            title="Classification"
            icon={<Gauge className="h-4 w-4 text-emerald-400" />}
            open={openSections.classification}
            onToggle={() => setOpenSections((s) => ({ ...s, classification: !s.classification }))}
          >
            <div className="grid gap-3 p-4 sm:grid-cols-2">
              <KVRow label="Urgency" pill={<Pill cls={d.urgencyCls} icon={<AlertTriangle className="h-3 w-3" />}>{d.urgency}</Pill>} />
              <KVRow label="Competition level" pill={<Pill cls={d.competitionCls} icon={<Users className="h-3 w-3" />}>{d.competition}</Pill>} />
            </div>
            <div className="space-y-3 p-4 pt-0">
              <FactBlock
                icon={<AlertTriangle className="h-3.5 w-3.5 text-amber-300" />}
                label="Competition reason"
                body={d.competitionReason}
              />
              <FactBlock
                icon={<Lightbulb className="h-3.5 w-3.5 text-emerald-300" />}
                label="Recommended next action"
                body={d.nextAction}
              />
            </div>
          </Section>
        </div>

        <aside className="rounded-2xl border border-border bg-card/40 p-4">
          <header className="flex items-center gap-2 border-b border-border pb-3">
            <ListChecks className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-semibold tracking-tight">Qualification votes</h3>
          </header>
          <div className="mt-3 space-y-2">
            <VoteRow
              label="Qualified"
              icon={<CheckCircle2 className="h-4 w-4 text-emerald-400" />}
              count={vote === "qualified" ? 1 : 0}
              active={vote === "qualified"}
              onClick={() => setVote(vote === "qualified" ? null : "qualified")}
            />
            <VoteRow
              label="Disqualified"
              icon={<XCircle className="h-4 w-4 text-rose-400" />}
              count={vote === "disqualified" ? 1 : 0}
              active={vote === "disqualified"}
              onClick={() => setVote(vote === "disqualified" ? null : "disqualified")}
            />
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">
            {vote ? "Your vote is in — others on the team can still weigh in." : "Click a status to cast your vote."}
          </p>
        </aside>
      </div>

      {/* ── Outreach Drafts ── */}
      <Section
        title="Outreach Drafts"
        badge={d.drafts.length}
        icon={<Sparkles className="h-4 w-4 text-emerald-400" />}
        open={openSections.drafts}
        onToggle={() => setOpenSections((s) => ({ ...s, drafts: !s.drafts }))}
      >
        <div className="space-y-3 p-4">
          {d.drafts.map((dr, i) => (
            <DraftCard key={i} index={i + 1} draft={dr} />
          ))}
        </div>
      </Section>

      <div>
        <Link to="/dashboard/leads" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to all leads
        </Link>
      </div>
    </div>
  );
}

/* ─────────────────────── small components ─────────────────────── */

function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }

function Section({
  title, icon, open, onToggle, badge, children,
}: {
  title: string;
  icon: React.ReactNode;
  open: boolean;
  onToggle: () => void;
  badge?: number;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card/30">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 border-b border-border px-4 py-3 text-left hover:bg-card/40"
      >
        <span className="flex items-center gap-2">
          {icon}
          <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
          {typeof badge === "number" && (
            <span className="rounded-md bg-foreground/10 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">{badge}</span>
          )}
        </span>
        {open ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
      </button>
      {open && children}
    </section>
  );
}

const tones = {
  sky: "from-sky-500/15 to-sky-500/0 ring-sky-500/20",
  rose: "from-rose-500/15 to-rose-500/0 ring-rose-500/20",
  indigo: "from-indigo-500/15 to-indigo-500/0 ring-indigo-500/20",
  emerald: "from-emerald-500/15 to-emerald-500/0 ring-emerald-500/20",
} as const;

function StatBlock({
  icon, value, label, tone,
}: { icon: React.ReactNode; value: number | string; label: string; tone: keyof typeof tones }) {
  return (
    <div className={`flex items-center gap-3 rounded-xl bg-gradient-to-br ${tones[tone]} p-4 ring-1`}>
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-background/40">{icon}</span>
      <div>
        <div className="text-xl font-semibold leading-tight">{value}</div>
        <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

function FactTile({
  icon, label, value, sub,
}: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-border bg-background/40 p-3.5">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-md bg-foreground/5">{icon}</span>
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="truncate text-sm font-medium text-foreground">{value}</div>
        </div>
      </div>
      {sub && <div className="mt-1.5 truncate pl-10 text-[11px] text-muted-foreground">{sub}</div>}
    </div>
  );
}

function YesNoTile({
  icon, label, value, yesText, noText,
}: { icon: React.ReactNode; label: string; value: boolean; yesText: string; noText: string }) {
  return (
    <div className={`flex items-center gap-3 rounded-xl border p-3.5 ${value ? "border-emerald-500/30 bg-emerald-500/5" : "border-border bg-background/40"}`}>
      <span className={`grid h-8 w-8 place-items-center rounded-md ${value ? "bg-emerald-500/15 text-emerald-300" : "bg-foreground/5 text-muted-foreground"}`}>{icon}</span>
      <div className="min-w-0 flex-1">
        <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="text-sm font-medium text-foreground">{value ? yesText : noText}</div>
      </div>
      {value
        ? <CheckCircle2 className="h-4 w-4 text-emerald-400" />
        : <XCircle className="h-4 w-4 text-muted-foreground/60" />}
    </div>
  );
}

function KVRow({ label, pill }: { label: string; pill: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-background/40 px-3.5 py-3">
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      {pill}
    </div>
  );
}

function Pill({ cls, icon, children }: { cls: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium ${cls}`}>
      {icon} {children}
    </span>
  );
}

function FactBlock({ icon, label, body }: { icon: React.ReactNode; label: string; body: string }) {
  return (
    <div className="rounded-xl border border-border bg-background/40 p-3.5">
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{body}</p>
    </div>
  );
}

function VoteRow({
  label, icon, count, active, onClick,
}: { label: string; icon: React.ReactNode; count: number; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition ${active ? "border-foreground/40 bg-foreground/10" : "border-border bg-background/40 hover:bg-background/70"}`}
    >
      <span className="inline-flex items-center gap-2">{icon}{label}</span>
      <span className="font-mono text-[11px] text-muted-foreground">{count} vote{count === 1 ? "" : "s"}</span>
    </button>
  );
}

function DraftCard({ index, draft }: { index: number; draft: { topic: string; subject: string; message: string } }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${draft.subject}\n\n${draft.message}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* noop */ }
  };
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-background/40">
      <header className="flex items-center justify-between gap-3 border-b border-border bg-card/30 px-4 py-2.5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-mono uppercase tracking-wider">Draft {index}</span>
          <span>·</span>
          <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-200">
            <ClipboardList className="h-3 w-3" /> {draft.topic}
          </span>
        </div>
        <button
          onClick={copy}
          className="inline-flex h-7 items-center gap-1.5 rounded-md border border-border bg-background px-2 text-xs text-muted-foreground hover:text-foreground"
        >
          {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </header>
      <div className="space-y-3 px-4 py-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Subject</div>
          <div className="mt-0.5 text-sm font-semibold text-foreground">{draft.subject}</div>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Message</div>
          <p className="mt-0.5 whitespace-pre-line text-sm leading-relaxed text-foreground/85">{draft.message}</p>
        </div>
      </div>
    </article>
  );
}
