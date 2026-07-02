import type { ReactNode } from "react";

export function Mono({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`font-mono text-[11px] uppercase tracking-tight ${className}`}>{children}</span>;
}

export function PageHeader({
  kicker,
  title,
  description,
  actions,
}: {
  kicker?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
      <div className="min-w-0">
        {kicker && <Mono className="text-muted-foreground">{kicker}</Mono>}
        <h1 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Stat({
  label,
  value,
  delta,
  trend = "up",
  icon,
}: {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
  icon?: ReactNode;
}) {
  const trendColor =
    trend === "up"
      ? "text-[color:var(--signal,oklch(0.72_0.19_145))]"
      : trend === "down"
      ? "text-[color:var(--hot,oklch(0.65_0.22_25))]"
      : "text-muted-foreground";
  return (
    <div className="rounded-xl border border-border bg-card/50 p-5">
      <div className="flex items-center justify-between">
        <Mono className="text-muted-foreground">{label}</Mono>
        {icon && <span className="text-muted-foreground">{icon}</span>}
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">{value}</div>
      {delta && <div className={`mt-1 text-xs ${trendColor}`}>{delta}</div>}
    </div>
  );
}

export function Panel({
  title,
  description,
  actions,
  children,
  className = "",
}: {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`panel-premium ${className}`}>
      {(title || actions) && (
        <div className="flex items-center justify-between border-b border-border/70 px-5 py-3.5">
          <div className="min-w-0">
            {title && <h2 className="text-sm font-semibold tracking-tight">{title}</h2>}
            {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
          </div>
          {actions}
        </div>
      )}
      {children}
    </div>
  );
}


export function Badge({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "hot" | "warm" | "cold" | "success" | "muted";
}) {
  const tones: Record<string, string> = {
    default: "border-border bg-card text-foreground",
    hot: "border-[color:var(--hot,oklch(0.65_0.22_25))]/30 bg-[color:var(--hot,oklch(0.65_0.22_25))]/10 text-[color:var(--hot,oklch(0.7_0.22_25))]",
    warm: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    cold: "border-sky-500/30 bg-sky-500/10 text-sky-400",
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    muted: "border-border bg-muted/30 text-muted-foreground",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function Avatar({ name, className = "" }: { name: string; className?: string }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const hues = ["from-emerald-500/40 to-emerald-700/40", "from-sky-500/40 to-indigo-700/40", "from-amber-500/40 to-rose-600/40", "from-fuchsia-500/40 to-purple-700/40", "from-cyan-500/40 to-blue-700/40"];
  const hue = hues[name.charCodeAt(0) % hues.length];
  return (
    <span
      className={`grid h-8 w-8 shrink-0 place-items-center rounded-md bg-gradient-to-br ${hue} text-[11px] font-semibold text-foreground ring-1 ring-border ${className}`}
    >
      {initials}
    </span>
  );
}

export function Sparkline({ data, color = "currentColor", className = "" }: { data: number[]; color?: string; className?: string }) {
  const w = 100;
  const h = 30;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = w / (data.length - 1);
  const points = data.map((d, i) => `${i * step},${h - ((d - min) / range) * h}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={`h-full w-full ${className}`}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
