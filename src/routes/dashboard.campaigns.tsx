import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Send, Mail, Linkedin, MessageSquare, Play, Pause, Search } from "lucide-react";
import { PageHeader, Panel, Badge, Stat, Mono } from "@/components/dashboard/dash-ui";

export const Route = createFileRoute("/dashboard/campaigns")({
  component: CampaignsPage,
});

type Channel = "email" | "linkedin" | "dm";
type Status = "active" | "paused" | "draft" | "completed";

const CAMPAIGNS: { name: string; channel: Channel; status: Status; sent: number; open: number; reply: number; booked: number; started: string }[] = [
  { name: "Q3 SaaS founders", channel: "email", status: "active", sent: 1240, open: 42, reply: 8.4, booked: 18, started: "Aug 12" },
  { name: "LinkedIn agency owners", channel: "linkedin", status: "active", sent: 612, open: 58, reply: 14.2, booked: 26, started: "Aug 18" },
  { name: "Instagram boutique brands", channel: "dm", status: "paused", sent: 380, open: 71, reply: 11.6, booked: 12, started: "Aug 22" },
  { name: "Restaurant local outreach", channel: "email", status: "draft", sent: 0, open: 0, reply: 0, booked: 0, started: "—" },
  { name: "Realtor warm follow-up", channel: "email", status: "completed", sent: 884, open: 39, reply: 6.1, booked: 9, started: "Jul 30" },
  { name: "LinkedIn fintech leads", channel: "linkedin", status: "active", sent: 320, open: 51, reply: 12.0, booked: 14, started: "Aug 25" },
  { name: "Holiday IG promo", channel: "dm", status: "draft", sent: 0, open: 0, reply: 0, booked: 0, started: "—" },
];

const channelIcon = (c: Channel) =>
  c === "email" ? <Mail className="h-3.5 w-3.5" /> : c === "linkedin" ? <Linkedin className="h-3.5 w-3.5" /> : <MessageSquare className="h-3.5 w-3.5" />;

const statusTone = (s: Status): "success" | "warm" | "muted" | "cold" =>
  s === "active" ? "success" : s === "paused" ? "warm" : s === "draft" ? "muted" : "cold";

const STATUS_TABS: ("all" | Status)[] = ["all", "active", "paused", "draft", "completed"];
const CHANNEL_TABS: ("all" | Channel)[] = ["all", "email", "linkedin", "dm"];

function CampaignsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | Status>("all");
  const [channel, setChannel] = useState<"all" | Channel>("all");
  const [sortKey, setSortKey] = useState<"booked" | "reply" | "sent" | "open">("booked");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = CAMPAIGNS.filter((c) =>
      (status === "all" || c.status === status) &&
      (channel === "all" || c.channel === channel) &&
      (!q || c.name.toLowerCase().includes(q))
    );
    list = [...list].sort((a, b) => b[sortKey] - a[sortKey]);
    return list;
  }, [query, status, channel, sortKey]);

  const counts = useMemo(() => {
    const m: Record<string, number> = { all: CAMPAIGNS.length };
    for (const s of ["active", "paused", "draft", "completed"] as Status[]) m[s] = CAMPAIGNS.filter((c) => c.status === s).length;
    return m;
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Campaigns"
        title="Outreach campaigns"
        description="Multi-channel sequences across email, LinkedIn, and DMs."
        actions={
          <button className="inline-flex h-9 items-center gap-1.5 rounded-md bg-foreground px-3 text-sm font-medium text-background hover:bg-foreground/90">
            <Plus className="h-3.5 w-3.5" /> New campaign
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Sent (7d)" value="3,116" delta="▲ 18%" trend="up" icon={<Send className="h-4 w-4" />} />
        <Stat label="Open rate" value="48.2%" delta="▲ 3.1pts" trend="up" />
        <Stat label="Reply rate" value="9.8%" delta="▲ 0.6pts" trend="up" />
        <Stat label="Meetings booked" value="65" delta="▲ 22%" trend="up" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search campaigns…" className="h-9 w-full rounded-md border border-border bg-card/50 pl-9 pr-3 text-sm focus:border-foreground/40 focus:outline-none" />
        </div>
        <div className="flex items-center gap-1 rounded-md border border-border bg-card/50 p-0.5">
          {STATUS_TABS.map((s) => (
            <button key={s} onClick={() => setStatus(s)} className={`h-8 rounded px-2.5 text-xs capitalize transition ${status === s ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>
              {s} <span className="ml-1 opacity-60">{counts[s] ?? 0}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 rounded-md border border-border bg-card/50 p-0.5">
          {CHANNEL_TABS.map((c) => (
            <button key={c} onClick={() => setChannel(c)} className={`inline-flex h-8 items-center gap-1.5 rounded px-2.5 text-xs capitalize transition ${channel === c ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>
              {c !== "all" && channelIcon(c as Channel)} {c}
            </button>
          ))}
        </div>
        <select value={sortKey} onChange={(e) => setSortKey(e.target.value as typeof sortKey)} className="h-9 rounded-md border border-border bg-card/50 px-3 text-sm">
          <option value="booked">Sort: Booked</option>
          <option value="reply">Sort: Reply %</option>
          <option value="open">Sort: Open %</option>
          <option value="sent">Sort: Sent</option>
        </select>
      </div>

      <Panel title={`${filtered.length} campaign${filtered.length === 1 ? "" : "s"}`}>
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-sm text-muted-foreground">No campaigns match your filters.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-card/30 text-left">
                  {["Campaign", "Status", "Sent", "Open %", "Reply %", "Booked", "Started", ""].map((h) => (
                    <th key={h} className="px-4 py-3 font-mono text-[11px] uppercase tracking-tight text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.name} className="border-b border-border last:border-0 hover:bg-card/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className="grid h-8 w-8 place-items-center rounded-md border border-border bg-card text-muted-foreground">{channelIcon(c.channel)}</span>
                        <div>
                          <div className="font-medium">{c.name}</div>
                          <Mono className="text-muted-foreground capitalize">{c.channel}</Mono>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><Badge tone={statusTone(c.status)}>{c.status}</Badge></td>
                    <td className="px-4 py-3 font-mono text-xs">{c.sent.toLocaleString()}</td>
                    <td className="px-4 py-3 font-mono text-xs">{c.open}%</td>
                    <td className="px-4 py-3 font-mono text-xs">{c.reply}%</td>
                    <td className="px-4 py-3 font-mono text-xs">{c.booked}</td>
                    <td className="px-4 py-3"><Mono className="text-muted-foreground">{c.started}</Mono></td>
                    <td className="px-4 py-3 text-right">
                      <button className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-card hover:text-foreground">
                        {c.status === "active" ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}
