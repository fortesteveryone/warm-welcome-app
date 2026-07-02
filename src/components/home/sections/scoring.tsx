import { Container, Mono, SectionTitle } from "@/components/home/primitives";

const scoringFactors: [string, string][] = [
  ["Intent level", "Does the post directly ask for website help, or only mention a general problem?"],
  ["Urgency", "Words like ASAP, urgent, today, or quickly increase the priority."],
  ["Budget signal", "Any mention of budget, price, hourly rate, or payment readiness."],
  ["Competition", "How many visible comments and replies exist at capture time."],
  ["Freshness", "How recently the post was published."],
  ["Service fit", "Whether the request matches website design, development, redesign, rebuild, landing page, or CMS work."],
];

export function Scoring() {
  return (
    <section id="scoring" className="section-edge section-dark relative overflow-hidden">
      <Container className="relative py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:items-start">
          <div className="md:sticky md:top-24">
            <SectionTitle
              kicker="Scoring"
              title={<>Six factors. <span className="text-[color:var(--signal)]">Clear reasons.</span></>}
              lede="Each opportunity is scored using visible signals from the post, so your team understands why it should be prioritized."
            />
            <div className="mt-6 rounded-xl border border-border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <Mono className="text-muted-foreground">AI reasoning</Mono>
                <span className="rounded-md bg-[color:var(--signal)]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[color:var(--signal)]">AI</span>
              </div>
              <p className="mt-3 text-sm">
                <span className="text-[color:var(--signal)]">Low competition.</span> Based on visible comments at capture time, this post has fewer competing replies than similar website-service requests.
              </p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {scoringFactors.map(([t, b], i) => (
              <div key={t} className="group relative overflow-hidden rounded-xl border border-border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[color:var(--signal)]/30">
                <div className="flex items-center justify-between">
                  <Mono className="text-muted-foreground">F.0{i + 1}</Mono>
                  <span className="rounded-md bg-[color:var(--signal)]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[color:var(--signal)]">AI</span>
                </div>
                <h3 className="mt-3 text-base font-semibold tracking-tight">{t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
