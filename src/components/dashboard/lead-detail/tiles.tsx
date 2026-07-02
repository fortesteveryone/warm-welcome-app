import { useState } from "react";
import {
  ChevronDown, ChevronUp, ClipboardList, CheckCircle2, XCircle, Check, Copy,
} from "lucide-react";

export function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }

export function Section({
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
  emerald: "from-foreground/10 to-foreground/0 ring-foreground/20",
} as const;

export function StatBlock({
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

export function FactTile({
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

export function YesNoTile({
  icon, label, value, yesText, noText,
}: { icon: React.ReactNode; label: string; value: boolean; yesText: string; noText: string }) {
  return (
    <div className={`flex items-center gap-3 rounded-xl border p-3.5 ${value ? "border-foreground/30 bg-foreground/[0.04]" : "border-border bg-background/40"}`}>
      <span className={`grid h-8 w-8 place-items-center rounded-md ${value ? "bg-foreground/10 text-foreground" : "bg-foreground/5 text-muted-foreground"}`}>{icon}</span>
      <div className="min-w-0 flex-1">
        <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="text-sm font-medium text-foreground">{value ? yesText : noText}</div>
      </div>
      {value
        ? <CheckCircle2 className="h-4 w-4 text-foreground" />
        : <XCircle className="h-4 w-4 text-muted-foreground/60" />}
    </div>
  );
}

export function KVRow({ label, pill }: { label: string; pill: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-background/40 px-3.5 py-3">
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      {pill}
    </div>
  );
}

export function Pill({ cls, icon, children }: { cls: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium ${cls}`}>
      {icon} {children}
    </span>
  );
}

export function FactBlock({ icon, label, body }: { icon: React.ReactNode; label: string; body: string }) {
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

export function VoteRow({
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

export function DraftCard({ index, draft }: { index: number; draft: { topic: string; subject: string; message: string } }) {
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
          <span className="inline-flex items-center gap-1 rounded-md border border-foreground/30 bg-foreground/10 px-2 py-0.5 text-[11px] text-foreground">
            <ClipboardList className="h-3 w-3" /> {draft.topic}
          </span>
        </div>
        <button
          onClick={copy}
          className="inline-flex h-7 items-center gap-1.5 rounded-md border border-border bg-background px-2 text-xs text-muted-foreground hover:text-foreground"
        >
          {copied ? <Check className="h-3 w-3 text-foreground" /> : <Copy className="h-3 w-3" />}
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
