import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageSquare, Briefcase, LifeBuoy } from "lucide-react";
import { PageShell, Section } from "@/components/page-shell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Grow By Lead" },
      { name: "description", content: "Get in touch with Grow By Lead — sales, support, partnerships and press." },
      { property: "og:title", content: "Contact — Grow By Lead" },
      { property: "og:description", content: "Reach our sales, support and partnerships teams." },
    ],
  }),
  component: ContactPage,
});

const channels = [
  { Icon: Mail, title: "General enquiries", desc: "Anything that doesn't fit the boxes below.", value: "hello@growbylead.com" },
  { Icon: LifeBuoy, title: "Customer support", desc: "Account, billing, lead quality, missing posts.", value: "support@growbylead.com" },
  { Icon: Briefcase, title: "Sales & agencies", desc: "Custom plans, volume pricing, white-label.", value: "sales@growbylead.com" },
  { Icon: MessageSquare, title: "Partnerships & press", desc: "Integrations, affiliate, press kits, interviews.", value: "partners@growbylead.com" },
];

function ContactPage() {
  return (
    <PageShell
      kicker="Contact"
      title="We reply within one business day."
      lede="Pick the right inbox below — it gets to the right person faster than a contact form."
    >
      <div className="grid gap-3 md:grid-cols-2">
        {channels.map(({ Icon, title, desc, value }) => (
          <a
            key={value}
            href={`mailto:${value}`}
            className="group flex flex-col gap-2 rounded-xl border border-border bg-card/50 p-5 transition hover:bg-card"
          >
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-background/40 text-[color:var(--signal)]">
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <span className="text-sm font-semibold text-foreground">{title}</span>
            </div>
            <p className="text-sm text-muted-foreground">{desc}</p>
            <span className="mt-1 text-sm font-medium text-foreground group-hover:underline">{value}</span>
          </a>
        ))}
      </div>

      <Section title="Where we're based">
        <p>
          Grow By Lead is a fully-remote team. Our core hours overlap Asia, Europe and North America, so most messages
          get a same-day answer.
        </p>
      </Section>
    </PageShell>
  );
}
