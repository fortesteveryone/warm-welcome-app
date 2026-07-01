import { createFileRoute } from "@tanstack/react-router";
import {
  Mail,
  MessageSquare,
  Briefcase,
  LifeBuoy,
  Clock,
  Globe2,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import type { ReactNode } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Postly" },
      { name: "description", content: "Get in touch with Postly — sales, support, partnerships and press." },
      { property: "og:title", content: "Contact — Postly" },
      { property: "og:description", content: "Reach our sales, support and partnerships teams." },
    ],
  }),
  component: ContactPage,
});

function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-6 ${className}`}>{children}</div>;
}

function Mono({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`font-mono text-[11px] tracking-tight uppercase ${className}`}>{children}</span>;
}

const channels = [
  {
    Icon: Briefcase,
    tag: "Sales",
    title: "Sales & agencies",
    desc: "Custom plans, volume pricing, white-label and agency partnerships.",
    value: "sales@growbylead.com",
    reply: "Same business day",
  },
  {
    Icon: LifeBuoy,
    tag: "Support",
    title: "Customer support",
    desc: "Account, billing, lead quality, missing posts and product bugs.",
    value: "support@growbylead.com",
    reply: "Within 12 hours",
  },
  {
    Icon: MessageSquare,
    tag: "Partners",
    title: "Partnerships & press",
    desc: "Integrations, affiliates, press kits, interviews and joint launches.",
    value: "partners@growbylead.com",
    reply: "Within 2 business days",
  },
  {
    Icon: Mail,
    tag: "General",
    title: "General enquiries",
    desc: "Anything that doesn't fit the boxes above — we'll route it internally.",
    value: "hello@growbylead.com",
    reply: "Within 1 business day",
  },
];

const facts = [
  { Icon: Clock, title: "Reply time", body: "Under 24 hours on business days across every inbox." },
  { Icon: Globe2, title: "Coverage", body: "Remote team spanning Asia, Europe and North America." },
  { Icon: ShieldCheck, title: "Privacy", body: "Your message stays with the Postly team — never shared." },
];

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden section-edge section-dark">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(1_0_0/0.06),transparent_60%)]" />
        </div>
        <Container className="py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Mono className="text-muted-foreground">Contact</Mono>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
              Talk to a human,{" "}
              <span className="text-[color:var(--signal)]">not a bot.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-[680px] text-base text-muted-foreground md:text-lg">
              Pick the right inbox below — it lands in front of the right person faster than any
              contact form. Real replies from the team that ships Postly.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--signal)]/40 bg-[color:var(--signal)]/10 px-3 py-1 text-xs text-[color:var(--signal)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--signal)]" />
              Average first reply · under 24h
            </div>
          </div>
        </Container>
      </section>

      {/* Channels */}
      <section className="section-edge section-light">
        <Container className="py-16 md:py-20">
          <div className="grid gap-4 md:grid-cols-2">
            {channels.map(({ Icon, tag, title, desc, value, reply }) => (
              <a
                key={value}
                href={`mailto:${value}`}
                className="group relative flex flex-col gap-3 rounded-2xl border border-border bg-white p-6 transition hover:-translate-y-0.5 hover:border-[color:var(--signal)]/40 hover:shadow-[0_20px_60px_-30px_oklch(0.72_0.19_145/0.35)]"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-background text-[color:var(--signal)]">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <Mono className="text-muted-foreground">{tag}</Mono>
                </div>
                <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
                <div className="mt-2 flex items-end justify-between border-t border-border pt-3">
                  <div>
                    <div className="text-sm font-medium text-foreground group-hover:underline">
                      {value}
                    </div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">Replies · {reply}</div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--signal)]" />
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Facts strip */}
      <section className="section-edge section-dark">
        <Container className="py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <Mono className="text-muted-foreground">What to expect</Mono>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              A team that actually{" "}
              <span className="text-[color:var(--signal)]">writes back.</span>
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {facts.map(({ Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-background text-[color:var(--signal)]">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <div className="mt-4 text-base font-semibold tracking-tight">{title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <SiteFooter />
    </div>
  );
}
