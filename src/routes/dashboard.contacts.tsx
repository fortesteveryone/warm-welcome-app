import { createFileRoute } from "@tanstack/react-router";
import { Plus, Mail, Phone, MapPin, Building2 } from "lucide-react";
import { PageHeader, Panel, Avatar, Badge, Mono } from "@/components/dashboard/dash-ui";

export const Route = createFileRoute("/dashboard/contacts")({
  component: ContactsPage,
});

const CONTACTS = [
  { name: "Aisha Rahman", role: "Founder", company: "Velvet & Co.", email: "aisha@velvet.co", phone: "+880 1711 234567", city: "Dhaka, BD", tags: ["VIP", "Apparel"] },
  { name: "Marcus Lin", role: "CMO", company: "Northwave Studio", email: "marcus@northwave.io", phone: "+1 415 555 0144", city: "San Francisco, US", tags: ["Agency"] },
  { name: "Priya Devi", role: "Owner", company: "Saffron Kitchen", email: "priya@saffron.kitchen", phone: "+91 98765 43210", city: "Mumbai, IN", tags: ["F&B", "Local"] },
  { name: "Jonas Weber", role: "Ops Lead", company: "Atlas Logistics", email: "j.weber@atlas-log.de", phone: "+49 30 9876543", city: "Berlin, DE", tags: ["Enterprise"] },
  { name: "Camila Reyes", role: "Marketing", company: "Lumen Health", email: "camila@lumenhealth.io", phone: "+34 612 345 678", city: "Madrid, ES", tags: ["Healthcare"] },
  { name: "Yuki Tanaka", role: "Founder", company: "Mori Apparel", email: "yuki@moriapparel.jp", phone: "+81 80 1234 5678", city: "Tokyo, JP", tags: ["Apparel", "VIP"] },
];

function ContactsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Contacts"
        title="People & companies"
        description="Your unified address book — synced with leads and deals."
        actions={
          <button className="inline-flex h-9 items-center gap-1.5 rounded-md bg-foreground px-3 text-sm font-medium text-background hover:bg-foreground/90">
            <Plus className="h-3.5 w-3.5" /> Add contact
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CONTACTS.map((c) => (
          <Panel key={c.email}>
            <div className="p-5">
              <div className="flex items-start gap-3">
                <Avatar name={c.name} className="h-10 w-10" />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold">{c.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{c.role}</div>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground"><Building2 className="h-3.5 w-3.5" /> {c.company}</div>
                <div className="flex items-center gap-2 text-muted-foreground"><Mail className="h-3.5 w-3.5" /> <a className="truncate hover:text-foreground" href={`mailto:${c.email}`}>{c.email}</a></div>
                <div className="flex items-center gap-2 text-muted-foreground"><Phone className="h-3.5 w-3.5" /> {c.phone}</div>
                <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> {c.city}</div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border pt-3">
                {c.tags.map((t) => (<Badge key={t} tone="muted">{t}</Badge>))}
                <Mono className="ml-auto text-muted-foreground">Updated 2d ago</Mono>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
