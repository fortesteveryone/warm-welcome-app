import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, Flame, Star, Zap, CheckCheck, ArrowRight } from "lucide-react";
import { PageHeader, Panel, Mono } from "@/components/dashboard/dash-ui";

export const Route = createFileRoute("/dashboard/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Postly CRM" }] }),
  component: NotificationsPage,
});

type Notif = {
  id: string;
  title: string;
  body: string;
  time: string;
  kind: "hot" | "match" | "system" | "credits";
  href?: string;
  unread: boolean;
};

const SEED: Notif[] = [
  { id: "n1", kind: "hot",     title: "3 new HOT leads matched your filters", body: "Website Design · India, US · past 2h", time: "5 min ago",  unread: true,  href: "/dashboard/leads" },
  { id: "n2", kind: "match",   title: "New Shopify migration post on X",       body: "@growthcafe · looking for a dev this week",         time: "38 min ago", unread: true,  href: "/dashboard/leads" },
  { id: "n3", kind: "credits", title: "You've used 34 of 150 daily views",     body: "Resets at midnight (Asia/Dhaka)",                    time: "2h ago",    unread: false },
  { id: "n4", kind: "match",   title: "12 fresh Reddit web-dev requests",      body: "r/webdev, r/forhire, r/shopify",                     time: "5h ago",    unread: false, href: "/dashboard/leads" },
  { id: "n5", kind: "system",  title: "Weekly summary is ready",               body: "You opened 187 leads and starred 12 last week.",     time: "Yesterday", unread: false },
];

function iconFor(k: Notif["kind"]) {
  switch (k) {
    case "hot":     return <Flame className="h-4 w-4 text-rose-400" />;
    case "match":   return <Star className="h-4 w-4 text-amber-400" />;
    case "credits": return <Zap className="h-4 w-4 text-[color:var(--signal)]" />;
    default:        return <Bell className="h-4 w-4 text-muted-foreground" />;
  }
}

function NotificationsPage() {
  const [items, setItems] = useState(SEED);
  const [tab, setTab] = useState<"all" | "unread">("all");
  const filtered = tab === "unread" ? items.filter((n) => n.unread) : items;
  const unreadCount = items.filter((n) => n.unread).length;

  const markAllRead = () => setItems((xs) => xs.map((n) => ({ ...n, unread: false })));
  const markRead = (id: string) => setItems((xs) => xs.map((n) => (n.id === id ? { ...n, unread: false } : n)));

  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Inbox"
        title="Notifications"
        description="Fresh lead matches, credit resets and system updates."
        actions={
          <button
            onClick={markAllRead}
            disabled={unreadCount === 0}
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-card/60 px-3 text-sm text-foreground hover:bg-card disabled:cursor-not-allowed disabled:opacity-40"
          >
            <CheckCheck className="h-3.5 w-3.5" /> Mark all read
          </button>
        }
      />

      <div className="flex items-center gap-1 rounded-md border border-border bg-card/50 p-0.5 w-fit">
        {(["all", "unread"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`h-8 rounded px-3 text-xs capitalize transition ${
              tab === t ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t} {t === "unread" && unreadCount > 0 && (
              <span className="ml-1 rounded bg-[color:var(--signal)] px-1 text-[10px] font-semibold text-black">{unreadCount}</span>
            )}
          </button>
        ))}
      </div>

      <Panel>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 px-6 py-14 text-center">
            <Bell className="h-6 w-6 text-muted-foreground" />
            <div className="text-sm font-medium">You're all caught up</div>
            <Mono className="text-muted-foreground">No unread notifications</Mono>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {filtered.map((n) => (
              <li key={n.id} className={`flex items-start gap-3 px-5 py-4 transition ${n.unread ? "bg-[color:var(--signal)]/[0.04]" : ""}`}>
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md bg-card ring-1 ring-border">
                  {iconFor(n.kind)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium">{n.title}</span>
                    {n.unread && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--signal)]" />}
                  </div>
                  <p className="mt-0.5 text-[12.5px] text-muted-foreground">{n.body}</p>
                  <Mono className="mt-1 block text-muted-foreground">{n.time}</Mono>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  {n.href && (
                    <Link
                      to={n.href}
                      onClick={() => markRead(n.id)}
                      className="inline-flex h-7 items-center gap-1 rounded-md border border-border bg-card px-2 text-[11px] hover:bg-background"
                    >
                      Open <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                  {n.unread && (
                    <button
                      onClick={() => markRead(n.id)}
                      className="h-7 rounded-md px-2 text-[11px] text-muted-foreground hover:bg-card hover:text-foreground"
                    >
                      Mark read
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
