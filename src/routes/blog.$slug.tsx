import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Link2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { BLOG_POSTS, getPostBySlug, getRelatedPosts, type BlogPost } from "@/lib/blog-data";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post, related: getRelatedPosts(params.slug, 3) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { post } = loaderData;
    const url = `https://friendly-code-place.lovable.app/blog/${post.slug}`;
    return {
      meta: [
        { title: `${post.title} — Postly Blog` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:image", content: post.cover },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.excerpt },
        { name: "twitter:image", content: post.cover },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-3 md:px-6 py-32 text-center">
        <p className="font-mono text-[11px] uppercase tracking-tight text-muted-foreground">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Post not found</h1>
        <p className="mt-3 text-muted-foreground">That article doesn't exist or has been moved.</p>
        <Link to="/blog" className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-sm hover:border-[color:var(--signal)]/40">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to blog
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-3 md:px-6 py-32 text-center">
        <p className="font-mono text-[11px] uppercase tracking-tight text-destructive">Error</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Could not load post</h1>
        <p className="mt-3 text-muted-foreground">{error.message}</p>
      </div>
    </div>
  ),
  component: BlogDetail,
});

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-3 md:px-6 ${className}`}>{children}</div>;
}

function Mono({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-mono text-[11px] uppercase tracking-tight ${className}`}>{children}</span>;
}

