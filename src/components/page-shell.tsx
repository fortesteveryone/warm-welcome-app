import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-6 ${className}`}>{children}</div>;
}

function Mono({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`font-mono text-[11px] tracking-tight uppercase ${className}`}>{children}</span>;
}

export function PageShell({
  kicker,
  title,
  lede,
  updated,
  children,
}: {
  kicker: string;
  title: string;
  lede?: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative overflow-hidden section-edge">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-200px] h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.72_0.19_145/0.18),transparent_60%)] blur-3xl" />
          <div className="absolute right-[-200px] top-[100px] h-[500px] w-[700px] rounded-full bg-[radial-gradient(circle_at_center,oklch(0.7_0.16_230/0.15),transparent_60%)] blur-3xl" />
        </div>
        <Container className="py-14 md:py-20">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" /> Back home
          </Link>
          <Mono className="mt-6 block text-muted-foreground">{kicker}</Mono>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
          {lede && <p className="mt-4 max-w-[680px] text-base text-muted-foreground md:text-lg">{lede}</p>}
          {updated && (
            <Mono className="mt-6 block text-muted-foreground">Last updated · {updated}</Mono>
          )}
        </Container>
      </section>

      <section className="section-edge section-surface-cyan">
        <Container className="py-14 md:py-20">
          <div className="max-w-[760px]">
            <div className="prose prose-invert prose-sm md:prose-base max-w-none">
              <div className="space-y-8 text-sm leading-relaxed text-foreground/85 md:text-[15px]">
                {children}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <SiteFooter />
    </div>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold tracking-tight text-foreground md:text-xl">{title}</h2>
      <div className="space-y-3 text-muted-foreground">{children}</div>
    </div>
  );
}
