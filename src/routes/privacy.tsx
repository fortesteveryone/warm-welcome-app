import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/page-shell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Postly" },
      { name: "description", content: "How Postly collects, stores and uses information about customers and the public posts we surface." },
      { property: "og:title", content: "Privacy Policy — Postly" },
      { property: "og:description", content: "Our approach to customer data, cookies and third-party processors." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <PageShell
      kicker="Legal"
      title="Privacy policy"
      lede="We collect the minimum we need to run the product, and we never sell customer data."
      updated="June 2026"
    >
      <Section title="1. What we collect">
        <p>When you create an account we store your name, email, billing details, IP address and basic usage analytics (pages visited, features used). Cookies are used only for session, preferences and aggregate analytics.</p>
      </Section>
      <Section title="2. How we use it">
        <p>To run your account, send service emails, prevent abuse, and improve the product. We do not use customer data to train third-party AI models.</p>
      </Section>
      <Section title="3. Public posts we surface">
        <p>Postly indexes publicly-visible posts on supported social platforms. We store the post URL, author handle (as published), platform, timestamp and content. If a post is deleted or made private upstream, we remove it from active feeds within 24 hours of being notified.</p>
      </Section>
      <Section title="4. Sharing & subprocessors">
        <p>We share data with hosting, payments and email delivery providers only as needed to operate the service. A current list is available on request.</p>
      </Section>
      <Section title="5. Your rights">
        <p>You can export your account data, correct it, or delete it at any time from account settings or by emailing privacy@growbylead.com.</p>
      </Section>
      <Section title="6. Contact">
        <p>Privacy questions: <a className="text-foreground underline" href="mailto:privacy@growbylead.com">privacy@growbylead.com</a>.</p>
      </Section>
    </PageShell>
  );
}
