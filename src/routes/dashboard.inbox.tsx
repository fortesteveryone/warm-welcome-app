import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Send, Paperclip, Star, Archive, Reply, Search, PenSquare } from "lucide-react";
import { PageHeader, Panel, Avatar, Badge, Mono } from "@/components/dashboard/dash-ui";
import { FormDialog, Field, fieldCls, textareaCls, gridCls } from "@/components/dashboard/form-dialog";

export const Route = createFileRoute("/dashboard/inbox")({
  component: InboxPage,
});

type Thread = { id: number; name: string; company: string; preview: string; time: string; unread: boolean; tone: "hot" | "warm" | "cold"; starred: boolean };

const INITIAL_THREADS: Thread[] = [
  { id: 1, name: "Aisha Rahman", company: "Velvet & Co.", preview: "Looks great — can we hop on a call Thursday?", time: "2m", unread: true, tone: "hot", starred: true },
  { id: 2, name: "Marcus Lin", company: "Northwave Studio", preview: "Sending over the budget approval now…", time: "1h", unread: true, tone: "hot", starred: false },
  { id: 3, name: "Priya Devi", company: "Saffron Kitchen", preview: "Thanks! Will review and revert tomorrow.", time: "3h", unread: false, tone: "warm", starred: true },
  { id: 4, name: "Jonas Weber", company: "Atlas Logistics", preview: "Could you share a case study?", time: "Yesterday", unread: false, tone: "warm", starred: false },
  { id: 5, name: "Camila Reyes", company: "Lumen Health", preview: "Not the right time, please follow up Q4.", time: "2d", unread: false, tone: "cold", starred: false },
  { id: 6, name: "Yuki Tanaka", company: "Mori Apparel", preview: "Let's plan a launch sprint for Sept.", time: "3d", unread: false, tone: "hot", starred: false },
];

const FILTERS = ["all", "unread", "starred", "hot"] as const;
type FilterKey = (typeof FILTERS)[number];

function InboxPage() {
  const [threads, setThreads] = useState<Thread[]>(INITIAL_THREADS);
  const [active, setActive] = useState(1);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");
  const [composeOpen, setComposeOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return threads.filter((t) => {
      if (filter === "unread" && !t.unread) return false;
      if (filter === "starred" && !t.starred) return false;
      if (filter === "hot" && t.tone !== "hot") return false;
      if (q && !(t.name.toLowerCase().includes(q) || t.company.toLowerCase().includes(q) || t.preview.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [threads, filter, query]);

  const counts = {
    all: threads.length,
    unread: threads.filter((t) => t.unread).length,
    starred: threads.filter((t) => t.starred).length,
    hot: threads.filter((t) => t.tone === "hot").length,
  };

  const t = threads.find((x) => x.id === active) ?? threads[0];

  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Inbox"
        title="Conversations"
        description="Unified replies from your campaigns and outreach."
        actions={
          <button onClick={() => setComposeOpen(true)} className="inline-flex h-9 items-center gap-1.5 rounded-md bg-foreground px-3 text-sm font-medium text-background hover:bg-foreground/90">
            <PenSquare className="h-3.5 w-3.5" /> Compose
          </button>
        }
      />

      <Panel className="overflow-hidden">
        <div className="grid lg:grid-cols-[340px_1fr]">
          <div className="border-b border-border lg:border-b-0 lg:border-r">
            <div className="space-y-2 border-b border-border px-3 py-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search inbox…" className="h-8 w-full rounded-md border border-border bg-background pl-8 pr-3 text-sm focus:border-foreground/40 focus:outline-none" />
              </div>
              <div className="flex items-center gap-1">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-[11px] capitalize transition ${filter === f ? "bg-foreground text-background" : "text-muted-foreground hover:bg-card hover:text-foreground"}`}
                  >
                    {f} <span className="opacity-70">{counts[f]}</span>
                  </button>
                ))}
              </div>
            </div>
            <ul className="max-h-[640px] overflow-y-auto">
              {filtered.length === 0 ? (
                <li className="px-4 py-10 text-center text-xs text-muted-foreground">No conversations.</li>
              ) : filtered.map((th) => (
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
                    <div className="flex flex-col items-center gap-1">
                      {th.starred && <Star className="h-3 w-3 fill-amber-400 text-amber-400" />}
                      {th.unread && <span className="h-2 w-2 rounded-full bg-[color:var(--signal,oklch(0.72_0.19_145))]" />}
                    </div>
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
                <textarea placeholder="Write a reply…" rows={3} className="w-full resize-none bg-transparent text-sm focus:outline-none" />
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

      <FormDialog
        open={composeOpen}
        onClose={() => setComposeOpen(false)}
        title="New conversation"
        submitLabel="Start thread"
        onSubmit={(e) => {
          e.preventDefault();
          const f = e.currentTarget as HTMLFormElement;
          const d = new FormData(f);
          const name = String(d.get("name") || "").trim();
          const preview = String(d.get("preview") || "").trim();
          if (!name || !preview) return;
          const id = Math.max(0, ...threads.map((x) => x.id)) + 1;
          const th: Thread = {
            id,
            name,
            company: String(d.get("company") || ""),
            preview,
            time: "now",
            unread: true,
            starred: false,
            tone: (d.get("tone") as Thread["tone"]) || "warm",
          };
          setThreads((cur) => [th, ...cur]);
          setActive(id);
          setComposeOpen(false);
          f.reset();
        }}
      >
        <div className={gridCls}>
          <Field label="To (name)"><input name="name" required className={fieldCls} /></Field>
          <Field label="Company"><input name="company" className={fieldCls} /></Field>
          <Field label="Tone">
            <select name="tone" className={fieldCls} defaultValue="warm">
              <option value="hot">hot</option><option value="warm">warm</option><option value="cold">cold</option>
            </select>
          </Field>
        </div>
        <Field label="Message"><textarea name="preview" required className={textareaCls} placeholder="Write your opening message…" /></Field>
      </FormDialog>
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
