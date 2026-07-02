import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import { Mono, Sparkline } from "@/components/dashboard/dash-ui";

export function KpiCard({ label, value, delta, trend, icon, series }: {
  label: string; value: string; delta: string; trend: "up" | "down"; icon: React.ReactNode; series: number[];
}) {
  const trendColor = trend === "up" ? "text-[color:var(--signal)]" : "text-rose-400";
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;
  return (
    <div className="panel-premium panel-premium-hover p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          {icon}
          <Mono>{label}</Mono>
        </div>
        <span className={`inline-flex items-center gap-0.5 rounded-full bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-medium ${trendColor}`}>
          <TrendIcon className="h-2.5 w-2.5" /> {delta}
        </span>
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight tabular-nums">{value}</div>
      <div className="mt-2 h-8">
        <Sparkline data={series} color={trend === "up" ? "oklch(0.72 0.19 145)" : "oklch(0.65 0.22 25)"} />
      </div>
    </div>
  );
}

export function MiniStat({ icon, label, value, tone }: {
  icon: React.ReactNode; label: string; value: number; tone: "rose" | "amber" | "sky" | "signal" | "emerald";
}) {
  const ring: Record<typeof tone, string> = {
    rose: "ring-rose-500/20", amber: "ring-amber-500/20", sky: "ring-sky-500/20",
    signal: "ring-[color:var(--signal)]/25", emerald: "ring-emerald-500/20",
  };
  return (
    <div className={`rounded-xl border border-border bg-card/50 px-3.5 py-3 ring-1 ${ring[tone]}`}>
      <div className="flex items-center gap-1.5">{icon}<Mono className="text-muted-foreground">{label}</Mono></div>
      <div className="mt-1.5 text-xl font-semibold tabular-nums">{value}</div>
    </div>
  );
}

export function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

export function AreaChart({ series }: { series: { data: number[]; color: string }[] }) {
  const w = 600, h = 160;
  const all = series.flatMap((s) => s.data);
  const max = Math.max(...all);
  const min = 0;
  const range = max - min || 1;
  const n = series[0].data.length;
  const step = w / (n - 1);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-full w-full">
      {[0.25, 0.5, 0.75].map((p) => (
        <line key={p} x1={0} x2={w} y1={h * p} y2={h * p} stroke="oklch(1 0 0 / 0.06)" strokeDasharray="3 4" />
      ))}
      {series.map((s, i) => {
        const pts = s.data.map((d, idx) => `${idx * step},${h - ((d - min) / range) * h}`);
        const line = pts.join(" ");
        const area = `M0,${h} L${pts.join(" L")} L${w},${h} Z`;
        return (
          <g key={i}>
            <path d={area} fill={s.color} opacity={0.12} />
            <polyline points={line} fill="none" stroke={s.color} strokeWidth={1.75} strokeLinejoin="round" strokeLinecap="round" />
          </g>
        );
      })}
    </svg>
  );
}

export function RingChart({ value, label, sub }: { value: number; label: string; sub: string }) {
  const size = 160, stroke = 12, r = (size - stroke) / 2, c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div className="relative mx-auto grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} strokeWidth={stroke} stroke="oklch(1 0 0 / 0.06)" fill="none" />
        <circle
          cx={size/2} cy={size/2} r={r} strokeWidth={stroke}
          stroke="var(--signal)" fill="none" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={off}
          style={{ filter: "drop-shadow(0 0 8px var(--signal-glow))" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="text-2xl font-semibold tabular-nums">{label}</div>
          <Mono className="mt-1 block text-muted-foreground">{sub}</Mono>
        </div>
      </div>
    </div>
  );
}

export function ActionItem({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <li className="flex items-start gap-3 px-5 py-3">
      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-[color:var(--signal)]/10 text-[color:var(--signal)] ring-1 ring-[color:var(--signal)]/25">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-medium">{title}</div>
        <div className="mt-0.5 text-[11.5px] text-muted-foreground">{body}</div>
      </div>
      <ArrowRight className="mt-1 h-3.5 w-3.5 text-muted-foreground" />
    </li>
  );
}
