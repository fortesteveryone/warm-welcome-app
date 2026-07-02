import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/page-shell";

export const Route = createFileRoute("/data-usage")({
  head: () => ({
    meta: [
      { title: "Data Usage Policy — Postly" },
      { name: "description", content: "What data Postly processes, why, and how it leaves the system." },
      { property: "og:title", content: "Data Usage Policy — Postly" },
      { property: "og:description", content: "Sources, processing, retention and deletion of the data we handle." },
    ],
  }),
  component: DataUsagePage,
});

function DataUsagePage() {
  return (
    <PageShell
      kicker="Legal"
      title="Data usage policy"
      lede="Where our lead data comes from, how we process it, and how we handle deletion requests."
      updated="June 2026"
    >
      <Section title="1. Sources">
        <p>Our lead content originates from publicly-visible posts on Facebook, LinkedIn, Reddit and Instagram (with more platforms in development). We do not run automated scrapers against these platforms and we do not access private groups, paid content, direct messages, or anything gated behind a login.</p>
      </Section>
      <Section title="2. How we collect">
        <p>A human research team discovers relevant public posts through normal browsing and platform-provided search. Each candidate is manually reviewed for relevance, then passed through AI to extract structured fields (service type, project type, budget signal, country signal) and to draft a clean, human-readable summary. A person signs off before the lead is published into customer feeds.</p>
      </Section>
      <Section title="3. What we extract">
        <p>Post URL, author handle as published, platform, timestamp, post text, engagement counts, and the structured summary above. When a field is uncertain we mark it unknown — we never guess country, budget or service type.</p>
      </Section>
      <Section title="4. How we score">
        <p>Each lead receives a temperature, intent, urgency and competition score with a short human-readable reason. Scores are heuristic, not predictions of outcome.</p>
      </Section>
      <Section title="5. Retention">
        <p>Active leads are retained while they remain publicly visible upstream. If the original post is deleted or made private, we remove the lead from active feeds within 24 hours of being notified.</p>
      </Section>
      <Section title="5. Customer exports">
        <p>Data you export (CSV / JSON) leaves our system at that point. You are responsible for compliant use of exported data under the laws that apply to you.</p>
      </Section>
      <Section title="6. Deletion requests">
        <p>If you are the author of a surfaced post and would like it removed, email <a className="text-foreground underline" href="mailto:privacy@growbylead.com">privacy@growbylead.com</a> with the post URL. We remove verified requests within 72 hours.</p>
      </Section>
    </PageShell>
  );
}
