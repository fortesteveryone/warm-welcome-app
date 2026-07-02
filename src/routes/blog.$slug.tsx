import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Facebook, Linkedin, Link2, Send } from "lucide-react";
import { useState } from "react";
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
    { name: "Facebook", Icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { name: "LinkedIn", Icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { name: "X", Icon: XIcon, href: `https://twitter.com/intent/tweet?text=${enc(shareText)}&url=${enc(url)}` },
    { name: "Reddit", Icon: RedditIcon, href: `https://reddit.com/submit?url=${enc(url)}&title=${enc(post.title)}` },
    { name: "Telegram", Icon: Send, href: `https://t.me/share/url?url=${enc(url)}&text=${enc(shareText)}` },
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
              <Mono className="text-muted-foreground">Share</Mono>
              <div className="mt-3 flex flex-wrap gap-2 md:flex-col md:items-stretch">
                {shareLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-xs text-foreground transition hover:border-[color:var(--signal)]/40 hover:text-[color:var(--signal)]"
                  >
                    <s.Icon className="h-3.5 w-3.5" /> {s.name}
                  </a>
                ))}
                <button
                  type="button"
                  onClick={onCopy}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-xs text-foreground transition hover:border-[color:var(--signal)]/40 hover:text-[color:var(--signal)]"
                >
                  <Link2 className="h-3.5 w-3.5" /> {copied ? "Copied!" : "Copy link"}
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
        <section className="section-edge section-dark">
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
                  className="group overflow-hidden rounded-2xl border border-border bg-white transition hover:-translate-y-0.5 hover:border-[color:var(--signal)]/40 hover:shadow-[0_20px_60px_-30px_oklch(0.72_0.19_145/0.35)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={p.cover} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <div className="p-5">
                    <Mono className="text-muted-foreground">{p.category}</Mono>
                    <h3 className="mt-2 text-base font-semibold leading-snug tracking-tight text-foreground">{p.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
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

/* Tiny inline brand icons */
function XIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2H21l-6.49 7.41L22 22h-6.81l-4.78-6.26L4.8 22H2l6.94-7.93L2 2h6.94l4.32 5.72L18.244 2Zm-2.39 18h1.88L7.27 4H5.29l10.564 16Z" />
    </svg>
  );
}
function RedditIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 1a11 11 0 1 0 0 22 11 11 0 0 0 0-22Zm5.7 12.3a1.5 1.5 0 0 1-.1 2.1c-1.5 1.4-4 2.3-5.6 2.3s-4.1-.9-5.6-2.3a1.5 1.5 0 0 1 2-2.2c.8.8 2.3 1.5 3.6 1.5s2.8-.7 3.6-1.5a1.5 1.5 0 0 1 2.1.1Zm-7.8-2.1a1.6 1.6 0 1 1-3.1 0 1.6 1.6 0 0 1 3.1 0Zm7.3 0a1.6 1.6 0 1 1-3.1 0 1.6 1.6 0 0 1 3.1 0ZM18.8 6a1.8 1.8 0 0 0-1.3.6c-1.1-.7-2.5-1.1-4-1.2l.8-3.5 2.5.6a1.5 1.5 0 1 0 .2-1l-3-.7a.5.5 0 0 0-.6.4l-.9 4.2c-1.6.1-3 .5-4.2 1.2A1.8 1.8 0 1 0 6 9.4a3 3 0 0 0 0 .8c0 2.7 3 4.9 6.6 4.9s6.6-2.2 6.6-4.9a3 3 0 0 0 0-.8A1.8 1.8 0 0 0 18.8 6Z" />
    </svg>
  );
}

/* keep BLOG_POSTS import referenced when tree-shaking (no-op) */
void BLOG_POSTS;
