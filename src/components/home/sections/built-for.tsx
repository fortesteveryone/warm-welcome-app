import { Code2, Globe, Paintbrush, ShoppingBag, Users, Wand2 } from "lucide-react";
import { Container, SectionTitle } from "@/components/home/primitives";

const builtForCards: { Icon: typeof Paintbrush; title: string; body: string; lgOnly?: boolean }[] = [
  { Icon: Paintbrush,  title: "Freelance web designers",   body: "Find people asking for redesigns, portfolio updates, landing pages, small website fixes, and Shopify store refreshes." },
  { Icon: Code2,       title: "WordPress developers",      body: "Track posts about WordPress setup, checkout issues, plugin fixes, rebuilds, and CMS migrations from Wix or Shopify." },
  { Icon: Wand2,       title: "Webflow / Framer studios",  body: "Find founders and businesses looking for modern rebuilds, landing pages, CMS improvements, and platform migrations." },
  { Icon: Users,       title: "Small web agencies",        body: "Build a daily outreach pipeline from public website-service requests — including Shopify rebuilds and CMS migration projects." },
  { Icon: ShoppingBag, title: "Shopify & e-commerce devs", body: "Catch store owners asking for Shopify builds, theme customization, checkout fixes, and migrations from WooCommerce or Wix.", lgOnly: true },
  { Icon: Globe,       title: "Full-stack & custom devs",  body: "Pick up posts asking for Next.js, React, Laravel, PHP, or Node builds — not just CMS work, any stack is fair game.", lgOnly: true },
];

export function BuiltFor() {
  return (
    <section id="built-for" className="section-edge section-dark">
      <Container className="py-16 md:py-20">
        <SectionTitle
          kicker="Built for"
          title={<>Built for <span className="text-[color:var(--signal)]">website service sellers.</span></>}
          lede="Postly is made for teams that sell website work and need a cleaner way to find active demand."
        />
        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {builtForCards.map(({ Icon, title, body, lgOnly }) => (
            <div key={title} className={`group rounded-xl border border-border bg-white p-6 transition hover:-translate-y-0.5 hover:border-[color:var(--signal)]/40 hover:shadow-[0_20px_60px_-30px_oklch(0.72_0.19_145/0.35)] ${lgOnly ? "hidden lg:block" : ""}`}>
              <div className="icon-pop grid h-10 w-10 place-items-center rounded-lg border border-border bg-white text-[color:var(--signal)]">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-tight">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
