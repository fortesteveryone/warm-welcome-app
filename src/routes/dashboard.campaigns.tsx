import { createFileRoute } from "@tanstack/react-router";
import { Plus, Send, Mail, Linkedin, MessageSquare, Play, Pause } from "lucide-react";
import { PageHeader, Panel, Badge, Stat, Mono } from "@/components/dashboard/dash-ui";

export const Route = createFileRoute("/dashboard/campaigns")({
  component: CampaignsPage,
});

const CAMPAIGNS = [
  { name: "Q3 SaaS founders", channel: "email" as const, status: "active", sent: 1240, open: 42, reply: 8.4, booked: 18, started: "Aug 12" },
  { name: "LinkedIn agency owners", channel: "linkedin" as const, status: "active", sent: 612, open: 58, reply: 14.2, booked: 26, started: "Aug 18" },
  { name: "Instagram boutique brands", channel: "dm" as const, status: "paused", sent: 380, open: 71, reply: 11.6, booked: 12, started: "Aug 22" },
  { name: "Restaurant local outreach", channel: "email" as const, status: "draft", sent: 0, open: 0, reply: 0, booked: 0, started: "—" },
  { name: "Realtor warm follow-up", channel: "email" as const, status: "completed", sent: 884, open: 39, reply: 6.1, booked: 9, started: "Jul 30" },
];

const channelIcon = (c: "email" | "linkedin" | "dm") =>
  c === "email" ? <Mail className="h-3.5 w-3.5" /> : c === "linkedin" ? <Linkedin className="h-3.5 w-3.5" /> : <MessageSquare className="h-3.5 w-3.5" />;

const statusTone = (s: string): "success" | "warm" | "muted" | "cold" =>
  s === "active" ? "success" : s === "paused" ? "warm" : s === "draft" ? "muted" : "cold";

function CampaignsPage() {
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

      <Panel title="All campaigns">
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
              {CAMPAIGNS.map((c) => (
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
      </Panel>
    </div>
  );
}
