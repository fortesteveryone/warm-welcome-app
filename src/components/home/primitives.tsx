import React from "react";

export function Mono({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-mono text-[11px] tracking-tight ${className}`}>{children}</span>;
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-3 md:px-6 ${className}`}>{children}</div>;
}

export function SectionTitle({ kicker, title, lede }: { kicker: string; title: React.ReactNode; lede?: string }) {
  return (
    <div className="max-w-4xl">
      <Mono className="text-muted-foreground">{kicker}</Mono>
      <h2 className="mt-3 max-w-3xl text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.02em] sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {lede && <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-[17px]">{lede}</p>}
    </div>
  );
}

export function Tag({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "hot" | "warm" | "cold" | "signal" }) {
  const tones = {
    default: "border-border bg-card text-foreground",
    hot: "border-[color:var(--hot)]/30 bg-[color:var(--hot)]/10 text-[color:var(--hot)]",
    warm: "border-[color:var(--warm)]/30 bg-[color:var(--warm)]/10 text-[color:var(--warm)]",
    cold: "border-[color:var(--cold)]/30 bg-[color:var(--cold)]/10 text-[color:var(--cold)]",
    signal: "border-[color:var(--signal)]/30 bg-[color:var(--signal)]/10 text-[color:var(--signal)]",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

export const PLATFORM_META: Record<string, { color: string; label: string }> = {
  Facebook:  { color: "#1877F2", label: "Facebook" },
  LinkedIn:  { color: "#0A66C2", label: "LinkedIn" },
  Reddit:    { color: "#FF4500", label: "Reddit" },
  Instagram: { color: "#E1306C", label: "Instagram" },
  X:         { color: "#0F0F0F", label: "X" },
};
