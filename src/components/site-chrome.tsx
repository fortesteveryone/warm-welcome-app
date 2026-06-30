import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import logoAsset from "@/assets/growbylead-logo.png.asset.json";

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-6 ${className}`}>{children}</div>;
}

function Mono({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-mono text-[11px] tracking-tight ${className}`}>{children}</span>;
}

export function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  return <img src={logoAsset.url} alt="Grow By Lead" className={className} />;
}

/* Cross-route nav links. In-page anchors use `/#id` so they work from any route. */
const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Example", href: "/#example" },
  { label: "Platforms", href: "/#platforms" },
  { label: "Scoring", href: "/#scoring" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Dashboard", href: "/dashboard" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-7">
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <Logo className="h-9 w-auto" />
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-muted-foreground transition hover:text-foreground">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a href="#" className="hidden rounded-md border border-border bg-card/60 px-3.5 py-1.5 text-sm font-medium text-foreground transition hover:bg-card sm:inline-flex">
            Sign in
          </a>
          <a href="/#pricing" className="hidden items-center gap-1.5 rounded-md bg-foreground px-3.5 py-1.5 text-sm font-medium text-background transition hover:bg-foreground/90 sm:inline-flex">
            Get started <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-md border border-border bg-card/60 text-foreground transition hover:bg-card md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </Container>

      <div
        className={`absolute left-0 right-0 top-full overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden ${
          open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <Container className="flex flex-col gap-1 py-3">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm text-foreground/90 transition hover:bg-card"
            >
              <span>{l.label}</span>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
            </a>
          ))}
          <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border pt-3">
            <a href="#" onClick={() => setOpen(false)} className="inline-flex items-center justify-center rounded-md border border-border bg-card/60 px-3.5 py-2 text-sm font-medium text-foreground transition hover:bg-card">
              Sign in
            </a>
            <a href="/#pricing" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-1.5 rounded-md bg-foreground px-3.5 py-2 text-sm font-medium text-background transition hover:bg-foreground/90">
              Get started <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </Container>
      </div>
    </header>
  );
}

type FooterLink = { label: string; to?: string; href?: string; soon?: boolean };

export function SiteFooter() {
  const cols: { title: string; links: FooterLink[] }[] = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/#features" },
        { label: "Lead examples", href: "/#example" },
        { label: "Platforms", href: "/#platforms" },
        { label: "Scoring", href: "/#scoring" },
        { label: "Pricing", href: "/#pricing" },
        { label: "Changelog", soon: true },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "Agencies", href: "/#features" },
        { label: "Freelancers", href: "/#features" },
        { label: "SEO teams", href: "/#features" },
        { label: "Developers", href: "/#features" },
        { label: "Outreach", href: "/#example" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", to: "/blog" },
        { label: "Support", to: "/support" },
        { label: "Guides", soon: true },
        { label: "Docs", soon: true },
        { label: "API reference", soon: true },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", to: "/about" },
        { label: "Contact", to: "/contact" },
        { label: "Careers", soon: true },
        { label: "Press", soon: true },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", to: "/privacy" },
        { label: "Terms", to: "/terms" },
        { label: "Data usage", to: "/data-usage" },
        { label: "Refund", to: "/refund" },
        { label: "GDPR", to: "/gdpr" },
      ],
    },
  ];
  return (
    <footer className="bg-background">
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-[1.6fr_repeat(5,1fr)]">
          <div>
            <Link to="/" className="inline-flex items-center gap-2">
              <Logo className="h-11 w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Social media buying signals, organized into structured, scored, outreach-ready leads.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/50 px-2.5 py-1 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--signal)]" /> All systems normal
              </span>
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <Mono className="text-foreground">{c.title}</Mono>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => {
                  const content = (
                    <>
                      {l.label}
                      {l.soon && (
                        <span className="rounded-full border border-border bg-card/60 px-1.5 py-px text-[9px] font-medium uppercase tracking-wide text-muted-foreground">
                          Soon
                        </span>
                      )}
                    </>
                  );
                  const cls = "inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground";
                  if (l.soon) {
                    return (
                      <li key={l.label}>
                        <span className={`${cls} cursor-default hover:text-muted-foreground`}>{content}</span>
                      </li>
                    );
                  }
                  if (l.to) {
                    return (
                      <li key={l.label}>
                        <Link to={l.to} className={cls}>{content}</Link>
                      </li>
                    );
                  }
                  return (
                    <li key={l.label}>
                      <a href={l.href} className={cls}>{content}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
          <Mono className="text-muted-foreground">© {new Date().getFullYear()} Grow By Lead</Mono>
          <Mono className="text-muted-foreground">Built for sales teams that move fast</Mono>
        </div>
      </Container>
    </footer>
  );
}
