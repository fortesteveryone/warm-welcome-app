import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Facebook, Linkedin, Link2, Send } from "lucide-react";
import { useState } from "react";
import { BLOG_POSTS, formatDate, getPostBySlug, getRelatedPosts, type BlogPost } from "@/lib/blog-data";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post, related: getRelatedPosts(params.slug, 3) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} — Grow By Lead Blog` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:image", content: post.cover },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.excerpt },
        { name: "twitter:image", content: post.cover },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Post not found</h1>
        <p className="mt-3 text-muted-foreground">That article doesn't exist or has been moved.</p>
        <Link to="/blog" className="mt-6 inline-flex items-center gap-1.5 rounded-md border border-border bg-card/60 px-3.5 py-2 text-sm hover:bg-card">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to blog
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-destructive">Error</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Could not load post</h1>
        <p className="mt-3 text-muted-foreground">{error.message}</p>
      </div>
    </div>
  ),
  component: BlogDetail,
});

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-6 ${className}`}>{children}</div>;
}

function BlogDetail() {
  const { post, related } = Route.useLoaderData();
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : `https://growbylead.com/blog/${post.slug}`;
  const enc = encodeURIComponent;
  const shareText = `${post.title} — ${post.excerpt}`;

  const shareLinks = [
    { name: "Facebook",  Icon: Facebook,  href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { name: "LinkedIn",  Icon: Linkedin,  href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { name: "X",         Icon: XIcon,     href: `https://twitter.com/intent/tweet?text=${enc(shareText)}&url=${enc(url)}` },
    { name: "Reddit",    Icon: RedditIcon,href: `https://reddit.com/submit?url=${enc(url)}&title=${enc(post.title)}` },
    { name: "Telegram",  Icon: Send,      href: `https://t.me/share/url?url=${enc(url)}&text=${enc(shareText)}` },
  ];

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* noop */ }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur-xl">
        <Container className="flex h-14 items-center justify-between">
          <Link to="/" className="text-sm font-semibold tracking-tight">Grow By Lead</Link>
          <nav className="flex items-center gap-5 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
            <Link to="/blog" className="text-foreground">Blog</Link>
          </nav>
        </Container>
      </header>

      <article>
        <Container className="pt-10 md:pt-16">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> All articles
          </Link>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--signal)]">{post.category}</p>
          <h1 className="mt-3 max-w-3xl text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{post.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
            <div className="flex items-center gap-3">
              <img src={post.author.avatar} alt={post.author.name} className="h-10 w-10 rounded-full object-cover" />
              <div className="text-sm leading-tight">
                <p className="font-medium">{post.author.name}</p>
                <p className="text-muted-foreground">{post.author.role}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{formatDate(post.date)} · {post.readMinutes} min read</p>
          </div>
        </Container>

        <Container className="mt-10">
          <div className="overflow-hidden rounded-2xl border border-border">
            <img src={post.cover} alt={post.title} className="aspect-[16/8] w-full object-cover" />
          </div>
        </Container>

        <Container className="mt-12 grid gap-12 md:grid-cols-[1fr_220px]">
          <div className="prose-content">
            {post.body.map((b, i) => {
              if (b.type === "h2") return <h2 key={i} className="mt-10 text-2xl font-semibold tracking-tight md:text-3xl">{b.text}</h2>;
              if (b.type === "quote") return (
                <blockquote key={i} className="my-8 border-l-2 border-[color:var(--signal)] pl-5 text-lg italic text-foreground/90">{b.text}</blockquote>
              );
              if (b.type === "list") return (
                <ul key={i} className="my-5 space-y-2">
                  {b.items?.map((it) => (
                    <li key={it} className="flex gap-3 text-base leading-relaxed text-foreground/90">
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[color:var(--signal)]" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              );
              return <p key={i} className="my-5 text-base leading-relaxed text-foreground/85 md:text-[17px]">{b.text}</p>;
            })}

            <div className="mt-10 flex flex-wrap gap-1.5 border-t border-border pt-6">
              {post.tags.map((t) => (
                <span key={t} className="rounded-full border border-border bg-card/50 px-2.5 py-1 text-xs text-muted-foreground">#{t}</span>
              ))}
            </div>
          </div>

          {/* sticky share rail */}
          <aside className="md:sticky md:top-20 md:self-start">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Share</p>
            <div className="mt-3 flex flex-wrap gap-2 md:flex-col md:items-stretch">
              {shareLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-card/50 px-3 py-2 text-xs text-foreground hover:bg-card"
                >
                  <s.Icon className="h-3.5 w-3.5" /> {s.name}
                </a>
              ))}
              <button
                type="button"
                onClick={onCopy}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card/50 px-3 py-2 text-xs text-foreground hover:bg-card"
              >
                <Link2 className="h-3.5 w-3.5" /> {copied ? "Copied!" : "Copy link"}
              </button>
            </div>
          </aside>
        </Container>
      </article>

      {related.length > 0 && (
        <section className="mt-20 border-t border-border bg-card/20">
          <Container className="py-14">
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Related reading</h2>
              <Link to="/blog" className="hidden items-center gap-1 text-sm text-muted-foreground hover:text-foreground sm:inline-flex">
                Browse all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group overflow-hidden rounded-xl border border-border bg-card/40 transition hover:bg-card"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={p.cover} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <div className="p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{p.category}</p>
                    <h3 className="mt-2 text-base font-semibold leading-snug tracking-tight">{p.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <footer className="border-t border-border">
        <Container className="flex flex-col items-center gap-2 py-10 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Grow By Lead</p>
          <p>Suggestion or topic request? <a className="text-foreground hover:underline" href="mailto:hello@growbylead.com">Email the team</a>.</p>
        </Container>
      </footer>
    </div>
  );
}

/* Tiny inline brand icons (avoid touching shared icon module) */
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
