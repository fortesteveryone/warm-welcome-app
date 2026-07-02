import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";

import logoUrl from "@/assets/postly-logo.png";

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-3 md:px-6 ${className}`}>{children}</div>;
}

export function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  return <img src={logoUrl} alt="Postly" className={className} />;
}

/* Primary nav — keep it short. Home is always first. */
const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blogs", href: "/blog" },
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
      <Container className="relative flex h-14 items-center justify-between gap-3 md:h-16">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <Logo className="h-7 w-auto md:h-9" />
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
            Get early access <ArrowRight className="h-3.5 w-3.5" />
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
        className={`absolute left-0 right-0 top-full overflow-hidden border-t border-border bg-white transition-[max-height,opacity] duration-300 md:hidden ${
          open ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <Container className="flex flex-col py-4">
          <div className="mb-3 px-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Menu
          </div>
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => {
              const active = isActive(l.href, pathname);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`group relative flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] transition ${
                    active
                      ? "bg-card text-foreground"
                      : "text-foreground/85 hover:bg-card/70 hover:text-foreground"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`h-1.5 w-1.5 rounded-full transition ${
                      active
                        ? "bg-[color:var(--signal)] shadow-[0_0_8px_var(--signal)]"
                        : "bg-border group-hover:bg-foreground/40"
                    }`}
                  />
                  <span className={active ? "font-medium" : ""}>{l.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="mt-5 flex flex-col gap-2 border-t border-border pt-4">
            <a
              href="/#pricing"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-foreground px-4 py-3 text-sm font-medium text-background shadow-sm transition hover:bg-foreground/90"
            >
              Get early access <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="#"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-xl border border-border bg-card/60 px-4 py-3 text-sm font-medium text-foreground transition hover:bg-card"
            >
              Sign in
            </a>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 pt-1 text-[11px] text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--signal)]" />
            postly.growbylead.com
          </div>
        </Container>
      </div>

    </header>
  );
}
