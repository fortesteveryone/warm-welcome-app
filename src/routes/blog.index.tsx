import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Search, X } from "lucide-react";
import { BLOG_CATEGORIES, BLOG_POSTS, formatDate, type BlogCategory, type BlogPost } from "@/lib/blog-data";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Postly" },
      { name: "description", content: "Tactics, templates and playbooks for website design, development and CMS agencies, freelancers and lead-gen teams." },
      { property: "og:title", content: "Postly — Blog" },
      { property: "og:description", content: "Lead generation, outreach, web design, development and CMS playbooks for agencies and freelancers." },
    ],
  }),
  component: BlogIndex,
});

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-6 ${className}`}>{children}</div>;
}

function Mono({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-mono text-[11px] uppercase tracking-tight ${className}`}>{children}</span>;
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
      <SiteHeader />

      {/* Hero — matches PageShell / contact breadcrumb */}
      <section className="relative overflow-hidden section-edge section-dark">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(1_0_0/0.05),transparent_60%)]" />
        </div>
        <Container className="py-14 md:py-20">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" /> Back home
          </Link>
          <Mono className="mt-6 block text-muted-foreground">Blog</Mono>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Playbooks for selling website{" "}
            <span className="text-[color:var(--signal)]">&amp; CMS services.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Outreach scripts, pricing frameworks, lead-gen tactics and platform deep-dives — written for agencies, freelancers and small studios.
          </p>

          {/* search */}
          <div className="relative mt-8 max-w-2xl">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-3 focus-within:border-[color:var(--signal)]/40">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => { setQuery(e.target.value); setShowSuggest(true); }}
                onFocus={() => setShowSuggest(true)}
                onBlur={() => setTimeout(() => setShowSuggest(false), 120)}
                placeholder="Search blog — try 'webflow', 'outreach', 'wordpress'…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="grid h-6 w-6 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {showSuggest && query && (
              <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-xl border border-border bg-white shadow-2xl">
                {suggestions.tags.length > 0 && (
                  <div className="border-b border-border p-3">
                    <Mono className="text-muted-foreground">Tags</Mono>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {suggestions.tags.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onMouseDown={(e) => { e.preventDefault(); setQuery(t); setShowSuggest(false); }}
                          className="rounded-md border border-border bg-background px-2.5 py-1 text-xs text-foreground/85 hover:border-[color:var(--signal)]/40"
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
                          className="flex items-start gap-3 p-3 hover:bg-muted/50"
                        >
                          <img src={p.cover} alt="" className="h-12 w-16 shrink-0 rounded-md object-cover" />
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-foreground">{p.title}</p>
                            <p className="mt-0.5 text-xs text-muted-foreground">{p.category}</p>
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
          <div className="mt-6 flex flex-wrap items-center gap-1.5">
            {BLOG_CATEGORIES.map((c) => {
              const isActive = active === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActive(c)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition ${
                    isActive
                      ? "border-[color:var(--signal)] bg-[color:var(--signal)] text-white"
                      : "border-border bg-background text-foreground/85 hover:border-[color:var(--signal)]/40"
                  }`}
                >{c}</button>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Featured + grid */}
      <section className="section-edge section-light">
        <Container className="py-16 md:py-20">
          {filtered.length === 0 && (
            <div className="rounded-2xl border border-border bg-white p-10 text-center">
              <p className="text-sm text-muted-foreground">No posts found. Try a different keyword or category.</p>
            </div>
          )}

          {featured && (
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              className="group block overflow-hidden rounded-2xl border border-border bg-white transition hover:-translate-y-0.5 hover:border-[color:var(--signal)]/40 hover:shadow-[0_20px_60px_-30px_oklch(0.72_0.19_145/0.35)] md:grid md:grid-cols-[1.15fr_1fr]"
            >
              <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
                <img src={featured.cover} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 font-mono text-[10px] uppercase tracking-tight text-foreground shadow-sm backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--signal)]" />
                  Featured · {featured.category}
                </span>
              </div>
              <div className="flex flex-col justify-between p-6 md:p-10">
                <div>
                  <h2 className="text-balance text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-[1.75rem] md:leading-[1.15]">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{featured.excerpt}</p>
                </div>
                <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {featured.tags.slice(0, 3).map((t) => (
                      <span key={t} className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] text-muted-foreground">#{t}</span>
                    ))}
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-foreground transition group-hover:text-[color:var(--signal)]">
                    Read <ArrowRight className="h-3.5 w-3.5" />
                  </span>
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

      <SiteFooter />
    </div>
  );
}

function PostCard({ p }: { p: BlogPost }) {
  return (
    <Link
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
        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.tags.slice(0, 2).map((t) => (
            <span key={t} className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] text-muted-foreground">#{t}</span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
          <div className="flex items-center gap-2 min-w-0">
            <img src={p.author.avatar} alt="" className="h-6 w-6 shrink-0 rounded-full object-cover" />
            <span className="truncate text-[11px] text-muted-foreground">
              {p.author.name} · {p.readMinutes} min
            </span>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-[color:var(--signal)]" />
        </div>
      </div>
    </Link>
  );
}

