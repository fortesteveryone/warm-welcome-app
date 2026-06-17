import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Bell, Check, CheckCheck, MessageSquare, UserPlus, Trophy, Send, AlertTriangle,
  Calendar, Settings as SettingsIcon, X,
} from "lucide-react";

type NotifType = "lead" | "message" | "deal" | "campaign" | "system" | "meeting";

type Notification = {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: number; // ms timestamp
  read: boolean;
  href?: string;
  actor?: string;
};

const now = Date.now();
const m = (mins: number) => now - mins * 60_000;

const SEED: Notification[] = [
  { id: "n1", type: "message", actor: "Aisha Rahman", title: "Aisha Rahman replied", body: "Looks great — can we hop on a call Thursday?", time: m(2), read: false, href: "/dashboard" },
  { id: "n2", type: "lead", actor: "Marcus Lin", title: "New hot lead scored 92", body: "Northwave Studio · LinkedIn · Proposal stage", time: m(14), read: false, href: "/dashboard/leads/marcus-lin" },
  { id: "n3", type: "deal", title: "Deal moved to Negotiation", body: "Velvet & Co. · 12-month retainer · $24,000", time: m(38), read: false, href: "/dashboard" },
  { id: "n4", type: "meeting", title: "Meeting in 1 hour", body: "Discovery call with Priya Devi (Saffron Kitchen)", time: m(55), read: true, href: "/dashboard" },
  { id: "n5", type: "campaign", title: "Q3 SaaS founders sequence completed step 3", body: "1,240 sent · 42% open · 8.4% reply", time: m(180), read: true, href: "/dashboard/campaigns" },
  { id: "n6", type: "system", title: "Instagram integration reconnected", body: "Token refreshed automatically. No data loss.", time: m(60 * 6), read: true, href: "/dashboard/settings" },
  { id: "n7", type: "deal", title: "Closed-Won 🎉", body: "Atlas Logistics · Brand identity · $12,000", time: m(60 * 22), read: true, href: "/dashboard" },
];

const LIVE_FEED: Omit<Notification, "id" | "time" | "read">[] = [
  { type: "message", actor: "Yuki Tanaka", title: "Yuki Tanaka sent a DM", body: "Let's plan that launch sprint — what's a good week?", href: "/dashboard" },
  { type: "lead", actor: "Felix Brandt", title: "New warm lead from LinkedIn", body: "Brandt Audio · CEO · score 73", href: "/dashboard/leads/felix-brandt" },
  { type: "deal", title: "Proposal viewed 3 times", body: "Northwave Studio opened your proposal — high intent signal.", href: "/dashboard" },
  { type: "campaign", title: "Reply rate jump", body: "LinkedIn agency owners hit 14.2% reply rate today.", href: "/dashboard/campaigns" },
  { type: "meeting", title: "Call starting soon", body: "Mei Wong · Lotus Travel · 15 min", href: "/dashboard" },
  { type: "system", title: "Weekly digest ready", body: "65 meetings booked, 9 deals advanced.", href: "/dashboard/analytics" },
];

