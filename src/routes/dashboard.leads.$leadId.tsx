import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft, Mail, Phone, MapPin, Globe, Building2, Calendar, User,
  Instagram, Linkedin, Facebook, MessageSquare, PhoneCall, CalendarPlus,
  Edit3, MoreHorizontal, CheckCircle2, Circle, Send, Paperclip,
  TrendingUp, Tag,
} from "lucide-react";
import { PageHeader, Panel, Badge, Avatar, Mono, Stat } from "@/components/dashboard/dash-ui";
import { getLeadById, type LeadSource } from "@/lib/leads-data";

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
    <div className="space-y-4">
      <Link to="/dashboard/leads" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to leads
      </Link>
      <Panel><div className="p-8 text-center text-sm text-muted-foreground">Lead not found.</div></Panel>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <Panel><div className="p-8 text-center text-sm text-muted-foreground">
      {String(error)}
      <button onClick={reset} className="ml-2 underline">retry</button>
    </div></Panel>
  ),
  component: LeadDetailPage,
});

const sourceIcon = (s: LeadSource) =>
  s === "instagram" ? <Instagram className="h-3.5 w-3.5 text-rose-400" /> :
  s === "linkedin" ? <Linkedin className="h-3.5 w-3.5 text-sky-400" /> :
  <Facebook className="h-3.5 w-3.5 text-indigo-400" />;

const ACTIVITY = [
  { type: "message", channel: "Instagram DM", title: "Reply received", body: "Sounds good — can we set up a call next week? Tuesday morning works.", at: "2m ago" },
  { type: "email", channel: "Email", title: "Proposal sent", body: "Sent the customized proposal with the Growth plan tier and onboarding timeline.", at: "1d ago" },
  { type: "call", channel: "Phone", title: "Discovery call · 28 min", body: "Walked through current outreach pain points. Lead confirmed ~$15K monthly ad spend across IG + LinkedIn.", at: "3d ago" },
  { type: "stage", channel: "Pipeline", title: "Moved to Negotiation", body: "Stage changed from Proposal to Negotiation by Nasir.", at: "3d ago" },
  { type: "note", channel: "Internal note", title: "Sara added a note", body: "Decision maker is the founder. Wants to launch before Q3.", at: "5d ago" },
  { type: "source", channel: "Source", title: "Lead captured", body: "Captured from Instagram comment on @growbylead post.", at: "12d ago" },
];

const TASKS = [
  { title: "Send onboarding doc", due: "Today", done: false },
  { title: "Follow up on proposal", due: "Tomorrow", done: false },
  { title: "Schedule kickoff call", due: "Fri", done: false },
  { title: "Send intro deck", due: "Yesterday", done: true },
];

const DEALS = [
  { name: "Growth plan · annual", value: "$12,500", stage: "Negotiation", prob: 70 },
  { name: "Onboarding services", value: "$2,400", stage: "Proposal", prob: 50 },
];

