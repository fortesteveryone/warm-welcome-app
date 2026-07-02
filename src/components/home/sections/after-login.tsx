import { Filter, Link2, ListChecks, Shield } from "lucide-react";
import { Container, Mono, SectionTitle } from "@/components/home/primitives";

const afterLoginItems = [
  { Icon: ListChecks, title: "Structured opportunity profile", body: "Each post becomes a clean profile with title, summary, service need, project type, budget signal, and source platform." },
  { Icon: Link2,      title: "Original post proof",            body: "Open the source post and verify the author, post time, platform, comments, and context before outreach." },
  { Icon: Filter,     title: "Save, tag & export",             body: "Favourite opportunities, apply tags, filter by platform or country, and export to CSV or your CRM." },
];

export function AfterLogin() {
  return (
    <section id="features" className="section-edge section-dark">
      <Container className="py-16 md:py-20">
        <SectionTitle
          kicker="After login"
          title={<>Exactly what you get <span className="text-[color:var(--signal)]">inside your account.</span></>}
          lede="Your dashboard shows the information needed to verify, prioritize, and manage website opportunities from one place."
        />
        <div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {afterLoginItems.map(({ Icon, title, body }, i) => (
            <div key={title} className="group relative rounded-xl border border-border bg-white p-6 transition hover:shadow-sm">
              <div className="flex items-center justify-between">
                <div className="icon-pop grid h-10 w-10 place-items-center rounded-lg border border-border bg-white text-[color:var(--signal)]">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <Mono className="text-muted-foreground">0{i + 1}</Mono>
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-tight">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
          <Shield className="h-3.5 w-3.5 text-[color:var(--signal)]" />
          <span>If a field is missing from the original post, Postly marks it as <span className="text-foreground">unknown</span>. We do not guess country, budget, or service type.</span>
        </div>
      </Container>
    </section>
  );
}
