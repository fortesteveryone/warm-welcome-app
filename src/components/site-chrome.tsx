import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";

import logoUrl from "@/assets/postly-logo.png";
import footerLogoUrl from "@/assets/postly-footer-logo.png";

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-6 ${className}`}>{children}</div>;
}

function Mono({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-mono text-[11px] tracking-tight ${className}`}>{children}</span>;
}

export function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  return <img src={logoUrl} alt="Postly" className={className} />;
}

/* Primary nav — keep it short. Home is always first. */
const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Support", href: "/support" },
  { label: "Contact", href: "/contact" },
];

function isActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false; // in-page anchor on home
  return pathname === href || pathname.startsWith(href + "/");
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <Container className="relative flex h-20 items-center justify-between gap-3">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <Logo className="h-14 w-auto" />
        </Link>
        <nav className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => {
            const active = isActive(l.href, pathname);
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`pointer-events-auto relative rounded-md px-3 py-1.5 text-sm transition ${
                  active
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
                {active && (
                  <span
                    aria-hidden
                    className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-[color:var(--signal)]"
                  />
                )}
              </a>
            );
          })}
        </nav>


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
          {NAV_LINKS.map((l) => {
            const active = isActive(l.href, pathname);
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`flex items-center justify-between rounded-md px-3 py-2.5 text-sm transition ${
                  active
                    ? "bg-card text-foreground border-l-2 border-[color:var(--signal)]"
                    : "text-foreground/90 hover:bg-card"
                }`}
              >
                <span>{l.label}</span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              </a>
            );
          })}

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
        { label: "Platforms", href: "/#platforms" },
        { label: "Scoring", href: "/#scoring" },
        { label: "Pricing", href: "/#pricing" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", to: "/blog" },
        { label: "Support", to: "/support" },
        { label: "Docs", soon: true },
      ],
    },
    {
      title: "Company",
      links: [
        
        { label: "Contact", to: "/contact" },
        { label: "Careers", soon: true },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", to: "/privacy" },
        { label: "Terms", to: "/terms" },
        { label: "GDPR", to: "/gdpr" },
      ],
    },
  ];
  return (
    <footer className="relative overflow-hidden bg-[#0b0d0c] text-white">
      {/* Soft brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-md opacity-40 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(34,197,94,0.35), transparent 70%)" }}
      />
      <Container className="relative py-20">
        {/* Top: CTA row */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-12 md:flex-row md:items-end">
          <div className="max-w-xl">
            <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Website opportunities, delivered daily.
            </h3>
            <p className="mt-3 text-sm text-white/60">
              Public website-service signals, organized into structured, scored, outreach-ready opportunities.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/#pricing"
              className="inline-flex items-center gap-2 rounded-md bg-[#22C55E] px-5 py-2.5 text-sm font-medium text-black transition hover:bg-[#16a34a]"
            >
              Start now
            </a>
            <a
              href="/#pricing"
              className="inline-flex items-center gap-2 rounded-md border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/5"
            >
              Early access · 40% off
            </a>
          </div>
        </div>

        {/* Middle: brand + columns */}
        <div className="grid gap-12 py-14 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Link to="/" className="inline-flex items-center gap-2">
              <img src={footerLogoUrl} alt="Postly" className="h-20 w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-white/55">
              Postly helps web agencies, developers, freelancers, and CMS specialists find website-service opportunities from public social posts.
            </p>
            <div className="mt-5 inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70">
              <span className="h-1.5 w-1.5 rounded-md bg-[#22C55E]" /> All systems normal
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <Mono className="text-white">{c.title}</Mono>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => {
                  const content = (
                    <>
                      {l.label}
                      {l.soon && (
                        <span className="rounded-md border border-white/15 bg-white/5 px-1.5 py-px text-[9px] font-medium uppercase tracking-wide text-white/60">
                          Soon
                        </span>
                      )}
                    </>
                  );
                  const cls = "inline-flex items-center gap-1.5 text-sm text-white/60 transition hover:text-white";
                  if (l.soon) {
                    return (
                      <li key={l.label}>
                        <span className={`${cls} cursor-default hover:text-white/60`}>{content}</span>
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

        {/* Bottom meta */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
          <Mono className="text-white/50">© {new Date().getFullYear()} Postly. Built for website service teams that move fast.</Mono>
          <Mono className="text-white/50">postly.growbylead.com</Mono>
        </div>
      </Container>

      {/* Oversized brand wordmark — static, bottom third clipped */}
      <div
        aria-hidden
        className="relative select-none overflow-hidden"
        style={{ height: "calc(clamp(72px, 18vw, 260px) * 0.66)" }}
      >
        <div
          className="pointer-events-none flex w-full items-start justify-center whitespace-nowrap text-center font-semibold leading-[1] tracking-tight"
          style={{
            fontSize: "clamp(72px, 18vw, 260px)",
            background: "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(34,197,94,0.28) 70%, rgba(34,197,94,0.10) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          postly.growbylead.com
        </div>
      </div>


    </footer>
  );
}