function BlogDetail() {
  const { post, related } = Route.useLoaderData() as { post: BlogPost; related: BlogPost[] };
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : `https://growbylead.com/blog/${post.slug}`;
  const enc = encodeURIComponent;
  const shareText = `${post.title} — ${post.excerpt}`;

  const shareLinks = [
    { name: "X",        Icon: XIcon,        brand: "#000000", href: `https://twitter.com/intent/tweet?text=${enc(shareText)}&url=${enc(url)}` },
    { name: "LinkedIn", Icon: LinkedInIcon, brand: "#0A66C2", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { name: "Facebook", Icon: FacebookIcon, brand: "#1877F2", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { name: "WhatsApp", Icon: WhatsAppIcon, brand: "#25D366", href: `https://api.whatsapp.com/send?text=${enc(shareText + " " + url)}` },
    { name: "Reddit",   Icon: RedditIcon,   brand: "#FF4500", href: `https://reddit.com/submit?url=${enc(url)}&title=${enc(post.title)}` },
    { name: "Telegram", Icon: TelegramIcon, brand: "#26A5E4", href: `https://t.me/share/url?url=${enc(url)}&text=${enc(shareText)}` },
  ];


  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* noop */ }
  };

  // Highlight last word of title in signal green (matches home/PageShell)
  const titleNode = (() => {
    const parts = post.title.trim().split(/\s+/);
    if (parts.length < 2) return post.title;
    const last = parts.pop();
    return (
      <>
        {parts.join(" ")}{" "}
        <span className="text-[color:var(--signal)]">{last}</span>
      </>
    );
  })();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero — matches PageShell / contact breadcrumb */}
      <section className="relative overflow-hidden section-edge section-dark">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(1_0_0/0.05),transparent_60%)]" />
        </div>
        <Container className="py-14 md:py-20">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" /> All articles
          </Link>
          <Mono className="mt-6 block text-[color:var(--signal)]">{post.category}</Mono>
          <h1 className="mt-3 max-w-5xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.4rem]">
            {titleNode}
          </h1>
          <p className="mt-4 max-w-4xl text-base text-muted-foreground md:text-lg">{post.excerpt}</p>
        </Container>
      </section>

      {/* Body */}
      <section className="section-edge section-light">
        <Container className="py-14 md:py-20">
          <div className="overflow-hidden rounded-2xl border border-border bg-white">
            <img src={post.cover} alt={post.title} className="aspect-[16/8] w-full object-cover" />
          </div>

          <div className="mt-12 grid gap-12 md:grid-cols-[1fr_220px]">
            <article className="min-w-0">
              {post.body.map((b, i) => {
                if (b.type === "h2") return <h2 key={i} className="mt-10 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{b.text}</h2>;
                if (b.type === "quote") return (
                  <blockquote key={i} className="my-8 border-l-2 border-[color:var(--signal)] pl-5 text-lg italic text-foreground/90">{b.text}</blockquote>
                );
                if (b.type === "list") return (
                  <ul key={i} className="my-5 space-y-2">
                    {b.items?.map((it) => (
                      <li key={it} className="flex gap-3 text-base leading-relaxed text-foreground/90">
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-md bg-[color:var(--signal)]" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                );
                return <p key={i} className="my-5 text-base leading-relaxed text-foreground/85 md:text-[17px]">{b.text}</p>;
              })}

              <div className="mt-10 flex flex-wrap gap-1.5 border-t border-border pt-6">
                {post.tags.map((t) => (
                  <span key={t} className="rounded-full border border-border bg-white px-2.5 py-1 text-xs text-muted-foreground">#{t}</span>
                ))}
              </div>
            </article>

            {/* sticky share rail */}
            <aside className="md:sticky md:top-20 md:self-start">
              <div className="rounded-2xl border border-border bg-white p-5">
                <Mono className="text-muted-foreground">Share this article</Mono>
                <p className="mt-2 text-sm text-foreground/70">Found this useful? Send it to someone who needs it.</p>

                <div className="mt-4 grid grid-cols-6 gap-2 md:grid-cols-3">
                  {shareLinks.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Share on ${s.name}`}
                      title={`Share on ${s.name}`}
                      style={{ ["--brand" as string]: s.brand }}
                      className="group/share relative flex aspect-square items-center justify-center rounded-xl border border-border bg-white text-foreground/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent hover:text-white hover:shadow-[0_10px_24px_-12px_var(--brand)] hover:bg-[color:var(--brand)]"
                    >
                      <s.Icon className="h-[18px] w-[18px]" />
                    </a>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={onCopy}
                  className="mt-3 flex w-full items-center gap-2 rounded-xl border border-border bg-[oklch(0.98_0_0)] px-3 py-2.5 text-left text-xs transition hover:border-[color:var(--signal)]/40"
                >
                  {copied ? (
                    <Check className="h-4 w-4 shrink-0 text-[color:var(--signal)]" />
                  ) : (
                    <Link2 className="h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                  <span className="flex-1 truncate font-mono text-[11px] text-muted-foreground">
                    {copied ? "Link copied to clipboard" : url.replace(/^https?:\/\//, "")}
                  </span>
                  <span className="shrink-0 rounded-md bg-foreground px-2 py-1 text-[10px] font-medium text-background">
                    {copied ? "Copied" : "Copy"}
                  </span>
                </button>
              </div>
            </aside>

          </div>
        </Container>
      </section>

      {/* CTA — matches site FinalCTA styling */}
      <section className="relative section-edge section-dark overflow-hidden">
        <Container className="relative py-16 md:py-20">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-10 text-center md:p-16">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-[color:var(--signal)]/15 blur-3xl" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,oklch(0.72_0.19_145/0.10),transparent_60%)]" />
            </div>
            <Mono className="relative text-[color:var(--signal)]">Start with Postly</Mono>
            <h2 className="relative mt-4 text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.03em] md:text-6xl">
              Stop reading.<br />
              <span className="bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-transparent">Start closing.</span>
            </h2>
            <p className="relative mx-auto mt-5 max-w-lg text-muted-foreground">
              Get 365+ verified website service opportunities every day — hand-collected, AI-scored, ready to pitch.
            </p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/"
                hash="pricing"
                className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:bg-foreground/90"
              >
                Get early access <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/40 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur transition hover:bg-card"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </Container>
      </section>



      {related.length > 0 && (
        <section className="section-edge section-light">
          <Container className="py-16 md:py-20">
            <div className="flex items-end justify-between gap-6">
              <div>
                <Mono className="text-muted-foreground">Keep reading</Mono>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  Related <span className="text-[color:var(--signal)]">articles</span>
                </h2>
              </div>
              <Link to="/blog" className="hidden items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground sm:inline-flex">
                Browse all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition hover:-translate-y-0.5 hover:border-[color:var(--signal)]/40 hover:shadow-[0_20px_60px_-30px_oklch(0.72_0.19_145/0.35)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={p.cover} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 font-mono text-[10px] uppercase tracking-tight text-foreground shadow-sm backdrop-blur">
                      {p.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-foreground md:text-base">{p.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                      <div className="flex flex-wrap gap-1.5">
                        {p.tags.slice(0, 2).map((t) => (
                          <span key={t} className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] text-muted-foreground">#{t}</span>
                        ))}
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-[color:var(--signal)]" />
                    </div>
                  </div>
                </Link>
              ))}

            </div>
          </Container>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}

/* Real brand icons — official SVG paths */
type IconProps = { className?: string };
const svgProps = (className: string) => ({
  viewBox: "0 0 24 24",
  className,
  fill: "currentColor" as const,
  "aria-hidden": true as const,
});

function XIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M18.244 2H21l-6.49 7.41L22 22h-6.81l-4.78-6.26L4.8 22H2l6.94-7.93L2 2h6.94l4.32 5.72L18.244 2Zm-2.39 18h1.88L7.27 4H5.29l10.564 16Z" />
    </svg>
  );
}
function LinkedInIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}
function FacebookIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M24 12a12 12 0 1 0-13.88 11.85v-8.38H7.08V12h3.04V9.36c0-3 1.79-4.67 4.53-4.67 1.31 0 2.68.24 2.68.24v2.95h-1.51c-1.49 0-1.96.93-1.96 1.87V12h3.33l-.53 3.47h-2.8v8.38A12 12 0 0 0 24 12Z" />
    </svg>
  );
}
function WhatsAppIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.34.22-.64.07-.3-.15-1.26-.47-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.34.44-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35ZM12.05 21.5h-.01a9.44 9.44 0 0 1-4.81-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.43 9.44-9.43a9.4 9.4 0 0 1 6.68 2.77 9.4 9.4 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.44 9.43ZM20.52 3.47A11.34 11.34 0 0 0 12.05.02C5.8.02.71 5.11.71 11.36c0 2 .52 3.95 1.51 5.67L.6 22.98l6.06-1.59a11.32 11.32 0 0 0 5.39 1.38h.01c6.25 0 11.34-5.09 11.34-11.34a11.28 11.28 0 0 0-3.32-8.06Z" />
    </svg>
  );
}
function RedditIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M12 1a11 11 0 1 0 0 22 11 11 0 0 0 0-22Zm5.7 12.3a1.5 1.5 0 0 1-.1 2.1c-1.5 1.4-4 2.3-5.6 2.3s-4.1-.9-5.6-2.3a1.5 1.5 0 0 1 2-2.2c.8.8 2.3 1.5 3.6 1.5s2.8-.7 3.6-1.5a1.5 1.5 0 0 1 2.1.1Zm-7.8-2.1a1.6 1.6 0 1 1-3.1 0 1.6 1.6 0 0 1 3.1 0Zm7.3 0a1.6 1.6 0 1 1-3.1 0 1.6 1.6 0 0 1 3.1 0ZM18.8 6a1.8 1.8 0 0 0-1.3.6c-1.1-.7-2.5-1.1-4-1.2l.8-3.5 2.5.6a1.5 1.5 0 1 0 .2-1l-3-.7a.5.5 0 0 0-.6.4l-.9 4.2c-1.6.1-3 .5-4.2 1.2A1.8 1.8 0 1 0 6 9.4a3 3 0 0 0 0 .8c0 2.7 3 4.9 6.6 4.9s6.6-2.2 6.6-4.9a3 3 0 0 0 0-.8A1.8 1.8 0 0 0 18.8 6Z" />
    </svg>
  );
}
function TelegramIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm5.56 8.16-1.86 8.78c-.14.62-.51.77-1.03.48l-2.85-2.1-1.37 1.32c-.15.15-.28.28-.57.28l.2-2.9 5.28-4.77c.23-.2-.05-.32-.36-.12l-6.52 4.11-2.81-.88c-.61-.19-.62-.61.13-.9l10.98-4.24c.51-.19.96.12.78.94Z" />
    </svg>
  );
}


/* keep BLOG_POSTS import referenced when tree-shaking (no-op) */
void BLOG_POSTS;
