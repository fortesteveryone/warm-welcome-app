import React, { useState } from "react";
import { ArrowRight, Check, Flame, Sparkles, X } from "lucide-react";
import { Container, Mono } from "@/components/home/primitives";

export function Pricing() {
  const [showLaunchModal, setShowLaunchModal] = useState(false);
  const plans = [
    {
      name: "Free", price: "$0", cadence: "/ month",
      desc: "A limited way to test fresh website opportunities.",
      features: [
        "150 fresh opportunities daily (100 Facebook + 50 Reddit)",
        "New batch every 24 hours — previous day's leads auto-hide",
        "Saved leads also expire after 24 hours",
        "No card required",
      ] as React.ReactNode[],
      cta: "Start free", featured: false, free: true,
    },
    {
      name: "Pro", price: "$6", cadence: "/ month forever", originalPrice: "$10",
      desc: "For freelancers and agencies doing website-service outreach every day.",
      features: [
        "40% off for life (regular price $10/month)",
        "1 month free during early access",
        "Access to all live platforms",
        "More daily website opportunities",
        "Save opportunities for up to 1 month",
        "Filters, tags, and export",
        "Outreach drafts",
      ],
      cta: "Get early access", featured: true,
    },
    {
      name: "VIP · Hot Leads", price: "Coming soon", cadence: "",
      desc: "Human-reviewed hot leads delivered to Gmail after approval.",
      features: [
        "Everything in Pro",
        "Manually filtered hot leads",
        "Gmail delivery after approval",
        "Dedicated Hot Leads dashboard",
        "Priority support",
      ],
      cta: "Coming soon", featured: false, vip: true, soon: true,
    },
  ];
  return (
    <section id="pricing" className="section-edge section-light">
      <Container className="py-16 md:py-20">
        <div className="text-center">
          <Mono className="text-muted-foreground">Pricing</Mono>
          <h2 className="mx-auto mt-3 max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.025em] md:text-4xl">
            Simple launch pricing.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
            Start with free access, upgrade when you need more volume, and unlock the early access lifetime discount while it is available.
          </p>
        </div>
        <div className="mt-14 grid gap-3 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-xl border p-6 md:p-7 ${
                p.featured
                  ? "border-foreground/30 bg-card shadow-[0_0_0_1px_oklch(1_0_0/0.06),0_30px_80px_-30px_oklch(0.72_0.19_145/0.3)]"
                  : (p as { vip?: boolean }).vip
                    ? "border-[color:var(--signal)]/40 bg-card"
                    : "border-border bg-card/50"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-2.5 left-6 rounded-md bg-[#0f5132] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm">
                  Most popular
                </span>
              )}
              {(p as { vip?: boolean }).vip && (
                <span className="absolute -top-2.5 left-6 inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  <Flame className="h-2.5 w-2.5 text-[color:var(--signal)]" /> Coming soon
                </span>
              )}
              <Mono className="text-muted-foreground">{p.name}</Mono>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="text-5xl font-semibold tracking-[-0.03em]">{p.price}</span>
                {p.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">{p.originalPrice}</span>
                )}
                <span className="text-sm text-muted-foreground">{p.cadence}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <ul className="mt-6 space-y-2.5">
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--signal)]" />
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>
              {(p as { soon?: boolean }).soon ? (
                <span className="mt-8 inline-flex w-full cursor-not-allowed items-center justify-center gap-1.5 rounded-md border border-border bg-card/40 px-4 py-2.5 text-sm font-medium text-muted-foreground">
                  {p.cta}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowLaunchModal(true)}
                  className={`mt-8 inline-flex w-full items-center justify-center gap-1.5 rounded-md px-4 py-2.5 text-sm font-medium transition ${
                    p.featured
                      ? "bg-foreground text-background hover:bg-foreground/90"
                      : "border border-border bg-background hover:bg-card"
                  }`}
                >
                  {p.cta} <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </Container>
      {showLaunchModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 px-4 backdrop-blur-sm"
          onClick={() => setShowLaunchModal(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-border bg-card p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowLaunchModal(false)}
              className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground hover:bg-background hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="inline-flex items-center gap-1.5 rounded-md border border-[color:var(--signal)]/40 bg-[color:var(--signal)]/10 px-2.5 py-0.5 text-[10px] font-medium text-[color:var(--signal)]">
              <Sparkles className="h-3 w-3" /> Early access
            </div>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">Get early access.</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Get 1 month of Pro free plus a lifetime 40% discount when paid plans go live.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <a
                href="#"
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:bg-foreground/90"
              >
                Get early access <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <button
                type="button"
                onClick={() => setShowLaunchModal(false)}
                className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium hover:bg-card"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
