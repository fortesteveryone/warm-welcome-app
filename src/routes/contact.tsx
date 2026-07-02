import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageSquare, Briefcase, LifeBuoy, ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Postly" },
      { name: "description", content: "Get in touch with Postly — sales, support, partnerships and press." },
      { property: "og:title", content: "Contact — Postly" },
      { property: "og:description", content: "Reach our sales, support and partnerships teams." },
      { property: "og:url", content: "https://friendly-code-place.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://friendly-code-place.lovable.app/contact" }],
  }),
  component: ContactPage,
});

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

function ContactPage() {
  return (
    <PageShell
      kicker="Contact"
      title="Talk to a human"
      lede="Pick the right inbox below — it lands in front of the right person faster than any contact form. Real replies from the team that ships Postly."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {channels.map(({ Icon, tag, title, desc, value, reply }) => (
          <a
            key={value}
            href={`mailto:${value}`}
            className="group relative flex flex-col gap-3 rounded-2xl border border-border bg-white p-6 transition hover:-translate-y-0.5 hover:border-[color:var(--signal)]/40 hover:shadow-[0_20px_60px_-30px_oklch(0.72_0.19_145/0.35)]"
          >
            <div className="flex items-center justify-between">
              <span className="icon-pop grid h-10 w-10 place-items-center rounded-xl border border-border bg-background text-[color:var(--signal)]">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-tight text-muted-foreground">
                {tag}
              </span>
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
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
    </PageShell>
  );
}
