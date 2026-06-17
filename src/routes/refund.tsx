import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/page-shell";

export const Route = createFileRoute("/refund")({
  head: () => ({
    meta: [
      { title: "Refund Policy — Grow By Lead" },
      { name: "description", content: "When and how Grow By Lead issues refunds and lead credits." },
      { property: "og:title", content: "Refund Policy — Grow By Lead" },
      { property: "og:description", content: "Our 7-day money-back guarantee, lead credits, and how to request a refund." },
    ],
  }),
  component: RefundPage,
});

function RefundPage() {
  return (
    <PageShell
      kicker="Legal"
      title="Refund policy"
      lede="A simple 7-day money-back guarantee on first purchases, plus per-lead credits when something we ship isn't right."
      updated="June 2026"
    >
      <Section title="1. 7-day money-back guarantee">
        <p>If you're not happy with your first paid month, email us within 7 days of the first charge and we'll refund 100%. No forms, no calls.</p>
      </Section>
      <Section title="2. Bad-lead credits">
        <p>If a lead has a broken source link, is a duplicate of one we shipped in the past 30 days, or is in a country you've explicitly excluded, report it and we credit your account for the next billing cycle.</p>
      </Section>
      <Section title="3. Yearly plans">
        <p>Yearly plans are refundable on a pro-rata basis within the first 30 days. After 30 days, the current period is non-refundable but you can cancel renewal at any time.</p>
      </Section>
      <Section title="4. What isn't refundable">
        <p>Charges for usage outside the trial / guarantee window where the service worked as described, and add-ons explicitly marked non-refundable at purchase.</p>
      </Section>
      <Section title="5. How to request">
        <p>Email <a className="text-foreground underline" href="mailto:billing@growbylead.com">billing@growbylead.com</a> from the address on your account. Most refunds are processed within 3 business days.</p>
      </Section>
    </PageShell>
  );
}