const TYPE_META: Record<NotifType, { icon: typeof Bell; tone: string; dot: string }> = {
  lead: { icon: UserPlus, tone: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20", dot: "bg-emerald-400" },
  message: { icon: MessageSquare, tone: "text-sky-300 bg-sky-500/10 border-sky-500/20", dot: "bg-sky-400" },
  deal: { icon: Trophy, tone: "text-amber-300 bg-amber-500/10 border-amber-500/20", dot: "bg-amber-400" },
  campaign: { icon: Send, tone: "text-fuchsia-300 bg-fuchsia-500/10 border-fuchsia-500/20", dot: "bg-fuchsia-400" },
  meeting: { icon: Calendar, tone: "text-indigo-300 bg-indigo-500/10 border-indigo-500/20", dot: "bg-indigo-400" },
  system: { icon: SettingsIcon, tone: "text-muted-foreground bg-card border-border", dot: "bg-muted-foreground" },
};

function relTime(t: number) {
  const diff = Math.max(0, Date.now() - t);
  const s = Math.round(diff / 1000);
  if (s < 60) return `${s}s ago`;
  const mn = Math.round(s / 60);
  if (mn < 60) return `${mn}m ago`;
  const h = Math.round(mn / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  return `${d}d ago`;
}

export function NotificationsBell() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"all" | "unread">("all");
  const [items, setItems] = useState<Notification[]>(SEED);
  const [, setTick] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // re-render every minute for relative times
  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 60_000);
    return () => window.clearInterval(id);
  }, []);

  // close on outside click / escape
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // simulated live notifications — push a new one every 25-45s, with toast
  useEffect(() => {
    let cancelled = false;
    const schedule = () => {
      const delay = 25_000 + Math.random() * 20_000;
      window.setTimeout(() => {
        if (cancelled) return;
        const seed = LIVE_FEED[Math.floor(Math.random() * LIVE_FEED.length)];
        const n: Notification = {
          ...seed,
          id: `live-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          time: Date.now(),
          read: false,
        };
        setItems((cur) => [n, ...cur].slice(0, 50));
        toast(n.title, {
          description: n.body,
          icon: <span className={`grid h-5 w-5 place-items-center rounded-full ${TYPE_META[n.type].tone} border`}><Bell className="h-2.5 w-2.5" /></span>,
          action: n.href ? { label: "View", onClick: () => { window.location.assign(n.href!); } } : undefined,
          duration: 5000,
        });
        schedule();
      }, delay);
    };
    schedule();
    return () => { cancelled = true; };
  }, []);

  const unread = items.filter((i) => !i.read).length;
  const visible = tab === "unread" ? items.filter((i) => !i.read) : items;

  const markAll = () => setItems((cur) => cur.map((i) => ({ ...i, read: true })));
  const markOne = (id: string) => setItems((cur) => cur.map((i) => i.id === id ? { ...i, read: true } : i));
  const dismiss = (id: string) => setItems((cur) => cur.filter((i) => i.id !== id));

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative grid h-9 w-9 place-items-center rounded-md border border-border hover:bg-card"
        aria-label={`Notifications${unread ? ` (${unread} unread)` : ""}`}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <Bell className="h-4 w-4" />
        {unread > 0 && (
          <span className="absolute -right-1 -top-1 grid h-4 min-w-[16px] place-items-center rounded-full bg-[color:var(--hot,oklch(0.65_0.22_25))] px-1 text-[10px] font-semibold leading-none text-background ring-2 ring-background">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Notifications"
          className="absolute right-0 z-50 mt-2 w-[380px] max-w-[calc(100vw-2rem)] origin-top-right overflow-hidden rounded-xl border border-border bg-card shadow-2xl ring-1 ring-border/50"
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <div className="text-sm font-semibold tracking-tight">Notifications</div>
              <div className="text-[11px] text-muted-foreground">
                {unread > 0 ? `${unread} unread · ${items.length} total` : "You're all caught up"}
              </div>
            </div>
            <button
              onClick={markAll}
              disabled={unread === 0}
              className="inline-flex h-7 items-center gap-1 rounded-md border border-border bg-background/60 px-2 text-[11px] text-muted-foreground transition hover:text-foreground disabled:opacity-50"
            >
              <CheckCheck className="h-3 w-3" /> Mark all read
            </button>
          </div>

          <div className="flex items-center gap-1 border-b border-border px-2 py-1.5">
            {(["all", "unread"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`inline-flex h-7 items-center gap-1.5 rounded-md px-2.5 text-[11px] capitalize transition ${
                  tab === t ? "bg-foreground text-background" : "text-muted-foreground hover:bg-background hover:text-foreground"
                }`}
              >
                {t}
                <span className="opacity-70">{t === "all" ? items.length : unread}</span>
              </button>
            ))}
          </div>

          <ul className="max-h-[420px] overflow-y-auto">
            {visible.length === 0 ? (
              <li className="px-6 py-10 text-center">
                <div className="mx-auto grid h-10 w-10 place-items-center rounded-full border border-border bg-background/60 text-muted-foreground">
                  <Check className="h-4 w-4" />
                </div>
                <div className="mt-3 text-sm font-medium">Nothing new</div>
                <div className="mt-1 text-[11px] text-muted-foreground">
                  {tab === "unread" ? "All notifications have been read." : "You'll see updates here as they arrive."}
                </div>
              </li>
            ) : (
              visible.map((n) => {
                const meta = TYPE_META[n.type];
                const Icon = meta.icon;
                const Content = (
                  <div className="flex gap-3">
                    <span className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md border ${meta.tone}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className={`truncate text-sm ${n.read ? "" : "font-semibold"}`}>{n.title}</div>
                        {!n.read && <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${meta.dot}`} />}
                      </div>
                      <div className="line-clamp-2 text-[12px] text-muted-foreground">{n.body}</div>
                      <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
                        <span className="font-mono uppercase tracking-tight">{n.type}</span>
                        <span>·</span>
                        <span>{relTime(n.time)}</span>
                      </div>
                    </div>
                  </div>
                );
                return (
                  <li
                    key={n.id}
                    className={`group relative border-b border-border last:border-0 ${n.read ? "" : "bg-foreground/[0.03]"} hover:bg-foreground/[0.06]`}
                  >
                    {n.href ? (
                      <Link
                        to={n.href}
                        onClick={() => { markOne(n.id); setOpen(false); }}
                        className="block px-4 py-3"
                      >
                        {Content}
                      </Link>
                    ) : (
                      <button onClick={() => markOne(n.id)} className="block w-full px-4 py-3 text-left">{Content}</button>
                    )}
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); dismiss(n.id); }}
                      className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded text-muted-foreground opacity-0 transition hover:bg-background hover:text-foreground group-hover:opacity-100"
                      aria-label="Dismiss"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </li>
                );
              })
            )}
          </ul>

          <div className="flex items-center justify-between border-t border-border px-3 py-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <AlertTriangle className="h-3 w-3" /> Demo data — live updates simulated
            </span>
            <Link
              to="/dashboard/settings"
              onClick={() => setOpen(false)}
              className="text-[11px] text-muted-foreground hover:text-foreground"
            >
              Preferences →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
