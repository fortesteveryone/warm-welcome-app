import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Paperclip, Star, Archive, Reply } from "lucide-react";
import { PageHeader, Panel, Avatar, Badge, Mono } from "@/components/dashboard/dash-ui";

export const Route = createFileRoute("/dashboard/inbox")({
  component: InboxPage,
});

const THREADS = [
  { id: 1, name: "Aisha Rahman", company: "Velvet & Co.", preview: "Looks great — can we hop on a call Thursday?", time: "2m", unread: true, tone: "hot" as const },
  { id: 2, name: "Marcus Lin", company: "Northwave Studio", preview: "Sending over the budget approval now…", time: "1h", unread: true, tone: "hot" as const },
  { id: 3, name: "Priya Devi", company: "Saffron Kitchen", preview: "Thanks! Will review and revert tomorrow.", time: "3h", unread: false, tone: "warm" as const },
  { id: 4, name: "Jonas Weber", company: "Atlas Logistics", preview: "Could you share a case study?", time: "Yesterday", unread: false, tone: "warm" as const },
  { id: 5, name: "Camila Reyes", company: "Lumen Health", preview: "Not the right time, please follow up Q4.", time: "2d", unread: false, tone: "cold" as const },
];

function InboxPage() {
  const [active, setActive] = useState(1);
  const t = THREADS.find((x) => x.id === active)!;

  return (
    <div className="space-y-6">
      <PageHeader kicker="Inbox" title="Conversations" description="Unified replies from your campaigns and outreach." />

      <Panel className="overflow-hidden">
        <div className="grid lg:grid-cols-[320px_1fr]">
          <div className="border-b border-border lg:border-b-0 lg:border-r">
            <div className="border-b border-border px-4 py-3">
              <input placeholder="Search inbox…" className="h-8 w-full rounded-md border border-border bg-background px-3 text-sm focus:border-foreground/40 focus:outline-none" />
            </div>
            <ul className="max-h-[640px] overflow-y-auto">
              {THREADS.map((th) => (
                <li key={th.id}>
                  <button
                    onClick={() => setActive(th.id)}
                    className={`flex w-full items-start gap-3 border-b border-border px-4 py-3 text-left transition ${active === th.id ? "bg-card/60" : "hover:bg-card/30"}`}
                  >
                    <Avatar name={th.name} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`truncate text-sm ${th.unread ? "font-semibold" : ""}`}>{th.name}</span>
                        <Mono className="shrink-0 text-muted-foreground">{th.time}</Mono>
                      </div>
                      <div className="truncate text-xs text-muted-foreground">{th.company}</div>
                      <div className={`mt-1 line-clamp-1 text-xs ${th.unread ? "text-foreground" : "text-muted-foreground"}`}>{th.preview}</div>
                    </div>
                    {th.unread && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[color:var(--signal,oklch(0.72_0.19_145))]" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
              <div className="flex items-center gap-3">
                <Avatar name={t.name} className="h-10 w-10" />
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.company}</div>
                </div>
                <Badge tone={t.tone}>{t.tone}</Badge>
              </div>
              <div className="flex items-center gap-1">
                <button className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-card hover:text-foreground"><Star className="h-4 w-4" /></button>
                <button className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-card hover:text-foreground"><Archive className="h-4 w-4" /></button>
                <button className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border px-2.5 text-xs hover:bg-card"><Reply className="h-3.5 w-3.5" /> Reply</button>
              </div>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              <Message side="them" name={t.name} time="Yesterday, 4:12pm" text="Hey Nasir — we've been browsing your case studies, very impressive results with the apparel brands. We'd love to understand what a 3-month pilot would look like." />
              <Message side="me" name="You" time="Today, 9:34am" text={`Thanks ${t.name.split(" ")[0]}! Sending a tailored proposal in the next hour — I'll include 2 reference clients in your space. Quick question first: what's your current monthly outreach volume?`} />
              <Message side="them" name={t.name} time="Today, 11:02am" text={t.preview} />
            </div>
            <div className="border-t border-border p-3">
              <div className="rounded-lg border border-border bg-card/40 p-3">
                <textarea
                  placeholder="Write a reply…"
                  rows={3}
                  className="w-full resize-none bg-transparent text-sm focus:outline-none"
                />
                <div className="mt-2 flex items-center justify-between">
                  <button className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-background hover:text-foreground"><Paperclip className="h-4 w-4" /></button>
                  <button className="inline-flex h-8 items-center gap-1.5 rounded-md bg-foreground px-3 text-xs font-medium text-background hover:bg-foreground/90">
                    <Send className="h-3.5 w-3.5" /> Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

function Message({ side, name, time, text }: { side: "me" | "them"; name: string; time: string; text: string }) {
  const isMe = side === "me";
  return (
    <div className={`flex gap-3 ${isMe ? "flex-row-reverse" : ""}`}>
      <Avatar name={name} />
      <div className={`max-w-[80%] ${isMe ? "items-end" : ""} flex flex-col`}>
        <div className={`flex items-center gap-2 text-xs ${isMe ? "flex-row-reverse" : ""}`}>
          <span className="font-medium">{name}</span>
          <Mono className="text-muted-foreground">{time}</Mono>
        </div>
        <div className={`mt-1 rounded-lg border px-3.5 py-2.5 text-sm ${isMe ? "border-foreground/20 bg-foreground/10" : "border-border bg-card/60"}`}>
          {text}
        </div>
      </div>
    </div>
  );
}
