import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/page-shell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Postly" },
      { name: "description", content: "Postly turns public social media posts into structured, scored, outreach-ready leads for website design, development and CMS sellers." },
      { property: "og:title", content: "About — Postly" },
      { property: "og:description", content: "Who we are, what we do, and why we built Postly." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell
      kicker="About"
      title="We turn social noise into sales-ready leads."
      lede="Postly is a focused buying-signal platform for people who sell website design, development and SEO services."
    >
      <Section title="Why we exist">
        <p>
          Every day, thousands of business owners post on Facebook, Reddit, LinkedIn and Instagram asking for help with
          their website or SEO. Those posts are real buying signals — but they're scattered, repetitive, and impossible
          to track manually.
        </p>
        <p>
          We built Postly to capture those signals, structure them into clean lead profiles, score them by intent
          and temperature, and deliver them to your inbox with outreach drafts already written.
        </p>
      </Section>

      <Section title="What we believe">
        <p>
          Good leads beat clever automation. We'd rather show you 50 real, manually-reviewed posts than 5,000 scraped
          rows you'll never read. Every lead we publish has a working link back to the original post — so you can
          verify the buyer before you reach out.
        </p>
      </Section>

      <Section title="Who it's for">
        <p>
          Web design agencies, freelance designers and developers, Webflow / WordPress / Wix / Framer studios, SEO
          experts, local SEO agencies, lead-gen agencies, and small sales teams selling website &amp; SEO services.
        </p>
      </Section>

      <Section title="Where we're going">
        <p>
          More platforms, more countries, deeper scoring, and tighter CRM integrations. We ship every week and our
          public changelog will go live soon.
        </p>
      </Section>
    </PageShell>
  );
}
