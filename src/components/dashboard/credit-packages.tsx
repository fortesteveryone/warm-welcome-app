import { Check, Zap, Sparkles, Rocket, Crown } from "lucide-react";
import { Mono } from "./dash-ui";

export type CreditPackage = {
  id: string;
  name: string;
  price: number;          // USD
  credits: number;        // leads
  perCredit: number;      // USD/credit
  features: string[];
  badge?: "Popular" | "Best value" | null;
  icon: typeof Zap;
};

export const CREDIT_PACKAGES: CreditPackage[] = [
  {
    id: "starter",
    name: "Starter",
    price: 10,
    credits: 500,
    perCredit: 0.02,
    features: ["500 lead opens", "Email support", "Valid for 60 days"],
    icon: Zap,
  },
  {
    id: "growth",
    name: "Growth",
    price: 25,
    credits: 1500,
    perCredit: 0.0167,
    features: ["1,500 lead opens", "Saved searches", "Priority filters", "Valid for 90 days"],
    badge: "Popular",
    icon: Sparkles,
  },
  {
    id: "scale",
    name: "Scale",
    price: 75,
    credits: 5000,
    perCredit: 0.015,
    features: ["5,000 lead opens", "Outreach drafts unlimited", "Team seats (3)", "Valid for 180 days"],
    badge: "Best value",
    icon: Rocket,
  },
  {
    id: "agency",
    name: "Agency",
    price: 199,
    credits: 15000,
    perCredit: 0.0133,
    features: ["15,000 lead opens", "Unlimited team seats", "Dedicated success manager", "Never expires"],
    icon: Crown,
  },
];

export function CreditPackages({
  compact = false,
  onBuy,
}: {
  compact?: boolean;
  onBuy?: (pkg: CreditPackage) => void;
}) {
  return (
    <div className={`grid gap-3 ${compact ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
      {CREDIT_PACKAGES.map((pkg) => {
        const Icon = pkg.icon;
        const highlighted = pkg.badge === "Popular";
        return (
          <article
            key={pkg.id}
            className={`relative flex flex-col rounded-xl border bg-card/40 p-4 transition hover:bg-card/70 ${
              highlighted ? "border-foreground/40 ring-1 ring-foreground/20" : "border-border"
            }`}
          >
            {pkg.badge && (
              <span
                className={`absolute -top-2 right-3 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                  pkg.badge === "Popular"
                    ? "bg-foreground text-background"
                    : "border border-border bg-background text-foreground"
                }`}
              >
                {pkg.badge}
              </span>
            )}

            <header className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-foreground/[0.06] ring-1 ring-foreground/15">
                <Icon className="h-4 w-4 text-foreground" />
              </span>
              <div>
                <Mono className="text-muted-foreground">Pack</Mono>
                <div className="text-sm font-semibold tracking-tight">{pkg.name}</div>
              </div>
            </header>

            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-2xl font-semibold tracking-tight">${pkg.price}</span>
              <span className="text-xs text-muted-foreground">one-time</span>
            </div>
            <div className="mt-0.5 text-xs text-muted-foreground">
              {pkg.credits.toLocaleString()} credits · ${pkg.perCredit.toFixed(4)}/lead
            </div>

            {!compact && (
              <ul className="mt-3 space-y-1.5 border-t border-border pt-3 text-xs text-foreground/85">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-1.5">
                    <Check className="mt-[2px] h-3 w-3 shrink-0 text-foreground" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={() => onBuy?.(pkg)}
              className={`mt-4 inline-flex h-9 items-center justify-center rounded-md text-sm font-medium transition ${
                highlighted
                  ? "bg-foreground text-background hover:bg-foreground/90"
                  : "border border-border bg-background/60 text-foreground hover:bg-card"
              }`}
            >
              Buy {pkg.credits.toLocaleString()} credits
            </button>
          </article>
        );
      })}
    </div>
  );
}
