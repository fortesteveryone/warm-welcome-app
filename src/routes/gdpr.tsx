import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/page-shell";

export const Route = createFileRoute("/gdpr")({
  head: () => ({
    meta: [
      { title: "GDPR — Postly" },
      { name: "description", content: "How Postly supports GDPR rights for EU/EEA/UK customers and post authors." },
      { property: "og:title", content: "GDPR — Postly" },
      { property: "og:description", content: "Data subject rights, lawful basis, and how to file a request." },
    ],
  }),
  component: GdprPage,
});

function GdprPage() {
  return (
    <PageShell
      kicker="Legal"
      title="GDPR & data subject rights"
      lede="If you are in the EU, EEA or UK — or are the author of a post we have surfaced — you have specific rights over your personal data. Here's how to exercise them."
      updated="June 2026"
    >
      <Section title="1. Your rights">
        <ul className="list-inside list-disc space-y-1.5">
          <li>Access — get a copy of the data we hold about you.</li>
          <li>Rectification — correct anything inaccurate.</li>
          <li>Erasure — ask us to delete your data.</li>
          <li>Restriction — pause processing while a dispute is resolved.</li>
          <li>Portability — receive your data in a machine-readable format.</li>
          <li>Objection — object to processing based on legitimate interest.</li>
        </ul>
      </Section>
      <Section title="2. Lawful basis">
        <p>We process customer account data under contract (running your account). We process public post data under legitimate interest to deliver a sales intelligence service, balanced against the rights of post authors who have chosen to publish publicly.</p>
      </Section>
      <Section title="3. How to file a request">
        <p>Email <a className="text-foreground underline" href="mailto:privacy@growbylead.com">privacy@growbylead.com</a> from the address on the account (or, for post authors, with a link to the post and evidence you are the author). We respond within 30 days, usually much sooner.</p>
      </Section>
      <Section title="4. International transfers">
        <p>Where data leaves the EU/EEA/UK we rely on Standard Contractual Clauses with our subprocessors.</p>
      </Section>
      <Section title="5. Supervisory authority">
        <p>You always have the right to lodge a complaint with your local data protection authority.</p>
      </Section>
      <Section title="6. Data Processing Agreement (DPA)">
        <p>Business customers can request a Data Processing Agreement at <a className="text-foreground underline" href="mailto:privacy@growbylead.com">privacy@growbylead.com</a>. We countersign and return within a few business days.</p>
      </Section>
    </PageShell>
  );
}
