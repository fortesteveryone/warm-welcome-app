import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { BLOG_CATEGORIES, BLOG_POSTS, formatDate, type BlogCategory, type BlogPost } from "@/lib/blog-data";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Grow By Lead" },
      { name: "description", content: "Tactics, templates and playbooks for website and SEO agencies, freelancers and lead-gen teams." },
      { property: "og:title", content: "Grow By Lead — Blog" },
      { property: "og:description", content: "Lead generation, outreach, web design and SEO playbooks for agencies and freelancers." },
    ],
  }),
  component: BlogIndex,
});

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-6 ${className}`}>{children}</div>;
}

function BlogIndex() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<BlogCategory>("All");
  const [showSuggest, setShowSuggest] = useState(false);

  const suggestions = useMemo<{ titles: BlogPost[]; tags: string[] }>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { titles: [], tags: [] };
    const titles = BLOG_POSTS.filter((p) => p.title.toLowerCase().includes(q)).slice(0, 4);
    const tagSet = new Set<string>();
    BLOG_POSTS.forEach((p) => p.tags.forEach((t) => { if (t.toLowerCase().includes(q)) tagSet.add(t); }));
    return { titles, tags: Array.from(tagSet).slice(0, 5) };
  }, [query]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BLOG_POSTS.filter((p) => {
      const inCat = active === "All" || p.category === active;
      if (!inCat) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)
      );
    });
  }, [query, active]);

  const [featured, ...rest] = filtered;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* simple header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur-xl">
        <Container className="flex h-14 items-center justify-between">
          <Link to="/" className="text-sm font-semibold tracking-tight">Grow By Lead</Link>
          <nav className="flex items-center gap-5 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
            <Link to="/blog" className="text-foreground">Blog</Link>
          </nav>
        </Container>
      </header>

      <section className="border-b border-border">
        <Container className="py-14 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Blog</p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.02em] sm:text-5xl md:text-6xl">
            Playbooks for selling <span className="text-muted-foreground">website &amp; SEO</span> services.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Outreach scripts, pricing frameworks, lead-gen tactics and platform deep-dives — written for agencies, freelancers and small studios.
          </p>

          {/* search */}
          <div className="relative mt-8 max-w-2xl">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-card/60 px-4 py-3 focus-within:border-foreground/30">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => { setQuery(e.target.value); setShowSuggest(true); }}
                onFocus={() => setShowSuggest(true)}
                onBlur={() => setTimeout(() => setShowSuggest(false), 120)}
                placeholder="Search blog — try 'webflow', 'outreach', 'local seo'…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="grid h-6 w-6 place-items-center rounded-md text-muted-foreground hover:bg-card hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {showSuggest && query && (
              <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
                {suggestions.tags.length > 0 && (
                  <div className="border-b border-border p-3">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Tags</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {suggestions.tags.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onMouseDown={(e) => { e.preventDefault(); setQuery(t); setShowSuggest(false); }}
                          className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-xs text-foreground/85 hover:bg-background"
                        >{t}</button>
                      ))}
                    </div>
                  </div>
                )}
                {suggestions.titles.length > 0 ? (
                  <ul className="max-h-80 divide-y divide-border overflow-auto">
                    {suggestions.titles.map((p) => (
                      <li key={p.slug}>
                        <Link
                          to="/blog/$slug"
                          params={{ slug: p.slug }}
                          onMouseDown={() => setShowSuggest(false)}
                          className="flex items-start gap-3 p-3 hover:bg-background/60"
                        >
                          <img src={p.cover} alt="" className="h-12 w-16 shrink-0 rounded-md object-cover" />
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">{p.title}</p>
                            <p className="mt-0.5 text-xs text-muted-foreground">{p.category} · {p.readMinutes} min read</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="p-4 text-sm text-muted-foreground">No posts match “{query}”.</p>
                )}
              </div>
            )}
          </div>

          {/* category filters */}
          <div className="mt-8 flex flex-wrap items-center gap-1.5">
            {BLOG_CATEGORIES.map((c) => {
              const isActive = active === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActive(c)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition ${
                    isActive
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card/50 text-foreground/85 hover:bg-card"
                  }`}
                >{c}</button>
              );
            })}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-12 md:py-16">
          {filtered.length === 0 && (
            <div className="rounded-xl border border-border bg-card/40 p-10 text-center">
              <p className="text-sm text-muted-foreground">No posts found. Try a different keyword or category.</p>
            </div>
          )}

          {featured && (
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              className="group block overflow-hidden rounded-2xl border border-border bg-card/40 transition hover:bg-card md:grid md:grid-cols-2"
            >
              <div className="relative aspect-[16/10] md:aspect-auto">
                <img src={featured.cover} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
              </div>
              <div className="flex flex-col justify-between p-6 md:p-10">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--signal)]">Featured · {featured.category}</p>
                  <h2 className="mt-3 text-balance text-2xl font-semibold leading-tight tracking-[-0.01em] md:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{featured.excerpt}</p>
                </div>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <AuthorRow post={featured} />
                  <span className="inline-flex items-center gap-1 text-sm text-foreground">Read <ArrowRight className="h-3.5 w-3.5" /></span>
                </div>
              </div>
            </Link>
          )}

          {rest.length > 0 && (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => <PostCard key={p.slug} p={p} />)}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}

function AuthorRow({ post }: { post: BlogPost }) {
  return (
    <p className="text-xs text-muted-foreground">
      {formatDate(post.date)} · {post.readMinutes} min read
    </p>
  );
}

function PostCard({ p }: { p: BlogPost }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: p.slug }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card/40 transition hover:bg-card"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={p.cover} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{p.category}</p>
        <h3 className="mt-2 text-base font-semibold leading-snug tracking-tight">{p.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
        <div className="mt-4 flex items-center justify-between gap-3 pt-4 border-t border-border/60">
          <AuthorRow post={p} />
          <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
        </div>
      </div>
    </Link>
  );
}
