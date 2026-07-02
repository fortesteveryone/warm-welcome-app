import { Link } from "@tanstack/react-router";
import footerLogoUrl from "@/assets/postly-footer-logo.png";

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-3 md:px-6 ${className}`}>{children}</div>;
}

function Mono({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-mono text-[11px] tracking-tight ${className}`}>{children}</span>;
}

type FooterLink = { label: string; to?: string; href?: string; soon?: boolean };

export function SiteFooter() {
  const cols: { title: string; links: FooterLink[] }[] = [
    {
      title: "Product",
      links: [
        { label: "After login", href: "/#features" },
        { label: "Platforms", href: "/#platforms" },
        { label: "Scoring", href: "/#scoring" },
        { label: "Pricing", href: "/#pricing" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blogs", to: "/blog" },
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
        { label: "Refund", to: "/refund" },
        { label: "Data usage", to: "/data-usage" },
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
      <Container className="relative pt-20 pb-6">
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
              Get early access
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
              <img src={footerLogoUrl} alt="Postly" className="h-9 w-auto md:h-12" />
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

      {/* Oversized brand wordmark — scales to show the full domain on every viewport */}
      <div aria-hidden className="relative h-[clamp(4.5rem,8.2vw,8.25rem)] w-full select-none overflow-hidden">
        <svg
          viewBox="0 0 1800 170"
          preserveAspectRatio="xMidYMin meet"
          className="absolute inset-x-0 top-0 h-auto w-full"
        >
          <defs>
            <clipPath id="wm-text-clip">
              <text
                x="900"
                y="132"
                textAnchor="middle"
                fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
                fontWeight="700"
                fontSize="132"
                letterSpacing="-2"
                textLength="1680"
                lengthAdjust="spacingAndGlyphs"
              >
                POSTLY.GROWBYLEAD.COM
              </text>
            </clipPath>
            <linearGradient id="wm-shimmer" x1="-35%" y1="0%" x2="15%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="42%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="58%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              <animate attributeName="x1" values="-35%;85%;-35%" dur="7s" repeatCount="indefinite" />
              <animate attributeName="x2" values="15%;135%;15%" dur="7s" repeatCount="indefinite" />
            </linearGradient>
          </defs>
          <text
            x="900"
            y="132"
            textAnchor="middle"
            fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
            fontWeight="700"
            fontSize="132"
            letterSpacing="-2"
            textLength="1680"
            lengthAdjust="spacingAndGlyphs"
            fill="#ffffff"
            opacity="0.14"
          >
            POSTLY.GROWBYLEAD.COM
          </text>
          <rect width="1800" height="170" fill="url(#wm-shimmer)" clipPath="url(#wm-text-clip)" />
        </svg>
      </div>



    </footer>
  );
}