function LeadDetailPage() {
  const { lead } = Route.useLoaderData();

  return (
    <div className="space-y-6">
      <Link to="/dashboard/leads" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to leads
      </Link>

      <PageHeader
        kicker="Lead"
        title={lead.name}
        description={`${lead.role} · ${lead.company}`}
        actions={
          <>
            <button className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-card/50 px-3 text-sm hover:bg-card">
              <Edit3 className="h-3.5 w-3.5" /> Edit
            </button>
            <button className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-card/50 px-3 text-sm hover:bg-card">
              <PhoneCall className="h-3.5 w-3.5" /> Call
            </button>
            <button className="inline-flex h-9 items-center gap-1.5 rounded-md bg-foreground px-3 text-sm font-medium text-background hover:bg-foreground/90">
              <Send className="h-3.5 w-3.5" /> Message
            </button>
            <button className="grid h-9 w-9 place-items-center rounded-md border border-border bg-card/50 hover:bg-card" aria-label="More">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </>
        }
      />

      {/* Identity card */}
      <Panel>
        <div className="flex flex-wrap items-start gap-5 p-5">
          <Avatar name={lead.name} className="h-16 w-16 text-base" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold tracking-tight">{lead.name}</h2>
              <Badge tone={lead.status}>{lead.status}</Badge>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                {sourceIcon(lead.source)} <span className="capitalize">{lead.source}</span>
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{lead.about}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {lead.tags.map((t) => (<Badge key={t} tone="muted"><Tag className="h-2.5 w-2.5" />{t}</Badge>))}
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card/50 px-4 py-3">
            <div>
              <Mono className="text-muted-foreground">Lead score</Mono>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-semibold">{lead.score}</span>
                <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
              </div>
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="h-12 w-1.5 overflow-hidden rounded-full bg-card">
              <div className={`h-full ${lead.score > 75 ? "bg-emerald-500" : lead.score > 50 ? "bg-amber-500" : "bg-sky-500"}`} style={{ width: "100%", height: `${lead.score}%` }} />
            </div>
          </div>
        </div>
      </Panel>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Deal value" value={`$${lead.dealValue.toLocaleString()}`} delta="+8% vs avg" />
        <Stat label="Stage" value={lead.stage} delta={`Owner · ${lead.owner}`} trend="flat" />
        <Stat label="Touchpoints" value="14" delta="6 in last 7d" />
        <Stat label="Last activity" value={lead.updated} delta="Reply received" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Activity timeline */}
        <div className="space-y-6 lg:col-span-2">
          <Panel title="Activity timeline" description="Every interaction with this lead — across channels.">
            <ol className="relative px-5 py-4">
              <span className="absolute left-[34px] top-4 bottom-4 w-px bg-border" aria-hidden />
              {ACTIVITY.map((a, i) => (
                <li key={i} className="relative flex gap-4 py-3">
                  <span className="z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border bg-background text-muted-foreground">
                    {a.type === "message" ? <MessageSquare className="h-3.5 w-3.5" /> :
                     a.type === "email" ? <Mail className="h-3.5 w-3.5" /> :
                     a.type === "call" ? <PhoneCall className="h-3.5 w-3.5" /> :
                     a.type === "stage" ? <TrendingUp className="h-3.5 w-3.5 text-emerald-400" /> :
                     a.type === "source" ? <User className="h-3.5 w-3.5" /> :
                     <Edit3 className="h-3.5 w-3.5" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium">{a.title}</span>
                      <Mono className="text-muted-foreground">{a.channel}</Mono>
                      <Mono className="ml-auto text-muted-foreground">{a.at}</Mono>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Panel>

          {/* Composer */}
          <Panel title="Send a message" description="Reply via the lead's preferred channel.">
            <div className="p-4">
              <div className="mb-3 flex items-center gap-2">
                {(["instagram", "linkedin", "facebook"] as LeadSource[]).map((s) => (
                  <button key={s} className={`inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-xs capitalize ${s === lead.source ? "border-foreground/40 bg-foreground/10" : "border-border bg-card/50 text-muted-foreground"}`}>
                    {sourceIcon(s)} {s}
                  </button>
                ))}
              </div>
              <textarea
                rows={3}
                placeholder={`Write a message to ${lead.name.split(" ")[0]}…`}
                className="w-full resize-none rounded-md border border-border bg-card/50 p-3 text-sm placeholder:text-muted-foreground focus:border-foreground/40 focus:outline-none"
              />
              <div className="mt-3 flex items-center justify-between">
                <button className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-card/50 px-2.5 text-xs text-muted-foreground hover:text-foreground">
                  <Paperclip className="h-3.5 w-3.5" /> Attach
                </button>
                <button className="inline-flex h-8 items-center gap-1.5 rounded-md bg-foreground px-3 text-xs font-medium text-background hover:bg-foreground/90">
                  <Send className="h-3 w-3" /> Send
                </button>
              </div>
            </div>
          </Panel>

          {/* Deals */}
          <Panel title="Open deals" description="Opportunities associated with this lead.">
            <ul className="divide-y divide-border">
              {DEALS.map((d) => (
                <li key={d.name} className="flex items-center gap-4 px-5 py-3.5">
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{d.name}</div>
                    <Mono className="text-muted-foreground">{d.stage} · {d.prob}% likely</Mono>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{d.value}</div>
                    <div className="mt-1 h-1 w-24 overflow-hidden rounded-full bg-card">
                      <div className="h-full bg-emerald-500" style={{ width: `${d.prob}%` }} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <Panel title="Contact details">
            <ul className="divide-y divide-border text-sm">
              <DetailRow icon={<Mail className="h-3.5 w-3.5" />} label="Email" value={<a className="hover:text-foreground" href={`mailto:${lead.email}`}>{lead.email}</a>} />
              <DetailRow icon={<Phone className="h-3.5 w-3.5" />} label="Phone" value={lead.phone} />
              <DetailRow icon={<Building2 className="h-3.5 w-3.5" />} label="Company" value={lead.company} />
              <DetailRow icon={<Globe className="h-3.5 w-3.5" />} label="Website" value={<a className="hover:text-foreground" href={`https://${lead.website}`} target="_blank" rel="noreferrer">{lead.website}</a>} />
              <DetailRow icon={<MapPin className="h-3.5 w-3.5" />} label="Location" value={lead.city} />
              <DetailRow icon={<User className="h-3.5 w-3.5" />} label="Owner" value={lead.owner} />
              <DetailRow icon={<Calendar className="h-3.5 w-3.5" />} label="Created" value={lead.createdAt} />
            </ul>
          </Panel>

          <Panel
            title="Tasks"
            actions={
              <button className="inline-flex h-7 items-center gap-1 rounded-md border border-border bg-card/50 px-2 text-xs text-muted-foreground hover:text-foreground">
                <CalendarPlus className="h-3 w-3" /> Add
              </button>
            }
          >
            <ul className="divide-y divide-border">
              {TASKS.map((t) => (
                <li key={t.title} className="flex items-center gap-3 px-5 py-3 text-sm">
                  {t.done
                    ? <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    : <Circle className="h-4 w-4 text-muted-foreground" />}
                  <span className={`flex-1 ${t.done ? "text-muted-foreground line-through" : ""}`}>{t.title}</span>
                  <Mono className="text-muted-foreground">{t.due}</Mono>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Internal notes">
            <div className="space-y-3 p-4 text-sm">
              <textarea
                rows={3}
                placeholder="Add a note for your team…"
                className="w-full resize-none rounded-md border border-border bg-card/50 p-3 text-sm placeholder:text-muted-foreground focus:border-foreground/40 focus:outline-none"
              />
              <div className="flex justify-end">
                <button className="inline-flex h-8 items-center gap-1.5 rounded-md bg-foreground px-3 text-xs font-medium text-background hover:bg-foreground/90">
                  Save note
                </button>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3 px-5 py-3">
      <span className="text-muted-foreground">{icon}</span>
      <span className="w-20 shrink-0 text-xs uppercase tracking-tight text-muted-foreground">{label}</span>
      <span className="min-w-0 flex-1 truncate text-right text-sm text-foreground">{value}</span>
    </li>
  );
}
