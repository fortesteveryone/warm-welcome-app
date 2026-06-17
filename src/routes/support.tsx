import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MessageSquare, BookOpen, AlertCircle } from "lucide-react";
import { PageShell, Section } from "@/components/page-shell";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support — Grow By Lead" },
      { name: "description", content: "Help, troubleshooting and contact channels for Grow By Lead customers." },
      { property: "og:title", content: "Support — Grow By Lead" },
      { property: "og:description", content: "How to reach support, what we cover, and typical response times." },
    ],
  }),
  component: SupportPage,
});

const options = [
  { Icon: Mail, title: "Email support", desc: "Best for account, billing or lead-quality questions.", action: "support@growbylead.com", href: "mailto:support@growbylead.com" },
  { Icon: MessageSquare, title: "In-app chat", desc: "Available to all paid plans, Mon–Fri 09:00–18:00 GMT.", action: "Open the dashboard chat", href: "#" },
  { Icon: BookOpen, title: "Guides & docs", desc: "Step-by-step guides for filters, exports and outreach.", action: "Coming soon", href: "#", soon: true },
  { Icon: AlertCircle, title: "Report a bad lead", desc: "Wrong country, broken link, duplicate post — tell us and we'll refund the credit.", action: "report@growbylead.com", href: "mailto:report@growbylead.com" },
];

function SupportPage() {
  return (
    <PageShell
      kicker="Support"
      title="Real humans, fast answers."
      lede="Most tickets are answered the same day. We do not outsource support — every reply comes from someone who actually builds the product."
    >
      <div className="grid gap-3 md:grid-cols-2">
        {options.map(({ Icon, title, desc, action, href, soon }) => (
          <a
            key={title}
            href={href}
            className={`group flex flex-col gap-2 rounded-xl border border-border bg-card/50 p-5 transition ${soon ? "cursor-default" : "hover:bg-card"}`}
          >
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-background/40 text-[color:var(--signal)]">
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <span className="text-sm font-semibold text-foreground">{title}</span>
              {soon && (
                <span className="rounded-full border border-border bg-card/60 px-1.5 py-px text-[9px] font-medium uppercase tracking-wide text-muted-foreground">
                  Soon
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{desc}</p>
            <span className="mt-1 text-sm font-medium text-foreground">{action}</span>
          </a>
        ))}
      </div>

      <Section title="Response times">
        <ul className="list-inside list-disc space-y-1.5">
          <li>Free trial: within 2 business days.</li>
          <li>Starter &amp; Pro: within 1 business day.</li>
          <li>Agency: priority queue, typically under 4 hours during core hours.</li>
        </ul>
      </Section>

      <Section title="What support covers">
        <ul className="list-inside list-disc space-y-1.5">
          <li>Account, login and billing issues.</li>
          <li>Lead quality, duplicates, country mismatches, broken source links.</li>
          <li>Export problems (CSV / JSON) and filter behaviour.</li>
          <li>Bug reports — we triage every single one.</li>
        </ul>
        <p>
          For partnership or press requests, use the channels on the{" "}
          <Link to="/contact" className="text-foreground underline">contact page</Link>.
        </p>
      </Section>
    </PageShell>
  );
}
