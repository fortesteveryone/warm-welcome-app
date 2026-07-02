import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const PHRASES: Array<[string, string]> = [
  ["Stop scrolling.", "Start closing."],
  ["Stop guessing.", "Start pitching."],
  ["Stop waiting.", "Start winning."],
  ["Stop searching.", "Start earning."],
];

export function FinalCTA() {
  // duplicate first phrase at end for seamless loop
  const loop = [...PHRASES, PHRASES[0]];
  const stepPct = 100 / loop.length;
  const totalSec = PHRASES.length * 3.6;
  const fadeMask =
    "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 8%, #000 28%, #000 72%, rgba(0,0,0,0.15) 92%, transparent 100%)";

  return (
    <section className="relative section-edge section-dark overflow-hidden">
      <div className="mx-auto w-full max-w-[1200px] px-3 py-16 md:px-6 md:py-20">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-10 text-center md:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[color:var(--signal)]/10 blur-[120px]"
          />

          {/* Scrolling headline */}
          <div
            className="relative mx-auto overflow-hidden h-[10rem] md:h-[14rem] lg:h-[16rem]"
            style={{
              WebkitMaskImage: fadeMask,
              maskImage: fadeMask,
            }}
          >
            <div
              className="flex flex-col"
              style={{
                animation: `cta-scroll ${totalSec}s cubic-bezier(0.7,0,0.3,1) infinite`,
              }}
            >
              {loop.map(([a, b], i) => (
                <div
                  key={i}
                  className="flex h-[10rem] shrink-0 flex-col items-center justify-center md:h-[14rem] lg:h-[16rem]"
                >
                  <h2 className="text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.03em] md:text-6xl lg:text-7xl">
                    <span className="block">{a}</span>
                    <span className="block bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent">
                      {b}
                    </span>
                  </h2>
                </div>
              ))}
            </div>
          </div>

          <p className="relative mx-auto mt-6 max-w-lg text-muted-foreground">
            Find structured, scored website opportunities from public social posts without manually checking every platform.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              hash="pricing"
              className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:bg-foreground/90"
            >
              Get early access <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/"
              hash="platforms"
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/40 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur transition hover:bg-card"
            >
              See platforms
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cta-scroll {
          ${PHRASES.map((_, i) => {
            const holdStart = (i / PHRASES.length) * 100;
            const holdEnd = holdStart + stepPct * 0.72;
            return `${holdStart}% { transform: translateY(-${i * stepPct}%); } ${holdEnd}% { transform: translateY(-${i * stepPct}%); }`;
          }).join("\n")}
          100% { transform: translateY(-${PHRASES.length * stepPct}%); }
        }
      `}</style>
    </section>
  );
}
