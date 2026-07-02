import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container, SectionTitle } from "@/components/home/primitives";

const faqs = [
  { q: "Do you guess missing information?", a: "No. If budget, country, service type, or contact details are not clear from the original post, Postly marks the field as unknown — we never invent details." },
  { q: "Can I see the original post?", a: "Yes. Each opportunity includes source proof with a direct link so you can verify the original post before contacting anyone." },
  { q: "Can I export leads to my own CRM?", a: "Yes. Pro users can export opportunities as CSV and plug them into HubSpot, Pipedrive, Notion, Airtable, or any outreach workflow you already use." },
  { q: "How fast do new posts show up in Postly?", a: "Most public posts appear in your feed within a few hours of being published, depending on the platform and source activity." },
  { q: "Do I need to connect my own social accounts?", a: "No. Postly reads only publicly-visible posts through its own infrastructure — you don't connect Facebook, LinkedIn, or Reddit accounts." },
  { q: "What happens if I cancel?", a: "You keep access until the end of your billing period, and any leads you've already exported stay yours. No lock-in, no data held hostage." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section-edge section-light">
      <Container className="py-16 md:py-20">
        <SectionTitle kicker="FAQ" title={<>Common <span className="text-[color:var(--signal)]">questions.</span></>} />
        <div className="mt-10 divide-y divide-border rounded-xl border border-border bg-card/50">
          {faqs.map((f, i) => (
            <div key={i}>
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5">
                <span className="text-sm font-medium md:text-base">{f.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <div className="px-5 pb-5 text-sm text-muted-foreground md:px-6 md:pb-6">{f.a}</div>}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
