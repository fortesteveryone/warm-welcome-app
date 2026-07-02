import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/page-shell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Postly" },
      { name: "description", content: "The terms under which Postly is offered to customers." },
      { property: "og:title", content: "Terms of Service — Postly" },
      { property: "og:description", content: "Account rules, acceptable use, billing and termination." },
      { property: "og:url", content: "https://friendly-code-place.lovable.app/terms" },
    ],
    links: [{ rel: "canonical", href: "https://friendly-code-place.lovable.app/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <PageShell
      kicker="Legal"
      title="Terms of service"
      lede="Plain-English rules for using Postly. By creating an account you agree to these terms."
      updated="June 2026"
    >
      <Section title="1. The service">
        <p>Postly surfaces public social media posts as structured leads and provides tools to filter, score, export and message them. We may add, change or remove features over time.</p>
      </Section>
      <Section title="2. Your account">
        <p>You are responsible for keeping login credentials secret and for everything done under your account. Don't share a single seat across multiple people on plans that are sold per-seat.</p>
      </Section>
      <Section title="3. Acceptable use">
        <p>No spam, no scraping our service, no reselling raw lead data as your own product, no harassment of authors of the posts we surface. We reserve the right to suspend accounts that abuse the service or our customers.</p>
      </Section>
      <Section title="4. Billing">
        <p>Plans are billed monthly or yearly in advance and renew automatically. Taxes are added where required. You can cancel any time from account settings; cancellation takes effect at the end of the current billing period.</p>
      </Section>
      <Section title="5. Refunds">
        <p>See the <a className="text-foreground underline" href="/refund">refund policy</a>.</p>
      </Section>
      <Section title="6. Liability">
        <p>The service is provided as-is. We are not liable for missed deals, lost opportunities or business decisions made based on the leads we surface. Our total liability is capped at the amount you paid in the prior 12 months.</p>
      </Section>
      <Section title="7. Governing law">
        <p>These terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein, without regard to conflict-of-law rules. Any dispute arising out of or relating to these terms or the service will be resolved exclusively in the courts located in Toronto, Ontario, Canada, and you consent to their personal jurisdiction.</p>
      </Section>
      <Section title="8. Changes">
        <p>If we make material changes to these terms we'll email account owners at least 14 days in advance.</p>
      </Section>
    </PageShell>
  );
}
