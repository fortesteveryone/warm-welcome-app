import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Mail, Phone, MapPin, Building2, Search, Download, LayoutGrid, List, X } from "lucide-react";
import { PageHeader, Panel, Avatar, Badge, Mono } from "@/components/dashboard/dash-ui";
import { FormDialog, Field, fieldCls, textareaCls, gridCls } from "@/components/dashboard/form-dialog";

type Contact = { name: string; role: string; company: string; email: string; phone: string; city: string; tags: string[] };

export const Route = createFileRoute("/dashboard/contacts")({
  component: ContactsPage,
});

const INITIAL_CONTACTS: Contact[] = [
  { name: "Aisha Rahman", role: "Founder", company: "Velvet & Co.", email: "aisha@velvet.co", phone: "+880 1711 234567", city: "Dhaka, BD", tags: ["VIP", "Apparel"] },
  { name: "Marcus Lin", role: "CMO", company: "Northwave Studio", email: "marcus@northwave.io", phone: "+1 415 555 0144", city: "San Francisco, US", tags: ["Agency"] },
  { name: "Priya Devi", role: "Owner", company: "Saffron Kitchen", email: "priya@saffron.kitchen", phone: "+91 98765 43210", city: "Mumbai, IN", tags: ["F&B", "Local"] },
  { name: "Jonas Weber", role: "Ops Lead", company: "Atlas Logistics", email: "j.weber@atlas-log.de", phone: "+49 30 9876543", city: "Berlin, DE", tags: ["Enterprise"] },
  { name: "Camila Reyes", role: "Marketing", company: "Lumen Health", email: "camila@lumenhealth.io", phone: "+34 612 345 678", city: "Madrid, ES", tags: ["Healthcare"] },
  { name: "Yuki Tanaka", role: "Founder", company: "Mori Apparel", email: "yuki@moriapparel.jp", phone: "+81 80 1234 5678", city: "Tokyo, JP", tags: ["Apparel", "VIP"] },
  { name: "Elena Costa", role: "Director", company: "Costa Wines", email: "elena@costawines.it", phone: "+39 06 1234 5678", city: "Rome, IT", tags: ["F&B", "Luxury"] },
  { name: "Mei Wong", role: "Founder", company: "Lotus Travel", email: "mei@lotustravel.sg", phone: "+65 8123 4567", city: "Singapore, SG", tags: ["Travel", "VIP"] },
  { name: "Aaliyah Khan", role: "Partner", company: "Khan Legal", email: "aaliyah@khanlegal.ae", phone: "+971 4 123 4567", city: "Dubai, AE", tags: ["Legal"] },
];

function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [addOpen, setAddOpen] = useState(false);

  const allTags = useMemo(() => Array.from(new Set(contacts.flatMap((c) => c.tags))).sort(), [contacts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return contacts.filter((c) => {
      if (tags.length && !tags.every((t) => c.tags.includes(t))) return false;
      if (!q) return true;
      return c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.city.toLowerCase().includes(q);
    });
  }, [contacts, query, tags]);

  const toggleTag = (t: string) => setTags((cur) => cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]);

  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Contacts"
        title="People & companies"
        description="Your unified address book — synced with leads and deals."
        actions={
          <>
            <button className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-card/50 px-3 text-sm hover:bg-card">
              <Download className="h-3.5 w-3.5" /> Export
            </button>
            <button className="inline-flex h-9 items-center gap-1.5 rounded-md bg-foreground px-3 text-sm font-medium text-background hover:bg-foreground/90">
              <Plus className="h-3.5 w-3.5" /> Add contact
            </button>
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[240px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search contacts…" className="h-9 w-full rounded-md border border-border bg-card/50 pl-9 pr-3 text-sm focus:border-foreground/40 focus:outline-none" />
        </div>
        <div className="flex items-center gap-1 rounded-md border border-border bg-card/50 p-0.5">
          <button onClick={() => setView("grid")} className={`grid h-8 w-8 place-items-center rounded ${view === "grid" ? "bg-foreground/10 text-foreground" : "text-muted-foreground"}`}><LayoutGrid className="h-3.5 w-3.5" /></button>
          <button onClick={() => setView("list")} className={`grid h-8 w-8 place-items-center rounded ${view === "list" ? "bg-foreground/10 text-foreground" : "text-muted-foreground"}`}><List className="h-3.5 w-3.5" /></button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Mono className="text-muted-foreground">Filter by tag:</Mono>
        {ALL_TAGS.map((t) => (
          <button
            key={t}
            onClick={() => toggleTag(t)}
            className={`rounded-full border px-2.5 py-0.5 text-[11px] transition ${tags.includes(t) ? "border-foreground/40 bg-foreground/10 text-foreground" : "border-border bg-card/50 text-muted-foreground hover:text-foreground"}`}
          >{t}</button>
        ))}
        {(tags.length > 0 || query) && (
          <button onClick={() => { setTags([]); setQuery(""); }} className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground">
            <X className="h-3 w-3" /> Clear
          </button>
        )}
        <Mono className="ml-auto text-muted-foreground">{filtered.length} of {CONTACTS.length}</Mono>
      </div>

      {filtered.length === 0 ? (
        <Panel><div className="p-12 text-center text-sm text-muted-foreground">No contacts match your filters.</div></Panel>
      ) : view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
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
                </div>
              </div>
            </Panel>
          ))}
        </div>
      ) : (
        <Panel>
          <ul className="divide-y divide-border">
            {filtered.map((c) => (
              <li key={c.email} className="flex items-center gap-4 px-5 py-3">
                <Avatar name={c.name} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{c.name} <span className="text-muted-foreground">· {c.role}</span></div>
                  <div className="truncate text-xs text-muted-foreground">{c.company} · {c.email}</div>
                </div>
                <div className="hidden text-xs text-muted-foreground md:block">{c.city}</div>
                <div className="hidden gap-1.5 lg:flex">{c.tags.map((t) => (<Badge key={t} tone="muted">{t}</Badge>))}</div>
              </li>
            ))}
          </ul>
        </Panel>
      )}
    </div>
  );
}
